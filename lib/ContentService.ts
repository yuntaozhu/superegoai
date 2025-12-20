
/**
 * ContentService: Metadata-Driven Bilingual Knowledge Indexer
 * Replicates Nextra/dair-ai logic for structured documentation with i18n support.
 */

export interface PageMeta {
  id: string;
  title: string;
  category: string;
  path: string;
}

export interface CategoryStructure {
  id: string;
  title: string;
  pages: PageMeta[];
}

// 1. Meta Registry (Mapped from _meta.en.json and _meta.zh.json logic)
const CATEGORY_TITLES: Record<string, Record<string, string>> = {
  en: {
    introduction: "Introduction",
    techniques: "Prompting Techniques",
    agents: "AI Agents",
    applications: "Applications",
    research: "LLM Research Findings",
    risks: "Risks & Misuses"
  },
  zh: {
    introduction: "提示工程简介",
    techniques: "提示技术",
    agents: "AI 智能体",
    applications: "提示应用",
    research: "LLM 研究发现",
    risks: "风险与误用"
  }
};

const CATEGORY_MAP: Record<string, Record<string, Record<string, string>>> = {
  en: {
    introduction: {
      "basics": "Basics of Prompting",
      "settings": "LLM Settings",
      "elements": "Prompt Elements",
      "tips": "General Tips"
    },
    techniques: {
      "zeroshot": "Zero-shot Prompting",
      "fewshot": "Few-shot Prompting",
      "cot": "Chain-of-Thought",
      "react": "ReAct Framework",
      "consistency": "Self-Consistency"
    },
    agents: {
      "introduction": "Introduction to Agents",
      "components": "Agent Components",
      "ai-workflows-vs-ai-agents": "AI Workflows vs AI Agents"
    },
    applications: {
      "generating": "Generating Data",
      "coding": "Generating Code",
      "function_calling": "Function Calling"
    },
    research: {
      "llm-agents": "LLM Agents",
      "rag": "RAG for LLMs",
      "synthetic_data": "Synthetic Data"
    }
  },
  zh: {
    introduction: {
      "basics": "基本概念",
      "settings": "大语言模型设置",
      "elements": "提示词要素",
      "tips": "设计提示的通用技巧"
    },
    techniques: {
      "zeroshot": "零样本提示",
      "fewshot": "少样本提示",
      "cot": "链式思考 (CoT)",
      "react": "ReAct 框架",
      "consistency": "自我一致性"
    },
    agents: {
      "introduction": "智能体简介",
      "components": "智能体架构组件",
      "ai-workflows-vs-ai-agents": "AI 工作流与智能体对比"
    },
    applications: {
      "generating": "生成数据",
      "coding": "代码生成",
      "function_calling": "函数调用"
    },
    research: {
      "llm-agents": "智能体 Agents",
      "rag": "检索增强生成 (RAG)",
      "synthetic_data": "合成数据"
    }
  }
};

