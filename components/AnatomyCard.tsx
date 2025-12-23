
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
      whileHover={{ y: -8, scale: isCenter ? 1.05 : 1.02 }}
      className={`relative h-full cursor-pointer group/card ${isCenter ? 'z-50' : 'z-10'} min-h-[400px]`}
    >
      {/* Dynamic Ambient Glow */}
      <div 
        className="absolute -inset-4 rounded-[3rem] opacity-0 lg:group-hover/card:opacity-100 transition-all duration-1000 blur-[40px] z-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${data.color}20, transparent 70%)` }}
      />

      <div className={`relative bg-black/90 backdrop-blur-3xl border transition-all duration-500 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] h-full flex flex-col shadow-2xl overflow-hidden ${isCenter ? 'border-yellow-500/40' : 'border-white/10'} group-hover/card:border-white/30`}>
        
        {/* Organic Flow Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke={data.color} strokeWidth="0.5" />
          </svg>
        </div>

        {/* Status Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2 h-2 rounded-full animate-ping absolute inset-0 opacity-40" style={{ backgroundColor: data.color }} />
              <div className="w-2 h-2 rounded-full relative" style={{ backgroundColor: data.color }} />
            </div>
            <span className="text-[10px] font-black font-mono uppercase tracking-[0.2em]" style={{ color: data.color }}>
              {data.organ}
            </span>
          </div>
          {isCenter && <Zap className="w-4 h-4 text-yellow-500 fill-current" />}
        </div>

        {/* Identity */}
        <div className="flex items-start gap-4 md:gap-5 mb-6 relative z-10">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl md:text-4xl bg-white/5 border border-white/10 shrink-0">
            {data.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-white text-lg md:text-xl font-black tracking-tighter leading-tight uppercase group-hover/card:text-blue-400 transition-colors">
              {data.name.includes(' —— ') ? data.name.split(' —— ')[1] : data.name}
            </h3>
            <p className="text-gray-500 font-mono text-[8px] uppercase tracking-widest mt-1">Ref: {data.id.toUpperCase()}</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/5 relative z-10 text-xs text-gray-300 italic">
          "{data.metaphor}"
        </div>

        <div className="space-y-4 flex-grow relative z-10">
          {[
            { label: 'Audience', icon: Target, val: data.target, color: 'text-blue-400' },
            { label: 'Protocol', icon: Activity, val: data.method, color: 'text-purple-400' },
            { label: 'Outcome', icon: Trophy, val: data.outcome, color: 'text-green-400' }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <item.icon className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" />
              <div>
                <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">{item.label}</div>
                <div className="text-[11px] md:text-xs text-gray-400 leading-snug">{item.val}</div>
              </div>
            </div>
          ))}
        </div>

        <Link 
          to={data.link}
          onClick={(e) => e.stopPropagation()}
          className="mt-8 flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-xl relative overflow-hidden group/btn"
        >
          <span className="relative z-10">Initiate Expansion</span>
          <ChevronRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </m.div>
  );
};

export default AnatomyCard;
