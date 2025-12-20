
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

  const modules = [
    {
      id: 'L1',
      title: 'L1 - AI 工具精通：驱动数学建模与求解',
      goal: '运用 AI 工具进行建模，掌握费曼法，解决复杂分析问题。',
      tech: ['GPT-4/Gemini', 'Python', 'Solvers', 'Prompting'],
      content: [
        'GPT-4/Gemini 实战工作坊：问题分解与信息检索',
        'AI 驱动求解器强化：方程求解与符号运算',
        'AI 数据分析：数据探索与图表生成',
        '“费曼时刻”：用通俗语言解释 AI 工具逻辑'
      ],
      outcome: 'AI 工具手册与数学建模问题集',
      gradient: 'from-blue-500 to-indigo-500',
      icon: '🧪'
    },
    {
      id: 'L2',
      title: 'L2 - 构建简单 Agent：任务助手与专家',
      goal: '构建初步的 AI Agent，辅助特定任务，掌握设计思维。',
      tech: ['OO Programming', 'API Sync', 'Light Frameworks'],
      content: [
        'Agent 架构设计：规则与 LLM 驱动架构',
        '自动化数据 Agent：清洗与格式转换逻辑',
        '文献检索 Agent：提取核心学术价值点',
        '费曼挑战：创建并演示 Agent 项目视频'
      ],
      outcome: '功能性 Agent 套件与展示视频',
      gradient: 'from-indigo-500 to-purple-600',
      icon: '🤖'
    },
    {
      id: 'L3',
      title: 'L3 - 构建多 Agent 系统：竞赛与科研引擎',
      goal: '构建协同工作的智能系统，用于生成高质量科研数据。',
      tech: ['LangChain', 'AutoGen', 'Async Py', 'Multi-Agent'],
      content: [
        '多 Agent 通信协议与协同策略设计',
        '竞赛导向系统：HIMCM/AMC 建模支持',
        '科研数据生成：模拟复杂现象并生成数据集',
        '费曼深度应用：团队展示系统架构与原理'
      ],
      outcome: '多 Agent 系统与科研级数据集',
      gradient: 'from-purple-600 to-violet-700',
      icon: '🏛️'
    },
    {
      id: 'L4',
      title: 'L4 - 构建你的 AI “外脑” (ExtBrain)',
      goal: '构建集成 Agent 与知识库的高级科研系统伙伴。',
      tech: ['Vector DB', 'Knowledge Graphs', 'RAG'],
      content: [
        '高级 Agent 定制与专业模型集成方案',
        '个人知识库：向量数据库与知识图谱应用',
        'ExtBrain 协同流：实现师生与外脑无缝协作',
        '进化策略：制定“外脑”长期发展迭代路径'
      ],
      outcome: '个性化 ExtBrain 系统与愿景演示',
      gradient: 'from-violet-700 to-fuchsia-800',
      icon: '🧬'
    }
  ];

  const coreAbilities = [
    { name: '阅读/写作', icon: '📝', desc: '利用 AI 快速消化海量文献。' },
    { name: '工程能力', icon: '🏗️', desc: '从工具进阶到 Agent 系统架构。' },
    { name: '建模能力', icon: '📐', desc: '将复杂问题抽象为数学模型。' },
    { name: '预测能力', icon: '🔮', desc: '利用数据进行非线性趋势推演。' },
    { name: '分析能力', icon: '🔎', desc: '透过现象进行深度系统思考。' }
  ];

  return (
    <PlanetLayout course={course}>
      {/* Scientist Lab Header */}
      <section className="mt-8 md:mt-16 mb-16 md:mb-24 px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="h-0.5 w-10 bg-indigo-500"></span>
              <span className="text-indigo-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em]">ExtBrain_Research_OS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
              构建你的 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-600">AI “外脑” (ExtBrain)</span>
            </h2>
            <p className="text-base md:text-xl text-gray-300 leading-relaxed font-light">
              不仅仅是编程课，而是构建“私人科研中台”。通过 <span className="text-indigo-400 font-bold">建模</span> 辅助高阶学术研究，取得跨代竞赛优势。
            </p>
          </m.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {coreAbilities.map((a, i) => (
              <div key={i} className={`p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-[32px] text-center hover:bg-white/10 transition-colors ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                 <div className="text-2xl md:text-3xl mb-2 md:mb-4">{a.icon}</div>
                 <h4 className="text-white font-bold text-xs md:text-sm mb-1">{a.name}</h4>
                 <p className="text-gray-500 text-[8px] md:text-[9px] uppercase font-mono">{a.desc.substring(0, 20)}...</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evolutionary Lab Levels */}
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
                       <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl md:text-4xl shadow-inner">
                          {m_mod.icon}
                       </div>
                       <div className="text-[10px] font-mono text-gray-600">LEVEL_0{idx + 1}</div>
                    </div>
                    <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight">{m_mod.title}</h3>
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
                        <div key={i} className="p-5 md:p-8 bg-black/40 rounded-2xl md:rounded-[32px] border border-white/5 flex gap-3 md:gap-4 items-start hover:bg-black/60 transition-colors">
                           <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-mono text-[9px] md:text-[10px] flex-shrink-0">
                             {i + 1}
                           </div>
                           <p className="text-gray-300 text-[11px] md:text-sm leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className={`p-6 md:p-8 bg-gradient-to-br ${m_mod.gradient} rounded-2xl md:rounded-3xl text-center relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500 shadow-xl`}>
                       <span className="text-[9px] md:text-[10px] font-mono text-white/60 uppercase tracking-widest">Stage Deliverable</span>
                       <div className="text-white font-black mt-1 md:mt-2 text-base md:text-xl tracking-tight uppercase">{m_mod.outcome}</div>
                       <div className="absolute top-0 right-0 p-4 opacity-10 text-5xl md:text-6xl">{m_mod.icon}</div>
                    </div>
                 </div>
              </div>
            </m.div>
          ))}
        </div>
      </section>

      {/* Feynman Method Spotlight */}
      <section className="mt-20 md:mt-40 mb-10 md:mb-20 px-4 md:px-0">
        <div className="max-w-4xl mx-auto p-8 md:p-20 bg-indigo-900/10 border border-indigo-500/20 rounded-[40px] md:rounded-[64px] backdrop-blur-xl relative overflow-hidden text-center">
          <div className="relative z-10">
            <h3 className="text-xl md:text-3xl font-black text-white mb-6 md:mb-8 uppercase tracking-tighter">费曼学习法：深度进化的灵魂</h3>
            <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-light mb-8 md:mb-12">
              不仅是完成代码，还需通过 <span className="text-indigo-400 font-bold">“费曼时刻”</span> 总结 AI 逻辑。如果你不能用最简单的语言向小孩解释清楚，说明你还没真正掌握它。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
              <div className="p-6 md:p-8 bg-black/40 rounded-3xl border border-white/5">
                <h4 className="text-indigo-300 font-bold mb-2 md:mb-3 text-sm md:text-base">费曼时刻 (Review)</h4>
                <p className="text-gray-500 text-[10px] md:text-xs italic">每节课后，轮流用最通俗语言总结科研 Agent 的协作逻辑。</p>
              </div>
              <div className="p-6 md:p-8 bg-black/40 rounded-3xl border border-white/5">
                <h4 className="text-indigo-300 font-bold mb-2 md:mb-3 text-sm md:text-base">费曼挑战 (Create)</h4>
                <p className="text-gray-500 text-[10px] md:text-xs italic">产出“愿景与演示组合”，展示 ExtBrain 的实战应用价值。</p>
              </div>
            </div>
          </div>
          {/* Neural Decoration */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
             <svg width="100%" height="100%" viewBox="0 0 100 100">
                <circle cx="20" cy="20" r="1" fill="white" />
                <circle cx="80" cy="20" r="1" fill="white" />
                <circle cx="50" cy="50" r="1.5" fill="white" />
                <circle cx="20" cy="80" r="1" fill="white" />
                <circle cx="80" cy="80" r="1" fill="white" />
                <line x1="20" y1="20" x2="50" y2="50" stroke="white" strokeWidth="0.5" />
                <line x1="80" y1="20" x2="50" y2="50" stroke="white" strokeWidth="0.5" />
                <line x1="20" y1="80" x2="50" y2="50" stroke="white" strokeWidth="0.5" />
                <line x1="80" y1="80" x2="50" y2="50" stroke="white" strokeWidth="0.5" />
             </svg>
          </div>
        </div>
      </section>
    </PlanetLayout>
  );
};

export default ResearchPlanet;
