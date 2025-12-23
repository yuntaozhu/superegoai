
import { Course, PhilosophyPillar, BlogPost } from './types';

interface ContentData {
  philosophyPillars: PhilosophyPillar[];
  courses: Course[];
  blogPosts: BlogPost[];
}

const CONTENT_ZH: ContentData = {
  philosophyPillars: [
    { title: '能力平权', concept: '认知公平', practice: '构建 Exobrain 抹平经验差距' },
    { title: '资产构建', concept: '数字分身', practice: 'FTI 架构数据闭环' },
    { title: '身份转变', concept: '总导演', practice: '编排而非执行' },
    { title: '工作流革命', concept: '一人公司', practice: '多智能体协同' }
  ],
  blogPosts: [],
  courses: [
    {
      id: "data",
      title: "AI SuperEgo: Engineering Your Second Brain",
      shortTitle: "核心：第二外脑",
      organ: "THE CORE",
      organRole: "Engineering Your Second Brain",
      tagline: "构建第二外脑 —— 基于 Decoding AI 架构与认知神经科学的全栈实战",
      description: "跨越生物大脑局限，通过构建 FTI 架构的数字外脑，实现专家级的决策与进化能力。经验不再是限制，代码质量与思维深度才是。",
      icon: "🧠",
      color: "from-[#FFD700] to-[#B8860B]", // Gold
      target: "渴望获得超凡认知力的超级个体",
      format: "Decoding AI 全栈实战",
      duration: "12 周深度研习",
      outcome: "构建一套可伴随终身进化、具备元认知监控的私有第二外脑系统。",
      philosophyMap: {
        title: "能力平权宣言",
        points: ["工具即大脑延伸", "打破算法投喂", "主权思维自动化"]
      },
      syllabus: []
    },
    {
      id: "digital-twin",
      title: "数据建模：AI 驱动的逻辑核心",
      shortTitle: "左脑：数据",
      organ: "THE LOGIC",
      organRole: "Reasoning / Abstraction",
      tagline: "理性驱动的建模引擎",
      description: "将复杂世界抽象为数学模型。不仅仅是编程，而是构建能够模拟真实世界的逻辑中台。",
      icon: "🧬",
      color: "from-[#00BFFF] to-[#1E90FF]", // Electric Blue
      target: "逻辑思维模块",
      format: "深度研究",
      duration: "6-8 周",
      outcome: "掌握Deep Research Agent构建，辅助完成顶级数学建模。",
      philosophyMap: {
        title: "科研闭环",
        points: ["费曼日志", "参数扫描", "Agent Swarm"]
      },
      syllabus: []
    },
    {
      id: "art",
      title: "深度研究：AI 赋能的洞察力",
      shortTitle: "五官：感知",
      organ: "THE SENSES",
      organRole: "Input / Insight",
      tagline: "全方位的信息传感器",
      description: "训练审美与抽象能力。AI 不只是画图工具，而是将历史文脉转化为数学逻辑的翻译官。",
      icon: "🎨",
      color: "from-[#8A2BE2] to-[#4B0082]", // Violet
      target: "审美与感知模块",
      format: "项目制学习",
      duration: "8 周",
      outcome: "掌握AI辅助审美，重现历史流派，完成个人数字艺术画廊。",
      philosophyMap: {
        title: "费曼学习法实现",
        points: ["以教促学", "回顾与反思", "简化与内化"]
      },
      syllabus: []
    },
    {
      id: "sports",
      title: "体能觉醒：AI 物理感知",
      shortTitle: "躯干：感知",
      organ: "THE BODY",
      organRole: "Perception / Health",
      tagline: "视觉与物理的探测器",
      description: "构建一个“AI 私人教练”，在现实世界中分析并纠正动作，将人体关节转化为数学矢量。",
      icon: "🏃",
      color: "from-[#FF4500] to-[#FF0000]", // Vital Orange
      target: "物理执行模块",
      format: "软硬件结合",
      duration: "8 周",
      outcome: "开发专属的AI动作纠正教练。",
      philosophyMap: {
        title: "物理 AI",
        points: ["边缘部署", "生物力学建模", "人机回环"]
      },
      syllabus: []
    },
    {
      id: "solopreneur",
      title: "超级个体：AI 孵化软件构建",
      shortTitle: "双手：创造",
      organ: "THE HANDS",
      organRole: "Creation / Tools",
      tagline: "不仅是编程，更是编排",
      description: "全栈开发流。你向 AI 提的需求清不清晰，是本课程的唯一考核标准。构建属于你的商业流水线。",
      icon: "🚀",
      color: "from-[#00FFFF] to-[#008B8B]", // Cyan
      target: "工具创造模块",
      format: "商业落地实战",
      duration: "10 周",
      outcome: "从0到1构建SaaS产品，掌握全栈AI开发流。",
      philosophyMap: {
        title: "CEO 指挥逻辑",
        points: ["零语法政策", "视觉先行", "自愈系统"]
      },
      syllabus: []
    },
    {
      id: "quant",
      title: "量化交易：AI 驱动的决策核心",
      shortTitle: "意志：决策",
      organ: "THE WILL",
      organRole: "Decision / Risk",
      tagline: "进化的决策核心",
      description: "我们不写算法，我们构建能够自我进化的多智能体。在风险与概率中锻造钢铁般的意志。",
      icon: "📈",
      color: "from-[#2E8B57] to-[#006400]", // Matrix Green
      target: "风险决策模块",
      format: "实战模拟",
      duration: "12 周",
      outcome: "构建自我进化的AI交易Agent。",
      philosophyMap: {
        title: "进化机制",
        points: ["策略基因库", "Critic Agent", "反脆弱系统"]
      },
      syllabus: []
    }
  ]
};

const CONTENT_EN: ContentData = {
  philosophyPillars: [
    { title: 'Cognitive Equity', concept: 'AI Sovereignty', practice: 'Building Exobrain to Bridge Experience Gaps' },
    { title: 'Asset Building', concept: 'Digital Twin', practice: 'FTI Data Feedback Loop' },
    { title: 'Identity Shift', concept: 'Director General', practice: 'Orchestrating, Not Executing' },
    { title: 'Workflow Revolution', concept: 'Solopreneur', practice: 'Multi-Agent Collaboration' }
  ],
  blogPosts: [],
  courses: CONTENT_ZH.courses.map(course => ({
    ...course,
    title: course.id === 'data' ? "AI SuperEgo: Engineering Your Second Brain" : course.shortTitle.split('：')[1],
    description: course.id === 'data' ? "A full-stack implementation based on Decoding AI architecture and Cognitive Neuroscience. Build your own Second Brain." : "Master the architecture of AI orchestration and build your unique Second Brain assets.",
    outcome: "Build a persistent, self-evolving Second Brain system with metacognitive monitoring."
  }))
};

export const getContent = (lang: 'en' | 'zh') => {
  return lang === 'en' ? CONTENT_EN : CONTENT_ZH;
};
