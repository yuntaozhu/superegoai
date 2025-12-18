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
        // Fix: Removed incorrect JSX-style string interpolation from plain string literal
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
        // Fix: Removed incorrect JSX-style string interpolation from plain string literal
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
        // Fix: Removed incorrect JSX-style string interpolation from plain string literal
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
      {/* Hero: Ticker & Status */}
      <section className="mt-8 mb-20">
        <div className="bg-black/80 border border-emerald-500/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.1)]">
          <div className="bg-emerald-500/10 border-b border-emerald-500/20 py-2 px-6 flex items-center overflow-hidden whitespace-nowrap">
            <div className="flex gap-12 animate-marquee font-mono text-[10px] text-emerald-400 uppercase tracking-widest">
              <span>SYSTEM: ONLINE</span>
              <span>AGENT_SWARM: ACTIVE (5)</span>
              <span>MEMORY_POOLS: VECTOR_DB_CONNECTED</span>
              <span>TARGET_SHARPE: 2.0+</span>
              <span>MARKET_DRIFT_MONITOR: ON</span>
            </div>
          </div>
          
          <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-tight">
                量化投研工厂 <br/>
                <span className="text-emerald-400">全自动化进化系统</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                不只是编写算法，而是构建一个能够自我进化的 <span className="text-emerald-400 font-bold">Multi-Agent</span> 系统。从输入一篇 Arxiv 论文开始，到策略生成、对抗优化、直至最终部署，全流程智能驱动。
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-xs font-mono text-emerald-300">
                  GEMINI_3_MODALITY: ENABLED
                </div>
                <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs font-mono text-blue-300">
                  CONTEXT_WINDOW: 1M+ TOKEN
                </div>
              </div>
            </motion.div>

            <div className="relative aspect-video bg-emerald-950/20 rounded-3xl border border-emerald-500/20 p-6 flex flex-col justify-between overflow-hidden">
               {/* Terminal Style Animation */}
               <div className="font-mono text-[10px] space-y-1 text-emerald-400/70">
                  <div>[RESEARCH_AGENT] Analyzed: MACD Divergence logic extracted.</div>
                  <div className="text-blue-400">[CODER_AGENT] Translating logic to Python/VectorBT...</div>
                  <div className="text-amber-400">[BACKTEST_AGENT] Sharpe: 0.8. MaxDrawdown: 12%</div>
                  <div className="text-purple-400">[OPTIMIZER_AGENT] Suggesting ATR filter for volatility...</div>
                  <div className="animate-pulse">_</div>
               </div>
               
               <div className="flex justify-center mt-4">
                  <svg className="w-32 h-32 text-emerald-500/40" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
                    <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.5" />
                    <motion.circle 
                      cx="50" cy="30" r="4" fill="currentColor" 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} 
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </svg>
               </div>
               
               <div className="text-right">
                  <span className="text-xs font-mono text-emerald-500">AutoQuant-G3 Console // Ready</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Roadmap */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-8 w-[2px] h-full bg-gradient-to-b from-emerald-500/50 via-white/10 to-transparent hidden lg:block" />
        
        <div className="space-y-24">
          {modules.map((m, idx) => (
            <motion.div 
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative lg:pl-24"
            >
              <div className="absolute top-0 left-4 w-8 h-8 bg-brand-dark border-2 border-emerald-500 rounded-full flex items-center justify-center z-20 hidden lg:flex">
                <span className="text-[10px] font-black text-emerald-500">{m.id}</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-xl group hover:border-emerald-500/30 transition-all duration-500">
                <div className={`h-2 w-full bg-gradient-to-r ${m.gradient}`} />
                <div className="p-10 md:p-16">
                  <div className="mb-10">
                    <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">{m.title}</h3>
                    <p className="text-emerald-400 text-sm font-mono uppercase tracking-widest">{m.subtitle}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {m.lessons.map((lesson, lIdx) => (
                      <div key={lIdx} className="space-y-4">
                        <div className="text-[10px] font-mono text-gray-500 uppercase">Lesson 0{lIdx + 1}</div>
                        <h4 className="text-white font-bold leading-snug">{lesson.title}</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">{lesson.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-3">
                    {m.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-mono text-emerald-400 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AutoQuant-G3 Project Highlight */}
      <section className="mt-32">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-emerald-900/40 to-cyan-900/40 border border-emerald-500/30 rounded-[56px] p-12 md:p-20 relative overflow-hidden backdrop-blur-xl">
          <div className="relative z-10 text-center space-y-8">
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase">项目交付：AutoQuant-G3</h2>
            <p className="text-gray-300 text-lg font-light leading-relaxed">
              你将亲手打造一个基于 Streamlit 的智能量化控制台。只需上传研报 PDF，系统将自动演示从“因子提取”到“夏普提升”的全程进化 Log。
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex-1">
                <div className="text-2xl mb-4">📄</div>
                <div className="text-xs text-gray-400 uppercase mb-2 font-mono">Input</div>
                <div className="text-white font-bold">Arxiv PDF / URL</div>
              </div>
              <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex-1">
                <div className="text-2xl mb-4">🧬</div>
                <div className="text-xs text-gray-400 uppercase mb-2 font-mono">Process</div>
                <div className="text-white font-bold">Multi-Agent Swarm</div>
              </div>
              <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex-1">
                <div className="text-2xl mb-4">💹</div>
                <div className="text-xs text-gray-400 uppercase mb-2 font-mono">Output</div>
                <div className="text-white font-bold">Sharpe 1.8+ Strategy</div>
              </div>
            </div>

            <button className="px-12 py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-[0_0_50px_rgba(16,185,129,0.3)] transition-all">
              开启智能进化之旅
            </button>
          </div>
          
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />
        </div>
      </section>

      {/* Tech Highlights Sidebar-style Footer */}
      <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-white/10 pt-20">
         <div className="space-y-6">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">教学方法亮点</h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-emerald-500">📘</div>
                <div>
                   <h4 className="text-white font-bold text-sm">Prompt Library</h4>
                   <p className="text-gray-500 text-xs">提供一套经过验证的、针对量化交易的高级 Prompt 库。</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-emerald-500">🐞</div>
                <div>
                   <h4 className="text-white font-bold text-sm">Agent Debugging</h4>
                   <p className="text-gray-500 text-xs">教会学员通过查看 Agent 对话日志调试“思维链”，而非仅仅调试代码。</p>
                </div>
              </div>
            </div>
         </div>
         
         <div className="p-10 bg-emerald-500/10 rounded-[40px] border border-emerald-500/20 text-center">
            <div className="text-5xl mb-6">🎯</div>
            <p className="text-emerald-100 text-lg font-medium landmark italic">
              "将 Gemini 3 的能力运用到极致，从知识摄取到执行优化，再到自我进化，形成一个完整的 AI 量化闭环。"
            </p>
         </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </PlanetLayout>
  );
};

export default QuantPlanet;