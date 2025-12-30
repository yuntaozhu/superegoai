
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfigStore } from '../lib/store/configStore';
import { Settings, X, Cpu, Database, Sparkles, Sliders } from 'lucide-react';

const ConfigPanel: React.FC = () => {
  const { config, setConfig, applyPreset, isPanelOpen, togglePanel } = useConfigStore();

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={togglePanel}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[400px] bg-[#0B1026] border-l border-white/10 shadow-2xl z-50 overflow-y-auto custom-scrollbar"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#05060f]">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-black text-white uppercase tracking-wider">Brain Workbench</h2>
              </div>
              <button onClick={togglePanel} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-10">
              
              {/* Presets */}
              <div className="space-y-4">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Quick Presets</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['junior', 'senior', 'superego'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => applyPreset(level)}
                      className="px-2 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all text-xs font-bold text-white capitalize"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 1: The Soul (Lessons 3 & 4) */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-purple-400 border-b border-purple-500/20 pb-2">
                  <Sparkles className="w-4 h-4" />
                  <h3 className="text-xs font-black uppercase tracking-widest">The Soul (Persona)</h3>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-400">System Persona</label>
                  <textarea 
                    value={config.persona}
                    onChange={(e) => setConfig({ persona: e.target.value })}
                    className="w-full h-24 bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-gray-300 focus:outline-none focus:border-purple-500 transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-gray-400">Response Style</label>
                  <select 
                    value={config.responseStyle}
                    onChange={(e) => setConfig({ responseStyle: e.target.value as any })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="concise">Concise (Brief)</option>
                    <option value="detailed">Detailed (Explanatory)</option>
                    <option value="bullet-points">Structured (Bullets)</option>
                    <option value="socratic">Socratic (Questioning)</option>
                  </select>
                </div>
              </section>

              {/* Section 2: The Memory (Lesson 5) */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-orange-400 border-b border-orange-500/20 pb-2">
                  <Database className="w-4 h-4" />
                  <h3 className="text-xs font-black uppercase tracking-widest">The Memory (RAG)</h3>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-gray-400">Retrieval Strategy</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { val: 'naive', label: 'Naive RAG', desc: 'Chunks only. High speed, low context.' },
                      { val: 'parent-doc', label: 'Parent Document', desc: 'Adds surrounding window context.' },
                      { val: 'contextual', label: 'Contextual RAG', desc: 'Adds AI-generated context summary.' }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => setConfig({ retrievalStrategy: opt.val as any })}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          config.retrievalStrategy === opt.val 
                            ? 'bg-orange-500/10 border-orange-500 text-white' 
                            : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-xs font-bold">{opt.label}</div>
                        <div className="text-[10px] opacity-60">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-[10px] text-gray-400">Top K (Information Density)</label>
                    <span className="text-[10px] font-mono text-orange-400">{config.topK}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={config.topK}
                    onChange={(e) => setConfig({ topK: parseInt(e.target.value) })}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-full"
                  />
                </div>
              </section>

              {/* Section 3: The Brain (Lesson 6) */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 border-b border-emerald-500/20 pb-2">
                  <Cpu className="w-4 h-4" />
                  <h3 className="text-xs font-black uppercase tracking-widest">The Brain (Tools)</h3>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                    <span className="text-xs font-bold text-gray-300">Live Web Search</span>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${config.toolsEnabled.webSearch ? 'bg-emerald-500' : 'bg-gray-600'}`} onClick={() => setConfig({ toolsEnabled: { ...config.toolsEnabled, webSearch: !config.toolsEnabled.webSearch } })}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.toolsEnabled.webSearch ? 'left-6' : 'left-1'}`} />
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                    <span className="text-xs font-bold text-gray-300">Deep Research (Crawler)</span>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${config.toolsEnabled.deepResearch ? 'bg-emerald-500' : 'bg-gray-600'}`} onClick={() => setConfig({ toolsEnabled: { ...config.toolsEnabled, deepResearch: !config.toolsEnabled.deepResearch } })}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.toolsEnabled.deepResearch ? 'left-6' : 'left-1'}`} />
                    </div>
                  </label>
                </div>
              </section>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfigPanel;
