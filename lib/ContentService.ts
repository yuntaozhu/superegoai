
/**
 * ContentService: Knowledge Indexer & Audit Manager
 * 
 * ROLE: I18n Content Architect
 * RESPONSIBILITY: 
 * 1. Read from generated/knowledge_base.json (Single Source of Truth)
 * 2. Serve content to React components
 */

// Import the generated JSON using a relative path to avoid alias resolution issues in some environments.
// @ts-ignore
import knowledgeBase from '../generated/knowledge_base.json';

export interface PageMeta {
  id: string;
  title: string;
  category: string;
  path: string;
  description?: string;
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
      // Ensure locales object exists before accessing
      const locales = entry.locales || {};
      // Resolve title based on requested language, with fallback
      const localeData = locales[lang] || locales.en || locales.zh;
      
      if (!categories[entry.category]) {
        categories[entry.category] = [];
      }
      categories[entry.category].push({
        id: entry.id,
        title: localeData?.title || entry.id,
        category: entry.category,
        path: entry.path,
        description: localeData?.description || ''
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

    // Determine available languages
    const locales = entry.locales || {};
    const availableLanguages: ('en' | 'zh')[] = [];
    if (locales.zh) availableLanguages.push('zh');
    if (locales.en) availableLanguages.push('en');

    // Select content based on language preference
    let selectedData = locales[lang];
    let isFallback = false;
    let actualLang = lang;

    // Fallback logic: If requested language is missing, try the other one
    if (!selectedData) {
        if (lang === 'zh' && locales.en) {
            selectedData = locales.en;
            actualLang = 'en';
            isFallback = true;
        } else if (lang === 'en' && locales.zh) {
            selectedData = locales.zh;
            actualLang = 'zh';
            isFallback = true;
        }
    }

    if (!selectedData) {
         return {
            content: `# Content Unavailable\n\nThis module is indexed but has no content in either language.`,
            frontmatter: { title: 'Empty' },
            title: entry.id,
            lang: lang,
            filePath: 'N/A',
            availableLanguages: []
        };
    }

    return {
        content: selectedData.content,
        frontmatter: { 
            title: selectedData.title, 
            description: selectedData.description 
        },
        title: selectedData.title,
        lang: actualLang,
        filePath: `prompt-engineering/pages/${cleanPath}.${actualLang}.mdx`,
        isFallback: isFallback,
        availableLanguages: availableLanguages,
        headers: selectedData.headers
    };
  },

  // Audit Tool: Generate Sync Report based on the JSON analysis
  getSyncReport: (): SyncStatus[] => {
    const entries = (knowledgeBase as any)?.entries || [];
    return entries.map((entry: any) => {
        const locales = entry.locales || {};
        const hasZh = !!locales.zh;
        const hasEn = !!locales.en;
        
        let status: SyncStatus['status'] = 'synced';
        if (hasZh && !hasEn) status = 'missing_en';
        else if (!hasZh && hasEn) status = 'missing_zh';
        else if (!hasZh && !hasEn) status = 'orphan';
        
        return {
            id: entry.path,
            enTitle: hasEn ? locales.en.title : '---',
            zhTitle: hasZh ? locales.zh.title : '---',
            status: status
        };
    });
  }
};
