import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const SuperEgoPlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'data')!;

  const philosophy = [
    { title: '数据主权 (Data)', desc: '记忆不应被锁在第三方平台，而应存在私有的向量数据库 (Vector DB) 中。', icon: '🔒' },
    { title: '模型主权 (Model)', desc: '不依赖单一模型，学会使用开源模型或多模型编排 (Orchestration)。', icon: '🛡️' },
    { title: '创造主权 (Creation)', desc: 'SuperEgo 具备“通感”，能将思想转化为图像、视频、音乐和数据报表。', icon: '🎨' }
  ];

  const stages = [
    {
      id: 'S1',
      title: '第一阶段：构建地基 —— FTI 架构与数据管道',
      subtitle: '建立自动化的“数据摄取系统”',
      modules: [
        { name: '主权数据仓库', detail: '讲解 ETL (采集、清洗、入库) 概念，搭建私有知识库。' },
        { name: '高级 RAG 实战', detail: '配置 Hybrid Search (混合检索)，实现精准的语义与关键词匹配。' }
      ],
      tech: ['FTI Architecture', 'Vector DB', 'Embedding', 'Hybrid Search'],
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'S2',
      title: '第二阶段：觉醒 SuperEgo —— 推理与决策',
      subtitle: '给 AI 注入人格与逻辑',
      modules: [
        { name: '超我人格塑造', detail: '编写复杂的 System Prompt 链，实现 Retrieval-Reflection-Action。' },
        { name: 'Text-to-SQL', detail: '自然语言驱动数据库，让 SuperEgo 懂文字也懂 Excel/CSV 数据。' }
      ],
      tech: ['Prompt Engineering', 'SQL Agent', 'Logic Chains', 'Inference Pipeline'],
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'S3',
      title: '第三阶段：多模态通感 —— 右脑的爆发',
      subtitle: '实现从“逻辑”到“感性”的跨越',
      modules: [
        { name: '视觉与动态叙事', detail: '利用 MJ/Flux/Luma 将笔记转化为专业海报与产品概念视频。' },
        { name: '情绪共鸣创作', detail: '利用 Suno/Udio 根据心情日记生成特定情绪的 Lo-fi 音乐。' }
      ],
      tech: ['Midjourney', 'Luma / Kling', 'Suno', 'Creative Cortex'],
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'S4',
      title: '第四阶段：终极形态 —— 自动化与自我进化',
      subtitle: '实现系统闭环与自我进化',
      modules: [
        { name: '多智能体编排', detail: '使用 Dify/LangGraph 搭建从调研、脚本到视频生成的自动化流水线。' },
        { name: '反馈优化闭环', detail: '通过点踩/修改回写向量库，让 SuperEgo 在交互中不断变聪明。' }
      ],
      tech: ['Multi-Agent', 'Optimization Loop', 'RLHF', 'Dify Workflow'],
      gradient: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* Sovereignty Philosophy Header */}
      <section className="mt-16 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-white uppercase tracking-widest mb-4">重新定义“主权”</h2>
          <div className="h-1 w-24 bg-cyan-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophy.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-10 bg-white/5 border border-white/10 rounded-[40px] text-center hover:border-cyan-500/30 transition-all group"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FTI Visual Showcase */}
      <section className="py-20 bg-brand-surface/40 rounded-[64px] border border-white/5 relative overflow-hidden mb-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block">Personal MLOps Architecture</span>
          <h3 className="text-4xl font-black text-white mb-8 tracking-tighter uppercase leading-tight">
            从“调包侠”到“系统架构师”
          </h3>
          <p className="text-gray-400 text-lg mb-16 font-light">
            我们拒绝玩具级教学。参考顶级 <span className="text-white font-bold">FTI (Feature-Training-Inference)</span> 架构，将个人知识管理提升至企业级深度。
          </p>

          <div className="relative h-64 flex items-center justify-between gap-4">
             {['FEATURE_PIPE', 'VECTOR_STORE', 'INFERENCE_PIPE'].map((step, i) => (
               <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-4 shadow-inner">
                    {i === 0 ? '📡' : i === 1 ? '💾' : '⚡'}
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400 mb-2">{step}</div>
                  <div className="text-xs text-gray-500">{i === 0 ? '摄取与清洗' : i === 1 ? '长期记忆池' : '决策与推理'}</div>
                  {i < 2 && (
                    <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -z-10"></div>
                  )}
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Detailed Syllabus Stages */}
      <section className="space-y-16">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">进化轨迹 // EVOLUTION TRACK</h2>
          <div className="flex-grow h-[1px] bg-white/10"></div>
        </div>

        {stages.map((stage, idx) => (
          <motion.div 
            key={stage.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="group relative bg-white/5 border border-white/10 rounded-[48px] overflow-hidden backdrop-blur-xl hover:border-cyan-500/20 transition-all duration-500"
          >
            <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${stage.gradient}`} />
            <div className="p-10 md:p-16 flex flex-col lg:flex-row gap-12">
               <div className="lg:w-1/3">
                  <span className="text-cyan-500 font-mono text-xs mb-4 block">{stage.id} STAGE</span>
                  <h3 className="text-2xl font-black text-white mb-2 leading-tight uppercase tracking-tighter">{stage.title}</h3>
                  <p className="text-gray-500 text-sm italic font-medium">{stage.subtitle}</p>
                  
                  <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
                    <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">核心组件</div>
                    <div className="flex flex-wrap gap-2">
                      {stage.tech.map(t => (
                        <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-cyan-300 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
               </div>

               <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {stage.modules.map((mod, mIdx) => (
                    <div key={mIdx} className="p-8 bg-black/30 rounded-3xl border border-white/5 hover:bg-black/50 transition-colors">
                       <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                         {mod.name}
                       </h4>
                       <p className="text-gray-400 text-xs leading-relaxed">{mod.detail}</p>
                    </div>
                  ))}
                  
                  <div className="md:col-span-2 p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/10 text-center">
                    <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">毕业演示项目</span>
                    <p className="text-white text-sm font-bold mt-1">
                      {stage.id === 'S1' ? '搭建属于你的私有 FTI 数据管道' : 
                       stage.id === 'S2' ? 'SuperEgo SQL 财务智能分析官' : 
                       stage.id === 'S3' ? '“动起来”的数字灵感电影' : 
                       'SuperEgo Agentic 自动化视频工厂'}
                    </p>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Experience Showcase */}
      <section className="mt-32 p-12 md:p-20 bg-brand-dark border border-white/10 rounded-[64px] relative overflow-hidden">
        <div className="absolute top-10 right-10 text-[10px] font-mono text-gray-600">TERMINAL_PREVIEW_V2.0</div>
        
        <h3 className="text-3xl font-black text-white mb-12 uppercase text-center tracking-tighter">什么是“SuperEgo”体验？</h3>
        
        <div className="max-w-3xl mx-auto space-y-10">
           <div className="space-y-4">
              <div className="flex gap-4 items-start">
                 <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs">👤</div>
                 <div className="bg-white/5 p-4 rounded-2xl text-gray-300 text-sm italic">
                   “我记得两年前看过一篇关于‘熵增’的文章，结合我现在的创业项目，给我一些建议。”
                 </div>
              </div>
              <div className="flex gap-4 items-start justify-end">
                 <div className="bg-cyan-500/10 border border-cyan-500/20 p-6 rounded-2xl text-cyan-50 text-sm leading-relaxed max-w-[85%]">
                   <div className="flex gap-2 mb-4">
                      <span className="px-2 py-0.5 bg-cyan-500/20 text-[10px] font-mono text-cyan-400 rounded">RETRIEVING...</span>
                      <span className="px-2 py-0.5 bg-blue-500/20 text-[10px] font-mono text-blue-400 rounded">SQL_ANALYZING...</span>
                   </div>
                   <p className="mb-4">找到了你 2023 年收藏的《熵增定律与管理》。同时查询了你项目上周的财务数据，发现支出杂乱。你需要建立秩序，建议参考文章中的“耗散结构”理论...</p>
                   <div className="flex gap-4 pt-4 border-t border-cyan-500/20">
                      <div className="flex items-center gap-2">🖼️ <span className="text-[10px] opacity-60">架构优化图.png</span></div>
                      <div className="flex items-center gap-2">🎵 <span className="text-[10px] opacity-60">Lofi_Focus.mp3</span></div>
                   </div>
                 </div>
                 <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-xs">🧠</div>
              </div>
           </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="mt-32 py-24 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">构建你的“主权”第二大脑</h2>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 font-light">
          不仅仅是管理海量信息，更是创造一个能思考、会感应、永不疲倦的数字生命体。
        </p>
        <button className="px-16 py-8 bg-cyan-600 hover:bg-cyan-500 text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-[0_0_60px_rgba(6,182,212,0.3)] transition-all hover:scale-105">
          启动超我觉醒计划
        </button>
      </section>

      <style>{`
        @keyframes float-brain {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.02); }
        }
        .animate-float-brain {
          animation: float-brain 8s ease-in-out infinite;
        }
      `}</style>
    </PlanetLayout>
  );
};

export default SuperEgoPlanet;