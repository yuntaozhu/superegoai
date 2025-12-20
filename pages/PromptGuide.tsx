
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import { 
  Search, ChevronRight, BookOpen, 
  Layers, Cpu, Code, ShieldAlert, Database, Info, 
  Terminal, Sparkles, Zap, List
} from 'lucide-react';
import { loadContentRegistry, extractPrompts, PageNode } from '../lib/content-parser';
import MdxRenderer from '../components/MdxRenderer';

const PromptGuide: React.FC = () => {
  const { language } = useLanguage();
  const [registry, setRegistry] = useState<ReturnType<typeof loadContentRegistry> | null>(null);
  const [activePage, setActivePage] = useState<PageNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load content registry on language change
  useEffect(() => {
    try {
      const data = loadContentRegistry(language);
      setRegistry(data);
      // Auto-select first page if none selected or if switching languages
      if (data.categories.length > 0) {
        if (!activePage || !data.categories.some(c => c.pages.some(p => p.path === activePage.path))) {
          setActivePage(data.categories[0].pages[0]);
        }
      }
    } catch (err) {
      console.error("Failed to load prompt registry:", err);
    }
  }, [language]);

  const currentContent = useMemo(() => {
    if (!registry || !activePage) return '';
    return registry.rawFiles[activePage.path] || '';
  }, [registry, activePage]);

  const extractedPrompts = useMemo(() => {
    return extractPrompts(currentContent);
  }, [currentContent]);

  const filteredCategories = useMemo(() => {
    if (!registry) return [];
    if (!searchQuery) return registry.categories;
    
    return registry.categories.map(cat => ({
      ...cat,
      pages: cat.pages.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        cat.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(cat => cat.pages.length > 0);
  }, [registry, searchQuery]);

  const getIcon = (id: string) => {
    switch (id) {
      case 'introduction': return <Info className="w-4 h-4" />;
      case 'techniques': return <Layers className="w-4 h-4" />;
      case 'applications': return <Code className="w-4 h-4" />;
      case 'agents': return <Cpu className="w-4 h-4" />;
      case 'research': return <Database className="w-4 h-4" />;
      case 'risks': return <ShieldAlert className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  if (!registry) return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center font-mono gap-4">
      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      <div className="text-blue-500 animate-pulse uppercase tracking-[0.2em] text-xs">Initializing_Knowledge_Matrix</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-dark pt-16 flex overflow-hidden">
      
      {/* LEFT: Navigator */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-72 border-r border-white/5 bg-black/20 backdrop-blur-xl flex flex-col h-[calc(100vh-64px)] z-20"
          >
            <div className="p-6 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                <input 
                  type="text"
                  placeholder={language === 'en' ? "Search matrix..." : "搜索矩阵..."}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-all font-mono"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <nav className="flex-grow overflow-y-auto custom-scrollbar p-4 space-y-6">
              {filteredCategories.map(cat => (
                <div key={cat.id} className="space-y-1">
                  <h4 className="px-3 text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-2">
                    {getIcon(cat.id)}
                    {cat.title}
                  </h4>
                  {cat.pages.map(page => (
                    <button
                      key={page.path}
                      onClick={() => setActivePage(page)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between group ${
                        activePage?.path === page.path 
                        ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span className="truncate">{page.title}</span>
                      {activePage?.path === page.path && <Zap className="w-3 h-3 fill-current animate-pulse" />}
                    </button>
                  ))}
                </div>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MIDDLE: Reader */}
      <main className="flex-grow flex flex-col h-[calc(100vh-64px)] relative">
        <div className="h-12 border-b border-white/5 px-6 flex items-center justify-between bg-brand-dark/40 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 hover:bg-white/5 rounded-md text-gray-500 hover:text-white transition-colors"
            >
              <List className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              <span>{activePage?.category}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-400">{activePage?.title}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/studio" className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Lab
            </Link>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar p-8 md:p-16 max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage?.path}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <MdxRenderer content={currentContent} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* RIGHT: Prompt Hub */}
      <aside className="hidden xl:flex w-80 border-l border-white/5 flex-col bg-black/10 h-[calc(100vh-64px)] overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5">
          <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-yellow-500" />
            {language === 'en' ? "Registry" : "提示词库"}
          </h3>
          <p className="text-[10px] text-gray-500 mt-1 uppercase font-mono">Found {extractedPrompts.length} snippets</p>
        </div>
        
        <div className="flex-grow overflow-y-auto custom-scrollbar p-4 space-y-4">
          {extractedPrompts.length > 0 ? (
            extractedPrompts.map((p, i) => (
              <div key={i} className="group p-4 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/30 transition-all hover:bg-white/[0.07]">
                 <div className="flex justify-between items-start mb-3">
                   <span className="text-[8px] font-mono text-gray-600">ID: {activePage?.id?.toUpperCase()}_0{i+1}</span>
                   <button 
                     onClick={() => {
                        navigator.clipboard.writeText(p);
                        alert('Prompt copied to clipboard');
                     }}
                     className="text-gray-500 hover:text-white transition-colors"
                   >
                     <Terminal className="w-3 h-3" />
                   </button>
                 </div>
                 <p className="text-[11px] text-gray-400 line-clamp-4 font-mono leading-relaxed mb-4">
                   {p}
                 </p>
                 <button 
                  onClick={() => {
                    const encoded = encodeURIComponent(p);
                    window.location.hash = `/studio?prompt=${encoded}`;
                  }}
                  className="w-full py-2 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                 >
                   Inject to Lab
                 </button>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-20 px-8">
              <Terminal className="w-8 h-8 mb-4" />
              <p className="text-[10px] uppercase tracking-widest font-mono">No prompts in current segment</p>
            </div>
          )}
        </div>
      </aside>

      <style>{`
        .mdx-content p { margin-bottom: 1.5rem; color: #94a3b8; font-size: 0.95rem; line-height: 1.7; }
        .mdx-content h1 { font-size: 2.25rem; font-weight: 900; color: white; margin-bottom: 2rem; text-transform: uppercase; letter-spacing: -0.05em; }
        .mdx-content h2 { font-size: 1.5rem; font-weight: 700; color: white; margin-top: 3rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
        .mdx-content h3 { font-size: 1.25rem; font-weight: 700; color: #3b82f6; margin-top: 2rem; margin-bottom: 1rem; }
        .mdx-content ul { list-style-type: square; margin-left: 1.5rem; margin-bottom: 1.5rem; color: #94a3b8; }
        .mdx-content li { margin-bottom: 0.5rem; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default PromptGuide;
