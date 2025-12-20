
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import { 
  Search, ChevronRight, Terminal, Zap, Hash, Home, Globe, Menu, Folder, List, ExternalLink, ArrowRight
} from 'lucide-react';
import { ContentService, CategoryStructure, PageMeta } from '../lib/ContentService';
import { MdxComponents } from '../components/MdxComponents';

// Using any to bypass framer-motion type mismatch in the current environment
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

  // Initial Indexing and re-index on language change
  useEffect(() => {
    const dataTree = ContentService.getTree(language);
    setTree(dataTree);
    
    // Attempt to maintain selection if path exists in new language tree, otherwise reset to first page
    if (activePage) {
      const currentPath = activePage.path;
      let found = false;
      for (const cat of dataTree) {
        const match = cat.pages.find(p => p.path === currentPath);
        if (match) {
          setActivePage(match);
          found = true;
          break;
        }
      }
      if (!found && dataTree.length > 0) {
        setActivePage(dataTree[0].pages[0]);
      }
    } else if (dataTree.length > 0) {
      setActivePage(dataTree[0].pages[0]);
    }
  }, [language]);

  // Load content when active page or language changes
  useEffect(() => {
    if (activePage) {
      setIsLoading(true);
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      
      ContentService.getPage(activePage.path, language).then(res => {
        setDoc(res);
        setTimeout(() => setIsLoading(false), 200);
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

  const activeCategoryTitle = useMemo(() => {
    if (!activePage) return '';
    return tree.find(c => c.id === activePage.category)?.title || activePage.category;
  }, [tree, activePage]);

  // Enhanced regex-based "MDX" renderer for browser environment
  const renderMdx = (content: string) => {
    const parts = content.split(/(<Callout[\s\S]*?<\/Callout>|<Cards[\s\S]*?<\/Cards>|<Steps[\s\S]*?<\/Steps>|```[\s\S]*?```|#{1,3}\s.*)/g);

    return parts.map((part, i) => {
      if (!part || !part.trim()) return null;

      // Handle custom components
      if (part.startsWith('<Callout')) {
        const type = part.match(/type="(.*?)"/)?.[1] || 'info';
        const children = part.replace(/<Callout.*?>|<\/Callout>/g, '').trim();
        return <MdxComponents.Callout key={i} type={type as any}>{children}</MdxComponents.Callout>;
      }
      if (part.startsWith('<Cards')) {
        const cardMatches = part.matchAll(/<Card title="(.*?)" href="(.*?)">(.*?)<\/Card>/g);
        const cards = Array.from(cardMatches).map((m_match, ci) => (
          <MdxComponents.Card key={ci} title={m_match[1]} href={m_match[2]}>{m_match[3]}</MdxComponents.Card>
        ));
        return <MdxComponents.Cards key={i}>{cards}</MdxComponents.Cards>;
      }
      if (part.startsWith('<Steps')) {
        const children = part.replace(/<Steps>|<\/Steps>/g, '').trim();
        const steps = children.split(/\n\s*\d+\.\s+/).filter(Boolean).map((s, si) => (
          <div key={si} className="mb-2">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
               {language === 'zh' ? `步骤 ${si + 1}` : `Step ${si + 1}`}
            </h3>
            <MdxComponents.p>{s.trim()}</MdxComponents.p>
          </div>
        ));
        return <MdxComponents.Steps key={i}>{steps}</MdxComponents.Steps>;
      }
      
      // Handle standard markdown
      if (part.startsWith('```')) {
        const lang = part.match(/```(\w+)/)?.[1] || 'text';
        const code = part.replace(/```\w+\n|```/g, '').trim();
        return <MdxComponents.code key={i} className={`language-${lang}`}>{code}</MdxComponents.code>;
      }
      if (part.startsWith('# ')) return <MdxComponents.h1 key={i}>{part.replace('# ', '')}</MdxComponents.h1>;
      if (part.startsWith('## ')) return <MdxComponents.h2 key={i}><Hash className="w-5 h-5 opacity-20" /> {part.replace('## ', '')}</MdxComponents.h2>;
      if (part.startsWith('### ')) return <MdxComponents.h3 key={i}>{part.replace('### ', '')}</MdxComponents.h3>;
      
      return <MdxComponents.p key={i} dangerouslySetInnerHTML={{ __html: part.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') }} />;
    });
  };

  return (
    <div className="min-h-screen bg-[#020308] pt-16 flex overflow-hidden">
      
      {/* Sidebar: Navigation Matrix */}
      <AnimatePresence>
        {isSidebarOpen && (
          <m.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-72 border-r border-white/5 bg-[#05060f]/90 backdrop-blur-3xl flex flex-col h-[calc(100vh-64px)] z-20"
          >
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-blue-500" />
                </div>
                <h2 className="text-[10px] font-black text-white uppercase tracking-widest">
                  {language === 'zh' ? '索引目录' : 'Metadata Index'}
                </h2>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder={language === 'zh' ? "搜索文档..." : "Search docs..."}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <nav className="flex-grow overflow-y-auto custom-scrollbar p-4">
              {filteredTree.map(category => (
                <div key={category.id} className="mb-6">
                  <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
                    <Folder className="w-3 h-3" />
                    {category.title}
                  </h3>
                  <div className="space-y-1">
                    {category.pages.map(page => (
                      <button
                        key={page.id}
                        onClick={() => setActivePage(page)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between group ${
                          activePage?.path === page.path 
                            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
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
               <a href="https://github.com/dair-ai/Prompt-Engineering-Guide" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-[10px] text-gray-400 hover:text-white transition-colors">
                <span>{language === 'zh' ? '核心研究' : 'Core Research'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </m.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative min-w-0 bg-black/40">
        {/* Sub-header / Breadcrumbs */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#020308]/60 backdrop-blur-md sticky top-0 z-10">
           <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors"
              title="Toggle Sidebar"
            >
              <List className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              <span className="hidden sm:inline">{activePage?.category}</span>
              <ChevronRight className="w-3 h-3 hidden sm:inline" />
              <span className="text-blue-500">{doc?.title}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-[9px] font-bold text-gray-500 mr-4">
                <Globe className="w-3 h-3" />
                {language.toUpperCase()}
             </div>
             <Link to="/studio" className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
               <Zap className="w-3 h-3 fill-current" /> {language === 'zh' ? '实验室' : 'Studio'}
             </Link>
          </div>
        </div>

        <div ref={scrollContainerRef} className="flex-grow overflow-y-auto custom-scrollbar bg-black/20">
          <div className="max-w-4xl mx-auto py-16 px-8 md:px-12">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <m.div 
                  key="loader"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-40 gap-4"
                >
                  <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                  <span className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em] animate-pulse">
                    {language === 'zh' ? '正在连接知识库...' : 'Syncing_Nodes...'}
                  </span>
                </m.div>
              ) : (
                <m.article
                  key={`${activePage?.path}-${language}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Content Breadcrumbs */}
                  <nav className="flex items-center gap-2 mb-10 text-[9px] font-mono uppercase tracking-[0.2em] text-gray-600">
                    <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                      <Home className="w-3 h-3" /> {language === 'zh' ? '指南' : 'Guide'}
                    </Link>
                    <ChevronRight className="w-2.5 h-2.5 opacity-20" />
                    <span className="opacity-40">{activeCategoryTitle}</span>
                    <ChevronRight className="w-2.5 h-2.5 opacity-20" />
                    <span className="text-blue-500 font-black">{doc?.title}</span>
                  </nav>

                  {doc && renderMdx(doc.content)}
                  
                  {/* Metadata Footer */}
                  <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 opacity-60">
                     <div className="space-y-2">
                        <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest">
                          {language === 'zh' ? '作者' : 'Author'}
                        </span>
                        <div className="text-xs text-white">{doc?.frontmatter.author || 'SuperEgo Architects'}</div>
                     </div>
                     <div className="flex gap-4">
                       <button className="flex flex-col items-end gap-1 group text-right">
                          <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">
                            {language === 'zh' ? '导航' : 'Navigation'}
                          </span>
                          <span className="text-sm text-gray-400 group-hover:text-blue-400 transition-colors flex items-center gap-1">
                             {language === 'zh' ? '下一个模块' : 'Forward Module'} <ArrowRight className="w-4 h-4" />
                          </span>
                       </button>
                     </div>
                  </div>
                </m.article>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <style>{`
        .mdx-steps { margin-left: 2.5rem; border-left: 1px solid rgba(255,255,255,0.05); padding-left: 2.5rem; }
        .mdx-steps > div { position: relative; }
        .mdx-steps > div::before {
          content: '';
          position: absolute;
          left: -50px;
          top: 0;
          width: 20px;
          height: 20px;
          background: #020308;
          border: 2px solid #3b82f6;
          border-radius: 50%;
          z-index: 1;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default PromptGuide;
