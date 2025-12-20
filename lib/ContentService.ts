
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
      "consistency": "Self-Consistency",
      "knowledge": "Generate Knowledge Prompting",
      "react": "ReAct"
    },
    agents: {
      "introduction": "Introduction to Agents",
      "components": "Agent Components",
      "ai-workflows-vs-ai-agents": "AI Workflows vs AI Agents"
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
      "react": "ReAct框架"
    },
    agents: {
      "introduction": "智能体简介",
      "components": "智能体组件",
      "ai-workflows-vs-ai-agents": "AI 工作流 vs AI 智能体"
    }
  }
};

// 3. Content Store (Simulating file system)
const SOURCE_CONTENT: Record<string, Record<string, string>> = {
  en: {
    "introduction/basics": `---
title: Basics of Prompting
---
# Basics of Prompting
Prompt engineering is the art of crafting inputs to LLMs to get better results.
<Callout type="info">The core principle is **Specificity**. Don't ask "how to cook", ask "provide a detailed recipe for vegan lasagna".</Callout>
### Key Elements
<Steps>
1. **Instruction**: What you want the model to do.
2. **Context**: Background info for the task.
3. **Input Data**: The text to process.
4. **Output Indicator**: How you want the result.
</Steps>`,
    "introduction/settings": `---
title: LLM Settings
---
# LLM Settings
Parameters to control model behavior.
<Steps>
1. **Temperature**: Controls randomness. Higher = more creative.
2. **Top P**: Nucleus sampling.
3. **Max Length**: Limit output tokens.
</Steps>`,
    "introduction/elements": `---
title: Prompt Elements
---
# Prompt Elements
A prompt can contain:
1. **Instruction**: The specific task.
2. **Context**: External info to guide the model.
3. **Input Data**: The specific data to process.
4. **Output Indicator**: Format or style requirements.`,
    "introduction/tips": `---
title: General Tips
---
# General Tips
- **Start Simple**: Iterate from basic to complex.
- **Use Separators**: Like ### to clear boundaries.
- **Be Specific**: Detail counts.
- **Do over Don't**: Direct the model on what to do.`,
    "introduction/examples": `---
title: Examples of Prompts
---
# Examples of Prompts
### Text Summarization
\`\`\`text
Summarize the following text into one sentence:
[Insert Text Here]
\`\`\`
### Information Extraction
\`\`\`text
Extract the dates mentioned in this report:
[Insert Text Here]
\`\`\`
### Code Generation
\`\`\`text
Write a Python script that scrapes headlines from a news site.
\`\`\``,
    "techniques/zeroshot": `---
title: Zero-shot Prompting
---
# Zero-shot Prompting
Perform tasks without any prior examples.
### Example
\`\`\`text
Classify the sentiment: "The product exceeded my expectations!"
Sentiment:
\`\`\`
<Callout type="idea">Modern models like Gemini are pre-trained on massive datasets, allowing them to generalize well to instructions without few-shot examples.</Callout>`,
    "techniques/fewshot": `---
title: Few-shot Prompting
---
# Few-shot Prompting
Provide demonstrations to steer the model.
### Example
\`\`\`text
Great movie! // Positive
Waste of time. // Negative
Decent enough. // Neutral
What a blast! //
\`\`\`
<Callout type="warning">The format and consistency of examples matter more than the specific labels in some cases.</Callout>`,
    "techniques/cot": `---
title: Chain-of-Thought Prompting
---
# Chain-of-Thought (CoT) Prompting
Enables complex reasoning through intermediate steps.
### Example
\`\`\`text
Roger has 5 tennis balls. He buys 2 more cans. Each can has 3 balls. How many total?
Let's think step by step:
1. Roger starts with 5.
2. 2 cans * 3 balls = 6 balls.
3. 5 + 6 = 11.
The answer is 11.
\`\`\`
<Callout type="success">Use "Let's think step by step" to trigger zero-shot CoT.</Callout>`,
    "techniques/consistency": `---
title: Self-Consistency
---
# Self-Consistency
Sample multiple reasoning paths and select the most frequent answer. 
### Why use it?
It helps reduce the chance of the model making a one-off logic error by taking the "majority vote" of several generations.`,
    "techniques/knowledge": `---
title: Generate Knowledge Prompting
---
# Generate Knowledge Prompting
Instruct the model to generate relevant facts before answering a complex question.
<Steps>
1. Ask the model to generate knowledge about the topic.
2. Use that knowledge as part of the final prompt to get a more accurate answer.
</Steps>`,
    "techniques/react": `---
title: ReAct
---
# ReAct (Reason + Act)
A framework where LLMs generate reasoning traces and task-specific actions in an interleaved manner.
- **Reason**: Plan the next step.
- **Act**: Interact with an external tool (Search, SQL).
- **Observe**: Read results and update the logic chain.`,
    "agents/introduction": `---
title: Introduction to Agents
---
# Introduction to Agents
Autonomous entities powered by LLMs.
<Callout type="idea">Think of an LLM as a "brain" and an Agent as a "brain with hands".</Callout>`
  },
  zh: {
    "introduction/basics": `---
title: 提示词基础
---
# 提示词基础
提示工程是优化大语言模型输入以获得高质量输出的艺术。
<Callout type="info">核心原则是 **具体性**。不要只问“如何做饭”，而要问“请提供一份详细的四人份纯素千层面食谱”。</Callout>
### 关键要素
<Steps>
1. **指令 (Instruction)**：你希望模型执行的具体任务。
2. **上下文 (Context)**：引导模型更好地响应的外部信息。
3. **输入数据 (Input Data)**：我们感兴趣处理的数据。
4. **输出指示 (Output Indicator)**：指示输出的类型或格式。
</Steps>`,
    "introduction/settings": `---
title: 大语言模型设置
---
# 大语言模型设置
控制模型行为的关键参数。
<Steps>
1. **Temperature (温度)**：控制随机性。值越高越具创意。
2. **Top P (核采样)**：另一种控制多样性的技术。
3. **最大长度**：限制生成的 Token 数量。
</Steps>`,
    "introduction/elements": `---
title: 提示词要素
---
# 提示词要素
一个完整的 Prompt 通常包含：
1. **指令**：希望模型执行的任务。
2. **上下文**：帮助模型更好理解任务的背景。
3. **输入数据**：待处理的具体文本。
4. **输出指示**：期望的返回格式。`,
    "introduction/tips": `---
title: 设计提示的通用技巧
---
# 设计提示的通用技巧
- **从简单开始**：逐步增加复杂度。
- **使用分隔符**：如 ###，清晰标记不同部分。
- **描述准确**：避免模糊语言。
- **正面引导**：多说“做什么”，少说“不做什么”。`,
    "introduction/examples": `---
title: 提示词示例
---
# 提示词示例
### 文本摘要
\`\`\`text
将以下文本概括为一句话：
[在此处输入文本]
\`\`\`
### 信息提取
\`\`\`text
从以下报告中提取提到的所有日期：
[在此处输入文本]
\`\`\`
### 代码生成
\`\`\`text
编写一个 Python 脚本，用于从新闻网站抓取标题。
\`\`\``,
    "techniques/zeroshot": `---
title: 零样本提示
---
# 零样本提示
在没有任何示例的情况下执行任务。
### 示例
\`\`\`text
分类以下文本的情感：“这款产品超出了我的预期！”
情感：
\`\`\`
<Callout type="idea">现代模型如 Gemini 经过大规模指令微调，具备极强的零样本泛化能力。</Callout>`,
    "techniques/fewshot": `---
title: 少样本提示
---
# 少样本提示
通过提供少量示例来引导模型的输出格式或逻辑。
### 示例
\`\`\`text
太棒了！ // 正面
浪费时间。 // 负面
还可以。 // 中性
太刺激了！ // 
\`\`\`
<Callout type="warning">在某些情况下，示例的格式和一致性比具体标签的正确性更重要。</Callout>`,
    "techniques/cot": `---
title: 链式思考 (CoT)
---
# 链式思考（CoT）提示
通过中间推理步骤启用复杂推理能力。
### 示例
\`\`\`text
小明有 5 个网球，他又买了 2 罐，每罐 3 个。总共有多少个？
让我们一步步思考：
1. 初始有 5 个。
2. 2 罐 * 罐 3 个 = 6 个。
3. 5 + 6 = 11。
答案是 11。
\`\`\`
<Callout type="success">加入“让我们一步步思考”即可触发零样本思维链。</Callout>`,
    "techniques/consistency": `---
title: 自我一致性
---
# 自我一致性
对多个推理路径进行采样，并选择出现次数最多的答案。
### 核心逻辑
通过“多数投票”机制，减少模型在单次生成中出现偶然逻辑错误的可能性。`,
    "techniques/knowledge": `---
title: 生成知识提示
---
# 生成知识提示
在回答复杂问题之前，先指示模型生成相关的背景事实。
<Steps>
1. 要求模型生成关于该主题的知识。
2. 将该知识作为最终提示的一部分，以获得更准确的答案。
</Steps>`,
    "techniques/react": `---
title: ReAct框架
---
# ReAct (Reason + Act) 框架
一种让 LLM 以交替方式生成推理轨迹和特定任务行动的框架。
- **推理 (Reasoning)**：思考下一步该做什么。
- **行动 (Action)**：调用外部工具（如搜索、计算器）。
- **观察 (Observation)**：获取结果并更新推理链。`,
    "agents/introduction": `---
title: 智能体简介
---
# AI 智能体 (AI Agents) 简介
由 LLM 驱动的自主实体。
<Callout type="idea">如果把 LLM 比作“大脑”，那么智能体就是“拥有双手和记忆的大脑”。</Callout>`
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
