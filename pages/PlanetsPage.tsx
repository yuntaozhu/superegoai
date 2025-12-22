
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import BioCosmos from '../components/BioCosmos';
import AnatomyCard, { AnatomyNode } from '../components/AnatomyCard';
import MobiusGalaxy from '../components/MobiusGalaxy';
import { getContent } from '../constants';
import { Course } from '../types';
import { 
  ArrowLeft, Activity, ShieldCheck, Zap, 
  ChevronDown, Layers, Target, Info, X
} from 'lucide-react';

const m = motion as any;

const PlanetsPage: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [hoveredCourse, setHoveredCourse] = useState<Course | null>(null);

  // Map Course to AnatomyNode for compatibility with AnatomyCard
  const mapCourseToNode = (course: Course): AnatomyNode => ({
    id: course.id,
    organ: course.organ,
    name: course.title,
    metaphor: course.tagline,
    target: course.target,
    method: course.format,
    outcome: course.outcome,
    link: `/course/${course.id}`,
    color: course.id === 'data' ? '#FFD700' : 
           course.id === 'digital-twin' ? '#00BFFF' : 
           course.id === 'art' ? '#8A2BE2' : 
           course.id === 'sports' ? '#FF4500' : 
           course.id === 'solopreneur' ? '#00FFFF' : '#2E8B57',
    icon: course.icon
  });

  return (
    <div className="relative min-h-screen bg-[#020308] overflow-hidden pt-24">
      {/* GLOBAL BIOLOGICAL BACKGROUND */}
      <BioCosmos 
        activeColor={hoveredCourse ? mapCourseToNode(hoveredCourse).color : undefined} 
        isCore={hoveredCourse?.id === 'data'}
      />

      {/* 3D GALAXY VIEWPORT */}
      <div className="fixed inset-0 z-0">
        <MobiusGalaxy 
          orientation="horizontal" 
          courses={content.courses}
          onHoverCourse={(c) => setHoveredCourse(c)}
          onSelectCourse={(c) => setSelectedCourse(c)}
        />
      </div>

      {/* HUD OVERLAY - NON-INTERACTIVE BACKGROUND TEXT */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center">
        <m.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredCourse ? 0 : 0.3 }}
          className="text-center"
        >
          <p className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4">Neural Network Orbit</p>
          <h1 className="text-6xl md:text-[140px] font-black text-white/5 uppercase tracking-tighter select-none leading-none">
            {language === 'zh' ? '数字生命' : 'DIGITAL LIFE'}
          </h1>
        </m.div>
      </div>

      {/* INTERACTIVE UI LAYER */}
      <div className="relative z-20 container mx-auto px-6 h-[calc(100vh-100px)] flex flex-col pointer-events-none">
        {/* Top Instructions */}
        <div className="flex justify-between items-start pt-4">
          <m.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4 pointer-events-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-widest">
              <Activity className="w-3 h-3" />
              Interactive Evolution Map
            </div>
            <div className="bg-black/60 backdrop-blur-xl p-5 rounded-3xl border border-white/5 max-w-xs shadow-2xl">
              <p className="text-gray-400 text-[10px] leading-relaxed uppercase tracking-wider font-bold">
                {language === 'zh' 
                  ? '点击星系中的微缩星球，展开器官解剖视图。星球间通过神经网络彼此呼应。'
                  : 'Click the miniature planets in orbit to expand organ anatomy. The nodes are linked via a neural web.'}
              </p>
            </div>
          </m.div>

          {/* Quick Stats Panel */}
          <m.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden md:block pointer-events-auto"
          >
            <div className="bg-black/60 backdrop-blur-xl p-6 rounded-[32px] border border-white/5 space-y-6 min-w-[200px] shadow-2xl">
               <div>
                  <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest mb-1">Orbit Sync</div>
                  <div className="text-xs font-black text-white uppercase tracking-tight">Active_Stable_Node</div>
               </div>
               <div>
                  <div className="text-[8px] font-mono text-gray-500 uppercase tracking-widest mb-1">Neural Load</div>
                  <div className="text-xs font-black text-blue-400 uppercase">Synchronized</div>
               </div>
               <div className="pt-4 border-t border-white/5">
                  <Link to="/consulting" className="text-[9px] font-black text-white uppercase tracking-widest hover:text-blue-500 transition-colors">
                    Enterprise Access {"->"}
                  </Link>
               </div>
            </div>
          </m.div>
        </div>

        {/* Selected Planet Details Sidepanel */}
        <AnimatePresence>
          {selectedCourse && (
            <m.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="fixed right-6 top-24 bottom-24 w-full max-w-md pointer-events-auto z-50"
            >
              <div className="h-full relative group">
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl z-10 hover:scale-110 transition-transform"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="h-full scale-[0.95] origin-right">
                  <AnatomyCard 
                    data={mapCourseToNode(selectedCourse)} 
                    isCenter={selectedCourse.id === 'data'} 
                    onHover={() => {}} 
                  />
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Hover Label Protocol */}
        <div className="mt-auto pb-10 flex justify-center">
          <AnimatePresence mode="wait">
            {hoveredCourse && (
              <m.div 
                key={hoveredCourse.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="bg-white/10 backdrop-blur-3xl px-8 py-3 rounded-full border border-white/20 shadow-2xl pointer-events-auto"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">{hoveredCourse.icon}</span>
                  <div className="h-4 w-px bg-white/20" />
                  <span className="text-sm font-black text-white uppercase tracking-[0.2em]">
                    {hoveredCourse.organ}: {hoveredCourse.title}
                  </span>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* FOOTER RESET */}
      <div className="fixed bottom-6 left-6 z-30">
        <Link to="/" className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-gray-500 hover:text-white transition-all font-mono text-[9px] uppercase tracking-widest">
          <ArrowLeft className="w-3 h-3" />
          Protocol Reset
        </Link>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, #ffffff08 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff08 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default PlanetsPage;
