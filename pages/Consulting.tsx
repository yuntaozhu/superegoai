
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Brain, 
  Scale, 
  Sparkles, 
  Zap, 
  Target, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Code, 
  Activity, 
  ChevronRight,
  ArrowRight,
  Globe,
  ArrowLeft
} from 'lucide-react';
import { useLanguage, Link } from '../context/LanguageContext';

// Using any to bypass framer-motion type mismatch in the current environment
const m = motion as any;

const Consulting: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('philosophy');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'philosophy', label: '理念' },
    { id: 'methodology', label: '核心支柱' },
    { id: 'value', label: '价值' },
    { id: 'agents', label: 'AI军团' },
    { id: 'case', label: '案例' },
    { id: 'team', label: '团队' },
  ];

  const philosophy = [
    {
      id: 'id',
      icon: <Brain className="w-8 h-8" />,
      title: '🧠 本我 (The Id)',
      sub: '现状：直觉与混乱',
      text: '依赖创始人直觉，数据散落在文档与IM中形成“数据孤岛”，遗留的“屎山代码”导致高昂的技术负债。痛点：充满活力但缺乏秩序。',
      isHighlight: false
    },
    {
      id: 'ego',
      icon: <Scale className="w-8 h-8" />,
      title: '⚖️ 自我 (The Ego)',
      sub: '瓶颈：流程与妥协',
      text: '引入ERP/CRM与KPI试图建立秩序，但在现实资源与目标之间艰难权衡。痛点：信息过载，管理者被海量数据淹没，决策滞后。',
      isHighlight: false
    },
    {
      id: 'superego',
      icon: <Sparkles className="w-8 h-8" />,
      title: '✨ 超我 (The Super Ego)',
      sub: '未来：增强与治理',
      text: '这就是我们为您构建的“完美理性实体”。全知洞察(RAG消除幻觉)、伦理护航(符合EU AI Act)、自我进化(重构代码)。',
      isHighlight: true
    }
  ];

  const methodology = [
    {
      step: "01",
      title: "诊断与蓝图",
      desc: "战略对齐，基于业务痛点设计AI战略。AI风险评估与数据隐私合规性审查。",
      details: ["基础设施审计", "流程映射", "合规检查"]
    },
    {
      step: "02",
      title: "试点与验证",
      desc: "敏捷共创 (MVA)。验证商业价值 (ROI)，拒绝“技术演示品”，只做“业务实战品”。",
      details: ["快速原型", "ROI评估", "小规模跑通"]
    },
    {
      step: "03",
      title: "集成与规模化",
      desc: "无缝嵌入现有工作流。组织变革管理，重点在于员工赋能 (Upskilling)。",
      details: ["API联调", "全员培训", "文化转型"]
    },
    {
      step: "04",
      title: "治理与进化",
      desc: "人在环路 (Human-in-the-loop)。建立 AI 卓越中心 (CoE)，确保 AI 输出符合伦理标准。",
      details: ["伦理监控", "模型微调", "持续优化"]
    }
  ];

  const agents = [
    {
      title: "Marketing Agent",
      desc: "多模态内容生成、舆情监控。让市场人员升级为“创意总监”。",
      metric: "75%",
      metricLabel: "内容创作效率提升",
      icon: <Globe className="w-6 h-6 text-red-500" />,
      size: "col-span-1 md:col-span-2"
    },
    {
      title: "Sales Agent",
      desc: "线索清洗、个性化 Pitch Deck。释放高价值时间聚焦谈判。",
      metric: "90%",
      metricLabel: "方案准备时间缩短",
      icon: <Target className="w-6 h-6 text-red-500" />,
      size: "col-span-1"
    },
    {
      title: "HR Agent",
      desc: "7x24 政策问答、消除招聘偏见、人岗匹配。",
      metric: "85%",
      metricLabel: "重复性咨询减少",
      icon: <Users className="w-6 h-6 text-red-500" />,
      size: "col-span-1"
    },
    {
      title: "Operations Agent",
      desc: "IoT数据分析、预测性维护、打通效率任督二脉。",
      metric: "30%",
      metricLabel: "非计划停机减少",
      icon: <Zap className="w-6 h-6 text-red-500" />,
      size: "col-span-1 md:col-span-2"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B1026] text-gray-300 font-sans overflow-hidden">
      {/* Scroll Progress Bar */}
      <m.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#E31937] z-[100] origin-left"
        style={{ scaleX } as any}
      />

      {/* Corporate Navbar */}
      <nav className="fixed top-0 w-full z-[90] bg-[#0B1026]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
              <span className="text-white font-black text-2xl tracking-tighter">
                SUPER EGO <span className="text-[#E31937]">AGENT</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {sections.map(s => (
              <a 
                key={s.id}
                href={`#${s.id}`} 
                className="text-sm font-bold uppercase tracking-widest hover:text-[#E31937] transition-colors"
              >
                {s.label}
              </a>
            ))}
            <button className="px-6 py-2.5 bg-[#E31937] hover:bg-red-700 text-white rounded-md text-sm font-black transition-all shadow-lg shadow-red-500/20">
              预约诊断
            </button>
          </div>

          <button className="lg:hidden p-2 text-white">
             <Activity className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
        {/* Animated background background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E31937]/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E31937] text-xs font-black uppercase tracking-[0.3em] mb-8"
          >
            Next Gen Consultancy
          </m.div>
          
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[1.05]"
          >
            构建企业的可信赖<br/>
            <span className="text-[#E31937]">“第二大脑”</span>
          </m.h1>

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-400 font-medium mb-4 tracking-tight"
          >
            From Artificial Intelligence to <span className="text-white font-black italic underline decoration-[#E31937]">Augmented Intelligence</span>
          </m.p>

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-3xl mx-auto text-gray-500 text-base md:text-lg leading-relaxed mb-12"
          >
            在 HBR 与 ICMCI 定义的AI变革时代，单纯的算力已不再稀缺。稀缺的是信任、治理与人机共创的智慧。Super Ego Agent 致力于为您构建一个“伦理与效能并重”的数字外脑。我们不只是交付代码，我们交付的是战略对齐、风险管控与组织进化。
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button className="px-10 py-5 bg-[#E31937] hover:bg-red-700 text-white rounded-xl font-black uppercase tracking-widest transition-all hover:scale-105 shadow-2xl shadow-red-500/30 flex items-center justify-center gap-3">
              预约AI成熟度诊断 <ChevronRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-xl font-black uppercase tracking-widest transition-all backdrop-blur-md flex items-center justify-center gap-3">
              检阅AI员工军团 <Activity className="w-5 h-5" />
            </button>
          </m.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-24 md:py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              企业的智慧进化论：通往 Super Ego 之路
            </h2>
            <div className="w-20 h-1 bg-[#E31937] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {philosophy.map((p, i) => (
              <m.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-8 md:p-10 rounded-3xl border transition-all duration-500 group ${
                  p.isHighlight 
                  ? 'bg-white/10 border-[#E31937]/50 shadow-[0_0_50px_rgba(227,25,55,0.15)] ring-1 ring-[#E31937]/30' 
                  : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${p.isHighlight ? 'bg-[#E31937]/20 text-[#E31937]' : 'bg-white/5 text-white'}`}>
                  {p.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-2">{p.title}</h3>
                <p className={`text-xs font-black uppercase tracking-widest mb-6 ${p.isHighlight ? 'text-[#E31937]' : 'text-gray-500'}`}>
                  {p.sub}
                </p>
                <p className="text-gray-400 leading-relaxed text-base font-light">
                  {p.text}
                </p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-24 md:py-32 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              四阶段实施框架
            </h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Aistotle Framework Deployment</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodology.map((m_item, i) => (
              <m.div
                key={m_item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="text-6xl font-black text-white/5 absolute -top-10 left-0 group-hover:text-[#E31937]/10 transition-colors duration-500">
                  {m_item.step}
                </div>
                <div className="relative pt-6">
                  <h3 className="text-xl font-black text-white mb-4 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#E31937]" />
                    {m_item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                    {m_item.desc}
                  </p>
                  <ul className="space-y-2">
                    {m_item.details.map(d => (
                      <li key={d} className="flex items-center gap-2 text-xs text-gray-500">
                         <div className="w-1 h-1 bg-white/20 rounded-full" />
                         {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Value Section */}
      <section id="value" className="py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              双重价值维度
            </h2>
            <div className="w-20 h-1 bg-[#E31937] mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
            {/* Leadership Side */}
            <m.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-[40px] p-10 md:p-16 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">致决策者 —— 指挥塔</h3>
                    <p className="text-blue-500 font-mono text-xs uppercase tracking-widest mt-1">Full Visibility & Risk Control</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="text-blue-500 font-bold text-lg mt-1">01</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">穿透迷雾</h4>
                      <p className="text-gray-400 text-sm font-light">打破部门墙，构建“单一真理源”，让高管层实时掌握公司神经末梢的动态。</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-blue-500 font-bold text-lg mt-1">02</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">理性决策</h4>
                      <p className="text-gray-400 text-sm font-light">Super Ego 过滤情绪干扰与幸存者偏差，基于大数据概率提供多维度的战略推演。</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-blue-500 font-bold text-lg mt-1">03</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">安全合规</h4>
                      <p className="text-gray-400 text-sm font-light">建立算法护栏，确保数据隐私与伦理合规，为企业全球化扩张提供坚实的合规基石。</p>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>

            {/* Workforce Side */}
            <m.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-[#E31937]/20 rounded-[40px] p-10 md:p-16 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#E31937]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-[#E31937]/20 text-[#E31937] rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">致员工 —— 钢铁侠战甲</h3>
                    <p className="text-[#E31937] font-mono text-xs uppercase tracking-widest mt-1">Empowerment & Liberation</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="text-[#E31937] font-bold text-lg mt-1">01</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">告别平庸</h4>
                      <p className="text-gray-400 text-sm font-light">AI 接管低价值重复性认知工作，释放 40%+ 的深度思考时间。</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-[#E31937] font-bold text-lg mt-1">02</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">能力跃迁</h4>
                      <p className="text-gray-400 text-sm font-light">初级员工在 AI 外脑的实时辅助下，能够产出专家级的业务质量。</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-[#E31937] font-bold text-lg mt-1">03</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">人机共创</h4>
                      <p className="text-gray-400 text-sm font-light">员工不再是工具，而是升级为 AI Agent 的“指挥官”与“训练师”，实现个人价值再定义。</p>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Agents Bento Grid */}
      <section id="agents" className="py-24 md:py-32 px-4 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              Super Ego 的执行触手：AI员工军团
            </h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Multi-Agent Deployment Army</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map((a, i) => (
              <m.div
                key={a.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`${a.size} group p-8 md:p-12 bg-white/5 border border-white/10 rounded-3xl md:rounded-[48px] hover:border-[#E31937]/40 transition-all duration-500 relative overflow-hidden`}
              >
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="mb-10">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                      {a.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-[#E31937] transition-colors">{a.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-base font-light max-w-sm">
                      {a.desc}
                    </p>
                  </div>
                  
                  <div className="pt-8 border-t border-white/5 flex items-end gap-6">
                    <div className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                      {a.metric}
                    </div>
                    <div className="text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                      {a.metricLabel}
                    </div>
                  </div>
                </div>
                {/* Subtle graphic in background */}
                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                   {a.icon}
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Code Section */}
      <section className="py-24 md:py-32 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
           <m.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="bg-gradient-to-br from-indigo-900/30 via-[#0B1026] to-[#0B1026] border border-white/10 rounded-[48px] md:rounded-[80px] p-10 md:p-24 relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#E31937]/10 via-transparent to-transparent opacity-50" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div>
                    <div className="flex items-center gap-3 mb-8">
                       <Code className="w-8 h-8 text-[#E31937]" />
                       <span className="text-[#E31937] font-mono text-xs font-black uppercase tracking-[0.4em]">Legacy Optimization</span>
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                      唤醒沉睡的 <br/>
                      <span className="text-[#E31937]">代码资产</span>
                    </h2>
                    <p className="text-gray-300 text-lg md:text-2xl leading-relaxed font-light mb-10">
                      您的“代码屎山”不是负担，而是待挖掘的数字金矿。我们利用 LLM 深度理解数百万行遗留代码，自动生成文档、优化架构、修复漏洞。降低维护成本，提升系统敏捷性。
                    </p>
                    <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-xl font-black uppercase tracking-widest transition-all">
                       获取重构建议书
                    </button>
                 </div>
                 
                 <div className="bg-black/60 rounded-3xl p-8 border border-white/5 font-mono text-xs md:text-sm text-gray-500 shadow-inner">
                    <div className="flex gap-2 mb-6">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                    </div>
                    <div className="space-y-2">
                       <p><span className="text-indigo-400"># Initializing</span> Legacy_Analyzer...</p>
                       <p className="text-emerald-500">{'>>'} Deep scanning 1.2M lines of COBOL/Java...</p>
                       <p className="text-emerald-500">{'>>'} Mapping logic dependency clusters...</p>
                       <p className="text-amber-500">{'>>'} Redundant loop detected in Node_742 (Savings: 14%)</p>
                       <p className="text-white">{'>>'} Refactoring blueprint generated.</p>
                       <p className="animate-pulse">_</p>
                    </div>
                 </div>
              </div>
           </m.div>
        </div>
      </section>

      {/* Case Study Section */}
      <section id="case" className="py-24 md:py-32 px-4 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
             <m.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
               className="aspect-[4/5] bg-brand-surface rounded-[48px] overflow-hidden border border-white/10 relative group"
             >
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Case Study" 
                  className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1026] via-[#0B1026]/40 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                   <div className="inline-block px-3 py-1 rounded-full bg-[#E31937] text-white text-[10px] font-black uppercase mb-4">Success Story</div>
                   <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">AI重塑跨境家居电商全链路</h3>
                   <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                      <div>
                         <div className="text-3xl font-black text-[#E31937]">5倍</div>
                         <div className="text-[10px] uppercase font-mono text-gray-500">设计效率提升</div>
                      </div>
                      <div>
                         <div className="text-3xl font-black text-white">22天</div>
                         <div className="text-[10px] uppercase font-mono text-gray-500">库存周转</div>
                      </div>
                      <div>
                         <div className="text-3xl font-black text-white">82%</div>
                         <div className="text-[10px] uppercase font-mono text-gray-500">方案确认率</div>
                      </div>
                   </div>
                </div>
             </m.div>

             <div className="space-y-10">
                <div className="text-left">
                  <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">阿尔法计划 // Alpha Project</span>
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mt-4 leading-tight">
                    从“凭直觉”到 <br/>
                    <span className="text-[#E31937]">“全量化控制”</span>
                  </h2>
                </div>

                <div className="space-y-8">
                   <div className="flex gap-6 items-start">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[#E31937]">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-black mb-2 uppercase tracking-wide">解决方案：多智能体编排</h4>
                        <p className="text-gray-400 font-light text-sm leading-relaxed">
                          部署设计 Agent (自动生成3D渲染)、翻译 Agent (基于垂直家居语料库)、数据 Agent (全网爆款监控与定价策略)。
                        </p>
                      </div>
                   </div>
                   <div className="flex gap-6 items-start">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-blue-400">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-black mb-2 uppercase tracking-wide">商业成果</h4>
                        <p className="text-gray-400 font-light text-sm leading-relaxed">
                          通过我们的多智能体编排框架，为该企业降低了 60% 的运营成本，并实现了 24/7 的全球自动化响应能力。
                        </p>
                      </div>
                   </div>
                </div>

                <button className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-sm hover:text-[#E31937] transition-colors group">
                   查看完整分析报告 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
              核心专家团队
            </h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Elite Architects & Visionaries</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Profile 1 */}
            <m.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="group p-10 bg-white/5 border border-white/10 rounded-[48px] flex flex-col md:flex-row gap-10 items-center hover:bg-white/10 transition-all duration-500"
            >
               <div className="w-48 h-48 rounded-3xl bg-[#0B1026] overflow-hidden border border-white/10 relative">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Zhu" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#E31937]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
               <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">朱云涛</h3>
                  <p className="text-[#E31937] font-mono text-xs uppercase tracking-[0.2em] mb-6">首席愿景官 / CVO</p>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    资深数据专家 & AI技术顾问。香港大学金融工程研究生，上海交大MBA。前 TCL/MTK 架构师。深谙 AI 算法底层与金融科技，拥有极强的人机协作与系统编排前瞻力。
                  </p>
               </div>
            </m.div>

            {/* Profile 2 */}
            <m.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="group p-10 bg-white/5 border border-white/10 rounded-[48px] flex flex-col md:flex-row gap-10 items-center hover:bg-white/10 transition-all duration-500"
            >
               <div className="w-48 h-48 rounded-3xl bg-[#0B1026] overflow-hidden border border-white/10 relative">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Du" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
               <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">杜占源</h3>
                  <p className="text-blue-500 font-mono text-xs uppercase tracking-[0.2em] mb-6">工程负责人 / Head of Engineering</p>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    资深技术专家。前阿里巴巴旗下公司技术总监。10+年机器学习与AIGC落地经验。带领团队研发多模态大模型，并在企业级安全智能体系统部署方面拥有丰富实操经验。
                  </p>
               </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <footer className="py-24 md:py-40 px-4 bg-brand-dark relative overflow-hidden text-center">
         <div className="max-w-4xl mx-auto relative z-10">
            <blockquote className="text-2xl md:text-5xl font-black text-white italic mb-12 tracking-tighter uppercase leading-tight">
              "AI 不会通过图灵测试，因为它不需要。<br className="hidden md:block" /> 但企业如果不拥抱 AI，将无法通过市场的生存测试。"
            </blockquote>
            
            <div className="h-px w-20 bg-[#E31937] mx-auto mb-10" />
            
            <p className="text-gray-400 text-lg md:text-2xl font-light mb-16">
              我们提供的不仅仅是孤立的 AI 工具，而是一整套<br className="hidden md:block" /> “咨询 + 实施 + 赋能”的组织进化方案。
            </p>
            
            <button className="px-12 py-6 bg-[#E31937] hover:bg-red-700 text-white rounded-2xl font-black uppercase tracking-[0.3em] transition-all hover:scale-110 shadow-2xl shadow-red-500/40">
               开始变革：consult@superegoagent.com
            </button>
            
            <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-600 font-mono">
               <div>© 2025 SUPER EGO AGENT. ALL RIGHTS RESERVED.</div>
               <div className="flex gap-8 uppercase tracking-widest">
                  <span>Trust</span>
                  <span>Governance</span>
                  <span>Evolution</span>
               </div>
            </div>
         </div>

         {/* Backdrop graphic */}
         <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-t from-[#E31937]/10 to-transparent blur-[100px] pointer-events-none" />
      </footer>

      {/* Navigation Helper Dot */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-50">
        {sections.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="w-2 h-2 rounded-full bg-white/10 hover:bg-[#E31937] transition-all"
            title={s.label}
          />
        ))}
      </div>
    </div>
  );
};

export default Consulting;
