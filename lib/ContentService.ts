
/**
 * ContentService: Knowledge Indexer & Audit Manager
 * 
 * ROLE: I18n Content Architect
 * RESPONSIBILITY: 
 * 1. Read from generated/knowledge_base.json (Single Source of Truth)
 * 2. Serve content to React components
 */

// Import the generated JSON using a relative path to avoid alias resolution issues.
// @ts-ignore
import knowledgeBase from '../generated/knowledge_base.json';

export interface PageMeta {
  id: string;
  title: string;
  category: string;
  path: string;
}

export interface CategoryStructure {
  id: string;
  title: string;
  pages: PageMeta[];
}

export interface SyncStatus {
  id: string;
  enTitle: string;
  zhTitle?: string;
  status: 'synced' | 'missing_zh' | 'missing_en' | 'orphan' | 'fallback';
}

export interface PageContent {
  content: string;
  frontmatter: { title: string; [key: string]: any };
  title: string;
  lang: 'en' | 'zh';
  filePath: string; 
  isFallback?: boolean;
  availableLanguages: ('en' | 'zh')[];
  headers?: string[];
}

// Helper to capitalize first letter
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const ContentService = {
  // Get Navigation Tree from the indexed JSON
  getTree: (lang: 'en' | 'zh' = 'zh'): CategoryStructure[] => {
    // Group entries by category
    const categories: Record<string, PageMeta[]> = {};
    const categoryOrder = ['introduction', 'techniques', 'agents', 'guides', 'applications', 'prompts', 'models', 'risks', 'research'];

    // Handle case where JSON might not exist yet during initial dev
    const entries = (knowledgeBase as any)?.entries || [];

    entries.forEach((entry: any) => {
      if (!categories[entry.category]) {
        categories[entry.category] = [];
      }
      categories[entry.category].push({
        id: entry.id,
        title: entry.title,
        category: entry.category,
        path: entry.path
      });
    });

    // Map to structure 
    return categoryOrder.map(catId => {
        const pages = categories[catId] || [];
        return {
            id: catId,
            title: capitalize(catId), 
            pages: pages
        };
    }).filter(c => c.pages.length > 0);
  },

  // Deep Drill: Get Page Content with Strict File Resolution
  getPage: async (path: string, lang: 'en' | 'zh' = 'zh'): Promise<PageContent> => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const entries = (knowledgeBase as any)?.entries || [];
    
    // Find entry in knowledge base
    const entry = entries.find((e: any) => e.path === cleanPath);

    if (!entry) {
        return {
            content: `# 404 Not Found\n\nThe requested module '${cleanPath}' could not be found in the neural index.`,
            frontmatter: { title: 'Not Found' },
            title: 'Not Found',
            lang: lang,
            filePath: 'N/A',
            availableLanguages: []
        };
    }

    return {
        content: entry.content,
        frontmatter: { 
            title: entry.title, 
            description: entry.description 
        },
        title: entry.title,
        lang: entry.language as 'en' | 'zh',
        filePath: `prompt-engineering/pages/${cleanPath}.${entry.language}.mdx`,
        isFallback: entry.source_type === 'en_fallback',
        availableLanguages: ['zh', 'en'], // Simplified
        headers: entry.headers
    };
  },

  // Audit Tool: Generate Sync Report based on the JSON analysis
  getSyncReport: (): SyncStatus[] => {
    const entries = (knowledgeBase as any)?.entries || [];
    return entries.map((entry: any) => {
        let status: SyncStatus['status'] = 'synced';
        if (entry.source_type === 'en_fallback') status = 'missing_zh';
        
        return {
            id: entry.path,
            enTitle: entry.source_type === 'en_fallback' ? entry.title : '---',
            zhTitle: entry.language === 'zh' ? entry.title : '---',
            status: status
        };
    });
  }
};
