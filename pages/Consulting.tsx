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
          featuresKey: 'consulting.agents.marketing_features',
          stackKey: 'consulting.agents.marketing_stack',
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
          featuresKey: 'consulting.agents.sales_features',
          stackKey: 'consulting.agents.sales_stack',
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
          featuresKey: 'consulting.agents.hr_features',
          stackKey: 'consulting.agents.hr_stack',
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
          featuresKey: 'consulting.agents.ops_features',
          stackKey: 'consulting.agents.ops_stack',
      }
  ];

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[600px] flex items-center justify-center">
        {/* Dynamic Background */}
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
              {/* Tooltip */}
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

      {/* Dual Value Dimensions Section */}
      <section className="py-24 px-4 bg-brand-dark relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
        
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">{t('consulting.value_dimensions.title')}</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
                {/* Left: Leadership / Control Tower */}
                <div className="space-y-8 text-right lg:pr-8">
                    <div className="flex flex-col items-end">
                        <div className="inline-block p-3 rounded-xl bg-blue-900/20 border border-blue-500/30 text-blue-400 text-3xl mb-4">
                           📡
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{t('consulting.value_dimensions.leadership.title')}</h3>
                        <p className="text-blue-400 text-sm font-mono uppercase tracking-wider mb-6">
                            {t('consulting.value_dimensions.leadership.metaphor')}
                        </p>
                    </div>

                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group hover:bg-white/5 p-6 rounded-2xl transition-colors border border-transparent hover:border-white/5">
                            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {t(`consulting.value_dimensions.leadership.point${i}_title`)}
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {t(`consulting.value_dimensions.leadership.point${i}_desc`)}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Right: Workforce / Iron Man Suit */}
                <div className="space-y-8 text-left lg:pl-8">
                    <div className="flex flex-col items-start">
                        <div className="inline-block p-3 rounded-xl bg-yellow-900/20 border border-yellow-500/30 text-yellow-400 text-3xl mb-4">
                           🦾
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{t('consulting.value_dimensions.workforce.title')}</h3>
                        <p className="text-yellow-400 text-sm font-mono uppercase tracking-wider mb-6">
                            {t('consulting.value_dimensions.workforce.metaphor')}
                        </p>
                    </div>

                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group hover:bg-white/5 p-6 rounded-2xl transition-colors border border-transparent hover:border-white/5">
                            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                                {t(`consulting.value_dimensions.workforce.point${i}_title`)}
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {t(`consulting.value_dimensions.workforce.point${i}_desc`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 px-4 bg-brand-surface/30">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">{t('consulting.methodology.title')}</h2>
            </div>
            
            <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 hidden md:block -z-10 transform -translate-y-1/2"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((step) => (
                        <MethodologyCard key={step} step={step} t={t} language={language} />
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
                <p className="text-gray-400 max-w-2xl mx-auto text-center mb-8">
                   Click on any agent to view detailed capabilities and tech stack.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {agents.map((agent) => (
                    <AgentCard 
                        key={agent.id}
                        {...agent}
                        title={t(agent.titleKey)}
                        desc={t(agent.descKey)}
                        onClick={() => setSelectedAgent(agent)}
                    />
                ))}
            </div>
        </div>
      </section>

      {/* Agent Modal */}
      {selectedAgent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div 
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                  onClick={() => setSelectedAgent(null)}
              ></div>
              <div className="relative bg-brand-surface border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                  <div className={`h-2 w-full bg-gradient-to-r ${selectedAgent.color.replace('text', 'from').replace('400', '500')} to-transparent`}></div>
                  
                  <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-4">
                              <div className="text-5xl bg-white/5 p-4 rounded-2xl">{selectedAgent.icon}</div>
                              <div>
                                  <h3 className={`text-2xl font-bold ${selectedAgent.color}`}>
                                      {t(selectedAgent.titleKey)}
                                  </h3>
                                  <p className="text-gray-400 text-sm mt-1 uppercase tracking-wider font-mono">
                                      AI Agent Profile
                                  </p>
                              </div>
                          </div>
                          <button 
                              onClick={() => setSelectedAgent(null)}
                              className="text-gray-400 hover:text-white transition-colors"
                          >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          </button>
                      </div>

                      <div className="mb-8">
                          <p className="text-gray-300 text-lg leading-relaxed">
                              {t(selectedAgent.descKey)}
                          </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                                  Capabilities
                              </h4>
                              <ul className="space-y-3">
                                  {(translations[language] as any).consulting.agents[`${selectedAgent.id}_features`]?.map((feature: string, idx: number) => (
                                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                                          <span className={`mt-1 w-1.5 h-1.5 rounded-full ${selectedAgent.color.replace('text', 'bg')}`}></span>
                                          {feature}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          <div>
                              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                                  Tech Stack
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                  {(translations[language] as any).consulting.agents[`${selectedAgent.id}_stack`]?.map((stack: string, idx: number) => (
                                      <span key={idx} className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs text-gray-400 font-mono">
                                          {stack}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="bg-black/20 p-4 text-center border-t border-white/5">
                      <button 
                          onClick={() => setSelectedAgent(null)}
                          className="text-sm text-gray-500 hover:text-white transition-colors"
                      >
                          Close Details
                      </button>
                  </div>
              </div>
          </div>
      )}

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

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500 transform ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
        aria-label="Back to Top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

// Helper Component for Methodology Stages
const MethodologyCard = ({ step, t, language }: { step: number, t: any, language: 'en' | 'zh' }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Access detailed steps from translations directly to handle arrays
    const methodData = (translations[language] as any).consulting.methodology;
    const details = methodData[`stage${step}_details`] as string[];

    return (
        <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
                relative cursor-pointer transition-all duration-300 rounded-xl p-6 border
                ${isExpanded 
                    ? 'bg-white/10 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.15)]' 
                    : 'bg-brand-surface border-white/10 hover:border-indigo-500/30 hover:bg-white/5'}
            `}
        >
            <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4 mx-auto md:mx-0 z-10 relative shadow-lg transition-colors duration-300
                ${isExpanded ? 'bg-indigo-600 text-white' : 'bg-brand-dark border border-indigo-500 text-indigo-400'}
            `}>
                {step}
            </div>
            
            <div className="flex justify-between items-start">
                <h3 className={`text-lg font-bold mb-2 text-center md:text-left transition-colors ${isExpanded ? 'text-indigo-300' : 'text-white'}`}>
                    {t(`consulting.methodology.stage${step}_title`)}
                </h3>
                {/* Chevron Icon */}
                <svg 
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isExpanded ? 'rotate-180 text-indigo-400' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            
            <p className="text-sm text-gray-400 text-center md:text-left mb-2">
                {t(`consulting.methodology.stage${step}_desc`)}
            </p>

             {/* Hint when collapsed */}
            <div className={`overflow-hidden transition-all duration-300 ${!isExpanded ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-xs text-indigo-500/70 font-mono mt-2 text-center md:text-left flex items-center justify-center md:justify-start gap-1">
                   <span>+ View Details</span>
                </p>
            </div>

            {/* Expandable Content */}
            <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="pt-4 border-t border-white/10 mt-2">
                    <ul className="space-y-3">
                        {details && details.map((detail, index) => (
                            <li key={index} className="text-sm text-gray-200 flex items-start gap-3 animate-in fade-in slide-in-from-left-2" style={{ animationDelay: `${index * 100}ms` }}>
                                <span className="text-indigo-500 mt-1 min-w-[12px]">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                </span>
                                <span className="leading-relaxed">{detail}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Helper Component for Agents
const AgentCard = ({ icon, title, desc, color, bg, border, hoverBorder, onClick }: any) => (
    <div 
        onClick={onClick}
        className={`p-6 rounded-xl ${bg} ${border} border hover:-translate-y-2 cursor-pointer transition-all duration-300 hover:shadow-2xl ${hoverBorder} group relative overflow-hidden`}
    >
        {/* Glow effect */}
        <div className={`absolute -right-10 -top-10 w-32 h-32 ${color.replace('text', 'bg').replace('400', '500')}/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
        
        <div className="relative z-10">
            <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300 origin-left">{icon}</div>
            <h4 className={`text-lg font-bold ${color} mb-3 min-h-[56px] flex items-center`}>{title}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
        </div>
        
        <div className={`mt-4 text-xs font-bold uppercase tracking-wider ${color} opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1`}>
             View Capabilities 
             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>
    </div>
);

export default Consulting;