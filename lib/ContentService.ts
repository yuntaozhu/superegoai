
/**
 * ContentService: Knowledge Indexer & Audit Manager
 */

// Import static knowledge base with fallback for development environments
let knowledgeBase: any = { navigationTree: [], entries: [] };

async function initKnowledgeBase() {
  try {
    // @ts-ignore
    const data = await import('@/generated/knowledge_base.json', { with: { type: 'json' } });
    knowledgeBase = data.default || data;
  } catch (e) {
    console.warn("Knowledge base JSON not found or failed to load. Using empty state.");
  }
}

// Pre-initialize
initKnowledgeBase();

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
    const rawTree = knowledgeBase.navigationTree || [];
    return rawTree.map((node: any) => mapTreeNode(node, lang));
  },

  getBlogPosts: (lang: 'en' | 'zh' = 'zh'): PageMeta[] => {
    const entries = knowledgeBase.entries || [];
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

  getPage: async (path: string, lang: 'en' | 'zh' = 'zh'): Promise<PageContent | null> => {
    // Ensure we wait for data if it's still loading (though usually it's fine)
    const entries = knowledgeBase.entries || [];
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
      filePath: path,
      isFallback,
      availableLanguages: Object.keys(entry.locales || {}) as ('en' | 'zh')[],
      headers: localeData.headers
    };
  },

  getSyncReport: (): SyncStatus[] => {
    const entries = knowledgeBase.entries || [];
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
