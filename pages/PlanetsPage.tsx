
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
      
      {/* 3D MOBIUS GALAXY */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <MobiusGalaxy 
          orientation="horizontal" 
          hoveredId={hoveredId}
        />
      </div>

      {/* HERO SECTION */}
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

        {/* VITRUVIAN LAYOUT */}
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

          {/* 其他节点保持不变... */}
          <div className={`absolute left-[12%] top-[5%] w-[330px] transition-all duration-300 ${hoveredId === 'logic' ? 'z-[101]' : 'z-10'}`}>
            <FloatingCard delay={0.5}>
              <AnatomyCard data={ANATOMY_DATA[1]} onHover={(pos, color) => { setHoverData({ pos, color }); setHoveredId(color ? 'logic' : null); }} onClick={() => scrollToSection('logic')} />
            </FloatingCard>
          </div>
          <div className={`absolute right-[12%] top-[5%] w-[330px] transition-all duration-300 ${hoveredId === 'senses' ? 'z-[101]' : 'z-10'}`}>
            <FloatingCard delay={0.8}>
              <AnatomyCard data={ANATOMY_DATA[2]} onHover={(pos, color) => { setHoverData({ pos, color }); setHoveredId(color ? 'senses' : null); }} onClick={() => scrollToSection('senses')} />
            </FloatingCard>
          </div>
          <div className={`absolute left-[2%] top-[45%] w-[330px] transition-all duration-300 ${hoveredId === 'body' ? 'z-[101]' : 'z-10'}`}>
            <FloatingCard delay={1.1}>
              <AnatomyCard data={ANATOMY_DATA[3]} onHover={(pos, color) => { setHoverData({ pos, color }); setHoveredId(color ? 'body' : null); }} onClick={() => scrollToSection('body')} />
            </FloatingCard>
          </div>
          <div className={`absolute right-[2%] top-[45%] w-[330px] transition-all duration-300 ${hoveredId === 'hands' ? 'z-[101]' : 'z-10'}`}>
            <FloatingCard delay={1.4}>
              <AnatomyCard data={ANATOMY_DATA[4]} onHover={(pos, color) => { setHoverData({ pos, color }); setHoveredId(color ? 'hands' : null); }} onClick={() => scrollToSection('hands')} />
            </FloatingCard>
          </div>
          <div className={`absolute left-1/2 bottom-[2%] -translate-x-1/2 w-[330px] transition-all duration-300 ${hoveredId === 'will' ? 'z-[101]' : 'z-10'}`}>
            <FloatingCard delay={1.7}>
              <AnatomyCard data={ANATOMY_DATA[5]} onHover={(pos, color) => { setHoverData({ pos, color }); setHoveredId(color ? 'will' : null); }} onClick={() => scrollToSection('will')} />
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
      </section>
      {/* 剩余部分保持不变... */}
    </div>
  );
};

export default PlanetsPage;
