
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '../context/LanguageContext';
import { ChevronRight, Target, Zap, Activity } from 'lucide-react';

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
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="relative h-full"
    >
      {/* 悬停光晕 */}
      <div 
        className="absolute -inset-2 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-all duration-700 blur-3xl z-0"
        style={{ background: `radial-gradient(circle at center, ${data.color}40, transparent)` }}
      />

      <div className={`relative bg-black/80 backdrop-blur-2xl border ${isCenter ? 'border-yellow-500/40' : 'border-white/10'} p-6 rounded-[2.5rem] h-full flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden group hover:border-white/30 transition-all duration-500`}>
        
        {/* 指示灯 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: data.color }} />
            <span className="text-[9px] font-black font-mono uppercase tracking-[0.2em]" style={{ color: data.color }}>
              {data.organ}
            </span>
          </div>
          {isCenter && <Zap className="w-3.5 h-3.5 text-yellow-500" />}
        </div>

        {/* 标题 */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner bg-white/5 border border-white/5">
            {data.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-white text-lg font-black tracking-tighter leading-tight uppercase group-hover:text-blue-400 transition-colors">
              {data.name}
            </h3>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-3 mb-5 border border-white/5">
          <p className="text-gray-300 text-[11px] italic leading-relaxed">
            "{data.metaphor}"
          </p>
        </div>

        {/* 详细描述 */}
        <div className="space-y-3 flex-grow">
          <div className="flex gap-3 items-start">
            <div className="mt-1 p-1 rounded bg-white/5 text-gray-500">
              <Target className="w-3 h-3" />
            </div>
            <div>
              <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Audience</div>
              <div className="text-[11px] text-gray-400 group-hover:text-gray-200 transition-colors">{data.target}</div>
            </div>
          </div>
          
          <div className="flex gap-3 items-start">
            <div className="mt-1 p-1 rounded bg-white/5 text-gray-500">
              <Activity className="w-3 h-3" />
            </div>
            <div>
              <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Protocol</div>
              <div className="text-[11px] text-gray-400 group-hover:text-gray-200 transition-colors">{data.method}</div>
            </div>
          </div>
        </div>

        {/* 按钮 */}
        <Link 
          to={data.link}
          className="mt-6 flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white text-black font-black text-[9px] uppercase tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-all shadow-xl"
        >
          <span>Initiate Expansion</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </m.div>
  );
};

export default AnatomyCard;
