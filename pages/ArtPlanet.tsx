import React from 'react';
import PlanetLayout from '../components/PlanetLayout';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

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
      icon: '🌊'
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
      icon: '🔳'
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
      icon: '✨'
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
      mission: '引入 d3-delaunay 库，编写着色算法根据块面朝向应用冷暖色调。',
      gradient: 'from-orange-500 to-red-600',
      icon: '📐'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* Immersive Vision Section */}
      <section className="mt-16 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-purple-500"></span>
              <span className="text-purple-400 font-mono text-xs uppercase tracking-widest">Aesthetic OS</span>
            </div>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-tight">
              训练“超我”的 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">审美与抽象能力</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              在艺术行星，AI 不再是简单的画图工具，而是将 <span className="text-white font-bold">“历史文脉”</span> 转化为 <span className="text-white font-bold">“数学逻辑”</span> 的翻译官。你将作为总导演，编排人类艺术史上最伟大的瞬间。
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Prompt Design', val: '85%' },
              { label: 'Logic Coding', val: '92%' },
              { label: 'Art Context', val: '78%' },
              { label: 'Creative Swarm', val: 'Active' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md"
              >
                <div className="text-[10px] font-mono text-gray-500 uppercase mb-2">{stat.label}</div>
                <div className="text-2xl font-black text-white">{stat.val}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Acts Timeline */}
      <section className="py-20">
        <div className="space-y-32">
          {acts.map((act, idx) => (
            <motion.div 
              key={act.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
            >
              <div className="flex-1 space-y-8">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${act.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                    {act.icon}
                  </div>
                  <div className="font-mono text-sm text-gray-500">ACT_{act.id}</div>
                </div>
                
                <h3 className="text-4xl font-black text-white tracking-tighter uppercase">{act.title}</h3>
                <p className="text-purple-400 font-bold italic">{act.subtitle}</p>
                
                <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 space-y-6">
                  <div>
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">导演指令 // Director Prompt</div>
                    <p className="text-gray-300 text-lg leading-relaxed">"{act.dialogue}"</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                    <div>
                      <div className="text-[10px] font-mono text-purple-500 uppercase mb-2">数学模块</div>
                      <div className="flex flex-wrap gap-2">
                        {act.math.map(m => (
                          <span key={m} className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-[10px] text-purple-300">{m}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-purple-500 uppercase mb-2">艺术家</div>
                      <div className="text-white font-bold text-sm">{act.artists}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="relative aspect-video rounded-[48px] overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${act.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="w-64 h-64 border-2 border-white/5 rounded-full border-dashed"
                    />
                    <div className="absolute text-8xl grayscale group-hover:grayscale-0 transition-all duration-700">
                      {act.icon}
                    </div>
                  </div>
                  <div className="absolute bottom-10 left-10 right-10 p-8 bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-xs font-mono text-purple-400 uppercase mb-2">实战任务</div>
                    <p className="text-white font-bold leading-relaxed">{act.mission}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="mt-40 mb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto p-20 bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-[64px] backdrop-blur-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter">费曼学习法与艺术抽象</h3>
            <p className="text-gray-300 text-xl leading-relaxed font-light mb-12 italic">
              "我们不仅仅是在模拟艺术，我们是在解构审美。通过将流派的核心抽象为代码，你真正理解了什么是‘风格’。"
            </p>
            <div className="flex justify-center gap-12">
              <div className="text-center">
                <div className="text-purple-400 font-black text-2xl mb-1">100+</div>
                <div className="text-xs text-gray-500 uppercase font-mono">Masterpieces Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-black text-2xl mb-1">20+</div>
                <div className="text-xs text-gray-500 uppercase font-mono">Algorithms Created</div>
              </div>
            </div>
          </div>
          {/* Decorative SVG Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </motion.div>
      </section>
    </PlanetLayout>
  );
};

export default ArtPlanet;