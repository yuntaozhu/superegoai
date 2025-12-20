
import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

// Using any to bypass framer-motion type mismatch in the current environment
const m = motion as any;

const ArtPlanet: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  const course = content.courses.find(c => c.id === 'art')!;

  const acts = [
    {
      id: '01',
      title: '第一幕：光的革命与东方回响',
      subtitle: '从客观观察到主观感受',
      artists: '莫奈 & 北斋',
      works: '《印象·日出》、《神奈川冲浪里》',
      philosophy: '当照相机能完美“复制”现实，绘画的新使命是什么？',
      dialogue: '训练 AI 融合印象派与浮世绘风格。',
      math: ['光的插值 (Lerp)', '动态黄金螺旋'],
      mission: '手动编写 curveVertex() 精确绘制黄金螺旋，并让粒子沿其轨迹运动。',
      gradient: 'from-blue-400 to-orange-400',
      icon: '🌊',
      glow: 'rgba(59, 130, 246, 0.3)'
    },
    {
      id: '02',
      title: '第二幕：点彩派的理性实验室',
      subtitle: '科学方法构建秩序感',
      artists: '乔治·修拉',
      works: '《大碗岛的星期日下午》',
      philosophy: '点彩画派的“秩序感”是对混乱工业社会的逃避还是理想化重构？',
      dialogue: '命令 AI 用“点”思考，捕捉有序的宁静。',
      math: ['离散化与像素化', '网格平均色值计算'],
      mission: '编写嵌套 for 循环，将任意图片分割为网格，计算平均色值并用圆点重绘。',
      gradient: 'from-green-400 to-yellow-400',
      icon: '🔳',
      glow: 'rgba(34, 197, 94, 0.3)'
    },
    {
      id: '03',
      title: '第三幕：情感的旋涡与风场',
      subtitle: '主观真实高于客观现实',
      artists: '文森特·梵高',
      works: '《星夜》',
      philosophy: '描绘的是真实的夜空，还是内心的“宇宙”？',
      dialogue: '让 AI 表达情感，使用厚涂与颤动能量。',
      math: ['向量场 (Vector Field)', '柏林噪声 (Perlin Noise)'],
      mission: '利用 noise() 构建不可见向量场，释放粒子随“风场”流动。',
      gradient: 'from-blue-600 to-purple-600',
      icon: '✨',
      glow: 'rgba(139, 92, 246, 0.3)'
    },
    {
      id: '04',
      title: '第四幕：几何结构的“因式分解”',
      subtitle: '绘画自身的秩序与逻辑',
      artists: '保罗·塞尚',
      works: '《圣维克多山》',
      philosophy: '“艺术是与自然平行的和谐”，意味着模仿还是创造“第二自然”？',
      dialogue: '用几何眼光看世界，解构为几何平面。',
      math: ['泰森多边形 (Voronoi)', '三角剖分 (Delaunay)'],
      mission: '引入 d3-delaunay库，编写着色算法根据块面朝向应用冷暖色调。',
      gradient: 'from-orange-500 to-red-600',
      icon: '📐',
      glow: 'rgba(239, 68, 68, 0.3)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const scanLineVariants = {
    animate: {
      top: ['0%', '100%', '0%'],
      transition: { duration: 5, repeat: Infinity, ease: 'linear' }
    }
  };

  return (
    <PlanetLayout course={course}>
      {/* Intro Section */}
      <section className="mt-12 md:mt-24 mb-32 md:mb-48 px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <m.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-10 text-center lg:text-left"
          >
            <m.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-6">
              <span className="h-px w-20 bg-gradient-to-r from-purple-500 to-transparent"></span>
              <span className="text-purple-400 font-mono text-xs uppercase tracking-[0.5em] font-black">Neural Art Pipeline</span>
            </m.div>
            
            <m.h2 variants={itemVariants} className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[1.1]">
              训练“超我”的 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 animate-gradient-x">
                审美与抽象能力
              </span>
            </m.h2>
            
            <m.p variants={itemVariants} className="text-base md:text-xl text-gray-400 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
              AI 不再是简单的画图工具，而是将 <span className="text-white font-semibold">“艺术文脉”</span> 转化为 <span className="text-white font-semibold">“数学算力”</span> 的翻译官。
            </m.p>
          </m.div>

          <m.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2 }}
            className="grid grid-cols-2 gap-4 md:gap-8 perspective-1000"
          >
            {[{ label: 'Style Fusion', val: 'Active', icon: '🎨' }, { label: 'Historical Logic', val: 'Deep', icon: '🏛️' }].map((stat, i) => (
              <div key={i} className="bg-brand-surface/60 border border-white/10 rounded-[32px] p-6 md:p-10 backdrop-blur-2xl relative overflow-hidden group shadow-2xl">
                <div className="absolute -right-4 -bottom-4 text-3xl opacity-5 group-hover:opacity-10 transition-opacity">{stat.icon}</div>
                <div className="text-[9px] font-mono text-gray-500 uppercase mb-4 tracking-widest">{stat.label}</div>
                <div className="text-xl md:text-3xl font-black text-white">{stat.val}</div>
              </div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Acts Timeline */}
      <section className="py-20 md:py-40 px-4 md:px-0">
        <div className="space-y-32 md:space-y-80 relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-purple-500/30 via-white/5 to-transparent hidden lg:block -translate-x-1/2" />

          {acts.map((act, idx) => (
            <div 
              key={act.id}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 md:gap-32 items-center relative`}
            >
              <m.div 
                className="flex-1 space-y-8 md:space-y-16 z-10 w-full"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <div className="flex items-center justify-center lg:justify-start gap-8">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[32px] bg-gradient-to-br ${act.gradient} flex items-center justify-center text-3xl md:text-4xl shadow-2xl border border-white/20`}>
                    {act.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-xs text-purple-500 font-black tracking-[0.5em] uppercase">Phase_Node_0{act.id}</div>
                    <div className="text-[9px] text-gray-600 font-mono uppercase tracking-widest">Quantum State: Synchronized</div>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase leading-none text-center lg:text-left">
                  {act.title}
                </h3>
                
                <div className="bg-brand-surface/40 border border-white/10 rounded-[48px] md:rounded-[80px] p-8 md:p-16 space-y-12 backdrop-blur-3xl relative overflow-hidden group shadow-2xl">
                   <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-60 transition-opacity" style={{ background: act.glow }} />
                   
                   <div className="space-y-6">
                     <div className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.6em] mb-4">Aesthetic_Input_Log</div>
                     <p className="text-gray-100 text-xl md:text-3xl leading-snug italic font-extralight">"{act.dialogue}"</p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-12 border-t border-white/5">
                      <div className="space-y-6">
                        <div className="text-[10px] font-mono text-purple-500 uppercase font-black tracking-widest flex items-center gap-2">
                           <span className="w-1 h-1 rounded-full bg-purple-500" />
                           Logic Modules
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {act.math.map(m_math => (
                            <span key={m_math} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-[11px] md:text-sm text-gray-300 font-medium">
                              {m_math}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="text-[10px] font-mono text-purple-500 uppercase font-black tracking-widest flex items-center gap-2">
                           <span className="w-1 h-1 rounded-full bg-purple-500" />
                           Master Reference
                        </div>
                        <div className="space-y-2">
                          <div className="text-white font-black text-lg md:text-xl tracking-tight uppercase">{act.artists}</div>
                          <div className="text-[11px] md:text-sm text-gray-500 font-light italic leading-relaxed">{act.works}</div>
                        </div>
                      </div>
                   </div>
                </div>
              </m.div>

              <m.div 
                className="flex-1 w-full z-10"
                initial={{ opacity: 0, scale: 0.85, rotate: idx % 2 === 0 ? 8 : -8 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <div className="relative aspect-square md:aspect-[4/5] rounded-[60px] md:rounded-[100px] overflow-hidden group border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] bg-[#050505]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${act.gradient} opacity-10 group-hover:opacity-25 transition-opacity duration-1000`} />
                  
                  <div className="absolute inset-0 p-12 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                       <div className="font-mono text-[9px] text-white/40 space-y-2">
                          <div>[AUTH] SuperEgo_Creative_Node</div>
                          <div>[STATUS] RENDER_PIPELINE_STABLE</div>
                       </div>
                       <div className="text-white/60 text-2xl font-mono">{act.id}</div>
                    </div>

                    <div className="relative h-full flex items-center justify-center">
                       <m.div 
                         animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
                         transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                         className="text-7xl md:text-9xl drop-shadow-[0_0_60px_rgba(255,255,255,0.15)] grayscale group-hover:grayscale-0 transition-all duration-1000"
                       >
                         {act.icon}
                       </m.div>
                       <m.div variants={scanLineVariants} animate="animate" className="absolute left-0 right-0 h-[1.5px] bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20" />
                    </div>

                    <div className="flex justify-between items-end opacity-30 font-mono text-[9px] text-white">
                       <span>FPS: 60.0</span>
                       <span>SECURE_COMPUTE</span>
                    </div>
                  </div>

                  <m.div 
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="absolute bottom-8 left-8 right-8 p-8 md:p-10 bg-white/[0.03] backdrop-blur-3xl rounded-[40px] border border-white/10 border-t-white/20 shadow-2xl"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                      <div className="text-[10px] font-mono text-purple-400 uppercase font-black tracking-[0.5em]">Mission_Directive</div>
                    </div>
                    <p className="text-white font-black leading-snug text-base md:text-xl tracking-tight">{act.mission}</p>
                  </m.div>
                </div>
              </m.div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="mt-24 md:mt-56 mb-24 md:mb-56 text-center px-4 md:px-0">
        <m.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto p-12 md:p-32 bg-gradient-to-br from-purple-950/30 to-brand-dark border border-purple-500/10 rounded-[64px] md:rounded-[120px] backdrop-blur-3xl relative overflow-hidden group shadow-2xl"
        >
          <div className="relative z-10 space-y-12">
            <h3 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter">费曼学习法与艺术抽象</h3>
            <p className="text-gray-400 text-lg md:text-3xl leading-relaxed font-extralight max-w-5xl mx-auto italic">
              "我们不仅仅是在模拟艺术，我们是在 <span className="text-white font-normal">解构审美</span>。通过将流派的核心抽象为代码，你真正理解了什么是‘风格’。"
            </p>
          </div>
        </m.div>
      </section>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </PlanetLayout>
  );
};

export default ArtPlanet;
