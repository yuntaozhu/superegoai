
import React, { useState, useEffect, useRef } from 'react';
import { 
  Info, AlertTriangle, CheckCircle, Lightbulb, 
  ChevronRight, Copy, Check, Terminal 
} from 'lucide-react';
import { Link } from '../context/LanguageContext';

/**
 * 1. Callout Component
 * Supports info, tip (idea), warning, and error (danger) states.
 */
export const Callout: React.FC<{ type?: 'info' | 'warning' | 'error' | 'success' | 'idea'; children: React.ReactNode }> = ({ type = 'info', children }) => {
  const styles = {
    info: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: <Info className="w-5 h-5 text-blue-400" />, title: 'Note' },
    warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />, title: 'Warning' },
    error: { bg: 'bg-red-500/10', border: 'border-red-500/20', icon: <AlertTriangle className="w-5 h-5 text-red-400" />, title: 'Important' },
    success: { bg: 'bg-green-500/10', border: 'border-green-500/20', icon: <CheckCircle className="w-5 h-5 text-green-400" />, title: 'Success' },
    idea: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: <Lightbulb className="w-5 h-5 text-purple-400" />, title: 'Tip' },
  };

  const style = styles[type] || styles.info;

  return (
    <div className={`my-6 p-5 rounded-2xl border ${style.bg} ${style.border} flex gap-4 overflow-hidden relative group`}>
      <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
      <div className="flex-grow">
         <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">{style.title}</div>
         <div className="text-sm leading-relaxed text-gray-300 mdx-callout-content">
            {children}
         </div>
      </div>
    </div>
  );
};

/**
 * 2. Card & Cards System
 * Interactive navigation grid items.
 */
export const Card: React.FC<{ title: string; href: string; children?: React.ReactNode; icon?: React.ReactNode }> = ({ title, href, children, icon }) => (
  <Link to={href} className="group block p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-lg hover:shadow-blue-500/10">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-white/5 rounded-lg group-hover:bg-blue-600/20 transition-colors">
        {icon || <Terminal className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />}
      </div>
      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-transform group-hover:translate-x-1" />
    </div>
    <h4 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h4>
    <div className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-light">
      {children}
    </div>
  </Link>
);

export const Cards: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
    {children}
  </div>
);

/**
 * 3. Steps Component
 * Visual vertical sequence.
 */
export const Steps: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mdx-steps my-10 ml-4 border-l border-white/10 pl-10 space-y-10 relative">
    {children}
  </div>
);

/**
 * 4. CopyButton & Code Integration with Syntax Highlighting
 */
export const CodeBlock: React.FC<{ children: string; language?: string }> = ({ children, language = 'text' }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (codeRef.current && (window as any).Prism) {
      (window as any).Prism.highlightElement(codeRef.current);
    }
  }, [children, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-white/10 bg-[#05060f] group shadow-2xl transition-all hover:border-blue-500/30">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-[9px] font-black font-mono text-gray-500 uppercase tracking-widest">{language}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 px-2.5 py-1 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider"
        >
          {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="p-6 overflow-x-auto custom-scrollbar bg-black/40">
        <pre className={`language-${language} !m-0 !p-0 !bg-transparent`}>
          <code ref={codeRef} className={`language-${language} font-mono text-sm leading-relaxed whitespace-pre`}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
};

/**
 * 5. PromptAnatomy Component
 * Visual breakdown of a prompt's structure.
 */
export const PromptAnatomy: React.FC<{ instruction?: string; context?: string; data?: string; indicator?: string }> = ({ 
  instruction, context, data, indicator 
}) => (
  <div className="my-8 rounded-2xl border border-white/10 bg-white/5 overflow-hidden font-mono text-xs">
    <div className="px-4 py-2 border-b border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-widest text-gray-500">
      Prompt Structure Analysis
    </div>
    <div className="p-6 space-y-4">
      {instruction && (
        <div className="flex gap-4">
          <div className="w-20 flex-shrink-0 text-blue-500 font-bold uppercase tracking-tighter">Instruction</div>
          <div className="text-gray-300">{instruction}</div>
        </div>
      )}
      {context && (
        <div className="flex gap-4">
          <div className="w-20 flex-shrink-0 text-purple-500 font-bold uppercase tracking-tighter">Context</div>
          <div className="text-gray-300">{context}</div>
        </div>
      )}
      {data && (
        <div className="flex gap-4">
          <div className="w-20 flex-shrink-0 text-cyan-500 font-bold uppercase tracking-tighter">Data</div>
          <div className="text-gray-300">{data}</div>
        </div>
      )}
      {indicator && (
        <div className="flex gap-4">
          <div className="w-20 flex-shrink-0 text-amber-500 font-bold uppercase tracking-tighter">Indicator</div>
          <div className="text-gray-300">{indicator}</div>
        </div>
      )}
    </div>
  </div>
);

/**
 * 6. MDX Component Map
 * The glue that connects standard markdown to enhanced React components.
 */
export const MdxComponents = {
  h1: (props: any) => <h1 className="text-4xl font-black mb-10 uppercase tracking-tighter text-white" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-16 mb-6 border-b border-white/5 pb-2 text-white flex items-center gap-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-10 mb-4 text-blue-400" {...props} />,
  p: (props: any) => <p className="mb-6 text-gray-400 font-light leading-relaxed text-base" {...props} />,
  ul: (props: any) => <ul className="list-disc list-outside ml-6 mb-8 space-y-3 text-gray-400 font-light" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-outside ml-6 mb-8 space-y-3 text-gray-400 font-light" {...props} />,
  li: (props: any) => <li className="pl-2" {...props} />,
  blockquote: (props: any) => <Callout type="info">{props.children}</Callout>,
  code: (props: any) => {
    // Check if it's a block or inline
    const isBlock = props.className?.includes('language-');
    if (isBlock) {
      const lang = props.className.replace('language-', '');
      return <CodeBlock language={lang}>{props.children}</CodeBlock>;
    }
    return <code className="bg-white/10 text-blue-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />;
  },
  Callout,
  Card,
  Cards,
  Steps,
  PromptAnatomy
};
