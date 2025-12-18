import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const SuperEgoPlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'data')!;
  
  return (
    <PlanetLayout course={course}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16">
        {/* Knowledge Base Visualization */}
        <div className="lg:col-span-8 bg-brand-surface/40 border border-white/10 rounded-[48px] p-12 relative overflow-hidden h-[600px] flex items-center justify-center">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
           
           {/* Animated Neural Network Nodes */}
           <div className="relative w-full h-full">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-pulse"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                 <line x1="30%" y1="40%" x2="70%" y2="60%" stroke="cyan" strokeWidth="1" />
                 <line x1="70%" y1="60%" x2="50%" y2="80%" stroke="cyan" strokeWidth="1" />
                 <line x1="50%" y1="80%" x2="30%" y2="40%" stroke="cyan" strokeWidth="1" />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center">
                    <div className="text-8xl mb-4">🧠</div>
                    <div className="text-sm font-mono text-cyan-400 tracking-[0.4em] uppercase">SuperEgo_Core_v1</div>
                    <div className="mt-4 flex gap-2 justify-center">
                       <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" />
                       <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce delay-100" />
                       <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce delay-200" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center text-[10px] font-mono text-gray-500 border-t border-white/5 pt-6">
              <span>MEMORY_POOL: 2.4TB</span>
              <span>RAG_STATUS: OPTIMIZED</span>
              <span>SOVEREIGNTY: 100%</span>
           </div>
        </div>

        {/* Info Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <div className="p-8 bg-cyan-500/10 border border-cyan-500/20 rounded-[32px] group hover:bg-cyan-500/20 transition-all">
              <h4 className="text-cyan-400 font-bold mb-2">FTI Architecture</h4>
              <p className="text-sm text-gray-400 leading-relaxed">Implementing enterprise-grade File-to-Insight pipelines for your personal data sovereignty.</p>
           </div>
           <div className="p-8 bg-white/5 border border-white/10 rounded-[32px]">
              <h4 className="text-white font-bold mb-4">Vector Database</h4>
              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-2 h-8 bg-cyan-500/30 rounded-full" />
                       <div className="flex-grow h-4 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400" style={{ width: `${40 + i * 15}%` }} />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
           <div className="p-8 bg-brand-surface rounded-[32px] text-center border border-white/5">
              <span className="text-xs font-mono text-gray-500 uppercase block mb-2">Digital Twin Status</span>
              <span className="text-2xl font-black text-white">SYNCHRONIZED</span>
           </div>
        </div>
      </div>
    </PlanetLayout>
  );
};

export default SuperEgoPlanet;