
import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

// Using any to bypass framer-motion type mismatch in the current environment
const m = motion as any;

const ResearchPlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'digital-twin')!;

  // Syllabus based on the new "SuperEgo: AI Native Model Thinking" Curriculum
  const modules = [
    {
      id: 'L1',
      title: 'L1 - 统计之眼：降维打击与贝叶斯',
      goal: '从“直觉偏差”到“统计学世界观”。',
      tech: ['Bayesian Theorem', 'PCA', 'Python', 'Fat Tails'],
      content: [
        '贝叶斯定理实战：如何用先验概率与新证据科学更新世界观',
        '主成分分析 (PCA)：从 100 个混乱变量中提取关键因子 (Signal)',
        '幂律与肥尾效应：重新理解风险，超越正态分布的局限',
        'AI Coding: 编写 "Bayesian Updater" 与 "Dimensionality Reducer" 工具'
      ],
      outcome: 'Bayesian Updater & PCA Visualization Tool',
      gradient: 'from-blue-500 to-indigo-500',
      icon: '👁️'
    },
    {
      id: 'L2',
      title: 'L2 - 博弈之心：活策略与系统 2',
      goal: '战胜人性弱点（卡尼曼），在多方博弈中寻找最优解。',
      tech: ['Game Theory', 'Nash Equilibrium', 'System 2 Agent', 'Signaling'],
      content: [
        '思考，快与慢：识别认知偏差（损失厌恶、锚定效应）',
        '博弈论进阶：纳什均衡、混合策略与重复博弈',
        'AI Coding: 搭建 "Rational Check Agent"（理性审查官）阻拦冲动决策',
        'Game Sim: 模拟拍卖与价格战，计算 Payoff Matrix'
      ],
      outcome: 'Rational Check Agent & Game Theory Simulator',
      gradient: 'from-indigo-500 to-purple-600',
      icon: '⚖️'
    },
    {
      id: 'L3',
      title: 'L3 - 生成式社会：LLM Agent 动态仿真',
      goal: '从“静态方程”到“智能体涌现”，社会科学的粒子加速器。',
      tech: ['LLM Agents', 'Emergent Behavior', 'Social Simulation', 'Camel/MetaGPT'],
      content: [
        'LLM-Based Agents：赋予 Agent 性格、记忆与推理能力',
        '微型社会 (Mini-Society) 搭建：村长、商人、小偷的虚拟博弈',
        '涌现现象观察：模拟谣言传播、市场泡沫形成与组织协作',
        '实验设计： "如果村里突然发了一笔钱，会发生什么？"'
      ],
      outcome: 'Mini-Society Simulation Engine',
      gradient: 'from-purple-600 to-violet-700',
      icon: '🏘️'
    },
    {
      id: 'L4',
      title: 'L4 - 复杂系统：演化与适应',
      goal: '上帝视角，理解系统的生死与适应。',
      tech: ['Complex Systems', 'NK Model', 'Markov Chains', 'Path Dependence'],
      content: [
        '崎岖景观 (NK Model)：模拟创新与适应的本质',
        '马尔可夫链：分析长期稳态，历史真的重要吗？',
        '路径依赖：理解锁定效应与蝴蝶效应',
        'Capstone: "SuperEgo 预言机" —— 基于仿真的深度策略报告'
      ],
      outcome: 'SuperEgo Oracle Strategy Report',
      gradient: 'from-violet-700 to-fuchsia-800',
      icon: '🕸️'
    }
  ];

  const learningFlow = [
    { name: '直觉 (Intuition)', icon: '🧠', desc: '引出直觉不可靠 (如琳达问题)。' },
    { name: '数学 (Math)', icon: '📐', desc: '引入贝叶斯或 PCA 原理。' },
    { name: '代码 (Code)', icon: '💻', desc: 'AI 写 Python 实现数学过程。' },
    { name: '洞察 (Insight)', icon: '💡', desc: '看代码结果，校准直觉。' }
  ];

  return (
    <PlanetLayout course={course}>
      {/* 1. Header Section */}
      <section className="mt-8 md:mt-16 mb-16 md:mb-24 px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="h-0.5 w-10 bg-indigo-500"></span>
              <span className="text-indigo-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em]">Probabilistic_Second_Brain</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
              SuperEgo: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-600">AI 原生模型思维</span>
            </h2>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
              人类大脑不仅有“快思考”（直觉），更需要一个“慢思考”（SuperEgo）的数字替身。用 <span className="text-indigo-400 font-bold">贝叶斯</span> 更新认知，用 <span className="text-violet-400 font-bold">LLM 仿真</span> 推演未来。
            </p>
            <div className="flex gap-4">
               <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-gray-400">#System2</span>
               <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-gray-400">#Bayesian</span>
               <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-gray-400">#GenerativeSim</span>
            </div>
          </m.div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {learningFlow.map((a, i) => (
              <div key={i} className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-[32px] text-center hover:bg-white/10 transition-colors">
                 <div className="text-xl md:text-3xl mb-2 md:mb-3">{a.icon}</div>
                 <h4 className="text-white font-bold text-xs md:text-sm mb-1">{a.name}</h4>
                 <p className="text-gray-500 text-[9px] uppercase font-mono leading-tight">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Modules Section */}
      <section className="py-12 md:py-20 px-4 md:px-0">
        <div className="space-y-12 md:space-y-20">
          {modules.map((m_mod, idx) => (
            <m.div 
              key={m_mod.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-brand-surface border border-white/10 rounded-[32px] md:rounded-[56px] overflow-hidden backdrop-blur-xl hover:border-indigo-500/20 transition-all duration-500"
            >
              <div className={`absolute top-0 left-0 w-1.5 md:w-3 h-full bg-gradient-to-b ${m_mod.gradient}`} />
              <div className="p-8 md:p-20 flex flex-col lg:flex-row gap-8 md:gap-12">
                 <div className="lg:w-1/3 space-y-4 md:space-y-8">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-xl md:text-3xl shadow-inner`}>
                          {m_mod.icon}
                       </div>
                       <div className="text-[10px] font-mono text-gray-600">LEVEL_0{idx + 1}</div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-tight">{m_mod.title}</h3>
                    <p className="text-gray-400 text-[10px] md:text-sm italic">{m_mod.goal}</p>
                    <div className="flex flex-wrap gap-2 pt-2 md:pt-4">
                       {m_mod.tech.map(t => (
                         <span key={t} className="px-2 md:px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[8px] md:text-[10px] font-mono text-gray-500">{t}</span>
                       ))}
                    </div>
                 </div>

                 <div className="lg:w-2/3 flex flex-col gap-6 md:gap-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                      {m_mod.content.map((item, i) => (
                        <div key={i} className="p-5 md:p-6 bg-black/40 rounded-2xl md:rounded-[32px] border border-white/5 flex gap-3 md:gap-4 items-start hover:bg-black/60 transition-colors">
                           <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-mono text-[9px] md:text-[10px] flex-shrink-0">
                             {i + 1}
                           </div>
                           <p className="text-gray-300 text-[11px] md:text-sm leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`p-6 md:p-8 bg-gradient-to-br ${m_mod.gradient} rounded-2xl md:rounded-3xl text-center relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500 shadow-xl`}>
                       <span className="text-[9px] md:text-[10px] font-mono text-white/60 uppercase tracking-widest">Stage Deliverable</span>
                       <div className="text-white font-black mt-1 md:mt-2 text-sm md:text-lg tracking-tight uppercase">{m_mod.outcome}</div>
                       <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl md:text-5xl">{m_mod.icon}</div>
                    </div>
                 </div>
              </div>
            </m.div>
          ))}
        </div>
      </section>

      {/* 3. Value Proposition Section */}
      <section className="mt-20 md:mt-40 mb-10 md:mb-20 px-4 md:px-0">
        <div className="max-w-5xl mx-auto p-8 md:p-20 bg-indigo-900/10 border border-indigo-500/20 rounded-[40px] md:rounded-[64px] backdrop-blur-xl relative overflow-hidden">
          <div className="relative z-10 text-center mb-12">
            <h3 className="text-lg md:text-2xl font-black text-white mb-4 uppercase tracking-tighter">双轨价值赋能</h3>
            <p className="text-gray-400 font-light text-sm md:text-base">从升学背景提升到商业决策避险</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative z-10">
             <div className="space-y-6 text-left p-6 rounded-3xl bg-black/20 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                   <span className="text-2xl">🎓</span>
                   <h4 className="text-white font-bold text-lg">对于学生 (升学背景)</h4>
                </div>
                <ul className="space-y-4 text-sm text-gray-300">
                   <li className="flex gap-3"><span className="text-indigo-400 font-bold">稀缺性:</span> 掌握 LLM Agent Simulation 和贝叶斯推断，展示研究生级别的科研视野。</li>
                   <li className="flex gap-3"><span className="text-indigo-400 font-bold">跨学科:</span> 完美结合计算机科学 (AI/Python) + 统计学 + 心理学/经济学。</li>
                </ul>
             </div>

             <div className="space-y-6 text-left p-6 rounded-3xl bg-black/20 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                   <span className="text-2xl">💼</span>
                   <h4 className="text-white font-bold text-lg">对于成人 (决策赋能)</h4>
                </div>
                <ul className="space-y-4 text-sm text-gray-300">
                   <li className="flex gap-3"><span className="text-purple-400 font-bold">去魅:</span> 祛除对“大数据”的迷信，用统计学 (PCA) 看透数据噪音。</li>
                   <li className="flex gap-3"><span className="text-purple-400 font-bold">推演:</span> 投入真金白银前，先在虚拟世界模拟市场博弈，极大降低决策风险。</li>
                </ul>
             </div>
          </div>

          {/* Background Decoration */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <svg width="100%" height="100%" viewBox="0 0 100 100">
                <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.2" />
                <path d="M0,50 Q25,75 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.2" />
             </svg>
          </div>
        </div>
      </section>
    </PlanetLayout>
  );
};

export default ResearchPlanet;
