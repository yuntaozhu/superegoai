import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import { 
  Search, ChevronRight, Terminal, Zap, Home, Globe, List, Folder, ExternalLink, ArrowRight, ArrowLeft
} from 'lucide-react';
import { ContentService, CategoryStructure, PageMeta } from '../lib/ContentService';
import MdxRenderer from '../components/MdxRenderer';

// Using any to bypass framer-motion type mismatch
const m = motion as any;

const PromptGuide: React.FC = () => {
  const { language } = useLanguage();
  const [tree, setTree] = useState<CategoryStructure[]>([]);
  const [activePage, setActivePage] = useState<PageMeta | null>(null);
  const [doc, setDoc] = useState<{ content: string; frontmatter: any; title: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
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
      // Reset scroll
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      
      ContentService.getPage(activePage.path, language).then(res => {
        setDoc(res);
        setTimeout(() => setIsLoading(false), 250); // slight delay for smooth transition
      });
    }
  }, [activePage, language]);

  const filteredTree = useMemo(() => {
    if (!searchQuery) return tree;
    const q = searchQuery.toLowerCase();
    return tree.map(cat => ({
      ...cat,
      pages: cat.pages.filter(p => 
        p.title.toLowerCase().includes(q) || 
        cat.title.toLowerCase().includes(q)
      )
    })).filter(cat => cat.pages.length > 0);
  }, [tree, searchQuery]);

  // Determine Prev/Next Links
  const flattenPages = useMemo(() => tree.flatMap(cat => cat.pages), [tree]);
  const activeIndex = flattenPages.findIndex(p => p.path === activePage?.path);
  const prevPage = activeIndex > 0 ? flattenPages[activeIndex - 1] : null;
  const nextPage = activeIndex >= 0 && activeIndex < flattenPages.length - 1 ? flattenPages[activeIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#020308] pt-16 flex overflow-hidden">
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-[11px] text-white focus:outline-none focus:border-blue-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                        <span className="truncate">{page.title}</span>
                        <ChevronRight className={`w-3 h-3 transition-transform ${activePage?.path === page.path ? 'opacity-100' : 'opacity-0 group-hover:opacity-40 group-hover:translate-x-0.5'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-white/5 bg-black/20">
               <a href="https://github.com/dair-ai/Prompt-Engineering-Guide" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-[9px] text-gray-500 hover:text-white transition-colors">
                <span>Core Research Repo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </m.aside>
        )}
      </AnimatePresence>

      <main className="flex-grow flex flex-col relative min-w-0 bg-black/40 h-[calc(100vh-64px)]">
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
             <div className="text-[9px] font-bold text-gray-600 mr-2 flex items-center gap-1.5">
                <Globe className="w-3 h-3" /> {language.toUpperCase()}
             </div>
             <Link to="/studio" className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">
               <Zap className="w-3 h-3 fill-current" /> <span className="hidden sm:inline">{language === 'zh' ? '实验室' : 'Studio'}</span>
             </Link>
          </div>
        </div>

        <div ref={scrollContainerRef} className="flex-grow overflow-y-auto custom-scrollbar bg-black/10">
          <div className="max-w-4xl mx-auto py-16 px-6 md:px-12 min-h-full">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <m.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-40 gap-4">
                  <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                  <span className="text-[10px] font-mono text-gray-700 uppercase tracking-[0.4em] animate-pulse">Syncing_Nodes...</span>
                </m.div>
              ) : (
                <m.article key={`${activePage?.path}-${language}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <nav className="flex items-center gap-2 mb-10 text-[9px] font-mono uppercase tracking-[0.2em] text-gray-600">
                    <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                      <Home className="w-3 h-3" /> Guide
                    </Link>
                    <ChevronRight className="w-2.5 h-2.5 opacity-20" />
                    <span className="opacity-40">{tree.find(c => c.id === activePage?.category)?.title}</span>
                    <ChevronRight className="w-2.5 h-2.5 opacity-20" />
                    <span className="text-blue-500 font-black">{doc?.title}</span>
                  </nav>

                  {/* Render Content using the new MdxRenderer */}
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

                  <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 opacity-40 hover:opacity-100 transition-opacity">
                     <div className="space-y-1">
                        <span className="text-[9px] text-gray-700 uppercase font-black tracking-widest">Metadata Source</span>
                        <div className="text-[10px] text-white">prompt-engineering/pages/{activePage?.path}</div>
                     </div>
                     <Link to="/studio" className="flex items-center gap-2 group text-right">
                        <div className="flex flex-col items-end">
                           <span className="text-[9px] text-gray-700 uppercase font-bold tracking-widest">Execute in Lab</span>
                        </div>
                        <Zap className="w-4 h-4 text-blue-500 group-hover:fill-current transition-colors" />
                     </Link>
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