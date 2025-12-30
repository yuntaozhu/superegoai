
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
      syllabus: [
        {
          title: "模块 1：认知架构与外脑蓝图",
          goal: "设计你的数字神经系统。",
          content: [
            { title: "外脑架构设计", description: "基于 FTI (Capture, Organize, Distill, Express) 的数据流设计与蓝图绘制。" },
            { title: "知识图谱基础", description: "使用图数据库构建概念间的显性连接，奠定结构化记忆基础。" }
          ]
        },
        {
          title: "模块 2：守门人——高维信息摄取",
          goal: "过滤噪音，只留信号。",
          content: [
            { title: "自动化 ETL 管道", description: "构建从 RSS、Newsletter 到 Readwise 的自动抓取清洗流。" },
            { title: "AI 摘要与元数据", description: "使用 LLM 自动生成标签、摘要与显著性评分，实现智能归档。" }
          ]
        },
        {
          title: "模块 3：合成——知识蒸馏",
          goal: "将碎片信息转化为晶体知识。",
          content: [
            { title: "概念萃取", description: "从非结构化文本中提取核心模型与思维框架。" },
            { title: "合成数据生成", description: "利用 AI 生成高质量的问答对 (QA Pairs)，用于后续模型微调。" }
          ]
        },
        {
          title: "模块 4：先知——RAG 与检索增强",
          goal: "与你的第二大脑对话。",
          content: [
            { title: "向量数据库实战", description: "Qdrant/Pinecone 部署与语义检索策略优化。" },
            { title: "Chat-with-Brain", description: "构建基于私有知识库的问答助手，实现精准的知识调用。" }
          ]
        }
      ]
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
      syllabus: [
        {
          title: "模块 1：AI 驱动的数学建模",
          goal: "用 AI 重构问题求解流程。",
          content: [
            { title: "问题拆解与形式化", description: "利用 GPT-4 将模糊的商业/科研问题转化为精确的数学语言。" },
            { title: "Python 求解器集成", description: "自动生成并执行 NumPy/SciPy 代码，求解复杂方程与优化问题。" }
          ]
        },
        {
          title: "模块 2：构建科研 Agent",
          goal: "打造你的 24 小时科研助理。",
          content: [
            { title: "文献综述 Agent", description: "自动检索 Arxiv，生成带引用的深度综述报告，快速掌握领域前沿。" },
            { title: "数据清洗 Agent", description: "自动化处理脏数据，智能识别异常值与缺失值。" }
          ]
        },
        {
          title: "模块 3：多智能体仿真",
          goal: "模拟复杂系统演化。",
          content: [
            { title: "Agent Swarm 基础", description: "设计基于 LangGraph 的多智能体协作网络，实现角色扮演与博弈。" },
            { title: "社会/经济系统模拟", description: "在沙盒中模拟市场博弈或传染病传播，预测涌现现象。" }
          ]
        }
      ]
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
      syllabus: [
        {
          title: "模块 1：光的物理与数字重构",
          goal: "理解光，然后用代码创造光。",
          content: [
            { title: "色彩空间与算法", description: "深入理解 RGB vs HSL，编写 Shader 实现印象派光影效果。" },
            { title: "光线追踪入门", description: "理解渲染管线，用代码模拟光子行为，创造真实感视觉。" }
          ]
        },
        {
          title: "模块 2：风格迁移与美学计算",
          goal: "解构艺术流派的数学本质。",
          content: [
            { title: "神经风格迁移", description: "深入 CNN 中间层，提取内容与风格特征，实现任意风格的融合。" },
            { title: "生成式几何", description: "利用 Voronoi 与 Delaunay 算法重现立体主义结构。" }
          ]
        },
        {
          title: "模块 3：情感计算与生成",
          goal: "让机器理解并表达情绪。",
          content: [
            { title: "CLIP 模型微调", description: "建立文本描述与视觉美学的高维映射，精准控制生成调性。" },
            { title: "情感映射", description: "将音乐/诗歌的情感向量映射到视觉生成参数，实现通感创作。" }
          ]
        }
      ]
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
      syllabus: [
        {
          title: "模块 1：AI 时代的各种产品思维",
          goal: "从 Idea 到 PRD，一句话生成。",
          content: [
            { title: "需求挖掘与验证", description: "利用 Deep Research 分析市场痛点与竞品，寻找蓝海。" },
            { title: "PRD 自动生成", description: "将模糊想法转化为结构化的产品文档与用户故事。" }
          ]
        },
        {
          title: "模块 2：全栈开发自动化",
          goal: "没有代码基础也能做软件。",
          content: [
            { title: "Cursor + V0 实战", description: "自然语言生成 React 前端组件与页面，所见即所得。" },
            { title: "后端与数据库编排", description: "利用 Supabase 与 AI 生成后端逻辑与 API，快速打通全栈。" }
          ]
        },
        {
          title: "模块 3：增长与运营自动化",
          goal: "一人公司的营销军团。",
          content: [
            { title: "SEO 内容矩阵", description: "批量生成高质量、SEO 友好的博客与社媒内容，自动分发。" },
            { title: "自动化营销流", description: "构建邮件营销与用户触达的自动化工作流，实现睡后增长。" }
          ]
        }
      ]
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
      syllabus: [
        {
          title: "模块 1：金融数据工程",
          goal: "构建高质量的金融数据湖。",
          content: [
            { title: "多源数据摄取", description: "对接交易所 API、新闻源与链上数据，构建实时数据管道。" },
            { title: "特征工程自动化", description: "利用 AI 自动挖掘并计算技术因子，清洗噪音数据。" }
          ]
        },
        {
          title: "模块 2：策略挖掘与回测",
          goal: "从论文到代码的自动化。",
          content: [
            { title: "Paper-to-Code", description: "利用 Gemini 解析学术论文，自动生成可执行的策略代码。" },
            { title: "向量化回测引擎", description: "使用 VectorBT 进行高性能的策略历史回测与参数调优。" }
          ]
        },
        {
          title: "模块 3：风险控制与实盘",
          goal: "让 AI 掌管交易开关。",
          content: [
            { title: "AI 风险守卫", description: "基于实时市场情绪的动态仓位管理与熔断机制。" },
            { title: "实盘部署架构", description: "构建低延迟、高可靠的自动化交易系统，连接真实市场。" }
          ]
        }
      ]
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
  courses: CONTENT_ZH.courses.map(course => {
    let englishSyllabus = course.syllabus;

    if (course.id === 'data') {
      englishSyllabus = [
        {
          title: "Module 1: Cognitive Architecture & Blueprint",
          goal: "Design your digital nervous system.",
          content: [
            { title: "Exobrain Architecture", description: "Design FTI (Capture, Organize, Distill, Express) data flows." },
            { title: "Knowledge Graphs", description: "Build explicit connections between concepts using graph databases." }
          ]
        },
        {
          title: "Module 2: The Gatekeeper: Ingestion",
          goal: "Filter noise, keep only the signal.",
          content: [
            { title: "Automated ETL Pipelines", description: "Build auto-scraping flows from RSS/Newsletters to Readwise." },
            { title: "AI Summarization", description: "Auto-generate tags, summaries and saliency scores using LLMs." }
          ]
        },
        {
          title: "Module 3: Synthesis: Distillation",
          goal: "Turn fragments into crystalized knowledge.",
          content: [
            { title: "Concept Extraction", description: "Extract core models and mental frameworks from unstructured text." },
            { title: "Synthetic Data Gen", description: "Generate high-quality QA pairs for future fine-tuning." }
          ]
        },
        {
          title: "Module 4: The Oracle: RAG",
          goal: "Talk to your Second Brain.",
          content: [
            { title: "Vector Database", description: "Deploy Qdrant/Pinecone and optimize semantic search strategies." },
            { title: "Chat-with-Brain", description: "Build a QA assistant based on your private knowledge base." }
          ]
        }
      ];
    } else if (course.id === 'digital-twin') {
      englishSyllabus = [
        {
          title: "Module 1: AI-Driven Math Modeling",
          goal: "Reconstruct problem solving with AI.",
          content: [
            { title: "Decomposition & Formalization", description: "Translate vague problems into precise mathematical language using GPT-4." },
            { title: "Python Solver Integration", description: "Auto-generate and execute NumPy/SciPy code for complex equations." }
          ]
        },
        {
          title: "Module 2: Building Research Agents",
          goal: "Build your 24/7 Research Assistant.",
          content: [
            { title: "Literature Review Agent", description: "Auto-search Arxiv and generate deep review reports with citations." },
            { title: "Data Cleaning Agent", description: "Automate dirty data handling and anomaly detection." }
          ]
        },
        {
          title: "Module 3: Multi-Agent Simulation",
          goal: "Simulate complex system evolution.",
          content: [
            { title: "Agent Swarm Basics", description: "Design multi-agent collaboration networks based on LangGraph." },
            { title: "Social/Eco Simulation", description: "Simulate market games or disease spread in a sandbox." }
          ]
        }
      ];
    } else if (course.id === 'art') {
      englishSyllabus = [
        {
          title: "Module 1: Physics of Light & Digital Reconstruction",
          goal: "Understand light, then code light.",
          content: [
            { title: "Color Spaces & Algorithms", description: "Deep dive into RGB vs HSL, write Shaders for Impressionist lighting." },
            { title: "Ray Tracing Intro", description: "Understand rendering pipelines and simulate photon behavior via code." }
          ]
        },
        {
          title: "Module 2: Style Transfer & Computational Aesthetics",
          goal: "Deconstruct the math of art styles.",
          content: [
            { title: "Neural Style Transfer", description: "Extract content and style features from CNN layers for style fusion." },
            { title: "Generative Geometry", description: "Reproduce Cubist structures using Voronoi and Delaunay algorithms." }
          ]
        },
        {
          title: "Module 3: Affective Computing & Generation",
          goal: "Make machines understand and express emotion.",
          content: [
            { title: "CLIP Fine-tuning", description: "Map text descriptions to high-dimensional visual aesthetics." },
            { title: "Emotion Mapping", description: "Map emotional vectors from music/poetry to visual generation parameters." }
          ]
        }
      ];
    } else if (course.id === 'solopreneur') {
      englishSyllabus = [
        {
          title: "Module 1: AI Product Thinking",
          goal: "From Idea to PRD in one sentence.",
          content: [
            { title: "Requirement Mining", description: "Analyze market pain points and competitors using Deep Research." },
            { title: "Auto PRD Gen", description: "Transform vague ideas into structured product docs and user stories." }
          ]
        },
        {
          title: "Module 2: Full-Stack Automation",
          goal: "Build software without coding skills.",
          content: [
            { title: "Cursor + V0 Action", description: "Generate React frontend components and pages with natural language." },
            { title: "Backend Orchestration", description: "Generate backend logic and APIs using Supabase and AI." }
          ]
        },
        {
          title: "Module 3: Growth & Ops Automation",
          goal: "One-person marketing army.",
          content: [
            { title: "SEO Content Matrix", description: "Batch generate high-quality, SEO-friendly content and auto-distribute." },
            { title: "Auto Marketing Flows", description: "Build automated workflows for email marketing and user outreach." }
          ]
        }
      ];
    } else if (course.id === 'quant') {
      englishSyllabus = [
        {
          title: "Module 1: Financial Data Engineering",
          goal: "Build a high-quality financial data lake.",
          content: [
            { title: "Multi-source Ingestion", description: "Connect exchange APIs, news feeds, and on-chain data." },
            { title: "Auto Feature Engineering", description: "Use AI to mine technical factors and clean noisy data." }
          ]
        },
        {
          title: "Module 2: Strategy Mining & Backtesting",
          goal: "Automate Paper-to-Code.",
          content: [
            { title: "Paper-to-Code", description: "Parse academic papers with Gemini to auto-generate strategy code." },
            { title: "Vectorized Backtesting", description: "Use VectorBT for high-performance historical testing and tuning." }
          ]
        },
        {
          title: "Module 3: Risk Control & Live Trading",
          goal: "Let AI manage the trading switch.",
          content: [
            { title: "AI Risk Guard", description: "Dynamic position management based on real-time market sentiment." },
            { title: "Live Deployment Arch", description: "Build low-latency, high-reliability automated trading systems." }
          ]
        }
      ];
    } else if (course.id === 'sports') {
      englishSyllabus = [
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
      ];
    }

    return {
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
      syllabus: englishSyllabus
    };
  })
};

export const getContent = (lang: 'en' | 'zh') => {
  return lang === 'en' ? CONTENT_EN : CONTENT_ZH;
};
