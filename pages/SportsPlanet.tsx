
import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Area, ComposedChart, Cell 
} from 'recharts';
import { Activity, Target, Zap } from 'lucide-react';

const m = motion as any;

// Mock Data for 12-Week Sports AI Trajectory
const sportsProgressData = [
  { week: 'W01', skill: 10, complexity: 5, label: 'CV Setup' },
  { week: 'W02', skill: 18, complexity: 12, label: 'Pixel Logic' },
  { week: 'W03', skill: 25, complexity: 20, label: 'Coordinate Mapping' },
  { week: 'W04', skill: 35, complexity: 28, label: 'MediaPipe Integration' },
  { week: 'W05', skill: 42, complexity: 45, label: 'Vector Physics' },
  { week: 'W06', skill: 55, complexity: 52, label: 'Trigonometric Analysis' },
  { week: 'W07', skill: 62, complexity: 60, label: 'Trajectory Prediction' },
  { week: 'W08', skill: 70, complexity: 75, label: 'Rep Count Engine' },
  { week: 'W09', skill: 78, complexity: 82, label: 'Posture Correction' },
  { week: 'W10', skill: 85, complexity: 88, label: 'Multimodal Feedback' },
  { week: 'W11', skill: 92, complexity: 95, label: 'Edge Deployment' },
  { week: 'W12', skill: 98, complexity: 99, label: 'Full System Orchestration' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 backdrop-blur-xl border border-red-500/20 p-4 rounded-2xl shadow-2xl">
        <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest">{label}</p>
        <p className="text-sm font-bold text-white mb-1">
          Skill Level: <span className="text-orange-400">{payload[0].value}%</span>
        </p>
        <p className="text-sm font-bold text-white">
          Complexity: <span className="text-red-500">{payload[1].value}%</span>
        </p>
        <div className="mt-2 pt-2 border-t border-white/5">
          <p className="text-[9px] font-mono text-blue-400 uppercase">{payload[0].payload.label}</p>
        </div>
      </div>
    );
  }
  return null;
};

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
      goal: '提取运动指标并生成可视化报告，支持自动计数。',
      tech: ['视频流处理', '三角函数', '状态机逻辑', 'Matplotlib'],
      steps: [
        { title: '视频实时分析', desc: '逐帧读取视频文件，实现动态姿态追踪。' },
        { title: '指标量化：角度计算', desc: '利用向量与三角函数计算膝/肘关节夹角性能指标。' },
        { title: '自动计数引擎 (Rep Counting)', desc: '设计状态机判断动作起始、顶点与结束，精准统计训练次数。' }
      ],
      outcome: '智能计数记录器 (Auto Rep Tracker)',
      gradient: 'from-red-500 to-pink-600',
      icon: '📊'
    },
    {
      id: 'M3',
      title: '模块三：智能反馈系统构建',
      period: '17 - 24 周',
      goal: '构建闭环纠正性反馈系统，实时指导动作细节。',
      tech: ['运动解剖学', '逻辑引擎', 'Streamlit', 'RAG'],
      steps: [
        { title: '实时姿态校正 (Posture Correction)', desc: '分析常见损伤风险，如深蹲时“膝内扣”，提供即时视觉警告。' },
        { title: '专家级反馈建议', desc: '根据动作轨迹偏差，利用大模型生成个性化的纠错指令与改进计划。' },
        { title: 'UI 设计与整合', desc: '使用 Streamlit 打造拥有 GUI 界面的一体化应用终端。' }
      ],
      outcome: '最终项目：AI 私人教练 V1.0 (含姿态校正与自动计数)',
      gradient: 'from-indigo-600 to-blue-600',
      icon: '💪'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* HUD Hero Section */}
      <section className="mt-4 md:mt-16 mb-12 md:mb-24 px-1 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <m.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 md:space-y-8 text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-500 font-mono text-[9px] md:text-xs uppercase tracking-[0.2em] font-bold">Kinetic Analysis Active</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-[1.1]">
              视觉与物理的 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">双重探测器</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
              构建一个真正的 <span className="text-white font-bold">“AI 私人教练”</span>。支持 <span className="text-blue-400 font-bold">姿态校正 (Posture Correction)</span> 与 <span className="text-emerald-400 font-bold">自动计数 (Rep Counting)</span>，将人体关节转化为数学矢量，在现实世界中提供即时反馈。
            </p>
          </m.div>

          <m.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square max-w-[380px] mx-auto w-full rounded-[40px] md:rounded-[56px] bg-brand-surface/40 border border-white/10 overflow-hidden flex items-center justify-center p-4 sm:p-8 md:p-12 shadow-2xl"
          >
             <div className="relative w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-orange-500/20">
                   <circle cx="50" cy="15" r="2.5" fill="currentColor" />
                   <line x1="50" y1="15" x2="50" y2="45" stroke="currentColor" strokeWidth="0.75" />
                   <line x1="30" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="0.75" />
                   <line x1="30" y1="30" x2="25" y2="55" stroke="currentColor" strokeWidth="0.75" />
                   <line x1="70" y1="30" x2="75" y2="55" stroke="currentColor" strokeWidth="0.75" />
                   <line x1="35" y1="75" x2="50" y2="45" stroke="currentColor" strokeWidth="0.75" />
                   <line x1="65" y1="75" x2="50" y2="45" stroke="currentColor" strokeWidth="0.75" />
                </svg>
             </div>
          </m.div>
        </div>
      </section>

      {/* Trajectory Analytics Section */}
      <m.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 px-1 md:px-0"
      >
        <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 backdrop-blur-2xl relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Activity className="w-40 h-40 text-red-500" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8 mb-12">
            <div>
              <span className="text-red-500 font-mono text-[9px] uppercase tracking-[0.4em] font-black block mb-2">Cohort Analytics</span>
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">12-Week Progress Matrix</h3>
              <p className="text-gray-500 text-sm mt-2 max-w-xl">Mapping the evolution of kinetic skill and algorithmic complexity across the Sports course trajectory.</p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Skill Evolution</span>
                <div className="h-1 w-20 bg-orange-400 rounded-full mt-1" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Logic Depth</span>
                <div className="h-1 w-20 bg-red-600 rounded-full mt-1" />
              </div>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={sportsProgressData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <defs>
                  <linearGradient id="colorComplexity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis 
                  dataKey="week" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 900 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#4b5563', fontSize: 10, fontWeight: 900 }} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(239, 68, 68, 0.2)', strokeWidth: 2 }} />
                <Area 
                  type="monotone" 
                  dataKey="complexity" 
                  fill="url(#colorComplexity)" 
                  stroke="#ef4444" 
                  strokeWidth={0}
                  animationDuration={2500}
                />
                <Line 
                  type="monotone" 
                  dataKey="skill" 
                  stroke="#fb923c" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#fb923c', strokeWidth: 0 }} 
                  activeDot={{ r: 8, fill: '#fff', stroke: '#fb923c', strokeWidth: 2 }}
                  animationDuration={2000}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/5">
             {[
               { label: 'Avg Accuracy', val: '94.2%', icon: Target },
               { label: 'Neural Hours', val: '128h', icon: Zap },
               { label: 'Sync Status', val: 'Optimal', icon: Activity },
               { label: 'Complexity', val: 'Lv 09', icon: Activity }
             ].map((stat, i) => (
               <div key={i}>
                  <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                    <stat.icon className="w-2.5 h-2.5" /> {stat.label}
                  </div>
                  <div className="text-lg font-black text-white">{stat.val}</div>
               </div>
             ))}
          </div>
        </div>
      </m.section>

      {/* Module Timeline - Optimized Grid */}
      <section className="py-8 md:py-20 px-1 md:px-0">
        <div className="space-y-8 md:space-y-24">
          {modules.map((module_item, idx) => (
            <m.div 
              key={module_item.id}
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative bg-white/5 border border-white/10 rounded-[32px] md:rounded-[48px] overflow-hidden backdrop-blur-xl hover:border-orange-500/30 transition-all duration-300"
            >
              <div className={`absolute top-0 left-0 w-1.5 md:w-2 h-full bg-gradient-to-b ${module_item.gradient}`} />
              <div className="p-6 sm:p-10 md:p-16 flex flex-col lg:flex-row gap-6 md:gap-12">
                 <div className="lg:w-1/3 space-y-3 md:space-y-6">
                    <m.span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] md:text-xs text-orange-400 font-bold uppercase tracking-widest">{module_item.period}</m.span>
                    <m.h3 className="text-xl sm:text-2xl md:text-2xl font-black text-white uppercase tracking-tighter leading-tight">{module_item.title}</m.h3>
                    <m.p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-light">{module_item.goal}</m.p>
                 </div>

                 <div className="lg:w-2/3 flex flex-col gap-5 md:gap-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {module_item.steps.map((step, i) => (
                         <m.div 
                           key={i} 
                           className="p-5 bg-black/30 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                         >
                            <h4 className="text-white font-bold text-xs sm:text-sm mb-1 flex items-center gap-2">
                               <span className="w-1.5 h-1.5 rounded-full bg-orange-500/40" />
                               {step.title}
                            </h4>
                            <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed font-light">{step.desc}</p>
                         </m.div>
                       ))}
                    </div>
                 </div>
              </div>
            </m.div>
          ))}
        </div>
      </section>

      {/* Safety Section */}
      <m.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-8 md:mt-32 p-6 sm:p-12 md:p-16 bg-red-500/5 border border-red-500/10 rounded-[32px] md:rounded-[48px] text-center mx-1 md:mx-0 shadow-inner"
      >
         <div className="space-y-4 md:space-y-6">
           <div className="text-2xl md:text-4xl animate-bounce">⚠️</div>
           <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter">安全与伦理协议 // Safety Protocols</h3>
           <p className="text-gray-500 max-w-2xl mx-auto text-[10px] sm:text-xs md:text-sm leading-relaxed font-light px-2">
              AI 教练仅提供动作纠正与数据分析参考。任何体育活动都存在损伤风险，请在专业人员指导下进行。我们尊重数据主权，所有训练视频仅供本地推理，确保隐私安全。
           </p>
         </div>
      </m.div>
    </PlanetLayout>
  );
};

export default SportsPlanet;
