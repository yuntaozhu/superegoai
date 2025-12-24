/**
 * ContentService: Knowledge Indexer & Audit Manager
 * 
 * ROLE: I18n Content Architect
 * RESPONSIBILITY: 
 * 1. Read from generated/knowledge_base.json (Single Source of Truth)
 * 2. Serve content to React components
 */

// Use the robust root alias configured in the index.html import map
// @ts-ignore
import knowledgeBaseData from '@/generated/knowledge_base.json' with { type: 'json' };

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

  /**
   * Fetches all entries belonging to the 'blog' category
   */
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
      })
      .sort((a: PageMeta, b: PageMeta) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
  },

  /**
   * Retrieves content for a specific module or post by its virtual path
   */
  getPage: async (path: string, lang: 'en' | 'zh' = 'zh'): Promise<PageContent | null> => {
    const entries = (knowledgeBase as any)?.entries || [];
    const entry = entries.find((e: any) => e.path === path);
    if (!entry) return null;

    const isFallback = !entry.locales?.[lang];
    const localeData = entry.locales?.[lang] || entry.locales?.['en'] || entry.locales?.['zh'];
    
    if (!localeData) return null;

    return {
      content: localeData.content,
      frontmatter: localeData.frontmatter || { title: localeData.title },
      title: localeData.title,
      lang: isFallback ? (entry.locales?.en ? 'en' : 'zh') : lang,
      filePath: entry.path,
      isFallback,
      availableLanguages: Object.keys(entry.locales || {}) as ('en' | 'zh')[],
      headers: localeData.headers
    };
  },

  /**
   * Generates a status report of i18n synchronization for all content nodes
   */
  getSyncReport: (): SyncStatus[] => {
    const entries = (knowledgeBase as any)?.entries || [];
    return entries.map((e: any) => {
      let status: SyncStatus['status'] = 'synced';
      const hasZh = !!e.locales?.zh;
      const hasEn = !!e.locales?.en;

      if (hasZh && !hasEn) status = 'missing_en';
      else if (!hasZh && hasEn) status = 'missing_zh';
      else if (!hasZh && !hasEn) status = 'orphan';
      
      return {
        id: e.path || e.id,
        enTitle: e.locales?.en?.title || '---',
        zhTitle: e.locales?.zh?.title || '---',
        status
      };
    });
  }
};