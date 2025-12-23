
import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Shield, Eye, Cpu, Database, Network, LineChart, Target, Zap, Activity } from 'lucide-react';

const m = motion as any;

const SuperEgoPlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'data')!;

  const modules = [
    {
      id: '01',
      title: 'Sovereignty - 认知主权与架构蓝图',
      neuro: 'Exobrain Architecture (外脑架构)',
      theory: 'Extended Mind Thesis (延展心智)',
      tech: ['LangChain', 'Qdrant Setup', 'System Blueprint', 'FTI Flow'],
      mission: '夺回对信息的控制权。建立一套不依赖算法推荐、完全属于你的认知操作系统。',
      deliverable: '认知主权宣言 & 系统蓝图',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-yellow-500 to-amber-600'
    },
    {
      id: '02',
      title: 'The Gatekeeper - 显著性网络与高维摄取',
      neuro: 'Salience Network (显著性网络)',
      theory: 'Attention Economy Mitigation',
      tech: ['ETL Pipelines', 'Filter Agent', 'Metadata Extraction', 'Noise Reduction'],
      mission: '只有高质量的输入才能产生高质量的输出。让 AI 帮你阻挡平庸信息的洪流。',
      deliverable: '自动去噪的数据摄取管道',
      icon: <Eye className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '03',
      title: 'Synthesis - 知识蒸馏与结构化',
      neuro: 'Cognitive Offloading (认知卸载)',
      theory: 'Working Memory Offload',
      tech: ['Unstructured Lib', 'Synthetic Data Gen', 'Concept Graphing', 'Instruction Tuning'],
      mission: '打破“阅读速度”的生物限制。将非结构化笔记转化为 <Instruction, Input, Output> 的知识晶体。',
      deliverable: '结构化的高质量知识库',
      icon: <Database className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: '04',
      title: 'Simulation - 经验模拟与超我微调',
      neuro: 'SuperEgo / Expert Model (专家模拟)',
      theory: 'Mirror Neurons (镜像神经元)',
      tech: ['Llama 3 / Mistral', 'LoRA/QLoRA', 'CoT Training', 'Adapter Deployment'],
      mission: '实现能力平权的关键。通过微调直接继承顶级专家的思维模式，弥补经验差距。',
      deliverable: '个人专属的微调推理模型',
      icon: <Cpu className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: '05',
      title: 'Connection - 联想记忆与全知检索',
      neuro: 'Associative Memory (联想记忆)',
      theory: 'Memex Implementation',
      tech: ['Semantic Chunking', 'Hybrid Search (BM25+Vector)', 'Cohere Rerank', 'Context Injection'],
      mission: '创造力是连接的能力。让系统瞬间发现跨学科、跨时间的隐秘联系，构建全知检索系统。',
      deliverable: '上下文感知的全知检索系统',
      icon: <Network className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: '06',
      title: 'Evolution - 元认知与系统运维',
      neuro: 'Metacognition (元认知)',
      theory: 'Self-Correction Loops',
      tech: ['LangGraph Agents', 'Observability (Opik/LangSmith)', 'Eval Tracing', 'Streamlit HUD'],
      mission: '系统必须自我进化。通过客观数据监控思维过程，消除幻觉，建立自动化测试集。',
      deliverable: '自我进化的认知仪表盘',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* Intro Header */}
      <section className="mt-12 mb-24 text-center space-y-8">
        <m.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 font-mono text-xs font-black uppercase tracking-[0.3em]"
        >
          <Zap className="w-4 h-4" />
          Cognitive Equity Protocol // 能力平权协议
        </m.div>
        
        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
          Engineering Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-200">
            Second Cortex
          </span>
        </h2>
        
        <p className="text-gray-400 text-lg md:text-2xl max-w-4xl mx-auto font-light leading-relaxed">
          这是基于“能力平权”理念和深度融合 <span className="text-white font-bold">Decoding AI</span> 架构与认知神经科学的终极实战。
          不仅是学习，更是构建你的“数字认知外骨骼”。
        </p>
      </section>

      {/* Framework Table Display */}
      <section className="mb-32 overflow-hidden px-4">
        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-[48px] overflow-hidden backdrop-blur-3xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 bg-white/5 border-b border-white/10 text-[10px] font-mono font-black uppercase tracking-widest text-gray-500 p-6 hidden md:grid">
            <div>Module / 模块</div>
            <div>Function / 认知功能</div>
            <div>Tech Stack / 技术栈</div>
            <div>Deliverable / 交付成果</div>
          </div>
          <div className="divide-y divide-white/5">
            {modules.map((m_item) => (
              <div key={m_item.id} className="grid grid-cols-1 md:grid-cols-4 p-6 md:p-10 hover:bg-white/5 transition-colors items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m_item.color} flex items-center justify-center text-white shadow-xl`}>
                    {m_item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-yellow-500 font-black">PHASE_{m_item.id}</div>
                    <div className="text-white font-black text-sm uppercase leading-tight">{m_item.title.split(' - ')[0]}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-white font-bold text-sm">{m_item.neuro}</div>
                  <div className="text-gray-500 text-xs italic">{m_item.theory}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {m_item.tech.slice(0, 3).map(t => (
                    <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-gray-400">{t}</span>
                  ))}
                </div>
                <div className="text-yellow-500/80 font-black text-xs uppercase tracking-wider">
                  {m_item.deliverable}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Module Breakdown */}
      <section className="space-y-32 mb-40">
        {modules.map((m_item, idx) => (
          <div key={m_item.id} className={`flex flex-col lg:flex-row gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            <m.div 
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-10"
            >
              <div className="space-y-4">
                <div className={`w-16 h-1 bg-gradient-to-r ${m_item.color} rounded-full`} />
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
                  {m_item.title}
                </h3>
              </div>
              
              <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    {m_item.icon}
                 </div>
                 <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em] mb-4">Core_Mission // 核心任务</div>
                 <p className="text-gray-200 text-lg md:text-xl font-light leading-relaxed mb-8">
                   {m_item.mission}
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                    <div>
                       <div className="text-[9px] font-black uppercase tracking-widest text-blue-400 mb-2">Technical Realization</div>
                       <ul className="space-y-2">
                          {m_item.tech.map(t => (
                            <li key={t} className="text-xs text-gray-400 flex items-center gap-2">
                               <div className="w-1 h-1 rounded-full bg-blue-500/50" /> {t}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <div>
                       <div className="text-[9px] font-black uppercase tracking-widest text-yellow-500 mb-2">Cognitive Function</div>
                       <p className="text-xs text-gray-400 font-light italic leading-relaxed">
                          基于 {m_item.neuro} 理论，实现 {m_item.theory}。
                       </p>
                    </div>
                 </div>
              </div>
            </m.div>

            <m.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 w-full max-w-md aspect-square rounded-[64px] bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center relative group"
            >
               <div className={`absolute inset-0 rounded-[64px] bg-gradient-to-br ${m_item.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
               <div className="relative text-9xl group-hover:scale-110 transition-transform duration-700 filter drop-shadow-[0_0_30px_rgba(255,215,0,0.2)]">
                  {idx === 0 && '🛡️'}
                  {idx === 1 && '🔭'}
                  {idx === 2 && '💎'}
                  {idx === 3 && '🧬'}
                  {idx === 4 && '🕸️'}
                  {idx === 5 && '📈'}
               </div>
               <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                  <div className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.5em] whitespace-nowrap">Exobrain_Node_0{m_item.id}</div>
               </div>
            </m.div>
          </div>
        ))}
      </section>

      {/* Capstone Project Section */}
      <section className="mb-40 px-4">
        <m.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto p-12 md:p-24 bg-gradient-to-br from-yellow-500/10 via-brand-dark to-brand-dark border border-yellow-500/20 rounded-[80px] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/5 blur-[150px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 space-y-12">
            <div className="text-center">
              <span className="text-yellow-500 font-mono text-xs font-black uppercase tracking-[0.5em]">Ultimate Challenge</span>
              <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mt-4">
                Capstone: The Second Cortex OS
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
               <div className="space-y-8">
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                    <h4 className="text-xl font-bold text-white mb-4">挑战任务：跨越维度的决策</h4>
                    <p className="text-gray-400 font-light leading-relaxed">
                      面对一个完全陌生的复杂领域（如生物科技战略或伦理困境），你将调动整个 Exobrain 系统进行高维攻坚。
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { step: 'Ingest', desc: '系统自动抓取并过滤 50+ 篇相关专业论文。' },
                      { step: 'Synthesize', desc: '后台自动蒸馏出核心概念图谱与知识晶体。' },
                      { step: 'Reason', desc: '调用微调后的“专家模型”，结合全知 RAG 检索。' },
                      { step: 'Reflect', desc: '利用 Opik 追踪 Trace，确保推理逻辑严密无幻觉。' }
                    ].map((s, i) => (
                      <div key={i} className="flex gap-6 items-center">
                         <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-500 font-mono text-xs flex items-center justify-center flex-shrink-0 border border-yellow-500/20">
                            0{i+1}
                         </div>
                         <div className="flex-1">
                            <span className="text-white font-bold uppercase mr-2">{s.step}:</span>
                            <span className="text-gray-500 text-sm">{s.desc}</span>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-black/60 rounded-[48px] p-10 border border-white/5 shadow-inner">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-3 h-3 rounded-full bg-red-500/50" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                     <div className="w-3 h-3 rounded-full bg-green-500/50" />
                     <span className="text-[10px] font-mono text-gray-600 ml-4">Terminal: exobrain-cli v3.1</span>
                  </div>
                  <div className="font-mono text-sm space-y-4">
                     <p className="text-blue-400">{'>>'} cortex.init(strategy_mode='munger')</p>
                     <p className="text-gray-500">Initializing Salience Network... [OK]</p>
                     <p className="text-gray-500">Injecting Context via Hybrid Search... [OK]</p>
                     <p className="text-emerald-400">Loading Fine-tuned Adapter: Expert_V4</p>
                     <p className="text-white">Reasoning Chain generated via LangGraph:</p>
                     <div className="pl-4 border-l border-white/10 space-y-2">
                        <p className="text-gray-500 italic">1. Inversion thinking active...</p>
                        <p className="text-gray-500 italic">2. Synthesizing cross-domain variables...</p>
                        <p className="text-gray-500 italic">3. Checking Trace via Metacognition...</p>
                     </div>
                     <p className="text-yellow-500 font-black animate-pulse">OUTPUT: DECISION_LOCKED_89.4%_CONFIDENCE</p>
                  </div>
               </div>
            </div>
          </div>
        </m.div>
      </section>

      {/* Philosophy Callout */}
      <section className="text-center py-20 bg-white/5 border-y border-white/10 mb-20">
         <div className="max-w-5xl mx-auto px-6">
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-8">不仅仅是证书，而是终身进化的算法</h3>
            <p className="text-gray-400 text-lg md:text-2xl font-extralight italic">
              "本课程不教你如何成为更完美的'螺丝钉'，而是教你如何成为机器的'控制中枢'。你获得的将是一个能够伴随你终身进化、可代码化的第二大脑。"
            </p>
         </div>
      </section>
    </PlanetLayout>
  );
};

export default SuperEgoPlanet;
