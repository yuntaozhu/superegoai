import React, { useState } from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const CodePlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'solopreneur')!;

  const philosophy = [
    { 
      title: 'CEO 思维', 
      subtitle: 'Orchestrator', 
      desc: '你不再是写代码的人，你是合伙人。核心工作是决策与验收。', 
      icon: '👑',
      detail: '从每一行代码中抽离，专注于系统架构与商业逻辑。'
    },
    { 
      title: '全栈即自由', 
      subtitle: 'Freedom', 
      desc: '通过 AI 驾驭逻辑与艺术。你是总监，也是缔造者。', 
      icon: '🔓',
      detail: '打破职能边界，一人完成从视觉到后端的所有链路。'
    },
    { 
      title: '工作流驱动', 
      subtitle: 'Workflow', 
      desc: '工具会过时，但“工作流”永存。构建自动运转的商业流水线。', 
      icon: '⚙️',
      detail: '构建标准化、可复用的 AI 编排模板，实现极效产出。'
    }
  ];

  const phases = [
    {
      id: 'P0',
      title: 'Phase 0: 觉醒与基石',
      period: '第 1 周',
      goal: '建立通用语言，掌握指挥指挥逻辑。',
      content: ['LLM 祛魅：理解 Token 与上下文', 'Prompt 2.0：CoT 与结构化提示', '环境搭建：Cursor/Dify 实战'],
      outcome: '个人专属 Prompt 库',
      color: 'bg-emerald-500',
      icon: '🧠',
      snippet: 'ego.init({ logic: "Chain-of-Thought", mode: "Commander" });'
    },
    {
      id: 'P1',
      title: 'Phase 1: 视觉与品牌',
      period: '第 2 - 4 周',
      goal: '用 AI 建立世界级品牌视觉与影像。',
      content: ['图像流：MJ + SD 精准生成 VI', '动态叙事：Runway 自动工作流', '数字 IP：打造 24h 讲解分身'],
      outcome: '品牌 VI + 60s 宣传片',
      color: 'bg-blue-500',
      icon: '🎨',
      snippet: 'brand.generate({ style: "Futuristic", palette: "Cyan-Neon" });'
    },
    {
      id: 'P2',
      title: 'Phase 2: 全栈开发',
      period: '第 5 - 7 周',
      goal: '即使不懂代码，也能上线独立应用。',
      content: ['AI IDE：深度掌握 Cursor 编排', 'V0.dev：视觉转 React 前端代码', '全栈打通：FastAPI + Supabase'],
      outcome: '上线可收费的 SaaS MVP',
      color: 'bg-indigo-500',
      icon: '🚀',
      snippet: 'app.deploy({ frontend: "v0.dev", database: "Supabase" });'
    },
    {
      id: 'P3',
      title: 'Phase 3: 数据与外脑',
      period: '第 8 - 10 周',
      goal: '构建“第二大脑”，实现决策自动化。',
      content: ['Text-to-SQL：自然语言驱动数据', '私有 RAG：训练懂你的 AI 参谋', 'Agent：打造 24/7 自动员工'],
      outcome: '知识库助手 + 商业仪表盘',
      color: 'bg-purple-500',
      icon: '📊',
      snippet: 'brain.sync({ knowledge: "Private_PDFs", vector: "Pinecone" });'
    },
    {
      id: 'P4',
      title: 'Phase 4: 变现与增长',
      period: '第 11 - 12 周',
      goal: '技术变现。把超级个体能力卖出去。',
      content: ['MVP 验证：Deep Research 调研', '流量矩阵：AI SEO 与内容运营', '路演模拟：BP 撰写与融资模拟'],
      outcome: '完整 BP + 种子用户数据',
      color: 'bg-amber-500',
      icon: '💰',
      snippet: 'market.scale({ ads: "AI-Generated", users: "Global" });'
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PlanetLayout course={course}>
      {/* Super Individual Header */}
      <section className="mt-8 md:mt-16 mb-16 md:mb-24 px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="h-0.5 w-10 bg-cyan-500"></span>
              <span className="text-cyan-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em]">Solo_Unicorn_OS</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
              构建你的 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">“一人独角兽”系统</span>
            </h2>
            <p className="text-base md:text-xl text-gray-300 leading-relaxed font-light">
              在 AI 时代，公司的形态正在解构。从“执行者”，培养成集产品、技术、设计、营销于一身的 <span className="text-white font-bold">“超级个体”</span>。
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
          >
             {philosophy.map((p, i) => (
               <motion.div 
                 key={i} 
                 variants={itemVariants}
                 whileHover={{ y: -5, borderColor: 'rgba(34, 211, 238, 0.4)' }}
                 className="p-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-[32px] text-center transition-all group relative overflow-hidden"
               >
                  <div className="absolute top-0 right-0 p-2 opacity-10 font-mono text-[8px]">{p.subtitle}</div>
                  <div className="text-3xl md:text-4xl mb-4 group-hover:scale-110 transition-transform">{p.icon}</div>
                  <h4 className="text-white font-bold text-xs md:text-sm mb-1">{p.title}</h4>
                  <p className="text-gray-500 text-[10px] leading-relaxed line-clamp-2 md:line-clamp-none">{p.desc}</p>
               </motion.div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* Evolution Phases */}
      <section className="py-12 md:py-20 relative px-4 md:px-0">
        <div className="absolute top-0 left-8 md:left-12 w-[1px] md:w-[2px] h-full bg-gradient-to-b from-cyan-500/50 via-white/10 to-transparent hidden sm:block" />
        
        <div className="space-y-12 md:space-y-24">
          {phases.map((phase, idx) => (
            <motion.div 
              key={phase.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative sm:pl-20 md:pl-32"
            >
              <div className={`absolute top-0 left-4 md:left-8 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl ${phase.color} shadow-[0_0_20px_rgba(34,211,238,0.2)] flex items-center justify-center text-white font-black text-xs md:text-sm z-10 hidden sm:flex`}>
                 {idx}
              </div>

              <div className="bg-brand-surface/60 border border-white/10 rounded-3xl md:rounded-[48px] overflow-hidden backdrop-blur-xl group hover:border-cyan-500/40 transition-all duration-500 shadow-2xl">
                <div className="p-6 md:p-16 flex flex-col lg:flex-row gap-8 md:gap-12">
                   <div className="lg:w-1/3 space-y-4 md:space-y-8">
                      <div className="flex items-center justify-between">
                        <div className="text-[9px] md:text-xs font-mono text-cyan-500 uppercase tracking-widest">{phase.period}</div>
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xl">{phase.icon}</div>
                      </div>
                      <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase leading-tight">{phase.title}</h3>
                      <p className="text-gray-400 text-xs md:text-sm italic border-l-2 border-cyan-500/30 pl-4">{phase.goal}</p>
                      
                      {/* Interactive Code Snippet */}
                      <div className="bg-black/80 rounded-xl p-4 border border-white/5 font-mono text-[10px] md:text-xs text-cyan-400/80 shadow-inner group-hover:border-cyan-500/30 transition-colors">
                        <span className="text-gray-600">// Orchestrate command</span>
                        <div className="mt-2 break-all">{phase.snippet}</div>
                      </div>
                   </div>

                   <div className="lg:w-2/3 flex flex-col gap-6 md:gap-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {phase.content.map((item, i) => (
                          <motion.div 
                            key={i} 
                            whileHover={{ scale: 1.02 }}
                            className="p-5 md:p-6 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5 flex gap-3 md:gap-4 items-start hover:bg-white/10 transition-all"
                          >
                             <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0 animate-pulse" />
                             <p className="text-gray-300 text-[11px] md:text-sm leading-relaxed font-medium">{item}</p>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="p-6 md:p-10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl md:rounded-[40px] text-center relative overflow-hidden group-hover:scale-[1.01] transition-transform">
                        <div className="relative z-10">
                          <span className="text-[9px] md:text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] font-bold">阶段交付物 // Output artifact</span>
                          <div className="text-white font-black mt-2 text-lg md:text-2xl tracking-tight uppercase">{phase.outcome}</div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Developer Terminal Preview - More interactive feel */}
      <section className="mt-20 md:mt-40 px-4 md:px-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-[#0c0c0c] border border-white/10 rounded-3xl md:rounded-[64px] p-8 md:p-20 relative overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.1)]"
        >
          <div className="absolute top-0 left-0 w-full p-4 md:p-6 border-b border-white/5 flex items-center justify-between bg-white/5 backdrop-blur-md">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
               <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(245,158,11,0.4)]" />
               <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
             </div>
             <div className="font-mono text-[8px] md:text-[10px] text-gray-500 flex items-center gap-2">
               <span className="animate-pulse">●</span>
               SSH: UNICORN_CLUSTER_01 // SECURE
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mt-12 md:mt-20 items-center">
            <div className="space-y-6 md:space-y-8 font-mono text-xs md:text-sm">
               <div className="flex gap-3 md:gap-4 items-center">
                 <span className="text-cyan-500 font-bold">$</span>
                 <motion.span 
                   initial={{ width: 0 }}
                   whileInView={{ width: "auto" }}
                   transition={{ duration: 2 }}
                   className="text-white overflow-hidden whitespace-nowrap inline-block"
                 >
                   individual-os deploy --mvp "UniversalSaaS"
                 </motion.span>
                 <span className="w-2 h-4 bg-cyan-500 animate-blink"></span>
               </div>
               <div className="space-y-3 text-gray-500 text-[10px] md:text-xs">
                 <div className="flex items-center gap-2">
                    <span className="text-emerald-500">✔</span> [1/4] Orchestrating UI Components (V0.dev)...
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-emerald-500">✔</span> [2/4] Syncing Vector Memories (Supabase)...
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-emerald-500">✔</span> [3/4] Initializing Agent Hive...
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-blue-500 animate-spin">⟳</span> [4/4] Finalizing Edge Deployment...
                 </div>
               </div>
               <div className="pt-6 md:pt-10 border-t border-white/5">
                  <div className="text-cyan-400 font-black text-2xl md:text-4xl tracking-tighter mb-2">
                    TEAM_SIZE: 01 <span className="text-gray-600 text-lg md:text-xl font-light font-sans">(YOU)</span>
                  </div>
                  <div className="text-white/60 text-[10px] md:text-xs uppercase tracking-widest">Efficiency Multiplier: 10,000x</div>
               </div>
            </div>

            <div className="aspect-square bg-gradient-to-br from-cyan-950/20 to-brand-dark rounded-3xl md:rounded-[48px] border border-white/10 flex items-center justify-center p-8 relative group overflow-hidden shadow-inner">
               <div className="text-center space-y-6 md:space-y-8 z-10">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="text-7xl md:text-9xl drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                  >
                    🦄
                  </motion.div>
                  <h4 className="text-white font-black text-2xl md:text-3xl tracking-tighter uppercase leading-none">一人即是公司</h4>
                  <p className="text-gray-500 text-[10px] md:text-sm font-mono tracking-widest uppercase bg-white/5 py-1 px-4 rounded-full">Automated Enterprise v2.0</p>
               </div>
               
               {/* Decorative circuit lines */}
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <svg width="100%" height="100%" viewBox="0 0 100 100">
                    <path d="M 0 50 Q 25 50 50 25 T 100 0" fill="none" stroke="cyan" strokeWidth="0.5" />
                    <path d="M 0 100 Q 50 75 100 50" fill="none" stroke="cyan" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="cyan" strokeWidth="0.1" />
                 </svg>
               </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </PlanetLayout>
  );
};

export default CodePlanet;