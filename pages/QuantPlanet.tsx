
import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

// Using any to bypass framer-motion type mismatch in the current environment
const m = motion as any;

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
        { title: 'Gemini 3 多模态投研能力', desc: '利用百万级上下文读取 Arxiv 论文，解析图表。' },
        { title: 'Research Agent (研究员)', desc: '输入 PDF -> 输出策略逻辑伪代码文档。' },
        { title: 'Coder Agent (程序员)', desc: '资深量化开发角色扮演，自愈系统修正错误。' }
      ],
      tech: ['Gemini 3 Vision', 'Prompt Design', 'Self-Correction'],
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'M2',
      title: '模块二：The Arena —— 双 Agent 对抗与优化',
      subtitle: '核心任务：构建“回测”与“调参”闭环交互系统',
      lessons: [
        { title: 'Backtest Agent (执行官)', desc: '加载历史数据运行回测，输出 Sharpe/Sortino 报告。' },
        { title: 'Optimizer Agent (专家)', desc: '基于推理进行参数优化，实现 Agent 自动对话。' },
        { title: '闭环实战', desc: '使用 LangGraph 实现循环节点，对话直至 Sharpe > 2.0。' }
      ],
      tech: ['LangGraph', 'VectorBT', 'Reasoning Tuning'],
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'M3',
      title: '模块三：Evolution —— 进化与自我强化',
      subtitle: '核心任务：实现策略的生命周期管理与遗传变异',
      lessons: [
        { title: '策略基因库 (RAG)', desc: '将代码片段、回测结果与原因存入向量库。' },
        { title: 'Evolution Agent (进化)', desc: '遗传算法交叉与变异逻辑融合。' },
        { title: '强化学习反馈', desc: '监控 Data Drift，自动淘汰失效策略，生成变种。' }
      ],
      tech: ['Vector DB', 'Genetic Algorithm', 'RL'],
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'M4',
      title: '模块四：实战与部署 (Capstone)',
      subtitle: '核心任务：构建全自动投研工厂流水线',
      lessons: [
        { title: '全自动流水线', desc: '抓取 -> 因子提炼 -> 代码 -> 优化 -> 实盘评估。' },
        { title: '守门员 Agent (风控)', desc: '进入实盘前进行硬编码风控检查。' },
        { title: 'AutoQuant 控制台', desc: '完成 Streamlit 控制台，支持 PDF 与日志显示。' }
      ],
      tech: ['MLOps', 'Guardrail Agents', 'HI-LOOP'],
      gradient: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* Trading HUD Header */}
      <section className="mt-8 mb-12 md:mb-20 px-4 md:px-0">
        <div className="bg-black/90 border border-emerald-500/20 rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl">
          <div className="bg-emerald-500/5 border-b border-emerald-500/10 py-2 md:py-3 px-4 md:px-8 flex items-center justify-between">
             <div className="flex gap-4 md:gap-8 items-center overflow-hidden whitespace-nowrap">
                <div className="flex gap-2 items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-500 font-mono text-[8px] md:text-[10px] tracking-widest">SWARM_ACTIVE</span>
                </div>
                <div className="flex gap-8 animate-marquee font-mono text-[8px] md:text-[10px] text-emerald-400/50 uppercase">
                   <span>BTC/USDT: 98,241.00 +2.4%</span>
                   <span>SHARPE: 2.0+</span>
                   <span>LATENCY: 14MS</span>
                   <span>GENE_POOL: 1,248</span>
                </div>
             </div>
             <span className="font-mono text-[8px] text-gray-600 uppercase hidden sm:block">SYS_TIME: 2025_UTC</span>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="space-y-6 md:space-y-8"
            >
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase leading-tight">
                量化投研工厂 <br/>
                <span className="text-emerald-400">全进化系统</span>
              </h2>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
                不只是编写算法，而是构建一个能够自我进化的 <span className="text-emerald-400 font-bold">Multi-Agent</span> 系统。从 Arxiv 论文到部署，全流程智能驱动。
              </p>
              <div className="flex gap-4 md:gap-6">
                {['⚡', '🧬', '🏗️'].map((ico, i) => (
                  <div key={i} className="p-3 md:p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl md:rounded-2xl flex flex-col items-center gap-2">
                     <span className="text-lg md:text-xl">{ico}</span>
                     <span className="text-[7px] md:text-[9px] font-mono text-emerald-300 uppercase">{['Context', 'Evolve', 'Swarm'][i]}</span>
                  </div>
                ))}
              </div>
            </m.div>

            <div className="relative aspect-video bg-emerald-950/20 rounded-3xl md:rounded-[48px] border border-emerald-500/10 p-6 md:p-8 flex flex-col justify-between overflow-hidden group">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
               <div className="font-mono text-[7px] md:text-[9px] space-y-1 md:space-y-1.5 text-emerald-400/80 z-10">
                  <div className="flex justify-between border-b border-emerald-500/10 pb-1">
                    <span>[RESEARCH]</span>
                    <span className="text-white">ALPHA_EXTRACT... [92%]</span>
                  </div>
                  <div className="flex justify-between border-b border-emerald-500/10 pb-1">
                    <span>[CODER]</span>
                    <span className="text-white">GEN: VECTORBT_READY</span>
                  </div>
                  <div className="flex justify-between border-b border-emerald-500/10 pb-1">
                    <span>[ARENA]</span>
                    <span className="text-amber-500 font-bold">SHARPE: 0.82 {'->'} OPT...</span>
                  </div>
                  <div className="flex justify-between border-b border-emerald-500/10 pb-1">
                    <span>[EVO]</span>
                    <span className="text-purple-400">SUCCESS: GEN_04</span>
                  </div>
               </div>
               
               <div className="flex justify-center my-2">
                  <svg className="w-24 h-24 md:w-36 md:h-36 text-emerald-500/30 group-hover:scale-105 transition-transform duration-1000" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
                    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
                    <m.path 
                      d="M 50 5 L 50 95 M 5 50 L 95 50" 
                      stroke="currentColor" 
                      strokeWidth="0.5"
                      animate={{ opacity: [0.1, 0.4, 0.1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  </svg>
               </div>
               
               <div className="text-right z-10">
                  <span className="text-[7px] md:text-[9px] font-mono text-emerald-500/40 uppercase">AutoQuant_v3 // online</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Path */}
      <section className="py-12 md:py-20 px-4 md:px-0">
        <div className="space-y-12 md:space-y-16">
          {modules.map((m_mod, idx) => (
            <m.div 
              key={m_mod.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-brand-surface border border-white/10 rounded-[32px] md:rounded-[56px] overflow-hidden backdrop-blur-xl hover:border-emerald-500/20 transition-all duration-500"
            >
              <div className={`absolute top-0 left-0 w-1.5 md:w-3 h-full bg-gradient-to-b ${m_mod.gradient}`} />
              <div className="p-8 md:p-16 flex flex-col lg:flex-row gap-8 md:gap-12">
                 <div className="lg:w-1/3 space-y-4 md:space-y-6">
                    <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Phase_0{idx + 1}</div>
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase leading-tight">{m_mod.title}</h3>
                    <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">{m_mod.subtitle}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                       {m_mod.tech.map(t => (
                         <span key={t} className="px-2 md:px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[8px] md:text-[10px] font-mono text-gray-500">{t}</span>
                       ))}
                    </div>
                 </div>

                 <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {m_mod.lessons.map((lesson, lIdx) => (
                      <div key={lIdx} className="p-6 md:p-8 bg-black/40 rounded-2xl md:rounded-[32px] border border-white/5 hover:bg-black/60 transition-colors">
                        <div className="text-[8px] md:text-[10px] font-mono text-gray-600 mb-2 uppercase">LESSON_0{lIdx + 1}</div>
                        <h4 className="text-white font-bold mb-2 text-sm md:text-base">{lesson.title}</h4>
                        <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed">{lesson.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
            </m.div>
          ))}
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
