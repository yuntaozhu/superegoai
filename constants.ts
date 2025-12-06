import { Course, PhilosophyPillar } from './types';

interface ContentData {
  philosophyPillars: PhilosophyPillar[];
  courses: Course[];
}

const CONTENT_EN: ContentData = {
  philosophyPillars: [
    {
      title: "From Writing to Orchestrating",
      concept: "We don't teach how to hand-write every for-loop. We teach how to design Agentic Workflows.",
      practice: "Learn to configure 'Researcher', 'Coder', and 'Reviewer' Agents to collaborate."
    },
    {
      title: "Verification > Generation",
      concept: "AI generating code is cheap; ensuring it is correct and safe is expensive.",
      practice: "Focus on AI Testing & Security. How to design test cases to prevent AI hallucinations."
    },
    {
      title: "System 2 Thinking",
      concept: "Don't let AI just do 'Fast Thinking' (autocomplete), force 'Slow Thinking' (reasoning/planning).",
      practice: "Visualize Chain-of-Thought (CoT) and Reasoning processes."
    },
    {
      title: "Human-in-the-Loop",
      concept: "The 'SuperEgo' must hold the ultimate 'Kill Switch'.",
      practice: "Design human intervention interfaces for critical decisions (trading, posture correction)."
    }
  ],
  courses: [
    {
      id: "art",
      title: "AI Computational Art History",
      shortTitle: "Planet A: Art",
      tagline: "Becoming the Director of Thought",
      description: "Train the SuperEgo's aesthetic and abstract reasoning. AI is not just a tool, but a catalyst for thought. Move from 'History -> Math -> Code' in a creative loop.",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      philosophyMap: {
        title: "The Feynman Technique Implementation",
        points: [
          "Teach to Learn: Prompt AI to teach you art concepts, exposing your own blind spots.",
          "Review & Reflect: When AI fails, return to history and math to find the knowledge gap.",
          "Simplify & Internalize: Design elegant 'models' that capture the core of an art movement."
        ]
      },
      syllabus: [
        {
          title: "Act 1: The Revolution of Light (Late 19th Century)",
          goal: "From objective observation to subjective feeling.",
          content: [
            { title: "Monet & Hokusai", description: "East meets West. Use AI to blend Impressionism with Ukiyo-e. Math: Lerp & Golden Spirals." },
            { title: "Seurat & Pointillism", description: "The science of dots. Algorithm: Discretization & Pixelation." },
            { title: "Van Gogh", description: "Emotion in flow. Math: Vector Fields & Perlin Noise." },
            { title: "Cézanne", description: "Geometric abstraction. Math: Voronoi Diagrams & Triangulation." }
          ]
        },
        {
          title: "Act 2: Cry of Emotion (Early 20th Century)",
          goal: "Liberating form and color.",
          content: [
            { title: "Munch's The Scream", description: "Visualizing psychological pain. Math: Geometric distortion & Audio-reactive waves." },
            { title: "Matisse & Fauvism", description: "Liberating color. Math: Finite State Machines for color cycles." },
            { title: "Picasso & Cubism", description: "Deconstructing perspective. Math: Multi-view projection & OOP." },
            { title: "Kandinsky", description: "Visual Music. Math: FFT (Fast Fourier Transform) & Data Mapping." }
          ]
        },
        {
          title: "Act 3: Order vs. Dream (Interwar Period)",
          goal: "Rational geometry vs. Subconscious surrealism.",
          content: [
            { title: "Mondrian", description: "Universal harmony. Math: Recursion & Fractals." },
            { title: "Bauhaus", description: "Form follows function. Math: Modular design & Constraints." },
            { title: "Dali", description: "Melting time. Math: Sinusoidal vertex manipulation." },
            { title: "Magritte", description: "The Treachery of Images. Math: Meta-programming & Glitch Art." }
          ]
        },
        {
          title: "Act 4: Victory of Concept (Post-War to Now)",
          goal: "Process over product.",
          content: [
            { title: "Pollock", description: "Action Painting. Math: Particle Physics (Matter.js) & Chaos." },
            { title: "Escher", description: "Impossible worlds. Math: 3D Projection tricks & Logic paradoxes." },
            { title: "Sol LeWitt", description: "The algorithm is the art. Math: Generative instructions." },
            { title: "Andy Warhol", description: "Mass reproduction. Math: Image processing thresholds & Arrays." }
          ]
        }
      ]
    },
    {
      id: "sports",
      title: "AI Smart Sports & Perception",
      shortTitle: "Planet B: Sports",
      tagline: "Vision & Physicality",
      description: "Train the SuperEgo's physical perception and safety boundaries. Build an 'AI Personal Trainer' that sees, analyzes, and corrects movement in the real world.",
      icon: "🏃",
      color: "from-green-400 to-cyan-500",
      philosophyMap: {
        title: "Safety & Physical AI",
        points: [
          "Fail-Safe Mechanisms: If AI misjudges a squat, how do we ensure no injury? Strict confidence thresholds.",
          "Edge Deployment: Running models on local devices for real-time feedback.",
          "Human-in-the-Loop: AI suggests, Human verifies."
        ]
      },
      syllabus: [
        {
          title: "Module 1: AI Vision Enlightenment (Weeks 1-8)",
          goal: "Understand Computer Vision basics & Static Analysis.",
          content: [
            { title: "Python & OpenCV", description: "Environment setup, image processing basics, drawing on images." },
            { title: "Body Landmarks", description: "Understanding joints and coordinates. Manual tagging vs. Automation." },
            { title: "MediaPipe Integration", description: "Extracting 33 body keypoints. Building a Static Pose Analyzer." },
            { title: "YOLO Object Detection", description: "Distinguishing humans from equipment (balls, weights)." }
          ]
        },
        {
          title: "Module 2: App Development & Data Analysis (Weeks 9-16)",
          goal: "Dynamic Video Analysis & Metrics.",
          content: [
            { title: "Real-time Video Processing", description: "Frame-by-frame analysis with OpenCV." },
            { title: "Angle Calculation", description: "Vector math to calculate knee/elbow angles." },
            { title: "Rep Counting Logic", description: "State machines for detecting completed movements." },
            { title: "Data Visualization", description: "Using Matplotlib to chart movement consistency and depth." }
          ]
        },
        {
          title: "Module 3: Smart Coach & Personal Growth (Weeks 17-24)",
          goal: "Biomechanics & Feedback Systems.",
          content: [
            { title: "Biomechanics Rules", description: "Coding 'Knee Valgus' detection and other safety checks." },
            { title: "Feedback Engine", description: "Generating text/visual cues for correction." },
            { title: "AI Training Plan", description: "Generating weekly plans based on detected weaknesses." },
            { title: "Final Project", description: "AI Personal Trainer V1.0 - Desktop App with GUI." }
          ]
        }
      ]
    },
    {
      id: "data",
      title: "AI Data Insight & Logic",
      shortTitle: "Planet C: Data",
      tagline: "Deep Reasoning & Explanation",
      description: "Train the SuperEgo's causal reasoning. Connect perception to decision. It's not just about charts; it's about the 'Why' behind the data.",
      icon: "📊",
      color: "from-yellow-400 to-orange-500",
      philosophyMap: {
        title: "Scientific Modeling & Research",
        points: [
          "Deep Research Agent: Automating the collection, cleaning, and modeling of messy real-world data.",
          "Causal Reasoning: Moving beyond correlation. Why did X happen?",
          "ExtBrain Integration: Building a personal knowledge base."
        ]
      },
      syllabus: [
        {
          title: "Track A: Research & Math Modeling",
          goal: "First-principles modeling of complex systems.",
          content: [
            { title: "Python Modeling & Simulation", description: "Based on 'ModSimPy'. System dynamics and simulation." },
            { title: "The 'ExtBrain' Project", description: "Building a personalized AI Research Assistant." },
            { title: "Literature Review Agent", description: "Automated summarization and trend extraction from papers." },
            { title: "Model Analysis Agent", description: "Identifying key parameters and generating insights." }
          ]
        },
        {
          title: "Data Logic Core",
          goal: "Bridging the gap between raw data and actionable strategy.",
          content: [
            { title: "Code Interpreter Advanced", description: "Conversational data mining with Pandas Agents." },
            { title: "Optimization & Simulation", description: "Exploring parameter spaces to find optimal solutions." },
            { title: "The Feynman Output", description: "Forcing the AI to explain complex models in simple terms." }
          ]
        }
      ]
    },
    {
      id: "quant",
      title: "AI Native Quantitative Trading",
      shortTitle: "Planet D: Quant",
      tagline: "Decision & Evolution",
      description: "Train the SuperEgo's decision making and anti-fragility. We don't write algos; we build Agents that breed algos.",
      icon: "📈",
      color: "from-blue-500 to-indigo-600",
      philosophyMap: {
        title: "The Philosophy Mapping",
        points: [
          "Phase I: Knowledge to Code (Alpha Discovery) - Like a Researcher reading papers.",
          "Phase II: The Arena (Backtest & Tune) - Coder vs. Reviewer Agents.",
          "Phase III: Evolution (Self-Learning) - Storing failure in vector DB to avoid repeating mistakes."
        ]
      },
      syllabus: [
        {
          title: "Module 1: The New Paradigm",
          goal: "Agentic Quant Infrastructure.",
          content: [
            { title: "AI Native vs Assisted", description: "Moving from Copilot to Autonomous Agents." },
            { title: "Gemini 3 Core", description: "1M+ Context Window for reading documentation. Multimodal vision for reading charts." },
            { title: "Tech Stack", description: "LangGraph (Orchestration), Google Vertex AI SDK, Backtrader/VectorBT." }
          ]
        },
        {
          title: "Module 2: Knowledge to Code (The Researcher)",
          goal: "Unstructured Data to Structured Code.",
          content: [
            { title: "Visual Reading", description: "Extracting math formulas (Black-Scholes) from PDFs using Vision." },
            { title: "Cross-Reference", description: "Reading 50+ reports to find common Alpha factors." },
            { title: "Strategy Transpiler", description: "Chain-of-Thought prompting to convert logic to Backtrader code." }
          ]
        },
        {
          title: "Module 3: The Arena (Reasoning over Optimization)",
          goal: "Logic-based optimization, not Grid Search.",
          content: [
            { title: "Coder & Critic", description: "Dual Agent Game. Coder builds, Critic reviews equity curves (Visual)." },
            { title: "Debugging with Reasoning", description: "Root Cause Analysis of tracebacks." },
            { title: "Dynamic Parameters", description: "Inferring parameters based on VIX rather than brute force." }
          ]
        },
        {
          title: "Module 4: Evolution (Self-Learning)",
          goal: "Long-term memory and evolutionary mechanisms.",
          content: [
            { title: "Strategy Gene Pool", description: "Vectorizing successful snippets into ChromaDB." },
            { title: "Evolutionary Algorithms", description: "Using LLM as the Mutation Operator to rewrite logic." },
            { title: "Failure as Asset", description: "Recording overfitting examples to prevent recurrence." }
          ]
        },
        {
          title: "Module 5: Deployment & Risk",
          goal: "The Safety Net.",
          content: [
            { title: "The Risk Officer Agent", description: "Independent monitoring system to cut power on anomalies." },
            { title: "Human-in-the-Loop", description: "Streamlit dashboard for human approval of key signals." },
            { title: "Capstone: AlphaZero for Trading", description: "End-to-end system: News -> Strategy -> Backtest -> Report." }
          ]
        }
      ]
    },
    {
      id: "solopreneur",
      title: "The AI First Solopreneur",
      shortTitle: "Planet E: Solopreneur",
      tagline: "Build Your First SaaS from Scratch",
      description: "Designed for non-technical creators. We don't train programmers; we train 'Product Builders'. Your coding team is right in your chat window.",
      icon: "🚀",
      color: "from-red-500 to-amber-500",
      philosophyMap: {
        title: "The Course Manifesto",
        points: [
          "New World: You only need to define the problem and have good taste. Launch a SaaS in 10 weeks.",
          "Core Promise: Become a 'SuperEgo'—a CEO who understands tech boundaries and orchestrates an AI army.",
          "No Syntax Policy: Hand-writing complex code is forbidden. You are graded on how clear your prompts are."
        ]
      },
      syllabus: [
        {
          title: "Phase 1: Cognitive Awakening & Setup (Week 1-2)",
          goal: "Break the fear of code. Treat AI as a senior engineer.",
          content: [
            { title: "Week 1: Hello, SuperEgo", description: "Why 'Natural Language Programming'? Install Cursor. Generate a personal site with one prompt." },
            { title: "Week 2: The Product Manager Agent", description: "Writing PRDs. Using Deep Research Agents for competitor analysis. Generating DB schemas." }
          ]
        },
        {
          title: "Phase 2: Visuals First & Prototyping (Week 3-4)",
          goal: "Aesthetics driven development. WYSIWYG.",
          content: [
            { title: "Week 3: Visual Engineering", description: "Using v0.dev. Component thinking: 'Make this button a reusable component'." },
            { title: "Week 4: The Frontend Logic", description: "Making it move. Cursor practice: 'Pop up a confetti animation on click'." }
          ]
        },
        {
          title: "Phase 3: Soul & Data Connection (Week 5-7)",
          goal: "Full stack integration. Connecting the pipes.",
          content: [
            { title: "Week 5: The Backend Agent", description: "Supabase intro. SQL is Natural Language. 'Allow users to read only their own data'." },
            { title: "Week 6: Wiring it Together", description: "CRUD operations. The most important skill: AI Debugging & Self-Correction." },
            { title: "Week 7: The Reviewer Mindset", description: "Testing & Security. Asking AI to play the hacker and fix vulnerabilities." }
          ]
        },
        {
          title: "Phase 4: Commercialization & Launch (Week 8-10)",
          goal: "From software to product.",
          content: [
            { title: "Week 8: Monetization", description: "Stripe integration. Reading docs with AI. 'Show this page only to paid users'." },
            { title: "Week 9: Launch & Growth Agents", description: "SEO Automation. Scripting Social Bots for Twitter/RedNote updates." },
            { title: "Week 10: Demo Day", description: "Launch day. Building your 'ExtBrain Knowledge Base' for the next product." }
          ]
        }
      ]
    }
  ]
};

