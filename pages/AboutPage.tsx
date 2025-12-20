
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { Brain, Shield, Cpu } from 'lucide-react';

// Using any to bypass framer-motion type mismatch in the current environment
const m = motion as any;

const AboutPage: React.FC = () => {
  const { language, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const philosophyPillars = (translations[language] as any).philosophy.pillars;

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-blue-500/10 blur-[120px] rounded-full -z-10" />
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.5em] mb-4 block">
            SUPER EGO EVOLUTION
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
            {t('about.hero_title')}
          </h1>
          <p className="text-xl md:text-3xl text-gray-400 font-light max-w-2xl mx-auto">
            {t('about.hero_subtitle')}
          </p>
        </m.div>
      </section>

      {/* The 4 Pillars Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              {t('about.philosophy_section')}
            </h2>
            <div className="h-1 w-20 bg-blue-600 hidden lg:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {philosophyPillars.map((pillar: any, index: number) => (
              <m.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group p-8 md:p-12 rounded-[40px] bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-500 backdrop-blur-xl relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all" />
                <div className="text-blue-500 font-mono text-4xl font-black mb-6 opacity-30">0{index + 1}</div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-6 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed text-base md:text-lg font-light">
                  {pillar.content}
                </p>
                <div className="text-sm text-blue-400/80 italic font-medium pt-6 border-t border-white/5 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-blue-500/30" />
                  {pillar.quote}
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* The SuperEgo Concept */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                  <Brain className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                  {t('about.brain_title')}
                </h2>
              </div>
              <p className="text-xl text-gray-400 leading-relaxed font-light">
                {t('about.brain_desc')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-white/5 rounded-lg text-blue-500">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Sovereignty</h4>
                    <p className="text-sm text-gray-500">Your data, your models, your unique intelligence legacy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-2 bg-white/5 rounded-lg text-purple-500">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Augmentation</h4>
                    <p className="text-sm text-gray-500">Freeing the biological brain for intuition and strategy.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-sm">
              <div className="aspect-square rounded-[60px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50" />
                <Brain className="w-32 h-32 text-blue-500 animate-pulse drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]" />
                
                {/* Floating Tags */}
                <div className="absolute top-10 right-0 bg-brand-surface border border-white/10 px-4 py-2 rounded-2xl text-[10px] font-mono font-bold text-blue-400 shadow-2xl backdrop-blur-md animate-bounce">
                  RAG ENGINE
                </div>
                <div className="absolute bottom-10 left-0 bg-brand-surface border border-white/10 px-4 py-2 rounded-2xl text-[10px] font-mono font-bold text-purple-400 shadow-2xl backdrop-blur-md animate-bounce delay-300">
                  VECTOR DB
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              {t('about.team_title')}
            </h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Architects of the Second Brain</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Zhu */}
            <m.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group p-10 bg-white/5 border border-white/10 rounded-[48px] flex flex-col md:flex-row gap-10 items-center hover:bg-white/10 transition-all duration-500"
            >
              <div className="w-48 h-48 rounded-[32px] bg-brand-dark overflow-hidden border border-white/10 relative flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Zhu" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-black text-white mb-2 uppercase">朱云涛 (Zhu)</h3>
                <p className="text-blue-500 font-mono text-xs uppercase tracking-[0.2em] mb-4">Chief Visionary Officer</p>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  Senior Data Expert & AI Consultant. Graduate of HKU in Financial Engineering. 
                  Specializes in human-AI collaboration and system orchestration, leading the strategic shift towards the "SuperEgo" era.
                </p>
              </div>
            </m.div>

            {/* Du */}
            <m.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group p-10 bg-white/5 border border-white/10 rounded-[48px] flex flex-col md:flex-row gap-10 items-center hover:bg-white/10 transition-all duration-500"
            >
              <div className="w-48 h-48 rounded-[32px] bg-brand-dark overflow-hidden border border-white/10 relative flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Du" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-black text-white mb-2 uppercase">杜占源 (Du)</h3>
                <p className="text-purple-500 font-mono text-xs uppercase tracking-[0.2em] mb-4">Head of Engineering</p>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  Former Tech Director at Alibaba group companies. 10+ years of experience in ML & AIGC deployment. 
                  Leading the development of secure, sovereign agent systems for enterprise and individuals.
                </p>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-4 text-center">
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto p-12 md:p-20 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10 rounded-[64px] backdrop-blur-xl"
        >
          <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
            Become the Architect
          </h2>
          <p className="text-xl text-gray-400 font-light mb-12">
            Join the movement of future orchestrators. Build your legacy in the age of AGI.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 transition-all">
              Join Cohort
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              Enterprise Inquiry
            </button>
          </div>
        </m.div>
      </section>
    </div>
  );
};

export default AboutPage;
