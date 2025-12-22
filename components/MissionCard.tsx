
import React from 'react';
import { Course } from '../types';
import { useLanguage, Link } from '../context/LanguageContext';
import { Activity } from 'lucide-react';

interface MissionCardProps {
  course: Course;
  onClose: () => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ course, onClose }) => {
  const { language } = useLanguage();

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
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.9)] animate-in zoom-in-95 fade-in slide-in-from-bottom-10 duration-500 max-h-full flex flex-col">
        
        <div className={`h-1.5 w-full bg-gradient-to-r ${course.color} flex-shrink-0`} />

        <div className="p-8 sm:p-12 overflow-y-auto custom-scrollbar flex-grow">
          
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
            <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-[32px] bg-gradient-to-br ${course.color} flex items-center justify-center text-6xl shadow-2xl border border-white/20 flex-shrink-0 animate-pulse`}>
              {course.icon}
            </div>
            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                 <span className="bg-blue-600 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-tighter flex items-center gap-1">
                    <Activity className="w-2.5 h-2.5" /> Functional Node
                 </span>
                 <span className="text-gray-500 font-mono text-[9px] uppercase tracking-widest">{course.organ}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight uppercase leading-tight">
                {course.title}
              </h2>
              <p className="text-blue-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                {course.organRole}
              </p>
            </div>
          </div>

          <div className="space-y-8 mb-12">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 text-xs font-mono">ANATOMY_LOG</div>
               <h4 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Organ Function
               </h4>
               <p className="text-gray-200 text-base md:text-lg leading-relaxed font-light italic">
                 "{course.description}"
               </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[8px] font-mono text-gray-500 uppercase block mb-1">Module ID</span>
                  <span className="text-white font-bold text-sm tracking-widest">{course.id.toUpperCase()}</span>
               </div>
               <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[8px] font-mono text-gray-500 uppercase block mb-1">Complexity</span>
                  <span className="text-white font-bold text-sm tracking-widest">ADVANCED</span>
               </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to={getPath(course.id)}
              className={`flex-1 py-5 px-8 rounded-3xl bg-white text-black font-black text-center shadow-2xl hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-95 tracking-widest uppercase text-sm`}
            >
              ENGAGE UNIT
            </Link>
            <button 
              onClick={onClose}
              className="py-5 px-8 rounded-3xl bg-white/5 border border-white/10 text-gray-500 font-bold hover:bg-white/10 hover:text-white transition-all active:scale-95 uppercase text-sm tracking-widest"
            >
              DISMISS
            </button>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-3 z-20 active:bg-white/5 rounded-full"
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
