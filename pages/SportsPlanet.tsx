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
        { title: 'MediaPipe 姿态估计', desc: '提取 33 个身体关键点坐标 (x, y, z, visibility)。' },
        { title: 'YOLO 目标检测', desc: '识别运动器材（球、水瓶），实现多模型协作。' }
      ],
      outcome: '项目一：静态姿态分析器 (Static Pose Analyzer)',
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
        { title: '逻辑计数与计时', desc: '设计状态机判断深蹲完成度，自动统计次数。' },
        { title: '个人运动档案', desc: '整合总次数、平均深度、稳定性分析，输出 HTML/PDF。' }
      ],
      outcome: '项目二：运动表现记录器 (Performance Tracker)',
      gradient: 'from-red-500 to-pink-600'
    },
    {
      id: 'M3',
      title: '模块三：智能教练与个性化成长',
      period: '17 - 24 周',
      goal: '引入运动科学，构建纠正性反馈系统与个性化计划生成器。',
      tech: ['运动解剖学', '逻辑引擎', '数据结构 (Dict/List)', 'Streamlit'],
      steps: [
        { title: '生物力学入门', desc: '分析常见损伤风险，如深蹲时“膝内扣”的代码规则。' },
        { title: '建立反馈建议系统', desc: 'IF-THEN 逻辑：检测动作缺陷并生成改进建议。' },
        { title: '训练计划生成器', desc: '根据数据弱点（如核心力量不足）自动编排周计划。' },
        { title: 'UI 设计与整合', desc: '使用 Streamlit 打造拥有 GUI 界面的一体化应用。' }
      ],
      outcome: '最终项目：AI 私人教练 V1.0 (AI Private Coach)',
      gradient: 'from-indigo-600 to-blue-600'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* Target Audience & Vision */}
      <section className="mt-16 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
               <span className="px-4 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs rounded-full">10-16 YEARS OLD</span>
               <span className="px-4 py-1 bg-white/5 border border-white/10 text-gray-400 font-mono text-xs rounded-full">24 WEEKS</span>
            </div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
              打造你的专属 AI 运动教练
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              将编程学习、运动实践与数据分析紧密结合。在这一课程中，孩子不再只是“用户”，而是
              <span className="text-orange-400 font-bold">“创造者”</span>
              。我们将通过 {'"代码 + 汗水"'} 的结合，完成从普通运动爱好者到
              <span className="text-orange-400 font-bold">未来型科技人才</span>
              的进化。
            </p>
          </motion.div>

          <div className="relative aspect-square rounded-[48px] bg-brand-surface border border-white/10 overflow-hidden flex items-center justify-center">
            {/* Visual HUD Mockup */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none z-10">
               <div className="flex justify-between items-start">
                  <div className="space-y-1">
                     <div className="text-[10px] font-mono text-orange-500">BIO_SCAN: ACTIVE</div>
                     <div className="text-lg font-black text-white">SQUAT_DEPTH: 82%</div>
                  </div>
                  <div className="w-12 h-12 border-2 border-orange-500/30 rounded-full animate-spin-slow flex items-center justify-center">
                     <div className="w-1 h-4 bg-orange-500 rounded-full" />
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex gap-1">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className={`h-4 w-1 rounded-full ${i < 15 ? 'bg-orange-500' : 'bg-white/10'}`} />
                    ))}
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Kinematic Data Stream // Level 04</div>
               </div>
            </div>
            
            <div className="text-9xl filter blur-[2px] opacity-20">🏃</div>
            <div className="absolute inset-0 flex items-center justify-center">
               {/* Body Landmarks Visualization */}
               <svg className="w-64 h-64 text-orange-500/40" viewBox="0 0 100 100">
                  <circle cx="50" cy="20" r="2" fill="currentColor" />
                  <line x1="50" y1="20" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="30" y1="35" x2="70" y2="35" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="30" y1="35" x2="25" y2="60" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="70" y1="35" x2="75" y2="60" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="40" y1="80" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="60" y1="80" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="30" cy="35" r="1.5" fill="orange" className="animate-pulse" />
                  <circle cx="70" cy="35" r="1.5" fill="orange" className="animate-pulse" />
                  <circle cx="40" cy="80" r="1.5" fill="orange" className="animate-pulse" />
               </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Module Breakdown */}
      <section className="py-20">
        <div className="grid grid-cols-1 gap-12">
          {modules.map((m, idx) => (
            <motion.div 
              key={m.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-white/5 border border-white/10 rounded-[48px] overflow-hidden backdrop-blur-xl hover:border-orange-500/30 transition-all duration-500"
            >
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${m.gradient}`} />
              
              <div className="p-10 md:p-16 flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/3">
                  <div className="text-orange-500 font-mono text-sm mb-4">{m.period}</div>
                  <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">{m.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">{m.goal}</p>
                  
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">核心技术栈</h4>
                    <div className="flex flex-wrap gap-2">
                      {m.tech.map(t => (
                        <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-orange-300 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {m.steps.map((step, sIdx) => (
                    <div key={sIdx} className="p-6 bg-black/20 rounded-3xl border border-white/5 group-hover:border-white/10 transition-all">
                       <span className="text-[10px] font-mono text-orange-500/50 block mb-2">WEEK 0{(idx * 8) + (sIdx * 2 + 1)}-0{(idx * 8) + (sIdx * 2 + 2)}</span>
                       <h5 className="text-white font-bold mb-2">{step.title}</h5>
                       <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                  
                  <div className={`md:col-span-2 mt-4 p-8 bg-gradient-to-r ${m.gradient} rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl`}>
                    <div className="text-white">
                      <div className="text-[10px] font-mono opacity-80 uppercase tracking-[0.2em] mb-1">Expected Outcome</div>
                      <div className="text-xl font-black">{m.outcome}</div>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                      🏆
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Safety & Evaluation */}
      <section className="mt-32 pt-20 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div className="p-10 bg-brand-surface rounded-[40px] border border-white/5">
              <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                <span className="text-red-500">⚠️</span> 安全须知
              </h3>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">•</span>
                  课程开始前必须进行充分热身，并在家长监督下进行。
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">•</span>
                  避免在不平整的地面进行运动。
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">•</span>
                  AI 建议仅供参考，身体若有不适请立即停止。
                </li>
              </ul>
           </div>

           <div className="space-y-6">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">评估体系</h3>
              {[
                { title: '项目评估', desc: '每个模块结束时的项目完成度是核心指标。', icon: '📁' },
                { title: '能力评估', desc: '能否清晰解释代码逻辑与分析报告中的数据。', icon: '📊' },
                { title: '体能评估', desc: '通过长期的 AI 报告观察特定运动表现的进步曲线。', icon: '📈' }
              ].map(item => (
                <div key={item.title} className="flex gap-6 p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h4 className="text-white font-bold">{item.title}</h4>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-32 py-20 bg-gradient-to-br from-orange-900/40 to-red-900/40 border border-orange-500/30 rounded-[64px] text-center backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">不仅是“玩”应用，而是“造”未来</h2>
          <p className="text-gray-300 mb-12 text-lg font-light leading-relaxed">
            在这个有深度、有挑战、有产出的学习旅程中，真正成为一个
            <span className="text-orange-400 font-bold">既懂运动又懂 AI</span>
            的未来型人才。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-12 py-6 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl transition-all">
              加入未来运动员计划
            </button>
            <button className="px-12 py-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest transition-all">
              下载教学大纲
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </PlanetLayout>
  );
};

export default SportsPlanet;