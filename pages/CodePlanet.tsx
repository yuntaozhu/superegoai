
import React, { useState } from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

// Using any to bypass framer-motion type mismatch in the current environment
const m = motion as any;

const CodePlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'solopreneur')!;
  const [activePhilosophy, setActivePhilosophy] = useState<number | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<string | null>('P0');

  const philosophy = [
    { 
      title: 'CEO 思维', 
      subtitle: 'Orchestrator', 
      desc: '你不再是写代码的人，你是决策者。核心工作是架构设计与验收。', 
      icon: '👑',
      detail: '从每一行代码中抽离，专注于系统架构与商业逻辑。利用 AI 作为你的高级开发团队。',
      color: 'cyan'
    },
    { 
      title: '全栈即自由', 
      subtitle: 'Freedom', 
      desc: '通过 AI 驾驭 logic 与艺术。你是总监，也是缔造者。', 
      icon: '🔓',
      detail: '打破职能边界，一人完成从视觉设计到后端部署的所有链路，不再受限于技术栈。',
      color: 'blue'
    },
    { 
      title: '工作流驱动', 
      subtitle: 'Workflow', 
      desc: '工具会过时，但“工作流”永存。构建自动运转的商业流水线。', 
      icon: '⚙️',
      detail: '构建标准化、可复用的 AI 编排模板。关注如何让 AI 更高效地协作，而不是死磕语法。',
      color: 'indigo'
    }
  ];

  const phases = [
    {
      id: 'P0',
      title: 'Phase 0: 觉醒与基石',
      period: '第 1 周',
      goal: '建立通用语言，掌握指挥逻辑。',
      content: ['LLM 祛魅：理解 Token 与上下文', 'Prompt 2.0：CoT 与结构化提示', '环境搭建：Cursor/Dify 实战'],
      outcome: '个人专属 Prompt 库',
      color: 'emerald',
      icon: '🧠',
      snippet: 'const brain = new SuperEgo({ mode: "orchestrator" });\nawait brain.init();'
    },
    {
      id: 'P1',
      title: 'Phase 1: 视觉与品牌',
      period: '第 2 - 4 周',
      goal: '用 AI 建立世界级品牌视觉与影像。',
      content: ['图像流：MJ + SD 精准生成 VI', '动态叙事：Runway 自动工作流', '数字 IP：打造 24h 讲解分身'],
      outcome: '品牌 VI + 60s 宣传片',
      color: 'blue',
      icon: '🎨',
      snippet: 'brand.generate({\n  theme: "Cyberpunk",\n  vibe: "Futuristic"\n});'
    },
    {
      id: 'P2',
      title: 'Phase 2: 全栈开发',
      period: '第 5 - 7 周',
      goal: '即使不懂代码，也能上线独立应用。',
      content: ['AI IDE：深度掌握 Cursor 编排', 'V0.dev：视觉转 React 前端代码', '全栈打通：FastAPI + Supabase'],
      outcome: '上线可收费的 SaaS MVP',
      color: 'indigo',
      icon: '🚀',
      snippet: 'app.deploy({\n  frontend: "React",\n  db: "PostgreSQL"\n});'
    },
    {
      id: 'P3',
      title: 'Phase 3: 数据与外脑',
      period: '第 8 - 10 周',
      goal: '构建“第二大脑”，实现决策自动化。',
      content: ['Text-to-SQL：自然语言驱动数据', '私有 RAG：训练懂你的 AI 参谋', 'Agent：打造 24/7 自动员工'],
      outcome: '知识库助手 + 商业仪表盘',
      color: 'purple',
      icon: '📊',
      snippet: 'agent.start({\n  task: "MarketAnalysis",\n  memory: "VectorDB"\n});'
    },
    {
      id: 'P4',
      title: 'Phase 4: 变现与增长',
      period: '第 11 - 12 周',
      goal: '技术变现。把超级个体能力卖出去。',
      content: ['MVP 验证：Deep Research 调研', '流量矩阵：AI SEO 与内容运营', '路演模拟：BP 撰写与融资模拟'],
      outcome: '完整 BP + 种子用户数据',
      color: 'amber',
      icon: '💰',
      snippet: 'revenue.scale({\n  strategy: "GrowthHacking",\n  channel: "Global"\n});'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <PlanetLayout course={course}>
      {/* Hero Intro */}
      <section className="mt-8 md:mt-20 mb-16 md:mb-32 px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <m.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 md:space-y-10"
          >
            <div className="flex items-center gap-4">
              <div className="h-0.5 w-10 bg-cyan-500" />
              <span className="text-cyan-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold">Unicorn_System_v2</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              进化为 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">
                超级个体程序员
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light max-w-xl">
              不要做代码的搬运工。学习如何以 <span className="text-white font-bold">“总导演”</span> 的身份，指挥 AI 军团构建复杂的数字世界。
            </p>
            <div className="flex gap-4">
               <m.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="px-8 py-4 bg-cyan-600 text-white rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-cyan-500/20"
               >
                 查看路线图
               </m.button>
            </div>
          </m.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
             {philosophy.map((p, i) => (
               <m.div 
                 key={i}
                 layout
                 onClick={() => setActivePhilosophy(activePhilosophy === i ? null : i)}
                 className={`cursor-pointer p-6 md:p-6 rounded-[32px] border transition-all duration-300 relative overflow-hidden group ${
                   activePhilosophy === i 
                   ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.15)]' 
                   : 'bg-white/5 border-white/10 hover:border-white/30'
                 }`}
               >
                  <div className="flex items-center gap-6">
                    <div className="text-2xl md:text-3xl">{p.icon}</div>
                    <div>
                      <h4 className="text-white font-black text-base md:text-lg tracking-tight">{p.title}</h4>
                      <p className="text-cyan-500/60 font-mono text-[9px] uppercase tracking-widest">{p.subtitle}</p>
                    </div>
                  </div>
                  <AnimatePresence>
                    {activePhilosophy === i && (
                      <m.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-white/5 overflow-hidden"
                      >
                        <p className="text-gray-300 text-sm leading-relaxed">{p.detail}</p>
                      </m.div>
                    )}
                  </AnimatePresence>
                  <div className="absolute top-0 right-0 p-4 opacity-5 font-mono text-3xl">{i+1}</div>
               </m.div>
             ))}
          </div>
        </div>
      </section>

      {/* Interactive Phase Cards */}
      <section className="py-20 md:py-40 relative px-4 md:px-0">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center mb-16">
             <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">进化轨迹 // Trajectory</h3>
             <p className="text-gray-500 font-mono text-xs tracking-widest">TAP_PHASE_TO_EXPAND_CORE_LOGIC</p>
          </div>

          <div className="space-y-6">
            {phases.map((phase, idx) => {
              const isExpanded = expandedPhase === phase.id;
              return (
                <m.div 
                  key={phase.id}
                  layout
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={cardVariants}
                  className={`relative group bg-brand-surface/60 backdrop-blur-xl border rounded-[32px] md:rounded-[48px] overflow-hidden transition-all duration-500 cursor-pointer ${
                    isExpanded ? 'border-cyan-500/50 shadow-[0_0_80px_rgba(6,182,212,0.1)] ring-1 ring-cyan-500/20' : 'border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 md:w-2 bg-cyan-500 transition-opacity ${isExpanded ? 'opacity-100' : 'opacity-40'}`} />

                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-3xl border border-white/5 bg-white/5 transition-transform duration-500 ${isExpanded ? 'scale-110 rotate-3' : ''}`}>
                          {phase.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">Phase 0{idx}</span>
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">{phase.period}</span>
                          </div>
                          <h3 className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none">{phase.title}</h3>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <m.div 
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-white"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </m.div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <m.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 pt-10 border-t border-white/5">
                            <div className="space-y-8">
                              <div>
                                <h4 className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.3em] mb-4">目标 // Mission Goal</h4>
                                <p className="text-gray-300 text-lg leading-relaxed font-light italic pl-4 border-l-2 border-cyan-500/30">{phase.goal}</p>
                              </div>
                              <div>
                                <h4 className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.3em] mb-4">核心内容 // Content</h4>
                                <div className="grid grid-cols-1 gap-3">
                                  {phase.content.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
                                      <span className="text-gray-200 text-sm md:text-base">{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="p-6 bg-cyan-500/10 rounded-3xl border border-cyan-500/20">
                                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">阶段交付物 // Output</span>
                                <div className="text-white font-black mt-2 text-lg md:text-xl tracking-tighter uppercase">{phase.outcome}</div>
                              </div>
                            </div>

                            <div className="space-y-6">
                               <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-4">编排指令 // Orchestration Code</h4>
                               <div className="bg-black/80 rounded-3xl p-6 md:p-8 border border-white/5 font-mono text-[11px] md:text-sm text-cyan-400 shadow-2xl relative group/code">
                                  <pre className="whitespace-pre-wrap leading-relaxed">{phase.snippet}</pre>
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center">
                                     <div className="text-gray-500 text-[10px] uppercase font-mono mb-1">Efficiency</div>
                                     <div className="text-white font-bold text-lg">+10x</div>
                                  </div>
                                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl text-center">
                                     <div className="text-gray-500 text-[10px] uppercase font-mono mb-1">Complexity</div>
                                     <div className="text-white font-bold text-lg">Stage 0{idx}</div>
                                  </div>
                               </div>
                            </div>
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Terminal Section */}
      <section className="mt-20 md:mt-40 mb-20 md:mb-40 px-4 md:px-0">
        <m.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-[#0a0a0a] border border-cyan-500/20 rounded-[40px] md:rounded-[80px] p-8 md:p-24 relative overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.1)]"
        >
          <div className="absolute top-0 left-0 w-full h-10 md:h-14 bg-white/5 border-b border-white/5 flex items-center px-6 md:px-10 gap-3">
             <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
             <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
             <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
             <div className="ml-4 font-mono text-[9px] md:text-xs text-gray-500">zsh — individual-os — 80x24</div>
          </div>

          <div className="mt-12 md:mt-20 space-y-10 md:space-y-16">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-xs md:text-lg font-mono text-cyan-500">
                <span>$</span>
                <m.span 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                >
                  ego-os deploy --individual
                </m.span>
              </div>
              <div className="font-mono text-[10px] md:text-base text-gray-500 space-y-2 md:space-y-4">
                 <p className="flex items-center gap-4"><span className="text-emerald-500">[DONE]</span> Orchestrating UI components...</p>
                 <p className="flex items-center gap-4"><span className="text-emerald-500">[DONE]</span> Connecting Vector Brain...</p>
                 <p className="flex items-center gap-4 text-cyan-400">
                    <span className="animate-spin text-lg">⟳</span> Scaling impact to global nodes...
                 </p>
              </div>
            </div>

            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
               <div className="text-center md:text-left">
                  <h4 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase mb-2">一人即是公司</h4>
                  <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">Efficiency Multiplier: 10,000x</p>
               </div>
               <m.div 
                 animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                 transition={{ duration: 10, repeat: Infinity }}
                 className="text-5xl md:text-7xl grayscale opacity-40 group-hover:grayscale-0 transition-all duration-1000"
               >
                 🦄
               </m.div>
            </div>
          </div>
          
          <div className="absolute inset-0 opacity-5 pointer-events-none">
             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
               <defs>
                 <pattern id="grid-code-fixed" width="40" height="40" patternUnits="userSpaceOnUse">
                   <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                 </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#grid-code-fixed)" />
             </svg>
          </div>
        </m.div>
      </section>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </PlanetLayout>
  );
};

export default CodePlanet;
