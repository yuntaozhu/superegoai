import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const ResearchPlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'digital-twin')!;

  const modules = [
    {
      id: 'L1',
      title: 'L1 - AI 工具精通：驱动数学建模与复杂问题求解',
      goal: '熟练运用 AI 工具进行数学建模，掌握费曼学习法入门，解决复杂分析问题。',
      tech: ['GPT-4/Gemini', 'Python (NumPy/Pandas)', 'Symbolic Solvers', 'Prompt Engineering'],
      content: [
        'GPT-4/Gemini 实战工作坊：问题分解与信息检索',
        'AI 驱动求解器强化训练：方程求解与符号运算',
        'AI 数据分析与可视化：数据探索与图表生成',
        '“费曼时刻”：用最简单的语言解释 AI 工具功能'
      ],
      outcome: '产出：精通 AI 工具使用手册与数学建模问题集。',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'L2',
      title: 'L2 - 构建简单 Agent：任务助手与问题解决专家',
      goal: '构建初步的 AI Agent，辅助完成特定任务，掌握 Agent 设计思维。',
      tech: ['OO Programming', 'API Integration', 'Lightweight Frameworks'],
      content: [
        'Agent 架构设计：基于规则与 LLM 驱动',
        '自动化数据处理 Agent：清洗与格式转换',
        '文献检索与摘要 Agent：快速提取核心学术价值',
        '费曼挑战：创建并演示完整 Agent 项目视频'
      ],
      outcome: '产出：功能性简单 Agent 套件与展示视频。',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'L3',
      title: 'L3 - 构建多 Agent 系统：竞赛利器与科研数据引擎',
      goal: '构建多 Agent 协同工作的智能系统，用于参与竞赛和生成科研数据。',
      tech: ['LangChain', 'AutoGen', 'Async Python', 'Multi-Agent Protocols'],
      content: [
        '多 Agent 通信协议与协调策略',
        '竞赛导向系统：HIMCM, AMC 数学建模支持',
        '科研数据生成：模拟复杂现象并生成数据集',
        '费曼深度应用：团队展示系统架构与工作原理'
      ],
      outcome: '产出：具有竞争力的多 Agent 系统与科研数据集。',
      gradient: 'from-purple-600 to-violet-700'
    },
    {
      id: 'L4',
      title: 'L4 - 构建你的 AI “外脑” (ExtBrain)',
      goal: '构建集成 Agent 与知识库的高度个性化 AI 系统，成为长期学习与科研伙伴。',
      tech: ['Vector DB', 'Knowledge Graphs', 'LLM Fine-tuning Strategy', 'Advanced RAG'],
      content: [
        '高级 Agent 个性化定制与专业模型集成',
        '个人知识库工程：向量数据库与知识图谱应用',
        'ExtBrain 协同流：实现学生与外脑的无缝协作',
        '进化策略：制定“外脑”的长期发展与迭代路径'
      ],
      outcome: '终极产出：个性化 AI ExtBrain 系统与愿景演示。',
      gradient: 'from-violet-700 to-fuchsia-800'
    }
  ];

  const coreAbilities = [
    { name: '阅读/写作能力', icon: '📝', desc: '利用 AI 快速消化海量文献并产出高质量报告。' },
    { name: '工程能力', icon: '🏗️', desc: '从工具使用进阶到 Agent 系统架构与部署。' },
    { name: '建模能力', icon: '📐', desc: '将现实世界复杂问题抽象为数学模型。' },
    { name: '预测能力', icon: '🔮', desc: '利用数据与模拟进行非线性趋势推演。' },
    { name: '分析能力', icon: '🔎', desc: '透过现象看本质，进行深度系统性思考。' }
  ];

  return (
    <PlanetLayout course={course}>
      {/* Hero Section Extension */}
      <section className="mt-16 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <span className="w-12 h-1 bg-indigo-500 rounded-full"></span>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                科研总指挥官的进阶之路
              </h2>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              引导学生完成从“工具使用者”到“系统架构师”的跨越。核心目标是构建一个
              <span className="text-indigo-400 font-bold">集成了知识库与多智能体协作的个性化“外脑”(ExtBrain)</span>
              。
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                  <h4 className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-2">教学灵魂</h4>
                  <p className="text-white font-bold">费曼学习法 (Feynman Method)</p>
                  <p className="text-gray-500 text-xs mt-2">贯穿始终的“费曼时刻”与“费曼挑战”，将知识深度内化。</p>
               </div>
               <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                <h4 className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-2">驱动引擎</h4>
                <p className="text-white font-bold">竞赛与课题驱动</p>
                <p className="text-gray-500 text-xs mt-2">针对 HiMCM, AMC, 中国芯等顶级赛事进行实战演练。</p>
               </div>
            </div>
          </motion.div>

          {/* Core Abilities Pentagram / Grid */}
          <div className="relative bg-brand-surface/40 border border-white/10 rounded-[48px] p-10 overflow-hidden">
             <h3 className="text-lg font-black text-white mb-8 text-center uppercase tracking-widest opacity-60">五大核心科研能力培养</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {coreAbilities.map((ability, idx) => (
                  <motion.div 
                    key={ability.name}
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 rounded-2xl bg-white/5 border border-white/5 text-center ${idx === 4 ? 'md:col-span-2' : ''}`}
                  >
                    <div className="text-3xl mb-3">{ability.icon}</div>
                    <div className="text-sm font-bold text-white mb-1">{ability.name}</div>
                    <div className="text-[10px] text-gray-500 leading-tight">{ability.desc}</div>
                  </motion.div>
                ))}
             </div>
             {/* Decorative Background logic */}
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Module Timeline */}
      <section className="py-20">
        <div className="space-y-16">
          {modules.map((m, idx) => (
            <motion.div 
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Timeline Connector */}
              {idx < modules.length - 1 && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-16 bg-gradient-to-b from-indigo-500/50 to-transparent hidden lg:block" />
              )}
              
              <div className="bg-white/5 border border-white/10 rounded-[48px] overflow-hidden backdrop-blur-xl group-hover:border-indigo-500/30 transition-all duration-500">
                <div className={`h-2 w-full bg-gradient-to-r ${m.gradient}`} />
                <div className="p-10 md:p-16 flex flex-col lg:flex-row gap-12">
                   {/* Module Header Area */}
                   <div className="lg:w-1/3">
                      <div className="text-indigo-500 font-mono text-sm mb-4">MODULE_{m.id}</div>
                      <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight leading-tight">{m.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-8">{m.goal}</p>
                      
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Tech Stack // 组件库</div>
                        <div className="flex flex-wrap gap-2">
                          {m.tech.map(t => (
                            <span key={t} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] text-indigo-300 font-mono uppercase">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                   </div>

                   {/* Module Content Area */}
                   <div className="lg:w-2/3 flex flex-col gap-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {m.content.map((item, i) => (
                          <div key={i} className="p-6 bg-black/20 rounded-3xl border border-white/5 flex gap-4 items-start">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-[10px] font-black text-indigo-400">
                                {i + 1}
                             </div>
                             <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>

                      <div className={`mt-4 p-8 bg-gradient-to-br ${m.gradient} rounded-[32px] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 group-hover:scale-[1.02] transition-transform`}>
                         <div className="text-white">
                            <div className="text-[10px] font-mono opacity-80 uppercase tracking-widest mb-2">Phase Outcome // 模块产出</div>
                            <div className="text-xl font-black">{m.outcome}</div>
                         </div>
                         <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                           {m.id === 'L4' ? '🌟' : '✔️'}
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feynman Method Highlight */}
      <section className="mt-32 py-20 bg-indigo-950/20 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
           <span className="text-indigo-400 font-mono text-sm uppercase tracking-[0.4em] mb-4 block">Teaching Methodology</span>
           <h3 className="text-4xl font-black text-white mb-8 tracking-tighter uppercase">费曼学习法：深度进化的灵魂</h3>
           <p className="text-gray-400 text-lg leading-relaxed mb-12 font-light">
             我们不仅仅是在教你写代码，更是在教你如何构建一个能够“教”你的系统。通过 {'"费曼时刻"'} 与 {'"费曼挑战"'}，确保每一个技术概念都能被你彻底简化、内化并转化为行动力。
           </p>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                 <h4 className="text-indigo-300 font-bold mb-3">费曼时刻 (Feynman Moment)</h4>
                 <p className="text-gray-400 text-sm italic">“如果你不能向一个六岁小孩解释清楚，那说明你还没懂。”</p>
                 <p className="text-gray-500 text-xs mt-3">每节课后，学生需用最通俗语言总结 AI 逻辑与应用方法。</p>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                 <h4 className="text-indigo-300 font-bold mb-3">费曼挑战 (Feynman Challenge)</h4>
                 <p className="text-gray-400 text-sm italic">“通过创造来彻底掌握。”</p>
                 <p className="text-gray-500 text-xs mt-3">不仅完成代码，还需输出解释系统架构的设计文档与演示视频。</p>
              </div>
           </div>
        </div>
      </section>

      {/* Expected Outcome Grid */}
      <section className="mt-32">
        <div className="max-w-7xl mx-auto px-4">
           <h3 className="text-3xl font-black text-white mb-12 text-center uppercase tracking-tight">完成课程后你将获得</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: '强大的 AI Agent “外脑”', desc: '拥有一个真正懂你、集成了你个人知识库的科研伙伴。' },
                { title: '费曼式系统性思维', desc: '掌握将复杂科学问题降维、简化、内化的核心能力。' },
                { title: '卓越的问题解决能力', desc: '面对数学建模、物理模拟等复杂任务时的从容不迫。' },
                { title: '顶级竞赛与科研经验', desc: '获得 HiMCM, AMC 等顶级国际赛事的实战履历。' },
                { title: '大学申请竞争力', desc: '显著提升学术背景，展现未来型人工智能人才的特质。' },
                { title: '数字孪生科研闭环', desc: '掌握从数据抓取到模型预测的全生命周期管理。' }
              ].map((outcome, i) => (
                <div key={i} className="p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all border-b-2 border-b-indigo-500/20">
                   <div className="text-indigo-400 font-mono text-xs mb-4">0{i + 1} // RESULT</div>
                   <h4 className="text-white font-bold mb-3">{outcome.title}</h4>
                   <p className="text-gray-500 text-sm leading-relaxed">{outcome.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="mt-32 py-20 bg-gradient-to-br from-indigo-900/40 via-brand-dark to-brand-dark border border-indigo-500/30 rounded-[64px] text-center backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">构建你的“超级大脑”</h2>
          <p className="text-gray-300 mb-12 text-xl font-light leading-relaxed">
            在这个不仅是“学习”更是“重塑”的旅程中，开启属于你的 AI 辅助科研时代。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl transition-all">
              立即报名科研行星
            </button>
            <button className="px-12 py-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest transition-all">
              咨询科研方案
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </PlanetLayout>
  );
};

export default ResearchPlanet;