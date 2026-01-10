
import React, { useMemo } from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Area, ComposedChart 
} from 'recharts';
import { Activity, Target, Zap, CheckCircle2, Circle } from 'lucide-react';
import { useProgressStore } from '../lib/store/progressStore';

const m = motion as any;

// Analytics data for the 12-Week Sports AI Trajectory chart
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
  
  const { completedItems, toggleItem, getCourseProgress } = useProgressStore();

  const progressPercent = getCourseProgress(course);

  const modules = useMemo(() => {
    // Map the global syllabus to the visual module structure of SportsPlanet
    // To maintain aesthetic, we group the 4 syllabus modules into the UI layout
    return course.syllabus.map((m_item, mIdx) => ({
      ...m_item,
      id: `M${mIdx + 1}`,
      idx: mIdx,
      gradient: mIdx % 2 === 0 ? 'from-orange-500 to-red-500' : 'from-red-500 to-pink-600',
      icon: mIdx === 0 ? '👁️' : mIdx === 1 ? '📊' : mIdx === 2 ? '⚖️' : '🚀'
    }));
  }, [course.syllabus]);

  const isModuleComplete = (moduleIdx: number) => {
    const module = course.syllabus[moduleIdx];
    return module.content.every((_, itemIdx) => completedItems[`${course.id}:${moduleIdx}:${itemIdx}`]);
  };

  const toggleWholeModule = (moduleIdx: number) => {
    const module = course.syllabus[moduleIdx];
    const currentlyComplete = isModuleComplete(moduleIdx);
    
    // Set all items in the module to the opposite of the current module completion state
    module.content.forEach((_, itemIdx) => {
      const isItemComplete = !!completedItems[`${course.id}:${moduleIdx}:${itemIdx}`];
      if (isItemComplete === currentlyComplete) {
        toggleItem(course.id, moduleIdx, itemIdx);
      }
    });
  };

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
              构建一个真正的 <span className="text-white font-bold">“AI 私人教练”</span>。支持 <span className="text-blue-400 font-bold">姿态校正</span> 与 <span className="text-emerald-400 font-bold">自动计数</span>，将人体关节转化为数学矢量，在现实世界中提供即时反馈。
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
                {/* Dynamic Progress Indicator overlay on the graphic */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="text-[40px] font-black text-white/5">{progressPercent}%</div>
                </div>
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
               { label: 'Mastery', val: `${progressPercent}%`, icon: Activity },
               { label: 'Sync Status', val: 'Lvl 09', icon: Activity }
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

      {/* Module Timeline - Integrated with centralized Store */}
      <section className="py-8 md:py-20 px-1 md:px-0">
        <div className="space-y-8 md:space-y-24">
          {modules.map((module_item) => {
            const isFinished = isModuleComplete(module_item.idx);
            return (
              <m.div 
                key={module_item.id}
                initial="hidden"
                whileInView="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
                viewport={{ once: true, margin: "-50px" }}
                className={`group relative bg-white/5 border rounded-[32px] md:rounded-[48px] overflow-hidden backdrop-blur-xl transition-all duration-300 ${
                  isFinished 
                    ? 'border-green-500/30 bg-green-500/5 shadow-[0_0_40px_rgba(34,197,94,0.1)]' 
                    : 'border-white/10 hover:border-orange-500/30'
                }`}
              >
                <div className={`absolute top-0 left-0 w-1.5 md:w-2 h-full bg-gradient-to-b ${module_item.gradient}`} />
                <div className="p-6 sm:p-10 md:p-16 flex flex-col lg:flex-row gap-6 md:gap-12">
                   <div className="lg:w-1/3 space-y-3 md:space-y-6">
                      <m.span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] md:text-xs text-orange-400 font-bold uppercase tracking-widest">
                        {module_item.id} // MISSION NODE
                      </m.span>
                      <m.h3 className="text-xl sm:text-2xl md:text-2xl font-black text-white uppercase tracking-tighter leading-tight">{module_item.title}</m.h3>
                      <m.p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-light">{module_item.goal}</m.p>
                      
                      <button
                        onClick={() => toggleWholeModule(module_item.idx)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${
                          isFinished
                            ? 'bg-green-600 text-white border-green-500 hover:bg-green-700 shadow-lg shadow-green-900/40'
                            : 'bg-white/10 text-white border-white/10 hover:border-orange-500 hover:bg-orange-500 shadow-xl'
                        }`}
                      >
                        {isFinished ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Module Locked
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 fill-current" />
                            Sync Full Module
                          </>
                        )}
                      </button>
                   </div>

                   <div className="lg:w-2/3 flex flex-col gap-5 md:gap-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {module_item.content.map((item, iIdx) => {
                           const isItemComplete = !!completedItems[`${course.id}:${module_item.idx}:${iIdx}`];
                           return (
                             <m.button 
                               key={iIdx} 
                               onClick={() => toggleItem(course.id, module_item.idx, iIdx)}
                               className={`p-5 text-left rounded-2xl border transition-all relative overflow-hidden group/item ${
                                 isItemComplete 
                                   ? 'bg-green-500/10 border-green-500/40 text-green-100' 
                                   : 'bg-black/30 border-white/5 hover:border-white/20'
                               }`}
                             >
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className={`font-bold text-xs sm:text-sm flex items-center gap-2 ${isItemComplete ? 'text-green-400' : 'text-white'}`}>
                                     {isItemComplete ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4 text-gray-600" />}
                                     {item.title}
                                  </h4>
                                  <span className="text-[8px] font-mono text-gray-700">NODE_0{iIdx + 1}</span>
                                </div>
                                <p className={`text-[10px] sm:text-xs leading-relaxed font-light ${isItemComplete ? 'text-green-200/50 line-through' : 'text-gray-500'}`}>
                                  {item.description}
                                </p>
                                {isItemComplete && (
                                   <div className="absolute bottom-0 right-0 p-2 opacity-10">
                                      <Zap className="w-12 h-12 text-green-500" />
                                   </div>
                                )}
                             </m.button>
                           );
                         })}
                      </div>
                   </div>
                </div>
              </m.div>
            );
          })}
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
