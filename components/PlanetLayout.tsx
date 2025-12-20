
import React, { useEffect } from 'react';
import { Course } from '../types';
import { useLanguage, Link } from '../context/LanguageContext';
import { ArrowLeft, Home } from 'lucide-react';
import SyllabusTrajectory from './SyllabusTrajectory';

interface PlanetLayoutProps {
  course: Course;
  children?: React.ReactNode;
}

const PlanetLayout: React.FC<PlanetLayoutProps> = ({ course, children }) => {
  const { language, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [course.id]);

  return (
    <div className="min-h-screen bg-brand-dark pt-16 md:pt-24 pb-16 md:pb-20 relative overflow-hidden">
      {/* Immersive Background Elements */}
      <div className={`fixed top-0 left-0 w-full h-full bg-gradient-to-b ${course.color} to-brand-dark/0 opacity-10 pointer-events-none -z-10`} />
      <div className={`fixed -top-1/4 -right-1/4 w-[300px] sm:w-[500px] md:w-[800px] h-[300px] sm:h-[500px] md:h-[800px] bg-gradient-to-br ${course.color} rounded-full blur-[80px] md:blur-[120px] opacity-15 md:opacity-20 pointer-events-none -z-10`} />
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] -z-5" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation Controls */}
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-all group font-mono text-[10px] md:text-sm tracking-widest py-2 bg-white/5 px-4 rounded-full border border-white/5">
            <Home className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
            {language === 'en' ? 'HOME' : '首页'}
          </Link>
          <Link to="/planets" className="inline-flex items-center text-gray-400 hover:text-white transition-all group font-mono text-[10px] md:text-sm tracking-widest py-2 bg-white/5 px-4 rounded-full border border-white/5">
            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            {t('course.return_galaxy') || 'RETURN TO GALAXY MAP'}
          </Link>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-24">
          <div className="animate-in fade-in slide-in-from-bottom-8 md:slide-in-from-left-8 duration-700 text-center lg:text-left order-last lg:order-first">
            <div className={`inline-block px-3 md:px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-4 md:mb-6`}>
              PLANET_ID: {course.id.toUpperCase()}
            </div>
            {/* 标题字号再次缩小，更显精致 */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 md:mb-6 leading-tight tracking-tighter uppercase break-words">
              {course.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 font-bold mb-6 md:mb-8 italic">
              {course.tagline}
            </p>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 font-light">
              {course.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className={`px-6 md:px-8 py-3 md:py-4 rounded-2xl bg-gradient-to-r ${course.color} text-white font-black shadow-2xl hover:brightness-110 active:scale-95 transition-all tracking-widest uppercase text-[10px] md:text-xs`}>
                {t('course.enroll') || 'START MISSION'}
              </button>
            </div>
          </div>

          <div className="flex justify-center animate-in fade-in zoom-in duration-1000">
            {/* 行星图片尺寸显著缩小 */}
            <div className={`relative w-20 h-20 sm:w-32 sm:h-32 md:w-44 md:h-44 rounded-full bg-gradient-to-br ${course.color} shadow-[0_0_40px_rgba(255,255,255,0.05)] flex items-center justify-center text-2xl sm:text-3xl md:text-4xl animate-float-planet border border-white/10`}>
              <div className="absolute inset-0 rounded-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/40 via-transparent to-white/20"></div>
              <span className="drop-shadow-2xl">{course.icon}</span>
            </div>
          </div>
        </div>

        {/* Unique Planet Content */}
        <div className="px-0">
          {children}
        </div>

        {/* Detailed Syllabus Trajectory */}
        <div id="syllabus" className="mt-20 md:mt-32 mb-16 md:mb-20 overflow-hidden">
          <div className="flex items-center justify-between mb-16 px-1">
             <div className="flex items-center gap-3 md:gap-4">
                <div className={`w-6 sm:w-12 h-1 bg-gradient-to-r ${course.color} rounded-full`}></div>
                <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
                  {t('course.syllabus') || 'MISSION TRAJECTORY'}
                </h2>
             </div>
             <div className="flex flex-col items-end">
                <span className="text-[8px] md:text-[10px] font-mono text-gray-600">VER 3.0_ORCHESTRATED</span>
                <span className="text-[8px] md:text-[10px] font-mono text-gray-800">COORDINATE_SET: {course.id.toUpperCase()}</span>
             </div>
          </div>

          <SyllabusTrajectory syllabus={course.syllabus} color={course.color} />
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-20 md:mt-32">
          <div className="bg-white/5 border border-white/10 p-6 sm:p-8 md:p-10 rounded-3xl backdrop-blur-xl">
            <div className="text-blue-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2 md:mb-4 font-bold">TARGET_SPEC</div>
            <div className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">{course.target}</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 sm:p-8 md:p-10 rounded-3xl backdrop-blur-xl">
            <div className="text-purple-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2 md:mb-4 font-bold">TIMELINE_EST</div>
            <div className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">{course.duration}</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 sm:p-8 md:p-10 rounded-3xl backdrop-blur-xl sm:col-span-2 lg:col-span-1">
            <div className="text-green-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2 md:mb-4 font-bold">CORE_GOAL</div>
            <div className="text-sm sm:text-base md:text-lg font-medium text-gray-300 leading-relaxed italic">"{course.outcome}"</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-planet {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        .animate-float-planet {
          animation: float-planet 10s ease-in-out infinite;
        }
        @media (max-width: 400px) {
          .xs\:hidden { display: none; }
          .xs\:block { display: block; }
        }
      `}</style>
    </div>
  );
};

export default PlanetLayout;
