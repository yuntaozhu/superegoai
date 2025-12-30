
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, FileText, Search, User, Eye } from 'lucide-react';

export type ActiveNodeType = 'user' | 'agent' | 'retriever' | 'summarizer' | 'vector_db' | 'observability' | null;

interface ArchitectureMapProps {
  activeNode: ActiveNodeType;
}

const Node = ({ 
  id, 
  icon: Icon, 
  label, 
  isActive, 
  color 
}: { 
  id: string, 
  icon: any, 
  label: string, 
  isActive: boolean, 
  color: string 
}) => (
  <motion.div
    layout
    animate={{ 
      scale: isActive ? 1.1 : 1,
      boxShadow: isActive ? `0 0 20px ${color}` : 'none',
      borderColor: isActive ? color : 'rgba(255,255,255,0.1)'
    }}
    transition={{ duration: 0.3 }}
    className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-[#0B1026] border border-white/10 w-24 h-24 md:w-32 md:h-32 relative z-10 transition-colors`}
  >
    <Icon className={`w-8 h-8 mb-2 transition-colors ${isActive ? 'text-white' : 'text-gray-500'}`} style={{ color: isActive ? color : undefined }} />
    <span className={`text-[10px] font-mono uppercase tracking-widest text-center transition-colors ${isActive ? 'text-white' : 'text-gray-600'}`}>{label}</span>
    
    {isActive && (
      <motion.div 
        layoutId="active-ring"
        className="absolute inset-0 border-2 rounded-2xl"
        style={{ borderColor: color }}
        transition={{ duration: 0.3 }}
      />
    )}
  </motion.div>
);

const Connection = ({ active, color, vertical = false }: { active: boolean, color: string, vertical?: boolean }) => (
  <div className={`relative flex-1 ${vertical ? 'w-full h-8' : 'h-full w-8'} flex items-center justify-center`}>
    <div className={`${vertical ? 'w-0.5 h-full' : 'h-0.5 w-full'} bg-white/5`}>
      <motion.div 
        animate={{ 
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0
        }}
        className={`w-full h-full bg-gradient-to-r ${vertical ? 'from-transparent via-current to-transparent' : 'from-transparent via-current to-transparent'}`}
        style={{ color: color }}
      />
    </div>
  </div>
);

const ArchitectureMap: React.FC<ArchitectureMapProps> = ({ activeNode }) => {
  return (
    <div className="w-full bg-[#05060f] border-b border-white/10 p-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 relative z-10">
        
        {/* Top Row: User -> Agent -> Observability */}
        <div className="flex items-center gap-8 w-full justify-center">
          <Node 
            id="user" 
            icon={User} 
            label="User" 
            isActive={activeNode === 'user'} 
            color="#3b82f6" 
          />
          
          <Connection active={activeNode === 'user' || activeNode === 'agent'} color="#3b82f6" />
          
          <div className="relative">
            <Node 
                id="agent" 
                icon={Brain} 
                label="Agentic Layer" 
                isActive={activeNode === 'agent' || activeNode === 'retriever' || activeNode === 'summarizer'} 
                color="#a855f7" 
            />
            {/* Thinking Pulse */}
            {(activeNode === 'agent' || activeNode === 'retriever' || activeNode === 'summarizer') && (
                <div className="absolute -top-2 -right-2">
                    <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                    </span>
                </div>
            )}
          </div>

          <Connection active={true} color="#10b981" />

          <Node 
            id="observability" 
            icon={Eye} 
            label="Observability" 
            isActive={true} 
            color="#10b981" 
          />
        </div>

        {/* Vertical Connectors */}
        <div className="flex w-full justify-center gap-32 h-8">
           {/* Agent to Tools */}
           <div className="w-0.5 h-full bg-white/10 relative">
              <motion.div animate={{ height: (activeNode === 'retriever' || activeNode === 'summarizer') ? '100%' : '0%' }} className="absolute top-0 w-full bg-purple-500" />
           </div>
        </div>

        {/* Bottom Row: Tools */}
        <div className="flex items-center gap-12 justify-center">
           <div className="flex flex-col items-center gap-4">
              <Node 
                id="retriever" 
                icon={Search} 
                label="Retriever Tool" 
                isActive={activeNode === 'retriever' || activeNode === 'vector_db'} 
                color="#f59e0b" 
              />
              <div className="h-4 w-0.5 bg-white/10 relative">
                 <motion.div animate={{ height: activeNode === 'vector_db' ? '100%' : '0%' }} className="absolute top-0 w-full bg-orange-500" />
              </div>
              <Node 
                id="vector_db" 
                icon={Database} 
                label="Vector DB" 
                isActive={activeNode === 'vector_db'} 
                color="#ef4444" 
              />
           </div>

           <div className="flex flex-col items-center">
              <Node 
                id="summarizer" 
                icon={FileText} 
                label="Summarizer Tool" 
                isActive={activeNode === 'summarizer'} 
                color="#06b6d4" 
              />
           </div>
        </div>

      </div>
    </div>
  );
};

export default ArchitectureMap;
