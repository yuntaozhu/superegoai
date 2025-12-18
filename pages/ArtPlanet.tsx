import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const ArtPlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'art')!;
  
  return (
    <PlanetLayout course={course}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {/* Artistic Flavor Components */}
        <div className="md:col-span-2 relative aspect-video bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-white/10 rounded-[40px] overflow-hidden group">
           <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent animate-pulse" />
           </div>
           <div className="absolute inset-0 p-12 flex flex-col justify-end">
              <span className="text-xs font-mono text-pink-400 mb-2">GENERATIVE_ENGINE_V2</span>
              <h3 className="text-3xl font-black text-white">RECONSTRUCTING AESTHETICS</h3>
              <p className="text-gray-400 max-w-md mt-4">Merging Impressionism with Mathematical Logic. AI as the ultimate director of visual context.</p>
           </div>
           {/* Floating Frames */}
           <div className="absolute top-10 right-10 w-32 h-40 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm -rotate-6 animate-bounce" style={{ animationDuration: '4s' }} />
           <div className="absolute bottom-20 right-24 w-40 h-32 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm rotate-12 animate-bounce" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        </div>
        
        <div className="space-y-8">
           <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
              <h4 className="text-blue-400 font-mono text-[10px] uppercase tracking-widest mb-4">Artifact Preview</h4>
              <div className="aspect-square bg-black/40 rounded-2xl flex items-center justify-center text-4xl grayscale opacity-50 border border-dashed border-white/20">
                🖼️
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">"Art is not what you see, but what you make others see."</p>
           </div>
           <div className="p-8 bg-pink-500/10 border border-pink-500/20 rounded-3xl">
              <h4 className="text-pink-400 font-mono text-[10px] uppercase tracking-widest mb-2">Aesthetic Node</h4>
              <p className="text-white text-sm font-bold">Training the SuperEgo to perceive abstract patterns as data streams.</p>
           </div>
        </div>
      </div>
    </PlanetLayout>
  );
};

export default ArtPlanet;