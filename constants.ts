
import { Course, PhilosophyPillar, BlogPost } from './types';

interface ContentData {
  philosophyPillars: PhilosophyPillar[];
  courses: Course[];
  blogPosts: BlogPost[];
}

const CONTENT_ZH: ContentData = {
  philosophyPillars: [
    { title: '概率世界观', concept: 'Bayesian', practice: '告别标准答案，用贝叶斯更新认知' },
    { title: '数字系统 2', concept: 'System 2', practice: '构建理性的外挂慢思考大脑' },
    { title: '生成式仿真', concept: 'Simulation', practice: '用 LLM Agent 模拟社会博弈' },
    { title: '身份跃迁', concept: 'Orchestrator', practice: '从执行者进化为概率机器的指挥官' }
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
      title: "SuperEgo：AI 原生模型思维",
      shortTitle: "左脑：模型思维",
      organ: "THE LOGIC",
      organRole: "Reasoning / Simulation",
      tagline: "构建你的概率型与生成式第二大脑",
      description: "人类大脑有“快思考”（直觉），你需要构建一个“慢思考”（系统2）的数字替身。用贝叶斯更新认知，用 LLM Agent 仿真推演未来。",
      takeaway: "从寻找确定性到拥抱概率。用 AI 仿真作为你的思维显微镜。",
      icon: "🧬",
      color: "from-blue-500 to-indigo-700", 
      target: "渴望突破直觉偏差的决策者/研究者",
      format: "深度仿真与统计实战",
      duration: "8 周",
      outcome: "掌握贝叶斯推断与多智能体仿真 (LLM-Agent Simulation)，构建用于决策推演的“预言机”。",
      philosophyMap: {
        title: "系统 2 思维觉醒",
        points: ["直觉校准 (De-biasing)", "生成式仿真 (Generative Sim)", "概率世界观 (Bayesian)"]
      },
      syllabus: [
        {
          title: "模块 1：统计之眼 —— 降维打击与贝叶斯",
          goal: "从“直觉偏差”到“统计学世界观”。",
          content: [
            { title: "贝叶斯更新器 (Bayesian Updater)", description: "编写 Python 工具，输入先验与新证据，让 AI 帮你科学地更新世界观，打破直觉错误。" },
            { title: "降维打击 (PCA Agent)", description: "面对复杂数据，指挥 AI 进行主成分分析 (PCA)，从 100 个混乱变量中提取关键因子 (Signal)。" }
          ]
        },
        {
          title: "模块 2：博弈之心 —— 活策略与系统 2",
          goal: "战胜人性弱点，在博弈中寻找最优解。",
          content: [
            { title: "理性审查官 (Rational Check Agent)", description: "搭建专门“抬杠”的 AI。当你（系统1）冲动时，AI（系统2）列出 5 个反直觉概率理由阻拦你。" },
            { title: "博弈论模拟器", description: "模拟多人竞争场景（如拍卖、定价），让 AI 计算纳什均衡与混合策略支付矩阵。" }
          ]
        },
        {
          title: "模块 3：生成式社会 —— LLM Agent 动态仿真",
          goal: "从“静态方程”到“智能体涌现”。",
          content: [
            { title: "微型社会 (Mini-Society) 搭建", description: "定义 10 个拥有不同性格与记忆的 LLM Agents，构建虚拟村落或组织。" },
            { title: "涌现现象观察", description: "设计实验（如“突发财富”），观察 Agent 间的谣言传播、结盟与交易行为。" }
          ]
        },
        {
          title: "模块 4：复杂系统 —— 演化与适应",
          goal: "上帝视角，理解系统的生死。",
          content: [
            { title: "崎岖景观 (NK Model) 推演", description: "模拟创新与适应的本质，理解路径依赖与锁定效应。" },
            { title: "Capstone: SuperEgo 预言机", description: "选择现实复杂问题，结合 PCA 分析变量与 Agent 仿真推演，产出深度策略报告。" }
          ]
        }
      ]
    },
    {
      id: "art",
      title: "SuperEgo 洞察引擎：计算艺术史",
      shortTitle: "五官：洞察引擎",
      organ: "THE SENSES",
      organRole: "Insight / Perception",
      tagline: "跨学科思维训练 —— 成为智能时代的思想总导演",
      description: "本课程不培养单纯的“画师”或“码农”，而是培养穿透表象看本质的“洞察者”。通过“五维洞察模型”与“费曼导演法”，将艺术史、经济学与代码融合。",
      takeaway: "你必须把感性的艺术风格，“降维”成数学公式。你是导演，AI 是你的摄像师和特效师。",
      icon: "🎨",
      color: "from-violet-500 to-purple-900", 
      target: "渴望全息洞察力的未来思想家",
      format: "五维洞察 + 创意编程",
      duration: "四幕十六景",
      outcome: "建立“五维洞察模型”，掌握将人文历史转化为数学逻辑与 AI Prompt 的核心能力。",
      philosophyMap: {
        title: "费曼导演法 (Feynman Director)",
        points: ["以教促学：把洞察翻译给 AI", "数学抽象：寻找底层方程", "人机协同：总导演思维"]
      },
      syllabus: [
        {
          title: "第一幕：光的革命与观察变迁",
          goal: "工业文明如何重塑视觉？从客观记录到主观感知。",
          content: [
            { title: "莫奈与工业蒸汽", description: "五维洞察：管状颜料与中产崛起。数学：插值算法 (Lerp) 与布朗运动模拟光与雾。" },
            { title: "修拉的理性网格", description: "五维洞察：工业标准化的投影。数学：离散化与像素网格平均值算法。" }
          ]
        },
        {
          title: "第二幕：时空破碎与潜意识",
          goal: "相对论与精神分析如何粉碎绝对真理？",
          content: [
            { title: "梵高的流体动力学", description: "五维洞察：异化与存在主义。数学：向量场 (Vector Field) 与柏林噪声模拟星空湍流。" },
            { title: "毕加索的四维展开", description: "五维洞察：非洲面具与相对论。数学：矩阵变换与多视角纹理映射。" }
          ]
        },
        {
          title: "第三幕：理性乌托邦与梦境",
          goal: "在动荡中寻找秩序或逃避现实。",
          content: [
            { title: "蒙德里安的递归", description: "五维洞察：战后秩序重建。数学：递归函数与二叉树分割生成绝对平衡。" },
            { title: "达利的拓扑形变", description: "五维洞察：弗洛伊德梦境解析。数学：正弦波非线性映射实现时钟融化。" }
          ]
        },
        {
          title: "第四幕：行动、观念与算法",
          goal: "从“作品”转向“过程”与“观念”。",
          content: [
            { title: "波洛克的混沌分形", description: "五维洞察：冷战自由输出与行动绘画。数学：混沌理论与分形维数验证。" },
            { title: "沃霍尔的量化阵列", description: "五维洞察：消费主义与拟像。数学：数组循环与颜色量化 (Quantization)。" }
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
            { title: "AI Risk Guard", description: "基于实时市场情绪的动态仓位管理与熔断机制。" },
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
          title: "Module 1: The Eye of Statistics",
          goal: "From Intuitive Bias to Statistical Worldview.",
          content: [
            { title: "Bayesian Updater", description: "Build tools to scientifically update beliefs with priors and likelihoods, breaking intuition errors." },
            { title: "Dimensionality Reduction", description: "Use AI & PCA to extract key signals from chaotic, high-dimensional data." }
          ]
        },
        {
          title: "Module 2: The Heart of Game Theory",
          goal: "Overcoming human weakness via System 2.",
          content: [
            { title: "Rational Check Agent", description: "Build a 'Devil's Advocate' AI to block impulsive System 1 decisions with probability." },
            { title: "Game Theory Simulator", description: "Simulate multi-party competition (e.g. auctions) to find Nash Equilibrium." }
          ]
        },
        {
          title: "Module 3: Generative Society",
          goal: "From Static Equations to Emergent Agents.",
          content: [
            { title: "Mini-Society Construction", description: "Define 10 LLM Agents with distinct personas and memories to form a virtual group." },
            { title: "Emergence Observation", description: "Simulate scenarios (e.g., sudden wealth) to observe rumors, alliances, and trade." }
          ]
        },
        {
          title: "Module 4: Complex Systems",
          goal: "God mode: Understanding evolution and adaptation.",
          content: [
            { title: "NK Model Simulation", description: "Simulate the essence of innovation and adaptation; understand path dependence." },
            { title: "Capstone: SuperEgo Oracle", description: "Solve a real-world complex problem using PCA analysis and Agent Swarm simulation." }
          ]
        }
      ];
    } else if (course.id === 'art') {
      englishSyllabus = [
        {
          title: "Act 1: The Revolution of Light",
          goal: "From objective recording to subjective perception.",
          content: [
            { title: "Monet & Steam", description: "Insight: Industrial rise. Math: Interpolation & Brownian motion." },
            { title: "Seurat's Logic", description: "Insight: Standardization. Math: Discretization & Grid averaging." }
          ]
        },
        {
          title: "Act 2: Shattered Spacetime",
          goal: "How relativity and psychoanalysis broke absolute truth.",
          content: [
            { title: "Van Gogh's Flow", description: "Insight: Alienation. Math: Vector Fields & Perlin Noise." },
            { title: "Picasso's 4th Dim", description: "Insight: Relativity. Math: Matrix Transforms & Texture Mapping." }
          ]
        },
        {
          title: "Act 3: Rational Utopia & Dreams",
          goal: "Finding order or escaping reality in chaos.",
          content: [
            { title: "Mondrian's Recursion", description: "Insight: Reconstruction. Math: Recursive functions & Binary trees." },
            { title: "Dali's Topology", description: "Insight: Dream logic. Math: Sine wave non-linear mapping." }
          ]
        },
        {
          title: "Act 4: Action & Algorithms",
          goal: "From 'Work' to 'Process' and 'Concept'.",
          content: [
            { title: "Pollock's Chaos", description: "Insight: Cold War freedom. Math: Chaos Theory & Fractals." },
            { title: "Warhol's Array", description: "Insight: Consumerism. Math: Array Loops & Quantization." }
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
      title: course.id === 'data' ? "AI SuperEgo: Engineering Your Second Brain" : 
             (course.id === 'quant' ? "AI Quant: The Evolving Decision Machine" : 
             (course.id === 'sports' ? "AI Sports: Physical Perception" : 
             (course.id === 'digital-twin' ? "SuperEgo: AI Native Model Thinking" : 
             (course.id === 'art' ? "SuperEgo Insight Engine: Computational Art History" : course.shortTitle.split('：')[1])))),
      description: course.id === 'quant' ? "Build an automated research pipeline driven by Gemini 3. From paper analysis to profitable deployment." : 
                   (course.id === 'digital-twin' ? "Humans have 'Fast Thinking' (Intuition). You need to build a 'Slow Thinking' (System 2) digital double. Update cognition with Bayesian logic and simulate the future with LLM Agents." : 
                   (course.id === 'art' ? "We don't train painters; we train 'Insight Directors'. Using the '5-Dimension Insight Model', you'll fuse art history, economics, and code." : course.description)),
      takeaway: course.id === 'data' ? "Stop forgetting. Start orchestrating your intelligence legacy." :
                course.id === 'digital-twin' ? "From seeking certainty to embracing probability. Use AI simulation as your microscope for thinking." :
                course.id === 'art' ? "You must 'reduce' art to math. You are the Director; AI is your Camera and VFX crew." :
                course.id === 'sports' ? "Bridge the gap between digital vision and physical mastery." :
                course.id === 'solopreneur' ? "Don't just code. Orchestrate an AI army and build a 'Company of One'." :
                course.id === 'quant' ? "Turn 'Evolution' into an asset. Build a hedge fund that learns while you sleep." : course.takeaway,
      outcome: course.id === 'quant' 
        ? "A fully autonomous AI Hedge Fund factory with self-evolution capabilities." 
        : (course.id === 'sports' 
            ? "Develop a personalized AI coach providing real-time feedback on form, technique, posture correction, and rep counting." 
            : (course.id === 'digital-twin'
                ? "Master Bayesian Inference & LLM-Agent Simulation to build a 'SuperEgo Oracle' for decision making."
                : (course.id === 'art' 
                    ? "Build a '5-Dimension Insight Model' and master converting history into math logic and AI prompts." 
                    : course.outcome))),
      syllabus: englishSyllabus
    };
  })
};

export const getContent = (lang: 'en' | 'zh') => {
  return lang === 'en' ? CONTENT_EN : CONTENT_ZH;
};
