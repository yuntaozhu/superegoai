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
    { title: 'CEO 思维', subtitle: 'Orchestrator', desc: '你不再是写代码的人，你是合伙人。核心工作是决策与验收。', icon: '👑' },
    { title: '全栈即自由', subtitle: 'Freedom', desc: '通过 AI 驾驭逻辑与艺术。你是总监，也是缔造者。', icon: '🔓' },
    { title: '工作流驱动', subtitle: 'Workflow', desc: '工具会过时，但“工作流”永存。构建自动运转的商业流水线。', icon: '⚙️' }
  ];

  const phases = [
    {
      id: 'P0',
      title: 'Phase 0: 觉醒与基石',
      period: '第 1 周',
      goal: '建立通用语言，掌握指挥指挥逻辑。',
      content: ['LLM 祛魅：理解 Token 与上下文', 'Prompt 2.0：CoT 与结构化提示', '环境搭建：Cursor/Dify 实战'],
      outcome: '个人专属 Prompt 库',
      color: 'bg-emerald-500',
      icon: '🧠'
    },
    {
      id: 'P1',
      title: 'Phase 1: 视觉与品牌',
      period: '第 2 - 4 周',
      goal: '用 AI 建立世界级品牌视觉与影像。',
      content: ['图像流：MJ + SD 精准生成 VI', '动态叙事：Runway 自动工作流', '数字 IP：打造 24h 讲解分身'],
      outcome: '品牌 VI + 60s 宣传片',
      color: 'bg-blue-500',
      icon: '🎨'
    },
    {
      id: 'P2',
      title: 'Phase 2: 全栈开发',
      period: '第 5 - 7 周',
      goal: '即使不懂代码，也能上线独立应用。',
      content: ['AI IDE：深度掌握 Cursor 编排', 'V0.dev：视觉转 React 前端代码', '全栈打通：FastAPI + Supabase'],
      outcome: '上线可收费的 SaaS MVP',
      color: 'bg-indigo-500',
      icon: '🚀'
    },
    {
      id: 'P3',
      title: 'Phase 3: 数据与外脑',
      period: '第 8 - 10 周',
      goal: '构建“第二大脑”，实现决策自动化。',
      content: ['Text-to-SQL：自然语言驱动数据', '私有 RAG：训练懂你的 AI 参谋', 'Agent：打造 24/7 自动员工'],
      outcome: '知识库助手 + 商业仪表盘',
      color: 'bg-purple-500',
      icon: '📊'
    },
    {
      id: 'P4',
      title: 'Phase 4: 变现与增长',
      period: '第 11 - 12 周',
      goal: '技术变现。把超级个体能力卖出去。',
      content: ['MVP 验证：Deep Research 调研', '流量矩阵：AI SEO 与内容运营', '路演模拟：BP 撰写与融资模拟'],
      outcome: '完整 BP + 种子用户数据',
      color: 'bg-amber-500',
      icon: '💰'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* Super Individual Header */}
      <section className="mt-8 md:mt-16 mb-16 md:mb-24 px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="h-0.5 w-10 bg-cyan-500"></span>
              <span className="text-cyan-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.5em]">Solo_Unicorn_OS</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
              构建你的 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">“一人独角兽”系统</span>
            </h2>
            <p className="text-base md:text-xl text-gray-300 leading-relaxed font-light">
              在 AI 时代，公司的形态正在解构。从“执行者”，培养成集产品、技术、设计、营销于一身的 <span className="text-white font-bold">“超级个体”</span>。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
             {philosophy.map((p, i) => (
               <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-[32px] text-center hover:bg-white/10 transition-colors group">
                  <div className="text-3xl md:text-4xl mb-4 group-hover:scale-110 transition-transform">{p.icon}</div>
                  <h4 className="text-white font-bold text-xs md:text-sm mb-1">{p.title}</h4>
                  <p className="text-gray-500 text-[8px] md:text-[9px] uppercase font-mono">{p.subtitle}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Evolution Phases */}
      <section className="py-12 md:py-20 relative px-4 md:px-0">
        <div className="absolute top-0 left-8 md:left-12 w-[1px] md:w-[2px] h-full bg-gradient-to-b from-cyan-500/50 via-white/10 to-transparent hidden sm:block" />
        
        <div className="space-y-12 md:space-y-20">
          {phases.map((phase, idx) => (
            <motion.div 
              key={phase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative sm:pl-20 md:pl-32"
            >
              <div className={`absolute top-0 left-4 md:left-8 w-6 h-6 md:w-8 md:h-8 rounded-lg md:rounded-xl ${phase.color} shadow-lg flex items-center justify-center text-white font-black text-[10px] md:text-xs z-10 hidden sm:flex`}>
                 {idx}
              </div>

              <div className="bg-brand-surface border border-white/10 rounded-3xl md:rounded-[48px] overflow-hidden backdrop-blur-xl group hover:border-cyan-500/20 transition-all duration-500">
                <div className="p-6 md:p-16 flex flex-col lg:flex-row gap-8 md:gap-12">
                   <div className="lg:w-1/3 space-y-4 md:space-y-6">
                      <div className="text-[9px] md:text-xs font-mono text-cyan-500 uppercase tracking-widest">{phase.period} // {phase.id}</div>
                      <h3 className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase leading-tight">{phase.title}</h3>
                      <p className="text-gray-400 text-[10px] md:text-sm italic">{phase.goal}</p>
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl md:text-4xl">
                        {phase.icon}
                      </div>
                   </div>

                   <div className="lg:w-2/3 flex flex-col gap-6 md:gap-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        {phase.content.map((item, i) => (
                          <div key={i} className="p-5 md:p-6 bg-black/40 rounded-2xl md:rounded-3xl border border-white/5 flex gap-3 md:gap-4 items-start hover:bg-black/60 transition-colors">
                             <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 mt-1.5 flex-shrink-0" />
                             <p className="text-gray-300 text-[11px] md:text-sm leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-6 md:p-8 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl md:rounded-3xl text-center relative overflow-hidden">
                        <div className="relative z-10">
                          <span className="text-[9px] md:text-[10px] font-mono text-cyan-500/60 uppercase tracking-widest">毕业交付物 // Delivery</span>
                          <div className="text-white font-black mt-1 md:mt-2 text-base md:text-xl tracking-tight">{phase.outcome}</div>
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
      <section className="mt-20 md:mt-40 px-4 md:px-0">
        <div className="bg-[#0c0c0c] border border-white/10 rounded-3xl md:rounded-[64px] p-8 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full p-4 md:p-6 border-b border-white/5 flex items-center justify-between">
             <div className="flex gap-2">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
               <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
             </div>
             <span className="font-mono text-[8px] md:text-[10px] text-gray-700 tracking-[0.3em]">UNICORN_IDE_v1.0</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mt-8 md:mt-12 items-center">
            <div className="space-y-4 md:space-y-6 font-mono text-xs md:text-sm">
               <div className="flex gap-3 md:gap-4">
                 <span className="text-cyan-500">➜</span>
                 <span className="text-white break-all">individual-os deploy --mvp "SaaS"</span>
               </div>
               <div className="space-y-2 text-gray-500 text-[10px] md:text-xs">
                 <div>[1/4] Generating UI (V0.dev)... <span className="text-emerald-500">OK</span></div>
                 <div>[2/4] Syncing Supabase... <span className="text-emerald-500">OK</span></div>
                 <div>[3/4] Cognitive Layer Active... <span className="text-emerald-500">OK</span></div>
                 <div>[4/4] Deploying to Edge... <span className="text-emerald-500">LIVE</span></div>
               </div>
               <div className="pt-4 md:pt-8 text-cyan-400 font-black text-lg md:text-xl">
                  TEAM_SIZE: 01 (YOU) <br/>
                  PRODUCTIVITY: 1000x
               </div>
            </div>

            <div className="aspect-video bg-white/5 rounded-3xl md:rounded-[40px] border border-white/10 flex items-center justify-center p-8 relative group overflow-hidden">
               <div className="text-center space-y-4 md:space-y-6 z-10">
                  <div className="text-6xl md:text-8xl transform group-hover:scale-110 transition-transform duration-700">🦄</div>
                  <h4 className="text-white font-black text-xl md:text-2xl tracking-tighter">一人即是公司</h4>
                  <p className="text-gray-500 text-[10px] md:text-xs italic">"Scaling your vision."</p>
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