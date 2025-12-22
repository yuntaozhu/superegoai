
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
  description?: string;
  date?: string;
  tags?: string[];
  author?: string;
}

export interface NavTreeNode {
  id: string;
  title: string;
  type: 'category' | 'group' | 'page';
  path?: string;
  children?: NavTreeNode[];
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

// Helper to map raw tree node to localized NavTreeNode
const mapTreeNode = (node: any, lang: 'en' | 'zh'): NavTreeNode => {
  const title = node.titles?.[lang] || node.titles?.['en'] || node.id;
  return {
    id: node.id,
    title: title,
    type: node.type,
    path: node.path,
    children: node.children ? node.children.map((c: any) => mapTreeNode(c, lang)) : undefined
  };
};

export const ContentService = {
  // Get Navigation Tree from the indexed JSON (Hierarchical)
  getTree: (lang: 'en' | 'zh' = 'zh'): NavTreeNode[] => {
    const rawTree = (knowledgeBase as any)?.navigationTree || [];
    return rawTree.map((node: any) => mapTreeNode(node, lang));
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
    // Support both with and without leading slash
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

    // Heuristic for file path (mostly for display/debug)
    let displayPath = '';
    if (entry.category === 'blog') {
        displayPath = `blog/posts/${entry.id}.${actualLang}.mdx`;
    } else {
        // Construct path from id and category? 
        // Since we have hierarchical paths now, it's safer to rely on the virtual path
        displayPath = `prompt-engineering/pages/${cleanPath}.${actualLang}.mdx`;
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
        filePath: displayPath,
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
