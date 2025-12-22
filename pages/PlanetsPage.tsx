
import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage, Link } from '../context/LanguageContext';
import MobiusGalaxy from '../components/MobiusGalaxy';
import MissionCard from '../components/MissionCard';
import { getContent } from '../constants';
import { Course } from '../types';
import { ArrowLeft, Activity, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const m = motion as any;

const PlanetsPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [hoveredCourse, setHoveredCourse] = useState<Course | null>(null);
  const content = getContent(language);

  // Responsive logic
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    const PlanetsPageMobile = React.lazy(() => import('./PlanetsPageMobile'));
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">INITIALIZING_BIOMETRICS...</div>}>
        <PlanetsPageMobile />
      </React.Suspense>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-dark">
      {/* Neural Connectivity SVG Background */}
      <div className="absolute inset-0 z-5 pointer-events-none opacity-20">
         <svg width="100%" height="100%" className="text-blue-500/20">
            <defs>
              <pattern id="neural-nodes" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="1.5" fill="currentColor" />
                <path d="M 100 100 L 0 0 M 100 100 L 200 0 M 100 100 L 200 200 M 100 100 L 0 200" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-nodes)" />
         </svg>
      </div>

      {/* 3D Mobius Strip Container */}
      <div className="absolute inset-0 z-0">
        <MobiusGalaxy 
          courses={content.courses} 
          orientation="horizontal" 
          onSelectCourse={(course) => setSelectedCourse(course)}
          onHoverCourse={(course) => setHoveredCourse(course)}
        />
      </div>

      {/* HUD UI Overlay */}
      <div className="relative z-10 pointer-events-none flex flex-col items-center justify-between min-h-screen py-16 px-10 text-center">
        
        {/* Top Branding */}
        <div className="space-y-2 pointer-events-auto">
          <Link to="/" className="group inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-4 font-mono text-[10px] uppercase tracking-widest bg-white/5 px-5 py-2 rounded-full border border-white/5 backdrop-blur-md">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            {language === 'en' ? 'Anatomical Hub' : '返回中枢'}
          </Link>
          <m.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-black text-white tracking-tighter uppercase drop-shadow-2xl"
          >
            DIGITAL LIFE FORM
          </m.h1>
          <p className="text-blue-400 font-mono tracking-[0.6em] uppercase text-[10px] font-bold">
            CONSTRUCTING THE SUPER EGO ANATOMY
          </p>
        </div>

        {/* Center Organ Info Display */}
        <div className="flex-grow flex items-center justify-center w-full max-w-4xl mx-auto">
           <AnimatePresence mode="wait">
              {hoveredCourse && (
                <m.div 
                  key={hoveredCourse.id}
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                  className="flex flex-col items-center gap-4"
                >
                   <div className="relative">
                      <div className="absolute -inset-10 bg-white/5 blur-3xl rounded-full" />
                      <h2 className="text-8xl md:text-9xl font-black text-white uppercase tracking-tighter glitch-text relative z-10">
                        {hoveredCourse.organ}
                      </h2>
                   </div>
                   <div className="bg-blue-600 text-white font-mono text-xs px-6 py-2 rounded-full font-black tracking-widest uppercase flex items-center gap-3 relative z-10 shadow-2xl">
                      <Activity className="w-4 h-4 animate-pulse" />
                      {hoveredCourse.organRole}
                   </div>
                </m.div>
              )}
           </AnimatePresence>
        </div>

        {/* Footer Metrics */}
        <div className="flex justify-between w-full pointer-events-auto border-t border-white/10 pt-8 mt-10 max-w-6xl">
           <div className="text-left font-mono text-[9px] text-gray-500 uppercase tracking-widest space-y-1">
              <p>STATUS: ANALYZING_BIOMETRICS</p>
              <p>NODES: 06_ACTIVE</p>
           </div>
           <div className="text-right">
              <p className="text-gray-700 font-mono text-[9px] uppercase tracking-[0.5em] animate-pulse">
                ORBIT_SELECT // CLICK_TO_ENGAGE
              </p>
           </div>
        </div>
      </div>

      {/* Modal / Mission Card */}
      {selectedCourse && (
        <MissionCard 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}

      <style>{`
        .glitch-text {
          text-shadow: 2px 2px #FF0000, -2px -2px #00FFFF;
          animation: glitch 2s infinite linear alternate-reverse;
        }
        @keyframes glitch {
          0% { text-shadow: 2px 2px #FF0000, -2px -2px #00FFFF; }
          25% { text-shadow: -2px 2px #FF0000, 2px -2px #00FFFF; }
          50% { text-shadow: 2px -2px #FF0000, -2px 2px #00FFFF; }
          100% { text-shadow: -2px -2px #FF0000, 2px 2px #00FFFF; }
        }
      `}</style>
    </div>
  );
};

export default PlanetsPage;
