import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getContent } from '../constants';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const content = getContent(language);
  const courses = content.courses;

  return (
    <footer className="bg-brand-dark border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
