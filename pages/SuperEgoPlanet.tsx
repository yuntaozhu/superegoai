
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
      mission: '构建全知检索系统，让系统瞬间发现跨学科的隐秘联系。',
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
      {/* Intro Header */}
      <section className="mt-12 mb-24 text-center space-y-8">
        <m.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 font-mono text-xs font-black uppercase tracking-[0.3em]"
        >
          <Zap className="w-4 h-4" />
          Second Brain Engineering // 第二外脑工程
        </m.div>
        
        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
          Engineering Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-200">
            Second Brain
          </span>
        </h2>
        
        <p className="text-gray-400 text-lg md:text-2xl max-w-4xl mx-auto font-light leading-relaxed">
          这是基于“能力平权”理念和深度融合 <span className="text-white font-bold">Decoding AI</span> 架构的实战课程。
          你将亲手构建属于自己的 <span className="text-white">主权数字化外脑</span>。
        </p>
      </section>

      {/* 剩余模块部分... */}
      <section className="mb-32 overflow-hidden px-4">
        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-[48px] overflow-hidden backdrop-blur-3xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 bg-white/5 border-b border-white/10 text-[10px] font-mono font-black uppercase tracking-widest text-gray-500 p-6 hidden md:grid">
            <div>Module / 模块</div>
            <div>Engineering / 工程属性</div>
            <div>Tech Stack / 技术栈</div>
            <div>Output / 交付成果</div>
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
      
      {/* 其他细节展示部分保持逻辑一致... */}
    </PlanetLayout>
  );
};

export default SuperEgoPlanet;