const CONTENT_ZH: ContentData = {
  philosophyPillars: [
    {
      title: "从“编写”到“编排”",
      concept: "理念：我们不教如何手写每一个 for 循环。我们教如何设计智能体工作流 (Agentic Workflows)。",
      practice: "实践：学习如何配置“Researcher”、“Coder”和“Reviewer”智能体进行分工与协作。"
    },
    {
      title: "验证 > 生成",
      concept: "理念：AI 生成代码是廉价的，保证代码正确且安全是昂贵的。",
      practice: "实践：关注 AI 测试与安全。如何设计测试用例来防止 AI “胡说八道”。"
    },
    {
      title: "系统级思考 (System 2 Thinking)",
      concept: "理念：不要让 AI 只做“快思考”（代码补全），要强制它做“慢思考”（推理/规划）。",
      practice: "实践：可视化思维链 (Chain-of-Thought) 和推理过程。"
    },
    {
      title: "人机回环 (Human-in-the-Loop)",
      concept: "理念：“超我”必须握有最终的“熔断权”。",
      practice: "实践：在关键决策（如实盘交易、姿态纠正）中，设计人类介入的接口。"
    }
  ],
  courses: [
    {
      id: "art",
      title: "AI 赋能的计算艺术史",
      shortTitle: "行星 A: 艺术",
      tagline: "成为思想的总导演",
      description: "训练“超我”的审美与抽象能力。AI 不只是画图工具，而是将“历史文脉”转化为“数学逻辑”的翻译官。实现从“历史理解 -> AI 美学对话 -> 数学抽象 -> 人机协同编程”的闭环。",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      philosophyMap: {
        title: "费曼学习法的体现",
        points: [
          "以教促学 (Teach to Learn): 向 AI 下达精准指令，AI 的反馈将暴露你的知识盲区。",
          "回顾与反思 (Review & Reflect): 当 AI 创作失败，回到历史和数学寻找缺口。",
          "简化与内化 (Simplify & Internalize): 设计优雅的“模型”来体现艺术流派的核心思想。"
        ]
      },
      syllabus: [
        {
          title: "第一幕：光的革命与东方回响 (19 世纪末)",
          goal: "从客观观察到主观感受。",
          content: [
            { title: "莫奈 & 北斋", description: "东西方交响。用 AI 融合印象派与浮世绘。数学：Lerp 插值与黄金螺旋。" },
            { title: "修拉 & 点彩画派", description: "点的科学。算法：离散化与像素化。" },
            { title: "梵高", description: "流动的星夜。数学：向量场与柏林噪声 (Perlin Noise)。" },
            { title: "塞尚", description: "几何化抽象。数学：泰森多边形 (Voronoi) 与三角剖分。" }
          ]
        },
        {
          title: "第二幕：情感的呐喊与形式的解放 (20 世纪初)",
          goal: "解放色彩与形式。",
          content: [
            { title: "蒙克《呐喊》", description: "心理痛苦的视觉化。数学：非欧几何扭曲与声波映射。" },
            { title: "马蒂斯 & 野兽派", description: "生命的舞蹈。数学：有限状态机与周期函数。" },
            { title: "毕加索 & 立体主义", description: "解构透视。数学：多视角投影与面向对象思维。" },
            { title: "康定斯基", description: "视觉音乐。数学：FFT (快速傅里叶变换) 与数据映射。" }
          ]
        },
        {
          title: "第三幕：理性的秩序与潜意识的梦境 (两次世界大战之间)",
          goal: "理性几何 vs 潜意识超现实。",
          content: [
            { title: "蒙德里安", description: "宇宙的和谐。数学：递归算法与分形。" },
            { title: "包豪斯", description: "形式追随功能。数学：模块化设计与网格约束。" },
            { title: "达利", description: "融化的时间。数学：正弦顶点变形与参数化建模。" },
            { title: "马格利特", description: "图像的背叛。数学：元编程与故障艺术 (Glitch Art)。" }
          ]
        },
        {
          title: "第四幕：行动的艺术与观念的胜利 (二战后至今)",
          goal: "过程重于结果。",
          content: [
            { title: "波洛克", description: "行动绘画。数学：粒子物理引擎 (Matter.js) 与混沌。" },
            { title: "埃舍尔", description: "不可能的世界。数学：3D 投影错觉与逻辑悖论。" },
            { title: "索尔·勒维特", description: "算法即艺术。数学：生成式指令与程序化艺术。" },
            { title: "安迪·沃霍尔", description: "机械复制时代的艺术。数学：图像处理阈值与阵列。" }
          ]
        }
      ]
    },
    {
      id: "sports",
      title: "AI 驱动的未来运动员",
      shortTitle: "行星 B: 运动",
      tagline: "智能运动分析与个人成长计划",
      description: "训练“超我”的物理感知与安全边界。构建一个“AI 私人教练”，在现实世界中“看”、分析并纠正动作。从虚拟走向实体。",
      icon: "🏃",
      color: "from-green-400 to-cyan-500",
      philosophyMap: {
        title: "安全与物理 AI",
        points: [
          "故障安全机制 (Fail-Safe): 如果 AI 误判了深蹲，如何确保不受伤？设置严格的置信度阈值。",
          "边缘部署 (Edge Deployment): 在本地设备上运行模型以实现实时反馈。",
          "人机回环: AI 提出建议，人类进行确认。"
        ]
      },
      syllabus: [
        {
          title: "模块一：AI 视觉启蒙与编程基础 (8 周)",
          goal: "理解计算机视觉基础与静态分析。",
          content: [
            { title: "Python 与 OpenCV", description: "环境搭建，图像处理基础，在图片上绘图。" },
            { title: "身体地标认知", description: "理解关节与坐标。手动标记 vs 自动化。" },
            { title: "MediaPipe 初探", description: "提取 33 个身体关键点。构建静态姿态分析器。" },
            { title: "YOLO 目标检测", description: "区分人与器材（球、哑铃）。" }
          ]
        },
        {
          title: "模块二：AI 应用开发与运动数据分析 (8 周)",
          goal: "动态视频分析与指标量化。",
          content: [
            { title: "实时视频处理", description: "使用 OpenCV 进行逐帧分析。" },
            { title: "运动指标量化", description: "利用向量数学计算膝关节/肘关节角度。" },
            { title: "计数与计时逻辑", description: "利用状态机检测完整动作。" },
            { title: "数据可视化", description: "使用 Matplotlib 绘制动作一致性与深度的图表。" }
          ]
        },
        {
          title: "模块三：智能教练与个性化成长 (8 周)",
          goal: "引入运动科学与反馈系统。",
          content: [
            { title: "生物力学规则", description: "将“膝盖内扣”等风险编写为代码规则。" },
            { title: "反馈与建议系统", description: "生成纠正性的文本或视觉提示。" },
            { title: "训练计划生成器", description: "根据检测到的弱点生成周计划。" },
            { title: "最终项目", description: "AI 私人教练 V1.0 - 带有 GUI 的桌面应用程序。" }
          ]
        }
      ]
    },
    {
      id: "data",
      title: "AI 数据洞察与逻辑",
      shortTitle: "行星 C: 数据",
      tagline: "深度推理与解释",
      description: "训练“超我”的深度推理与解释能力。这是连接“感知”与“决策”的桥梁。不仅仅是做报表，而是让 Agent 像数据科学家一样思考。",
      icon: "📊",
      color: "from-yellow-400 to-orange-500",
      philosophyMap: {
        title: "科学建模与研究",
        points: [
          "Deep Research Agent: 自动化收集、清洗和建模杂乱的现实数据。",
          "因果推理 (Causal Reasoning): 超越相关性，寻找“为什么”。",
          "第二大脑集成: 构建个性化的知识库。"
        ]
      },
      syllabus: [
        {
          title: "轨道 A: 科学研究与数学建模",
          goal: "复杂系统的第一性原理建模。",
          content: [
            { title: "Python 建模与仿真", description: "基于 ModSimPy。系统动力学与仿真。" },
            { title: "ExtBrain 项目", description: "构建专属 AI 科研助手。" },
            { title: "文献综述 Agent", description: "自动进行文献综述、信息抽取和趋势分析。" },
            { title: "模型分析 Agent", description: "辅助分析模型输出，识别关键参数。" }
          ]
        },
        {
          title: "数据逻辑核心",
          goal: "连接原始数据与可执行策略。",
          content: [
            { title: "Code Interpreter 进阶", description: "使用 Pandas Agent 进行对话式数据挖掘。" },
            { title: "优化与仿真", description: "探索参数空间寻找最优解。" },
            { title: "费曼输出", description: "强制 AI 用简单的语言解释复杂的模型。" }
          ]
        }
      ]
    },
    {
      id: "quant",
      title: "Gemini 3 驱动的 AI 原生量化交易",
      shortTitle: "行星 D: 量化",
      tagline: "决策与进化",
      description: "训练“超我”的博弈决策与反脆弱能力。我们不写算法，我们构建能够自我进化的 Agent 系统。",
      icon: "📈",
      color: "from-blue-500 to-indigo-600",
      philosophyMap: {
        title: "课程哲学映射",
        points: [
          "阶段 I: Knowledge to Code (Alpha 发现) - 像研究员一样阅读论文。",
          "阶段 II: The Arena (回测与调优) - Coder 与 Reviewer Agent 的博弈。",
          "阶段 III: Evolution (自我学习) - 将失败经验存入向量数据库以避免重蹈覆辙。"
        ]
      },
      syllabus: [
        {
          title: "Module 1: 新范式 - Agentic Quant Infrastructure",
          goal: "搭建基于 LangGraph 的多 Agent 编排环境。",
          content: [
            { title: "AI Native vs Assisted", description: "从辅助编程到自主代理的思维跃迁。" },
            { title: "Gemini 3 核心", description: "1M+ 上下文阅读文档库。多模态视觉“看”图表。" },
            { title: "技术栈搭建", description: "LangGraph (编排), Google Vertex AI SDK, Backtrader/VectorBT。" }
          ]
        },
        {
          title: "Module 2: Phase I - Knowledge to Code (The Researcher)",
          goal: "从非结构化数据到结构化代码。",
          content: [
            { title: "视觉读图", description: "利用视觉能力提取数学公式 (如 Black-Scholes)。" },
            { title: "海量研报关联", description: "利用长窗口阅读 50+ 篇研报，交叉验证 Alpha 因子。" },
            { title: "策略代码生成器", description: "利用 CoT 将金融逻辑转换为 Backtrader 标准代码。" }
          ]
        },
        {
          title: "Module 3: Phase II - The Arena (Reasoning over Optimization)",
          goal: "基于逻辑推理的优化，而非网格搜索。",
          content: [
            { title: "Coder & Critic", description: "双 Agent 博弈。Critic 看资金曲线图而非 Sharpe 率。" },
            { title: "调试与推理", description: "对回测报错进行根本原因分析 (RCA)。" },
            { title: "动态参数推理", description: "根据 VIX 指数推导参数，而非暴力尝试。" }
          ]
        },
        {
          title: "Module 4: Phase III - Evolution (Self-Learning)",
          goal: "引入长期记忆与进化机制。",
          content: [
            { title: "策略基因库", description: "将成功策略片段向量化存入 ChromaDB。" },
            { title: "进化算法结合", description: "LLM 作为变异算子重写逻辑结构。" },
            { title: "失败是资产", description: "记录过拟合案例，防止再次发生。" }
          ]
        },
        {
          title: "Module 5: Deployment & Risk (The Safety Net)",
          goal: "实盘部署中的 AI 风控。",
          content: [
            { title: "AI 风控官", description: "独立监控系统，发现异常直接熔断。" },
            { title: "Human-in-the-loop", description: "Streamlit 仪表盘，关键决策需人类批准。" },
            { title: "终极项目: AlphaZero for Trading", description: "端到端系统：研报 -> 策略 -> 回测 -> 报告。" }
          ]
        }
      ]
    },
    {
      id: "solopreneur",
      title: "AI 时代的超级个体：从零构建你的第一个商业软件",
      shortTitle: "行星 E: 超级个体",
      tagline: "你的代码团队，就在你的对话框里",
      description: "专门为非技术背景的普通人设计的实战课程。这份课程的目标非常功利且直接：不培养程序员，只培养“产品缔造者”。",
      icon: "🚀",
      color: "from-red-500 to-amber-500",
      philosophyMap: {
        title: "课程宣言 (Manifesto)",
        points: [
          "新世界：你只需要清晰地定义问题，拥有良好的审美，并掌握指挥 AI 的逻辑，就能在 10 周内上线 SaaS。",
          "核心承诺：我们不教你背诵代码。我们教你如何成为一个“超我” (SuperEgo)——一个能指挥 AI 军团的 CEO。",
          "零语法政策 (No Syntax Policy)：严禁手写复杂的循环。考核标准是“你向 AI 提的需求清不清晰”。"
        ]
      },
      syllabus: [
        {
          title: "第一阶段：认知觉醒与环境搭建 (Week 1-2)",
          goal: "打破对代码的恐惧，建立“AI 也是人”的协作感。",
          content: [
            { title: "Week 1: Hello, SuperEgo (你好，超我)", description: "颠覆认知：自然语言编程时代。环境配置：Cursor + API Key。作业：一句话生成个人网站。" },
            { title: "Week 2: The Product Manager Agent", description: "学会写 PRD。Deep Research 调研竞品。完成功能说明书和数据库结构初稿。" }
          ]
        },
        {
          title: "第二阶段：视觉先行与原型构建 (Week 3-4)",
          goal: "所见即所得。用“审美”驱动开发。",
          content: [
            { title: "Week 3: Visual Engineering (视觉工程)", description: "工具流：v0.dev。组件化思维：“统一全站配色”。作业：完成所有前端页面。" },
            { title: "Week 4: The Frontend Logic (前端交互)", description: "让页面“动”起来。Cursor 实战：交互逻辑与手机端适配。" }
          ]
        },
        {
          title: "第三阶段：赋予灵魂与数据连接 (Week 5-7)",
          goal: "接通血管和神经，让软件真正能用。",
          content: [
            { title: "Week 5: The Backend Agent (后端智能体)", description: "Supabase 入门。SQL 也是自然语言。作业：实现用户注册/登录。" },
            { title: "Week 6: Wiring it Together (全栈贯通)", description: "CRUD 增删改查。AI Debugging：让 AI 自我修复报错。作业：核心功能跑通。" },
            { title: "Week 7: The Reviewer Mindset (审查与测试)", description: "斯坦福理念落地：让 AI 写测试脚本，扮演黑客攻击并修复漏洞。" }
          ]
        },
        {
          title: "第四阶段：商业化与发布 (Week 8-10)",
          goal: "从软件变成商品。",
          content: [
            { title: "Week 8: Monetization (收钱！)", description: "让 AI 读懂 Stripe 文档并接入支付。设置付费用户权限。" },
            { title: "Week 9: Launch & Growth Agents", description: "SEO 自动化。写脚本自动推送更新到社交媒体。" },
            { title: "Week 10: Demo Day (路演日)", description: "成果展示。复盘：构建“第二大脑知识库”，存下好用的 Prompt。" }
          ]
        }
      ]
    }
  ]
};

export const getContent = (lang: 'en' | 'zh') => {
  return lang === 'en' ? CONTENT_EN : CONTENT_ZH;
};