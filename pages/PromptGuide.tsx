
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import { 
  Search, ChevronRight, ChevronDown, Terminal, Zap, Home, List, Folder, ExternalLink, ArrowRight, ArrowLeft, Languages, AlertCircle, FileText, Database, X
} from 'lucide-react';
import { ContentService, NavTreeNode, PageContent, SyncStatus } from '../lib/ContentService';
import MdxRenderer from '../components/MdxRenderer';

// Using any to bypass framer-motion type mismatch
const m = motion as any;

// Recursive Tree Item Component
const SidebarItem: React.FC<{ 
  node: NavTreeNode; 
  activePath?: string; 
  depth?: number;
  onSelect: (node: NavTreeNode) => void; 
}> = ({ node, activePath, depth = 0, onSelect }) => {
  const isActive = activePath === node.path;
  const hasChildren = node.children && node.children.length > 0;
  const isParentOfActive = activePath?.startsWith(node.id + '/') || (node.children?.some(c => activePath?.startsWith(c.path || ''))); 
  
  const [isOpen, setIsOpen] = useState(depth === 0 || isParentOfActive);

  useEffect(() => {
    const checkActive = (n: NavTreeNode): boolean => {
      if (n.path === activePath) return true;
      if (n.children) return n.children.some(checkActive);
      return false;
    };
    if (checkActive(node)) {
        setIsOpen(true);
    }
  }, [activePath, node]);

  if (node.type === 'category') {
    return (
      <div className="mb-6">
        <h3 className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
          <Folder className="w-3 h-3" />
          {node.title}
        </h3>
        <div className="space-y-1">
          {node.children?.map(child => (
            <SidebarItem 
              key={child.id} 
              node={child} 
              activePath={activePath} 
              depth={depth + 1} 
              onSelect={onSelect} 
            />
          ))}
        </div>
      </div>
    );
  }

  if (node.type === 'page') {
    return (
      <button
        onClick={() => onSelect(node)}
        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between group ${
          isActive 
            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' 
            : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
        }`}
        style={{ paddingLeft: `${depth * 12 + 12}px` }}
      >
        <span className="truncate font-medium">{node.title}</span>
        {isActive && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
      </button>
    );
  }

  if (node.type === 'group') {
    return (
      <div className="my-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-white transition-all flex items-center justify-between hover:bg-white/5"
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
        >
          <span className="font-bold flex items-center gap-2">
             {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
             {node.title}
          </span>
        </button>
        <AnimatePresence>
          {isOpen && hasChildren && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {node.children?.map(child => (
                <SidebarItem 
                  key={child.id} 
                  node={child} 
                  activePath={activePath} 
                  depth={depth + 1} 
                  onSelect={onSelect} 
                />
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return null;
};

const PromptGuide: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [tree, setTree] = useState<NavTreeNode[]>([]);
  const [activePageNode, setActivePageNode] = useState<NavTreeNode | null>(null);
  const [doc, setDoc] = useState<PageContent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showAudit, setShowAudit] = useState(false);
  const [auditReport, setAuditReport] = useState<SyncStatus[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dataTree = ContentService.getTree(language);
    setTree(dataTree);
    
    if (!activePageNode && dataTree.length > 0) {
        const findFirstPage = (nodes: NavTreeNode[]): NavTreeNode | null => {
            for (const n of nodes) {
                if (n.type === 'page') return n;
                if (n.children) {
                    const found = findFirstPage(n.children);
                    if (found) return found;
                }
            }
            return null;
        };
        const first = findFirstPage(dataTree);
        if (first) setActivePageNode(first);
    }
  }, [language]);

  useEffect(() => {
    if (activePageNode?.path) {
      setIsLoading(true);
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      
      ContentService.getPage(activePageNode.path, language).then(res => {
        setDoc(res);
        setTimeout(() => setIsLoading(false), 250); 
      });
    }
  }, [activePageNode, language]);

  useEffect(() => {
    setAuditReport(ContentService.getSyncReport());
  }, []);

  // Helper to find first page in a node branch
  const findFirstPageInNode = (node: NavTreeNode): NavTreeNode | null => {
    if (node.type === 'page') return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findFirstPageInNode(child);
        if (found) return found;
      }
    }
    return null;
  };

  // Breadcrumb Logic: Find path to active node
  const breadcrumbs = useMemo(() => {
    if (!activePageNode) return [];
    
    const lineage: NavTreeNode[] = [];
    const findPath = (nodes: NavTreeNode[], targetPath: string): boolean => {
      for (const node of nodes) {
        if (node.path === targetPath) {
          lineage.push(node);
          return true;
        }
        if (node.children) {
          if (findPath(node.children, targetPath)) {
            lineage.unshift(node);
            return true;
          }
        }
      }
      return false;
    };

    if (activePageNode.path) {
      findPath(tree, activePageNode.path);
    }
    return lineage;
  }, [tree, activePageNode]);

  const filterTree = (nodes: NavTreeNode[], query: string): NavTreeNode[] => {
    if (!query) return nodes;
    const q = query.toLowerCase();
    
    return nodes.reduce((acc: NavTreeNode[], node) => {
      const matches = node.title.toLowerCase().includes(q);
      const filteredChildren = node.children ? filterTree(node.children, query) : [];
      
      if (matches || filteredChildren.length > 0) {
        acc.push({
          ...node,
          children: filteredChildren
        });
      }
      return acc;
    }, []);
  };

  const filteredTree = useMemo(() => filterTree(tree, searchQuery), [tree, searchQuery]);

  const flattenPages = useMemo(() => {
    const pages: NavTreeNode[] = [];
    const traverse = (nodes: NavTreeNode[]) => {
        nodes.forEach(n => {
            if (n.type === 'page') pages.push(n);
            if (n.children) traverse(n.children);
        });
    };
    traverse(tree);
    return pages;
  }, [tree]);

  const activeIndex = flattenPages.findIndex(p => p.path === activePageNode?.path);
  const prevPage = activeIndex > 0 ? flattenPages[activeIndex - 1] : null;
  const nextPage = activeIndex >= 0 && activeIndex < flattenPages.length - 1 ? flattenPages[activeIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#020308] pt-16 flex overflow-hidden font-sans">
      
      <AnimatePresence>
        {showAudit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAudit(false)} />
            <m.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl bg-[#0B1026] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-full"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-xl font-black text-white flex items-center gap-3">
                  <Database className="w-5 h-5 text-blue-500" />
                  Knowledge Base Audit Protocol
                </h3>
                <button onClick={() => setShowAudit(false)} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white transition-colors">CLOSE</button>
              </div>
              <div className="flex-grow overflow-auto custom-scrollbar p-0">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-black/40 sticky top-0 z-10">
                    <tr>
                      <th className="p-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest border-b border-white/10">Module ID</th>
                      <th className="p-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest border-b border-white/10">EN Node</th>
                      <th className="p-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest border-b border-white/10">ZH Node</th>
                      <th className="p-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest border-b border-white/10">Sync Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs text-gray-300">
                    {auditReport.map((row) => (
                      <tr key={row.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono text-blue-400">{row.id}</td>
                        <td className="p-4">{row.enTitle}</td>
                        <td className="p-4 opacity-80">{row.zhTitle}</td>
                        <td className="p-4">
                          {row.status === 'synced' && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold uppercase"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Synced</span>}
                          {row.status === 'missing_zh' && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-[10px] font-bold uppercase"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> ZH Missing</span>}
                          {row.status === 'orphan' && <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Empty</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSidebarOpen && (
          <m.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-72 border-r border-white/5 bg-[#05060f]/90 backdrop-blur-3xl flex flex-col h-[calc(100vh-64px)] z-20 absolute md:static"
          >
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-blue-500" />
                </div>
                <h2 className="text-[10px] font-black text-white uppercase tracking-widest">
                  Knowledge Hub
                </h2>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                <input 
                  type="text" 
                  placeholder={language === 'zh' ? "快速定位模块..." : "Quick search..."}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-8 py-2 text-[11px] text-white focus:outline-none focus:border-blue-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            <nav className="flex-grow overflow-y-auto custom-scrollbar p-4 pb-20">
              {filteredTree.map(node => (
                <SidebarItem 
                  key={node.id} 
                  node={node} 
                  activePath={activePageNode?.path} 
                  onSelect={(n) => {
                    setActivePageNode(n);
                    if(window.innerWidth < 768) setIsSidebarOpen(false);
                  }}
                />
              ))}
            </nav>

            <div className="p-4 border-t border-white/5 bg-black/20 flex flex-col gap-2">
               <button 
                 onClick={() => setShowAudit(true)}
                 className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-blue-500/10 text-[9px] text-gray-400 hover:text-blue-400 border border-white/5 hover:border-blue-500/30 transition-all font-bold uppercase tracking-widest"
               >
                 <Database className="w-3 h-3" /> Run Knowledge Audit
               </button>
               <a href="https://github.com/dair-ai/Prompt-Engineering-Guide" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-[9px] text-gray-500 hover:text-white transition-colors">
                <span>Core Research Repo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </m.aside>
        )}
      </AnimatePresence>

      <main className="flex-grow flex flex-col relative min-w-0 bg-black/40 h-[calc(100vh-64px)]">
        {/* Navigation Bar */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#020308]/60 backdrop-blur-md sticky top-0 z-10">
           <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors">
              <List className="w-4 h-4" />
            </button>
            
            {/* Topbar Breadcrumbs */}
            <div className="flex items-center gap-2 text-[9px] font-mono text-gray-700 uppercase tracking-[0.2em] overflow-hidden whitespace-nowrap">
              {breadcrumbs.map((bc, idx) => (
                <React.Fragment key={bc.id}>
                   <button 
                     onClick={() => {
                       const firstPage = findFirstPageInNode(bc);
                       if (firstPage) setActivePageNode(firstPage);
                     }}
                     className={`hidden sm:inline transition-colors hover:text-white ${idx === breadcrumbs.length - 1 ? 'text-blue-500 font-black' : 'opacity-60'}`}
                   >
                     {bc.title}
                   </button>
                   {idx < breadcrumbs.length - 1 && <ChevronRight className="w-2.5 h-2.5 hidden sm:inline opacity-30" />}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button 
                onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                className="text-[9px] font-bold text-gray-500 hover:text-white transition-colors mr-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-transparent hover:border-white/10"
             >
                <Languages className="w-3 h-3" /> 
                {language === 'en' ? 'ENGLISH' : '中文'}
             </button>
             <Link to="/studio" className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">
               <Zap className="w-3 h-3 fill-current" /> <span className="hidden sm:inline">{language === 'zh' ? '实验室' : 'Studio'}</span>
             </Link>
          </div>
        </div>

        {/* Content Area */}
        <div ref={scrollContainerRef} className="flex-grow overflow-y-auto custom-scrollbar bg-black/10">
          <div className="max-w-4xl mx-auto py-12 px-6 md:px-12 min-h-full">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <m.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-40 gap-4">
                  <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                  <span className="text-[10px] font-mono text-gray-700 uppercase tracking-[0.4em] animate-pulse">Syncing_Nodes...</span>
                </m.div>
              ) : (
                <m.article key={`${activePageNode?.path}-${language}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  
                  {/* File Source Header */}
                  {doc && (
                    <div className="mb-10 p-4 rounded-xl border border-white/10 bg-white/5 font-mono text-xs">
                       <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                             <FileText className="w-3 h-3" /> Source File
                          </span>
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${doc.isFallback ? 'text-yellow-500' : 'text-green-500'}`}>
                             {doc.isFallback ? '⚠️ FALLBACK MODE' : '✅ SYNCED'}
                          </span>
                       </div>
                       <div className="flex flex-col sm:flex-row gap-4 text-gray-400">
                          <div className="flex-1 truncate">
                             <span className="text-gray-600 mr-2">PATH:</span> 
                             <span className="text-blue-300">{doc.filePath}</span>
                          </div>
                       </div>
                       {doc.isFallback && (
                          <div className="mt-3 text-yellow-500/80 italic flex items-center gap-2">
                             <AlertCircle className="w-3 h-3" />
                             {language === 'zh' ? '中文版本暂缺，正在显示英文原版内容。' : 'Requested language missing, showing fallback.'}
                          </div>
                       )}
                    </div>
                  )}

                  {/* Main Content Breadcrumbs */}
                  <nav className="flex items-center flex-wrap gap-y-2 gap-x-2 mb-10 text-[9px] font-mono uppercase tracking-[0.2em] text-gray-600">
                    <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                      <Home className="w-3 h-3" /> Guide
                    </Link>
                    {breadcrumbs.map((bc, idx) => (
                      <React.Fragment key={bc.id}>
                        <ChevronRight className="w-2.5 h-2.5 opacity-20" />
                        <button 
                          onClick={() => {
                            const firstPage = findFirstPageInNode(bc);
                            if (firstPage) setActivePageNode(firstPage);
                          }}
                          className={`transition-colors ${idx === breadcrumbs.length - 1 ? 'text-blue-500 font-black' : 'hover:text-gray-400'}`}
                        >
                          {bc.title}
                        </button>
                      </React.Fragment>
                    ))}
                  </nav>

                  {/* Render Content */}
                  {doc && <MdxRenderer content={doc.content} />}
                  
                  {/* Prev/Next Navigation */}
                  <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-between border-t border-white/5 pt-8">
                    {prevPage ? (
                      <button 
                        onClick={() => { setActivePageNode(prevPage); if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0; }}
                        className="group flex flex-col items-start gap-2 p-4 rounded-xl border border-white/5 hover:border-blue-500/30 bg-white/5 hover:bg-white/10 transition-all flex-1 text-left"
                      >
                        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest group-hover:text-blue-400 transition-colors flex items-center gap-1">
                          <ArrowLeft className="w-3 h-3" /> Previous
                        </span>
                        <span className="text-sm font-bold text-white">{prevPage.title}</span>
                      </button>
                    ) : <div className="flex-1" />}
                    
                    {nextPage ? (
                      <button 
                        onClick={() => { setActivePageNode(nextPage); if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0; }}
                        className="group flex flex-col items-end gap-2 p-4 rounded-xl border border-white/5 hover:border-blue-500/30 bg-white/5 hover:bg-white/10 transition-all flex-1 text-right"
                      >
                        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest group-hover:text-blue-400 transition-colors flex items-center gap-1">
                          Next <ArrowRight className="w-3 h-3" />
                        </span>
                        <span className="text-sm font-bold text-white">{nextPage.title}</span>
                      </button>
                    ) : <div className="flex-1" />}
                  </div>
                </m.article>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PromptGuide;
