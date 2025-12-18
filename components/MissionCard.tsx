import React from 'react';
import { Course } from '../types';
import { useLanguage, Link } from '../context/LanguageContext';

interface MissionCardProps {
  course: Course;
  onClose: () => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ course, onClose }) => {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop Blur */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Card Body */}
      <div className="relative w-full max-w-2xl bg-brand-surface/60 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] animate-in zoom-in-95 fade-in slide-in-from-bottom-10 duration-500">
        
        {/* Neon Accent Line */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${course.color} animate-pulse`} />

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br ${course.color} flex items-center justify-center text-5xl md:text-6xl shadow-lg shadow-white/5 border border-white/20`}>
              {course.icon}
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight uppercase">
                {course.title}
              </h2>
              <p className="text-blue-400 font-mono text-sm tracking-widest uppercase opacity-80">
                {course.tagline}
              </p>
            </div>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center md:justify-start">
             <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase">Target</span>
                <span className="text-xs font-bold text-gray-200">{course.target}</span>
             </div>
             <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase">Duration</span>
                <span className="text-xs font-bold text-gray-200">{course.duration}</span>
             </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8 mb-12">
            <div>
               <h4 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] mb-3">Mission Brief</h4>
               <p className="text-gray-200 text-lg leading-relaxed font-light">
                 {course.description}
               </p>
            </div>
            <div>
               <h4 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] mb-3">Strategic Outcome</h4>
               <div className="p-4 rounded-xl bg-white/5 border border-white/5 italic text-gray-400 text-sm leading-relaxed">
                 {course.outcome}
               </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to={`/course/${course.id}`}
              className={`flex-1 py-4 px-8 rounded-xl bg-gradient-to-r ${course.color} text-white font-black text-center shadow-2xl hover:brightness-125 transition-all hover:scale-[1.02] tracking-widest uppercase text-sm`}
            >
              Start Mission
            </Link>
            <button 
              onClick={onClose}
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-bold hover:bg-white/10 hover:text-white transition-all uppercase text-xs tracking-widest"
            >
              Abort
            </button>
          </div>
        </div>

        {/* Floating Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-2"
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