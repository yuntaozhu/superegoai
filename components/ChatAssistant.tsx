
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Brain, Loader2, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import GroundingSources from './GroundingSources';
import { getGeminiClient } from '../api/client';
import { GEMINI_CONFIG } from '../api/config';

const m = motion as any;

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; url: string }[];
}

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Reset chat session when language changes to switch system instruction language
  useEffect(() => {
    chatSessionRef.current = null;
    setMessages([]);
  }, [language]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!process.env.API_KEY) {
        setMessages(prev => [...prev, { role: 'assistant', content: language === 'zh' ? "⚠️ 系统错误：未配置 API Key。请在项目根目录创建 .env 文件并设置 API_KEY。" : "⚠️ System Error: API Key not configured. Please create a .env file in the root directory with your API_KEY." }]);
        return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
        const ai = getGeminiClient();
        
        const systemPromptZh = `你是 "AI First Course" 的 SuperEgo AI 助手。
        你的任务是解释课程理念（编排 vs 执行）并帮助用户理解星系模型。
        平台拥有6颗行星：艺术、运动、数据（核心）、量化、代码（超级个体）和科研。
        你可以使用 Google 搜索来获取最新的 AI 趋势和实时信息。
        请保持回答简洁、具有未来感且充满鼓励。用中文回答。`;

        const systemPromptEn = `You are the SuperEgo AI Assistant for "AI First Course". 
        Your mission is to explain the course philosophy (Orchestration vs Execution) and help users understand the Galaxy Model.
        The platform offers 6 planets: Art, Sports, Data (The Core), Quant, Code (Solopreneur), and Research.
        You can use Google Search to fetch the latest AI trends and real-time information.
        Keep answers concise, futuristic, and encouraging. Respond in English.`;

        chatSessionRef.current = ai.chats.create({
          model: GEMINI_CONFIG.models.default,
          config: {
            systemInstruction: language === 'zh' ? systemPromptZh : systemPromptEn,
            temperature: 0.7,
            tools: [{ googleSearch: {} }]
          }
        });
      }

      const response = await chatSessionRef.current.sendMessage({
        message: userMessage
      });

      const assistantReply = response.text || (language === 'zh' ? "信号干扰... 请重试。" : "Signal interference... Please try again.");
      
      // Extract grounding sources
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = groundingChunks
        .map((chunk: any) => chunk.web)
        .filter((web: any) => web && web.uri && web.title)
        .map((web: any) => ({ title: web.title, url: web.uri }));
      
      // Deduplicate sources
      const uniqueSources = Array.from(new Map(sources.map((s: any) => [s.url, s])).values()) as { title: string; url: string }[];

      setMessages(prev => [...prev, { role: 'assistant', content: assistantReply, sources: uniqueSources }]);
    } catch (error: any) {
      console.error("SuperEgo Assistant Error:", error);
      
      let errorMessage = language === 'zh' 
        ? "连接中断。请验证您的 API 状态或网络连接。" 
        : "Node connection lost. Please verify your API status or network connection.";

      const errStr = error.message || error.toString();

      if (errStr.includes('403') || errStr.includes('leaked') || errStr.includes('PERMISSION_DENIED')) {
         errorMessage = language === 'zh' 
           ? "🛑 API Key 错误：您的密钥已被 Google 标记为泄露并禁用。请前往 Google AI Studio 删除旧密钥，生成新密钥，并更新您的 .env 文件。" 
           : "🛑 API Key Alert: Your key was detected as leaked and blocked by Google. Please delete the old key in Google AI Studio, generate a new one, and update your .env file.";
      } else if (errStr.includes('401') || errStr.includes('expired')) {
         errorMessage = language === 'zh' 
           ? "鉴权失败：API Key 无效。请检查 .env 配置。" 
           : "Authentication Failed: Invalid API Key. Check .env config.";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
      chatSessionRef.current = null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <m.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-white/20 group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X key="close" className="w-6 h-6 text-white" />
          ) : (
            <Brain key="brain" className="w-6 h-6 text-white group-hover:animate-pulse" />
          )}
        </AnimatePresence>
      </m.button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-[100] w-[350px] sm:w-[400px] h-[600px] bg-brand-surface/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-widest">SuperEgo Assistant</h4>
                  <p className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    GROUNDING ENABLED
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto custom-scrollbar p-6 space-y-6">
              {messages.length === 0 && (
                <m.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                      <Brain className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-white font-black uppercase tracking-tight text-lg mb-2">
                      {language === 'zh' ? '欢迎来到超我助手' : 'Welcome to SuperEgo Assistant'}
                    </h3>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                    <div className="flex gap-3">
                      <Info className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {language === 'zh' 
                          ? '我是您的 AI 导航员。我的职责是帮助您理解我们的“编排而非执行”的课程理念以及独特的“星系模型”。' 
                          : 'I am your AI Navigator. My role is to help you understand our "Orchestration, Not Execution" philosophy and the unique Galaxy Model.'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">
                        {language === 'zh' ? '您可以询问关于 6 颗行星的信息：' : 'Inquire about our 6 specialized planets:'}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {['Art', 'Sports', 'Data', 'Quant', 'Code', 'Research'].map(planet => (
                          <button 
                            key={planet}
                            onClick={() => setInput(language === 'zh' ? `告诉我关于${planet}行星的信息` : `Tell me about the ${planet} planet`)}
                            className="px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] text-gray-400 hover:bg-blue-600/20 hover:text-blue-300 hover:border-blue-500/30 transition-all text-left uppercase font-bold"
                          >
                            • {planet}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center italic">
                    {language === 'zh' ? '在下方输入您的问题开始对话...' : 'Type your question below to begin...'}
                  </p>
                </m.div>
              )}
              {messages.map((msg, i) => (
                <m.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[90%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'
                  }`}>
                    {msg.content}
                    <GroundingSources sources={msg.sources || []} />
                  </div>
                </m.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex gap-2 items-center">
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    <span className="text-xs text-gray-500 font-mono">Real-time Search...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-brand-dark/50 border-t border-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center"
              >
                <input 
                  type="text"
                  placeholder={language === 'zh' ? "询问矩阵..." : "Inquire the matrix..."}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2 text-blue-500 hover:text-blue-400 disabled:opacity-20 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
