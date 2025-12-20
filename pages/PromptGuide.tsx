
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
  Database
} from 'lucide-react';
import { PROMPT_GUIDE_DATA, PromptNode, PromptCategory } from '../features/prompts/promptData';

const PromptGuide: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>(PROMPT_GUIDE_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<PromptNode | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedNode]);

  const currentCategory = useMemo(() => 
    PROMPT_GUIDE_DATA.find(c => c.id === activeCategory) || PROMPT_GUIDE_DATA[0],
  [activeCategory]);

  const filteredNodes = useMemo(() => {
    if (!searchQuery) return currentCategory.nodes;
    return currentCategory.nodes.filter(node => 
      node.title.zh.toLowerCase().includes(searchQuery.toLowerCase()) || 
      node.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [currentCategory, searchQuery]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation / Header */}
        {!selectedNode ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <Globe className="w-3 h-3" />
              Decentralized Knowledge System
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6">
              {t('prompt_guide.title')}
            </h1>
            <p className="text-xl text-gray-400 font-light italic mb-10">
              "Orchestrating the latent space through precise semantics."
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
            Back to Matrix
          </motion.button>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <main className={`${selectedNode ? 'lg:col-span-12' : 'lg:col-span-9'} order-last lg:order-first`}>
            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key="reader"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="mb-12 border-b border-white/10 pb-10">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedNode.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
                      {language === 'en' ? selectedNode.title.en : selectedNode.title.zh}
                    </h2>
                    <div className="text-gray-500 font-mono text-xs flex items-center gap-4">
                      <span dir="rtl" className="text-blue-500/60 font-black">{selectedNode.title.ar}</span>
                      <span>//</span>
                      <span>NODE_REF: {selectedNode.id.toUpperCase()}</span>
                    </div>
                  </div>

                  <div 
                    className="prose prose-invert prose-lg max-w-none prose-blue leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedNode.content }}
                  />

                  <div className="mt-20 p-10 bg-white/5 border border-white/10 rounded-[40px] flex items-center justify-between">
                     <div>
                       <h4 className="text-white font-bold mb-1">Was this useful?</h4>
                       <p className="text-gray-500 text-sm">Contribute to the SuperEgo Second Brain ecosystem.</p>
                     </div>
                     <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                       Add to Memory
                     </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredNodes.map((node) => (
                      <motion.div 
                        key={node.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedNode(node)}
                        className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-blue-500/40 transition-all hover:bg-white/10 cursor-pointer flex flex-col justify-between h-56 relative overflow-hidden shadow-xl"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <span className="text-[10px] font-mono text-blue-500 font-bold uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded">
                              {node.id}
                            </span>
                            <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                          </div>
                          <h4 className="text-2xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                            {language === 'en' ? node.title.en : node.title.zh}
                          </h4>
                          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                            {language === 'en' ? node.description.en : node.description.zh}
                          </p>
                        </div>
                        <div className="flex justify-between items-end mt-auto pt-6 border-t border-white/5">
                          <span className="text-sm text-gray-600 font-black font-mono tracking-tighter" dir="rtl">{node.title.ar}</span>
                          <Database className="w-3 h-3 text-gray-800" />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Open Source Callout */}
                  <div className="p-12 bg-gradient-to-br from-indigo-900/40 via-brand-dark to-brand-dark border border-white/10 rounded-[48px] relative overflow-hidden mt-12">
                     <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                        <div className="p-6 bg-white/5 rounded-[40px] border border-white/10">
                          <BookOpen className="w-16 h-16 text-blue-500" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h4 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Community Driven</h4>
                          <p className="text-gray-400 text-lg leading-relaxed font-light mb-8 max-w-2xl">
                            Inspired by <span className="text-white font-bold">dair-ai/Prompt-Engineering-Guide</span>. This guide is a living document of the collective wisdom of the global AI community.
                          </p>
                          <a 
                            href="https://github.com/dair-ai/Prompt-Engineering-Guide" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 px-8 py-4 bg-white text-brand-dark rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-50 transition-all"
                          >
                            Explore Original Repo <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Sidebar - Only show when not in reader mode */}
          {!selectedNode && (
            <aside className="lg:col-span-3 space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
                 <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-6 px-2">Navigation</h3>
                 <nav className="space-y-1">
                  {PROMPT_GUIDE_DATA.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
                        activeCategory === cat.id 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className={`transition-colors ${activeCategory === cat.id ? 'text-white' : 'text-blue-500'}`}>
                        {getIcon(cat.icon)}
                      </div>
                      <span className="font-black text-xs uppercase tracking-widest">
                        {language === 'en' ? cat.title.en : cat.title.zh}
                      </span>
                      {activeCategory === cat.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  ))}
                 </nav>
              </div>

              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                 <input 
                   type="text"
                   placeholder="Search nodes..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-mono"
                 />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptGuide;
