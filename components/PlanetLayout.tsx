import React, { useEffect } from 'react';
import { Course } from '../types';
import { useLanguage, Link } from '../context/LanguageContext';

interface PlanetLayoutProps {
  course: Course;
  children?: React.ReactNode;
}

const PlanetLayout: React.FC<PlanetLayoutProps> = ({ course, children }) => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [course.id]);

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20 relative overflow-hidden">
      {/* Immersive Background Elements */}
      <div className={`fixed top-0 left-0 w-full h-full bg-gradient-to-b ${course.color} to-brand-dark/0 opacity-10 pointer-events-none -z-10`} />
      <div className={`fixed -top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br ${course.color} rounded-full blur-[120px] opacity-20 pointer-events-none -z-10`} />
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] -z-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Link */}
        <Link to="/planets" className="inline-flex items-center text-gray-400 hover:text-white mb-12 transition-all group font-mono text-sm tracking-widest">
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          {t('course.return_galaxy') || 'RETURN TO GALAXY MAP'}
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <div className={`inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-gray-300 uppercase tracking-widest mb-6`}>
              PLANET_ID: {course.id.toUpperCase()}
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tighter uppercase">
              {course.title}
            </h1>
            <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 font-light mb-8 italic">
              {course.tagline}
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl opacity-80">
              {course.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className={`px-10 py-5 rounded-xl bg-gradient-to-r ${course.color} text-white font-black shadow-2xl hover:brightness-110 transition-all hover:scale-[1.02] tracking-widest uppercase text-sm`}>
                {t('course.enroll') || 'START MISSION'}
              </button>
            </div>
          </div>

          <div className="flex justify-center animate-in fade-in zoom-in duration-1000">
            <div className={`relative w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br ${course.color} shadow-[0_0_100px_rgba(255,255,255,0.05)] flex items-center justify-center text-8xl md:text-9xl animate-float-planet border border-white/20`}>
              <div className="absolute inset-0 rounded-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-40 mix-blend-overlay"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/40 via-transparent to-white/30"></div>
              <span className="drop-shadow-2xl">{course.icon}</span>
            </div>
          </div>
        </div>

        {/* Unique Planet Content */}
        {children}

        {/* Detailed Syllabus */}
        <div id="syllabus" className="mt-32 mb-20">
          <div className="flex items-center justify-between mb-12">
             <div className="flex items-center gap-4">
                <div className={`w-12 h-1 bg-gradient-to-r ${course.color} rounded-full`}></div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                  {t('course.syllabus') || 'MISSION TRAJECTORY'}
                </h2>
             </div>
             <span className="text-xs font-mono text-gray-600 hidden md:block">VER 2.5_STABLE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {course.syllabus.map((module, idx) => (
              <div key={idx} className="group bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] transition-all">
                <span className="text-[10px] font-mono text-blue-500 uppercase mb-4 block">PHASE 0{idx + 1}</span>
                <h3 className="text-xl font-bold text-white mb-6 tracking-tight border-b border-white/5 pb-4">
                  {module.title}
                </h3>
                <ul className="space-y-6">
                  {module.content.map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      <div>
                        <h4 className="text-md font-bold text-gray-200 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32">
          <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl">
            <div className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">TARGET_SPEC</div>
            <div className="text-xl font-bold text-white leading-tight">{course.target}</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl">
            <div className="text-purple-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">TIMELINE_EST</div>
            <div className="text-xl font-bold text-white leading-tight">{course.duration}</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl">
            <div className="text-green-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">CORE_GOAL</div>
            <div className="text-lg font-medium text-gray-300 leading-relaxed">{course.outcome}</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-planet {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        .animate-float-planet {
          animation: float-planet 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PlanetLayout;