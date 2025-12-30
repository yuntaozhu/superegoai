
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGeminiBrain, ThoughtLog } from '../hooks/useGeminiBrain';
import { Send, Cpu, Database, Terminal, Search, ChevronRight, Brain, Zap } from 'lucide-react';
import { Link } from '../context/LanguageContext';

const m = motion as any;

const LogItem = ({ log }: { log: ThoughtLog }) => {
  const getIcon = () => {
    switch (log.type) {
      case 'user': return <div className="w-2 h-2 rounded-full bg-blue-500" />;
      case 'tool_call': return <Terminal className="w-3 h-3 text-purple-400" />;
      case 'tool_result': return <Database className="w-3 h-3 text-emerald-400" />;
      case 'agent_thought': return <Brain className="w-3 h-3 text-gray-500" />;
      case 'agent_response': return <Send className="w-3 h-3 text-white" />;
      case 'error': return <div className="w-2 h-2 rounded-full bg-red-500" />;
      default: return <div className="w-2 h-2 rounded-full bg-gray-500" />;
    }
  };

  const getStyle = () => {
    switch (log.type) {
      case 'tool_call': return 'bg-purple-500/10 border-purple-500/20 text-purple-200';
      case 'tool_result': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200';
      case 'agent_thought': return 'text-gray-500 italic';
      case 'error': return 'text-red-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <m.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`mb-3 text-xs font-mono p-3 rounded-lg border border-transparent ${getStyle()}`}
    >
      <div className="flex items-center gap-2 mb-1 opacity-70">
        {getIcon()}
        <span className="uppercase tracking-wider text-[10px]">{log.type.replace('_', ' ')}</span>
        <span className="ml-auto text-[9px]">{log.timestamp}</span>
      </div>
      <div className="pl-5 whitespace-pre-wrap">{log.content}</div>
      
      {log.metadata && log.type === 'tool_call' && (
        <div className="pl-5 mt-2 text-[10px] text-gray-500">
          <span className="text-purple-400">INPUT:</span> {JSON.stringify(log.metadata.args)}
        </div>
      )}

      {log.metadata && log.type === 'tool_result' && log.metadata.results && Array.isArray(log.metadata.results) && (
        <div className="pl-5 mt-2 space-y-2">
           {log.metadata.results.map((res: any, i: number) => (
             <div key={i} className="bg-black/40 p-2 rounded border border-white/5">
                <div className="text-emerald-400 font-bold">{res.title}</div>
                <div className="text-gray-500 truncate">{res.content}</div>
             </div>
           ))}
        </div>
      )}
    </m.div>
  );
};

const SecondBrainPage: React.FC = () => {
  const [input, setInput] = useState('');
  const { messages, logs, sendMessage, isThinking } = useGeminiBrain(process.env.API_KEY);
  const scrollRef = useRef<HTMLDivElement>(null);
  const logScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (logScrollRef.current) logScrollRef.current.scrollTop = logScrollRef.current.scrollHeight;
  }, [logs]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-[#05060f] text-white flex flex-col pt-16">
      {/* Header */}
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#05060f]/90 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-white/5 rounded-lg text-gray-400">
            <ChevronRight className="w-5 h-5 rotate-180" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-widest">Second Brain Companion</h1>
              <p className="text-[10px] text-gray-500 font-mono">AGENTIC RAG INSPECTOR // V1.0</p>
            </div>
          </div>
        </div>
        <div className="text-[10px] font-mono text-emerald-500 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isThinking ? 'bg-emerald-500 animate-pulse' : 'bg-gray-700'}`} />
          {isThinking ? 'NEURAL ENGINE ACTIVE' : 'SYSTEM IDLE'}
        </div>
      </div>

      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Panel: Chat Interface */}
        <div className="flex-1 flex flex-col border-r border-white/10 bg-black/20 min-w-0">
          <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                <Brain className="w-16 h-16 text-blue-500/20 mb-4" />
                <h3 className="text-lg font-bold uppercase tracking-widest">Awaiting Input</h3>
                <p className="text-sm text-gray-500 max-w-xs mt-2">
                  Ask me about the "AI First" curriculum. Try: "How does FTI work?" or "Explain LoRA".
                </p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 bg-[#05060f]">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your Second Brain..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-all font-light"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isThinking}
                className="absolute right-2 top-2 p-1.5 bg-blue-600 rounded-lg text-white disabled:opacity-50 hover:bg-blue-500 transition-colors"
              >
                <Zap className="w-4 h-4 fill-current" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Panel: The Inspector (Thought Chain) */}
        <div className="w-full md:w-[400px] lg:w-[450px] bg-[#020205] flex flex-col border-l border-white/5">
          <div className="p-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
              <Terminal className="w-3 h-3" /> Thought Process Log
            </span>
            <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/50" />
               <div className="w-2 h-2 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
               <div className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4 custom-scrollbar font-mono" ref={logScrollRef}>
            {logs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-20">
                <Search className="w-12 h-12 mb-2" />
                <span className="text-[10px] uppercase tracking-widest">Logs Empty</span>
              </div>
            ) : (
              logs.map(log => <LogItem key={log.id} log={log} />)
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SecondBrainPage;
