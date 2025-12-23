
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import BioCosmos from '../components/BioCosmos';
import AnatomyCard, { AnatomyNode } from '../components/AnatomyCard';
import MobiusGalaxy from '../components/MobiusGalaxy';
import { 
  ArrowLeft, ArrowRight, Activity, ShieldCheck, Zap, 
  Target, Globe, Database, Code, 
  Cpu, MousePointer2, ChevronRight,
  TrendingUp, Layers, Fingerprint
} from 'lucide-react';

const m = motion as any;

const ANATOMY_DATA: AnatomyNode[] = [
  {
    id: 'core',
    organ: 'The Core (核心皮层)',
    name: 'AI SuperEgo —— 认知外骨骼工程',
    metaphor: 'Engineering Your Second Cortex. 能力平权的终极实践。',
    target: '渴望跨越认知局限的开发者、决策者与终身学习者。',
    method: '12 Weeks | Decoding AI Architecture | Neuro-Inference.',
    outcome: '构建私有核心推理中枢，实现从“查阅资料”到“外挂前额叶”的质变。',
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
    animate={{ 
      y: [0, -10, 0],
      rotate: [0, 0.5, -0.5, 0]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
    className={className}
  >
    {children}
  </m.div>
);

const PlanetsPage: React.FC = () => {
  const { language } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoverData, setHoverData] = useState<{ pos: { x: number; y: number } | null; color: string | null }>({ pos: null, color: null });
  
  const scrollToSection = (id: string) => {
    const el = document.getElementById(`deep-dive-${id}`);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020308] overflow-x-hidden pt-24">
      {/* GLOBAL BACKGROUNDS */}
      <BioCosmos 
        activeColor={hoverData.color || undefined} 
        activePos={hoverData.pos || undefined} 
        isCore={hoveredId === 'core'}
      />
      
      {/* 3D MOBIUS GALAXY: Synchronized with hoveredId */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <MobiusGalaxy 
          orientation="horizontal" 
          hoveredId={hoveredId}
        />
      </div>

      {/* HERO SECTION: THE GALAXY VIEW */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pb-20">
        <div className="text-center mb-20 space-y-6">
          <m.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-widest"
          >
            <Activity className="w-3 h-3" />
            Biological Digital Evolution Protocol
          </m.div>
          <m.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none"
          >
            {language === 'zh' ? '数字生命体架构' : 'Digital Life Form'}
          </m.h1>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.5em]">The Anatomy of a Super Individual</p>
        </div>

        {/* VITRUVIAN LAYOUT (DESKTOP) */}
        <div className="hidden lg:block relative w-full max-w-7xl min-h-[900px]">
          {/* CORE: SuperEgo */}
          <div 
            className={`absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[440px] transition-all duration-700 ${hoveredId === 'core' ? 'z-[100]' : 'z-50'}`}
          >
            <FloatingCard delay={0.2}>
              <AnatomyCard 
                data={ANATOMY_DATA[0]} 
                isCenter={true} 
                onHover={(pos, color) => {
                  setHoverData({ pos, color });
                  setHoveredId(color ? 'core' : null);
                }}
                onClick={() => scrollToSection('core')}
              />
            </FloatingCard>
          </div>

          {/* LOGIC */}
          <div className={`absolute left-[12%] top-[5%] w-[330px] transition-all duration-300 ${hoveredId === 'logic' ? 'z-[101]' : 'z-10'}`}>
            <FloatingCard delay={0.5}>
              <AnatomyCard 
                data={ANATOMY_DATA[1]} 
                onHover={(pos, color) => {
                  setHoverData({ pos, color });
                  setHoveredId(color ? 'logic' : null);
                }}
                onClick={() => scrollToSection('logic')}
              />
            </FloatingCard>
          </div>

          {/* SENSES */}
          <div className={`absolute right-[12%] top-[5%] w-[330px] transition-all duration-300 ${hoveredId === 'senses' ? 'z-[101]' : 'z-10'}`}>
            <FloatingCard delay={0.8}>
              <AnatomyCard 
                data={ANATOMY_DATA[2]} 
                onHover={(pos, color) => {
                  setHoverData({ pos, color });
                  setHoveredId(color ? 'senses' : null);
                }}
                onClick={() => scrollToSection('senses')}
              />
            </FloatingCard>
          </div>

          {/* BODY */}
          <div className={`absolute left-[2%] top-[45%] w-[330px] transition-all duration-300 ${hoveredId === 'body' ? 'z-[101]' : 'z-10'}`}>
            <FloatingCard delay={1.1}>
              <AnatomyCard 
                data={ANATOMY_DATA[3]} 
                onHover={(pos, color) => {
                  setHoverData({ pos, color });
                  setHoveredId(color ? 'body' : null);
                }}
                onClick={() => scrollToSection('body')}
              />
            </FloatingCard>
          </div>

          {/* HANDS */}
          <div className={`absolute right-[2%] top-[45%] w-[330px] transition-all duration-300 ${hoveredId === 'hands' ? 'z-[101]' : 'z-10'}`}>
            <FloatingCard delay={1.4}>
              <AnatomyCard 
                data={ANATOMY_DATA[4]} 
                onHover={(pos, color) => {
                  setHoverData({ pos, color });
                  setHoveredId(color ? 'hands' : null);
                }}
                onClick={() => scrollToSection('hands')}
              />
            </FloatingCard>
          </div>

          {/* WILL */}
          <div className={`absolute left-1/2 bottom-[2%] -translate-x-1/2 w-[330px] transition-all duration-300 ${hoveredId === 'will' ? 'z-[101]' : 'z-10'}`}>
            <FloatingCard delay={1.7}>
              <AnatomyCard 
                data={ANATOMY_DATA[5]} 
                onHover={(pos, color) => {
                  setHoverData({ pos, color });
                  setHoveredId(color ? 'will' : null);
                }}
                onClick={() => scrollToSection('will')}
              />
            </FloatingCard>
          </div>
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
            <g stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="5 5">
               <path d="M 50% 45% L 25% 15%" />
               <path d="M 50% 45% L 75% 15%" />
               <path d="M 50% 45% L 15% 55%" />
               <path d="M 50% 45% L 85% 55%" />
               <path d="M 50% 45% L 50% 90%" />
            </g>
          </svg>
        </div>

        {/* MOBILE HERO VIEW */}
        <div className="lg:hidden space-y-10 relative mt-16 px-2 w-full">
          {ANATOMY_DATA.map((node, i) => (
            <AnatomyCard 
              key={node.id}
              data={node} 
              isCenter={node.id === 'core'}
              onHover={(pos, color) => {
                setHoverData({ pos, color });
                setHoveredId(color ? node.id : null);
              }} 
              onClick={() => scrollToSection(node.id)}
            />
          ))}
        </div>
      </section>

      {/* SECTION 1: PHILOSOPHY */}
      <section className="relative z-10 py-32 px-6 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <m.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8"
            >
              {language === 'zh' ? '这不是拼盘，而是进化' : "It's Not a Bundle. It's Evolution."}
            </m.h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed font-light">
              {language === 'zh' 
                ? "传统教育是碎片的：你学了Python，但不懂决策；你懂了艺术，但不会工具。AI SuperEgo 体系是闭环的：六大器官协同，构建一个完整的数字生命体。"
                : "Traditional education is fragmented. You learn Python, but not decision-making. You understand art, but not the tools. The AI SuperEgo system is a closed loop: 6 organs working as one digital life form."}
            </p>
          </div>

          <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
            <div className="relative w-full max-w-4xl h-full border border-white/5 rounded-[40px] bg-[#05060f] shadow-2xl flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
               
               <svg viewBox="0 0 800 400" className="w-full h-full p-10">
                 <defs>
                   <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#3b82f6" />
                     <stop offset="50%" stopColor="#8b5cf6" />
                     <stop offset="100%" stopColor="#06b6d4" />
                   </linearGradient>
                 </defs>
                 
                 <m.path 
                   d="M 100 200 Q 250 50 400 200 T 700 200" 
                   stroke="url(#flow-gradient)" 
                   strokeWidth="2" 
                   fill="none"
                   initial={{ pathLength: 0, opacity: 0 }}
                   whileInView={{ pathLength: 1, opacity: 0.3 }}
                   transition={{ duration: 3, ease: "easeInOut" }}
                 />
                 <m.circle 
                   cx="0" cy="0" r="4" fill="#fff"
                   animate={{ 
                     cx: [100, 250, 400, 550, 700], 
                     cy: [200, 80, 200, 320, 200],
                     opacity: [0, 1, 1, 1, 0] 
                   }}
                   transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                 />

                 <g className="text-[10px] font-mono fill-gray-500 font-bold uppercase tracking-widest">
                   <text x="80" y="230">Senses (Input)</text>
                   <text x="360" y="230" fill="#FFD700">Core (Memory)</text>
                   <text x="640" y="230">Action (Output)</text>
                 </g>
               </svg>

               <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
                  <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.3em] font-black">The Super Individual Loop</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEEP DIVE SECTION */}
      <section className="relative z-10 py-32 space-y-40">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-32">
             <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">器官解剖 // Anatomy Deep Dive</h2>
           </div>

           {ANATOMY_DATA.map((item, idx) => (
             <div 
               id={`deep-dive-${item.id}`}
               key={item.id} 
               className={`flex flex-col lg:flex-row items-center gap-20 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
             >
                <div className="flex-1 w-full">
                   <m.div 
                     initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="relative aspect-square rounded-[60px] bg-white/5 border border-white/10 overflow-hidden group"
                   >
                      <div className="absolute inset-0 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700">
                         {item.icon}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                      <div className="absolute bottom-12 left-12">
                         <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em]" style={{ color: item.color }}>
                           Organ_ID: {item.id.toUpperCase()}
                         </span>
                      </div>
                   </m.div>
                </div>

                <div className="flex-1 space-y-10">
                   <div className="space-y-4">
                      <div className="w-12 h-1 bg-blue-500 rounded-full" style={{ backgroundColor: item.color }} />
                      <h3 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
                        {item.name.split(' —— ')[1] || item.name}
                      </h3>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10 space-y-3">
                         <div className="text-[9px] font-black uppercase tracking-widest text-red-500">The Pain // 现状</div>
                         <p className="text-gray-300 text-sm leading-relaxed">
                            {item.id === 'core' && "你的大脑在遗忘，你的笔记在吃灰，知识无法转化为生产力。"}
                            {item.id === 'logic' && "面对海量信息，你只会凭感觉盲猜，缺乏系统化解构能力。"}
                            {item.id === 'hands' && "有绝妙的点子，但被高昂的开发成本劝退，无法快速验证市场。"}
                            {item.id === 'senses' && "每天接收噪音，无法在信息过过载中识别真正的阿尔法信号。"}
                            {item.id === 'body' && "数字世界与物理世界脱节，你的健康数据只是数字而非行动。"}
                            {item.id === 'will' && "决策受情绪波动影响，在不确定性面前总是错失良机。"}
                         </p>
                      </div>
                      <div className="p-6 rounded-3xl bg-green-500/5 border border-green-500/10 space-y-3">
                         <div className="text-[9px] font-black uppercase tracking-widest text-green-500">The Evolution // 进化</div>
                         <p className="text-gray-300 text-sm leading-relaxed">
                            {item.id === 'core' && "构建私有向量数据库，让 AI 记住你的每一次灵感，成为永恒参谋。"}
                            {item.id === 'logic' && "用数学模型重构认知，让 Pandas Agent 帮你理性拆解复杂世界。"}
                            {item.id === 'hands' && "一人即一家科技公司。用 Cursor 指挥 AI，一周上线你的商业产品。"}
                            {item.id === 'senses' && "训练 Deep Research Agent，24/7 自动扫描全网，生成精准研报。"}
                            {item.id === 'body' && "利用 MediaPipe 构建视觉运动反馈，将物理动作矢量化与优化。"}
                            {item.id === 'will' && "构建自我进化的量化 Agent，在风险与概率中锻造钢铁意志。"}
                         </p>
                      </div>
                   </div>

                   <button className="flex items-center gap-4 text-white font-black uppercase tracking-[0.2em] text-xs group">
                      Explore Module Blueprint 
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                   </button>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* TECH STACK MARQUEE */}
      <section className="relative z-10 py-32 overflow-hidden border-y border-white/5 bg-black/60">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
           <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
             {language === 'zh' ? '硅谷最前沿的“核武器”库' : 'The Sovereign Tech Stack'}
           </h2>
           <p className="text-gray-500 text-sm italic font-light">"We don't teach obsolete syntax. We teach you to command future tools."</p>
        </div>

        <div className="flex overflow-hidden relative">
           <m.div 
             animate={{ x: ["0%", "-50%"] }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="flex gap-20 items-center whitespace-nowrap px-10 py-10"
           >
              {[
                "Cursor", "Dify", "Supabase", "Midjourney", 
                "Python", "LangChain", "Pinecone", "Vercel",
                "Cursor", "Dify", "Supabase", "Midjourney", 
                "Python", "LangChain", "Pinecone", "Vercel"
              ].map((logo, i) => (
                <span 
                  key={i} 
                  className="text-4xl md:text-6xl font-black text-gray-700 hover:text-white transition-colors duration-500 cursor-default uppercase tracking-tighter grayscale hover:grayscale-0"
                >
                  {logo}
                </span>
              ))}
           </m.div>
        </div>
      </section>

      {/* FOOTER RESET */}
      <div className="mt-40 text-center pb-20 relative z-10">
        <Link to="/" className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-gray-500 hover:text-white hover:bg-white/10 transition-all font-mono text-[10px] uppercase tracking-widest group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Biological Home // Reset Protocol
        </Link>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, #ffffff10 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff10 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

const ChevronDownIcon = (props: any) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default PlanetsPage;
