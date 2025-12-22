
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '../context/LanguageContext';
import { ChevronRight, Target, Zap, Activity, Trophy } from 'lucide-react';

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
  onClick?: () => void;
}

const AnatomyCard: React.FC<AnatomyCardProps> = ({ data, isCenter, onHover, onClick }) => {
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
      onClick={onClick}
      whileHover={{ y: -12, scale: isCenter ? 1.12 : 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
      className={`relative h-full cursor-pointer group/card ${isCenter ? 'z-50' : 'z-10'}`}
    >
      {/* Dynamic Ambient Glow */}
      <div 
        className="absolute -inset-4 rounded-[3rem] opacity-0 group-hover/card:opacity-100 transition-all duration-1000 blur-[40px] z-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${data.color}30, transparent 70%)` }}
      />

      <div className={`relative bg-black/85 backdrop-blur-3xl border transition-all duration-500 p-7 rounded-[2.5rem] h-full flex flex-col shadow-[0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden ${isCenter ? 'border-yellow-500/30' : 'border-white/10'} group-hover/card:border-white/40`}>
        
        {/* Organic Flow Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke={data.color} strokeWidth="0.5" />
            <path d="M0,30 Q25,55 50,30 T100,30" fill="none" stroke={data.color} strokeWidth="0.5" />
          </svg>
        </div>

        {/* Status Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2 h-2 rounded-full animate-ping absolute inset-0 opacity-40" style={{ backgroundColor: data.color }} />
              <div className="w-2 h-2 rounded-full relative" style={{ backgroundColor: data.color }} />
            </div>
            <span className="text-[10px] font-black font-mono uppercase tracking-[0.25em]" style={{ color: data.color }}>
              {data.organ}
            </span>
          </div>
          {isCenter && (
            <div className="px-2 py-0.5 rounded-md bg-yellow-500/10 border border-yellow-500/20">
              <Zap className="w-3 h-3 text-yellow-500 fill-current" />
            </div>
          )}
        </div>

        {/* Brand/Identity Section */}
        <div className="flex items-start gap-5 mb-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner bg-white/5 border border-white/10 group-hover/card:scale-110 transition-transform duration-500 shrink-0">
            {data.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-white text-xl font-black tracking-tighter leading-tight uppercase group-hover/card:text-blue-400 transition-colors">
              {data.name.includes(' —— ') ? data.name.split(' —— ')[1] : data.name}
            </h3>
            <p className="text-gray-500 font-mono text-[9px] uppercase tracking-widest mt-1">Ref: Node_{data.id.toUpperCase()}</p>
          </div>
        </div>

        {/* Metaphor Quote */}
        <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/5 relative z-10">
          <p className="text-gray-300 text-[12px] italic leading-relaxed font-light">
            "{data.metaphor}"
          </p>
        </div>

        {/* Content Modules */}
        <div className="space-y-4 flex-grow relative z-10">
          <div className="flex gap-4 items-start group/item">
            <div className="mt-1 p-1.5 rounded-lg bg-white/5 text-gray-500 group-hover/card:text-blue-400 transition-colors">
              <Target className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">Audience</div>
              <div className="text-[12px] text-gray-400 group-hover/card:text-gray-200 transition-colors leading-snug">{data.target}</div>
            </div>
          </div>
          
          <div className="flex gap-4 items-start group/item">
            <div className="mt-1 p-1.5 rounded-lg bg-white/5 text-gray-500 group-hover/card:text-purple-400 transition-colors">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">Protocol</div>
              <div className="text-[12px] text-gray-400 group-hover/card:text-gray-200 transition-colors leading-snug">{data.method}</div>
            </div>
          </div>

          <div className="flex gap-4 items-start group/item">
            <div className="mt-1 p-1.5 rounded-lg bg-white/5 text-gray-500 group-hover/card:text-green-400 transition-colors">
              <Trophy className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">Outcome</div>
              <div className="text-[12px] text-gray-400 group-hover/card:text-gray-200 transition-colors leading-snug">{data.outcome}</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link 
          to={data.link}
          onClick={(e) => e.stopPropagation()}
          className="mt-8 flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-[0.25em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl relative overflow-hidden group/btn"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10">Initiate Expansion</span>
          <ChevronRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </m.div>
  );
};

export default AnatomyCard;
