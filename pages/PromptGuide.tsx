
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import { 
  Terminal, Layers, Sparkles, ShieldAlert, ChevronRight, ArrowLeft, 
  ArrowRight, BookOpen, Search, Globe, Database, Code, Cpu, Info
} from 'lucide-react';
import { loadPromptGuideContent, ParsedPrompt } from '../lib/content-parser';
import PromptBlock from '../components/PromptBlock';

const PromptGuide: React.FC = () => {
  const { language } = useLanguage();
  const [structure, setStructure] = useState<ReturnType<typeof loadPromptGuideContent> | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('techniques');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<ParsedPrompt | null>(null);

  useEffect(() => {
    const content = loadPromptGuideContent(language);
    setStructure(content);
    // Auto-select first category if available
    const keys = Object.keys(content.categories);
    if (keys.length > 0 && !keys.includes(activeCategory)) {
      setActiveCategory(keys[0]);
    }
  }, [language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedNode]);

  const filteredNodes = useMemo(() => {
    if (!structure) return [];
    const nodes = structure.categories[activeCategory]?.nodes || [];
    if (!searchQuery) return nodes;
    return nodes.filter(node => 
      node.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      node.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeCategory, searchQuery, structure]);

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'introduction': return <Info className="w-5 h-5" />;
      case 'techniques': return <Layers className="w-5 h-5" />;
      case 'applications': return <Code className="w-5 h-5" />;
      case 'risks': return <ShieldAlert className="w-5 h-5" />;
      case 'research': return <Database className="w-5 h-5" />;
      case 'agents': return <Cpu className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  // Simple Markdown-ish renderer for raw content
  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, i) => {
      if (part.startsWith('```')) {
        const code = part.replace(/```(?:\w+)?\n([\s\S]*?)\n```/, '$1');
        return <PromptBlock key={i} code={code} />;
      }
      return (
        <div 
          key={i} 
          className="prose prose-invert prose-lg max-w-none prose-blue mb-6"
          dangerouslySetInnerHTML={{ __html: part.replace(/\n/g, '<br/>') }} 
        />
      );
    });
  };

  if (!structure) return <div className="min-h-screen bg-brand-dark flex items-center justify-center font-mono text-gray-500">INIT_CONTENT_INDEX...</div>;

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
              {language === 'en' ? 'Prompt Guide' : '提示词指南'}
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
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl sticky top-24">
                 <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-6 px-2">Knowledge Matrix</h3>
                 <nav className="space-y-1">
                  {Object.entries(structure.categories).map(([key, cat]) => (
                    <button
                      key={key}
                      onClick={() => { setActiveCategory(key); setSearchQuery(''); }}
                      className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
                        activeCategory === key 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className={`transition-colors ${activeCategory === key ? 'text-white' : 'text-blue-500'}`}>
                        {getIcon(key)}
                      </div>
                      <span className="font-black text-xs uppercase tracking-widest truncate">
                        {cat.title}
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
                      {selectedNode.title}
                    </h2>
                    <div className="flex gap-4 items-center">
                       <span className="text-blue-500 font-black font-mono uppercase text-xs">{selectedNode.categoryTitle}</span>
                       <div className="w-1 h-1 rounded-full bg-white/20" />
                       <span className="text-gray-700 font-mono text-xs">REF: {selectedNode.id.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="reader-content">
                    {renderContent(selectedNode.rawContent)}
                  </div>

                  {selectedNode.prompts.length > 0 && (
                    <div className="mt-20 pt-10 border-t border-white/10">
                       <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-8">Extracted Prompts</h4>
                       <div className="space-y-6">
                         {selectedNode.prompts.map((p, idx) => (
                           <PromptBlock key={idx} code={p} />
                         ))}
                       </div>
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
                          {node.title}
                        </h4>
                        <p className="text-gray-500 text-xs line-clamp-2">
                          {node.description}
                        </p>
                      </div>
                      <div className="flex justify-between items-end mt-auto pt-4 border-t border-white/5">
                        <div className="flex gap-2">
                           {node.prompts.length > 0 && <span className="text-[8px] font-mono bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full">{node.prompts.length} PROMPTS</span>}
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-blue-500" />
                      </div>
                    </div>
                  ))}
                  {filteredNodes.length === 0 && (
                    <div className="col-span-full py-20 text-center text-gray-600 font-mono text-sm italic">
                      NO_NODES_MATCH_QUERY
                    </div>
                  )}
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
