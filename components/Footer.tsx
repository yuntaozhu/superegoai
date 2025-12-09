import React from 'react';
import { useLanguage, useLocation } from '../context/LanguageContext';
import { getContent } from '../constants';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const content = getContent(language);
  const courses = content.courses;

  const currentCourseId = location.pathname.startsWith('/course/') 
    ? location.pathname.split('/')[2] 
    : null;
  const currentCourse = courses.find(c => c.id === currentCourseId);

  return (
    <footer className="relative bg-brand-dark py-12 overflow-hidden">
       {/* Dynamic Top Border */}
       {currentCourse && (
         <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r ${currentCourse.color} opacity-80`} />
      )}
      {!currentCourse && (
         <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
      )}

      {/* Dynamic Background Glow */}
      {currentCourse && (
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-t ${currentCourse.color} opacity-5 pointer-events-none blur-3xl`} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">AI First Course</h3>
            <p className="text-gray-400 text-sm">
              {t('footer.tagline')}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.columns.planets')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {courses.map(c => (
                <li key={c.id}>{c.title}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.columns.philosophy')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {content.philosophyPillars.map((p, i) => (
                <li key={i}>{p.title}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;