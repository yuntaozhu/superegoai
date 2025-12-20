
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import { 
  Search, ChevronRight, BookOpen, Layers, Cpu, Code, 
  ShieldAlert, Database, Info, Terminal, Sparkles, Zap, List,
  Book, ExternalLink
} from 'lucide-react';
import { ContentService, CategoryGroup, DocNode } from '../lib/ContentService';
import { MdxComponents } from '../components/MdxComponents';

const PromptGuide: React.FC = () => {
  const { language } = useLanguage();
  const [index, setIndex] = useState<CategoryGroup[]>([]);
  const [activeDoc, setActiveDoc] = useState<DocNode | null>(null);
  const [docContent, setDocContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Index
  useEffect(() => {
    const groups = ContentService.getIndex(language);
    setIndex(groups);
    if (!activeDoc && groups.length > 0) {
      setActiveDoc(groups[0].items[0]);
    }
  }, [language]);

  // Load Doc Content
  useEffect(() => {
    if (activeDoc) {
      setIsLoading(true);
      ContentService.loadContent(activeDoc.path, language).then(content => {
        setDocContent(content);
        setIsLoading(false);
      });
    }
  }, [activeDoc, language]);

  const filteredIndex = useMemo(() => {
    if (!searchQuery) return index;
    const q = searchQuery.toLowerCase();
    return index.map(group => ({
      ...group,
      items: group.items.filter(item => 
        item.title.toLowerCase().includes(q) || 
        group.title.toLowerCase().includes(q)
      )
    })).filter(group => group.items.length > 0);
  }, [index, searchQuery]);

  const getIcon = (id: string) => {
    switch (id) {
      case 'introduction': return <Info className="w-4 h-4" />;
      case 'techniques': return <Layers className="w-4 h-4" />;
      case 'applications': return <Code className="w-4 h-4" />;
      case 'research': return <Database className="w-4 h-4" />;
      case 'risks': return <ShieldAlert className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const renderMdx = (content: string) => {
    // Enhanced regex-based component renderer
    // In a real app, we'd use mdx-remote or similar
    const parts = content.split(/(<Callout[\s\S]*?<\/Callout>|<Cards[\s\S]*?<\/Cards>|<Steps[\s\S]*?<\/Steps>|```[\s\S]*?```|#{1,3}\s.*)/g);

    return parts.map((part, i) => {
      if (part.startsWith('<Callout')) {
        const typeMatch = part.match(/type="(.*?)"/);
        const type = (typeMatch?.[1] as any) || 'info';
        const children = part.replace(/<Callout.*?>|<\/Callout>/g, '').trim();
        return <MdxComponents.Callout key={i} type={type}>{children}</MdxComponents.Callout>;
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
        return <MdxComponents.Steps key={i}><MdxComponents.p>{children}</MdxComponents.p></MdxComponents.Steps>;
      }
      if (part.startsWith('```')) {
        const lang = part.match(/```(\w+)/)?.[1] || 'text';
        const code = part.replace(/```\w+\n|```/g, '').trim();
        return <MdxComponents.code key={i} className={`language-${lang}`}>{code}</MdxComponents.code>;
      }
      if (part.startsWith('# ')) return <MdxComponents.h1 key={i}>{part.replace('# ', '')}</MdxComponents.h1>;
      if (part.startsWith('## ')) return <MdxComponents.h2 key={i}>{part.replace('## ', '')}</MdxComponents.h2>;
      if (part.startsWith('### ')) return <MdxComponents.h3 key={i}>{part.replace('### ', '')}</MdxComponents.h3>;
      
      if (!part.trim()) return null;
      return <MdxComponents.p key={i} dangerouslySetInnerHTML={{ __html: part.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
    });
  };

  return (
    <div className="min-h-screen bg-[#020308] pt-16 flex overflow-hidden">
      
      {/* Sidebar: Indexing Matrix */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-72 border-r border-white/5 bg-[#05060f]/80 backdrop-blur-3xl flex flex-col h-[calc(100vh-64px)] z-20"
          >
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Book className="w-4 h-4 text-blue-500" />
                </div>
                <h2 className="text-xs font-black text-white uppercase tracking-widest">Knowledge Base</h2>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                <input 
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-[11px] text-white focus:outline-none focus:border-blue-500 transition-all font-mono"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <nav className="flex-grow overflow-y-auto custom-scrollbar p-4 space-y-8">
              {filteredIndex.map(group => (
                <div key={group.id} className="space-y-1">
                  <h4 className="px-3 text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-3">
                    {getIcon(group.id)}
                    {group.title}
                  </h4>
                  {group.items.map(item => (
                    <button
                      key={item.path}
                      onClick={() => setActiveDoc(item)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-[11px] transition-all flex items-center justify-between group ${
                        activeDoc?.path === item.path 
                        ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span className="truncate">{item.title}</span>
                      {activeDoc?.path === item.path && <Zap className="w-3 h-3 fill-current animate-pulse" />}
                    </button>
                  ))}
                </div>
              ))}
            </nav>
            
            <div className="p-4 border-t border-white/5">
              <a href="https://github.com/dair-ai/Prompt-Engineering-Guide" target="_blank" className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-[10px] text-gray-400 hover:text-white transition-colors">
                <span>Original Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content: MDX Reader */}
      <main className="flex-grow flex flex-col h-[calc(100vh-64px)] relative bg-black/20">
        <div className="h-14 border-b border-white/5 px-6 flex items-center justify-between bg-[#020308]/60 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors"
            >
              <List className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              <span>{activeDoc?.category}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-blue-500">{activeDoc?.title}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <Link to="/studio" className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all">
               <Sparkles className="w-3 h-3" /> Lab
             </Link>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto py-16 px-8 md:px-12">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 gap-4"
                >
                  <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Decrypting_Matrix...</span>
                </motion.div>
              ) : (
                <motion.article
                  key={activeDoc?.path}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderMdx(docContent)}
                  
                  {/* Bottom Navigation */}
                  <div className="mt-20 pt-12 border-t border-white/5 flex justify-between">
                     <button className="flex flex-col items-start gap-2 group">
                        <span className="text-[9px] text-gray-600 uppercase font-bold">Previous</span>
                        <span className="text-sm text-gray-400 group-hover:text-blue-400 flex items-center gap-1 transition-colors">
                           <ChevronRight className="w-4 h-4 rotate-180" /> Intro Basics
                        </span>
                     </button>
                     <button className="flex flex-col items-end gap-2 group">
                        <span className="text-[9px] text-gray-600 uppercase font-bold">Next</span>
                        <span className="text-sm text-gray-400 group-hover:text-blue-400 flex items-center gap-1 transition-colors">
                           Few-shot Prompting <ChevronRight className="w-4 h-4" />
                        </span>
                     </button>
                  </div>
                </motion.article>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <style>{`
        .mdx-steps > * { position: relative; }
        .mdx-steps > *::before {
          content: '';
          position: absolute;
          left: -41px;
          top: 0;
          width: 25px;
          height: 25px;
          background: #1e293b;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          z-index: 1;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default PromptGuide;
