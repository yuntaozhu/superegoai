
import React, { useRef, useEffect } from 'react';
import { useGeminiBrain } from '../hooks/useGeminiBrain';
import ArchitectureMap from '../components/ArchitectureMap';
import TraceInspector from '../components/TraceInspector';
import ConfigPanel from '../components/ConfigPanel';
import { useConfigStore } from '../lib/store/configStore';
import { Send, ChevronRight, Zap, Settings } from 'lucide-react';
import { Link } from '../context/LanguageContext';

const SecondBrainPage: React.FC = () => {
  const [input, setInput] = React.useState('');
  const { messages, traces, activeNode, sendMessage } = useGeminiBrain();
  const { togglePanel } = useConfigStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="h-screen bg-[#020308] text-white flex flex-col pt-16 overflow-hidden relative">
      <ConfigPanel />
      
      {/* 1. Header & Architecture Map */}
      <div className="flex-shrink-0 bg-[#05060f] border-b border-white/10 z-20 shadow-xl">
        <div className="h-12 flex items-center justify-between px-6 border-b border-white/5">
           <div className="flex items-center gap-4">
              <Link to="/" className="text-gray-500 hover:text-white"><ChevronRight className="w-5 h-5 rotate-180" /></Link>
              <h1 className="text-sm font-black uppercase tracking-widest text-white">Brain OS <span className="text-purple-500">Kernel v2.0</span></h1>
           </div>
           <div className="flex items-center gap-4">
             <div className="text-[10px] font-mono text-gray-500 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${activeNode ? 'bg-green-500 animate-pulse' : 'bg-gray-700'}`} />
                {activeNode ? `PROCESSING: ${activeNode.toUpperCase()}` : 'SYSTEM IDLE'}
             </div>
             <button onClick={togglePanel} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-400">
               <Settings className="w-4 h-4" />
             </button>
           </div>
        </div>
        <ArchitectureMap activeNode={activeNode} />
      </div>

      {/* 2. Main Workspace */}
      <div className="flex-grow flex min-h-0">
        
        {/* Left: Chat */}
        <div className="flex-1 flex flex-col border-r border-white/10 relative">
          <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-30">
                <div className="w-20 h-20 border-4 border-dashed border-white/20 rounded-full animate-spin-slow mb-6" />
                <p className="text-xs font-mono uppercase tracking-widest">Awaiting Neural Input</p>
                <div className="flex gap-2 mt-4">
                   {['What is FTI?', 'Explain Contextual Retrieval', 'How does LoRA work?'].map(q => (
                     <button key={q} onClick={() => sendMessage(q)} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] border border-white/10 transition-colors">
                       {q}
                     </button>
                   ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/20' 
                    : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {activeNode && activeNode !== 'user' && activeNode !== 'observability' && (
               <div className="flex justify-start">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                     <Zap className="w-3 h-3 animate-pulse" /> Agent is thinking...
                  </div>
               </div>
            )}
          </div>

          <div className="p-4 bg-[#05060f] border-t border-white/10">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your Second Brain..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-all font-light"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || !!activeNode}
                className="absolute right-2 top-2 p-1.5 bg-purple-600 rounded-lg text-white disabled:opacity-50 hover:bg-purple-500 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right: Trace Inspector */}
        <div className="w-[400px] bg-[#020205] flex flex-col border-l border-white/10">
           <div className="flex-grow overflow-hidden">
              <TraceInspector traces={traces} />
           </div>
        </div>

      </div>
    </div>
  );
};

export default SecondBrainPage;