// 2. Comprehensive Bilingual Content Store
const SOURCE_CONTENT: Record<string, Record<string, string>> = {
  en: {
    "introduction/basics": `---
title: Basics of Prompting
author: dair-ai
---
# Basics of Prompting

Prompt engineering is the art of crafting inputs to LLMs to get better results.

<Callout type="info">
The core principle is **Specificity**. Don't ask "how to cook", ask "provide a detailed recipe for vegan lasagna".
</Callout>

### Key Elements
<Steps>
1. **Instruction**: What you want the model to do.
2. **Context**: Background info for the task.
3. **Input Data**: The text to process.
4. **Output Indicator**: How you want the result.
</Steps>
`,
    "agents/introduction": `---
title: Introduction to Agents
---
# Introduction to Agents

An AI Agent is an autonomous entity powered by an LLM that can perceive its environment, reason about tasks, and take actions to achieve specific goals.

<Callout type="idea">
Think of an LLM as a "brain" and an Agent as a "brain with hands and memory".
</Callout>

### What makes an Agent?
Standard LLMs are passive: they wait for input and provide output. Agents are active: they can use tools, browse the web, and correct their own mistakes in a loop.

<Cards>
  <Card title="Agent Components" href="agents/components">Learn about Brain, Planning, and Memory.</Card>
  <Card title="Agent Research" href="research/llm-agents">Deep dive into recent Agent papers.</Card>
</Cards>
`,
    "agents/components": `---
title: Agent Components
---
# Agent Components

Based on popular research (e.g., Lilian Weng), an autonomous agent system consists of four key components.

<Steps>
1. **Brain (LLM)**: The core reasoning engine.
2. **Planning**: Breaking down complex tasks into manageable sub-goals.
3. **Memory**: Storing short-term context and long-term knowledge.
4. **Tool Use**: The ability to call external APIs (Search, Calculator, Code Interpreter).
</Steps>

<Callout type="warning">
The bottleneck for agents today is often "Planning" and "Reliability" rather than the LLM's raw knowledge.
</Callout>
`,
    "agents/ai-workflows-vs-ai-agents": `---
title: AI Workflows vs AI Agents
---
# AI Workflows vs AI Agents

It is crucial to distinguish between a hard-coded sequence of LLM calls and a truly autonomous agent.

### Comparison
| Feature | AI Workflows | AI Agents |
| :--- | :--- | :--- |
| **Path** | Pre-defined, deterministic | Dynamic, probabilistic |
| **Autonomy** | Low (Step-by-step logic) | High (Goal-oriented) |
| **Complexity** | High reliability, lower flexibility | Lower reliability, high flexibility |

\`\`\`text
Workflows: If A then B then C.
Agents: Here is Goal X. Figure out if you need A, B, or C.
\`\`\`

<Callout type="info">
Most production "Agents" are actually complex Workflows with a bit of agentic reasoning.
</Callout>
`
  },
  zh: {
    "introduction/basics": `---
title: 提示词基础
author: 提示词工程指南
---
# 提示词基础

提示工程（Prompt Engineering）是优化大语言模型（LLM）输入以获得高质量输出的艺术。

<Callout type="info">
核心原则是 **具体性**。不要只问“如何做饭”，而要问“请提供一份详细的四人份纯素千层面食谱”。
</Callout>

### 关键要素
<Steps>
1. **指令 (Instruction)**：你希望模型执行的具体任务。
2. **上下文 (Context)**：引导模型更好地响应的外部信息。
3. **输入数据 (Input Data)**：我们感兴趣处理的数据。
4. **输出指示 (Output Indicator)**：指示输出的类型或格式。
</Steps>
`,
    "agents/introduction": `---
title: 智能体简介
---
# AI 智能体 (AI Agents) 简介

AI 智能体是由大语言模型（LLM）驱动的自主实体，能够感知环境、进行任务推理并采取行动以实现特定目标。

<Callout type="idea">
如果把 LLM 比作“大脑”，那么智能体就是“拥有双手和记忆的大脑”。
</Callout>

### 智能体的核心特质
传统的 LLM 是被动的：它们等待输入并提供输出。智能体是主动的：它们可以在循环中调用工具、浏览网页并纠正自己的错误。

<Cards>
  <Card title="架构组件" href="agents/components">了解大脑、规划和记忆。</Card>
  <Card title="前沿研究" href="research/llm-agents">深入研究最新的智能体论文。</Card>
</Cards>
`,
    "agents/components": `---
title: 智能体架构组件
---
# 智能体架构组件

根据主流研究（如 Lilian Weng 的分类），一个自主智能体系统主要由四个核心部分组成。

<Steps>
1. **大脑 (LLM)**：核心推理引擎。
2. **规划 (Planning)**：将复杂任务分解为可管理的子目标。
3. **记忆 (Memory)**：存储短期上下文和长期知识。
4. **工具使用 (Tool Use)**：调用外部 API 的能力（搜索、计算器、代码解释器）。
</Steps>

<Callout type="warning">
目前智能体的瓶颈通常在于“规划能力”和“可靠性”，而非 LLM 本身的知识储备。
</Callout>
`,
    "agents/ai-workflows-vs-ai-agents": `---
title: AI 工作流与智能体对比
---
# AI 工作流 (Workflows) vs AI 智能体 (Agents)

区分“硬编码的 LLM 调用序列”与“真正的自主智能体”至关重要。

### 核心对比
| 特性 | AI 工作流 | AI 智能体 |
| :--- | :--- | :--- |
| **路径** | 预定义的、确定性的 | 动态的、概率性的 |
| **自主性** | 低（步进逻辑） | 高（目标导向） |
| **复杂度** | 高可靠性，较低灵活性 | 较低可靠性，高灵活性 |

\`\`\`text
工作流：如果 A，则执行 B，然后执行 C。
智能体：这是目标 X。请自行判断需要 A、B 还是 C。
\`\`\`

<Callout type="info">
目前大多数生产环境中的“智能体”实际上是带有少量智能推理的复杂“工作流”。
</Callout>
`
  }
};

export const ContentService = {
  getTree: (lang: 'en' | 'zh' = 'zh'): CategoryStructure[] => {
    const localeMap = CATEGORY_MAP[lang] || CATEGORY_MAP['en'];
    const localeTitles = CATEGORY_TITLES[lang] || CATEGORY_TITLES['en'];

    return Object.entries(localeMap).map(([catId, pages]) => ({
      id: catId,
      title: localeTitles[catId] || catId.toUpperCase(),
      pages: Object.entries(pages).map(([pageId, title]) => ({
        id: pageId,
        title,
        category: catId,
        path: `${catId}/${pageId}`
      }))
    }));
  },

  getPage: async (path: string, lang: 'en' | 'zh' = 'zh') => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const localeContent = SOURCE_CONTENT[lang] || SOURCE_CONTENT['en'];
    const fallbackContent = SOURCE_CONTENT['en'];

    const raw = localeContent[cleanPath] || fallbackContent[cleanPath] || `# ${cleanPath.split('/').pop()}\n\nContent for this module (**${cleanPath}**) is being processed...`;
    
    // Frontmatter Parser
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
    const frontmatter: Record<string, string> = {};
    let content = raw;

    if (fmMatch) {
      const fmContent = fmMatch[1];
      fmContent.split('\n').forEach(line => {
        const [key, ...val] = line.split(':');
        if (key && val.length) frontmatter[key.trim()] = val.join(':').trim();
      });
      content = raw.replace(fmMatch[0], '');
    }

    return {
      content,
      frontmatter,
      title: frontmatter.title || cleanPath.split('/').pop() || 'Untitled'
    };
  }
};
