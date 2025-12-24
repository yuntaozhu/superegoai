
import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { TrendingUp, Dna, Cpu, ShieldCheck, Zap, BarChart3, Binary, Workflow } from 'lucide-react';

const m = motion as any;

const QuantPlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'quant')!;

  const phases = [
    {
      id: '01',
      title: 'Alpha Hunter - 从论文到算法',
      subtitle: 'Research & Coder Agents',
      mission: '利用 Gemini 3 的百万级上下文能力，将复杂的 Arxiv 量化论文直接转化为可执行的 Python 策略代码。',
      tech: ['Gemini 3 Multi-modal', 'Deep Research', 'Self-Healing Code'],
      deliverable: '论文解析与代码自动生成工作流',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-emerald-400 to-cyan-500'
    },
    {
      id: '02',
      title: 'The Arena - 双 Agent 对抗优化',
      subtitle: 'Backtest & Optimizer Agents',
      mission: '构建 Backtest Agent 与 Optimizer Agent 的闭环博弈。通过 LangGraph 实现“策略回测-结果反馈-代码迭代”的自动循环。',
      tech: ['VectorBT', 'LangGraph Loops', 'Sharpe Ratio Optimization'],
      deliverable: '自动参数调优与策略进化沙盒',
      icon: <Workflow className="w-6 h-6" />,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: '03',
      title: 'Evolution - 策略基因库与强化学习',
      subtitle: 'Memory & Reinforcement',
      mission: '利用 RAG 技术构建策略基因库。结合遗传算法的思想，让 AI 在历史牛熊周期中自动筛选并杂交最强策略基因。',
      tech: ['Vector DB (Pinecone)', 'Genetic Algorithms', 'RL Feedback'],
      deliverable: '具备长期记忆的自我进化策略系统',
      icon: <Dna className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: '04',
      title: 'Deployment - 全自动投研工厂',
      subtitle: 'Risk Control & HUD',
      mission: '构建全自动流水线：从新闻抓取到风险评估（Guardrail Agent）。通过 Streamlit 实现实时监控的一人对冲基金控制台。',
      tech: ['MLOps Pipeline', 'Risk Guardrails', 'Streamlit Dashboard'],
      deliverable: '一人对冲基金流水线 (V1.0)',
      icon: <ShieldCheck className="w-6 h-6" />,
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* 1. HUD Header */}
      <section className="mt-8 mb-24 px-4">
        <div className="max-w-6xl mx-auto bg-black/90 border border-emerald-500/20 rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          <div className="bg-emerald-500/5 border-b border-emerald-500/10 py-3 px-8 flex items-center justify-between">
             <div className="flex gap-6 items-center">
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-500 font-mono text-[10px] tracking-widest uppercase">Agent_Swarm_Active</span>
                </div>
                <div className="hidden md:flex gap-8 font-mono text-[10px] text-gray-500">
                   <span className="text-emerald-400/60">BTC/USDT: 96,420.00 (+1.2%)</span>
                   <span>GENE_POOL: 1,428 UNITS</span>
                   <span>LATENCY: 12ms</span>
                </div>
             </div>
             <div className="text-[10px] font-mono text-gray-600">VER: 2025.QUANT.01</div>
          </div>
          
          <div className="p-10 md:p-16 flex flex-col lg:flex-row gap-16 items-center">
             <div className="flex-1 space-y-8">
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                  From Paper <br/> <span className="text-emerald-400 italic">To Profit</span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
                  不再是被动的跟风者。在本课程中，你将构建一套 <span className="text-white font-bold">全自动量化投研工厂</span>。利用多智能体编排，实现从学术论文到实盘交易的认知平权。
                </p>
                <div className="flex flex-wrap gap-4">
                   <div className="px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">Strategy_Evolution</div>
                   <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-500 font-mono text-xs uppercase tracking-widest font-bold">Zero_Human_Inference</div>
                </div>
             </div>
             <div className="flex-1 w-full max-w-md aspect-video bg-emerald-950/20 rounded-3xl border border-emerald-500/10 p-8 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                <div className="font-mono text-[9px] text-emerald-500/70 space-y-2">
                   <p className="flex justify-between"><span>[INF] Loading Arxiv:2405.xxxxx...</span><span className="text-white">DONE</span></p>
                   <p className="flex justify-between"><span>[AGENT] Researching Alpha Logic...</span><span className="text-white">DONE</span></p>
                   <p className="flex justify-between"><span>[AGENT] Coding VectorBT Logic...</span><span className="text-emerald-400 animate-pulse">RUNNING</span></p>
                   <p className="flex justify-between"><span>[ARENA] Sharpe Ratio: 2.41</span><span className="text-amber-400">UPDATING</span></p>
                </div>
                <div className="flex justify-center py-6">
                   <BarChart3 className="w-16 h-16 text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors duration-700" />
                </div>
                <div className="text-right"><span className="text-[10px] font-mono text-emerald-500/40 uppercase">Sovereign_Node_01</span></div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. Evolution Matrix */}
      <section className="mb-40 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          {phases.map((phase, idx) => (
            <m.div 
              key={phase.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative bg-white/5 border border-white/10 rounded-[48px] overflow-hidden backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-500"
            >
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${phase.color}`} />
              <div className="p-8 md:p-16 flex flex-col lg:flex-row gap-12 md:gap-20">
                 <div className="lg:w-1/3 space-y-6">
                    <div className="flex items-center gap-4">
                       <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-white shadow-xl`}>{phase.icon}</div>
                       <div>
                          <div className="text-xs font-mono text-emerald-500 font-black">PHASE_{phase.id}</div>
                          <div className="text-white font-black text-sm uppercase tracking-widest">{phase.subtitle}</div>
                       </div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase leading-tight">{phase.title}</h3>
                    <div className="flex flex-wrap gap-2">
                       {phase.tech.map(t => (
                         <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-gray-500">{t}</span>
                       ))}
                    </div>
                 </div>

                 <div className="lg:w-2/3 flex flex-col gap-10">
                    <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                       {phase.mission}
                    </p>
                    <div className="p-8 bg-black/40 rounded-[32px] border border-white/5 relative overflow-hidden">
                       <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.3em] mb-4 block">核心交付物 // Output</span>
                       <div className="text-white font-black text-xl md:text-2xl tracking-tighter uppercase">{phase.deliverable}</div>
                       <div className="absolute top-0 right-0 p-6 opacity-5"><Binary className="w-20 h-20" /></div>
                    </div>
                 </div>
              </div>
            </m.div>
          ))}
        </div>
      </section>

      {/* 3. The Goal Section */}
      <section className="mb-40 px-4">
        <m.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-5xl mx-auto p-12 md:p-24 bg-gradient-to-br from-emerald-900/20 via-brand-dark to-brand-dark border border-emerald-500/20 rounded-[80px] text-center space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs uppercase tracking-widest font-black">
             Final Outcome: The Hedge Fund of One
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
            成为掌握系统的 <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">全能架构师</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed italic">
            "在不确定的市场中，寻找确定的进化逻辑。你不再是交易员，你是这套自我进化机器的首席设计师。"
          </p>
          <div className="flex justify-center gap-12 md:gap-24 pt-10">
             <div className="text-center">
                <div className="text-3xl md:text-5xl font-black text-white mb-2">100%</div>
                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Automation</div>
             </div>
             <div className="text-center">
                <div className="text-3xl md:text-5xl font-black text-white mb-2">Gemini 3</div>
                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Reasoning Hub</div>
             </div>
             <div className="text-center">
                <div className="text-3xl md:text-5xl font-black text-white mb-2">Unlimited</div>
                <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Evolutions</div>
             </div>
          </div>
        </m.div>
      </section>

      <style>{`
        .bg-grid-pattern { background-image: linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px); background-size: 40px 40px; }
      `}</style>
    </PlanetLayout>
  );
};

export default QuantPlanet;
