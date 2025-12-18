import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const CodePlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'solopreneur')!;
  
  return (
    <PlanetLayout course={course}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
         {/* The Console */}
         <div className="bg-[#0c0c0c] border border-green-500/30 rounded-3xl p-8 font-mono text-sm overflow-hidden relative shadow-2xl">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-3 h-3 rounded-full bg-red-500/50" />
               <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
               <div className="w-3 h-3 rounded-full bg-green-500/50" />
               <span className="ml-4 text-gray-600 text-xs">SaaS_INCUBATOR_SHELL</span>
            </div>
            
            <div className="space-y-4">
               <div className="text-green-500">$ cursor-agent build --target commercial-saas</div>
               <div className="text-gray-400">{" >> "} Initializing Cursor Orchestration... <span className="text-green-600">[OK]</span></div>
               <div className="text-gray-400">{" >> "} Connecting V0 Frontend Engine... <span className="text-green-600">[OK]</span></div>
               <div className="text-gray-400">{" >> "} Deploying Supabase Infrastructure... <span className="text-green-600">[OK]</span></div>
               <div className="text-blue-400 italic mt-6">// Starting code self-healing loop...</div>
               <div className="grid grid-cols-10 gap-1 mt-2">
                  {[...Array(40)].map((_, i) => (
                    <div key={i} className="h-1 bg-green-900 rounded-full overflow-hidden">
                       <div className="h-full bg-green-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    </div>
                  ))}
               </div>
               <div className="text-white font-bold mt-8">READY FOR DEPLOYMENT. 🚀</div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5 pointer-events-none">
               💻
            </div>
         </div>

         {/* Individual Stats */}
         <div className="space-y-6">
            <div className="p-10 bg-gradient-to-br from-green-600/10 to-emerald-900/10 border border-green-500/20 rounded-[40px] flex flex-col justify-center">
               <h3 className="text-3xl font-black text-white mb-4 uppercase">The Super Individual</h3>
               <p className="text-gray-400 leading-relaxed">
                  We don't teach syntax; we teach architectural orchestration. Turn your ideas into full-stack reality without writing a single line of redundant boilerplate.
               </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
               <div className="p-8 bg-brand-surface border border-white/5 rounded-3xl">
                  <div className="text-2xl font-black text-white">0</div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase">SYNTAX_REQUIREMENT</div>
               </div>
               <div className="p-8 bg-brand-surface border border-white/5 rounded-3xl">
                  <div className="text-2xl font-black text-white">100%</div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase">PRODUCT_AUTONOMY</div>
               </div>
            </div>
         </div>
      </div>
    </PlanetLayout>
  );
};

export default CodePlanet;
