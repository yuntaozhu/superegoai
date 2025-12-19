
import React, { useState, useEffect, useRef } from 'react';
import { CourseModule } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface SyllabusTrajectoryProps {
  syllabus: CourseModule[];
  color: string;
}

const SyllabusTrajectory: React.FC<SyllabusTrajectoryProps> = ({ syllabus, color }) => {
  const [activeNode, setActiveNode] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Extract color for SVG stroke
  const getStrokeColor = (colorStr: string) => {
    if (colorStr.includes('blue')) return '#3b82f6';
    if (colorStr.includes('purple')) return '#a855f7';
    if (colorStr.includes('orange')) return '#f97316';
    if (colorStr.includes('emerald')) return '#10b981';
    if (colorStr.includes('yellow')) return '#facc15';
    if (colorStr.includes('indigo')) return '#6366f1';
    return '#3b82f6';
  };

  const strokeColor = getStrokeColor(color);

  return (
    <div className="relative py-20" ref={containerRef}>
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Trajectory Container */}
        <div className="relative flex flex-col md:flex-row gap-12 items-start">
          
          {/* SVG Connector Path */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block">
            <svg className="h-full w-full" preserveAspectRatio="none">
               <motion.path 
                 d={`M 0 0 V ${syllabus.length * 200}`}
                 stroke={strokeColor}
                 strokeWidth="2"
                 strokeDasharray="8 8"
                 fill="none"
                 initial={{ pathLength: 0 }}
                 whileInView={{ pathLength: 1 }}
                 transition={{ duration: 1.5, ease: "easeInOut" }}
               />
            </svg>
          </div>

          {/* Nodes & Content */}
          <div className="w-full space-y-24 md:space-y-32">
            {syllabus.map((module, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Node Point */}
                <div 
                  className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  onClick={() => setActiveNode(idx)}
                >
                   <motion.div 
                     whileHover={{ scale: 1.2 }}
                     className={`w-12 h-12 rounded-full border-4 border-brand-dark flex items-center justify-center cursor-pointer shadow-2xl transition-all duration-500 ${activeNode === idx ? `bg-white` : 'bg-white/10 hover:bg-white/20'}`}
                     style={{ borderColor: activeNode === idx ? strokeColor : 'rgba(255,255,255,0.1)' }}
                   >
                     <span className={`text-[10px] font-black font-mono ${activeNode === idx ? 'text-brand-dark' : 'text-white'}`}>
                       0{idx + 1}
                     </span>
                   </motion.div>
                   
                   {/* Radar pulse for active node */}
                   {activeNode === idx && (
                     <motion.div 
                       initial={{ scale: 0.8, opacity: 0.5 }}
                       animate={{ scale: 2, opacity: 0 }}
                       transition={{ repeat: Infinity, duration: 2 }}
                       className="absolute inset-0 rounded-full z-[-1]"
                       style={{ backgroundColor: strokeColor }}
                     />
                   )}
                </div>

                {/* Content Panel */}
                <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-white/20 transition-all backdrop-blur-xl relative overflow-hidden group shadow-2xl ${activeNode === idx ? 'ring-1 ring-white/20' : ''}`}>
                    <div className="absolute top-0 right-0 p-4 opacity-5 text-4xl font-black">PHASE_0{idx + 1}</div>
                    
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2 block">{module.goal || 'TRAJECTORY NODE'}</span>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-6 uppercase tracking-tight">{module.title}</h3>
                    
                    <ul className={`space-y-6 ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'} flex flex-col`}>
                      {module.content.map((item, i) => (
                        <li key={i} className={`flex gap-4 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0`} style={{ backgroundColor: strokeColor }} />
                          <div>
                            <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed font-light">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Status Indicator (Empty space for balance) */}
                <div className="hidden md:block w-[45%]">
                   <div className={`flex items-center gap-4 ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                      <div className="text-[9px] font-mono text-gray-700 uppercase tracking-[0.4em] rotate-90 md:rotate-0">
                         System_Ready // Stable
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-5">
         <svg width="100%" height="100%">
            <pattern id="trajectory-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#trajectory-grid)" />
         </svg>
      </div>
    </div>
  );
};

export default SyllabusTrajectory;
