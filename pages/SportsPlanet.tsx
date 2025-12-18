import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const SportsPlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'sports')!;
  
  return (
    <PlanetLayout course={course}>
      <div className="mt-16 bg-white/5 border border-white/10 rounded-[48px] overflow-hidden relative min-h-[500px] flex items-center justify-center">
        {/* HUD Overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none z-10">
           <div className="flex justify-between items-start">
              <div className="space-y-1">
                 <div className="text-[10px] font-mono text-orange-500">BIOMETRIC_SCAN: ACTIVE</div>
                 <div className="text-2xl font-black text-white">POSE_ESTIMATION_SQUAD</div>
              </div>
              <div className="text-right">
                 <div className="text-[10px] font-mono text-gray-500">FPS: 60.0</div>
                 <div className="text-[10px] font-mono text-gray-500">LATENCY: 12ms</div>
              </div>
           </div>
           <div className="flex justify-between items-end">
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-orange-500 w-2/3 animate-pulse" />
              </div>
              <div className="text-[10px] font-mono text-orange-500/50">SYSTEM_ALIGNMENT_STABLE</div>
           </div>
        </div>

        {/* Visual Core: The Athlete Wireframe */}
        <div className="relative">
           <div className="text-9xl opacity-20 grayscale filter blur-sm">🏃</div>
           <div className="absolute inset-0 flex items-center justify-center">
              {/* Simulated Scanning Lines */}
              <div className="w-64 h-64 border-2 border-orange-500/30 rounded-full animate-ping" />
              <div className="absolute w-full h-[1px] bg-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.5)] animate-scan" />
           </div>
           {/* Vector Points */}
           <div className="absolute top-0 left-1/2 w-2 h-2 bg-orange-500 rounded-full shadow-lg" />
           <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-orange-500 rounded-full shadow-lg" />
           <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-orange-500 rounded-full shadow-lg" />
        </div>

        <style>{`
          @keyframes scan {
            0% { transform: translateY(-150px); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(150px); opacity: 0; }
          }
          .animate-scan {
            animation: scan 3s linear infinite;
          }
        `}</style>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
         <div className="p-10 bg-orange-500/5 border border-orange-500/20 rounded-[32px]">
            <h3 className="text-xl font-bold text-white mb-4">The Private AI Coach</h3>
            <p className="text-gray-400">Deploy real-time computer vision models to mobile devices. Bridge the gap between digital intelligence and physical excellence.</p>
         </div>
         <div className="p-10 bg-brand-surface border border-white/5 rounded-[32px] flex items-center justify-between">
            <div>
               <div className="text-4xl font-black text-white">33</div>
               <div className="text-xs font-mono text-gray-500">BODY_LANDMARKS_TRACKED</div>
            </div>
            <div className="text-4xl">📐</div>
         </div>
      </div>
    </PlanetLayout>
  );
};

export default SportsPlanet;