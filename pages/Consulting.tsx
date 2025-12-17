import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Consulting: React.FC = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
             <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4">
             <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
             Super Ego Agent
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
            {t('consulting.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-medium mb-8">
            {t('consulting.hero.subtitle')}
          </p>
          <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t('consulting.hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-indigo-500/25">
              {t('consulting.hero.cta_diagnose')}
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-semibold transition-all">
              {t('consulting.hero.cta_army')}
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-brand-surface/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">{t('consulting.philosophy.title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* The Id */}
            <div className="p-8 rounded-2xl bg-brand-dark border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
               <div className="text-4xl mb-6">🧠</div>
               <h3 className="text-xl font-bold text-white mb-3">{t('consulting.philosophy.id_title')}</h3>
               <p className="text-gray-400 leading-relaxed text-sm">
                 {t('consulting.philosophy.id_desc')}
               </p>
            </div>

            {/* The Ego */}
            <div className="p-8 rounded-2xl bg-brand-dark border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all"></div>
               <div className="text-4xl mb-6">⚖️</div>
               <h3 className="text-xl font-bold text-white mb-3">{t('consulting.philosophy.ego_title')}</h3>
               <p className="text-gray-400 leading-relaxed text-sm">
                 {t('consulting.philosophy.ego_desc')}
               </p>
            </div>

            {/* The Super Ego */}
            <div className="p-8 rounded-2xl bg-brand-dark border border-indigo-500/30 relative overflow-hidden group shadow-lg shadow-indigo-500/10">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
               <div className="text-4xl mb-6">✨</div>
               <h3 className="text-xl font-bold text-white mb-3">{t('consulting.philosophy.superego_title')}</h3>
               <p className="text-gray-300 leading-relaxed text-sm">
                 {t('consulting.philosophy.superego_desc')}
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">{t('consulting.methodology.title')}</h2>
            </div>
            
            <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 hidden md:block -z-10 transform -translate-y-1/2"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="bg-brand-surface border border-white/10 rounded-xl p-6 relative">
                            <div className="w-10 h-10 bg-brand-dark border border-indigo-500 text-indigo-400 rounded-full flex items-center justify-center font-bold mb-4 mx-auto md:mx-0 z-10 relative">
                                {step}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 text-center md:text-left">
                                {t(`consulting.methodology.stage${step}_title`)}
                            </h3>
                            <p className="text-sm text-gray-400 text-center md:text-left">
                                {t(`consulting.methodology.stage${step}_desc`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Agent Army Section */}
      <section className="py-20 bg-brand-surface/30">
        <div className="max-w-7xl mx-auto px-4">
             <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">{t('consulting.agents.title')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AgentCard 
                    icon="📢" 
                    title={t('consulting.agents.marketing_title')} 
                    desc={t('consulting.agents.marketing_desc')} 
                    color="text-pink-400"
                    bg="bg-pink-500/10"
                    border="border-pink-500/20"
                />
                <AgentCard 
                    icon="💰" 
                    title={t('consulting.agents.sales_title')} 
                    desc={t('consulting.agents.sales_desc')} 
                    color="text-yellow-400"
                    bg="bg-yellow-500/10"
                    border="border-yellow-500/20"
                />
                <AgentCard 
                    icon="🤝" 
                    title={t('consulting.agents.hr_title')} 
                    desc={t('consulting.agents.hr_desc')} 
                    color="text-green-400"
                    bg="bg-green-500/10"
                    border="border-green-500/20"
                />
                <AgentCard 
                    icon="⚙️" 
                    title={t('consulting.agents.ops_title')} 
                    desc={t('consulting.agents.ops_desc')} 
                    color="text-blue-400"
                    bg="bg-blue-500/10"
                    border="border-blue-500/20"
                />
            </div>
        </div>
      </section>

      {/* Special Service & Case Study Grid */}
      <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Special Service */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <span className="text-3xl">🏗️</span>
                      {t('consulting.special.title')}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                      {t('consulting.special.desc')}
                  </p>
                  <div className="h-1 w-20 bg-indigo-500 rounded"></div>
              </div>

               {/* Case Study */}
               <div className="bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/30 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <span className="text-3xl">🚀</span>
                      {t('consulting.case.title')}
                  </h3>
                  <p className="text-gray-300 mb-8 text-sm">
                      {t('consulting.case.desc')}
                  </p>
                  <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                      <div className="text-center">
                          <div className="text-indigo-400 font-bold text-xl mb-1">5X</div>
                          <div className="text-[10px] text-gray-500 uppercase">Efficiency</div>
                      </div>
                      <div className="text-center border-l border-white/10">
                          <div className="text-indigo-400 font-bold text-xl mb-1">-60%</div>
                          <div className="text-[10px] text-gray-500 uppercase">Turnover Days</div>
                      </div>
                      <div className="text-center border-l border-white/10">
                          <div className="text-indigo-400 font-bold text-xl mb-1">82%</div>
                          <div className="text-[10px] text-gray-500 uppercase">Conversion</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-brand-surface/30 border-t border-white/5">
         <div className="max-w-5xl mx-auto px-4">
             <h2 className="text-3xl font-bold text-white mb-12 text-center">{t('consulting.team.title')}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                     <div className="w-16 h-16 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-2xl">👨‍💻</div>
                     <div>
                         <h4 className="text-lg font-bold text-white mb-2">{t('consulting.team.zhu_title')}</h4>
                         <p className="text-sm text-gray-400">{t('consulting.team.zhu_desc')}</p>
                     </div>
                 </div>
                 <div className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                     <div className="w-16 h-16 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-2xl">🛡️</div>
                     <div>
                         <h4 className="text-lg font-bold text-white mb-2">{t('consulting.team.du_title')}</h4>
                         <p className="text-sm text-gray-400">{t('consulting.team.du_desc')}</p>
                     </div>
                 </div>
             </div>
         </div>
      </section>

      {/* Footer Promise */}
      <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
              <blockquote className="text-2xl md:text-3xl font-serif text-gray-400 italic mb-8">
                  "{t('consulting.footer.quote')}"
              </blockquote>
              <p className="text-indigo-400 font-medium">
                  {t('consulting.footer.promise')}
              </p>
          </div>
      </section>
    </div>
  );
};

// Helper Component for Agents
const AgentCard = ({ icon, title, desc, color, bg, border }: any) => (
    <div className={`p-6 rounded-xl ${bg} ${border} border hover:-translate-y-1 transition-transform duration-300`}>
        <div className="text-3xl mb-4">{icon}</div>
        <h4 className={`text-lg font-bold ${color} mb-3 min-h-[56px] flex items-center`}>{title}</h4>
        <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default Consulting;