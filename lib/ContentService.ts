
/**
 * ContentService: Knowledge Indexer for Prompt Engineering Guide
 * Strictly indexes content from prompt-engineering/pages structure.
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

// 1. Root Metadata (Mapped from prompt-engineering/pages/_meta.*.json)
const CATEGORY_TITLES: Record<string, Record<string, string>> = {
  en: {
    introduction: "Introduction",
    techniques: "Prompting Techniques",
    agents: "AI Agents",
    applications: "Applications",
    prompts: "Prompt Hub",
    models: "Models",
    risks: "Risks & Misuses",
    research: "LLM Research Findings"
  },
  zh: {
    introduction: "提示工程简介",
    techniques: "提示技术",
    agents: "AI 智能体",
    applications: "提示应用",
    prompts: "Prompt Hub",
    models: "模型",
    risks: "风险和误用",
    research: "LLM Research Findings"
  }
};

// 2. Sub-page Metadata (Mapped from sub-directory _meta.*.json files)
const CATEGORY_MAP: Record<string, Record<string, Record<string, string>>> = {
  en: {
    introduction: {
      "basics": "Basics of Prompting",
      "settings": "LLM Settings",
      "elements": "Prompt Elements",
      "tips": "General Tips",
      "examples": "Examples of Prompts"
    },
    techniques: {
      "zeroshot": "Zero-shot Prompting",
      "fewshot": "Few-shot Prompting",
      "cot": "Chain-of-Thought Prompting",
      "meta-prompting": "Meta Prompting",
      "consistency": "Self-Consistency",
      "knowledge": "Generate Knowledge Prompting",
      "prompt_chaining": "Prompt Chaining",
      "tot": "Tree of Thoughts",
      "rag": "Retrieval Augmented Generation",
      "art": "Automatic Reasoning and Tool-use",
      "ape": "Automatic Prompt Engineer",
      "activeprompt": "Active-Prompt",
      "dsp": "Directional Stimulus Prompting",
      "pal": "Program-Aided Language Models",
      "react": "ReAct",
      "reflexion": "Reflexion",
      "multimodalcot": "Multimodal CoT",
      "graph": "Graph Prompting"
    },
    agents: {
      "introduction": "Introduction to Agents",
      "components": "Agent Components",
      "ai-workflows-vs-ai-agents": "AI Workflows vs AI Agents",
      "context-engineering": "Context Engineering",
      "context-engineering-deep-dive": "Deep Dive Context",
      "deep-agents": "Deep Agents"
    },
    applications: {
      "finetuning-gpt4o": "Fine-tuning GPT-4o",
      "function_calling": "Function Calling",
      "context-caching": "Context Caching",
      "generating": "Generating Data",
      "coding": "Generating Code",
      "workplace_casestudy": "Workplace Case Study"
    },
    research: {
      "llm-agents": "LLM Agents",
      "rag": "RAG for LLMs",
      "llm-reasoning": "LLM Reasoning",
      "rag-faithfulness": "RAG Faithfulness",
      "synthetic_data": "Synthetic Data",
      "groq": "What is Groq?"
    }
  },
  zh: {
    introduction: {
      "basics": "基本概念",
      "settings": "大语言模型设置",
      "elements": "提示词要素",
      "tips": "设计提示的通用技巧",
      "examples": "提示词示例"
    },
    techniques: {
      "zeroshot": "零样本提示",
      "fewshot": "少样本提示",
      "cot": "链式思考（CoT）提示",
      "consistency": "自我一致性",
      "knowledge": "生成知识提示",
      "prompt_chaining": "Prompt Chaining",
      "tot": "思维树（ToT）",
      "rag": "检索增强生成 (RAG)",
      "art": "自动推理并使用工具（ART）",
      "ape": "自动提示工程师",
      "activeprompt": "Active-Prompt",
      "dsp": "方向性刺激提示",
      "pal": "Program-Aided Language Models",
      "react": "ReAct框架",
      "reflexion": "Reflexion",
      "multimodalcot": "多模态思维链提示方法",
      "graph": "基于图的提示"
    },
    agents: {
      "introduction": "智能体简介",
      "components": "智能体组件",
      "ai-workflows-vs-ai-agents": "AI 工作流 vs AI 智能体",
      "context-engineering": "智能体上下文工程",
      "context-engineering-deep-dive": "上下文工程深度解析",
      "deep-agents": "深度智能体"
    },
    applications: {
      "generating": "生成数据",
      "coding": "代码生成",
      "workplace_casestudy": "毕业生工作分类案例研究",
      "pf": "提示函数"
    },
    research: {
      "llm-agents": "LLM Agents",
      "rag": "RAG for LLMs",
      "llm-reasoning": "LLM Reasoning",
      "rag-faithfulness": "RAG Faithfulness",
      "synthetic_data": "合成数据",
      "groq": "Groq 是什么？"
    }
  }
};

// 3. Content Store (Simulating file system)
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
    "introduction/settings": `---
title: LLM Settings
author: dair-ai
---
# LLM Settings

When working with prompts, you interact with the LLM via an API or directly. You can configure parameters to get different results.

### Core Parameters
<Steps>
1. **Temperature**: Controls randomness. Lower is more deterministic, higher is more creative.
2. **Top P**: A sampling technique called nucleus sampling. Low values target high-probability tokens.
3. **Max Length**: Limits the number of tokens generated.
4. **Stop Sequences**: Tokens that cause the model to stop generating.
</Steps>

<Callout type="warning">
Usually, it is recommended to adjust either Temperature or Top P, but not both at once.
</Callout>
`,
    "introduction/elements": `---
title: Prompt Elements
author: dair-ai
---
# Prompt Elements

A prompt can contain several key components that guide the LLM's behavior.

### Components
<Steps>
1. **Instruction**: A specific task or instruction you want the model to perform.
2. **Context**: External information that can steer the model.
3. **Input Data**: The data or question for which we want a response.
4. **Output Indicator**: The type or format of the output (e.g., JSON, table).
</Steps>
`,
    "introduction/tips": `---
title: General Tips
author: dair-ai
---
# General Tips for Designing Prompts

Iterative refinement is the key to effective prompt engineering.

### Best Practices
<Steps>
1. **Start Simple**: Begin with a basic instruction and gradually add detail.
2. **The Instruction**: Place instructions at the beginning and use separators like "###".
3. **Be Specific**: Describe desired outcomes in detail.
4. **Do vs. Don't**: Tell the model what to do instead of what not to do.
</Steps>

<Callout type="idea">
Think of the LLM as a very smart intern who needs extremely clear instructions.
</Callout>
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
`,
    "agents/ai-workflows-vs-ai-agents": `---
title: AI Workflows vs AI Agents
---
# AI Workflows vs AI Agents

Deterministic paths vs probabilistic reasoning.

| Feature | AI Workflows | AI Agents |
| :--- | :--- | :--- |
| **Path** | Pre-defined | Dynamic |
| **Autonomy** | Low | High |

<Callout type="warning">Most production "Agents" are actually complex Workflows.</Callout>
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
    "introduction/settings": `---
title: 大语言模型设置
author: 提示词工程指南
---
# 大语言模型设置

在使用提示词时，你会通过 API 或直接与 LLM 交互。你可以配置各种参数来获得不同的结果。

### 核心参数
<Steps>
1. **Temperature (温度)**：控制生成的随机性。较低的值（如 0.2）使输出更确定，较高的值（如 0.8）使输出更具创意。
2. **Top P (核采样)**：另一种控制多样性的技术。
3. **Max Length (最大长度)**：限制生成的 Token 数量。
4. **Stop Sequences (停止序列)**：让模型停止生成的特定字符。
</Steps>

<Callout type="warning">
通常建议只调整 Temperature 或 Top P 其中之一，不要同时大幅调整两者。
</Callout>
`,
    "introduction/elements": `---
title: 提示词要素
author: 提示词工程指南
---
# 提示词要素

一个高质量的提示词通常包含几个关键组件，用于引导 LLM 的行为。

### 组件
<Steps>
1. **指令 (Instruction)**：你希望模型执行的具体任务。
2. **上下文 (Context)**：为任务提供的背景信息。
3. **输入数据 (Input Data)**：需要处理的具体内容或问题。
4. **输出指示 (Output Indicator)**：期望的输出格式（如：表格、JSON、简短回答）。
</Steps>
`,
    "introduction/tips": `---
title: 设计提示的通用技巧
author: 提示词工程指南
---
# 设计提示的通用技巧

提示工程是一个不断迭代优化的过程。

### 最佳实践
<Steps>
1. **从简单开始**：先给出一个基础指令，然后根据反馈逐步增加细节。
2. **位置原则**：将指令放在 Prompt 的开头，并使用分隔符（如 "###"）。
3. **具体直接**：尽可能详细地描述你想要的结果。
4. **正向指令**：多告诉模型“要做什么”，少说“不要做什么”。
</Steps>

<Callout type="idea">
把 LLM 想象成一个非常聪明但没有常识的实习生，你需要给出极其明确的指令。
</Callout>
`,
    "agents/introduction": `---
title: 智能体简介
---
# AI 智能体 (AI Agents) 简介

AI 智能体是由大语言模型（LLM）驱动的自主实体，能够感知环境、进行任务推理并采取行动以实现特定目标。

<Callout type="idea">
如果把 LLM 比作“大脑”，那么智能体就是“拥有双手和记忆的大脑”。
</Callout>
`,
    "agents/components": `---
title: 智能体架构组件
---
# 智能体架构组件

智能体系统主要由四个核心部分组成：

<Steps>
1. **大脑 (LLM)**：核心推理引擎。
2. **规划 (Planning)**：将复杂任务分解为可管理的子目标。
3. **记忆 (Memory)**：存储短期上下文和长期知识。
4. **工具使用 (Tool Use)**：调用外部 API 的能力。
</Steps>
`,
    "agents/ai-workflows-vs-ai-agents": `---
title: AI 工作流与智能体对比
---
# AI 工作流 (Workflows) vs AI 智能体 (Agents)

区分“硬编码的 LLM 调用序列”与“真正的自主智能体”至关重要。

| 特性 | AI 工作流 | AI 智能体 |
| :--- | :--- | :--- |
| **路径** | 确定性的 | 概率性的 |
| **自主性** | 低 | 高 |
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

    const raw = localeContent[cleanPath] || fallbackContent[cleanPath] || `# ${cleanPath.split('/').pop()}\n\nContent for this module is being processed...`;
    
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
