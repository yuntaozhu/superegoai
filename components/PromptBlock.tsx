import React, { useState } from 'react';
import { Copy, Play, Check, Terminal } from 'lucide-react';

interface PromptBlockProps {
  code: string;
  language?: string;
}

const PromptBlock: React.FC<PromptBlockProps> = ({ code, language = 'markdown' }) => {
  const [copied, setCopied] = useState(false);
  // Fix: Removed useNavigate since it is not exported from LanguageContext and not used in the component logic.
  
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
    <div className="my-6 rounded-2xl overflow-hidden border border-white/10 bg-black/40 group shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-3 h-3 text-blue-500" />
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{language}</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={handleCopy}
            className="p-1.5 hover:bg-white/5 rounded-md text-gray-500 hover:text-white transition-all"
            title="Copy Prompt"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button 
            onClick={handleRun}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white rounded-md text-[10px] font-black uppercase transition-all"
          >
            <Play className="w-2.5 h-2.5 fill-current" />
            Run
          </button>
        </div>
      </div>
      <div className="p-6 overflow-x-auto custom-scrollbar">
        <pre className="font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
          {code}
        </pre>
      </div>
    </div>
  );
};

export default PromptBlock;