
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Brain, Loader2, AlertTriangle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../context/LanguageContext';

const m = motion as any;

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
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
    setMessages([]); // Optional: clear history on language switch
  }, [language]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // 1. Check for API Key presence
    if (!process.env.API_KEY) {
        setMessages(prev => [...prev, { role: 'assistant', content: language === 'zh' ? "⚠️ 系统错误：未配置 API Key。请在环境变量中设置。" : "⚠️ System Error: API Key not configured. Please check your environment variables." }]);
        return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // 2. Initialize Chat Session if needed
      if (!chatSessionRef.current) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const systemPromptZh = `你是 "AI First Course" 的 SuperEgo AI 助手。
        你的任务是解释课程理念（编排 vs 执行）并帮助用户理解星系模型。
        平台拥有6颗行星：艺术、运动、数据（核心）、量化、代码（超级个体）和科研。
        请保持回答简洁、具有未来感且充满鼓励。用中文回答。`;

        const systemPromptEn = `You are the SuperEgo AI Assistant for "AI First Course". 
        Your mission is to explain the course philosophy (Orchestration vs Execution) and help users understand the Galaxy Model.
        The platform offers 6 planets: Art, Sports, Data (The Core), Quant, Code (Solopreneur), and Research.
        Keep answers concise, futuristic, and encouraging. Respond in English.`;

        chatSessionRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: language === 'zh' ? systemPromptZh : systemPromptEn,
            temperature: 0.7
          }
        });
      }

      const response = await chatSessionRef.current.sendMessage({
        message: userMessage
      });

      const assistantReply = response.text || (language === 'zh' ? "信号干扰... 请重试。" : "Signal interference... Please try again.");
      setMessages(prev => [...prev, { role: 'assistant', content: assistantReply }]);
    } catch (error: any) {
      console.error("SuperEgo Assistant Error:", error);
      
      let errorMessage = language === 'zh' 
        ? "连接中断。请验证您的 API 状态或网络连接。" 
        : "Node connection lost. Please verify your API status or network connection.";

      // Check for specific API errors
      if (error.message?.includes('403') || error.message?.includes('401')) {
         errorMessage = language === 'zh' 
           ? "鉴权失败：API Key 无效或过期。" 
           : "Authentication Failed: Invalid or expired API Key.";
      } else if (error.message?.includes('404')) {
         errorMessage = language === 'zh' 
           ? "模型未找到：请检查模型名称配置。" 
           : "Model Not Found: Please check model configuration.";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${errorMessage}` }]);
      
      // Reset session to force re-initialization on next attempt
      chatSessionRef.current = null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
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

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-[100] w-[350px] sm:w-[400px] h-[500px] bg-brand-surface/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-widest">SuperEgo Assistant</h4>
                  <p className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    STATUS: ONLINE
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto custom-scrollbar p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-10 opacity-40">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                  <p className="text-sm text-gray-400">
                    {language === 'zh' ? '询问关于“第二大脑”或星系模型的问题。' : 'Ask me about the Second Brain or our Galaxy Model.'}
                  </p>
                </div>
              )}
              {messages.map((msg, i) => (
                <m.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </m.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex gap-2 items-center">
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    <span className="text-xs text-gray-500 font-mono">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
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
