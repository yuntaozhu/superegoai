
import React, { useState } from 'react';
import { useLanguage, Link } from '../context/LanguageContext';
import MobiusGalaxy from '../components/MobiusGalaxy';
import MissionCard from '../components/MissionCard';
import { getContent } from '../constants';
import { Course } from '../types';
import { ArrowLeft } from 'lucide-react';

const PlanetsPageMobile: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-dark flex flex-col">
      {/* Vertical Mobius Strip Background */}
      <div className="absolute inset-0 z-0">
        <MobiusGalaxy 
          courses={content.courses} 
          orientation="vertical" 
          isMobile={true}
          onSelectCourse={(course) => setSelectedCourse(course)}
        />
      </div>

      {/* Overlay UI */}
      <div className="relative z-10 flex flex-col items-center pt-20 px-6 text-center pointer-events-none flex-grow">
        <div className="pointer-events-auto mb-6">
          <Link to="/" className="group inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-mono text-[9px] uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <ArrowLeft className="w-3 h-3" />
            {language === 'en' ? 'HOME' : '首页'}
          </Link>
        </div>

        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-200 to-transparent tracking-tighter mb-2 uppercase">
          AI GALAXY
        </h1>
        <p className="text-blue-400 font-mono text-[10px] uppercase tracking-widest">
          SYSTEM_ORCHESTRATION_V3
        </p>

        <div className="mt-auto pb-8">
           <p className="text-gray-600 font-mono text-[8px] uppercase tracking-[0.4em] animate-pulse">
             Swipe to Rotate
           </p>
        </div>
      </div>

      {/* Selected Course Mission Card */}
      {selectedCourse && (
        <MissionCard 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
};

export default PlanetsPageMobile;
