
import React from 'react';
import { 
  Info, AlertTriangle, CheckCircle, Lightbulb, 
  ChevronRight, Terminal, BookOpen, Quote
} from 'lucide-react';
import { Link } from '../context/LanguageContext';
import PromptBlock from './PromptBlock';

/**
 * 1. Callout Component
 * Supports info, tip (idea), warning, and error (danger) states.
 */
export const Callout: React.FC<{ type?: 'info' | 'warning' | 'error' | 'success' | 'idea'; children: React.ReactNode }> = ({ type = 'info', children }) => {
  const styles = {
    info: { bg: 'bg-blue-500/5', border: 'border-blue-500/20', icon: <Info className="w-5 h-5 text-blue-400" />, title: 'Note', titleColor: 'text-blue-400' },
    warning: { bg: 'bg-amber-500/5', border: 'border-amber-500/20', icon: <AlertTriangle className="w-5 h-5 text-amber-400" />, title: 'Warning', titleColor: 'text-amber-400' },
    error: { bg: 'bg-red-500/5', border: 'border-red-500/20', icon: <AlertTriangle className="w-5 h-5 text-red-400" />, title: 'Important', titleColor: 'text-red-400' },
    success: { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', icon: <CheckCircle className="w-5 h-5 text-emerald-400" />, title: 'Success', titleColor: 'text-emerald-400' },
    idea: { bg: 'bg-purple-500/5', border: 'border-purple-500/20', icon: <Lightbulb className="w-5 h-5 text-purple-400" />, title: 'Tip', titleColor: 'text-purple-400' },
  };

  const style = styles[type] || styles.info;

  return (
    <div className={`my-8 p-5 rounded-2xl border ${style.bg} ${style.border} flex gap-4 overflow-hidden relative shadow-sm`}>
      <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
      <div className="flex-grow">
         <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${style.titleColor}`}>{style.title}</div>
         <div className="text-sm md:text-base leading-relaxed text-gray-300 mdx-callout-content font-light">
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
  <Link to={href} className="group block p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/40 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/10 h-full flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2.5 bg-black/20 rounded-xl group-hover:bg-blue-600/20 transition-colors border border-white/5">
        {icon || <Terminal className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />}
      </div>
      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-transform group-hover:translate-x-1" />
    </div>
    <h4 className="text-base md:text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h4>
    <div className="text-xs md:text-sm text-gray-400 leading-relaxed font-light flex-grow">
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
  <div className="mdx-steps my-12 ml-4 border-l-2 border-white/10 pl-8 space-y-12 relative">
    {children}
  </div>
);

/**
 * 4. PromptAnatomy Component
 * Visual breakdown of a prompt's structure.
 */
export const PromptAnatomy: React.FC<{ instruction?: string; context?: string; data?: string; indicator?: string }> = ({ 
  instruction, context, data, indicator 
}) => (
  <div className="my-10 rounded-2xl border border-white/10 bg-[#05060f] overflow-hidden shadow-2xl">
    <div className="px-5 py-3 border-b border-white/10 bg-white/5 flex items-center gap-2">
      <BookOpen className="w-3.5 h-3.5 text-blue-500" />
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        Prompt Anatomy
      </span>
    </div>
    <div className="p-6 space-y-6 font-mono text-xs md:text-sm">
      {instruction && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
          <div className="w-24 flex-shrink-0 text-blue-400 font-bold uppercase tracking-wider text-[10px] pt-1">Instruction</div>
          <div className="text-gray-300 leading-relaxed">{instruction}</div>
        </div>
      )}
      {context && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
          <div className="w-24 flex-shrink-0 text-purple-400 font-bold uppercase tracking-wider text-[10px] pt-1">Context</div>
          <div className="text-gray-300 leading-relaxed opacity-90">{context}</div>
        </div>
      )}
      {data && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
          <div className="w-24 flex-shrink-0 text-cyan-400 font-bold uppercase tracking-wider text-[10px] pt-1">Data</div>
          <div className="text-gray-300 leading-relaxed bg-white/5 p-2 rounded border border-white/5">{data}</div>
        </div>
      )}
      {indicator && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
          <div className="w-24 flex-shrink-0 text-amber-400 font-bold uppercase tracking-wider text-[10px] pt-1">Indicator</div>
          <div className="text-gray-300 leading-relaxed">{indicator}</div>
        </div>
      )}
    </div>
  </div>
);

/**
 * 5. MDX Component Map
 * The glue that connects standard markdown to enhanced React components.
 */
export const MdxComponents = {
  h1: (props: any) => (
    <h1 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter text-white uppercase relative inline-block leading-tight" {...props}>
      <span className="relative z-10">{props.children}</span>
      <span className="absolute -bottom-3 left-0 w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
    </h1>
  ),
  h2: (props: any) => (
    <h2 className="text-2xl md:text-3xl font-bold mt-20 mb-8 text-white flex items-center gap-3 border-l-4 border-blue-500 pl-4 py-1" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-lg md:text-xl font-bold mt-12 mb-4 text-blue-400 flex items-center gap-2" {...props}>
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
      {props.children}
    </h3>
  ),
  p: (props: any) => (
    <p className="mb-6 text-gray-300 font-light leading-7 md:leading-8 text-base md:text-lg" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-none ml-2 md:ml-4 mb-8 space-y-3 text-gray-300 font-light" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-outside ml-6 md:ml-8 mb-8 space-y-3 text-gray-300 font-light marker:text-blue-500 marker:font-bold" {...props} />
  ),
  li: (props: any) => (
    // Check if children is a string starting with a dash, though MDX usually handles this.
    // We add a custom bullet for UL items
    <li className="relative pl-6" {...props}>
      {/* Hacky way to detect if it's an ordered list item (handled by parent OL marker) or unordered */}
      <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-blue-500 transition-colors" />
      <span className="group-hover:text-white transition-colors">{props.children}</span>
    </li>
  ),
  // Override li for ordered lists specifically if needed, but CSS marker is cleaner for OL.
  // MDX mapping is simple, so we rely on the parent UL/OL to style or simple discriminators.
  // Since we can't easily differentiate context here, let's keep it simple:
  // We use standard list styles for OL and custom for UL via CSS in global or parent class.
  // Actually, let's just make the LI component simpler and rely on parent:
  
  blockquote: (props: any) => (
    <blockquote className="my-8 pl-6 border-l-2 border-blue-500/50 bg-blue-900/5 py-4 pr-4 rounded-r-xl italic text-gray-400 relative">
      <Quote className="absolute top-2 left-2 w-4 h-4 text-blue-500/20 -translate-x-full -translate-y-1/2 transform scale-150 opacity-50" />
      {props.children}
    </blockquote>
  ),
  code: (props: any) => {
    // Check if it's a block or inline
    const isBlock = props.className?.includes('language-');
    if (isBlock) {
      const lang = props.className.replace('language-', '');
      return <PromptBlock language={lang} code={props.children} />;
    }
    return (
      <code className="bg-blue-500/10 text-blue-300 px-1.5 py-0.5 rounded-md text-[0.9em] font-mono border border-blue-500/20 break-words" {...props} />
    );
  },
  Callout,
  Card,
  Cards,
  Steps,
  PromptAnatomy
};
