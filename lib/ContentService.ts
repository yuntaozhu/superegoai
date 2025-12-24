
/**
 * ContentService: Knowledge Indexer & Audit Manager
 * 
 * ROLE: I18n Content Architect
 * RESPONSIBILITY: 
 * 1. Read from generated/knowledge_base.json (Single Source of Truth)
 * 2. Serve content to React components
 */

// Use a relative path to avoid potential resolution issues with aliases in some environments
// @ts-ignore
import knowledgeBaseData from '../generated/knowledge_base.json' with { type: 'json' };

// Safety check for environments where JSON import might be problematic
const knowledgeBase = knowledgeBaseData || { navigationTree: [], entries: [] };

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
  getTree: (lang: 'en' | 'zh' = 'zh'): NavTreeNode[] => {
    const rawTree = (knowledgeBase as any)?.navigationTree || [];
    return rawTree.map((node: any) => mapTreeNode(node, lang));
  },

  // Fix: Completed implementation of getBlogPosts to correctly filter and map blog entries
  getBlogPosts: (lang: 'en' | 'zh' = 'zh'): PageMeta[] => {
    const entries = (knowledgeBase as any)?.entries || [];
    return entries
      .filter((e: any) => e.category === 'blog')
      .map((e: any) => {
        const locale = e.locales?.[lang] || e.locales?.['en'];
        return {
          id: e.id,
          title: locale?.title || e.id,
          category: e.category,
          path: e.path,
          description: locale?.description || '',
          date: locale?.frontmatter?.date || '',
          tags: locale?.frontmatter?.tags || [],
          author: locale?.frontmatter?.author || '',
        };
      });
  },

  // Fix: Added missing getPage method used by BlogPage and PromptGuide
  getPage: async (path: string, lang: 'en' | 'zh' = 'zh'): Promise<PageContent | null> => {
    const entries = (knowledgeBase as any)?.entries || [];
    const entry = entries.find((e: any) => e.path === path);
    if (!entry) return null;

    const isFallback = !entry.locales?.[lang];
    const localeData = entry.locales?.[lang] || entry.locales?.['en'];
    
    if (!localeData) return null;

    return {
      content: localeData.content,
      frontmatter: localeData.frontmatter || { title: localeData.title },
      title: localeData.title,
      lang: isFallback ? 'en' : lang,
      filePath: entry.path,
      isFallback,
      availableLanguages: Object.keys(entry.locales || {}) as ('en' | 'zh')[],
      headers: localeData.headers
    };
  },

  // Fix: Added missing getSyncReport method used by PromptGuide auditing
  getSyncReport: (): SyncStatus[] => {
    const entries = (knowledgeBase as any)?.entries || [];
    return entries.map((e: any) => {
      let status: SyncStatus['status'] = 'synced';
      if (!e.locales?.zh) status = 'missing_zh';
      else if (!e.locales?.en) status = 'missing_en';
      
      return {
        id: e.id,
        enTitle: e.locales?.en?.title || 'N/A',
        zhTitle: e.locales?.zh?.title || 'N/A',
        status
      };
    });
  }
};
