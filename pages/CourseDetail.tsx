
import React, { useEffect } from 'react';
import { getContent } from '../constants';
import { useLanguage, useParams, Navigate, Link } from '../context/LanguageContext';
import { useProgressStore } from '../lib/store/progressStore';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const content = getContent(language);
  const { completedItems, toggleItem, getCourseProgress } = useProgressStore();
  
  const course = content.courses.find(c => c.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, language]);

  if (!course) {
    return <Navigate to="/" replace />;
  }

  const progress = getCourseProgress(course);

  return (
    <div className="min-h-screen bg-brand-dark pt-16">
      {/* Course Header */}
      <div className={`relative bg-gradient-to-b ${course.color} to-brand-dark/0 pt-20 pb-32 px-4`}>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block p-4 rounded-2xl bg-white/10 backdrop-blur-md text-6xl mb-6 shadow-xl">
            {course.icon}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight uppercase">
            {course.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light mb-8 max-w-3xl mx-auto">
            {course.tagline}
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center gap-2 text-sm font-mono text-white/70 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
               <span>{t('galaxy.module')}: {course.id.toUpperCase()}</span>
               <span>|</span>
               <span>STATUS: ACTIVE</span>
            </div>

            {/* Progress Bar in Header */}
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between text-[10px] font-black text-white/60 uppercase tracking-widest">
                <span>Mission Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div 
                  className={`h-full bg-white transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.5)]`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
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
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                {progress === 100 ? <Trophy className="w-5 h-5" /> : null}
                {progress === 100 ? 'Mission Complete' : t('course.enroll')}
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
              {course.syllabus.map((module, mIdx) => (
                <div key={mIdx} className="bg-brand-surface border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
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
                      {module.content.map((item, iIdx) => {
                        const isCompleted = completedItems[`${course.id}:${mIdx}:${iIdx}`];
                        return (
                          <li 
                            key={iIdx} 
                            onClick={() => toggleItem(course.id, mIdx, iIdx)}
                            className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
                          >
                            <div className="mt-1 transition-transform group-hover:scale-110">
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className={`text-base font-semibold transition-colors ${isCompleted ? 'text-emerald-400/80 line-through' : 'text-gray-200'}`}>
                                {item.title}
                              </h4>
                              <p className={`text-sm mt-1 transition-colors ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                                {item.description}
                              </p>
                            </div>
                          </li>
                        );
                      })}
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
