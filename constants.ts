
import { Course, PhilosophyPillar, BlogPost } from './types';

interface ContentData {
  philosophyPillars: PhilosophyPillar[];
  courses: Course[];
  blogPosts: BlogPost[];
}

const CONTENT_ZH: ContentData = {
  philosophyPillars: [], // Using specific translations now
  blogPosts: [
    {
      id: "1",
      title: "从执行到编排：AI 时代的认知跨越",
      excerpt: "在这个 AGI 的前夜，最核心的竞争力不再是你会多少门编程语言，而是你如何构建一个能够理解并执行复杂逻辑的系统。",
      content: `
        <h2>认知基石的重塑</h2>
        <p>传统的技能本位正在向系统本位转移。在过去，掌握一门技术需要数年的深耕，而现在，AI 正在将这些技能商品化。作为一个“超我”架构师，你的任务不再是手动编写每一个循环，而是定义系统的边界、逻辑和目标。</p>
        <blockquote>“Human defines the 'Why', AI solves the 'How'.”</blockquote>
        <h3>核心分工逻辑</h3>
        <p>我们承认生物脑在逻辑推导和记忆容量上的局限性。构建“外挂大脑”不是一个选项，而是一个生存必备品。生物脑应该释放出来，专注于直觉审判、审美定义和战略决策。</p>
        <p>通过 RAG (检索增强生成) 技术，我们可以将零散的知识沉淀在私有的向量数据库中，形成你独一无二的数字分身。这个分身不仅是你知识的载体，更是你行动的指挥官。</p>
        <pre><code>// 编排指令示例
const supervisor = new Agent('Chief-Architect');
await supervisor.delegate(tasks.frontend, 'Gemini-3-Pro');
await supervisor.delegate(tasks.backend, 'Gemini-3-Flash');</code></pre>
        <h3>一人即一公司的时代</h3>
        <p>不再需要庞大的开发团队。通过多智能体编排 (Multi-Agent Orchestration)，你一个人就可以指挥一个由产品经理、架构师、程序员和测试员组成的数字军团。这就是我们课程核心要传达的力量。</p>
      `,
      date: "2024-05-20",
      author: "朱云涛",
      tags: ["AI", "哲学", "认知"]
    },
    {
      id: "2",
      title: "构建第二大脑：FTI 架构实战指南",
      excerpt: "FTI 架构（Feed-Transform-Integrate）是我们推荐的构建个人知识库的标准范式，它确保了数据的主权与效能。",
      content: `
        <h2>什么是 FTI 架构？</h2>
        <p>FTI 架构是我们通过大量企业咨询实战提炼出的、最适合个人与小微组织的 AI 数据闭环模型。</p>
        <ul>
          <li><strong>Feed (摄取):</strong> 自动化捕获全媒体资产，从网页剪藏到语音备忘录。</li>
          <li><strong>Transform (转换):</strong> 利用 LLM 将非结构化数据转化为向量化记忆。</li>
          <li><strong>Integrate (集成):</strong> 通过 RAG 管道将记忆无缝嵌入到你的创作流中。</li>
        </ul>
        <p>这种架构的核心在于“主权”。你不依赖于任何单一的 SaaS 供应商，你的向量数据库可以部署在任何地方，你的模型可以随时切换。</p>
        <h3>实战步骤</h3>
        <p>在我们的“AI SuperEgo”课程中，我们会手把手带你使用 Dify 和 Vector DB 搭建这套地基。从零配置 Embedding 模型，到实现混合检索 (Hybrid Search)，确保你的 AI 能够像你一样思考，但比你更博学。</p>
      `,
      date: "2024-05-18",
      author: "杜占源",
      tags: ["架构", "实战", "RAG"]
    },
    {
      id: "3",
      title: "艺术与代码：在数学中重现莫奈的色彩",
      excerpt: "当我们谈论 AI 艺术时，我们谈论的不仅仅是生成。我们是在探讨如何用代码解构人类几千年的审美逻辑。",
      content: `
        <h2>艺术行星的逻辑</h2>
        <p>在“艺术行星”课程中，我们挑战学生不仅要用 AI 画图，还要理解“为什么这幅图好看”。</p>
        <p>莫奈对光的处理可以被抽象为一种对色温和亮度的插值算法。当我们用代码去实现这种插值时，我们不仅在复现艺术，我们是在内化这种审美能力。</p>
        <p>这就是费曼学习法在艺术领域的应用：如果你不能用代码写出一个流派的特征，说明你还没有真正看懂它。</p>
      `,
      date: "2024-05-15",
      author: "朱云涛",
      tags: ["艺术", "代码", "费曼学习法"]
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
        { title: "第一幕：光的革命", goal: "从观察到主观感受", content: [{title: "莫奈与北斋", description: "用 AI 融合印象派与浮世绘。"}] }
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
        { title: "模块一：AI 视觉启蒙", goal: "让电脑“看懂”身体", content: [{title: "关键点检测", description: "提取 33 个身体地标坐标。"}] }
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
        { title: "第一阶段：构建地基", goal: "FTI 架构搭建", content: [{title: "向量化记忆", description: "将笔记/文档存入 Vector DB。"}] }
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
        { title: "模块一：新范式", goal: "Agentic Quant 基座", content: [{title: "金融多模态", description: "用视觉能力读取 K 线与公式。"}] }
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
        { title: "第一阶段：环境搭建", goal: "建立人机协作感", content: [{title: "Cursor 深度应用", description: "掌握自然语言编程的核心指令。"}] }
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
        { title: "模块一：数字神经元", goal: "搭建科研日志系统", content: [{title: "自动化捕获", description: "将阅读笔记转化为结构化数据。"}] }
      ]
    }
  ]
};

export const getContent = (lang: 'en' | 'zh') => {
  return CONTENT_ZH;
};
