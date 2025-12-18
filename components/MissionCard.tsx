import React from 'react';
import { Course } from '../types';
import { useLanguage, Link } from '../context/LanguageContext';

interface MissionCardProps {
  course: Course;
  onClose: () => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ course, onClose }) => {
  const { language } = useLanguage();

  // Helper to get the correct path based on our refactor
  const getPath = (id: string) => {
    const pathMap: Record<string, string> = {
      'art': '/course/art',
      'sports': '/course/sports',
      'data': '/course/data',
      'quant': '/course/quant',
      'solopreneur': '/course/solopreneur',
      'digital-twin': '/course/digital-twin'
    };
    return pathMap[id] || `/course/${id}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop Blur */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Card Body */}
      <div className="relative w-full max-w-2xl bg-brand-surface/90 backdrop-blur-2xl border border-white/20 rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.9)] animate-in zoom-in-95 fade-in slide-in-from-bottom-10 duration-500 max-h-full flex flex-col">
        
        {/* Neon Accent Line */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${course.color} animate-pulse flex-shrink-0`} />

        <div className="p-6 sm:p-10 md:p-12 overflow-y-auto custom-scrollbar flex-grow">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 mb-8 md:mb-10">
            <div className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl md:rounded-3xl bg-gradient-to-br ${course.color} flex items-center justify-center text-5xl md:text-6xl shadow-2xl border border-white/20 flex-shrink-0`}>
              {course.icon}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 tracking-tight uppercase leading-tight">
                {course.title}
              </h2>
              <p className="text-blue-400 font-mono text-[10px] md:text-sm tracking-widest uppercase opacity-80 font-bold">
                {course.tagline}
              </p>
            </div>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10 justify-center sm:justify-start">
             <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                <span className="text-[8px] md:text-[9px] font-mono text-gray-500 uppercase tracking-wider">Target</span>
                <span className="text-[10px] md:text-xs font-bold text-gray-200">{course.target}</span>
             </div>
             <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                <span className="text-[8px] md:text-[9px] font-mono text-gray-500 uppercase tracking-wider">Duration</span>
                <span className="text-[10px] md:text-xs font-bold text-gray-200">{course.duration}</span>
             </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6 md:space-y-8 mb-10 md:mb-12">
            <div>
               <h4 className="text-[9px] md:text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] mb-3 md:mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Mission Brief
               </h4>
               <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed font-light">
                 {course.description}
               </p>
            </div>
            <div>
               <h4 className="text-[9px] md:text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] mb-3 md:mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Strategic Outcome
               </h4>
               <div className="p-4 md:p-5 rounded-2xl bg-white/5 border border-white/5 italic text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                 "{course.outcome}"
               </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to={getPath(course.id)}
              className={`flex-1 py-4 sm:py-5 px-8 rounded-2xl bg-gradient-to-r ${course.color} text-white font-black text-center shadow-2xl hover:brightness-125 transition-all hover:scale-[1.02] active:scale-95 tracking-widest uppercase text-xs md:text-sm`}
            >
              Start Mission
            </Link>
            <button 
              onClick={onClose}
              className="py-4 sm:py-5 px-8 rounded-2xl bg-white/5 border border-white/10 text-gray-400 font-bold hover:bg-white/10 hover:text-white transition-all active:scale-95 uppercase text-xs md:text-sm tracking-widest"
            >
              Abort
            </button>
          </div>
        </div>

        {/* Floating Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-500 hover:text-white transition-colors p-3 z-20 active:bg-white/5 rounded-full"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MissionCard;