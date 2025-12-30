
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import { ArrowLeft, Trash2, SplitSquareVertical, Sidebar, Zap, Wand2, ChevronRight, History, Layers, Loader2, AlertCircle, FileText, Search } from 'lucide-react';
import { PROMPT_GUIDE_DATA, PromptNode } from '../features/prompts/promptData';
import { PROMPT_REGISTRY } from '../constants/promptRegistry';
import { getGeminiClient } from '../api/client';
import { GEMINI_CONFIG } from '../api/config';
import GroundingSources from '../components/GroundingSources';

const m = motion as any;

interface GroundingSource {
  title: string;
  url: string;
}

const Studio: React.FC = () => {
  const { language } = useLanguage();
  
  const [prompt, setPrompt] = useState('');
  const [comparisonPrompt, setComparisonPrompt] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isGeneratingVariations, setIsGeneratingVariations] = useState(false);
  
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [resultSources, setResultSources] = useState<GroundingSource[]>([]);
  
  const [comparisonResult, setComparisonResult] = useState('');
  const [comparisonError, setComparisonError] = useState<string | null>(null);
  const [comparisonSources, setComparisonSources] = useState<GroundingSource[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [variations, setVariations] = useState<{ concise: string; detailed: string; creative: string } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const incomingPrompt = params.get('prompt');
    if (incomingPrompt) {
      setPrompt(decodeURIComponent(incomingPrompt));
    }
  }, []);

  useEffect(() => {
    const savedHistory = localStorage.getItem('prompt_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.warn('Failed to parse prompt history, resetting storage.', e);
        localStorage.removeItem('prompt_history');
        setHistory([]);
      }
    }
  }, []);

  const getErrorMessage = (error: any) => {
    const msg = error?.message || String(error);
    if (msg.includes('API_KEY_INVALID') || msg.includes('401') || msg.includes('403') || msg.includes('expired')) {
      return language === 'zh' ? "❌ API Key 无效、过期或未授权。请检查配置。" : "❌ API Key is invalid, expired or unauthorized. Please check configuration.";
    }
    if (msg.includes('exhausted') || msg.includes('429')) {
      return language === 'zh' ? "❌ API 额度已耗尽。请稍后再试。" : "❌ API Quota exhausted. Please try again later.";
    }
    return language === 'zh' ? `❌ 发生错误: ${msg}` : `❌ Error occurred: ${msg}`;
  };

  const addToHistory = (p: string) => {
    if (!p.trim()) return;
    const newHistory = [p, ...history.filter(item => item !== p)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('prompt_history', JSON.stringify(newHistory));
  };

  const handleGenerate = async (input: string, isComparison: boolean = false) => {
    if (!input.trim()) return;

    if (isComparison) {
      setComparisonResult('');
      setComparisonError(null);
      setComparisonSources([]);
    } else {
      setResult('');
      setError(null);
      setResultSources([]);
    }

    if (!process.env.API_KEY) {
      const msg = language === 'zh' ? "⚠️ 系统错误：未配置 API Key。" : "⚠️ System Error: API Key not configured.";
      if (isComparison) setComparisonError(msg); else setError(msg);
      return;
    }

    setIsLoading(true);
    addToHistory(input);
    
    try {
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: GEMINI_CONFIG.models.pro,
        contents: input,
        config: {
          thinkingConfig: { thinkingBudget: GEMINI_CONFIG.thinkingBudget.complex },
          tools: [{ googleSearch: {} }]
        }
      });
      
      const text = response.text || '';
      
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = groundingChunks
        .map((chunk: any) => chunk.web)
        .filter((web: any) => web && web.uri && web.title)
        .map((web: any) => ({ title: web.title, url: web.uri }));
      
      const uniqueSources = Array.from(new Map(sources.map((s: any) => [s.url, s])).values()) as GroundingSource[];
      
      if (isComparison) {
        setComparisonResult(text);
        setComparisonSources(uniqueSources);
      } else {
        setResult(text);
        setResultSources(uniqueSources);
      }
    } catch (err) {
      console.error(err);
      const msg = getErrorMessage(err);
      if (isComparison) setComparisonError(msg); else setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const generateVariations = async () => {
    if (!prompt.trim()) return;
    setIsGeneratingVariations(true);
    setError(null);
    
    try {
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: GEMINI_CONFIG.models.default,
        contents: `Given the following prompt: "${prompt}", create three distinct variations. 
        1. Concise: Extremely brief, core meaning only.
        2. Detailed: Highly specific, including tech requirements and visual guidelines.
        3. Creative: Uses metaphors, vision-casting, and innovative framing.
        Return in JSON format with keys: concise, detailed, creative.`,
        config: { responseMimeType: "application/json" }
      });
      const data = JSON.parse(response.text || '{}');
      setVariations(data);
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
    } finally {
      setIsGeneratingVariations(false);
    }
  };

  const optimizePrompt = async () => {
    if (!prompt.trim()) return;
    setIsOptimizing(true);
    setError(null);
    
    try {
      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: GEMINI_CONFIG.models.pro,
        contents: `你是一名提示词工程专家。请根据 Prompt Engineering Guide 原则，将以下原始 Prompt 优化为具备角色 (Role)、背景 (Context)、任务 (Task)、限制 (Constraints) 和输出示例 (Examples) 的结构化格式。仅输出优化后的提示词内容。\n\n原始 Prompt: "${prompt}"`,
        config: { thinkingConfig: { thinkingBudget: GEMINI_CONFIG.thinkingBudget.default } }
      });
      setPrompt(response.text || '');
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleApplyPrompt = (template?: string) => {
    if (template) {
      setPrompt(template);
      setVariations(null);
      setError(null);
    }
  };

  const categories = Array.from(new Set(PROMPT_REGISTRY.map(p => p.category)));
  const filteredRegistry = PROMPT_REGISTRY.filter(node => 
    node.title.zh.toLowerCase().includes(sidebarSearch.toLowerCase()) || 
    node.title.en.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col relative overflow-hidden">
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-brand-dark/80 backdrop-blur-md z-30">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <h1 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500" />
            SuperEgo Prompt Lab <span className="text-[10px] text-gray-500 font-mono">v5.2_Configured</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-lg transition-all ${isSidebarOpen ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <Sidebar className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsComparing(!isComparing)}
            className={`p-2 rounded-lg transition-all ${isComparing ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            <SplitSquareVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-grow relative overflow-hidden">
        <AnimatePresence>
          {isSidebarOpen && (
            <m.aside
              initial={{ x: -350 }}
              animate={{ x: 0 }}
              exit={{ x: -350 }}
              className="w-[350px] border-r border-white/10 bg-brand-surface/40 backdrop-blur-xl z-20 overflow-y-auto custom-scrollbar flex flex-col"
            >
              <div className="p-6 border-b border-white/5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                  <input 
                    type="text"
                    placeholder="Search Guide..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                    value={sidebarSearch}
                    onChange={(e) => setSidebarSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="p-4 flex-grow overflow-y-auto custom-scrollbar">
                {categories.map(cat => {
                  const items = filteredRegistry.filter(item => item.category === cat);
                  if (items.length === 0) return null;
                  return (
                    <div key={cat} className="mb-6">
                      <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest px-2 mb-2">{cat}</h4>
                      <div className="space-y-1">
                        {items.map(node => (
                          <button
                            key={node.id}
                            onClick={() => handleApplyPrompt(node.template)}
                            className="w-full text-left p-3 rounded-xl hover:bg-white/5 group transition-all"
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-xs font-bold text-gray-200 group-hover:text-white">
                                {language === 'en' ? node.title.en : node.title.zh}
                              </span>
                              <ChevronRight className="w-3 h-3 text-gray-700 group-hover:text-blue-500" />
                            </div>
                            <p className="text-[10px] text-gray-500 line-clamp-1">
                              {language === 'en' ? node.description.en : node.description.zh}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </m.aside>
          )}
        </AnimatePresence>

        <div className="flex-grow flex flex-col md:flex-row p-6 gap-6 overflow-y-auto custom-scrollbar">
          <div className="flex-1 flex flex-col gap-4 min-w-[320px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Main Workspace</span>
              <div className="flex gap-2">
                 <button 
                  onClick={generateVariations}
                  disabled={isGeneratingVariations || !prompt.trim()}
                  className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-[10px] font-black uppercase hover:bg-emerald-600 hover:text-white transition-all disabled:opacity-50"
                 >
                   {isGeneratingVariations ? (
                     <Loader2 className="w-3 h-3 animate-spin" />
                   ) : (
                     <Layers className="w-3 h-3" />
                   )}
                   Variations
                 </button>
                 <button 
                  onClick={optimizePrompt}
                  disabled={isOptimizing || !prompt.trim()}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-lg text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
                 >
                   <Wand2 className={`w-3 h-3 ${isOptimizing ? 'animate-spin' : ''}`} />
                   {isOptimizing ? 'Refining...' : 'Optimize'}
                 </button>
                 <button onClick={() => { setPrompt(''); setResult(''); setError(null); setResultSources([]); setVariations(null); }} className="p-1.5 text-gray-600 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            
            <textarea
              className="w-full h-48 md:h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-sm focus:outline-none focus:border-blue-500/50 font-mono transition-all resize-none shadow-inner"
              placeholder="Type your prompt or select from the registry..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <AnimatePresence>
              {variations && (
                <m.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {Object.entries(variations).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setPrompt(val as string)}
                      className="p-3 bg-white/5 border border-white/10 rounded-xl text-left hover:border-blue-500/50 transition-all group"
                    >
                      <div className="text-[8px] font-black uppercase text-blue-500 mb-1">{key}</div>
                      <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed group-hover:text-gray-200">{val as string}</p>
                    </button>
                  ))}
                </m.div>
              )}
            </AnimatePresence>

            <button 
              onClick={() => handleGenerate(prompt, false)}
              disabled={isLoading || !prompt.trim()}
              className="w-full py-3 bg-white text-brand-dark rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}
              {isLoading ? 'Neural Sync in Progress...' : 'Execute (Grounding ON)'}
            </button>
            <div className="flex-grow bg-black/40 border border-white/5 rounded-2xl p-6 font-light text-gray-300 text-sm overflow-y-auto custom-scrollbar min-h-[200px] leading-relaxed relative">
               <span className="absolute top-4 right-4 text-[8px] font-mono text-gray-700">OUTPUT</span>
               
               {error && (
                 <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-red-400 uppercase tracking-wide mb-1">Execution Error</h4>
                      <p className="text-xs text-red-200/80">{error}</p>
                    </div>
                 </div>
               )}

               {isLoading && !result && !error && (
                 <div className="h-full flex flex-col items-center justify-center gap-4 py-12">
                   <div className="relative">
                      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
                      </div>
                   </div>
                   <div className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.4em] animate-pulse">Syncing_Second_Brain...</div>
                 </div>
               )}
               {result ? (
                 <div className="space-y-6">
                    <div className="prose prose-invert prose-sm">
                      {result}
                    </div>
                    <GroundingSources sources={resultSources} />
                 </div>
               ) : !isLoading && !error && <div className="h-full flex flex-col items-center justify-center opacity-20">
                 <FileText className="w-10 h-10 mb-2" />
                 <span className="text-[10px] font-mono uppercase tracking-widest">Awaiting Input...</span>
               </div>}
            </div>
          </div>

          <AnimatePresence>
            {isComparing && (
              <m.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 flex flex-col gap-4 min-w-[320px] overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-purple-500 uppercase tracking-widest">Comparison</span>
                  <button onClick={() => { setComparisonPrompt(''); setComparisonResult(''); setComparisonError(null); setComparisonSources([]); }} className="p-1.5 text-gray-600 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <textarea
                  className="w-full h-48 md:h-64 bg-purple-500/5 border border-purple-500/10 rounded-2xl p-6 text-white text-sm focus:outline-none focus:border-purple-500/50 font-mono transition-all resize-none shadow-inner"
                  placeholder="Variant prompt..."
                  value={comparisonPrompt}
                  onChange={(e) => setComparisonPrompt(e.target.value)}
                />
                <button 
                  onClick={() => handleGenerate(comparisonPrompt, true)}
                  disabled={isLoading || !comparisonPrompt.trim()}
                  className="w-full py-3 bg-purple-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-purple-700 transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                  {isLoading ? 'Processing Variant...' : 'Compare'}
                </button>
                <div className="flex-grow bg-black/40 border border-purple-500/5 rounded-2xl p-6 font-light text-gray-300 text-sm overflow-y-auto custom-scrollbar min-h-[200px] leading-relaxed relative">
                   <span className="absolute top-4 right-4 text-[8px] font-mono text-gray-700">VARIANT_OUTPUT</span>
                   
                   {comparisonError && (
                     <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 mb-4">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        <div>
                          <h4 className="text-xs font-bold text-red-400 uppercase tracking-wide mb-1">Execution Error</h4>
                          <p className="text-xs text-red-200/80">{comparisonError}</p>
                        </div>
                     </div>
                   )}

                   {isLoading && !comparisonResult && !comparisonError && (
                     <div className="h-full flex flex-col items-center justify-center gap-4 py-12">
                       <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                       <div className="text-[10px] font-mono text-gray-700 uppercase tracking-widest">Generating Variant...</div>
                     </div>
                   )}
                   {comparisonResult ? (
                     <div className="space-y-6">
                        <div className="prose prose-invert prose-sm">
                           {comparisonResult}
                        </div>
                        <GroundingSources sources={comparisonSources} />
                     </div>
                   ) : !isLoading && !comparisonError && <span className="text-gray-700 font-mono opacity-20">Awaiting...</span>}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Studio;
