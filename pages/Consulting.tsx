import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ConsultingHeroBackground from '../components/ConsultingHeroBackground';
import { translations } from '../translations';

const Consulting: React.FC = () => {
  const { t, language } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const agents = [
      {
          id: 'marketing',
          icon: "📢",
          color: "text-pink-400",
          bg: "bg-pink-500/10",
          border: "border-pink-500/20",
          hoverBorder: "hover:border-pink-500/80",
          titleKey: 'consulting.agents.marketing_title',
          descKey: 'consulting.agents.marketing_desc',
      },
      {
          id: 'sales',
          icon: "💰",
          color: "text-yellow-400",
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/20",
          hoverBorder: "hover:border-yellow-500/80",
          titleKey: 'consulting.agents.sales_title',
          descKey: 'consulting.agents.sales_desc',
      },
      {
          id: 'hr',
          icon: "🤝",
          color: "text-green-400",
          bg: "bg-green-500/10",
          border: "border-green-500/20",
          hoverBorder: "hover:border-green-500/80",
          titleKey: 'consulting.agents.hr_title',
          descKey: 'consulting.agents.hr_desc',
      },
      {
          id: 'ops',
          icon: "⚙️",
          color: "text-blue-400",
          bg: "bg-blue-500/10",
          border: "border-blue-500/20",
          hoverBorder: "hover:border-blue-500/80",
          titleKey: 'consulting.agents.ops_title',
          descKey: 'consulting.agents.ops_desc',
      }
  ];

  const getAgentFeatures = (id: string) => {
    return (translations[language] as any).consulting?.agents?.[`${id}_features`] || [];
  };

  const getAgentStack = (id: string) => {
    return (translations[language] as any).consulting?.agents?.[`${id}_stack`] || [];
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[600px] flex items-center justify-center">
        <ConsultingHeroBackground />
        
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
            <div className="relative group">
              <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-indigo-500/25">
                {t('consulting.hero.cta_diagnose')}
              </button>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-64 p-3 bg-gray-900/90 backdrop-blur-md border border-white/10 text-white text-xs leading-relaxed rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none text-center z-50 translate-y-2 group-hover:translate-y-0">
                {t('consulting.hero.cta_diagnose_tooltip')}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900/90"></div>
              </div>
            </div>
            
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
            <div className="p-8 rounded-2xl bg-brand-dark border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
               <div className="text-4xl mb-6">🧠</div>
               <h3 className="text-xl font-bold text-white mb-3">{t('consulting.philosophy.id_title')}</h3>
               <p className="text-gray-400 leading-relaxed text-sm">{t('consulting.philosophy.id_desc')}</p>
            </div>
            <div className="p-8 rounded-2xl bg-brand-dark border border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all"></div>
               <div className="text-4xl mb-6">⚖️</div>
               <h3 className="text-xl font-bold text-white mb-3">{t('consulting.philosophy.ego_title')}</h3>
               <p className="text-gray-400 leading-relaxed text-sm">{t('consulting.philosophy.ego_desc')}</p>
            </div>
            <div className="p-8 rounded-2xl bg-brand-dark border border-indigo-500/30 relative overflow-hidden group shadow-lg shadow-indigo-500/10">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
               <div className="text-4xl mb-6">✨</div>
               <h3 className="text-xl font-bold text-white mb-3">{t('consulting.philosophy.superego_title')}</h3>
               <p className="text-gray-300 leading-relaxed text-sm">{t('consulting.philosophy.superego_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">{t('consulting.agents.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {agents.map((agent) => (
                    <div 
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent)}
                        className={`p-6 rounded-xl ${agent.bg} ${agent.border} border hover:-translate-y-2 cursor-pointer transition-all duration-300 hover:shadow-2xl ${agent.hoverBorder} group relative overflow-hidden`}
                    >
                        <div className="relative z-10">
                            <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300 origin-left">{agent.icon}</div>
                            <h4 className={`text-lg font-bold ${agent.color} mb-3 min-h-[56px] flex items-center`}>{t(agent.titleKey)}</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">{t(agent.descKey)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Agent Modal */}
      {selectedAgent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedAgent(null)}></div>
              <div className="relative bg-brand-surface border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                  <div className={`h-2 w-full bg-gradient-to-r ${selectedAgent.color.replace('text', 'from').replace('400', '500')} to-transparent`}></div>
                  <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-4">
                              <div className="text-5xl bg-white/5 p-4 rounded-2xl">{selectedAgent.icon}</div>
                              <div>
                                  <h3 className={`text-2xl font-bold ${selectedAgent.color}`}>{t(selectedAgent.titleKey)}</h3>
                                  <p className="text-gray-400 text-sm mt-1 uppercase tracking-wider font-mono">AI Agent Profile</p>
                              </div>
                          </div>
                          <button onClick={() => setSelectedAgent(null)} className="text-gray-400 hover:text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                      </div>
                      <div className="mb-8"><p className="text-gray-300 text-lg leading-relaxed">{t(selectedAgent.descKey)}</p></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Capabilities</h4>
                              <ul className="space-y-3">
                                  {getAgentFeatures(selectedAgent.id).map((feature: string, idx: number) => (
                                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                                          <span className={`mt-1 w-1.5 h-1.5 rounded-full ${selectedAgent.color.replace('text', 'bg')}`}></span>
                                          {feature}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          <div>
                              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Tech Stack</h4>
                              <div className="flex flex-wrap gap-2">
                                  {getAgentStack(selectedAgent.id).map((stack: string, idx: number) => (
                                      <span key={idx} className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-gray-400 font-mono">{stack}</span>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Footer Promise */}
      <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
              <blockquote className="text-2xl md:text-3xl font-serif text-gray-400 italic mb-8">"{t('consulting.footer.quote')}"</blockquote>
              <p className="text-indigo-400 font-medium">{t('consulting.footer.promise')}</p>
          </div>
      </section>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-indigo-600 text-white shadow-2xl transition-all duration-500 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
      </button>
    </div>
  );
};

export default Consulting;
