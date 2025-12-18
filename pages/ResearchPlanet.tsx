import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const ResearchPlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'digital-twin')!;
  
  return (
    <PlanetLayout course={course}>
      <div className="mt-16 bg-brand-surface/30 border border-white/10 rounded-[64px] p-12 lg:p-20 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div>
              <span className="inline-block px-4 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-6">Laboratory_ENV: RESEARCH_ALPHA</span>
              <h2 className="text-5xl font-black text-white mb-8 tracking-tighter">THE SCIENTIST OS</h2>
              <div className="space-y-6">
                 <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-slate-500/40 transition-all">
                    <div className="text-2xl">🔬</div>
                    <div>
                       <h4 className="text-white font-bold">Deep Research Agents</h4>
                       <p className="text-sm text-gray-500">Orchestrating multi-agent swarms to conduct comprehensive literature reviews in seconds.</p>
                    </div>
                 </div>
                 <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-indigo-500/40 transition-all">
                    <div className="text-2xl">🧬</div>
                    <div>
                       <h4 className="text-white font-bold">Predictive Modeling</h4>
                       <p className="text-sm text-gray-500">Transforming experimental data into non-linear digital twins of reality.</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="relative flex items-center justify-center">
              {/* Atomic / Molecule Visual */}
              <div className="w-80 h-80 relative">
                 <div className="absolute inset-0 border-2 border-slate-500/20 rounded-full animate-spin-slow" />
                 <div className="absolute inset-4 border border-indigo-500/20 rounded-full animate-spin-reverse-slow" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-4xl shadow-[0_0_50px_rgba(255,255,255,0.3)] z-10">
                      🧪
                    </div>
                    {/* Floating Electrons/Nodes */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full animate-bounce" />
                    <div className="absolute bottom-10 right-0 w-3 h-3 bg-slate-400 rounded-full animate-pulse" />
                    <div className="absolute left-0 top-1/3 w-2 h-2 bg-white rounded-full" />
                 </div>
              </div>

              {/* Stats Overlay */}
              <div className="absolute bottom-0 right-0 p-6 bg-brand-dark border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl">
                 <div className="text-indigo-400 font-mono text-[10px] mb-1">CITATIONS_GEN</div>
                 <div className="text-2xl font-black text-white">∞</div>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 10s linear infinite;
        }
      `}</style>
    </PlanetLayout>
  );
};

export default ResearchPlanet;