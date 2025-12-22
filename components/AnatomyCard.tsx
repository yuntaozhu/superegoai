
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '../context/LanguageContext';
import { ChevronRight, Target, Zap, Award, Activity } from 'lucide-react';

const m = motion as any;

export interface AnatomyNode {
  id: string;
  organ: string;
  name: string;
  metaphor: string;
  target: string;
  method: string;
  outcome: string;
  link: string;
  color: string;
  icon: string;
}

interface AnatomyCardProps {
  data: AnatomyNode;
  isCenter?: boolean;
  onHover: (pos: { x: number; y: number } | null, color: string | null) => void;
}

const AnatomyCard: React.FC<AnatomyCardProps> = ({ data, isCenter, onHover }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      onHover({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }, data.color);
    }
  };

  return (
    <m.div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => onHover(null, null)}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="relative h-full"
    >
      {/* 核心光晕层 */}
      <div 
        className="absolute -inset-1 rounded-[2rem] opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl z-0"
        style={{ background: `radial-gradient(circle at center, ${data.color}80, transparent)` }}
      />

      <div className={`relative bg-[#0a0c14]/90 backdrop-blur-3xl border ${isCenter ? 'border-yellow-500/30' : 'border-white/10'} p-6 rounded-[2.5rem] h-full flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group hover:border-white/40 transition-all duration-500`}>
        
        {/* 顶部标签 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ backgroundColor: data.color }} />
            <span className="text-[10px] font-black font-mono uppercase tracking-[0.2em]" style={{ color: data.color }}>
              {data.organ}
            </span>
          </div>
          {isCenter && (
             <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />
          )}
        </div>

        {/* 标题与图标 */}
        <div className="flex items-start gap-4 mb-6">
          <div 
            className="w-16 h-16 rounded-3xl flex items-center justify-center text-4xl shadow-2xl border border-white/5 bg-gradient-to-br from-white/10 to-transparent"
          >
            {data.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-white text-xl font-black tracking-tighter leading-tight uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400">
              {data.name}
            </h3>
          </div>
        </div>

        <div className="bg-black/40 rounded-2xl p-4 mb-6 border border-white/5">
          <p className="text-gray-300 text-xs italic leading-relaxed font-light">
            "{data.metaphor}"
          </p>
        </div>

        {/* 详细信息面板 */}
        <div className="space-y-4 flex-grow">
          <div className="flex gap-3 items-start group/info">
            <div className="mt-1 p-1 rounded-md bg-white/5 text-gray-500 group-hover/info:text-white transition-colors">
              <Target className="w-3 h-3" />
            </div>
            <div>
              <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Target Audience</div>
              <div className="text-[11px] text-gray-400 group-hover:text-gray-200 transition-colors">{data.target}</div>
            </div>
          </div>
          
          <div className="flex gap-3 items-start group/info">
            <div className="mt-1 p-1 rounded-md bg-white/5 text-gray-500 group-hover/info:text-white transition-colors">
              <Zap className="w-3 h-3" />
            </div>
            <div>
              <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Evolution Method</div>
              <div className="text-[11px] text-gray-400 group-hover:text-gray-200 transition-colors">{data.method}</div>
            </div>
          </div>
        </div>

        {/* 交互按钮 */}
        <Link 
          to={data.link}
          className="mt-8 flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-all shadow-xl active:scale-95"
        >
          <span>Initiate Evolution</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
        
        {/* 背景修饰 */}
        <div className="absolute -bottom-4 -right-4 opacity-[0.03] pointer-events-none rotate-12">
          <Activity className="w-32 h-32 text-white" />
        </div>
      </div>
    </m.div>
  );
};

export default AnatomyCard;
