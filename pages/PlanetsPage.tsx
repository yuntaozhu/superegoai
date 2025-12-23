
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import AnatomyCard, { AnatomyNode } from '../components/AnatomyCard';
import MobiusGalaxy from '../components/MobiusGalaxy';
import { 
  ArrowLeft, Activity, ChevronRight
} from 'lucide-react';

const m = motion as any;

const ANATOMY_DATA: AnatomyNode[] = [
  {
    id: 'core',
    organ: 'The Core (核心枢纽)',
    name: 'AI SuperEgo —— Engineering Your Second Brain 构建第二外脑',
    metaphor: '主权认知架构的终极工程实战。实现能力平权的唯一路径。',
    target: '渴望打破生物瓶颈、构建数字化认知资产的超级个体。',
    method: '12 Weeks | Decoding AI Architecture | Neuro-Inference.',
    outcome: '构建可代码化的私有外脑，实现从“算法受体”到“架构导演”的进化。',
    link: '/course/data',
    color: '#FFD700',
    icon: '🧠'
  },
  {
    id: 'logic',
    organ: 'The Logic (左脑)',
    name: 'AI Data Modeling —— 认知重构与系统思维',
    metaphor: 'Thinking & Abstraction (思考与抽象). The logical processing unit.',
    target: 'Analysts, Strategic Thinkers, HIMCM Students.',
    method: '6 Weeks | Math Modeling | Python Pandas Agents.',
    outcome: 'Master data-driven thinking and solve complex system problems.',
    link: '/course/digital-twin',
    color: '#00BFFF',
    icon: '🧬'
  },
  {
    id: 'senses',
    organ: 'The Senses (五官)',
    name: 'AI Deep Research —— 全域信息洞察',
    metaphor: 'Input & Insight (输入与洞察). The eyes and ears of the SuperEgo.',
    target: 'Researchers, Creators, Academic Students.',
    method: '4 Weeks | Crawler Agents | Multi-source Verification.',
    outcome: 'Build Deep Research Agents to generate expert reports automatically.',
    link: '/course/art',
    color: '#8A2BE2',
    icon: '👁️'
  },
  {
    id: 'body',
    organ: 'The Body (躯干)',
    name: 'AI Physical Awakening —— 从视觉到身心重塑',
    metaphor: 'Perception & Health (感知与健康). Connecting digital to physical.',
    target: 'Sports Enthusiasts, Teens, Bio-hackers.',
    method: '8 Weeks | Computer Vision (CV) | IoT Data Analysis.',
    outcome: 'Build a personal AI Coach using MediaPipe/OpenCV.',
    link: '/course/sports',
    color: '#FF4500',
    icon: '🏃'
  },
  {
    id: 'hands',
    organ: 'The Hands (双手)',
    name: 'AI Super Individual —— 全栈软件构建',
    metaphor: 'Creation & Tools (创造与工具). The execution capability.',
    target: 'Entrepreneurs, Indie Hackers, Solopreneurs.',
    method: '10 Weeks | Project-Based (Cursor/v0) | Product Launch.',
    outcome: 'Build and launch a commercial SaaS product solo.',
    link: '/course/solopreneur',
    color: '#00FFFF',
    icon: '🚀'
  },
  {
    id: 'will',
    organ: 'The Will (意志)',
    name: 'AI Quant Trading —— 不确定性中的决策',
    metaphor: 'Decision & Game Theory (决策与博弈). The prefrontal cortex.',
    target: 'Investors, Finance-focused Learners.',
    method: '12 Weeks | Simulation & Live Trading | Strategy Coding.',
    outcome: 'Build self-evolving trading agents and master risk control.',
    link: '/course/quant',
    color: '#2E8B57',
    icon: '📈'
  }
];

