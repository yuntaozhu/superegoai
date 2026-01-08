
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import AnatomyCard, { AnatomyNode } from '../components/AnatomyCard';
import MobiusGalaxy from '../components/MobiusGalaxy';
import { 
  ArrowLeft, Activity, ChevronRight
} from 'lucide-react';

const m = motion as any;

const getAnatomyData = (language: 'zh' | 'en'): AnatomyNode[] => {
  const isZh = language === 'zh';

  return [
    {
      id: 'core',
      organ: isZh ? 'The Core (核心)' : 'The Core',
      name: isZh ? '第二大脑 OS —— 记忆与人格' : 'Second Brain OS — Memory & Personality',
      metaphor: isZh ? '唤醒沉睡的个人知识库，打造完全隐私的AI参谋长。' : 'Awaken your dormant knowledge base. Build a fully private AI Chief of Staff.',
      target: isZh ? '摆脱枯燥记忆，建立伴随一生的智慧外脑。' : 'Adults escaping rote memory; Kids building lifelong AI brains.',
      method: '12 Weeks | Agentic RAG | Model Fine-tuning',
      outcome: isZh ? '利用 Agentic RAG 与模型微调，将你过往的隐性知识转化为显性数字资产。' : 'Transform implicit knowledge into explicit digital assets using Agentic RAG & Fine-tuning.',
      link: '/course/data',
      color: '#FFD700',
      icon: '🧠'
    },
    {
      id: 'logic',
      organ: isZh ? 'The Left Brain (左脑)' : 'The Logic',
      name: isZh ? '模型思维 —— 概率与仿真' : 'Model Thinking — Probability & Simulation',
      metaphor: isZh ? '用贝叶斯更新认知，用 LLM 仿真推演未来。' : 'Update cognition with Bayesian logic; simulate the future with LLM Agents.',
      target: isZh ? '渴望克服“直觉偏差”与“系统1”弱点的决策者。' : 'Decision-makers wanting to overcome "Intuitive Bias" and "System 1" weaknesses.',
      method: '8 Weeks | Agent Simulation | Bayesian Inference',
      outcome: isZh ? '构建你的“数字系统 2”。在投入真金白银前，先在虚拟世界中进行博弈推演。' : 'Build your "Digital System 2". Simulate games in a virtual world before risking real capital.',
      link: '/course/digital-twin',
      color: '#00BFFF',
      icon: '🧬'
    },
    {
      id: 'senses',
      organ: isZh ? 'The Senses (五官)' : 'The Senses',
      name: isZh ? '深度研究 —— 输入与洞察' : 'Deep Research — Input & Insight',
      metaphor: isZh ? '跨学科的感知与深度洞察。' : 'Interdisciplinary perception and deep insight.',
      target: isZh ? '渴望提升感知颗粒度的研究者。' : 'Researchers seeking higher perception granularity.',
      method: '4 Weeks | Crawler Agents | Multi-source Verification',
      outcome: isZh ? '打破学科壁垒，利用AI融合艺术、数学、历史与哲学，形成独到见解。' : 'Break barriers. Fuse art, math, history & philosophy for unique insights.',
      link: '/course/art',
      color: '#8A2BE2',
      icon: '👁️'
    },
    {
      id: 'body',
      organ: isZh ? 'The Body (躯干)' : 'The Body',
      name: isZh ? '体能觉醒 —— 感知与健康' : 'Physical Awakening — Perception & Health',
      metaphor: isZh ? '从身体到心灵的数字化链接。' : 'The digital link from body to mind.',
      target: isZh ? '寻求身心平衡的生物黑客。' : 'Bio-hackers seeking mind-body balance.',
      method: '8 Weeks | Computer Vision | Bio-feedback',
      outcome: isZh ? '通过AI辅助与身体对话，实现身心释放与健康管理，连接物理与数字世界。' : 'Dialogue with your body via AI. Achieve release and manage health.',
      link: '/course/sports',
      color: '#FF4500',
      icon: '🏃'
    },
    {
      id: 'hands',
      organ: isZh ? 'The Hands (双手)' : 'The Hands',
      name: isZh ? '超级个体 —— 创造与工具' : 'Super Individual — Creation & Tools',
      metaphor: isZh ? '人人都是产品经理。构建 SuperEgo Brain。' : 'Everyone is a Product Manager. Build the SuperEgo Brain.',
      target: isZh ? '不仅想，更能做的实干家。' : 'Doers who want to build, not just think.',
      method: '10 Weeks | Cursor/v0 | Product Launch',
      outcome: isZh ? 'AI赋予每个人开发能力。将创意产品化、商业化，成为真正的“超级个体”。' : 'Commercialize ideas. Become a "Super Individual" who builds tools.',
      link: '/course/solopreneur',
      color: '#00FFFF',
      icon: '🚀'
    },
    {
      id: 'will',
      organ: isZh ? 'The Will (意志)' : 'The Will',
      name: isZh ? '量化交易 —— 决策与博弈' : 'AI Quant — Decision & Game Theory',
      metaphor: isZh ? '不确定性中的决策艺术。' : 'The art of decision-making in uncertainty.',
      target: isZh ? '寻求决策确定性的投资者。' : 'Investors seeking certainty in chaos.',
      method: '12 Weeks | Agent Swarm | Risk Control',
      outcome: isZh ? '利用AI进行量化分析，在复杂的博弈中寻找确定性，锻炼钢铁般的意志。' : 'Find certainty in complex games. Forge iron will through AI quant analysis.',
      link: '/course/quant',
      color: '#10B981',
      icon: '📈'
    }
  ];
};

