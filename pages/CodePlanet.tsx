import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const CodePlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'solopreneur')!;

  const philosophy = [
    { title: 'CEO 思维', subtitle: 'Orchestrator over Executor', desc: '你不再是画图/写代码的人，你是总监与合伙人。核心工作是决策、审美和验收。', icon: '👑' },
    { title: '全栈即正义', subtitle: 'Full-Stack is Freedom', desc: '打破文理藩篱。通过 AI 驾驭复杂逻辑与感性艺术，实现真正的人格独立。', icon: '🔓' },
    { title: '工作流为王', subtitle: 'Workflow > Tool', desc: '工具会过时，但“工作流”永存。我们构建的是一套自动运转的商业流水线。', icon: '⚙️' }
  ];

  const phases = [
    {
      id: 'P0',
      title: 'Phase 0: 觉醒与基石',
      period: '第 1 周',
      goal: '建立与 AI 对话的“通用语言”，掌握指挥底层逻辑。',
      content: ['LLM 祛魅：理解 Token 与 Context Window', 'Prompt Engineering 2.0：CoT 与结构化提示词', '环境搭建：配置“数字军火库” (Cursor/Dify)'],
      outcome: '建立个人专属 Prompt 库',
      color: 'bg-emerald-500'
    },
    {
      id: 'P1',
      title: 'Phase 1: 视觉与品牌',
      period: '第 2 - 4 周',
      goal: '解决设计痛点，用 AI 建立世界级品牌视觉与动态叙事。',
      content: ['商业图像流：MJ + SD 精准控制生成 VI', '动态叙事：Runway/Kling 自动影像工作流', '数字人 IP：HeyGen 打造 24h 讲解分身'],
      outcome: '一套品牌 VI 系统 + 60s 高质量产品视频',
      color: 'bg-blue-500'
    },
    {
      id: 'P2',
      title: 'Phase 2: 全栈开发',
      period: '第 5 - 7 周',
      goal: '即使不懂代码，也能独立开发 SaaS、App 或自动化工具。',
      content: ['AI IDE 实战：深度掌握 Cursor 编排', '视觉转代码：V0.dev 驱动 React 前端', '全栈打通：FastAPI + Supabase 数据库实战'],
      outcome: '上线一个可交互、可收费的 SaaS MVP',
      color: 'bg-indigo-500'
    },
    {
      id: 'P3',
      title: 'Phase 3: 数据与外脑',
      period: '第 8 - 10 周',
      goal: '构建“第二大脑”，实现信息处理与决策的自动化。',
      content: ['与数据对话：Text-to-SQL 管道搭建', '私有知识库 (RAG)：训练专属 AI 参谋', 'Agent 工作流：打造 24/7 自动执行员工'],
      outcome: '个人私有知识库助手 + 商业情报仪表盘',
      color: 'bg-purple-500'
    },
    {
      id: 'P4',
      title: 'Phase 4: 商业化与变现',
      period: '第 11 - 12 周',
      goal: '技术变现。把产品卖出去，或把超级个体的能力卖出去。',
      content: ['MVP 验证：Deep Research 市场调研', '增长黑客：AI 流量矩阵 (小红书/Twitter)', '路演模拟：AI 辅助 BP 撰写与融资模拟'],
      outcome: '一份完整商业计划书 (BP) + 种子用户数据',
      color: 'bg-amber-500'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* OS Philosophy Section */}
      <section className="mt-16 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophy.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-white/5 border border-white/10 rounded-[48px] text-center hover:border-emerald-500/30 transition-all group"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{item.title}</h3>
              <div className="text-emerald-500 font-mono text-[10px] uppercase mb-4 tracking-widest">{item.subtitle}</div>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Terminal / Live Build Simulation */}
      <section className="mb-32">
        <div className="bg-[#0c0c0c] border border-emerald-500/20 rounded-[40px] p-8 md:p-12 font-mono text-sm relative overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 mb-8">
             <div className="flex gap-1.5">
               <div className="w-3 h-3 rounded-full bg-red-500/40" />
               <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
               <div className="w-3 h-3 rounded-full bg-green-500/40" />
             </div>
             <div className="h-6 w-[1px] bg-white/10 mx-4" />
             <span className="text-gray-500 text-xs tracking-widest uppercase">Unicorn_Incubator_Console // v3.1</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
               <div className="flex gap-3">
                 <span className="text-emerald-500">$</span>
                 <span className="text-white">individual-os start --persona "SOLO_FOUNDER"</span>
               </div>
               <div className="text-gray-500 text-xs">
                 {" >> "} Initializing Creative Cortex (Midjourney API)... <span className="text-emerald-500">[READY]</span>
               </div>
               <div className="text-gray-500 text-xs">
                 {" >> "} Scaling Engineering Capacity (Cursor/Claude-3.5)... <span className="text-emerald-500">[SCALED]</span>
               </div>
               <div className="text-gray-500 text-xs">
                 {" >> "} Connecting Sovereign Data (Milvus VectorDB)... <span className="text-emerald-500">[SYNCED]</span>
               </div>
               
               <div className="mt-8 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                 <div className="text-emerald-500 mb-2 font-black text-xs">CURRENT TASK: DEPLOYING SaaS MVP</div>
                 <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: '85%' }}
                     transition={{ duration: 5, repeat: Infinity }}
                     className="h-full bg-emerald-500"
                   />
                 </div>
                 <div className="mt-2 text-[10px] text-gray-500 flex justify-between">
                   <span>Compiling React (V0.dev)</span>
                   <span>85% Completed</span>
                 </div>
               </div>
            </div>

            <div className="relative aspect-video rounded-2xl bg-black/50 border border-white/5 flex items-center justify-center p-4">
               <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid.png')]" />
               <div className="text-center space-y-4 z-10">
                  <div className="text-5xl animate-bounce">🦄</div>
                  <div className="text-white font-black text-xl tracking-tighter">一人即独角兽</div>
                  <div className="text-gray-500 text-xs italic">"From Idea to Revenue in 48 Hours"</div>
               </div>
               {/* Floating elements */}
               <motion.div 
                 animate={{ y: [-5, 5, -5] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute top-4 right-4 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] text-emerald-300"
               >
                 CPO: ACTIVE
               </motion.div>
               <motion.div 
                 animate={{ y: [5, -5, 5] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute bottom-4 left-4 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] text-blue-300"
               >
                 CTO: ACTIVE
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Evolutionary Phases */}
      <section className="py-20">
        <div className="text-center mb-20">
           <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">进化大纲：五大成长阶段</h2>
           <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">The 12-Week Transformation Journey</p>
        </div>

        <div className="space-y-12">
          {phases.map((phase, idx) => (
            <motion.div 
              key={phase.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative bg-white/5 border border-white/10 rounded-[48px] overflow-hidden hover:border-emerald-500/20 transition-all duration-500"
            >
              <div className="p-8 md:p-16 flex flex-col lg:flex-row gap-12 items-center">
                 <div className="lg:w-1/4 text-center lg:text-left">
                    <div className={`${phase.color} w-20 h-20 rounded-3xl mx-auto lg:mx-0 flex items-center justify-center text-white text-3xl font-black mb-6 shadow-2xl`}>
                      {phase.id}
                    </div>
                    <div className="text-emerald-500 font-mono text-xs mb-2">{phase.period}</div>
                    <h3 className="text-2xl font-black text-white tracking-tight leading-tight">{phase.title}</h3>
                 </div>

                 <div className="lg:w-2/4">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Core Focus // 核心内容</div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phase.content.map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-300 items-start">
                           <span className="text-emerald-500 mt-1">▸</span>
                           {item}
                        </li>
                      ))}
                    </ul>
                 </div>

                 <div className="lg:w-1/4">
                    <div className="bg-black/40 p-6 rounded-3xl border border-white/5 text-center">
                       <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.2em] mb-2">Stage Deliverable</div>
                       <div className="text-white font-bold leading-tight">{phase.outcome}</div>
                       <div className="mt-4 text-xs font-mono text-gray-600">MISSION_0{idx+1}_COMPLETE</div>
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="mt-32 py-20 bg-brand-surface/30 rounded-[64px] border border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-black text-white text-center mb-16 uppercase tracking-widest">超级个体技术栈 // THE TECH STACK</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { category: '大脑', tools: 'ChatGPT, Claude 3' },
              { category: '视觉', tools: 'Midjourney, Runway' },
              { category: '开发', tools: 'Cursor, Supabase, Vercel' },
              { category: '智能体', tools: 'Dify, LangChain, Coze' }
            ].map((stack, i) => (
              <div key={i} className="text-center p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-emerald-500/20 transition-all">
                <div className="text-emerald-500 font-mono text-[10px] uppercase mb-4 tracking-widest">{stack.category}</div>
                <div className="text-white font-bold text-sm leading-relaxed">{stack.tools}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-32 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-tight">
            别只做执行者 <br/>
            <span className="text-emerald-400">去做编排者</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            在这个不仅是“学习”更是“重塑”的旅程中，开启属于你的超级个体时代。从今天起，你即是公司。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-12 py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-[0_0_50px_rgba(16,185,129,0.3)] transition-all hover:scale-105">
              启动独角兽孵化计划
            </button>
            <button className="px-12 py-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest transition-all">
              查看课程详情
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes unicorn-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        .animate-unicorn-float {
          animation: unicorn-float 6s ease-in-out infinite;
        }
      `}</style>
    </PlanetLayout>
  );
};

export default CodePlanet;