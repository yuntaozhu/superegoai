import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion, Variants } from 'framer-motion';

const SportsPlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'sports')!;

  const modules = [
    {
      id: 'M1',
      title: '模块一：AI 视觉启蒙与编程基础',
      period: '1 - 8 周',
      goal: '理解 CV 原理，掌握 Python 与核心视觉库，实现姿态分析。',
      tech: ['Python', 'OpenCV', 'MediaPipe Pose', 'YOLO v8'],
      steps: [
        { title: '编程环境入门', desc: '学习变量、循环与函数，拍摄个人运动静态照。' },
        { title: 'OpenCV 图像处理', desc: '在图片上绘制点、线、矩形，手动标记关节。' },
        { title: 'MediaPipe 姿态估计', desc: '提取 33 个身体关键点坐标 (x, y, z, visibility)。' }
      ],
      outcome: '静态姿态分析器 (Static Pose Analyzer)',
      gradient: 'from-orange-500 to-red-500',
      icon: '👁️'
    },
    {
      id: 'M2',
      title: '模块二：AI 应用开发与数据分析',
      period: '9 - 16 周',
      goal: '提取运动指标并生成可视化报告。',
      tech: ['视频流处理', '三角函数', '状态机逻辑', 'Matplotlib'],
      steps: [
        { title: '视频实时分析', desc: '逐帧读取视频文件，实现动态姿态追踪。' },
        { title: '指标量化：角度计算', desc: '利用向量与三角函数计算膝/肘关节夹角性能指标。' },
        { title: '逻辑计数与计时', desc: '设计状态机判断动作完成度，自动统计训练次数。' }
      ],
      outcome: '运动表现记录器 (Performance Tracker)',
      gradient: 'from-red-500 to-pink-600',
      icon: '📊'
    },
    {
      id: 'M3',
      title: '模块三：智能教练与个性化成长',
      period: '17 - 24 周',
      goal: '构建纠正性反馈系统与个性化计划生成器。',
      tech: ['运动解剖学', '逻辑引擎', 'Streamlit'],
      steps: [
        { title: '生物力学入门', desc: '分析常见损伤风险，如深蹲时“膝内扣”的代码规则逻辑。' },
        { title: '反馈建议系统', desc: '检测动作缺陷并根据 RAG 逻辑生成改进建议反馈。' },
        { title: 'UI 设计与整合', desc: '使用 Streamlit 打造拥有 GUI 界面的一体化应用终端。' }
      ],
      outcome: '最终项目：AI 私人教练 V1.0 (AI Private Coach)',
      gradient: 'from-indigo-600 to-blue-600',
      icon: '💪'
    }
  ];

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <PlanetLayout course={course}>
      {/* HUD Hero Section */}
      <section className="mt-4 md:mt-16 mb-12 md:mb-24 px-1 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 md:space-y-8 text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-500 font-mono text-[9px] md:text-xs uppercase tracking-[0.2em] font-bold">Kinetic Analysis Active</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[1.1]">
              视觉与物理的 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">双重探测器</span>
            </h2>
            <p className="text-sm sm:text-base md:text-xl text-gray-400 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
              构建一个真正的 <span className="text-white font-bold">“AI 私人教练”</span>。不仅仅是在屏幕上看，而是利用 CV 视觉分析在现实世界中分析、纠正并优化运动姿态。
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
               <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[8px] md:text-xs font-mono text-gray-500">
                  CORE_ENGINE: MEDIAPIPE_V2
               </div>
               <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[8px] md:text-xs font-mono text-gray-500">
                  REALTIME: 60FPS
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square max-w-[450px] mx-auto w-full rounded-[40px] md:rounded-[56px] bg-brand-surface/40 border border-white/10 overflow-hidden flex items-center justify-center p-4 sm:p-8 md:p-12 shadow-2xl"
          >
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/5 via-transparent to-transparent opacity-40" />
             
             {/* Skeleton HUD Mockup - Optimized for performance */}
             <div className="relative w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-orange-500/20">
                   <circle cx="50" cy="15" r="2.5" fill="currentColor" />
                   <line x1="50" y1="15" x2="50" y2="45" stroke="currentColor" strokeWidth="0.75" />
                   <line x1="30" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="0.75" />
                   <line x1="30" y1="30" x2="25" y2="55" stroke="currentColor" strokeWidth="0.75" />
                   <line x1="70" y1="30" x2="75" y2="55" stroke="currentColor" strokeWidth="0.75" />
                   <line x1="35" y1="75" x2="50" y2="45" stroke="currentColor" strokeWidth="0.75" />
                   <line x1="65" y1="75" x2="50" y2="45" stroke="currentColor" strokeWidth="0.75" />
                   <motion.circle 
                     cx="30" cy="30" r="1.5" fill="#ef4444" 
                     animate={{ opacity: [0.3, 1, 0.3] }}
                     transition={{ repeat: Infinity, duration: 1.5 }}
                   />
                   <motion.circle 
                     cx="70" cy="30" r="1.5" fill="#ef4444" 
                     animate={{ opacity: [0.3, 1, 0.3] }}
                     transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                   />
                </svg>
                
                {/* Floating data windows - Tappable style */}
                <motion.div 
                  initial={{ x: 10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-4 right-4 md:top-8 md:right-8 p-3 bg-red-500/10 backdrop-blur-md rounded-xl border border-red-500/20 font-mono text-[8px] md:text-[10px] text-red-200 shadow-lg"
                >
                   KNEE_ANGLE: 124.5&deg; <br/>
                   <span className="text-green-400 font-bold uppercase">Target Met</span>
                </motion.div>
                <motion.div 
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-8 left-4 md:bottom-12 md:left-8 p-3 bg-orange-500/10 backdrop-blur-md rounded-xl border border-orange-500/20 font-mono text-[8px] md:text-[10px] text-orange-200 shadow-lg"
                >
                   REP_COUNT: 14 <br/>
                   STAGE: ASCENT
                </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Module Timeline - Optimized Grid */}
      <section className="py-8 md:py-20 px-1 md:px-0">
        <div className="space-y-8 md:space-y-24">
          {modules.map((m, idx) => (
            <motion.div 
              key={m.id}
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative bg-white/5 border border-white/10 rounded-[32px] md:rounded-[48px] overflow-hidden backdrop-blur-xl hover:border-orange-500/30 transition-all duration-300"
            >
              <div className={`absolute top-0 left-0 w-1.5 md:w-2 h-full bg-gradient-to-b ${m.gradient}`} />
              <div className="p-6 sm:p-10 md:p-16 flex flex-col lg:flex-row gap-6 md:gap-12">
                 <div className="lg:w-1/3 space-y-3 md:space-y-6">
                    <motion.span variants={itemVariants} className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] md:text-xs text-orange-400 font-bold uppercase tracking-widest">{m.period}</motion.span>
                    <motion.h3 variants={itemVariants} className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight">{m.title}</motion.h3>
                    <motion.p variants={itemVariants} className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-light">{m.goal}</motion.p>
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-1 md:pt-4">
                       {m.tech.map(t => (
                         <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[8px] md:text-[9px] font-mono text-gray-500">{t}</span>
                       ))}
                    </motion.div>
                 </div>

                 <div className="lg:w-2/3 flex flex-col gap-5 md:gap-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {m.steps.map((step, i) => (
                         <motion.div 
                           key={i} 
                           variants={itemVariants}
                           className="p-5 bg-black/30 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                         >
                            <h4 className="text-white font-bold text-xs sm:text-sm mb-1 flex items-center gap-2">
                               <span className="w-1.5 h-1.5 rounded-full bg-orange-500/40" />
                               {step.title}
                            </h4>
                            <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed font-light">{step.desc}</p>
                         </motion.div>
                       ))}
                    </div>
                    
                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                      className={`p-6 sm:p-8 bg-gradient-to-br ${m.gradient} rounded-2xl sm:rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 cursor-default text-center sm:text-left`}
                    >
                       <div className="text-white">
                          <div className="text-[8px] font-mono opacity-80 uppercase tracking-[0.2em] mb-1 font-black">PHASE_OUTPUT</div>
                          <div className="text-sm sm:text-lg md:text-xl font-black uppercase tracking-tight">{m.outcome}</div>
                       </div>
                       <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-inner flex-shrink-0">
                          {m.icon}
                       </div>
                    </motion.div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Safety Section - Mobile Optimized */}
      <section className="mt-8 md:mt-32 p-6 sm:p-12 md:p-16 bg-red-500/5 border border-red-500/10 rounded-[32px] md:rounded-[48px] text-center mx-1 md:mx-0 shadow-inner">
         <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="space-y-4 md:space-y-6"
         >
           <div className="text-3xl md:text-5xl animate-bounce">⚠️</div>
           <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-tighter">安全与伦理协议 // Safety Protocols</h3>
           <p className="text-gray-500 max-w-2xl mx-auto text-[10px] sm:text-xs md:text-sm leading-relaxed font-light px-2">
              AI 教练仅提供动作纠正与数据分析参考。任何体育活动都存在损伤风险，请在专业人员指导下进行。我们尊重数据主权，所有训练视频仅供本地推理，确保隐私安全。
           </p>
         </motion.div>
      </section>

      {/* Philosophy Callout - Mobile Refinement */}
      <section className="mt-12 md:mt-32 mb-10 md:mb-20 text-center px-1 md:px-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto p-8 sm:p-16 md:p-20 bg-brand-surface/60 border border-orange-500/10 rounded-[40px] md:rounded-[64px] backdrop-blur-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-lg sm:text-xl md:text-3xl font-black text-white mb-6 md:mb-8 uppercase tracking-tighter">从“看”到“感知”的跃迁</h3>
            <p className="text-gray-300 text-xs sm:text-sm md:text-lg leading-relaxed font-light mb-8 md:mb-12 italic px-2">
              "通过代码定义的运动逻辑，你不仅是在锻炼肌肉，更是在训练你的数字感官。当你能用数学描述一个完美的投篮，你就掌握了身体的终极控制权。"
            </p>
            <div className="flex justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-orange-500 font-black text-2xl md:text-4xl mb-1">33</div>
                <div className="text-[8px] md:text-[10px] text-gray-600 uppercase font-mono tracking-widest">Keypoints</div>
              </div>
              <div className="text-center">
                <div className="text-orange-500 font-black text-2xl md:text-4xl mb-1">24/7</div>
                <div className="text-[8px] md:text-[10px] text-gray-600 uppercase font-mono tracking-widest">Awareness</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Scroll Tip for Mobile */}
      <div className="mt-8 text-center md:hidden pb-10">
         <span className="text-[8px] font-mono text-gray-700 uppercase tracking-widest animate-pulse">
           Scroll to explore curriculum modules
         </span>
      </div>
    </PlanetLayout>
  );
};

export default SportsPlanet;