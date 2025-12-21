
/**
 * ContentService: Knowledge Indexer & Audit Manager
 * 
 * ROLE: I18n Content Architect
 * RESPONSIBILITY: 
 * 1. Read from generated/knowledge_base.json (Single Source of Truth)
 * 2. Serve content to React components
 */

// Import the generated JSON. 
// Note: In a real environment, you might fetch this if it's external, but here we import directly.
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

    knowledgeBase.entries.forEach((entry: any) => {
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

    // Map to structure and sort based on meta_order if available, otherwise default
    return categoryOrder.map(catId => {
        const pages = categories[catId] || [];
        // Sort pages if they have meta_order in the JSON, otherwise keep native order
        // (The generation script already pushes them in meta order, so mostly we just return)
        return {
            id: catId,
            title: capitalize(catId), // In a real app, you might want a map for localized category titles
            pages: pages
        };
    }).filter(c => c.pages.length > 0);
  },

  // Deep Drill: Get Page Content with Strict File Resolution
  getPage: async (path: string, lang: 'en' | 'zh' = 'zh'): Promise<PageContent> => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    // Find entry in knowledge base
    const entry = knowledgeBase.entries.find((e: any) => e.path === cleanPath);

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
        availableLanguages: ['zh', 'en'], // In this simplified view, we assume both exist or fallbacks handle it
        headers: entry.headers
    };
  },

  // Audit Tool: Generate Sync Report based on the JSON analysis
  getSyncReport: (): SyncStatus[] => {
    return knowledgeBase.entries.map((entry: any) => {
        let status: SyncStatus['status'] = 'synced';
        if (entry.source_type === 'en_fallback') status = 'missing_zh';
        if (entry.source_type === 'en_native') status = 'missing_zh'; // Assuming target is ZH

        return {
            id: entry.path,
            enTitle: entry.source_type === 'en_fallback' ? entry.title : '---', // Simplified for report
            zhTitle: entry.language === 'zh' ? entry.title : '---',
            status: status
        };
    });
  }
};