const PlanetsPage: React.FC = () => {
  const { language } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const anatomyData = getAnatomyData(language);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`deep-dive-${id}`);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full bg-[#020308] text-white overflow-x-hidden">
      {/* 3D Background - Fixed behind content */}
      <MobiusGalaxy 
        orientation="horizontal" 
        hoveredId={hoveredId} 
        isMobile={isMobile}
      />

      <div className="relative z-10 w-full">
        
        {/* 1. HERO SECTION - Updated Copy */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 pt-32 pb-12">
          <div className="text-center mb-8 space-y-8 max-w-5xl mx-auto">
            <m.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-widest"
            >
              <Activity className="w-3 h-3" /> CLOSED-LOOP LIFE FORM
            </m.div>
            <m.h1 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight"
            >
              {language === 'zh' ? '构建你的数字生命体' : 'Build Your Digital Life Form'}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500">
                {language === 'zh' ? '外脑课程体系' : 'The External Brain System'}
              </span>
            </m.h1>
            <m.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 font-light text-base md:text-xl leading-relaxed max-w-3xl mx-auto"
            >
              {language === 'zh' 
                ? '在AI时代，告别碎片化学习。我们将六大核心模块融合为一个“闭环生命体”，不仅仅是传授知识，更是为你构建一个具备记忆、思考、感知与决策能力的“第二大脑”。' 
                : 'Say goodbye to fragmented learning. We fuse six core modules into a "closed-loop life form." We don\'t just teach knowledge; we build you a "Second Brain" capable of memory, thought, perception, and decision-making.'}
            </m.p>
          </div>
          
          {/* Scroll Indicator */}
          <m.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-12 text-blue-500/50"
          >
            <Activity className="w-8 h-8 rotate-90" />
          </m.div>
        </section>

        {/* 2. MAIN GRID SECTION - The Anatomy */}
        <section className="px-6 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {anatomyData.map((node, idx) => (
                <m.div 
                  key={node.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <AnatomyCard 
                    data={node} 
                    isCenter={node.id === 'core'} 
                    onHover={(pos, color) => setHoveredId(color ? node.id : null)} 
                    onClick={() => scrollToSection(node.id)} 
                  />
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. PHILOSOPHY SECTION */}
        <section className="py-32 px-6 bg-black/60 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <m.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">
                {language === 'zh' ? '这不是拼盘，而是进化' : "It's Not a Bundle. It's Evolution."}
              </m.h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed font-light">
                {language === 'zh' ? "传统教育是碎片的。AI SuperEgo 体系是闭环的：六大器官协同，构建一个完整的数字生命体。" : "The AI SuperEgo system is a closed loop: 6 organs working as one digital life form."}
              </p>
            </div>
            <div className="relative h-[350px] md:h-[600px] flex items-center justify-center border border-white/5 rounded-[40px] bg-black/40 overflow-hidden backdrop-blur-md">
               <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
               <svg viewBox="0 0 800 400" className="w-full h-full p-4 md:p-10">
                 <path d="M 100 200 Q 250 50 400 200 T 700 200" stroke="#3b82f6" strokeWidth="2" fill="none" className="opacity-40" />
                 <circle cx="400" cy="200" r="10" fill="#FFD700" className="animate-pulse" />
                 <text x="80" y="230" fill="#555" fontSize="12" className="font-bold">SENSES (INPUT)</text>
                 <text x="360" y="230" fill="#FFD700" fontSize="12" className="font-bold">CORE (MEMORY)</text>
                 <text x="640" y="230" fill="#555" fontSize="12" className="font-bold">HANDS (OUTPUT)</text>
               </svg>
            </div>
          </div>
        </section>

        {/* 4. ANATOMY DEEP DIVE */}
        <section className="py-32 px-6 bg-[#020308]/40">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-32">
               <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">
                 {language === 'zh' ? '器官解剖' : 'Anatomy Deep Dive'}
               </h2>
             </div>
             {anatomyData.map((item, idx) => (
               <div id={`deep-dive-${item.id}`} key={item.id} className={`flex flex-col lg:flex-row items-center gap-12 md:gap-32 mb-40 last:mb-0 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="flex-1 w-full">
                     <m.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="relative aspect-square rounded-[40px] md:rounded-[60px] bg-white/5 border border-white/10 flex items-center justify-center text-8xl md:text-9xl group overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-80" />
                        <span className="relative group-hover:scale-110 transition-transform duration-700">{item.icon}</span>
                        <div className="absolute top-6 left-6 font-mono text-[10px] text-white/20 tracking-widest uppercase">Biological_ID: {item.id}</div>
                     </m.div>
                  </div>
                  <div className="flex-1 space-y-10">
                     <div className="space-y-4">
                        <div className="w-16 h-1 bg-blue-500 rounded-full" style={{ backgroundColor: item.color }} />
                        <h3 className="text-3xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight">
                          {item.name.includes(' —— ') ? item.name.split(' —— ')[1] : item.name}
                        </h3>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="p-8 rounded-[32px] bg-blue-500/5 border border-blue-500/10 space-y-4">
                           <div className="text-[10px] font-black uppercase tracking-widest text-blue-500">The Function</div>
                           <p className="text-gray-300 text-base leading-relaxed">{item.metaphor}</p>
                        </div>
                        <div className="p-8 rounded-[32px] bg-green-500/5 border border-green-500/10 space-y-4">
                           <div className="text-[10px] font-black uppercase tracking-widest text-green-500">The Value</div>
                           <p className="text-gray-300 text-base leading-relaxed">{item.outcome}</p>
                        </div>
                     </div>
                     <Link to={item.link} className="inline-flex items-center gap-6 px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs group rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                        Explore Blueprint 
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                     </Link>
                  </div>
               </div>
             ))}
          </div>
        </section>

        {/* 5. TECH STACK */}
        <section className="py-40 overflow-hidden border-t border-white/5 bg-black/80">
          <div className="text-center mb-16">
            <span className="text-blue-500 font-mono text-xs uppercase tracking-widest">Sovereign Ecosystem</span>
            <h2 className="text-4xl font-black text-white mt-4 uppercase">The Tech Stack</h2>
          </div>
          <div className="flex overflow-hidden relative">
             <m.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex gap-20 items-center whitespace-nowrap px-10 py-10">
                {["Cursor", "LangChain", "Dify", "Supabase", "Midjourney", "Python", "Pinecone", "Vercel", "OpenAI", "Anthropic", "Mistral"].map((logo, i) => (
                  <span key={i} className="text-4xl md:text-7xl font-black text-white/10 hover:text-white transition-all duration-700 uppercase tracking-tighter cursor-default">{logo}</span>
                ))}
             </m.div>
          </div>
        </section>

        {/* 6. FOOTER */}
        <div className="py-32 text-center bg-black">
          <Link to="/" className="inline-flex items-center gap-4 px-10 py-4 rounded-full bg-white/5 border border-white/10 text-gray-500 hover:text-white hover:border-white/30 transition-all font-mono text-xs uppercase tracking-widest group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> Back to Biological Home
          </Link>
        </div>
      </div>

      <style>{`
        .bg-grid-pattern { background-image: linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px); background-size: 50px 50px; }
      `}</style>
    </div>
  );
};

export default PlanetsPage;
