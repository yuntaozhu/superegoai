import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const QuantPlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'quant')!;

  const modules = [
    {
      id: 'M1',
      title: '模块一：Alpha Hunter —— 从论文到算法',
      subtitle: '核心任务：构建“研报阅读与代码生成 Agent”',
      lessons: [
        { title: 'Gemini 3 多模态投研能力', desc: '利用百万级上下文读取 Arxiv 论文，解析公式截图与 K 线图表。' },
        // Fix: Removed unnecessary curly braces and quotes that caused arithmetic/comparison errors
        { title: 'Research Agent (研究员)', desc: '输入 PDF -> 输出策略逻辑伪代码文档。' },
        { title: 'Coder Agent (程序员)', desc: '资深量化开发角色扮演，自愈系统自动修正代码错误。' }
      ],
      tech: ['Gemini 3 Vision', 'Prompt Engineering', 'Self-Correction Loop'],
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'M2',
      title: '模块二：The Arena —— 双 Agent 对抗与优化',
      subtitle: '核心任务：构建“回测”与“调参”闭环交互系统',
      lessons: [
        { title: 'Backtest Agent (执行官)', desc: '加载历史数据运行回测，输出 Sharpe/Sortino 等结构化报告。' },
        { title: 'Optimizer Agent (专家)', desc: '基于推理而非网格搜索进行参数优化，实现 Agent 自动对话。' },
        // Fix: Removed unnecessary curly braces and quotes that caused comparison errors
        { title: '闭环实战', desc: '使用 LangGraph 实现循环节点，自动对话 10 轮直至夏普 > 2.0。' }
      ],
      tech: ['LangGraph', 'VectorBT', 'Reasoning-based Tuning'],
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'M3',
      title: '模块三：Evolution —— 进化与自我强化',
      subtitle: '核心任务：实现策略的生命周期管理与遗传变异',
      lessons: [
        { title: '策略基因库 (RAG)', desc: '将代码片段、回测结果与失败原因存入向量数据库，构建长短期记忆。' },
        { title: 'Evolution Agent (进化)', desc: '遗传算法交叉 (Crossover) 与变异 (Mutation) 逻辑融合。' },
        { title: '强化学习反馈', desc: '监控 Data Drift，自动淘汰失效策略，生成适应新市场的新变种。' }
      ],
      tech: ['Vector DB', 'Genetic Algorithm', 'Reinforcement Learning'],
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'M4',
      title: '模块四：实战与部署 (Capstone)',
      subtitle: '核心任务：构建全自动投研工厂流水线',
      lessons: [
        // Fix: Removed multiple sets of unnecessary curly braces and quotes that caused complex syntax errors
        { title: '全自动流水线', desc: '抓取 Arxiv -> 提炼因子 -> 写代码 -> 博弈优化 -> 实盘库评估。' },
        { title: '守门员 Agent (风控)', desc: '进入实盘前进行硬编码风控检查（仓位/亏损限制）。' },
        { title: 'AutoQuant-G3 交付', desc: '完成基于 Streamlit 的 Web 控制台，支持 PDF 上传与全流程日志显示。' }
      ],
      tech: ['MLOps', 'Guardrail Agents', 'Human-in-the-loop'],
      gradient: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* Trading HUD Header */}
      <section className="mt-8 mb-20">
        <div className="bg-black/90 border border-emerald-500/30 rounded-[40px] overflow-hidden shadow-[0_0_80px_rgba(16,185,129,0.1)]">
          <div className="bg-emerald-500/5 border-b border-emerald-500/20 py-3 px-8 flex items-center justify-between">
             <div className="flex gap-8 items-center overflow-hidden whitespace-nowrap">
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-500 font-mono text-[10px] tracking-widest">GEMINI_SWARM_ACTIVE</span>
                </div>
                <div className="flex gap-12 animate-marquee font-mono text-[10px] text-emerald-400/60 uppercase">
                   <span>BTC/USDT: 98,241.00 +2.4%</span>
                   <span>SHARPE_RATIO_TARGET: 2.0+</span>
                   <span>DATA_LATENCY: 14MS</span>
                   <span>GENE_POOL_SIZE: 1,248</span>
                </div>
             </div>
             <span className="font-mono text-[10px] text-gray-500 uppercase">SYS_TIME: 2025_02_14_UTC</span>
          </div>

          <div className="p-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-tight">
                量化投研工厂 <br/>
                <span className="text-emerald-400">全自动化进化系统</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                不只是编写算法，而是构建一个能够自我进化的 <span className="text-emerald-400 font-bold">Multi-Agent</span> 系统。从输入一篇 Arxiv 论文开始，到策略生成、对抗优化，直至最终部署，全流程智能驱动。
              </p>
              <div className="flex gap-6">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col items-center gap-2">
                   <span className="text-2xl">⚡</span>
                   <span className="text-[10px] font-mono text-emerald-300 uppercase">Super_Context</span>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex flex-col items-center gap-2">
                   <span className="text-2xl">🧬</span>
                   <span className="text-[10px] font-mono text-blue-300 uppercase">Self_Evolve</span>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex flex-col items-center gap-2">
                   <span className="text-2xl">🏗️</span>
                   <span className="text-[10px] font-mono text-purple-300 uppercase">Agent_Orch</span>
                </div>
              </div>
            </motion.div>

            <div className="relative aspect-video bg-emerald-950/20 rounded-[48px] border border-emerald-500/20 p-8 flex flex-col justify-between overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
               <div className="font-mono text-[10px] space-y-2 text-emerald-400/80 z-10">
                  <div className="flex justify-between border-b border-emerald-500/10 pb-1">
                    <span>[RESEARCH_AGENT]</span>
                    <span className="text-white">EXTRACTING_ALPHA... [92%]</span>
                  </div>
                  <div className="flex justify-between border-b border-emerald-500/10 pb-1">
                    <span>[CODER_AGENT]</span>
                    <span className="text-white">CODE_GENERATION: VECTORBT_READY</span>
                  </div>
                  <div className="flex justify-between border-b border-emerald-500/10 pb-1">
                    <span>[ARENA_ENGINE]</span>
                    <span className="text-amber-500 font-bold">SHARPE: 0.82 {'->'} OPTIMIZING...</span>
                  </div>
                  <div className="flex justify-between border-b border-emerald-500/10 pb-1">
                    <span>[EVO_AGENT]</span>
                    <span className="text-purple-400">CROSSOVER_SUCCESS: GEN_04</span>
                  </div>
               </div>
               
               <div className="flex justify-center mt-4">
                  <svg className="w-48 h-48 text-emerald-500/40 group-hover:scale-110 transition-transform duration-1000" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
                    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
                    <motion.path 
                      d="M 50 5 L 50 95 M 5 50 L 95 50" 
                      stroke="currentColor" 
                      strokeWidth="0.5"
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.circle 
                      cx="50" cy="50" r="2" fill="white"
                      animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </svg>
               </div>
               
               <div className="text-right z-10">
                  <span className="text-[10px] font-mono text-emerald-500/60 uppercase">AutoQuant_Console_v3 // online</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Path */}
      <section className="py-20">
        <div className="space-y-16">
          {modules.map((m, idx) => (
            <motion.div 
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-brand-surface border border-white/10 rounded-[56px] overflow-hidden backdrop-blur-xl hover:border-emerald-500/20 transition-all duration-500"
            >
              <div className={`absolute top-0 left-0 w-3 h-full bg-gradient-to-b ${m.gradient}`} />
              <div className="p-12 md:p-20 flex flex-col lg:flex-row gap-12">
                 <div className="lg:w-1/3 space-y-6">
                    <div className="text-xs font-mono text-gray-600 uppercase tracking-widest">Phase_0{idx + 1}</div>
                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-tight">{m.title}</h3>
                    <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest">{m.subtitle}</p>
                    <div className="flex flex-wrap gap-2 pt-4">
                       {m.tech.map(t => (
                         <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono text-gray-500">{t}</span>
                       ))}
                    </div>
                 </div>

                 <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {m.lessons.map((lesson, lIdx) => (
                      <div key={lIdx} className="p-8 bg-black/40 rounded-[32px] border border-white/5 hover:bg-black/60 transition-colors">
                        <div className="text-[10px] font-mono text-gray-600 mb-2">LESSON_0{lIdx + 1}</div>
                        <h4 className="text-white font-bold mb-3">{lesson.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{lesson.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </PlanetLayout>
  );
};

export default QuantPlanet;