
import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage, Link } from '../context/LanguageContext';
import MobiusGalaxy from '../components/MobiusGalaxy';
import MissionCard from '../components/MissionCard';
import { getContent } from '../constants';
import { Course } from '../types';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const m = motion as any;

const PlanetsPageMobile: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [centeredCourse, setCenteredCourse] = useState<Course | null>(null);

  // Border Flash Logic based on centered organ
  // Fix: Added useMemo to React imports
  const flashColor = useMemo(() => {
    if (!centeredCourse) return 'transparent';
    const hex = centeredCourse.color.match(/#([0-9A-F]{6})/i);
    return hex ? `#${hex[1]}20` : 'rgba(59, 130, 246, 0.1)';
  }, [centeredCourse]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-dark flex flex-col transition-all duration-700" style={{ boxShadow: `inset 0 0 100px ${flashColor}` }}>
      
      {/* DNA Helix (Vertical Mobius) */}
      <div className="absolute inset-0 z-0">
        <MobiusGalaxy 
          courses={content.courses} 
          orientation="vertical" 
          isMobile={true}
          onSelectCourse={(course) => setSelectedCourse(course)}
          onHoverCourse={(course) => setCenteredCourse(course)}
        />
      </div>

      {/* DNA Overlay UI */}
      <div className="relative z-10 flex flex-col items-center pt-12 px-8 text-center pointer-events-none flex-grow">
        <div className="pointer-events-auto mb-4">
          <Link to="/" className="group inline-flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors font-mono text-[8px] uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <ArrowLeft className="w-3 h-3" />
            {language === 'en' ? 'BACK' : '返回'}
          </Link>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl font-black text-white tracking-tighter mb-1 uppercase">
            EVOLUTION_PROTOCOL
          </h1>
          <p className="text-blue-500 font-mono text-[8px] uppercase tracking-[0.4em] font-bold">
            DNA_SEQUENCING_V4
          </p>
        </div>

        {/* Current Level Info */}
        <div className="mt-auto mb-20 w-full">
           <AnimatePresence mode="wait">
              {centeredCourse && (
                <m.div 
                  key={centeredCourse.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-black/60 backdrop-blur-xl border border-white/10 p-5 rounded-3xl"
                >
                   <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Current Node</p>
                   <h3 className="text-xl font-black text-white uppercase tracking-tight">{centeredCourse.organ}</h3>
                   <div className="w-10 h-0.5 bg-blue-500 mx-auto mt-2 rounded-full" />
                </m.div>
              )}
           </AnimatePresence>
        </div>

        <div className="pb-8 space-y-2">
           <p className="text-gray-600 font-mono text-[7px] uppercase tracking-[0.5em] animate-pulse">
             SCROLL TO EVOLVE
           </p>
           <ChevronDown className="w-4 h-4 text-gray-800 mx-auto animate-bounce" />
        </div>
      </div>

      {/* Mission Card */}
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
