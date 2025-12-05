import React from 'react';
import { Link } from 'react-router-dom';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const GalaxySection: React.FC = () => {
  const { language, t } = useLanguage();
  const content = getContent(language);
  const courses = content.courses;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('galaxy.title')}</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t('galaxy.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Link 
              key={course.id} 
              to={`/course/${course.id}`}
              className="group relative bg-brand-surface border border-white/10 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/10"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${course.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{course.icon}</span>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">{t('galaxy.module')} {course.id.toUpperCase()}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {course.shortTitle}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-3">
                {course.description}
              </p>
              
              <div className="mt-4 flex items-center text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {t('galaxy.explore_planet')}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Core Node Representation */}
        <div className="mt-16 bg-white/5 rounded-2xl p-8 border border-white/10 text-center max-w-3xl mx-auto backdrop-blur-sm">
           <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4 text-3xl">
             🧠
           </div>
           <h3 className="text-2xl font-bold text-white mb-2">{t('galaxy.core_title')}</h3>
           <p className="text-gray-300">
             {t('galaxy.core_desc')}
           </p>
        </div>
      </div>
    </section>
  );
};

export default GalaxySection;
