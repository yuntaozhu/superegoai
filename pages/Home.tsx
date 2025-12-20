
import React, { useState } from 'react';
import { getContent } from '../constants';
import GalaxySection from '../components/GalaxySection';
import { Link } from '../context/LanguageContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import WaitlistModal from '../components/WaitlistModal';
import { motion } from 'framer-motion';

// Using any to bypass framer-motion type mismatch in the current environment
const m = motion as any;

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const content = getContent(language);

  const scrollToCourses = () => {
    const element = document.getElementById('galaxy-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const philosophyPillars = (translations[language] as any).philosophy.pillars;

  return (
    <div className="min-h-screen bg-brand-dark">
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] right-0 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-purple-600/10 rounded-full blur-[80px] sm:blur-[120px]" />
          <div className="absolute -bottom-[20%] left-0 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-blue-600/10 rounded-full blur-[80px] sm:blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <m.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-1.5 md:py-2 px-3 md:px-4 rounded-full bg-white/5 text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 md:mb-10 border border-white/10 backdrop-blur-md"
          >
            {t('hero.badge')}
          </m.span>
          <m.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight mb-6 leading-[1.1] uppercase"
          >
            {t('hero.title_prefix')} <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              {t('hero.title_highlight')}
            </span> <br className="hidden sm:block"/>
            {t('hero.title_suffix')}
          </m.h1>
          <m.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-2xl text-blue-200/80 mb-8 md:mb-10 max-w-3xl mx-auto font-medium tracking-wide"
          >
            {t('hero.sub_headline')}
          </m.p>
          <m.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm md:text-lg text-gray-400 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2" 
            dangerouslySetInnerHTML={{ __html: t('hero.description').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }}
          >
          </m.p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <button 
              onClick={scrollToCourses} 
              className="px-8 md:px-10 py-4 md:py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest transition-all hover:scale-105 shadow-2xl shadow-blue-500/25 border border-blue-400/50 text-xs md:text-base"
            >
              {t('hero.cta_primary')}
            </button>
            <Link 
              to="/consulting" 
              className="px-8 md:px-10 py-4 md:py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-black uppercase tracking-widest transition-all backdrop-blur-md text-xs md:text-base"
            >
              {t('hero.cta_secondary')}
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
              {t('philosophy.title')}
            </h2>
            <p className="text-gray-400 max-w-4xl mx-auto text-base md:text-xl leading-relaxed font-light px-2">
              {t('philosophy.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {philosophyPillars.map((pillar: any, index: number) => (
              <m.div 
                key={index} 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                className="group p-6 md:p-10 rounded-3xl md:rounded-[40px] bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-500 backdrop-blur-xl relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-24 md:w-40 h-24 md:h-40 bg-blue-500/5 rounded-full blur-2xl md:blur-3xl group-hover:bg-blue-500/10 transition-all" />
                
                <h3 className="text-lg md:text-2xl font-black text-white mb-4 md:mb-6 tracking-tight flex items-start gap-3 md:gap-4">
                  <span className="text-blue-500 font-mono text-xs md:text-sm mt-1">{index + 1}</span>
                  {pillar.title}
                </h3>
                <p className="text-gray-300 mb-6 md:mb-8 leading-relaxed text-sm md:text-lg">
                  {pillar.content}
                </p>
                <div className="text-xs md:text-sm text-blue-400/80 italic font-medium pt-4 md:pt-6 border-t border-white/5 flex items-center gap-3">
                  <span className="w-6 md:w-8 h-[1px] bg-blue-500/30" />
                  {pillar.quote}
                </div>
              </m.div>
            ))}
          </div>

           {/* Summary Section */}
           <div className="mt-12 md:mt-16 text-center max-w-4xl mx-auto bg-white/5 rounded-2xl md:rounded-3xl p-6 md:p-10 border border-white/10 backdrop-blur-md shadow-inner mx-4 sm:mx-auto">
             <p className="text-base md:text-xl text-blue-100 font-medium tracking-wide">
                {t('philosophy.summary')}
             </p>
          </div>
        </div>
      </section>

      {/* Galaxy Section (Courses) */}
      <div id="galaxy-section">
        <GalaxySection />
      </div>

      {/* Consulting Preview Section */}
      <section className="py-16 md:py-24 relative overflow-hidden px-4">
        <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-900/40 via-brand-dark to-brand-dark border border-indigo-500/30 rounded-3xl md:rounded-[48px] p-8 md:p-20 relative overflow-hidden backdrop-blur-xl shadow-2xl">
                <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-500/10 rounded-full blur-[80px] md:blur-[100px] -translate-y-1/2 translate-x-1/4" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 md:gap-16">
                    <div className="flex-1 text-center lg:text-left">
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-500/30">
                        {t('home.consulting_preview.badge')}
                        </span>
                        <h2 className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-8 leading-tight uppercase tracking-tighter">
                        {t('home.consulting_preview.title')}
                        </h2>
                        <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                        {t('home.consulting_preview.description')}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-12 text-left">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-3 md:gap-4 text-gray-200 font-bold text-sm md:text-base">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0 border border-indigo-500/20">
                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    {t(`home.consulting_preview.feature_${i}`)}
                                </div>
                            ))}
                        </div>

                        <Link to="/consulting" className="inline-flex items-center gap-3 md:gap-4 px-8 md:px-10 py-4 md:py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-2xl shadow-indigo-500/25 group border border-indigo-400/50 text-xs md:text-base">
                            {t('home.consulting_preview.cta')}
                            <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </Link>
                    </div>
                    
                    <div className="flex-1 w-full max-w-sm md:max-w-md lg:max-w-xl">
                        <div className="aspect-square rounded-3xl md:rounded-[40px] bg-black/40 border border-white/5 relative overflow-hidden backdrop-blur-xl flex items-center justify-center shadow-inner">
                             <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-indigo-600/10 border border-indigo-400/30 flex items-center justify-center relative z-20 shadow-[0_0_80px_rgba(99,102,241,0.2)]">
                                 <span className="text-6xl md:text-8xl animate-pulse">🏢</span>
                             </div>

                             <div className="absolute w-[140%] h-[140%] border border-indigo-500/10 rounded-full animate-spin-slow" />
                             <div className="absolute w-[180%] h-[180%] border border-dashed border-indigo-500/10 rounded-full animate-spin-reverse-slow" />
                             
                             <div className="absolute top-[15%] right-[10%] bg-brand-surface/80 border border-white/10 px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl text-[8px] md:text-xs font-mono font-bold text-indigo-300 shadow-2xl z-20 animate-bounce delay-100 backdrop-blur-md">
                                Marketing Agent
                             </div>
                             <div className="absolute bottom-[20%] left-[5%] bg-brand-surface/80 border border-white/10 px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl text-[8px] md:text-xs font-mono font-bold text-purple-300 shadow-2xl z-20 animate-bounce delay-300 backdrop-blur-md">
                                Sales Agent
                             </div>
                             <div className="absolute top-[65%] right-[2%] bg-brand-surface/80 border border-white/10 px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl text-[8px] md:text-xs font-mono font-bold text-blue-300 shadow-2xl z-20 animate-bounce delay-500 backdrop-blur-md">
                                HR Agent
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-cyan-900/40 border border-white/10 rounded-[32px] md:rounded-[64px] p-8 md:p-20 text-center backdrop-blur-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
          <h2 className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-8 uppercase tracking-tighter relative z-10">{t('cta.title')}</h2>
          <p className="text-gray-300 mb-10 md:mb-12 text-base md:text-xl font-light relative z-10 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <button 
            onClick={() => setIsWaitlistOpen(true)}
            className="px-10 md:px-12 py-5 md:py-6 bg-white text-brand-dark rounded-xl font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] relative z-10 text-xs md:text-base"
          >
            {t('cta.button')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
