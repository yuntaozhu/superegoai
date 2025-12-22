
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '../context/LanguageContext';
import { ChevronRight, Target, Zap, Award } from 'lucide-react';

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
      whileHover={{ scale: 1.05, y: -5 }}
      className={`relative group ${isCenter ? 'z-20' : 'z-10'}`}
    >
      {/* 动态边框发光 */}
      <div 
        className="absolute -inset-0.5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"
        style={{ background: `radial-gradient(circle at center, ${data.color}, transparent)` }}
      />

      <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] h-full flex flex-col shadow-2xl overflow-hidden group-hover:border-white/30 transition-all">
        {/* 背景装饰图案 */}
        <div className="absolute top-0 right-0 p-4 opacity-5 font-mono text-xs uppercase tracking-widest pointer-events-none">
          {data.organ}
        </div>

        <div className="flex items-start gap-4 mb-6">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/5"
            style={{ backgroundColor: `${data.color}20` }}
          >
            {data.icon}
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-bold" style={{ color: data.color }}>
              {data.organ}
            </span>
            <h3 className="text-white text-lg font-black tracking-tight leading-tight uppercase">
              {data.name}
            </h3>
          </div>
        </div>

        <p className="text-gray-400 text-xs italic mb-6 leading-relaxed">
          "{data.metaphor}"
        </p>

        {/* 悬停展开的信息区 */}
        <div className="space-y-4 flex-grow opacity-60 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-3 items-start">
            <Target className="w-3.5 h-3.5 mt-0.5" style={{ color: data.color }} />
            <div>
              <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Target</div>
              <div className="text-[11px] text-gray-200">{data.target}</div>
            </div>
          </div>
          
          <div className="flex gap-3 items-start">
            <Zap className="w-3.5 h-3.5 mt-0.5" style={{ color: data.color }} />
            <div>
              <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Method</div>
              <div className="text-[11px] text-gray-200">{data.method}</div>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <Award className="w-3.5 h-3.5 mt-0.5" style={{ color: data.color }} />
            <div>
              <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Outcome</div>
              <div className="text-[11px] text-gray-200">{data.outcome}</div>
            </div>
          </div>
        </div>

        <Link 
          to={data.link}
          className="mt-8 flex items-center justify-between group/btn py-3 px-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white text-white hover:text-black transition-all"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Initiate Evolution</span>
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </m.div>
  );
};

export default AnatomyCard;
