
import React from 'react';
import { Info, AlertTriangle, CheckCircle, Lightbulb, ChevronRight } from 'lucide-react';
import { Link } from '../context/LanguageContext';
import PromptBlock from './PromptBlock';

export const Callout: React.FC<{ type?: 'info' | 'warning' | 'error' | 'success' | 'idea'; children: React.ReactNode }> = ({ type = 'info', children }) => {
  const styles = {
    info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: <Info className="w-5 h-5 text-blue-400" /> },
    warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: <AlertTriangle className="w-5 h-5 text-yellow-400" /> },
    error: { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: <AlertTriangle className="w-5 h-5 text-red-400" /> },
    success: { bg: 'bg-green-500/10', border: 'border-green-500/30', icon: <CheckCircle className="w-5 h-5 text-green-400" /> },
    idea: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', icon: <Lightbulb className="w-5 h-5 text-purple-400" /> },
  };

  const style = styles[type] || styles.info;

  return (
    <div className={`my-6 flex gap-4 p-4 rounded-xl border ${style.bg} ${style.border}`}>
      <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
      <div className="text-sm leading-relaxed text-gray-300 mdx-callout-content">
        {children}
      </div>
    </div>
  );
};

export const Card: React.FC<{ title: string; href: string; children?: React.ReactNode }> = ({ title, href, children }) => (
  <Link to={href} className="group block p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all hover:-translate-y-1">
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">{title}</h4>
      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-transform group-hover:translate-x-1" />
    </div>
    <div className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
      {children}
    </div>
  </Link>
);

export const Cards: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
    {children}
  </div>
);

export const Steps: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mdx-steps my-8 ml-4 border-l border-white/10 pl-8 space-y-8">
    {children}
  </div>
);

export const MdxComponents = {
  h1: (props: any) => <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter text-white" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-12 mb-6 border-b border-white/10 pb-2 text-white" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-8 mb-4 text-blue-400" {...props} />,
  p: (props: any) => <p className="mb-4 text-gray-400 font-light leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-gray-400" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-gray-400" {...props} />,
  li: (props: any) => <li className="pl-2" {...props} />,
  code: (props: any) => {
    const isBlock = props.className?.includes('language-');
    if (isBlock) {
      const lang = props.className.replace('language-', '');
      return <PromptBlock code={props.children} language={lang} />;
    }
    return <code className="bg-white/10 text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />;
  },
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 bg-blue-500/5 px-6 py-4 my-6 italic text-gray-300 rounded-r-xl" {...props} />
  ),
  Callout,
  Card,
  Cards,
  Steps
};
