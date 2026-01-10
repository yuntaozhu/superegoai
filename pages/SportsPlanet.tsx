
import React, { useMemo } from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Area, ComposedChart 
} from 'recharts';
import { Activity, Target, Zap, CheckCircle2, Circle, ShieldCheck } from 'lucide-react';
import { useProgressStore } from '../lib/store/progressStore';

const m = motion as any;

// Analytics data for the 12-Week Sports AI Trajectory chart
const sportsProgressData = [
  { week: 'W01', battery: 15, logic: 10, label: 'Basics & Skeleton' },
  { week: 'W02', battery: 20, logic: 18, label: 'Geometric Logic' },
  { week: 'W03', battery: 28, logic: 25, label: 'Skill Algo' },
  { week: 'W04', battery: 35, logic: 32, label: 'Dynamic Target' },
  { week: 'W05', battery: 45, logic: 42, label: 'Zone 2 Intro' },
  { week: 'W06', battery: 58, logic: 50, label: 'Mitochondrial Peak' },
  { week: 'W07', battery: 65, logic: 62, label: 'Respiratory Flow' },
  { week: 'W08', battery: 72, logic: 75, label: 'Pressure Test' },
  { week: 'W09', battery: 80, logic: 85, label: 'Pain-Decision Sync' },
  { week: 'W10', battery: 88, logic: 92, label: 'Neural Spark' },
  { week: 'W11', battery: 94, logic: 96, label: 'Cognitive Switch' },
  { week: 'W12', battery: 99, logic: 99, label: 'Legacy Agent' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 backdrop-blur-xl border border-red-500/20 p-4 rounded-2xl shadow-2xl">
        <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-widest">{label}</p>
        <p className="text-sm font-bold text-white mb-1">
          Cognitive Battery: <span className="text-orange-400">{payload[0].value}%</span>
        </p>
        <p className="text-sm font-bold text-white">
          Algorithmic Depth: <span className="text-red-500">{payload[1].value}%</span>
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
    const icons = ['👁️', '🤖', '🔋', '🔥', '⚡', '♾️'];
    return course.syllabus.map((m_item, mIdx) => ({
      ...m_item,
      id: `NODE_0${mIdx + 1}`,
      idx: mIdx,
      gradient: mIdx % 2 === 0 ? 'from-orange-500 to-red-500' : 'from-red-500 to-pink-600',
      icon: icons[mIdx] || '🏃'
    }));
  }, [course.syllabus]);

  const isModuleComplete = (moduleIdx: number) => {
    const module = course.syllabus[moduleIdx];
    return module.content.every((_, itemIdx) => completedItems[`${course.id}:${moduleIdx}:${itemIdx}`]);
  };

  const toggleWholeModule = (moduleIdx: number) => {
    const module = course.syllabus[moduleIdx];
    const currentlyComplete = isModuleComplete(moduleIdx);
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
              <ShieldCheck className="w-4 h-4 text-red-500" />
              <span className="text-red-500 font-mono text-[9px] md:text-xs uppercase tracking-[0.2em] font-bold">Bio-Augmentation Protocol Active</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[1.05]">
              主权身心：<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">生物能学与感知进化</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
              大脑不是孤立的计算器，其认知状态受限于身体供能。通过 <span className="text-white font-bold">控制论闭环 (Cybernetics)</span>，我们利用 AI 视觉校准本体感觉，利用 <span className="text-orange-400 font-bold">线粒体生物发生</span> 提升大脑的续航电量。
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
                   {/* Humanoid schematic placeholder */}
                   <circle cx="50" cy="15" r="2.5" fill="currentColor" />
                   <line x1="50" y1="15" x2="50" y2="45" stroke="currentColor" strokeWidth="0.75" />
                   <line x1="30" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="0.75" />
                   <line x1="30" y1="30" x2="25" y2="55" stroke="currentColor" strokeWidth="0.75" />
                   <line x1="70" y1="30" x2="75" y2="55" stroke="currentColor" strokeWidth="0.75" />
                   <line x1="35" y1="75" x2="50" y2="45" stroke="currentColor" strokeWidth="0.75" />
                   <line x1="65" y1="75" x2="50" y2="45" stroke="currentColor" strokeWidth="0.75" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <div className="text-[40px] font-black text-white/5 uppercase">SOVEREIGN</div>
                </div>
                {/* Master Hub Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-20 h-20 rounded-full border border-red-500/30 flex items-center justify-center bg-red-500/5 animate-pulse">
                      <Zap className="w-8 h-8 text-red-500" />
                   </div>
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
              <span className="text-red-500 font-mono text-[9px] uppercase tracking-[0.4em] font-black block mb-2">Protocol Analytics</span>
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">Sovereign Trajectory Matrix</h3>
              <p className="text-gray-500 text-sm mt-2 max-w-xl">Mapping mitochondrial efficiency against algorithmic kinetic mastery.</p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Cognitive Battery</span>
                <div className="h-1 w-20 bg-orange-400 rounded-full mt-1" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Kinetic Logic</span>
                <div className="h-1 w-20 bg-red-600 rounded-full mt-1" />
              </div>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={sportsProgressData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <defs>
                  <linearGradient id="colorLogic" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="logic" 
                  fill="url(#colorLogic)" 
                  stroke="#ef4444" 
                  strokeWidth={0}
                  animationDuration={2500}
                />
                <Line 
                  type="monotone" 
                  dataKey="battery" 
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
               { label: 'ANLS Efficiency', val: '94.2%', icon: Target },
               { label: 'Zone 2 Hours', val: '128h', icon: Zap },
               { label: 'Mito-Score', val: `${progressPercent}%`, icon: Activity },
               { label: 'Sync Status', val: 'OPTIMAL', icon: Activity }
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

      {/* Module Timeline */}
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
                      <m.div className="flex items-center gap-3">
                        <span className="text-3xl md:text-4xl">{module_item.icon}</span>
                        <m.span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] md:text-xs text-orange-400 font-bold uppercase tracking-widest">
                          {module_item.id}
                        </m.span>
                      </m.div>
                      <m.h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight">{module_item.title}</m.h3>
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
                            Node Synchronized
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 fill-current" />
                            Activate Protocol
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
                                  <span className="text-[8px] font-mono text-gray-700">UNIT_0{iIdx + 1}</span>
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

      {/* Sovereign Safety Section */}
      <m.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-8 md:mt-32 p-6 sm:p-12 md:p-16 bg-red-500/5 border border-red-500/10 rounded-[32px] md:rounded-[48px] text-center mx-1 md:mx-0 shadow-inner"
      >
         <div className="space-y-4 md:space-y-6">
           <div className="text-2xl md:text-4xl animate-bounce">🛡️</div>
           <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter">安全与伦理协议 // Sovereign Safety Protocols</h3>
           <p className="text-gray-500 max-w-2xl mx-auto text-[10px] sm:text-xs md:text-sm leading-relaxed font-light px-2">
              主权身心协议基于生理与认知的深度整合。所有运动处方与认知测试应在个性化基线评估后进行。我们尊重数据主权，所有心率、HRV及姿态数据仅供私有 RAG 训练，确保您的数字生命资产绝对安全。
           </p>
         </div>
      </m.div>
    </PlanetLayout>
  );
};

export default SportsPlanet;
