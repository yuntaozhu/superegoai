
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

      {/* Overlay UI - Tighter & More Compact */}
      <div className="relative z-10 flex flex-col items-center pt-10 px-6 text-center pointer-events-none flex-grow">
        <div className="pointer-events-auto mb-3">
          <Link to="/" className="group inline-flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors font-mono text-[7px] uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
            <ArrowLeft className="w-2 h-2" />
            {language === 'en' ? 'HOME' : '首页'}
          </Link>
        </div>

        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-200 to-transparent tracking-tighter mb-0.5 uppercase drop-shadow-sm">
          AI GALAXY
        </h1>
        <p className="text-blue-500 font-mono text-[7px] uppercase tracking-[0.2em]">
          ORCHESTRATION_V4_MOBILE
        </p>

        <div className="mt-auto pb-4">
           <p className="text-gray-700 font-mono text-[6px] uppercase tracking-[0.3em] animate-pulse">
             Swipe to Navigate
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
