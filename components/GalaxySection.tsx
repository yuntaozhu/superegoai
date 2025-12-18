import React from 'react';
import { Link } from '../context/LanguageContext';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const GalaxySection: React.FC = () => {
  const { language, t } = useLanguage();
  const content = getContent(language);
  const courses = content.courses;

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.5em] block mb-4">The Frontier</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            {t('galaxy.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            {t('galaxy.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <Link 
              key={course.id} 
              to={`/course/${course.id}`}
              className="group relative bg-white/5 border border-white/10 rounded-[40px] p-10 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-3 shadow-2xl backdrop-blur-xl flex flex-col h-full overflow-hidden"
            >
              {/* Internal Glow */}
              <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-700`} />
              
              <div className="flex items-center justify-between mb-8">
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${course.color} flex items-center justify-center text-5xl shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/20 group-hover:scale-110 transition-transform duration-500`}>
                   <span className="drop-shadow-lg">{course.icon}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  {course.id.toUpperCase()} // LVL 01
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all duration-300">
                {course.title}
              </h3>
              
              <div className="space-y-4 mb-8 flex-grow">
                 <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest opacity-60">Target</span>
                    <span className="text-sm text-gray-300 font-bold">{course.target}</span>
                 </div>
                 <p className="text-sm text-gray-400 leading-relaxed font-light">
                   {course.description}
                 </p>
              </div>
              
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center text-blue-400 text-xs font-black uppercase tracking-widest gap-2">
                  {t('galaxy.explore_planet')}
                  <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <div className="text-[10px] font-mono text-gray-600 group-hover:text-blue-500/50 transition-colors">
                  MISSION_0{content.courses.indexOf(course) + 1}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Core Node Representation */}
        <div className="mt-32 bg-white/5 rounded-[60px] p-12 md:p-20 border border-white/10 text-center max-w-5xl mx-auto backdrop-blur-xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-50" />
           <div className="relative z-10">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center mb-10 text-6xl shadow-[0_0_80px_rgba(245,158,11,0.2)] border border-white/20 animate-pulse">
                🧠
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
                {t('galaxy.core_title')}
              </h3>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed mb-10">
                {t('galaxy.core_desc')}
              </p>
              <div className="flex justify-center gap-4">
                 <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0s' }} />
                 <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                 <div className="w-3 h-3 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default GalaxySection;