
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import { 
  Search, ChevronRight, BookOpen, Layers, Cpu, Code, 
  ShieldAlert, Database, Info, Terminal, Sparkles, Zap, List,
  Book, ExternalLink, ArrowLeft, ArrowRight, Folder, Hash
} from 'lucide-react';
import { ContentService, CategoryStructure, PageMeta } from '../lib/ContentService';
import { MdxComponents } from '../components/MdxComponents';

const PromptGuide: React.FC = () => {
  const { language } = useLanguage();
  const [tree, setTree] = useState<CategoryStructure[]>([]);
  const [activePage, setActivePage] = useState<PageMeta | null>(null);
  const [doc, setDoc] = useState<{ content: string; frontmatter: any; title: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initial Indexing
  useEffect(() => {
    const dataTree = ContentService.getTree();
    setTree(dataTree);
    if (!activePage && dataTree.length > 0) {
      setActivePage(dataTree[0].pages[0]);
    }
  }, []);

  // Load Metadata-driven content
  useEffect(() => {
    if (activePage) {
      setIsLoading(true);
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      
      ContentService.getPage(activePage.path).then(res => {
        setDoc(res);
        // Artificial delay for smooth transition feel
        setTimeout(() => setIsLoading(false), 200);
      });
    }
  }, [activePage]);

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
        const cards = Array.from(cardMatches).map((m, ci) => (
          <MdxComponents.Card key={ci} title={m[1]} href={m[2]}>{m[3]}</MdxComponents.Card>
        ));
        return <MdxComponents.Cards key={i}>{cards}</MdxComponents.Cards>;
      }
      if (part.startsWith('<Steps')) {
        const children = part.replace(/<Steps>|<\/Steps>/g, '').trim();
        // Split by numeric list pattern or newline
        const steps = children.split(/\n\s*\d+\.\s+/).filter(Boolean).map((s, si) => (
          <div key={si} className="mb-2">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
               Step {si + 1}
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
          <motion.aside
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
                <h2 className="text-xs font-black text-white uppercase tracking-widest">Metadata Index</h2>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                <input 
                  type="text"
                  placeholder="Filter knowledge..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-[11px] text-white focus:outline-none focus:border-blue-500 transition-all font-mono"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <nav className="flex-grow overflow-y-auto custom-scrollbar p-4 space-y-8">
              {filteredTree.map(cat => (
                <div key={cat.id} className="space-y-1">
                  <h4 className="px-3 text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-3">
                    <Folder className="w-3 h-3" />
                    {cat.title}
                  </h4>
                  {cat.pages.map(page => (
                    <button
                      key={page.path}
                      onClick={() => setActivePage(page)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-[11px] transition-all flex items-center justify-between group ${
                        activePage?.path === page.path 
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5' 
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
            
            <div className="p-4 border-t border-white/5">
              <a href="https://github.com/dair-ai/Prompt-Engineering-Guide" target="_blank" className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-[10px] text-gray-400 hover:text-white transition-colors">
                <span>Core Research</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content: Document Reader */}
      <main className="flex-grow flex flex-col h-[calc(100vh-64px)] relative bg-black/40">
        <div className="h-14 border-b border-white/5 px-6 flex items-center justify-between bg-[#020308]/60 backdrop-blur-md sticky top-0 z-10">
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
             <Link to="/studio" className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
               <Zap className="w-3 h-3 fill-current" /> Studio
             </Link>
          </div>
        </div>

        <div ref={scrollContainerRef} className="flex-grow overflow-y-auto custom-scrollbar bg-black/20">
          <div className="max-w-4xl mx-auto py-16 px-8 md:px-12">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loader"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-40 gap-4"
                >
                  <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                  <span className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em] animate-pulse">Syncing_Nodes...</span>
                </motion.div>
              ) : (
                <motion.article
                  key={activePage?.path}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {doc && renderMdx(doc.content)}
                  
                  {/* Metadata Footer */}
                  <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 opacity-60">
                     <div className="space-y-2">
                        <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Author</span>
                        <div className="text-xs text-white">{doc?.frontmatter.author || 'SuperEgo Architects'}</div>
                     </div>
                     <div className="flex gap-4">
                       <button className="flex flex-col items-end gap-1 group">
                          <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">Navigation</span>
                          <span className="text-sm text-gray-400 group-hover:text-blue-400 transition-colors flex items-center gap-1">
                             Forward Module <ArrowRight className="w-4 h-4" />
                          </span>
                       </button>
                     </div>
                  </div>
                </motion.article>
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
