
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const m = motion as any;

interface Source {
  title: string;
  url: string;
}

interface GroundingSourcesProps {
  sources: Source[];
}

const GroundingSources: React.FC<GroundingSourcesProps> = ({ sources }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-white/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full group py-1 focus:outline-none"
      >
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 group-hover:text-blue-400 transition-colors uppercase tracking-widest">
          <Globe className="w-3 h-3" /> 
          {language === 'zh' ? '参考来源' : 'Grounding Sources'}
          <span className="ml-2 px-1.5 py-0.5 rounded-md bg-white/5 text-[8px] font-mono group-hover:bg-blue-500/20 transition-colors">
            {sources.length}
          </span>
        </div>
        <ChevronDown className={`w-3 h-3 text-gray-600 group-hover:text-blue-400 transition-all ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2 mt-3 pb-2">
              {sources.map((source, idx) => (
                <a 
                  key={idx} 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 border border-transparent hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group/link shadow-sm"
                >
                  <div className="mt-1">
                    <ExternalLink className="w-2.5 h-2.5 text-gray-600 group-hover/link:text-blue-400 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold text-gray-300 group-hover/link:text-white truncate transition-colors">
                      {source.title}
                    </div>
                    <div className="text-[9px] text-gray-600 truncate font-mono mt-0.5">
                      {source.url}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GroundingSources;
