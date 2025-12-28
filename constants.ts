
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
      takeaway: "终结遗忘，开启主权认知进化。这是你数字生命的“总司令部”。",
      icon: "🧠",
      color: "from-amber-400 to-orange-600", 
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
      takeaway: "将混沌的世界复杂性，转化为你私有的确定性逻辑引擎。",
      icon: "🧬",
      color: "from-blue-500 to-indigo-700", 
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
      takeaway: "超越提示词咒语，亲手编写人类美学底层的数学代码。",
      icon: "🎨",
      color: "from-violet-500 to-purple-900", 
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
      takeaway: "打破数字视觉与物理掌控的边界，让 AI 成为你身体的 GPS。",
      icon: "🏃",
      color: "from-rose-500 to-red-700", 
      target: "物理执行模块",
      format: "软硬件结合",
      duration: "8 周",
      outcome: "开发专属的AI动作纠正教练，支持姿态实时校准与自动计数。",
      philosophyMap: {
        title: "物理 AI",
        points: ["边缘部署", "生物力学建模", "人机回环"]
      },
      syllabus: [
        {
          title: "模块 1：体育 AI 视觉基础",
          goal: "理解 AI 如何“看见”动作。",
          content: [
            { title: "骨骼关键点提取", description: "利用 MediaPipe 追踪人体 33 个核心关节，获取实时三维坐标。" },
            { title: "实时视频流处理", description: "掌握高帧率环境下的摄像头数据采集与前处理技术。" }
          ]
        },
        {
          title: "模块 2：动力学分析与生物力学",
          goal: "将身体运动转化为数学矢量。",
          content: [
            { title: "关节角度计算", description: "使用三角函数评估动作标准度，如深蹲时的膝关节夹角。" },
            { title: "运动轨迹映射", description: "可视化肢体在空间中的移动路径，识别动作的一致性。" }
          ]
        },
        {
          title: "模块 3：智能反馈系统构建",
          goal: "构建实时人机交互逻辑。",
          content: [
            { title: "姿态实时校正", description: "开发算法识别动作错误并提供即时预警（如圆背、膝盖内扣）。" },
            { title: "自动计数引擎", description: "利用状态机精准识别运动阶段并统计有效次数。" }
          ]
        },
        {
          title: "模块 4：专属 AI 教练 application 部署",
          goal: "交付一个具备实战价值的完整应用。",
          content: [
            { title: "多模态交互反馈", description: "实现针对用户的视觉渲染与语音实时纠错提醒。" },
            { title: "数据主权与训练历史", description: "将运动表现接入个人“第二大脑”，实现长期的数字化进步追踪。" }
          ]
        }
      ]
    },
    {
      id: "solopreneur",
      title: "超级个体：AI 孵化软件构建",
      shortTitle: "双手：创造",
      organ: "THE HANDS",
      organRole: "Creation / Tools",
      tagline: "不仅是编程，更是编排",
      description: "全栈开发流。你向 AI 提的需求清不清晰，是本课程的唯一考核标准。构建属于你的商业流水线。",
      takeaway: "不再是孤独的码农。像总导演一样编排 AI 军团，打造一人公司。",
      icon: "🚀",
      color: "from-cyan-400 to-blue-600", 
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
      tagline: "From Paper To Profit —— 构建自我进化的投研工厂",
      description: "跨越经验主义。构建由 Gemini 3 驱动的 Agent Swarm 系统，从解析顶级论文到回测优化，再到实盘部署的全链路自动化实战。",
      takeaway: "将“进化”作为你的资产。构建一个在你睡眠时自我迭代的对冲基金。",
      icon: "📈",
      color: "from-emerald-500 to-teal-800", 
      target: "风险决策与系统架构模块",
      format: "Agent Swarm 实战",
      duration: "12 周深度实战",
      outcome: "构建一套全自动的、具备自我杂交进化能力的 AI 投研工厂流水线。",
      philosophyMap: {
        title: "投研平权宣言",
        points: ["系统优于直觉", "代码即阿尔法", "Agent 军团化作战"]
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
    title: course.id === 'data' ? "AI SuperEgo: Engineering Your Second Brain" : (course.id === 'quant' ? "AI Quant: The Evolving Decision Machine" : (course.id === 'sports' ? "AI Sports: Physical Perception" : course.shortTitle.split('：')[1])),
    description: course.id === 'quant' ? "Build an automated research pipeline driven by Gemini 3. From paper analysis to profitable deployment." : course.description,
    takeaway: course.id === 'data' ? "Stop forgetting. Start orchestrating your intelligence legacy." :
              course.id === 'digital-twin' ? "Transform the world's chaos into your private deterministic logic engine." :
              course.id === 'art' ? "Transcend prompt magic. Code the mathematical foundation of human aesthetics." :
              course.id === 'sports' ? "Bridge the gap between digital vision and physical mastery." :
              course.id === 'solopreneur' ? "Don't just code. Orchestrate an AI army and build a 'Company of One'." :
              course.id === 'quant' ? "Turn 'Evolution' into an asset. Build a hedge fund that learns while you sleep." : course.takeaway,
    outcome: course.id === 'quant' 
      ? "A fully autonomous AI Hedge Fund factory with self-evolution capabilities." 
      : (course.id === 'sports' 
          ? "Develop a personalized AI coach providing real-time feedback on form, technique, posture correction, and rep counting." 
          : course.outcome),
    syllabus: course.id === 'sports' ? [
      {
        title: "Module 1: AI Vision Foundations for Sports",
        goal: "Understand how AI 'sees' and tracks human movement.",
        content: [
          { title: "Skeletal Keypoint Extraction", description: "Use MediaPipe to track 33 core body joints with real-time 3D coordinates." },
          { title: "Real-time Video Processing", description: "Master high-FPS camera data acquisition and preprocessing techniques." }
        ]
      },
      {
        title: "Module 2: Kinetic Analysis & Biomechanics",
        goal: "Translate physical movement into mathematical vectors.",
        content: [
          { title: "Joint Angle Calculation", description: "Use trigonometry to evaluate form accuracy, such as knee angles during squats." },
          { title: "Trajectory Mapping", description: "Visualize movement paths in space to identify form consistency." }
        ]
      },
      {
        title: "Module 3: Intelligent Feedback Systems",
        goal: "Build real-time human-AI interaction logic.",
        content: [
          { title: "Real-time Posture Correction", description: "Develop algorithms to detect form errors like rounded backs or knee valgus." },
          { title: "Auto-Rep Counting Engine", description: "Use state machines to identify exercise phases and accurately count repetitions." }
        ]
      },
      {
        title: "Module 4: Personal AI Coach Deployment",
        goal: "Deploy a fully functional, value-driven application.",
        content: [
          { title: "Multi-modal Interaction", description: "Implement real-time visual rendering and voice-over corrective feedback." },
          { title: "Digital Sovereignty & History", description: "Connect performance data to your 'Second Brain' for long-term progress tracking." }
        ]
      }
    ] : course.syllabus
  }))
};

export const getContent = (lang: 'en' | 'zh') => {
  return lang === 'en' ? CONTENT_EN : CONTENT_ZH;
};
