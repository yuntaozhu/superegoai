
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
    applications: "Applications",
    research: "LLM Research Findings",
    risks: "Risks & Misuses"
  },
  zh: {
    introduction: "提示工程简介",
    techniques: "提示技术",
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

\`\`\`text
Classify the sentiment of this text: "The new UI is absolutely stunning!"
Sentiment:
\`\`\`
`,
    "techniques/zeroshot": `---
title: Zero-shot Prompting
---
# Zero-shot Prompting

LLMs today are capable of performing tasks zero-shot.

<Callout type="idea">
Zero-shot means the model performs a task without any prior examples or demonstrations in the prompt.
</Callout>

### Example
\`\`\`text
Classify the text into neutral, negative, or positive. 

Text: I think the vacation is okay.
Sentiment:
\`\`\`

**Output:**
\`\`\`text
Neutral
\`\`\`
`,
    "techniques/fewshot": `---
title: Few-shot Prompting
---
# Few-shot Prompting

Providing demonstrations in the prompt enables **In-Context Learning**.

<Callout type="warning">
Providing demonstrations in the prompt serves as conditioning for subsequent examples.
</Callout>

### Example: Learning New Concepts
\`\`\`text
A "whatpu" is a small, furry animal native to Tanzania. An example of a sentence that uses the word whatpu is:
We were traveling in Africa and we saw these very cute whatpus.

To do a "farduddle" means to jump up and down really fast. An example of a sentence that uses the word farduddle is:
\`\`\`

**Output:**
\`\`\`text
When we won the game, we all started to farduddle in celebration.
\`\`\`
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

\`\`\`text
分类这段文本的情感：“这个新界面简直太棒了！”
情感：
\`\`\`
`,
    "techniques/zeroshot": `---
title: 零样本提示
---
# 零样本提示 (Zero-shot)

如今的大型语言模型经过大规模指令微调，能够直接根据指令执行任务，而无需任何示例。

<Callout type="idea">
零样本意味着模型在没有任何先前示例或演示的情况下执行任务。
</Callout>

### 示例
\`\`\`text
将文本分类为中性、负面或正面。

文本：我觉得这次度假还可以。
情感：
\`\`\`

**输出：**
\`\`\`text
中性
\`\`\`
`,
    "techniques/fewshot": `---
title: 少样本提示
---
# 少样本提示 (Few-shot)

虽然 LLM 展示了卓越的零样本能力，但在处理更复杂的任务时，提供少量演示（示例）可以显著提升其性能。这被称为 **上下文学习 (In-Context Learning)**。

<Callout type="warning">
演示的质量和多样性直接影响模型的推理路径。
</Callout>

### 示例：学习新概念
\`\`\`text
“whatpu”是坦桑尼亚的一种小型毛茸茸的动物。一个使用 whatpu 这个词的句子示例是：
我们在非洲旅行时看到了这些非常可爱的 whatpus。

“farduddle”的意思是跳上跳下得非常快。一个使用 farduddle 这个词的句子示例是：
\`\`\`

**输出：**
\`\`\`text
当我们赢得比赛时，我们都开始 farduddle 庆祝。
\`\`\`
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
