import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const SuperEgoPlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'data')!;

  const stages = [
    {
      id: 'S1',
      title: '第一阶段：构建地基 —— FTI 架构与数据管道',
      subtitle: '建立自动化的“数据摄取系统”',
      modules: [
        { name: '主权数据仓库', detail: '讲解 ETL (采集、清洗、入库) 概念，搭建私有知识库。' },
        { name: '高级 RAG 实战', detail: '配置 Hybrid Search (混合检索)，实现精准匹配。' }
      ],
      tech: ['FTI Architecture', 'Vector DB', 'Embedding', 'Hybrid Search'],
      gradient: 'from-cyan-500 to-blue-500',
      icon: '💾'
    },
    {
      id: 'S2',
      title: '第二阶段：觉醒 SuperEgo —— 推理与决策',
      subtitle: '给 AI 注入人格与逻辑',
      modules: [
        { name: '超我人格塑造', detail: '编写复杂的 System Prompt 链，实现 Retrieval-Reflection-Action。' },
        { name: 'Text-to-SQL', detail: '自然语言驱动数据库，让 SuperEgo 懂文字也懂 Excel/CSV。' }
      ],
      tech: ['Prompt Engineering', 'SQL Agent', 'Logic Chains', 'Inference Pipeline'],
      gradient: 'from-blue-500 to-indigo-600',
      icon: '⚡'
    },
    {
      id: 'S3',
      title: '第三阶段：多模态通感 —— 右脑的爆发',
      subtitle: '实现从“逻辑”到“感性”的跨越',
      modules: [
        { name: '视觉与动态叙事', detail: '利用 MJ/Flux 将笔记转化为专业海报与产品概念视频。' },
        { name: '情绪共鸣创作', detail: '利用 Suno/Udio 根据心情日记生成特定情绪的 Lo-fi 音乐。' }
      ],
      tech: ['Midjourney', 'Luma / Kling', 'Suno', 'Creative Cortex'],
      gradient: 'from-purple-500 to-pink-600',
      icon: '🎨'
    },
    {
      id: 'S4',
      title: '第四阶段：终极形态 —— 自动化与自我进化',
      subtitle: '实现系统闭环与自我进化',
      modules: [
        { name: '多智能体编排', detail: '使用 Dify/LangGraph 搭建调研、脚本到视频生成的流水线。' },
        { name: '反馈优化闭环', detail: '通过点踩/修改回写向量库，让 SuperEgo 不断变聪明。' }
      ],
      tech: ['Multi-Agent', 'Optimization Loop', 'RLHF', 'Dify Workflow'],
      gradient: 'from-amber-500 to-orange-600',
      icon: '🧬'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* Sovereignty Section */}
      <section className="mt-8 md:mt-16 mb-16 md:mb-24 px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6 md:space-y-8 text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="w-10 h-0.5 bg-yellow-400 rounded-full" />
              <span className="text-yellow-400 font-mono text-[10px] md:text-xs uppercase tracking-widest">Sovereign OS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
              构建你的“主权” <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">第二大脑</span>
            </h2>
            <p className="text-base md:text-xl text-gray-300 leading-relaxed font-light">
              拒绝玩具级的“调包侠”教学。我们将企业级的 <span className="text-white font-bold">FTI</span> 架构翻译为个人知识系统的构建法则，实现全方位主权。
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
             {[
               { title: '数据主权', desc: '私有 Vector DB', icon: '🔒' },
               { title: '模型主权', desc: '多模型协同', icon: '🛡️' },
               { title: '创造主权', desc: '多模态通感', icon: '🎨' },
             ].map((p, i) => (
               <div key={i} className={`p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl text-center hover:bg-white/10 transition-colors ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}>
                  <div className="text-2xl md:text-3xl mb-2 md:mb-4">{p.icon}</div>
                  <h4 className="text-white font-bold text-xs md:text-sm mb-1">{p.title}</h4>
                  <p className="text-gray-500 text-[8px] md:text-[10px] uppercase font-mono">{p.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Evolutionary Path */}
      <section className="py-12 md:py-20 px-4 md:px-0">
        <div className="space-y-12 md:space-y-16">
          {stages.map((stage, idx) => (
            <motion.div 
              key={stage.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-brand-surface border border-white/10 rounded-[32px] md:rounded-[56px] overflow-hidden backdrop-blur-xl hover:border-yellow-500/20 transition-all duration-500"
            >
              <div className={`absolute top-0 left-0 w-1.5 md:w-3 h-full bg-gradient-to-b ${stage.gradient}`} />
              <div className="p-8 md:p-16 flex flex-col lg:flex-row gap-8 md:gap-12">
                 <div className="lg:w-1/3 space-y-4 md:space-y-8">
                    <div className="flex items-center gap-4">
                       <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl md:text-4xl shadow-inner`}>
                          {stage.icon}
                       </div>
                       <div className="text-[10px] font-mono text-gray-600">PHASE_{stage.id}</div>
                    </div>
                    <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight">{stage.title}</h3>
                    <p className="text-gray-400 text-xs md:text-sm italic">{stage.subtitle}</p>
                    <div className="flex flex-wrap gap-2 pt-2 md:pt-4">
                       {stage.tech.map(t => (
                         <span key={t} className="px-2 md:px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[8px] md:text-[10px] font-mono text-gray-500">{t}</span>
                       ))}
                    </div>
                 </div>

                 <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {stage.modules.map((m, i) => (
                      <div key={i} className="p-6 md:p-10 bg-black/40 rounded-2xl md:rounded-[40px] border border-white/5 hover:bg-black/60 transition-colors">
                         <h4 className="text-white font-bold mb-2 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                           <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                           {m.name}
                         </h4>
                         <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed">{m.detail}</p>
                      </div>
                    ))}
                    <div className="md:col-span-2 p-6 md:p-8 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5 text-center">
                       <span className="text-[9px] md:text-[10px] font-mono text-yellow-500/60 uppercase tracking-[0.2em]">Stage Deliverable</span>
                       <div className="text-white font-black mt-2 text-base md:text-lg">
                          {idx === 0 && '私有 FTI 数据管道'}
                          {idx === 1 && 'SQL 财务智能助理'}
                          {idx === 2 && '多模态灵感电影'}
                          {idx === 3 && '自动化 Agent 工厂'}
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Terminal Experience */}
      <section className="mt-16 md:mt-32 p-8 md:p-20 bg-black border border-white/10 rounded-3xl md:rounded-[64px] relative overflow-hidden mx-4 md:mx-0 shadow-2xl">
        <div className="absolute top-2 right-2 md:top-6 md:right-6 font-mono text-[8px] md:text-[10px] text-gray-700">EXPERIENCE_V1</div>
        <div className="max-w-3xl mx-auto space-y-8 md:space-y-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">什么是“SuperEgo”体验？</h3>
            <p className="text-gray-500 text-[10px] md:text-sm">不仅是回复，而是编排全媒体资产。</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-3 md:gap-4 items-start">
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/5 flex items-center justify-center text-base md:text-xl">👤</div>
               <div className="p-4 md:p-6 bg-white/5 rounded-2xl text-gray-300 text-[11px] md:text-sm leading-relaxed border border-white/5 italic">
                 “帮我做一个关于咖啡市场的视频，参考我之前的研报笔记。”
               </div>
            </div>
            <div className="flex gap-3 md:gap-4 items-start justify-end">
               <div className="p-5 md:p-8 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl md:rounded-[32px] text-yellow-50 text-[11px] md:text-sm leading-relaxed max-w-[90%]">
                 <div className="flex gap-2 mb-4">
                    <span className="px-1.5 py-0.5 bg-yellow-500/20 text-[8px] md:text-[10px] font-mono text-yellow-500 rounded uppercase">Retrieving_RAG</span>
                    <span className="px-1.5 py-0.5 bg-amber-500/20 text-[8px] md:text-[10px] font-mono text-amber-500 rounded uppercase">Agent_Sync</span>
                 </div>
                 <p className="mb-4">已调取 2023 年咖啡市场笔记。Agent A 已完成分镜图，Agent B 正在 Luma 进行合成...</p>
                 <div className="flex gap-4 p-3 bg-black/40 rounded-xl border border-white/5 mt-4">
                    <div className="flex items-center gap-2">🖼️ <span className="text-[8px] md:text-[10px] opacity-60">Poster.png</span></div>
                    <div className="flex items-center gap-2">🎬 <span className="text-[8px] md:text-[10px] opacity-60">Draft.mp4</span></div>
                 </div>
               </div>
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-yellow-500 flex items-center justify-center text-base md:text-xl">🧠</div>
            </div>
          </div>
        </div>
      </section>
    </PlanetLayout>
  );
};

export default SuperEgoPlanet;