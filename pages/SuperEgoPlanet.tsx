
import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Shield, Eye, Cpu, Database, Network, Activity, Zap } from 'lucide-react';

const m = motion as any;

const SuperEgoPlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'data')!;

  const modules = [
    {
      id: '01',
      title: 'Sovereignty - 认知主权与外脑蓝图',
      neuro: 'Exobrain Architecture (外脑架构)',
      theory: 'Extended Mind Thesis (延展心智)',
      tech: ['LangChain', 'Qdrant Setup', 'System Blueprint', 'FTI Flow'],
      mission: '夺回对信息的控制权。建立一套完全属于你的第二外脑操作系统。',
      deliverable: '第二外脑系统蓝图',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-yellow-500 to-amber-600'
    },
    {
      id: '02',
      title: 'The Gatekeeper - 显著性网络与高维摄取',
      neuro: 'Salience Network (显著性网络)',
      theory: 'Attention Economy Mitigation',
      tech: ['ETL Pipelines', 'Filter Agent', 'Metadata Extraction', 'Noise Reduction'],
      mission: '让 AI 帮你从信息洪流中自动识别真正的黄金信号。',
      deliverable: '全自动数据摄取管道',
      icon: <Eye className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '03',
      title: 'Synthesis - 知识蒸馏与晶体化',
      neuro: 'Cognitive Offloading (认知卸载)',
      theory: 'Working Memory Offload',
      tech: ['Unstructured Lib', 'Synthetic Data Gen', 'Concept Graphing', 'Instruction Tuning'],
      mission: '将散乱的笔记瞬间转化为可被 LLM 高效检索的知识晶体。',
      deliverable: '结构化私有知识库',
      icon: <Database className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: '04',
      title: 'Simulation - 专家模拟与模型微调',
      neuro: 'Expert Model Simulation (专家模拟)',
      theory: 'Mirror Neurons (镜像神经元)',
      tech: ['Llama 3 / Mistral', 'LoRA/QLoRA', 'CoT Training', 'Adapter Deployment'],
      mission: '通过微调直接继承顶级专家的思维模式，抹平经验鸿沟。',
      deliverable: '专属微调推理模型',
      icon: <Cpu className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: '05',
      title: 'Connection - 联想记忆与全知检索',
      neuro: 'Associative Memory (联想记忆)',
      theory: 'Memex Implementation',
      tech: ['Semantic Chunking', 'Hybrid Search (BM25+Vector)', 'Cohere Rerank', 'Context Injection'],
      mission: '构建全知检索系统，让系统瞬间发现跨学科、跨时间的隐秘联系。',
      deliverable: '智能联想检索中枢',
      icon: <Network className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: '06',
      title: 'Evolution - 元认知与自我进化',
      neuro: 'Metacognition (元认知)',
      theory: 'Self-Correction Loops',
      tech: ['LangGraph Agents', 'Observability (Opik/LangSmith)', 'Eval Tracing', 'Streamlit HUD'],
      mission: '通过元认知监控消除 AI 幻觉，确保外脑系统自我进化。',
      deliverable: '自我进化看板',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* 1. Header */}
      <section className="mt-12 mb-24 text-center space-y-8">
        <m.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 font-mono text-xs font-black uppercase tracking-[0.3em]">
          <Zap className="w-4 h-4" /> Second Brain Engineering // 第二外脑工程
        </m.div>
        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
          Engineering Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-200">Second Brain</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-2xl max-w-4xl mx-auto font-light leading-relaxed">这是基于“能力平权”理念和深度融合 <span className="text-white font-bold">Decoding AI</span> 架构的实战。你将亲手构建属于自己的 <span className="text-white">主权数字化外脑</span>。</p>
      </section>

      {/* 2. Architecture Matrix */}
      <section className="mb-32 overflow-hidden px-4">
        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-[48px] overflow-hidden backdrop-blur-3xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 bg-white/5 border-b border-white/10 text-[10px] font-mono font-black uppercase tracking-widest text-gray-500 p-6 hidden md:grid">
            <div>Module / 模块</div><div>Neuroscience / 神经科学</div><div>Tech Stack / 技术栈</div><div>Deliverable / 交付成果</div>
          </div>
          <div className="divide-y divide-white/5">
            {modules.map((m_item) => (
              <div key={m_item.id} className="grid grid-cols-1 md:grid-cols-4 p-6 md:p-10 hover:bg-white/5 transition-colors items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m_item.color} flex items-center justify-center text-white shadow-xl`}>{m_item.icon}</div>
                  <div><div className="text-xs font-mono text-yellow-500 font-black">PHASE_{m_item.id}</div><div className="text-white font-black text-sm uppercase leading-tight">{m_item.title.split(' - ')[0]}</div></div>
                </div>
                <div className="space-y-1"><div className="text-white font-bold text-sm">{m_item.neuro}</div><div className="text-gray-500 text-xs italic">{m_item.theory}</div></div>
                <div className="flex flex-wrap gap-2">{m_item.tech.slice(0, 3).map(t => <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-gray-400">{t}</span>)}</div>
                <div className="text-yellow-500/80 font-black text-xs uppercase tracking-wider">{m_item.deliverable}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Detailed Breakdown */}
      <section className="space-y-32 mb-40 px-4">
        {modules.map((m_item, idx) => (
          <div key={m_item.id} className={`flex flex-col lg:flex-row gap-20 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            <m.div initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1 space-y-10">
              <div className="space-y-4">
                <div className={`w-16 h-1 bg-gradient-to-r ${m_item.color} rounded-full`} />
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">{m_item.title}</h3>
              </div>
              <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 relative overflow-hidden group shadow-2xl">
                 <p className="text-gray-200 text-lg md:text-xl font-light leading-relaxed mb-8">{m_item.mission}</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5 text-xs text-gray-400">
                    <div><span className="text-blue-400 font-black block mb-2 uppercase">Technical Path</span><ul>{m_item.tech.map(t => <li key={t} className="mb-1">· {t}</li>)}</ul></div>
                    <div><span className="text-yellow-500 font-black block mb-2 uppercase">Core Theory</span><p className="italic">{m_item.theory}</p></div>
                 </div>
              </div>
            </m.div>
            <m.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="flex-1 w-full max-w-md aspect-square rounded-[64px] bg-white/5 border border-white/10 flex items-center justify-center text-9xl group transition-all hover:bg-white/10">
               <span className="filter drop-shadow-[0_0_40px_rgba(255,215,0,0.1)]">{idx === 0 ? '🛡️' : idx === 1 ? '🔭' : idx === 2 ? '💎' : idx === 3 ? '🧬' : idx === 4 ? '🕸️' : '📈'}</span>
            </m.div>
          </div>
        ))}
      </section>

      {/* 4. Capstone Project */}
      <section className="mb-40 px-4">
        <m.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto p-12 md:p-24 bg-gradient-to-br from-yellow-500/10 via-brand-dark to-brand-dark border border-yellow-500/20 rounded-[80px] relative overflow-hidden">
          <div className="relative z-10 text-center space-y-12">
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">Capstone: The Second Cortex OS</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-left">
               <div className="space-y-6 p-8 bg-white/5 rounded-3xl">
                  <h4 className="text-xl font-bold text-white">挑战任务：跨越维度的决策</h4>
                  <p className="text-gray-400 font-light">面对陌生领域（如生物科技战略），调动 Exobrain 系统进行高维攻坚。从摄取、蒸馏、推理到元认知反思，完成全链路自动化决策。</p>
               </div>
               <div className="bg-black/60 rounded-[48px] p-10 border border-white/5 font-mono text-xs text-gray-500">
                  <p className="text-blue-400">{'>>'} exobrain.init(strategy='munger')</p>
                  <p>Initializing Salience Network... [OK]</p>
                  <p className="text-emerald-400">Loading Fine-tuned Adapter: Expert_V4</p>
                  <p className="text-yellow-500 font-black animate-pulse">OUTPUT: DECISION_LOCKED_89.4%_CONFIDENCE</p>
               </div>
            </div>
          </div>
        </m.div>
      </section>
    </PlanetLayout>
  );
};

export default SuperEgoPlanet;
