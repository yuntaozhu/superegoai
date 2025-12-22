
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import BioCosmos from '../components/BioCosmos';
import AnatomyCard, { AnatomyNode } from '../components/AnatomyCard';
import { ArrowLeft, Dna, Activity, Globe } from 'lucide-react';

const m = motion as any;

const ANATOMY_DATA: AnatomyNode[] = [
  {
    id: 'core',
    organ: 'The Core (核心)',
    name: 'AI SuperEgo —— 构建主权第二大脑',
    metaphor: 'Memory & Personality (记忆与人格). The Operating System of your life.',
    target: 'Lifelong Learners, Knowledge Workers.',
    method: '4 Weeks | Architecture Design | RAG Pipeline Setup.',
    outcome: 'Build a private Vector Database and a "Chief of Staff" AI.',
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

const PlanetsPage: React.FC = () => {
  const { language } = useLanguage();
  const [hoverData, setHoverData] = useState<{ pos: { x: number; y: number } | null; color: string | null }>({ pos: null, color: null });

  return (
    <div className="relative min-h-screen bg-[#020308] overflow-x-hidden pt-24 pb-32">
      {/* 动态粒子背景 */}
      <BioCosmos 
        activeColor={hoverData.color || undefined} 
        activePos={hoverData.pos || undefined} 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-24 space-y-4">
          <m.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest"
          >
            <Activity className="w-3 h-3 animate-pulse" />
            Biological Digital Evolution
          </m.div>
          <m.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none"
          >
            {language === 'zh' ? '构建你的数字生命体' : 'Build Your Digital Life Form'}
          </m.h1>
          <m.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 font-mono text-xs md:text-sm uppercase tracking-[0.4em]"
          >
            {language === 'zh' ? 'AI First Course —— 从生物肉体到数字超我的六维进化' : 'From Biological Body to Digital SuperEgo: A 6-Dimensional Evolution'}
          </m.p>
        </div>

        {/* 哲学理念提示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 max-w-4xl mx-auto">
          {[
            { icon: <Globe className="w-4 h-4" />, title: 'AI First', desc: '人类定义“Why”，AI 解决“How”。' },
            { icon: <Dna className="w-4 h-4" />, title: 'SuperEgo', desc: '第二大脑是你的参谋长而非仓库。' },
            { icon: <Activity className="w-4 h-4" />, title: 'Agentic', desc: '一人即一家公司，指挥 AI 军团。' }
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
              <div className="w-8 h-8 mx-auto rounded-lg bg-white/5 flex items-center justify-center text-blue-500">{item.icon}</div>
              <h4 className="text-white font-bold text-sm tracking-tight">{item.title}</h4>
              <p className="text-gray-500 text-[10px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 维特鲁威解剖图布局 (Desktop) */}
        <div className="hidden lg:block relative min-h-[900px]">
          {/* 连接连线 (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.2))' }}>
            <g stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none">
              {/* 这里使用固定的连接路径 */}
              <line x1="50%" y1="50%" x2="30%" y2="20%" /> {/* Logic */}
              <line x1="50%" y1="50%" x2="70%" y2="20%" /> {/* Senses */}
              <line x1="50%" y1="50%" x2="20%" y2="60%" /> {/* Body */}
              <line x1="50%" y1="50%" x2="80%" y2="60%" /> {/* Hands */}
              <line x1="50%" y1="50%" x2="50%" y2="85%" /> {/* Will */}
            </g>
          </svg>

          {/* 核心 (Center) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px]">
            <AnatomyCard 
              data={ANATOMY_DATA[0]} 
              isCenter={true} 
              onHover={(pos, color) => setHoverData({ pos, color })} 
            />
          </div>

          {/* 逻辑 (Top Left) */}
          <div className="absolute left-[15%] top-[10%] w-[320px]">
            <AnatomyCard 
              data={ANATOMY_DATA[1]} 
              onHover={(pos, color) => setHoverData({ pos, color })} 
            />
          </div>

          {/* 感官 (Top Right) */}
          <div className="absolute right-[15%] top-[10%] w-[320px]">
            <AnatomyCard 
              data={ANATOMY_DATA[2]} 
              onHover={(pos, color) => setHoverData({ pos, color })} 
            />
          </div>

          {/* 躯干 (Middle Left) */}
          <div className="absolute left-[5%] top-[50%] w-[320px]">
            <AnatomyCard 
              data={ANATOMY_DATA[3]} 
              onHover={(pos, color) => setHoverData({ pos, color })} 
            />
          </div>

          {/* 双手 (Middle Right) */}
          <div className="absolute right-[5%] top-[50%] w-[320px]">
            <AnatomyCard 
              data={ANATOMY_DATA[4]} 
              onHover={(pos, color) => setHoverData({ pos, color })} 
            />
          </div>

          {/* 意志 (Bottom Center) */}
          <div className="absolute left-1/2 bottom-[5%] -translate-x-1/2 w-[320px]">
            <AnatomyCard 
              data={ANATOMY_DATA[5]} 
              onHover={(pos, color) => setHoverData({ pos, color })} 
            />
          </div>
        </div>

        {/* 移动端垂直堆叠 (Mobile) */}
        <div className="lg:hidden space-y-12 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/20 via-blue-500/50 to-blue-500/20 -translate-x-1/2" />
          {ANATOMY_DATA.map((node) => (
            <div key={node.id} className="relative z-10">
              <AnatomyCard 
                data={node} 
                onHover={(pos, color) => setHoverData({ pos, color })} 
              />
            </div>
          ))}
        </div>

        <div className="mt-40 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors group font-mono text-[10px] uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Abort Evolution // Back to Core
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlanetsPage;
