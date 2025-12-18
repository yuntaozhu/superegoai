import { Course, PhilosophyPillar, BlogPost } from './types';

interface ContentData {
  philosophyPillars: PhilosophyPillar[];
  courses: Course[];
  blogPosts: BlogPost[];
}

const CONTENT_EN: ContentData = {
  philosophyPillars: [
    {
      title: "Cognitive Cornerstone: From Skill-Based to System-Based",
      concept: "Old View: You must learn every skill yourself. New View: Core competitiveness is 'System Building' and 'Asking Questions'. AI does the specific skills better.",
      practice: "Human defines the 'Why', AI solves the 'How'. Your task is to think 'What system do I want to build' and 'Why', not typing speed."
    },
    {
      title: "Asset Construction: Bio-Brain & ExtBrain",
      concept: "Solution: Acknowledge human limitations and build an 'External Brain'. Bio-brain for intuition/aesthetics; AI Second Brain for memory/execution.",
      practice: "Build a Personal Knowledge Base. Your AI assistant digests your ideas and code to become your unique digital twin."
    }
  ],
  blogPosts: [],
  courses: [
    {
      id: "art",
      title: "AI-Empowered Art History",
      shortTitle: "Planet A: Art",
      tagline: "Becoming the Director of Thought",
      description: "Reconstruct art movements and build a generative art gallery.",
      target: "Grades 4-9",
      duration: "8 Weeks",
      outcome: "Build a 'Generative Art Gallery' and cultivate interdisciplinary aesthetic intuition.",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      philosophyMap: { title: "", points: [] },
      syllabus: []
    },
    {
      id: "sports",
      title: "AI Physical Awakening",
      shortTitle: "Planet B: Sports",
      tagline: "Vision & Physicality",
      description: "Develop an AI pose correction coach using computer vision.",
      target: "Grades 7-12",
      duration: "12 Weeks",
      outcome: "Create an 'AI Action Coach' to analyze movement via computer vision.",
      icon: "🏃",
      color: "from-orange-500 to-red-500",
      philosophyMap: { title: "", points: [] },
      syllabus: []
    },
    {
      id: "data",
      title: "AI SuperEgo: Sovereign Second Brain",
      shortTitle: "Planet C: SuperEgo",
      tagline: "Build Your Digital Legion",
      description: "Create a private knowledge base and a decision-making digital twin.",
      target: "Lifelong Learners",
      duration: "4 Weeks",
      outcome: "A private vector knowledge base with a 'SuperEgo' decision twin.",
      icon: "🧠",
      color: "from-cyan-400 to-blue-500",
      philosophyMap: { title: "", points: [] },
      syllabus: []
    },
    {
      id: "quant",
      title: "AI-Native Quantitative Trading",
      shortTitle: "Planet D: Quant",
      tagline: "Evolutionary Decision Making",
      description: "Build a self-evolving multi-agent trading system.",
      target: "High School & Adults",
      duration: "16 Weeks",
      outcome: "Deployment of a multi-agent system with backtesting and live-ready logic.",
      icon: "📈",
      color: "from-yellow-400 to-amber-600",
      philosophyMap: { title: "", points: [] },
      syllabus: []
    },
    {
      id: "code",
      title: "AI Software Incubation: Super Individual",
      shortTitle: "Planet E: Code",
      tagline: "Don't just Code, Orchestrate",
      description: "Build commercial SaaS with zero coding foundations.",
      target: "Adult Entrepreneurs",
      duration: "10 Weeks",
      outcome: "Launch a commercial-grade SaaS from idea to cloud production.",
      icon: "🚀",
      color: "from-green-400 to-emerald-600",
      philosophyMap: { title: "", points: [] },
      syllabus: []
    },
    {
      id: "research",
      title: "AI-Driven Chief Scientist",
      shortTitle: "Planet F: Research",
      tagline: "Master Deep Research Agents",
      description: "Master high-level research tools for HiMCM and enterprise data analysis.",
      target: "HiMCM Students & Analysts",
      duration: "6-12 Weeks",
      outcome: "Build a Deep Research Agent for competition or enterprise-grade analytics.",
      icon: "🧬",
      color: "from-slate-300 to-indigo-500",
      philosophyMap: { title: "", points: [] },
      syllabus: []
    }
  ]
};

