import React from 'react';
import { getContent } from '../constants';
import GalaxySection from '../components/GalaxySection';
import { Link } from '../context/LanguageContext';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const content = getContent(language);

  const scrollToCourses = () => {
    const element = document.getElementById('galaxy-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] right-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[20%] left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 text-blue-300 text-sm font-semibold mb-8 border border-white/10 backdrop-blur-sm">
            {t('hero.badge')}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
            {t('hero.title_prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{t('hero.title_highlight')}</span> <br/>
            {t('hero.title_suffix')}
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: t('hero.description').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }}>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={scrollToCourses} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
              {t('hero.cta_primary')}
            </button>
            <Link to="/consulting" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-semibold transition-all">
              {t('hero.cta_secondary')}
            </Link>
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

      {/* Galaxy Section (Courses) */}
      <div id="galaxy-section">
        <GalaxySection />
      </div>

      {/* NEW: Consulting / Enterprise Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/20 to-transparent -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-indigo-900/40 to-brand-dark border border-indigo-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-sm shadow-2xl">
                
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                    {/* Content */}
                    <div className="flex-1">
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-500/30">
                        {t('home.consulting_preview.badge')}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {t('home.consulting_preview.title')}
                        </h2>
                        <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-xl">
                        {t('home.consulting_preview.description')}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-3 text-gray-200 font-medium">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    {t(`home.consulting_preview.feature_${i}`)}
                                </div>
                            ))}
                        </div>

                        <Link to="/consulting" className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all shadow-lg shadow-indigo-500/25 hover:scale-[1.02] group">
                            {t('home.consulting_preview.cta')}
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </Link>
                    </div>
                    
                    {/* Abstract Visualization */}
                    <div className="flex-1 w-full max-w-md lg:max-w-lg">
                        <div className="aspect-square rounded-2xl bg-black/30 border border-white/5 relative overflow-hidden backdrop-blur-md flex items-center justify-center">
                             {/* Central Core */}
                             <div className="w-32 h-32 rounded-full bg-indigo-600/20 border border-indigo-400/50 flex items-center justify-center relative z-20 shadow-[0_0_50px_rgba(99,102,241,0.3)]">
                                 <span className="text-6xl animate-pulse">🏢</span>
                             </div>

                             {/* Orbiting Elements */}
                             <div className="absolute w-[140%] h-[140%] border border-indigo-500/10 rounded-full animate-spin-slow" />
                             <div className="absolute w-[180%] h-[180%] border border-dashed border-indigo-500/10 rounded-full animate-spin-reverse-slow" />
                             
                             {/* Connecting Nodes (Badges) */}
                             <div className="absolute top-[20%] right-[15%] bg-brand-surface border border-white/10 px-4 py-2 rounded-lg text-xs font-mono text-indigo-300 shadow-xl z-20 animate-bounce delay-100">
                                Marketing Agent
                             </div>
                             <div className="absolute bottom-[25%] left-[10%] bg-brand-surface border border-white/10 px-4 py-2 rounded-lg text-xs font-mono text-purple-300 shadow-xl z-20 animate-bounce delay-300">
                                Sales Agent
                             </div>
                             <div className="absolute top-[60%] right-[5%] bg-brand-surface border border-white/10 px-4 py-2 rounded-lg text-xs font-mono text-blue-300 shadow-xl z-20 animate-bounce delay-500">
                                HR Agent
                             </div>

                             {/* Connecting Lines (Simulated) */}
                             <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                                <line x1="50%" y1="50%" x2="80%" y2="25%" stroke="#6366f1" strokeWidth="1" />
                                <line x1="50%" y1="50%" x2="20%" y2="75%" stroke="#6366f1" strokeWidth="1" />
                                <line x1="50%" y1="50%" x2="85%" y2="65%" stroke="#6366f1" strokeWidth="1" />
                             </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
      
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