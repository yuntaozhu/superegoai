
import React, { useState } from 'react';
import { Copy, Play, Check, Terminal, Zap } from 'lucide-react';

interface PromptBlockProps {
  code: string;
  language?: string;
}

const PromptBlock: React.FC<PromptBlockProps> = ({ code, language = 'text' }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    const encoded = encodeURIComponent(code);
    window.location.hash = `/studio?prompt=${encoded}`;
  };

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-[#05060f] group shadow-2xl transition-all hover:border-blue-500/30">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-[9px] font-black font-mono text-gray-500 uppercase tracking-widest">{language === 'text' ? 'PROMPT_SNIPPET' : language}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={handleCopy}
            className="p-1.5 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-all"
            title="Copy to Clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <div className="w-px h-3 bg-white/10 mx-1" />
          <button 
            onClick={handleRun}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
          >
            <Zap className="w-2.5 h-2.5 fill-current" />
            Inject to AI
          </button>
        </div>
      </div>
      <div className="p-6 overflow-x-auto custom-scrollbar bg-black/40">
        <pre className="font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
          {code}
        </pre>
      </div>
      <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between opacity-40">
         <span className="text-[8px] font-mono text-gray-600 uppercase">SuperEgo_Prompt_System_V5</span>
         <span className="text-[8px] font-mono text-gray-600 uppercase">Ready_to_Execute</span>
      </div>
    </div>
  );
};

export default PromptBlock;
