import React from 'react';
import { getContent } from '../constants';
import GalaxySection from '../components/GalaxySection';
import { Link } from '../context/LanguageContext';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const content = getContent(language);

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-blue-300 text-sm font-semibold mb-6 border border-white/10">
            {t('hero.badge')}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
            {t('hero.title_prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{t('hero.title_highlight')}</span> <br/>
            {t('hero.title_suffix')}
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/course/art" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
              {t('hero.cta_primary')}
            </Link>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-semibold transition-all">
              {t('hero.cta_secondary')}
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-brand-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">{t('philosophy.title')}</h2>
            <p className="text-gray-300 max-w-4xl mx-auto text-lg leading-relaxed font-light">
              {t('philosophy.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.philosophyPillars.map((pillar, index) => (
              <div key={index} className="p-8 rounded-2xl bg-brand-dark border border-white/5 hover:border-blue-500/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400 font-bold text-xl">
                  0{index + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-gray-300 mb-4">{pillar.concept}</p>
                <div className="text-sm text-gray-500 pt-4 border-t border-white/5">
                  <strong className="text-gray-400">{t('philosophy.practice_label')}</strong> {pillar.practice}
                </div>
              </div>
            ))}
          </div>

           {/* Summary Section */}
           <div className="mt-12 text-center max-w-4xl mx-auto bg-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
             <p className="text-lg text-blue-200 font-medium">
                {t('philosophy.summary')}
             </p>
          </div>
        </div>
      </section>

      {/* Galaxy Section */}
      <GalaxySection />
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-12 text-center backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-6">{t('cta.title')}</h2>
          <p className="text-gray-300 mb-8 text-lg">
            {t('cta.description')}
          </p>
          <button className="px-8 py-4 bg-white text-brand-dark rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-xl">
            {t('cta.button')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;