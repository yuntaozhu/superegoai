
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

  const fiveDimensions = [
    { label: 'Visual', question: '视网膜看到了什么？' },
    { label: 'Historical', question: '那个时代发生了什么大事件？' },
    { label: 'Economic', question: '谁在为艺术买单？' },
    { label: 'Philosophical', question: '如何定义真实与自我？' },
    { label: 'Mathematical', question: '底层逻辑方程是什么？' }
  ];

  const acts = [
    {
      id: '01',
      title: '第一幕：光的革命与观察变迁',
      period: '19世纪末 (19th Late)',
      theme: '工业文明如何重塑视觉？从客观记录到主观感知。',
      content: [
        {
          artist: '莫奈 (Monet)',
          work: '《印象·日出》/《圣拉扎尔火车站》',
          insight: '经济：管状颜料工业化。历史：蒸汽机改变时空观。哲学：现象学萌芽（我感知到的光）。',
          promptStrategy: '强调“视觉感知”而非“物体细节”。描述工业蒸汽与自然光线的交织。(Key: Hazy, Atmospheric, Industrial steam)',
          math: ['插值算法 (Lerp)', '布朗运动 (Brownian Motion)'],
          task: '编写粒子系统模拟蒸汽扩散；利用 lerpColor() 随鼠标改变色温（清晨至正午）。'
        },
        {
          artist: '修拉 (Seurat)',
          work: '《大碗岛的星期天下午》',
          insight: '经济：工业化大生产标准化思维。哲学：实证主义与理性秩序。',
          promptStrategy: '命令 AI 像印刷机一样思考。用“点”作为最小单位，构建静态秩序。(Key: Pointillism, optical mixing, distinct dots)',
          math: ['离散化 (Discretization)', '网格平均值 (Grid Average)'],
          task: '编写嵌套循环，将上传照片“像素化”为无数圆点，重现工业时代的理性美。'
        }
      ],
      gradient: 'from-blue-400 to-orange-400',
      icon: '🌅'
    },
    {
      id: '02',
      title: '第二幕：时空的破碎与潜意识',
      period: '20世纪初 (20th Early)',
      theme: '相对论与精神分析如何粉碎了旧世界的绝对真理？',
      content: [
        {
          artist: '梵高 (Van Gogh)',
          work: '《星夜》',
          insight: '社会：现代性加速带来的异化。心理：精神分析投射。',
          promptStrategy: '注入强烈的动能与情感。描述扭曲的线条，将焦虑外化为宇宙湍流。(Key: Impasto, swirling energy, turbulence)',
          math: ['向量场 (Vector Field)', '柏林噪声 (Perlin Noise)'],
          task: '利用 Perlin Noise 构建不可见流动场，驱动粒子描绘“流动的星空”。'
        },
        {
          artist: '毕加索 (Picasso)',
          work: '《亚维农的少女》',
          insight: '历史：殖民贸易带来非洲面具。科学：相对论（四维时空展开）。',
          promptStrategy: '多视角并置。指示 AI 同时画出正面和侧面，碎片化重组。(Key: Multiple viewpoints, fragmentation, 4th dimension)',
          math: ['矩阵变换 (Matrix)', '纹理映射 (Texture Mapping)'],
          task: '定义 Fragment 类，将人像分割并允许在 3D 空间中独立旋转重组。'
        }
      ],
      gradient: 'from-indigo-500 to-purple-600',
      icon: '🌌'
    },
    {
      id: '03',
      title: '第三幕：理性的乌托邦与梦境',
      period: '两次世界大战之间 (Interwar)',
      theme: '在动荡中寻找秩序（理性）或逃避现实（超现实）。',
      content: [
        {
          artist: '蒙德里安 (Mondrian)',
          work: '《构图》',
          insight: '历史：战后废墟重建秩序。哲学：新柏拉图主义（终极真理）。',
          promptStrategy: '极简主义指令。限制 AI 仅使用红黄蓝三原色和黑白线。(Key: Universal harmony, primary colors, strict grid)',
          math: ['递归 (Recursion)', '二叉树分割 (Binary Tree)'],
          task: '编写递归函数随机分割矩形，设定阈值并填充三原色，生成绝对平衡网格。'
        },
        {
          artist: '达利 (Dali)',
          work: '《记忆的永恒》',
          insight: '心理：弗洛伊德潜意识。物理：爱因斯坦相对论（时间软化）。',
          promptStrategy: '逻辑悖论。描述物理法则失效的场景（硬的变软），写实描绘荒诞。(Key: Melting clocks, dream logic, hyper-realistic)',
          math: ['拓扑形变 (Topology)', '正弦波映射 (Sine Mapping)'],
          task: '应用 sin() 函数对时钟 Y 轴坐标进行非线性映射，实现“融化”效果。'
        }
      ],
      gradient: 'from-red-500 to-yellow-500',
      icon: '🕰️'
    },
    {
      id: '04',
      title: '第四幕：行动、观念与算法',
      period: '二战后至今 (Post-WWII)',
      theme: '从关注“作品”转向关注“过程”与“观念”。',
      content: [
        {
          artist: '波洛克 (Pollock)',
          work: '《第一号》',
          insight: '政治：冷战自由价值观输出。哲学：行动绘画（过程即艺术）。',
          promptStrategy: '描述过程而非结果。描述混乱、能量、滴洒的动作。(Key: Action painting, controlled chaos, drip technique)',
          math: ['混沌理论 (Chaos)', '分形维数 (Fractal)'],
          task: '引入物理引擎 (Matter.js) 编写滴画模拟器，验证分形特征。'
        },
        {
          artist: '沃霍尔 (Warhol)',
          work: '《金宝汤罐头》',
          insight: '经济：消费主义与量产。哲学：拟像理论（没有原本，只有复制）。',
          promptStrategy: '复制与重复。描述超市货架般的排列，消除个性。(Key: Pop art, mass production, repetition)',
          math: ['数组 (Arrays)', '颜色量化 (Quantization)'],
          task: '编写算法进行“色调分离”，生成 3x3 九宫格波普肖像。'
        }
      ],
      gradient: 'from-pink-500 to-rose-600',
      icon: '🥫'
    }
  ];

  return (
    <PlanetLayout course={course}>
      {/* 1. Intro Section */}
      <section className="mt-8 md:mt-20 mb-16 md:mb-32 px-4 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <m.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="h-0.5 w-12 bg-purple-500"></span>
              <span className="text-purple-400 font-mono text-xs uppercase tracking-[0.4em] font-black">SuperEgo_Insight_Engine</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
              计算艺术史：<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
                成为智能时代的思想总导演
              </span>
            </h2>
            
            <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
              我们不培养单纯的“画师”或“码农”，而是培养能够穿透表象看本质的 <span className="text-white font-bold">“洞察者”</span>。你必须把感性的艺术风格“降维”成数学公式，指挥 AI 完成创作。
            </p>
          </m.div>

          {/* 5-Dimension Model Card */}
          <m.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-surface/60 border border-white/10 rounded-[32px] p-8 md:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 text-6xl">👁️</div>
            <h3 className="text-xl font-black text-white mb-6 uppercase tracking-widest">五维洞察模型</h3>
            <div className="space-y-4">
              {fiveDimensions.map((dim, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-xs font-mono text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-300 uppercase tracking-wider">{dim.label}</div>
                    <div className="text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors">{dim.question}</div>
                  </div>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </section>

      {/* 2. The 4 Acts Timeline */}
      <section className="py-20 md:py-32 px-4 md:px-0 relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
        
        <div className="space-y-24 md:space-y-40">
          {acts.map((act, idx) => (
            <div key={act.id} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-20 relative`}>
              
              {/* Timeline Marker (Desktop) */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 flex-col items-center">
                <div className={`w-12 h-12 rounded-full bg-brand-dark border-4 border-brand-surface flex items-center justify-center text-xl z-10 shadow-[0_0_20px_rgba(168,85,247,0.5)]`}>
                  {act.icon}
                </div>
                <div className="h-full w-px bg-gradient-to-b from-purple-500/50 to-transparent" />
              </div>

              {/* Content Block */}
              <m.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} mb-8`}>
                  <span className="text-purple-500 font-mono text-xs uppercase tracking-widest font-bold mb-2">{act.period}</span>
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4">{act.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base font-light max-w-md italic border-l-2 md:border-l-0 md:border-r-2 border-purple-500/30 pl-4 md:pl-0 md:pr-4">
                    "{act.theme}"
                  </p>
                </div>

                <div className="space-y-6">
                  {act.content.map((item, i) => (
                    <div key={i} className="bg-brand-surface/40 border border-white/10 rounded-[24px] p-6 hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden group">
                      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${act.gradient}`} />
                      
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-white font-bold text-lg">{item.artist}</h4>
                          <span className="text-xs text-gray-500 italic">{item.work}</span>
                        </div>
                        <div className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded">Case {i+1}</div>
                      </div>

                      <div className="space-y-4">
                        <div className="text-xs text-gray-300 leading-relaxed">
                          <strong className="text-purple-400 block mb-1">五维洞察 (Why)：</strong> 
                          {item.insight}
                        </div>
                        
                        {/* New Prompt Strategy Section */}
                        <div className="p-3 bg-purple-500/5 border border-purple-500/10 rounded-xl">
                           <strong className="text-purple-300 text-xs block mb-1 flex items-center gap-2">
                             <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></span>
                             AI Prompt 策略 (How to Say)
                           </strong>
                           <p className="text-[11px] text-gray-300 leading-relaxed font-mono">
                             {item.promptStrategy}
                           </p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {item.math.map((m, k) => (
                            <span key={k} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[10px] text-gray-400 font-mono">
                              {m}
                            </span>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-white/5">
                          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            AI 总导演任务 (How to Do)
                          </div>
                          <p className="text-xs text-white font-medium">{item.task}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>

              {/* Empty Spacer for alternating layout */}
              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Feynman Method Callout */}
      <section className="mt-20 md:mt-40 mb-20 md:mb-40 px-4 md:px-0 text-center">
        <m.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-10 md:p-20 bg-gradient-to-b from-purple-900/20 to-brand-dark border border-purple-500/20 rounded-[48px] relative overflow-hidden"
        >
          <div className="relative z-10 space-y-8">
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">费曼导演法 (The Feynman Director)</h3>
            <p className="text-gray-300 text-lg leading-relaxed font-light">
              "你必须把你的五维洞察，翻译成 AI 能听懂的 Prompt。你必须把感性的艺术风格，‘降维’成数学公式。你是导演，AI 是你的摄像师和特效师。"
            </p>
            <div className="inline-flex gap-4">
              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300 uppercase tracking-widest">以教促学</span>
              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300 uppercase tracking-widest">数学抽象</span>
              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300 uppercase tracking-widest">人机协同</span>
            </div>
          </div>
        </m.div>
      </section>
    </PlanetLayout>
  );
};

export default ArtPlanet;
