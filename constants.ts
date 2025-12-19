
import { Course, PhilosophyPillar, BlogPost } from './types';

interface ContentData {
  philosophyPillars: PhilosophyPillar[];
  courses: Course[];
  blogPosts: BlogPost[];
}

const CONTENT_ZH: ContentData = {
  philosophyPillars: [
    { title: '认知基石', concept: '系统本位', practice: '构建超我控制中枢' },
    { title: '资产构建', concept: '数字分身', practice: 'FTI 架构数据闭环' },
    { title: '身份转变', concept: '总导演', practice: '编排而非执行' },
    { title: '工作流革命', concept: '一人公司', practice: '多智能体协同' }
  ],
  blogPosts: [
    {
      id: "1",
      title: "从执行到编排：AI 时代的认知跨越",
      excerpt: "在这个 AGI 的前夜，最核心的竞争力不再是你会多少门编程语言，而是你如何构建一个能够理解并执行复杂逻辑的系统。",
      content: `<h2>认知基石的重塑</h2><p>传统的技能本位正在向系统本位转移。在过去，掌握一门技术需要数年的深耕，而现在，AI 正在将这些技能商品化。作为一个“超我”架构师，你的任务不再是手动编写每一个循环，而是定义系统的边界、逻辑和目标。</p><blockquote>“Human defines the 'Why', AI solves the 'How'.”</blockquote>`,
      date: "2024-05-20",
      author: "朱云涛",
      tags: ["AI", "哲学", "认知"]
    }
  ],
  courses: [
    {
      id: "art",
      title: "艺术行星：AI 赋能艺术史",
      shortTitle: "行星 A：艺术",
      tagline: "成为思想的总导演",
      description: "训练“超我”的审美与抽象能力。AI 不只是画图工具，而是将“历史文脉”转化为“数学逻辑”的翻译官。",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      target: "小学高年级、初中阶段",
      format: "项目制学习",
      duration: "8 周",
      outcome: "掌握AI辅助审美，重现历史流派，完成个人数字艺术画廊。",
      philosophyMap: {
        title: "费曼学习法实现",
        points: [
          "以教促学：利用 AI 解释艺术概念",
          "回顾与反思：通过失败的 Prompt 寻找知识断层",
          "简化与内化：用代码抽象艺术流派核心"
        ]
      },
      syllabus: [
        {
          title: "第一阶段：光的革命",
          goal: "从客观观察到主观感受",
          content: [
            { title: "莫奈与北斋的对话", description: "用 AI 融合印象派与浮世绘风格，理解色彩插值。" },
            { title: "P5.js 基础：绘制光影", description: "学习变量、循环，用代码模拟自然光线的衰减。" }
          ]
        },
        {
          title: "第二阶段：点彩派的逻辑",
          goal: "科学方法构建秩序感",
          content: [
            { title: "乔治·修拉的实验", description: "理解离散化与像素化，用网格重绘世界。" },
            { title: "算法重构：网格平均色", description: "编写嵌套循环，计算色块平均值实现点彩效果。" }
          ]
        },
        {
          title: "第三阶段：情感的旋涡",
          goal: "主观真实高于客观现实",
          content: [
            { title: "梵高的星夜风场", description: "分析动态笔触，理解柏林噪声在艺术中的应用。" },
            { title: "向量场实战", description: "构建不可见流场，让粒子随“风”舞动生成艺术。" }
          ]
        }
      ]
    },
    {
      id: "sports",
      title: "运动行星：AI 体能觉醒",
      shortTitle: "行星 B：运动",
      tagline: "视觉与物理的探测器",
      description: "训练“超我”的物理感知。构建一个“AI 私人教练”，在现实世界中分析并纠正动作。",
      icon: "🏃",
      color: "from-orange-500 to-red-500",
      target: "初中、高中阶段 (热爱运动者)",
      format: "软硬件结合 + 户外实践",
      duration: "8 周",
      outcome: "能够利用CV视觉分析运动姿态，开发专属的AI动作纠正教练。",
      philosophyMap: {
        title: "安全与物理 AI",
        points: [
          "边缘部署：在移动设备实现实时反馈",
          "生物力学建模：将人体关节转化为数学矢量",
          "人机回环：AI 建议与人类感官的校准"
        ]
      },
      syllabus: [
        {
          title: "第一阶段：AI 视觉启蒙",
          goal: "让电脑“看懂”身体",
          content: [
            { title: "关键点检测原理", description: "提取 33 个身体地标坐标，理解 (x, y, z) 坐标系。" },
            { title: "Python 环境搭建", description: "配置 MediaPipe 与 OpenCV，实现实时摄像头采集。" }
          ]
        },
        {
          title: "第二阶段：动力学建模",
          goal: "提取运动性能指标",
          content: [
            { title: "三角函数计算夹角", description: "利用向量夹角公式计算深蹲角度、肘部弯曲度。" },
            { title: "状态机逻辑控制", description: "编写逻辑判断动作的起始与结束，实现自动计数。" }
          ]
        },
        {
          title: "第三阶段：智能纠错系统",
          goal: "构建反馈闭环",
          content: [
            { title: "生物力学阈值设定", description: "定义“正确”动作的阈值区间，检测代偿动作。" },
            { title: "多模态反馈设计", description: "实现语音提醒与视觉叠加，打造一体化终端应用。" }
          ]
        }
      ]
    },
    {
      id: "data",
      title: "AI SuperEgo：构建主权第二大脑",
      shortTitle: "行星 C：超我",
      tagline: "打造你的数字军团",
      description: "本课程参考顶级 MLOps 架构，将企业级的 RAG 技术翻译为个人知识系统的构建法则。",
      icon: "🧠",
      color: "from-yellow-400 to-amber-500",
      target: "终身学习者、知识工作者",
      format: "核心架构课",
      duration: "4 周",
      outcome: "建立私有向量数据库，打造具备RAG能力的AI参谋长，实现知识自动化。",
      philosophyMap: {
        title: "主权定义",
        points: [
          "数据主权：私有向量数据库存储记忆",
          "模型主权：不依赖单一供应商的编排架构",
          "创造主权：将思想转化为全媒体资产"
        ]
      },
      syllabus: [
        {
          title: "第一阶段：构建地基",
          goal: "FTI 架构搭建",
          content: [
            { title: "向量化记忆原理", description: "理解 Embedding，将非结构化笔记转化为高维矢量。" },
            { title: "私有数据库部署", description: "搭建 Vector DB，建立个人数据的“主权仓库”。" }
          ]
        },
        {
          title: "第二阶段：神经检索",
          goal: "实现毫秒级知识调用",
          content: [
            { title: "混合检索策略", description: "结合关键词与语义，实现超越搜索的“联想式检索”。" },
            { title: "RAG 管道调优", description: "优化 Prompt 链，让 AI 拒绝幻觉，只基于事实回答。" }
          ]
        },
        {
          title: "第三阶段：智能体编排",
          goal: "从检索到行动",
          content: [
            { title: "多智能体协同 (Dify)", description: "构建调研、整理、创作的一站式 Agent 工作流。" },
            { title: "自动化反馈循环", description: "建立 RLHF 闭环，通过人工反馈让大脑不断进化。" }
          ]
        }
      ]
    },
    {
      id: "quant",
      title: "量化行星：AI 驱动的原生量化交易",
      shortTitle: "行星 D：量化",
      tagline: "进化的决策核心",
      description: "我们不写算法，我们构建能够自我进化的多智能体。利用 Gemini 3 的长窗口能力深度阅读金融研报。",
      icon: "📈",
      color: "from-emerald-400 to-cyan-600",
      target: "高中生、成年人",
      format: "实战模拟 + Python进阶",
      duration: "12 周",
      outcome: "构建自我进化的AI交易Agent，完成策略回测与实盘模拟。",
      philosophyMap: {
        title: "进化机制",
        points: [
          "策略基因库：将代码片段向量化",
          "Critic Agent：基于逻辑而非网格搜索进行调优",
          "反脆弱系统：建立 AI 风控熔断机制"
        ]
      },
      syllabus: [
        {
          title: "第一阶段：Alpha 捕捉",
          goal: "多模态投研基座",
          content: [
            { title: "研报阅读 Agent", description: "利用长窗口 AI 提取研报因子，解析 K 线图表特征。" },
            { title: "策略文档生成", description: "将人类语言的投资逻辑转化为严谨的伪代码文档。" }
          ]
        },
        {
          title: "第二阶段：回测竞技场",
          goal: "双智能体对抗调优",
          content: [
            { title: "回测执行 Agent", description: "利用 VectorBT 实现高速回测，输出多维风险报告。" },
            { title: "优化器 Agent", description: "基于推理能力进行参数调优，对话直至 Sharpe > 2.0。" }
          ]
        }
      ]
    },
    {
      id: "solopreneur",
      title: "代码行星：AI 孵化软件构建超级个体",
      shortTitle: "行星 E：代码",
      tagline: "不仅是编程，更是编排",
      description: "不培养程序员，只培养“产品缔造者”。你向 AI 提的需求清不清晰，是本课程的唯一考核标准。",
      icon: "🚀",
      color: "from-cyan-400 to-blue-600",
      target: "高中、大学、成人创业者",
      format: "商业落地实战",
      duration: "10 周",
      outcome: "从0到1构建SaaS产品，掌握全栈AI开发流，成为独立开发者 (Solopreneur)。",
      philosophyMap: {
        title: "CEO 指挥逻辑",
        points: [
          "零语法政策：严禁手动编写冗余循环",
          "视觉先行：利用 V0 驱动前端审美",
          "自愈系统：训练 AI 自动修复 Bug"
        ]
      },
      syllabus: [
        {
          title: "第一阶段：环境觉醒",
          goal: "建立人机协作感",
          content: [
            { title: "Cursor 深度应用", description: "掌握自然语言编程，通过编排而非编写实现功能。" },
            { title: "架构蓝图绘制", description: "利用 AI 将产品需求拆解为技术规格书 (Spec)。" }
          ]
        },
        {
          title: "第二阶段：MVP 快速开发",
          goal: "从 0 到 1 上线",
          content: [
            { title: "V0.dev 前端快速成型", description: "通过截图与描述快速生成高质量 UI 组件。" },
            { title: "后端逻辑自动化", description: "利用 AI 快速集成数据库、身份验证与支付网关。" }
          ]
        }
      ]
    },
    {
      id: "digital-twin",
      title: "科研行星：AI 驱动的首席科学家",
      shortTitle: "行星 F：科研",
      tagline: "打造会思考、会模拟的科研系统",
      description: "不仅仅是编程课，而是构建“私人科研中台”。通过建模 approach 真实世界，辅助高阶学术研究。",
      icon: "🧬",
      color: "from-indigo-400 to-violet-600",
      target: "高中生 (HiMCM 竞赛)、成年人",
      format: "竞赛辅导 / 深度研究",
      duration: "6-8 周",
      outcome: "掌握Deep Research Agent构建，辅助完成顶级数学建模竞赛或深度行业研报。",
      philosophyMap: {
        title: "科研闭环",
        points: [
          "费曼日志：强制用通俗语言解释科学模型",
          "参数扫描：分析变量的非线性影响",
          "Agent Swarm：多智能体协作完成综述"
        ]
      },
      syllabus: [
        {
          title: "第一阶段：数字神经元",
          goal: "搭建科研日志系统",
          content: [
            { title: "自动化文献捕获", description: "通过 API 自动监控 Arxiv，提取核心创新点。" },
            { title: "模型抽象实战", description: "利用 AI 驱动求解器处理复杂微分方程与数值模拟。" }
          ]
        }
      ]
    }
  ]
};

export const getContent = (lang: 'en' | 'zh') => {
  return CONTENT_ZH;
};
