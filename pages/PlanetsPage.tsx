
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import BioCosmos from '../components/BioCosmos';
import AnatomyCard, { AnatomyNode } from '../components/AnatomyCard';
import MobiusGalaxy from '../components/MobiusGalaxy';
import { ArrowLeft, Activity, Info, Zap } from 'lucide-react';

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
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoverData, setHoverData] = useState<{ pos: { x: number; y: number } | null; color: string | null }>({ pos: null, color: null });

  // 映射课程到旧有的 Mobius 需要的 Course 类型（为了复用 3D 组件）
  const mobiusCourses = ANATOMY_DATA.map(d => ({
    id: d.id,
    title: d.name,
    shortTitle: d.organ,
    color: `from-[${d.color}] to-[#000]`,
    organ: d.organ,
    icon: d.icon,
    // 其他必要字段占位
    tagline: '', description: '', organRole: '', target: '', format: '', duration: '', outcome: '', philosophyMap: { title: '', points: [] }, syllabus: []
  }));

  return (
    <div className="relative min-h-screen bg-[#020308] overflow-x-hidden pt-24 pb-32">
      {/* 1. 粒子底层：BioCosmos 响应悬停能量 */}
      <BioCosmos 
        activeColor={hoverData.color || undefined} 
        activePos={hoverData.pos || undefined} 
      />

      {/* 2. 莫比乌斯环中层：作为能量流缠绕卡片 */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <MobiusGalaxy 
          courses={mobiusCourses}
          orientation="horizontal"
          onSelectCourse={() => {}}
          onHoverCourse={(c) => {
             // 仅作为视觉背景，不处理交互以防冲突
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-24 space-y-4">
          <m.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest"
          >
            <Activity className="w-3 h-3 animate-pulse" />
            Digital Anatomy Terminal
          </m.div>
          <m.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none"
          >
            {language === 'zh' ? '数字生命体：器官架构' : 'Digital Life Form: Anatomy'}
          </m.h1>
        </div>

        {/* 维特鲁威解剖布局 (Desktop) */}
        <div className="hidden lg:block relative min-h-[900px]">
          {/* 核心 (Center) - SuperEgo */}
          <div 
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] transition-all duration-500 ${hoveredId === 'core' ? 'z-[100] scale-110' : 'z-20'}`}
          >
            <AnatomyCard 
              data={ANATOMY_DATA[0]} 
              isCenter={true} 
              onHover={(pos, color) => {
                setHoverData({ pos, color });
                setHoveredId(color ? 'core' : null);
              }} 
            />
          </div>

          {/* 逻辑 (Top Left) */}
          <div className={`absolute left-[12%] top-[10%] w-[320px] transition-all duration-300 ${hoveredId === 'logic' ? 'z-[100]' : 'z-10'}`}>
            <AnatomyCard 
              data={ANATOMY_DATA[1]} 
              onHover={(pos, color) => {
                setHoverData({ pos, color });
                setHoveredId(color ? 'logic' : null);
              }} 
            />
          </div>

          {/* 感官 (Top Right) */}
          <div className={`absolute right-[12%] top-[10%] w-[320px] transition-all duration-300 ${hoveredId === 'senses' ? 'z-[100]' : 'z-10'}`}>
            <AnatomyCard 
              data={ANATOMY_DATA[2]} 
              onHover={(pos, color) => {
                setHoverData({ pos, color });
                setHoveredId(color ? 'senses' : null);
              }} 
            />
          </div>

          {/* 躯干 (Middle Left) */}
          <div className={`absolute left-[5%] top-[50%] w-[320px] transition-all duration-300 ${hoveredId === 'body' ? 'z-[100]' : 'z-10'}`}>
            <AnatomyCard 
              data={ANATOMY_DATA[3]} 
              onHover={(pos, color) => {
                setHoverData({ pos, color });
                setHoveredId(color ? 'body' : null);
              }} 
            />
          </div>

          {/* 双手 (Middle Right) */}
          <div className={`absolute right-[5%] top-[50%] w-[320px] transition-all duration-300 ${hoveredId === 'hands' ? 'z-[100]' : 'z-10'}`}>
            <AnatomyCard 
              data={ANATOMY_DATA[4]} 
              onHover={(pos, color) => {
                setHoverData({ pos, color });
                setHoveredId(color ? 'hands' : null);
              }} 
            />
          </div>

          {/* 意志 (Bottom Center) */}
          <div className={`absolute left-1/2 bottom-[5%] -translate-x-1/2 w-[320px] transition-all duration-300 ${hoveredId === 'will' ? 'z-[100]' : 'z-10'}`}>
            <AnatomyCard 
              data={ANATOMY_DATA[5]} 
              onHover={(pos, color) => {
                setHoverData({ pos, color });
                setHoveredId(color ? 'will' : null);
              }} 
            />
          </div>
          
          {/* 装饰连线 */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <g stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="4 4">
              <line x1="50%" y1="50%" x2="25%" y2="20%" />
              <line x1="50%" y1="50%" x2="75%" y2="20%" />
              <line x1="50%" y1="50%" x2="15%" y2="60%" />
              <line x1="50%" y1="50%" x2="85%" y2="60%" />
              <line x1="50%" y1="50%" x2="50%" y2="85%" />
            </g>
          </svg>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden space-y-8 relative">
          {ANATOMY_DATA.map((node) => (
            <AnatomyCard 
              key={node.id}
              data={node} 
              onHover={(pos, color) => setHoverData({ pos, color })} 
            />
          ))}
        </div>

        <div className="mt-40 text-center">
          <Link to="/" className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all font-mono text-xs uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Terminate Protocol // Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlanetsPage;
