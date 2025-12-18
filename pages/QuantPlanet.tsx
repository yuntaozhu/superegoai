import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const QuantPlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'quant')!;
  
  return (
    <PlanetLayout course={course}>
      <div className="mt-16 bg-black border border-amber-600/30 rounded-[40px] overflow-hidden shadow-2xl">
        {/* Ticker Tape */}
        <div className="bg-amber-600/10 border-b border-amber-600/20 py-2 px-6 flex items-center overflow-hidden whitespace-nowrap">
           <div className="flex gap-12 animate-marquee font-mono text-xs text-amber-500">
              <span>ALPHA_01: +12.4%</span>
              <span>BETA_CORR: 0.04</span>
              <span>GEMINI_3_MODELS: STABLE</span>
              <span>VOL_IDX: 14.2</span>
              <span>AGENT_SWARM: 5 ACTIVE</span>
              <span>STRATEGY_GENOME: EVOLVING</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
           <div className="lg:col-span-2 p-12 border-r border-amber-600/20 min-h-[500px] flex flex-col justify-between">
              <div>
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center text-2xl">📈</div>
                    <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Alpha Engine</h3>
                 </div>
                 <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                    We don't code algorithms; we architect evolving ecosystems. Using Gemini 3's 2M context window to digest market sentiment in real-time.
                 </p>
              </div>

              {/* Strategy Matrix Visual */}
              <div className="grid grid-cols-6 gap-2 mt-12">
                 {[...Array(24)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-12 rounded-lg border border-amber-500/10 transition-all ${Math.random() > 0.6 ? 'bg-amber-600/40 border-amber-600/60' : 'bg-white/5'}`}
                      style={{ opacity: Math.random() * 0.8 + 0.2 }}
                    />
                 ))}
              </div>
           </div>

           <div className="bg-white/5 p-12 space-y-10">
              <div>
                 <h4 className="text-amber-500 font-mono text-[10px] uppercase tracking-widest mb-6">Evolution Pipeline</h4>
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-amber-600/20 border border-amber-600/50 flex items-center justify-center text-xs">🧬</div>
                       <div>
                          <div className="text-white font-bold text-sm">Strategy Genome</div>
                          <div className="text-xs text-gray-500">Auto-vectorized logic</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-600/50 flex items-center justify-center text-xs">🤖</div>
                       <div>
                          <div className="text-white font-bold text-sm">Critic Agent</div>
                          <div className="text-xs text-gray-500">Real-time RLHF tuning</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-600/50 flex items-center justify-center text-xs">⚡</div>
                       <div>
                          <div className="text-white font-bold text-sm">Execution Engine</div>
                          <div className="text-xs text-gray-500">Low-latency deployment</div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="pt-10 border-t border-amber-600/20">
                 <button className="w-full py-4 bg-amber-600 text-black font-black uppercase tracking-widest rounded-xl hover:bg-amber-500 transition-all shadow-xl shadow-amber-600/20">
                    ACCESS TERMINAL
                 </button>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </PlanetLayout>
  );
};

export default QuantPlanet;