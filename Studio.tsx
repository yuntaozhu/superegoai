
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { useLanguage, Link } from './context/LanguageContext';
import { ArrowLeft, Sparkles, Copy, Trash2, SplitSquareVertical, Sidebar, Zap, Wand2, ChevronRight, History } from 'lucide-react';
import { PROMPT_GUIDE_DATA, PromptNode } from './features/prompts/promptData';

const Studio: React.FC = () => {
  const { language } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [comparisonPrompt, setComparisonPrompt] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState('');
  const [comparisonResult, setComparisonResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('prompt_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const addToHistory = (p: string) => {
    if (!p.trim()) return;
    const newHistory = [p, ...history.filter(item => item !== p)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('prompt_history', JSON.stringify(newHistory));
  };

  const handleGenerate = async (input: string, targetSetter: (val: string) => void) => {
    if (!input.trim()) return;
    setIsLoading(true);
    addToHistory(input);
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: input,
        config: {
          thinkingConfig: { thinkingBudget: 4096 } // Reasonable budget for reasoning
        }
      });
      targetSetter(response.text || '');
    } catch (err) {
      console.error(err);
      targetSetter("Generation failed. Please check your network or API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const optimizePrompt = async () => {
    if (!prompt.trim()) return;
    setIsOptimizing(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `You are an expert prompt engineer. Please optimize the following prompt according to the dair-ai Prompt Engineering Guide principles. Use the structure: Role, Context, Task, Constraints, and Examples. Output ONLY the optimized prompt.\n\nOriginal Prompt: "${prompt}"`,
        config: { thinkingConfig: { thinkingBudget: 2048 } }
      });
      setPrompt(response.text || '');
    } catch (err) {
      console.error(err);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleApplyTemplate = (node: PromptNode) => {
    if (node.template) {
      setPrompt(node.template);
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col relative overflow-hidden">
      {/* HUD Header */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-brand-dark/80 backdrop-blur-md z-30">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <h1 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500" />
            SuperEgo Prompt Lab <span className="text-[10px] text-gray-500 font-mono">v4.0_Pro</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-lg transition-all ${isSidebarOpen ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
            title="Toggle Guide"
          >
            <Sidebar className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsComparing(!isComparing)}
            className={`p-2 rounded-lg transition-all ${isComparing ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
            title="Comparison View"
          >
            <SplitSquareVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-grow relative overflow-hidden">
        {/* Guide Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -350 }}
              animate={{ x: 0 }}
              exit={{ x: -350 }}
              className="w-[350px] border-r border-white/10 bg-brand-surface/40 backdrop-blur-xl z-20 overflow-y-auto custom-scrollbar"
            >
              <div className="p-6 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Knowledge Matrix</h3>
                  <p className="text-[10px] text-gray-400 leading-relaxed italic">Integrated from dair-ai/Prompt-Engineering-Guide</p>
                </div>

                {PROMPT_GUIDE_DATA.map(cat => (
                  <div key={cat.id} className="space-y-3">
                    <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest px-2">{language === 'en' ? cat.title.en : cat.title.zh}</h4>
                    <div className="space-y-1">
                      {cat.nodes.map(node => (
                        <button
                          key={node.id}
                          onClick={() => handleApplyTemplate(node)}
                          className="w-full text-left p-3 rounded-xl hover:bg-white/5 group transition-all"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-bold text-gray-200 group-hover:text-white">{language === 'en' ? node.title.en : node.title.zh}</span>
                            <ChevronRight className="w-3 h-3 text-gray-700 group-hover:text-blue-500 transition-colors" />
                          </div>
                          <p className="text-[10px] text-gray-500 line-clamp-1">{language === 'en' ? node.description.en : node.description.zh}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {history.length > 0 && (
                  <div className="space-y-3 pt-6 border-t border-white/5">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 flex items-center gap-2">
                      <History className="w-3 h-3" /> Recent Activity
                    </h4>
                    <div className="space-y-1">
                      {history.map((h, i) => (
                        <button 
                          key={i} 
                          onClick={() => setPrompt(h)}
                          className="w-full text-left p-2 rounded-lg hover:bg-white/5 text-[10px] text-gray-500 truncate"
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Work Area */}
        <div className="flex-grow flex flex-col md:flex-row p-6 gap-6 overflow-y-auto custom-scrollbar">
          
          {/* Editor A */}
          <div className="flex-1 flex flex-col gap-4 min-w-[320px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Main Workspace</span>
              <div className="flex gap-2">
                 <button 
                  onClick={optimizePrompt}
                  disabled={isOptimizing}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-lg text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
                 >
                   <Wand2 className={`w-3 h-3 ${isOptimizing ? 'animate-spin' : ''}`} />
                   {isOptimizing ? 'Optimizing...' : 'Optimize Prompt'}
                 </button>
                 <button onClick={() => setPrompt('')} className="p-1.5 text-gray-600 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <textarea
              className="w-full h-48 md:h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-sm focus:outline-none focus:border-blue-500/50 font-mono transition-all resize-none shadow-inner"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button 
              onClick={() => handleGenerate(prompt, setResult)}
              disabled={isLoading || !prompt.trim()}
              className="w-full py-3 bg-white text-brand-dark rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-50 transition-all shadow-xl"
            >
              {isLoading ? 'Inference in Progress...' : 'Execute Inference'}
            </button>
            <div className="flex-grow bg-black/40 border border-white/5 rounded-2xl p-6 font-light text-gray-300 text-sm overflow-y-auto custom-scrollbar min-h-[200px] leading-relaxed relative">
               <span className="absolute top-4 right-4 text-[8px] font-mono text-gray-700">OUTPUT_A</span>
               {result ? (
                 <div className="prose prose-invert prose-sm">
                   {result}
                 </div>
               ) : <span className="text-gray-700 font-mono">Waiting for inference...</span>}
            </div>
          </div>

          {/* Editor B (Comparison Mode) */}
          <AnimatePresence>
            {isComparing && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 flex flex-col gap-4 min-w-[320px] overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-purple-500 uppercase tracking-widest">Comparison Context</span>
                  <div className="flex gap-2">
                    <button onClick={() => setComparisonPrompt('')} className="p-1.5 text-gray-600 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <textarea
                  className="w-full h-48 md:h-64 bg-purple-500/5 border border-purple-500/10 rounded-2xl p-6 text-white text-sm focus:outline-none focus:border-purple-500/50 font-mono transition-all resize-none shadow-inner"
                  placeholder="Enter variant prompt..."
                  value={comparisonPrompt}
                  onChange={(e) => setComparisonPrompt(e.target.value)}
                />
                <button 
                  onClick={() => handleGenerate(comparisonPrompt, setComparisonResult)}
                  disabled={isLoading || !comparisonPrompt.trim()}
                  className="w-full py-3 bg-purple-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-purple-500 transition-all shadow-xl"
                >
                  Execute Comparison
                </button>
                <div className="flex-grow bg-black/40 border border-purple-500/5 rounded-2xl p-6 font-light text-gray-300 text-sm overflow-y-auto custom-scrollbar min-h-[200px] leading-relaxed relative">
                   <span className="absolute top-4 right-4 text-[8px] font-mono text-gray-700">OUTPUT_B (VARIANT)</span>
                   {comparisonResult ? (
                     <div className="prose prose-invert prose-sm">
                        {comparisonResult}
                     </div>
                   ) : <span className="text-gray-700 font-mono">Waiting for comparison...</span>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background Glows */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />
    </div>
  );
};

export default Studio;
