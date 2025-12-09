import React, { useEffect } from 'react';
import { getContent } from '../constants';
import { useLanguage, useParams, Navigate, Link } from '../context/LanguageContext';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const content = getContent(language);
  
  const course = content.courses.find(c => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, language]);

  if (!course) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-brand-dark pt-16">
      {/* Course Header */}
      <div className={`relative bg-gradient-to-b ${course.color} to-brand-dark/0 pt-20 pb-32 px-4`}>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block p-4 rounded-2xl bg-white/10 backdrop-blur-md text-6xl mb-6 shadow-xl">
            {course.icon}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            {course.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light mb-8 max-w-3xl mx-auto">
            {course.tagline}
          </p>
          <div className="flex justify-center gap-2 text-sm font-mono text-white/70 bg-black/20 inline-block px-4 py-2 rounded-full mx-auto backdrop-blur-sm">
             <span>{t('galaxy.module')}: {course.id.toUpperCase()}</span>
             <span>|</span>
             <span>STATUS: ACTIVE</span>
          </div>
        </div>
        
        {/* Background Particles/Noise simulation */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,...")' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Overview & Philosophy */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Description</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {course.description}
              </p>
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                {t('course.enroll')}
              </button>
            </div>

            <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                <span>🧠</span> {course.philosophyMap.title}
              </h3>
              <ul className="space-y-4">
                {course.philosophyMap.points.map((point, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex items-start gap-3">
                    <span className="text-blue-500 font-bold mt-0.5">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Syllabus */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
              {t('course.syllabus')}
            </h2>
            
            <div className="space-y-6">
              {course.syllabus.map((module, idx) => (
                <div key={idx} className="bg-brand-surface border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
                  <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-white">
                      {module.title}
                    </h3>
                    {module.goal && (
                      <span className="text-xs font-mono text-blue-300 bg-blue-500/10 px-2 py-1 rounded">
                        {t('course.goal')}: {module.goal}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <ul className="space-y-6">
                      {module.content.map((item, i) => (
                        <li key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                          <div className="min-w-[4px] min-h-[4px] w-1.5 h-1.5 rounded-full bg-gray-500 mt-2.5"></div>
                          <div>
                            <h4 className="text-base font-semibold text-gray-200">{item.title}</h4>
                            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/" className="text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                {t('course.return_galaxy')}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;