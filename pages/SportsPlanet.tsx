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
      goal: '理解 CV 原理，掌握 Python 与核心视觉库，实现静态姿态分析。',
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
      goal: '将技术应用到动态视频中，提取运动指标并生成可视化报告。',
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
      goal: '引入运动科学，构建纠正性反馈系统与个性化计划生成器。',
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
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <PlanetLayout course={course}>
      {/* HUD Hero Section */}
      <section className="mt-8 md:mt-16 mb-16 md:mb-24 px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">Kinetic Analysis Active</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
              视觉与物理的 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">双重探测器</span>
            </h2>
            <p className="text-base md:text-xl text-gray-300 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
              构建一个真正的 <span className="text-white font-bold">“AI 私人教练”</span>。不仅仅是在屏幕上看，而是利用 CV 视觉分析在现实世界中分析、纠正并优化运动姿态。
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4">
               <div className="px-4 md:px-6 py-2 md:py-3 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-[9px] md:text-xs font-mono text-gray-400">
                  REF: 33_LNDMRKS
               </div>
               <div className="px-4 md:px-6 py-2 md:py-3 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-[9px] md:text-xs font-mono text-gray-400">
                  FPS: 60_SYNC
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square max-w-[500px] mx-auto w-full rounded-[40px] md:rounded-[56px] bg-brand-surface/40 border border-white/10 overflow-hidden flex items-center justify-center p-6 md:p-12 shadow-2xl"
          >
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/5 via-transparent to-transparent opacity-50" />
             
             {/* Skeleton HUD Mockup */}
             <div className="relative w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-orange-500/30">
                   <circle cx="50" cy="15" r="3" fill="currentColor" />
                   <line x1="50" y1="15" x2="50" y2="45" stroke="currentColor" strokeWidth="1" />
                   <line x1="30" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="1" />
                   <line x1="30" y1="30" x2="25" y2="55" stroke="currentColor" strokeWidth="1" />
                   <line x1="70" y1="30" x2="75" y2="55" stroke="currentColor" strokeWidth="1" />
                   <line x1="35" y1="75" x2="50" y2="45" stroke="currentColor" strokeWidth="1" />
                   <line x1="65" y1="75" x2="50" y2="45" stroke="currentColor" strokeWidth="1" />
                   <motion.circle 
                     cx="30" cy="30" r="2" fill="#ef4444" 
                     animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                     transition={{ repeat: Infinity, duration: 2 }}
                   />
                   <motion.circle 
                     cx="70" cy="30" r="2" fill="#ef4444" 
                     animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                     transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                   />
                </svg>
                
                {/* Floating data windows */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-2 right-2 md:top-6 md:right-6 p-2 md:p-4 bg-red-500/10 backdrop-blur-md rounded-xl border border-red-500/20 font-mono text-[8px] md:text-[10px] text-red-200"
                >
                   KNEE: 124.5&deg; <br/>
                   <span className="text-green-400 font-bold">OPTIMAL</span>
                </motion.div>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute bottom-6 left-2 md:bottom-10 md:left-6 p-2 md:p-4 bg-orange-500/10 backdrop-blur-md rounded-xl border border-orange-500/20 font-mono text-[8px] md:text-[10px] text-orange-200"
                >
                   COUNT: 14 <br/>
                   STATE: DOWN
                </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Module Timeline */}
      <section className="py-12 md:py-20 px-4 md:px-0">
        <div className="space-y-12 md:space-y-24">
          {modules.map((m, idx) => (
            <motion.div 
              key={m.id}
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative bg-white/5 border border-white/10 rounded-3xl md:rounded-[48px] overflow-hidden backdrop-blur-xl hover:border-orange-500/20 transition-all duration-500"
            >
              <div className={`absolute top-0 left-0 w-1.5 md:w-2 h-full bg-gradient-to-b ${m.gradient}`} />
              <div className="p-6 md:p-16 flex flex-col lg:flex-row gap-8 md:gap-12">
                 <div className="lg:w-1/3 space-y-4 md:space-y-6">
                    <motion.span variants={itemVariants} className="inline-block px-3 py-1 bg-white/10 rounded-full font-mono text-[10px] md:text-xs text-orange-400 font-bold">{m.period}</motion.span>
                    <motion.h3 variants={itemVariants} className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter">{m.title}</motion.h3>
                    <motion.p variants={itemVariants} className="text-gray-400 text-xs md:text-sm leading-relaxed">{m.goal}</motion.p>
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2 md:pt-4">
                       {m.tech.map(t => (
                         <span key={t} className="px-2 md:px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[8px] md:text-[10px] font-mono text-gray-500">{t}</span>
                       ))}
                    </motion.div>
                 </div>

                 <div className="lg:w-2/3 flex flex-col gap-6 md:gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                       {m.steps.map((step, i) => (
                         <motion.div 
                           key={i} 
                           variants={itemVariants}
                           className="p-5 md:p-6 bg-black/20 rounded-2xl md:rounded-3xl border border-white/5 hover:border-white/10 transition-colors"
                         >
                            <h4 className="text-white font-bold text-xs md:text-sm mb-1 md:mb-2 flex items-center gap-2">
                               <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50" />
                               {step.title}
                            </h4>
                            <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed font-light">{step.desc}</p>
                         </motion.div>
                       ))}
                    </div>
                    
                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 md:p-8 bg-gradient-to-br ${m.gradient} rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 cursor-default`}
                    >
                       <div className="text-white text-center md:text-left">
                          <div className="text-[9px] font-mono opacity-80 uppercase tracking-widest mb-1 font-bold">阶段交付物 // Output</div>
                          <div className="text-base md:text-xl font-black uppercase tracking-tight">{m.outcome}</div>
                       </div>
                       <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center text-xl md:text-2xl shadow-inner">
                          {m.icon}
                       </div>
                    </motion.div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Safety Section */}
      <section className="mt-16 md:mt-32 p-8 md:p-16 bg-red-500/5 border border-red-500/10 rounded-3xl md:rounded-[48px] text-center mx-4 md:mx-0 shadow-inner">
         <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="space-y-6"
         >
           <div className="text-4xl md:text-5xl animate-bounce">⚠️</div>
           <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">安全与伦理协议 // Safety Protocols</h3>
           <p className="text-gray-500 max-w-2xl mx-auto text-[10px] md:text-sm leading-relaxed font-light">
              AI 教练仅提供动作纠正与数据分析参考。任何体育活动都存在损伤风险，请在专业人员指导下进行。我们尊重数据主权，所有训练视频仅供本地推理，确保隐私安全。
           </p>
         </motion.div>
      </section>

      {/* Philosophy Callout */}
      <section className="mt-20 md:mt-32 mb-10 md:mb-20 text-center px-4 md:px-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto p-10 md:p-20 bg-brand-surface border border-orange-500/20 rounded-[40px] md:rounded-[64px] backdrop-blur-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-xl md:text-3xl font-black text-white mb-6 md:mb-8 uppercase tracking-tighter">从“看”到“感知”的跃迁</h3>
            <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-light mb-8 md:mb-12 italic">
              "通过代码定义的运动逻辑，你不仅是在锻炼肌肉，更是在训练你的数字感官。当你能用数学描述一个完美的投篮，你就掌握了身体的终极控制权。"
            </p>
            <div className="flex justify-center gap-10">
              <div className="text-center">
                <div className="text-orange-500 font-black text-2xl md:text-4xl mb-1">33</div>
                <div className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Keypoints Synced</div>
              </div>
              <div className="text-center">
                <div className="text-orange-500 font-black text-2xl md:text-4xl mb-1">24/7</div>
                <div className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Vision Awareness</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </PlanetLayout>
  );
};

export default SportsPlanet;