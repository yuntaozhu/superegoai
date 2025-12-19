
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PlanetsPageMobile from './PlanetsPageMobile';
import MobiusGalaxy from '../components/MobiusGalaxy';
import MissionCard from '../components/MissionCard';
import { getContent } from '../constants';
import { Course } from '../types';
import { ArrowLeft } from 'lucide-react';
import { Link } from '../context/LanguageContext';

const PlanetsPage: React.FC = () => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const content = getContent(language);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const mobileRegex = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const mobileWidth = window.innerWidth < 768;
      setIsMobile(mobileRegex.test(userAgent.toLowerCase()) || mobileWidth);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <PlanetsPageMobile />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-dark">
      {/* 3D Mobius Strip Container */}
      <div className="absolute inset-0 z-0">
        <MobiusGalaxy 
          courses={content.courses} 
          orientation="horizontal" 
          onSelectCourse={(course) => setSelectedCourse(course)}
        />
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 pointer-events-none flex flex-col items-center pt-20 px-4 text-center h-full">
        <div className="pointer-events-auto">
          <Link to="/" className="group inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 font-mono text-[10px] uppercase tracking-widest bg-white/5 px-5 py-2 rounded-full border border-white/5">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            {language === 'en' ? 'Back to Hub' : '返回星港'}
          </Link>
        </div>
        
        <h1 className="text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-transparent opacity-90 tracking-tighter mb-2 uppercase select-none">
          AI GALAXY
        </h1>
        <p className="text-blue-500 font-mono tracking-[0.4em] uppercase text-xs mb-10 select-none">
          SYSTEM_ORCHESTRATION_MODE_V3.5
        </p>

        <div className="mt-auto pb-12">
           <p className="text-gray-700 font-mono text-[9px] uppercase tracking-[0.8em] animate-pulse select-none">
             Drag to Rotate // Click Planet to Engage
           </p>
        </div>
      </div>

      {/* Modal / Mission Card */}
      {selectedCourse && (
        <MissionCard 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}
    </div>
  );
};

export default PlanetsPage;
