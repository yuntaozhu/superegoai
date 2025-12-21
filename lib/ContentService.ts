
/**
 * ContentService: Knowledge Indexer & Audit Manager
 * 
 * ROLE: I18n Content Architect
 * RESPONSIBILITY: 
 * 1. Read from generated/knowledge_base.json (Single Source of Truth)
 * 2. Serve content to React components
 */

// Import the generated JSON using a relative path to avoid alias resolution issues.
// We strictly use relative path '../generated/knowledge_base.json' because alias '@/' might fail in some environments
// if not perfectly configured or if the file is outside the 'src' root context.
// @ts-ignore
import knowledgeBase from '../generated/knowledge_base.json';

export interface PageMeta {
  id: string;
  title: string;
  category: string;
  path: string;
  description?: string;
  date?: string;
  tags?: string[];
  author?: string;
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
  frontmatter: { title: string; date?: string; tags?: string[]; author?: string; [key: string]: any };
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
      // Skip blog posts for the main tree
      if (entry.category === 'blog') return;

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

  // Get Blog Posts specially
  getBlogPosts: (lang: 'en' | 'zh' = 'zh'): PageMeta[] => {
    const entries = (knowledgeBase as any)?.entries || [];
    const posts: PageMeta[] = [];

    entries.forEach((entry: any) => {
      if (entry.category !== 'blog') return;

      const locales = entry.locales || {};
      const localeData = locales[lang] || locales.en || locales.zh;

      if (localeData) {
        posts.push({
          id: entry.id,
          title: localeData.title || entry.id,
          category: 'blog',
          path: entry.path,
          description: localeData.description || '',
          // Extract frontmatter
          date: localeData.frontmatter?.date,
          tags: localeData.frontmatter?.tags,
          author: localeData.frontmatter?.author
        });
      }
    });

    // Sort by date desc
    return posts.sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      return dateB - dateA;
    });
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
            description: selectedData.description,
            ...selectedData.frontmatter 
        },
        title: selectedData.title,
        lang: actualLang,
        filePath: entry.category === 'blog' 
            ? `blog/posts/${entry.id}.${actualLang}.mdx`
            : `prompt-engineering/pages/${cleanPath.replace(entry.category + '/', '')}.${actualLang}.mdx`, // Reconstruct path roughly
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
