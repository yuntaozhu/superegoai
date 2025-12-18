
import React from 'react';
import { getContent } from '../constants';
import GalaxySection from '../components/GalaxySection';
import { Link } from '../context/LanguageContext';
import { useLanguage } from '../context/LanguageContext';
// Added missing import for translations
import { translations } from '../translations';

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const content = getContent(language);

  const scrollToCourses = () => {
    const element = document.getElementById('galaxy-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fixed error by accessing the imported translations object
  const philosophyPillars = (translations[language] as any).philosophy.pillars;

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] right-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[20%] left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="inline-block py-2 px-4 rounded-full bg-white/5 text-blue-300 text-xs font-bold uppercase tracking-widest mb-10 border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-top-4">
            {t('hero.badge')}
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight mb-6 leading-[1.1]">
            {t('hero.title_prefix')} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              {t('hero.title_highlight')}
            </span> <br/>
            {t('hero.title_suffix')}
          </h1>
          <p className="text-xl md:text-2xl text-blue-200/80 mb-10 max-w-3xl mx-auto font-medium tracking-wide">
            {t('hero.sub_headline')}
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: t('hero.description').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }}>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={scrollToCourses} 
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest transition-all hover:scale-105 shadow-2xl shadow-blue-500/25 border border-blue-400/50"
            >
              {t('hero.cta_primary')}
            </button>
            <Link 
              to="/consulting" 
              className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-black uppercase tracking-widest transition-all backdrop-blur-md"
            >
              {t('hero.cta_secondary')}
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
              {t('philosophy.title')}
            </h2>
            <p className="text-gray-400 max-w-4xl mx-auto text-xl leading-relaxed font-light">
              {t('philosophy.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {philosophyPillars.map((pillar: any, index: number) => (
              <div key={index} className="group p-10 rounded-[40px] bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-500 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all" />
                
                <h3 className="text-2xl font-black text-white mb-6 tracking-tight flex items-start gap-4">
                  <span className="text-blue-500 font-mono text-sm mt-1">{index + 1}</span>
                  {pillar.title}
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                  {pillar.content}
                </p>
                <div className="text-sm text-blue-400/80 italic font-medium pt-6 border-t border-white/5 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-blue-500/30" />
                  {pillar.quote}
                </div>
              </div>
            ))}
          </div>

           {/* Summary Section */}
           <div className="mt-16 text-center max-w-4xl mx-auto bg-white/5 rounded-3xl p-10 border border-white/10 backdrop-blur-md shadow-inner">
             <p className="text-xl text-blue-100 font-medium tracking-wide">
                {t('philosophy.summary')}
             </p>
          </div>
        </div>
      </section>

      {/* Galaxy Section (Courses) */}
      <div id="galaxy-section">
        <GalaxySection />
      </div>

      {/* Consulting / Enterprise Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-indigo-900/40 via-brand-dark to-brand-dark border border-indigo-500/30 rounded-[48px] p-8 md:p-20 relative overflow-hidden backdrop-blur-xl shadow-2xl">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1">
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-500/30">
                        {t('home.consulting_preview.badge')}
                        </span>
                        <h2 className="text-3xl md:text-6xl font-black text-white mb-8 leading-tight uppercase tracking-tighter">
                        {t('home.consulting_preview.title')}
                        </h2>
                        <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-xl font-light">
                        {t('home.consulting_preview.description')}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-4 text-gray-200 font-bold">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0 border border-indigo-500/20">
                                        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    {t(`home.consulting_preview.feature_${i}`)}
                                </div>
                            ))}
                        </div>

                        <Link to="/consulting" className="inline-flex items-center gap-4 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-2xl shadow-indigo-500/25 group border border-indigo-400/50">
                            {t('home.consulting_preview.cta')}
                            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </Link>
                    </div>
                    
                    <div className="flex-1 w-full max-w-md lg:max-w-xl">
                        <div className="aspect-square rounded-[40px] bg-black/40 border border-white/5 relative overflow-hidden backdrop-blur-xl flex items-center justify-center shadow-inner">
                             <div className="w-48 h-48 rounded-full bg-indigo-600/10 border border-indigo-400/30 flex items-center justify-center relative z-20 shadow-[0_0_100px_rgba(99,102,241,0.2)]">
                                 <span className="text-8xl animate-pulse">🏢</span>
                             </div>

                             <div className="absolute w-[140%] h-[140%] border border-indigo-500/10 rounded-full animate-spin-slow" />
                             <div className="absolute w-[180%] h-[180%] border border-dashed border-indigo-500/10 rounded-full animate-spin-reverse-slow" />
                             
                             <div className="absolute top-[20%] right-[15%] bg-brand-surface/80 border border-white/10 px-5 py-3 rounded-2xl text-xs font-mono font-bold text-indigo-300 shadow-2xl z-20 animate-bounce delay-100 backdrop-blur-md">
                                Marketing Agent
                             </div>
                             <div className="absolute bottom-[25%] left-[10%] bg-brand-surface/80 border border-white/10 px-5 py-3 rounded-2xl text-xs font-mono font-bold text-purple-300 shadow-2xl z-20 animate-bounce delay-300 backdrop-blur-md">
                                Sales Agent
                             </div>
                             <div className="absolute top-[60%] right-[5%] bg-brand-surface/80 border border-white/10 px-5 py-3 rounded-2xl text-xs font-mono font-bold text-blue-300 shadow-2xl z-20 animate-bounce delay-500 backdrop-blur-md">
                                HR Agent
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-cyan-900/40 border border-white/10 rounded-[64px] p-12 md:p-20 text-center backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter relative z-10">{t('cta.title')}</h2>
          <p className="text-gray-300 mb-12 text-xl font-light relative z-10 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <button className="px-12 py-6 bg-white text-brand-dark rounded-xl font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] relative z-10">
            {t('cta.button')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
