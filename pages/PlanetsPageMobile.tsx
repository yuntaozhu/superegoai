
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
      <div className="relative z-10 flex flex-col items-center pt-16 px-6 text-center pointer-events-none flex-grow">
        <div className="pointer-events-auto mb-4">
          <Link to="/" className="group inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-mono text-[8px] uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <ArrowLeft className="w-2.5 h-2.5" />
            {language === 'en' ? 'HOME' : '首页'}
          </Link>
        </div>

        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-200 to-transparent tracking-tighter mb-1 uppercase">
          AI GALAXY
        </h1>
        <p className="text-blue-400 font-mono text-[8px] uppercase tracking-widest mb-2">
          ORCHESTRATION_HUB_V3
        </p>

        <div className="mt-auto pb-6">
           <p className="text-gray-600 font-mono text-[7px] uppercase tracking-[0.3em] animate-pulse">
             Swipe to Navigate Galaxy
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