const FloatingCard: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className, delay = 0 }) => (
  <m.div
    animate={{ y: [0, -10, 0], rotate: [0, 0.5, -0.5, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    className={className}
  >
    {children}
  </m.div>
);

const PlanetsPage: React.FC = () => {
  const { language } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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

      {/* Content Container - No fixed heights to allow scrolling */}
      <div className="relative z-10 w-full">
        
        {/* 1. HERO SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-20">
          <div className="text-center mb-16 space-y-6">
            <m.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-widest">
              <Activity className="w-3 h-3" /> BIOLOGICAL DIGITAL EVOLUTION PROTOCOL
            </m.div>
            <m.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
              {language === 'zh' ? '数字生命体架构' : 'Digital Life Form'}
            </m.h1>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.5em]">The Anatomy of a Super Individual</p>
          </div>

          {/* Desktop Vitruvian Layout */}
          {!isMobile ? (
            <div className="relative w-full max-w-7xl min-h-[850px] mb-20">
              <div className={`absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[440px] transition-all duration-700 ${hoveredId === 'core' ? 'z-[100]' : 'z-50'}`}>
                <FloatingCard delay={0.2}>
                  <AnatomyCard data={ANATOMY_DATA[0]} isCenter={true} onHover={(pos, color) => setHoveredId(color ? 'core' : null)} onClick={() => scrollToSection('core')} />
                </FloatingCard>
              </div>
              <div className={`absolute left-[12%] top-[5%] w-[330px] transition-all duration-300 ${hoveredId === 'logic' ? 'z-[101]' : 'z-10'}`}>
                <FloatingCard delay={0.5}><AnatomyCard data={ANATOMY_DATA[1]} onHover={(pos, color) => setHoveredId(color ? 'logic' : null)} onClick={() => scrollToSection('logic')} /></FloatingCard>
              </div>
              <div className={`absolute right-[12%] top-[5%] w-[330px] transition-all duration-300 ${hoveredId === 'senses' ? 'z-[101]' : 'z-10'}`}>
                <FloatingCard delay={0.8}><AnatomyCard data={ANATOMY_DATA[2]} onHover={(pos, color) => setHoveredId(color ? 'senses' : null)} onClick={() => scrollToSection('senses')} /></FloatingCard>
              </div>
              <div className={`absolute left-[2%] top-[45%] w-[330px] transition-all duration-300 ${hoveredId === 'body' ? 'z-[101]' : 'z-10'}`}>
                <FloatingCard delay={1.1}><AnatomyCard data={ANATOMY_DATA[3]} onHover={(pos, color) => setHoveredId(color ? 'body' : null)} onClick={() => scrollToSection('body')} /></FloatingCard>
              </div>
              <div className={`absolute right-[2%] top-[45%] w-[330px] transition-all duration-300 ${hoveredId === 'hands' ? 'z-[101]' : 'z-10'}`}>
                <FloatingCard delay={1.4}><AnatomyCard data={ANATOMY_DATA[4]} onHover={(pos, color) => setHoveredId(color ? 'hands' : null)} onClick={() => scrollToSection('hands')} /></FloatingCard>
              </div>
              <div className={`absolute left-1/2 bottom-[2%] -translate-x-1/2 w-[330px] transition-all duration-300 ${hoveredId === 'will' ? 'z-[101]' : 'z-10'}`}>
                <FloatingCard delay={1.7}><AnatomyCard data={ANATOMY_DATA[5]} onHover={(pos, color) => setHoveredId(color ? 'will' : null)} onClick={() => scrollToSection('will')} /></FloatingCard>
              </div>
            </div>
          ) : (
            /* Mobile Vertical List - Ensure full visibility */
            <div className="flex flex-col gap-10 w-full max-w-md mx-auto mb-20">
              {ANATOMY_DATA.map((node) => (
                <m.div key={node.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <AnatomyCard 
                    data={node} 
                    isCenter={node.id === 'core'} 
                    onHover={() => setHoveredId(node.id)} 
                    onClick={() => scrollToSection(node.id)} 
                  />
                </m.div>
              ))}
            </div>
          )}
        </section>

        {/* 2. PHILOSOPHY SECTION */}
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
                 <text x="80" y="230" fill="#555" fontSize="12" className="font-bold">INPUT</text>
                 <text x="360" y="230" fill="#FFD700" fontSize="12" className="font-bold">CORE</text>
                 <text x="640" y="230" fill="#555" fontSize="12" className="font-bold">OUTPUT</text>
               </svg>
            </div>
          </div>
        </section>

        {/* 3. ANATOMY DEEP DIVE - Fixed scrolling & display */}
        <section className="py-32 px-6 bg-[#020308]/40">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-32">
               <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">器官解剖 // Anatomy Deep Dive</h2>
             </div>
             {ANATOMY_DATA.map((item, idx) => (
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
                        <h3 className="text-3xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight">{item.name.includes(' —— ') ? item.name.split(' —— ')[1] : item.name}</h3>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="p-8 rounded-[32px] bg-red-500/5 border border-red-500/10 space-y-4">
                           <div className="text-[10px] font-black uppercase tracking-widest text-red-500">The Pain // 现状</div>
                           <p className="text-gray-300 text-base leading-relaxed">{item.id === 'core' ? "大脑遗忘，知识无法转化为生产力。" : "面对海量信息，缺乏系统化解构能力。"}</p>
                        </div>
                        <div className="p-8 rounded-[32px] bg-green-500/5 border border-green-500/10 space-y-4">
                           <div className="text-[10px] font-black uppercase tracking-widest text-green-500">The Evolution // 进化</div>
                           <p className="text-gray-300 text-base leading-relaxed">{item.id === 'core' ? "构建私有外脑，让灵感永存。" : "一人即公司。一周上线商业产品。"}</p>
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

        {/* 4. TECH STACK */}
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

        {/* 5. FOOTER */}
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
