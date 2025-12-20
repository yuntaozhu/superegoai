
/**
 * Content Parser Utility for SuperEgo AI
 * Hand-rolled to handle .md/.mdx files in a browser-friendly way via Vite glob imports.
 */

export interface ParsedPrompt {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  prompts: string[]; // Extracted code blocks
  rawContent: string;
  metadata: Record<string, any>;
}

export interface ContentStructure {
  categories: Record<string, ParsedPrompt[]>;
  allNodes: ParsedPrompt[];
}

/**
 * Simple Frontmatter & Codeblock Parser
 * Avoids heavy dependencies like gray-matter for client-side efficiency.
 */
const parseMarkdown = (path: string, raw: string): ParsedPrompt => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)\n```/g;
  
  const match = raw.match(frontmatterRegex);
  let metadata: Record<string, any> = {};
  let content = raw;

  if (match) {
    const yaml = match[1];
    yaml.split('\n').forEach(line => {
      const [key, ...val] = line.split(':');
      if (key && val) {
        metadata[key.trim()] = val.join(':').trim();
      }
    });
    content = raw.replace(frontmatterRegex, '');
  }

  // Extract prompts (code blocks)
  const prompts: string[] = [];
  let codeMatch;
  while ((codeMatch = codeBlockRegex.exec(content)) !== null) {
    prompts.push(codeMatch[1].trim());
  }

  // Determine category from path (e.g., /ar-pages/techniques/cot.md -> techniques)
  const pathParts = path.split('/');
  const category = pathParts.length > 2 ? pathParts[pathParts.length - 2] : 'general';
  const id = metadata.id || pathParts[pathParts.length - 1].replace(/\.mdx?$/, '');

  return {
    id,
    title: metadata.title || id,
    description: metadata.description || '',
    category,
    path,
    prompts,
    rawContent: content,
    metadata
  };
};

/**
 * Recursive Content Loader
 * Uses Vite's import.meta.glob to scan the /ar-pages directory.
 */
export const loadPromptGuideContent = (): ContentStructure => {
  // Use Vite glob import (eager loading for prompt data)
  // Note: /ar-pages must exist at the root level relative to the dev server
  // Cast import.meta to any to bypass TypeScript error "Property 'glob' does not exist on type 'ImportMeta'"
  let modules: Record<string, string> = {};
  try {
    modules = (import.meta as any).glob('/ar-pages/**/*.md*', { query: '?raw', import: 'default', eager: true });
  } catch (e) {
    console.warn("Vite glob import failed. If you are not in a Vite environment, this is expected.", e);
  }
  
  const allNodes: ParsedPrompt[] = [];
  const categories: Record<string, ParsedPrompt[]> = {};

  Object.entries(modules).forEach(([path, raw]) => {
    if (typeof raw === 'string') {
      const parsed = parseMarkdown(path, raw);
      allNodes.push(parsed);

      if (!categories[parsed.category]) {
        categories[parsed.category] = [];
      }
      categories[parsed.category].push(parsed);
    }
  });

  return {
    categories,
    allNodes
  };
};

/**
 * Dynamic Prompt Template Injector
 * Replaces {{variable}} placeholders in prompts.
 */
export const injectVariables = (template: string, variables: Record<string, string>): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return variables[key] || match;
  });
};
