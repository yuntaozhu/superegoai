
/**
 * Advanced Content Parser for SuperEgo AI
 * Indexes directories and localized meta JSONs to build a prompt knowledge graph.
 */

export interface ParsedPrompt {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryTitle: string;
  path: string;
  prompts: string[]; 
  rawContent: string;
  metadata: Record<string, any>;
}

export interface ContentStructure {
  categories: Record<string, { title: string; nodes: ParsedPrompt[] }>;
  allNodes: ParsedPrompt[];
}

const parseMarkdown = (path: string, raw: string, metaMap: Record<string, any>, lang: 'zh' | 'en'): ParsedPrompt => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)\n```/g;
  
  const match = raw.match(frontmatterRegex);
  let metadata: Record<string, any> = {};
  let content = raw;

  if (match) {
    const yaml = match[1];
    yaml.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        metadata[parts[0].trim()] = parts.slice(1).join(':').trim();
      }
    });
    content = raw.replace(frontmatterRegex, '');
  }

  const prompts: string[] = [];
  let codeMatch;
  while ((codeMatch = codeBlockRegex.exec(content)) !== null) {
    prompts.push(codeMatch[1].trim());
  }

  const pathParts = path.split('/');
  const filename = pathParts[pathParts.length - 1].replace(/\.mdx?$/, '');
  const categoryKey = pathParts[pathParts.length - 2] || 'general';
  
  // Resolve localized title from metaMap
  const categoryMeta = metaMap[`/${categoryKey}/_meta.${lang}.json`] || 
                       metaMap[`/prompts/${categoryKey}/_meta.${lang}.json`] || {};
  
  const nodeTitle = metadata.title || categoryMeta[filename] || filename;
  const categoryTitle = categoryMeta['__self__'] || categoryKey.toUpperCase();

  return {
    id: filename,
    title: nodeTitle,
    description: metadata.description || '',
    category: categoryKey,
    categoryTitle,
    path,
    prompts,
    rawContent: content,
    metadata
  };
};

export const loadPromptGuideContent = (lang: 'zh' | 'en' = 'zh'): ContentStructure => {
  // 1. Load all files via glob
  const mdModules = (import.meta as any).glob(['/**/*.md', '/**/*.mdx'], { query: '?raw', import: 'default', eager: true });
  const metaModules = (import.meta as any).glob(['/**/_meta.*.json'], { import: 'default', eager: true });

  const allNodes: ParsedPrompt[] = [];
  const categories: Record<string, { title: string; nodes: ParsedPrompt[] }> = {};

  // 2. Process meta files first for category naming
  const rootMeta = metaModules[`/_meta.${lang}.json`] || {};

  Object.entries(mdModules).forEach(([path, raw]) => {
    if (typeof raw === 'string' && !path.includes('node_modules')) {
      const parsed = parseMarkdown(path, raw, metaModules, lang);
      
      const catTitle = rootMeta[parsed.category] || parsed.categoryTitle;
      
      if (!categories[parsed.category]) {
        categories[parsed.category] = { title: catTitle, nodes: [] };
      }
      categories[parsed.category].nodes.push(parsed);
      allNodes.push(parsed);
    }
  });

  return { categories, allNodes };
};
