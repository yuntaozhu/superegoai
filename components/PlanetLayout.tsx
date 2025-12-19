
import React, { useEffect } from 'react';
import { Course } from '../types';
import { useLanguage, Link } from '../context/LanguageContext';
import { ArrowLeft, Home } from 'lucide-react';

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
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 md:mb-6 leading-tight tracking-tighter uppercase break-words">
              {course.title}
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 font-bold mb-6 md:mb-8 italic">
              {course.tagline}
            </p>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 font-light">
              {course.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className={`px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-gradient-to-r ${course.color} text-white font-black shadow-2xl hover:brightness-110 active:scale-95 transition-all tracking-widest uppercase text-xs md:text-sm`}>
                {t('course.enroll') || 'START MISSION'}
              </button>
            </div>
          </div>

          <div className="flex justify-center animate-in fade-in zoom-in duration-1000">
            <div className={`relative w-40 h-40 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br ${course.color} shadow-[0_0_60px_rgba(255,255,255,0.05)] flex items-center justify-center text-6xl sm:text-7xl md:text-9xl animate-float-planet border border-white/10`}>
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

        {/* Detailed Syllabus */}
        <div id="syllabus" className="mt-20 md:mt-32 mb-16 md:mb-20">
          <div className="flex items-center justify-between mb-8 md:mb-12 px-1">
             <div className="flex items-center gap-3 md:gap-4">
                <div className={`w-6 sm:w-12 h-1 bg-gradient-to-r ${course.color} rounded-full`}></div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
                  {t('course.syllabus') || 'MISSION TRAJECTORY'}
                </h2>
             </div>
             <span className="text-[8px] md:text-[9px] font-mono text-gray-600 hidden xs:block">VER 2.5_STABLE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {course.syllabus.map((module, idx) => (
              <div key={idx} className="group bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/[0.07] transition-all">
                <span className="text-[9px] md:text-[10px] font-mono text-blue-500 uppercase mb-3 md:mb-4 block tracking-widest font-bold">PHASE 0{idx + 1}</span>
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 tracking-tight border-b border-white/5 pb-3 md:pb-4">
                  {module.title}
                </h3>
                <ul className="space-y-5 md:space-y-6">
                  {module.content.map((item, i) => (
                    <li key={i} className="flex gap-3 md:gap-4">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm md:text-md font-bold text-gray-200 mb-1">{item.title}</h4>
                        <p className="text-[11px] md:text-sm text-gray-500 leading-relaxed font-light">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
