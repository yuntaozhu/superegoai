
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import { 
  Search, ChevronRight, Terminal, Zap, Home, Globe, List, Folder, ExternalLink, ArrowRight, ArrowLeft, Languages, AlertCircle, FileText, Database, X
} from 'lucide-react';
import { ContentService, CategoryStructure, PageMeta, PageContent, SyncStatus } from '../lib/ContentService';
import MdxRenderer from '../components/MdxRenderer';

// Using any to bypass framer-motion type mismatch
const m = motion as any;

const PromptGuide: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [tree, setTree] = useState<CategoryStructure[]>([]);
  const [activePage, setActivePage] = useState<PageMeta | null>(null);
  const [doc, setDoc] = useState<PageContent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showAudit, setShowAudit] = useState(false); // Audit Modal State
  const [auditReport, setAuditReport] = useState<SyncStatus[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync tree on language change
  useEffect(() => {
    const dataTree = ContentService.getTree(language);
    setTree(dataTree);
    
    // Restore or Default Position
    if (activePage) {
      const match = dataTree.flatMap(c => c.pages).find(p => p.id === activePage.id);
      if (match) setActivePage(match);
      else if (dataTree[0]?.pages[0]) setActivePage(dataTree[0].pages[0]);
    } else if (dataTree[0]?.pages[0]) {
      setActivePage(dataTree[0].pages[0]);
    }
  }, [language]);

  // Load content
  useEffect(() => {
    if (activePage) {
      setIsLoading(true);
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      
      ContentService.getPage(activePage.path, language).then(res => {
        setDoc(res);
        setTimeout(() => setIsLoading(false), 250); 
      });
    }
  }, [activePage, language]);

  // Generate Audit Report on mount
  useEffect(() => {
    setAuditReport(ContentService.getSyncReport());
  }, []);

  const filteredTree = useMemo(() => {
    if (!searchQuery) return tree;
    const q = searchQuery.toLowerCase();
    return tree.map(cat => ({
      ...cat,
      pages: cat.pages.filter(p => 
        p.title.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q)) ||
        cat.title.toLowerCase().includes(q)
      )
    })).filter(cat => cat.pages.length > 0);
  }, [tree, searchQuery]);

  // Prev/Next Logic
  const flattenPages = useMemo(() => tree.flatMap(cat => cat.pages), [tree]);
  const activeIndex = flattenPages.findIndex(p => p.path === activePage?.path);
  const prevPage = activeIndex > 0 ? flattenPages[activeIndex - 1] : null;
  const nextPage = activeIndex >= 0 && activeIndex < flattenPages.length - 1 ? flattenPages[activeIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#020308] pt-16 flex overflow-hidden font-sans">
      
      {/* Audit Modal */}
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
              {filteredTree.map(category => (
                <div key={category.id} className="mb-6">
                  <h3 className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
                    <Folder className="w-3 h-3" />
                    {category.title}
                  </h3>
                  <div className="space-y-1">
                    {category.pages.map(page => (
                      <button
                        key={page.id}
                        onClick={() => { setActivePage(page); if(window.innerWidth < 768) setIsSidebarOpen(false); }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between group ${
                          activePage?.path === page.path 
                            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' 
                            : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="truncate font-medium">{page.title}</div>
                          {searchQuery && page.description && (
                            <div className="truncate text-[9px] opacity-60 mt-0.5 font-light">{page.description}</div>
                          )}
                        </div>
                        <ChevronRight className={`w-3 h-3 flex-shrink-0 transition-transform ${activePage?.path === page.path ? 'opacity-100' : 'opacity-0 group-hover:opacity-40 group-hover:translate-x-0.5'}`} />
                      </button>
                    ))}
                  </div>
                </div>
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
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-700 uppercase tracking-widest overflow-hidden whitespace-nowrap">
              <span className="hidden sm:inline">{tree.find(c => c.id === activePage?.category)?.title}</span>
              <ChevronRight className="w-2.5 h-2.5 hidden sm:inline" />
              <span className="text-blue-500 font-black truncate">{doc?.title}</span>
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
                <m.article key={`${activePage?.path}-${language}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  
                  {/* File Source Header (Structured Block) */}
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
                          <div className="flex-1">
                             <span className="text-gray-600 mr-2">PATH:</span> 
                             <span className="text-blue-300">{doc.filePath}</span>
                          </div>
                          {doc.availableLanguages.length > 1 && (
                             <div className="flex gap-2">
                                {doc.availableLanguages.includes('en') && (
                                   <button 
                                     onClick={() => setLanguage('en')} 
                                     className={`px-2 py-0.5 rounded text-[9px] border ${language === 'en' ? 'bg-blue-500 text-white border-blue-500' : 'border-white/20 hover:border-white/50'}`}
                                   >
                                     EN
                                   </button>
                                )}
                                {doc.availableLanguages.includes('zh') && (
                                   <button 
                                     onClick={() => setLanguage('zh')} 
                                     className={`px-2 py-0.5 rounded text-[9px] border ${language === 'zh' ? 'bg-blue-500 text-white border-blue-500' : 'border-white/20 hover:border-white/50'}`}
                                   >
                                     ZH
                                   </button>
                                )}
                             </div>
                          )}
                       </div>
                       {doc.isFallback && (
                          <div className="mt-3 text-yellow-500/80 italic flex items-center gap-2">
                             <AlertCircle className="w-3 h-3" />
                             {language === 'zh' ? '中文版本暂缺，正在显示英文原版内容。' : 'Requested language missing, showing fallback.'}
                          </div>
                       )}
                    </div>
                  )}

                  <nav className="flex items-center gap-2 mb-10 text-[9px] font-mono uppercase tracking-[0.2em] text-gray-600">
                    <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                      <Home className="w-3 h-3" /> Guide
                    </Link>
                    <ChevronRight className="w-2.5 h-2.5 opacity-20" />
                    <span className="opacity-40">{tree.find(c => c.id === activePage?.category)?.title}</span>
                    <ChevronRight className="w-2.5 h-2.5 opacity-20" />
                    <span className="text-blue-500 font-black">{doc?.title}</span>
                  </nav>

                  {/* Render Content */}
                  {doc && <MdxRenderer content={doc.content} />}
                  
                  {/* Prev/Next Navigation */}
                  <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-between border-t border-white/5 pt-8">
                    {prevPage ? (
                      <button 
                        onClick={() => { setActivePage(prevPage); if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0; }}
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
                        onClick={() => { setActivePage(nextPage); if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0; }}
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