const CONTENT_ZH: ContentData = {
  philosophyPillars: [
    {
      title: "认知基石：从“技能本位”到“系统本位”",
      concept: "旧观念：必须自己学会所有技能。新理念：核心竞争力是“构建系统”和“提出问题”。",
      practice: "Human defines the 'Why', AI solves the 'How'。"
    }
  ],
  blogPosts: [],
  courses: [
    {
      id: "art",
      title: "AI 赋能艺术史",
      shortTitle: "艺术行星",
      tagline: "成为思想的总导演",
      description: "重现人类艺术流派，构建“生成式艺术画廊”，培养跨学科审美与数学直觉。",
      target: "小学高年级、初中生 (G4-G9)",
      duration: "8周",
      outcome: "重现人类艺术流派，构建“生成式艺术画廊”，培养跨学科审美与数学直觉。",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      philosophyMap: { title: "", points: [] },
      syllabus: []
    },
    {
      id: "sports",
      title: "AI 体能觉醒",
      shortTitle: "运动行星",
      tagline: "视觉与物理的探测器",
      description: "开发“AI动作纠正教练”，通过计算机视觉分析运动姿态，增强对AI的物理世界认知。",
      target: "初中、高中生 (G7-G12)",
      duration: "12周",
      outcome: "开发“AI动作纠正教练”，通过计算机视觉分析运动姿态，增强对AI的物理世界认知。",
      icon: "🏃",
      color: "from-orange-500 to-red-500",
      philosophyMap: { title: "", points: [] },
      syllabus: []
    },
    {
      id: "data",
      title: "AI SuperEgo：构建主权第二大脑",
      shortTitle: "超我行星",
      tagline: "构建你的数字军团",
      description: "打造私有向量知识库，构建能主动决策、具备“超我”意识的数字分身。",
      target: "终身学习者、知识工作者",
      duration: "4周",
      outcome: "打造私有向量知识库，构建能主动决策、具备“超我”意识的数字分身。",
      icon: "🧠",
      color: "from-cyan-400 to-blue-500",
      philosophyMap: { title: "", points: [] },
      syllabus: []
    },
    {
      id: "quant",
      title: "AI 驱动的原生量化交易",
      shortTitle: "量化行星",
      tagline: "进化的决策核心",
      description: "构建自我进化的多智能体交易系统，完成策略回测与实盘部署。",
      target: "高中生、成人",
      duration: "16周",
      outcome: "构建自我进化的多智能体交易系统，完成策略回测与实盘部署。",
      icon: "📈",
      color: "from-yellow-400 to-amber-600",
      philosophyMap: { title: "", points: [] },
      syllabus: []
    },
    {
      id: "code",
      title: "AI 孵化软件：构建超级个体",
      shortTitle: "代码行星",
      tagline: "不仅是编程，更是编排",
      description: "0代码基础也能开发商业级SaaS软件，实现从创意到上线的全流程闭环。",
      target: "高中、大学、成人创业者",
      duration: "10周",
      outcome: "0代码基础也能开发商业级SaaS软件，实现从创意到上线的全流程闭环。",
      icon: "🚀",
      color: "from-green-400 to-emerald-600",
      philosophyMap: { title: "", points: [] },
      syllabus: []
    },
    {
      id: "research",
      title: "AI 驱动的首席科学家",
      shortTitle: "科研行星",
      tagline: "掌握深度的科研智能体",
      description: "掌握Deep Research Agent，获得HiMCM竞赛奖项，或构建企业级数据分析引擎。",
      target: "高中生、成人 (数据分析)",
      duration: "6-12周",
      outcome: "掌握Deep Research Agent，获得HiMCM竞赛奖项，或构建企业级数据分析引擎。",
      icon: "🧬",
      color: "from-slate-300 to-indigo-500",
      philosophyMap: { title: "", points: [] },
      syllabus: []
    }
  ]
};

export const getContent = (lang: 'en' | 'zh') => {
  return lang === 'en' ? CONTENT_EN : CONTENT_ZH;
};