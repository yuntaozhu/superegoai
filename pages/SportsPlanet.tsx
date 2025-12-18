import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

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
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'M2',
      title: '模块二：AI 应用开发与数据分析',
      period: '9 - 16 周',
      goal: '将技术应用到动态视频中，提取运动指标并生成可视化报告。',
      tech: ['视频流处理', '三角函数', '状态机逻辑', 'Matplotlib'],
      steps: [
        { title: '视频实时分析', desc: '逐帧读取视频文件，实现动态姿态追踪。' },
        { title: '指标量化：角度计算', desc: '利用向量与三角函数计算膝/肘关节夹角。' },
        { title: '逻辑计数与计时', desc: '设计状态机判断深蹲完成度，自动统计次数。' }
      ],
      outcome: '运动表现记录器 (Performance Tracker)',
      gradient: 'from-red-500 to-pink-600'
    },
    {
      id: 'M3',
      title: '模块三：智能教练与个性化成长',
      period: '17 - 24 周',
      goal: '引入运动科学，构建纠正性反馈系统与个性化计划生成器。',
      tech: ['运动解剖学', '逻辑引擎', 'Streamlit'],
      steps: [
        { title: '生物力学入门', desc: '分析常见损伤风险，如深蹲时“膝内扣”的代码规则。' },
        { title: '反馈建议系统', desc: 'IF-THEN 逻辑：检测动作缺陷并生成改进建议。' },
        { title: 'UI 设计与整合', desc: '使用 Streamlit 打造拥有 GUI 界面的一体化应用。' }
      ],
      outcome: '最终项目：AI 私人教练 V1.0 (AI Private Coach)',
      gradient: 'from-indigo-600 to-blue-600'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* HUD Hero Section */}
      <section className="mt-16 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-500 font-mono text-xs uppercase tracking-[0.4em]">Kinetic Analysis Active</span>
            </div>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-tight">
              视觉与物理的 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">双重探测器</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              构建一个真正的 <span className="text-white font-bold">“AI 私人教练”</span>。不仅仅是在屏幕上看，而是利用 CV 视觉分析在现实世界中分析、纠正并优化每一次运动姿态。
            </p>
            <div className="flex gap-4">
               <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-mono text-gray-400">
                  REF_POINTS: 33_LNDMRKS
               </div>
               <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-mono text-gray-400">
                  FRAME_RATE: 60_FPS_SYNC
               </div>
            </div>
          </motion.div>

          <div className="relative aspect-square rounded-[56px] bg-brand-surface border border-white/10 overflow-hidden flex items-center justify-center p-12">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none" />
             
             {/* Skeleton HUD Mockup */}
             <div className="relative w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-orange-500/40">
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
                <div className="absolute top-0 right-0 p-4 bg-red-500/20 backdrop-blur-md rounded-xl border border-red-500/30 font-mono text-[10px] text-red-200">
                   KNEE_ANGLE: 124.5&deg; <br/>
                   <span className="text-green-400">OPTIMAL_RANGE</span>
                </div>
                <div className="absolute bottom-10 left-0 p-4 bg-orange-500/20 backdrop-blur-md rounded-xl border border-orange-500/30 font-mono text-[10px] text-orange-200">
                   COUNT: 14 <br/>
                   STATUS: DESCENDING
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Module Timeline */}
      <section className="py-20">
        <div className="space-y-24">
          {modules.map((m, idx) => (
            <motion.div 
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-white/5 border border-white/10 rounded-[48px] overflow-hidden backdrop-blur-xl hover:border-orange-500/20 transition-all duration-500"
            >
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${m.gradient}`} />
              <div className="p-10 md:p-16 flex flex-col lg:flex-row gap-12">
                 <div className="lg:w-1/3 space-y-6">
                    <span className="px-4 py-1 bg-white/10 rounded-full font-mono text-xs text-orange-400">{m.period}</span>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{m.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{m.goal}</p>
                    <div className="flex flex-wrap gap-2 pt-4">
                       {m.tech.map(t => (
                         <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono text-gray-500">{t}</span>
                       ))}
                    </div>
                 </div>

                 <div className="lg:w-2/3 flex flex-col gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {m.steps.map((step, i) => (
                         <div key={i} className="p-6 bg-black/20 rounded-3xl border border-white/5 group-hover:border-white/10 transition-colors">
                            <h4 className="text-white font-bold text-sm mb-2">{step.title}</h4>
                            <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                         </div>
                       ))}
                    </div>
                    
                    <div className={`p-8 bg-gradient-to-br ${m.gradient} rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6`}>
                       <div className="text-white">
                          <div className="text-[10px] font-mono opacity-80 uppercase tracking-widest mb-1">阶段交付物</div>
                          <div className="text-xl font-black uppercase tracking-tight">{m.outcome}</div>
                       </div>
                       <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">🏆</div>
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Safety Section */}
      <section className="mt-32 p-12 bg-red-500/10 border border-red-500/20 rounded-[48px] text-center">
         <div className="text-4xl mb-6">⚠️</div>
         <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">安全与伦理协议</h3>
         <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
            AI 教练仅提供动作纠正与数据分析参考。任何体育活动都存在损伤风险，请在专业人员指导或监护人陪同下进行。我们尊重数据主权，所有训练视频仅供本地推理，不上传云端。
         </p>
      </section>
    </PlanetLayout>
  );
};

export default SportsPlanet;