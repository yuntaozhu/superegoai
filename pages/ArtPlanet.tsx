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
      gradient: 'from-blue-400 to-orange-400'
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
      gradient: 'from-green-400 to-yellow-400'
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
      gradient: 'from-blue-600 to-purple-600'
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
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* Vision & Philosophy Section */}
      <section className="mt-16 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
              <span className="w-8 h-1 bg-purple-500"></span>
              课程愿景与哲学
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              告别“历史->数学->编程”的线性知识传递，拥抱一个
              <span className="text-purple-400 font-bold">“历史理解 -> AI 美学对话 -> 数学抽象 -> 人机协同编程”</span>
              的螺旋式上升创造闭环。
            </p>
            <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-xl">
              <h4 className="text-purple-400 font-mono text-xs uppercase tracking-widest mb-4">导演角色定义</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                你不再是埋头苦干的“独立工程师”，而是站在思想高地，调度全局的“总导演”。集洞察、品味、严谨于一身。
              </p>
            </div>
          </motion.div>

          {/* Feynman Workflow Component */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-brand-surface border border-white/10 rounded-[40px] p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-purple-500 opacity-40">WORKFLOW: FEYNMAN_METHOD</div>
            <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tight">费曼学习法：总导演的方法论</h3>
            <div className="space-y-6">
              {[
                { title: '以教促学 (Teach to Learn)', desc: '通过精准指令（Prompt）“教”会 AI 你的艺术理解。' },
                { title: '回顾与反思 (Review & Reflect)', desc: '在 AI “卡壳”时寻找历史理解与数学抽象的缺口。' },
                { title: '简化与内化 (Simplify & Internalize)', desc: '设计最优雅的模型来体现艺术流派的核心思想。' }
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xs font-bold text-purple-400">
                    {i + 1}
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-sm mb-1">{step.title}</h5>
                    <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Four Acts - Detailed Roadmap */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-purple-500/50 via-white/10 to-transparent hidden lg:block" />
        
        <div className="space-y-32">
          {acts.map((act, index) => (
            <motion.div 
              key={act.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Act Number Bubble */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-brand-dark border-2 border-purple-500 rounded-full flex items-center justify-center z-20 hidden lg:flex">
                <span className="text-white font-black">{act.id}</span>
              </div>

              {/* Content Card */}
              <div className="flex-1 w-full">
                <div className={`p-10 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-purple-500/50 transition-all duration-500`}>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-[10px] font-mono px-3 py-1 rounded-full bg-gradient-to-r ${act.gradient} text-white font-bold uppercase`}>
                      {act.artists}
                    </span>
                    <span className="text-gray-600 font-mono text-xs">{act.id} // ACT</span>
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">{act.title}</h3>
                  <p className="text-purple-400 text-sm font-bold mb-6 italic">{act.subtitle}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 border-t border-white/5 pt-8">
                    <div>
                      <h4 className="text-xs font-mono text-gray-500 uppercase mb-4 tracking-widest">历史与哲学</h4>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">{act.philosophy}</p>
                      <div className="p-4 bg-black/20 rounded-xl border border-white/5 italic text-xs text-gray-400">
                        "代表作：{act.works}"
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-gray-500 uppercase mb-4 tracking-widest">美学对话</h4>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">对话 AI：{act.dialogue}</p>
                      <div className="space-y-2">
                        <div className="text-[10px] text-gray-500 font-mono">数学建模模块:</div>
                        <div className="flex flex-wrap gap-2">
                          {act.math.map((m, i) => (
                            <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-purple-300">{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive/Visual Representation Side */}
              <div className="flex-1 w-full space-y-6">
                <div className={`relative aspect-square md:aspect-video rounded-[40px] bg-gradient-to-br ${act.gradient} opacity-20 flex items-center justify-center overflow-hidden border border-white/10`}>
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                  <div className="relative z-10 text-6xl opacity-50 filter grayscale group-hover:grayscale-0 transition-all duration-700">
                    {index === 0 && '🌀'}
                    {index === 1 && '🔳'}
                    {index === 2 && '✨'}
                    {index === 3 && '📐'}
                  </div>
                  {/* Decorative Elements based on index */}
                  {index === 2 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-1 bg-white/20 animate-pulse rotate-12" />
                      <div className="w-full h-1 bg-white/20 animate-pulse -rotate-12" />
                    </div>
                  )}
                </div>
                
                <div className="p-8 bg-brand-surface border border-white/10 rounded-[32px] shadow-xl">
                  <h4 className="text-xs font-mono text-purple-500 uppercase mb-4 tracking-widest">总导演任务：人机协同编程</h4>
                  <p className="text-white text-md font-bold leading-relaxed">
                    {act.mission}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tools & Tech Stack */}
      <section className="mt-32 pt-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-black text-white mb-12 uppercase tracking-tight">核心技术栈与工具箱</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'p5.js', role: '视觉渲染' },
              { name: 'p5.sound', role: '交互听觉' },
              { name: 'd3-delaunay', role: '计算几何' },
              { name: 'Gemini / Claude', role: '美学总参谋' }
            ].map((tech, i) => (
              <div key={tech.name} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-white font-black mb-1">{tech.name}</div>
                <div className="text-[10px] font-mono text-gray-500 uppercase">{tech.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-32 py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/30 rounded-[64px] p-12 text-center backdrop-blur-xl">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">准备好开启你的“创意探索之旅”了吗？</h2>
          <p className="text-gray-300 mb-10 text-lg font-light">
            掌握 AI 时代的全新心智模式，从今天开始，不再做孤立的技能学习者。
          </p>
          <button className="px-12 py-6 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl transition-all">
            立即加入艺术行星
          </button>
        </div>
      </section>
    </PlanetLayout>
  );
};

export default ArtPlanet;