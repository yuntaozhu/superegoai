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
    { title: 'CEO 思维', subtitle: 'Orchestrator over Executor', desc: '你不再是写代码的人，你是技术合伙人。你的核心工作是决策、审美和验收。', icon: '👑' },
    { title: '全栈即正义', subtitle: 'Full-Stack is Freedom', desc: '通过 AI 驾驭复杂逻辑与感性艺术。你是画图的人，也是视觉总监。', icon: '🔓' },
    { title: '工作流为王', subtitle: 'Workflow > Tool', desc: '工具会过时，但“工作流”永存。我们构建的是一套自动运转的业务流水线。', icon: '⚙️' }
  ];

  const phases = [
    {
      id: 'P0',
      title: 'Phase 0: 觉醒与基石',
      period: '第 1 周',
      goal: '建立与 AI 对话的“通用语言”，掌握指挥底层逻辑。',
      content: ['LLM 祛魅：理解 Token 与 Context Window', 'Prompt Engineering 2.0：CoT 与结构化提示词', '环境搭建：配置“数字军火库” (Cursor/Dify)'],
      outcome: '建立个人专属 Prompt 库',
      color: 'bg-emerald-500',
      icon: '🧠'
    },
    {
      id: 'P1',
      title: 'Phase 1: 视觉与品牌',
      period: '第 2 - 4 周',
      goal: '用 AI 建立世界级品牌视觉与动态叙事。',
      content: ['商业图像流：MJ + SD 精准控制生成 VI', '动态叙事：Runway/Kling 自动影像工作流', '数字人 IP：打造 24h 讲解分身'],
      outcome: '一套品牌 VI 系统 + 60s 产品视频',
      color: 'bg-blue-500',
      icon: '🎨'
    },
    {
      id: 'P2',
      title: 'Phase 2: 全栈开发',
      period: '第 5 - 7 周',
      goal: '即使不懂代码，也能独立开发 SaaS、App 或自动化工具。',
      content: ['AI IDE 实战：深度掌握 Cursor 编排', '视觉转代码：V0.dev 驱动 React 前端', '全栈打通：FastAPI + Supabase 数据库实战'],
      outcome: '上线一个可交互、可收费的 SaaS MVP',
      color: 'bg-indigo-500',
      icon: '🚀'
    },
    {
      id: 'P3',
      title: 'Phase 3: 数据与外脑',
      period: '第 8 - 10 周',
      goal: '构建“第二大脑”，实现信息处理与决策的自动化。',
      content: ['与数据对话：Text-to-SQL 管道搭建', '私有知识库 (RAG)：训练专属 AI 参谋', 'Agent 工作流：打造 24/7 自动执行员工'],
      outcome: '个人私有知识库助手 + 商业情报仪表盘',
      color: 'bg-purple-500',
      icon: '📊'
    },
    {
      id: 'P4',
      title: 'Phase 4: 商业化与变现',
      period: '第 11 - 12 周',
      goal: '技术变现。把产品卖出去，或把超级个体的能力卖出去。',
      content: ['MVP 验证：Deep Research 市场调研', '增长黑客：AI 流量矩阵 (小红书/Twitter)', '路演模拟：AI 辅助 BP 撰写与融资模拟'],
      outcome: '一份完整商业计划书 (BP) + 种子用户数据',
      color: 'bg-amber-500',
      icon: '💰'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* Super Individual Header */}
      <section className="mt-16 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-cyan-500"></span>
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.5em]">Solo_Unicorn_OS</span>
            </div>
            <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-tight">
              构建你的 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">“一人独角兽”系统</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              在 AI 时代，公司的形态正在解构。我们将你从单一技能的“执行者”，培养成集产品(CPO)、技术(CTO)、设计(CDO)、营销(CMO)于一身的 <span className="text-white font-bold">“超级个体”</span>。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {philosophy.map((p, i) => (
               <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[32px] text-center hover:bg-white/10 transition-colors group">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{p.icon}</div>
                  <h4 className="text-white font-bold text-sm mb-2">{p.title}</h4>
                  <p className="text-gray-500 text-[10px] uppercase font-mono">{p.subtitle}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Evolution Phases */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-12 w-[2px] h-full bg-gradient-to-b from-cyan-500/50 via-white/10 to-transparent hidden lg:block" />
        
        <div className="space-y-20">
          {phases.map((phase, idx) => (
            <motion.div 
              key={phase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative lg:pl-32"
            >
              <div className={`absolute top-0 left-8 w-8 h-8 rounded-xl ${phase.color} shadow-lg flex items-center justify-center text-white font-black text-xs z-10 hidden lg:flex`}>
                 {idx}
              </div>

              <div className="bg-brand-surface border border-white/10 rounded-[48px] overflow-hidden backdrop-blur-xl group hover:border-cyan-500/20 transition-all duration-500">
                <div className="p-10 md:p-16 flex flex-col lg:flex-row gap-12">
                   <div className="lg:w-1/3 space-y-6">
                      <div className="text-xs font-mono text-cyan-500 uppercase tracking-widest">{phase.period} // {phase.id}</div>
                      <h3 className="text-3xl font-black text-white tracking-tighter uppercase leading-tight">{phase.title}</h3>
                      <p className="text-gray-400 text-sm italic">{phase.goal}</p>
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl">
                        {phase.icon}
                      </div>
                   </div>

                   <div className="lg:w-2/3 flex flex-col gap-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {phase.content.map((item, i) => (
                          <div key={i} className="p-6 bg-black/40 rounded-3xl border border-white/5 flex gap-4 items-start group-hover:bg-black/60 transition-colors">
                             <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 mt-1.5 flex-shrink-0" />
                             <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-8 bg-cyan-500/5 border border-cyan-500/10 rounded-3xl text-center relative overflow-hidden">
                        <div className="relative z-10">
                          <span className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-widest">毕业交付物 // Delivery</span>
                          <div className="text-white font-black mt-2 text-xl tracking-tight">{phase.outcome}</div>
                        </div>
                        <div className="absolute top-0 right-0 p-4 opacity-5 text-4xl">{phase.icon}</div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Developer Terminal Preview */}
      <section className="mt-40">
        <div className="bg-[#0c0c0c] border border-white/10 rounded-[64px] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full p-6 border-b border-white/5 flex items-center justify-between">
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500/50" />
               <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
               <div className="w-3 h-3 rounded-full bg-green-500/50" />
             </div>
             <span className="font-mono text-[10px] text-gray-700 tracking-[0.5em]">UNICORN_IDE_v1.0</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12 items-center">
            <div className="space-y-6 font-mono text-sm">
               <div className="flex gap-4">
                 <span className="text-cyan-500">➜</span>
                 <span className="text-white">individual-os deploy --mvp "SaaS_Product"</span>
               </div>
               <div className="space-y-2 text-gray-500 text-xs">
                 <div>[1/4] Generating UI Architecture (V0.dev)... <span className="text-emerald-500">OK</span></div>
                 <div>[2/4] Initializing Supabase Backend... <span className="text-emerald-500">OK</span></div>
                 <div>[3/4] Connecting LLM Cognitive Layer... <span className="text-emerald-500">OK</span></div>
                 <div>[4/4] Deploying to Vercel Edge... <span className="text-emerald-500">DEPLAYED</span></div>
               </div>
               <div className="pt-8 text-cyan-400 font-black text-xl">
                  TOTAL_TEAM_SIZE: 01 (YOU) <br/>
                  PRODUCTIVITY: 1000x_SCALED
               </div>
            </div>

            <div className="aspect-video bg-white/5 rounded-[40px] border border-white/10 flex items-center justify-center p-12 relative group">
               <div className="text-center space-y-6 z-10">
                  <div className="text-8xl transform group-hover:scale-110 transition-transform duration-700">🦄</div>
                  <h4 className="text-white font-black text-2xl tracking-tighter">一人即是公司</h4>
                  <p className="text-gray-500 text-xs italic">"Scaling your vision with zero code overhead."</p>
               </div>
               <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
    </PlanetLayout>
  );
};

export default CodePlanet;