
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TraceStep } from '../hooks/useGeminiBrain';
import { Terminal, Clock, DollarSign, ChevronRight, ChevronDown, Activity, Code } from 'lucide-react';

interface TraceInspectorProps {
  traces: TraceStep[];
}

const TraceItem = ({ step, index }: { step: TraceStep, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'input': return 'text-blue-400';
      case 'reasoning': return 'text-purple-400';
      case 'tool_execution': return 'text-orange-400';
      case 'tool_result': return 'text-emerald-400';
      case 'output': return 'text-white';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="border-b border-white/5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors group"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded bg-white/5 text-[10px] font-mono text-gray-500">
            {index + 1}
          </div>
          <div className="flex flex-col items-start truncate">
            <span className={`text-[10px] font-black uppercase tracking-widest ${getTypeColor(step.type)}`}>
              {step.name}
            </span>
            <span className="text-xs text-gray-400 truncate w-full text-left font-mono">
              {step.type === 'tool_execution' ? `call: ${step.content.slice(0, 20)}...` : step.content.slice(0, 30) + (step.content.length > 30 ? '...' : '')}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {step.latency && (
            <span className="text-[9px] font-mono text-gray-600 bg-white/5 px-1.5 py-0.5 rounded flex items-center gap-1">
              <Clock className="w-2 h-2" /> {step.latency}ms
            </span>
          )}
          {isOpen ? <ChevronDown className="w-3 h-3 text-gray-500" /> : <ChevronRight className="w-3 h-3 text-gray-500" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-black/40"
          >
            <div className="p-3 space-y-3">
              <div className="flex items-center gap-4 text-[9px] font-mono text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Duration: {step.latency || 0}ms</span>
                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> Tokens: {step.tokens || 0}</span>
                <span className="flex items-center gap-1"><Code className="w-3 h-3" /> Model: Gemini 1.5</span>
              </div>
              
              <div className="space-y-1">
                <span className="text-[9px] text-blue-500 font-bold block">PAYLOAD</span>
                <pre className="text-[10px] text-gray-300 font-mono bg-[#05060f] p-2 rounded border border-white/10 overflow-x-auto custom-scrollbar">
                  {typeof step.metadata === 'object' ? JSON.stringify(step.metadata, null, 2) : step.content}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TraceInspector: React.FC<TraceInspectorProps> = ({ traces }) => {
  return (
    <div className="flex flex-col h-full bg-[#020205] border-l border-white/5">
      <div className="p-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
          <Activity className="w-3 h-3 text-emerald-500" /> Live Traces
        </span>
        <div className="flex gap-1">
           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
           <span className="text-[9px] font-mono text-emerald-500">Connected</span>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        {traces.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-20 p-8 text-center">
            <Terminal className="w-12 h-12 mb-2" />
            <span className="text-[10px] uppercase tracking-widest">No Active Trace</span>
            <p className="text-[9px] mt-2 font-mono">Initiate a request to see the agent's thought process.</p>
          </div>
        ) : (
          <div>
             {traces.map((step, i) => (
               <TraceItem key={step.id} step={step} index={i} />
             ))}
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-white/5 bg-white/[0.02] text-center">
        <span className="text-[9px] font-mono text-gray-600">Powered by Opik Observability Design</span>
      </div>
    </div>
  );
};

export default TraceInspector;
