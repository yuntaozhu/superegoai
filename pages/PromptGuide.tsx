
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import { 
  Terminal, 
  Layers, 
  Sparkles, 
  ShieldAlert, 
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Search,
  Globe,
  Database,
  Code
} from 'lucide-react';
import { PROMPT_REGISTRY, PromptNode } from '../constants/promptRegistry';

const PromptGuide: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('techniques');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<PromptNode | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedNode]);

  const categories = useMemo(() => Array.from(new Set(PROMPT_REGISTRY.map(p => p.category))), []);

  const filteredNodes = useMemo(() => {
    const nodes = PROMPT_REGISTRY.filter(n => n.category === activeCategory);
    if (!searchQuery) return nodes;
    return nodes.filter(node => 
      node.title.zh.toLowerCase().includes(searchQuery.toLowerCase()) || 
      node.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [activeCategory, searchQuery]);

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'introduction': return <Terminal className="w-5 h-5" />;
      case 'techniques': return <Layers className="w-5 h-5" />;
      case 'applications': return <Code className="w-5 h-5" />;
      case 'risks': return <ShieldAlert className="w-5 h-5" />;
      case 'research': return <Database className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!selectedNode ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <Globe className="w-3 h-3" />
              Intelligence Orchestration Guide
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6">
              提示词指南
            </h1>
            <p className="text-xl text-gray-400 font-light italic mb-10">
              "Master the art of communicating with AGI."
            </p>
          </motion.div>
        ) : (
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedNode(null)}
            className="mb-12 inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-mono text-[10px] uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Registry
          </motion.button>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {!selectedNode && (
            <aside className="lg:col-span-3 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
                 <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-6 px-2">Knowledge Matrix</h3>
                 <nav className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setSearchQuery(''); }}
                      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
                        activeCategory === cat 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className={`transition-colors ${activeCategory === cat ? 'text-white' : 'text-blue-500'}`}>
                        {getIcon(cat)}
                      </div>
                      <span className="font-black text-xs uppercase tracking-widest">
                        {cat}
                      </span>
                    </button>
                  ))}
                 </nav>
              </div>

              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                 <input 
                   type="text"
                   placeholder="Search Guide..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-mono"
                 />
              </div>
            </aside>
          )}

          <main className={`${selectedNode ? 'lg:col-span-12' : 'lg:col-span-9'}`}>
            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key="reader"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="mb-12 border-b border-white/10 pb-10">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                      {language === 'en' ? selectedNode.title.en : selectedNode.title.zh}
                    </h2>
                    <div className="flex gap-4 items-center">
                       {selectedNode.title.ar && <span className="text-blue-500/60 font-black font-mono" dir="rtl">{selectedNode.title.ar}</span>}
                       <span className="text-gray-700 font-mono text-xs">REF: {selectedNode.id.toUpperCase()}</span>
                    </div>
                  </div>

                  <div 
                    className="prose prose-invert prose-lg max-w-none prose-blue"
                    dangerouslySetInnerHTML={{ __html: selectedNode.content }}
                  />

                  {selectedNode.template && (
                    <div className="mt-12 p-8 bg-black/40 border border-white/10 rounded-3xl">
                       <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4">Prompt Template</h4>
                       <pre className="bg-brand-dark p-6 rounded-xl border border-white/5 font-mono text-sm text-gray-300 whitespace-pre-wrap">
                         {selectedNode.template}
                       </pre>
                       <Link to="/studio" className="mt-6 inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs hover:text-blue-400 transition-colors">
                          Open in Studio <ArrowRight className="w-4 h-4" />
                       </Link>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredNodes.map((node) => (
                    <div 
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-blue-500/40 transition-all hover:bg-white/10 cursor-pointer flex flex-col justify-between h-56 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <h4 className="text-2xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                          {language === 'en' ? node.title.en : node.title.zh}
                        </h4>
                        <p className="text-gray-500 text-xs line-clamp-2">
                          {language === 'en' ? node.description.en : node.description.zh}
                        </p>
                      </div>
                      <div className="flex justify-between items-end mt-auto pt-4 border-t border-white/5">
                        <span className="text-xs font-mono text-gray-700" dir="rtl">{node.title.ar}</span>
                        <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-blue-500" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PromptGuide;
