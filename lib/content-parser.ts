
/**
 * Virtual Knowledge Registry for SuperEgo AI
 * This replaces the build-time globbing with a static registry to ensure
 * compatibility with environments where import.meta.glob is unavailable.
 */

export interface PageNode {
  id: string;
  slug: string;
  title: string;
  path: string;
  category: string;
  description: string;
  content?: string;
}

export interface CategoryNode {
  id: string;
  title: string;
  pages: PageNode[];
}

export interface FullContent {
  categories: CategoryNode[];
  rawFiles: Record<string, string>;
}

export type ParsedPrompt = PageNode;

export interface ContentStructure extends FullContent {
  allNodes: ParsedPrompt[];
}

// Localized Title Registry extracted from provided _meta files
const LOCALIZED_META: Record<string, Record<string, any>> = {
  en: {
    techniques: {
      "__self__": "Techniques",
      "zeroshot": "Zero-shot Prompting",
      "fewshot": "Few-shot Prompting",
      "cot": "Chain-of-Thought Prompting",
      "react": "ReAct",
      "consistency": "Self-Consistency",
      "knowledge": "Generate Knowledge Prompting"
    },
    risks: {
      "__self__": "Risks & Ethics",
      "adversarial": "Adversarial Prompting",
      "factuality": "Factuality",
      "biases": "Biases"
    },
    applications: {
      "__self__": "Applications",
      "generating": "Generating Data",
      "function_calling": "Function Calling",
      "coding": "Generating Code"
    },
    research: {
      "__self__": "Advanced Research",
      "llm-agents": "LLM Agents",
      "rag": "RAG for LLMs",
      "rag-faithfulness": "RAG Faithfulness"
    }
  },
  zh: {
    techniques: {
      "__self__": "核心技术",
      "zeroshot": "零样本提示",
      "fewshot": "少样本提示",
      "cot": "链式思考（CoT）提示",
      "react": "ReAct框架",
      "consistency": "自我一致性",
      "knowledge": "生成知识提示"
    },
    risks: {
      "__self__": "风险与伦理",
      "adversarial": "对抗性提示",
      "factuality": "真实性",
      "biases": "偏见"
    },
    applications: {
      "__self__": "实战应用",
      "generating": "生成数据",
      "function_calling": "函数调用",
      "coding": "代码生成"
    },
    research: {
      "__self__": "前沿研究",
      "llm-agents": "LLM Agents",
      "rag": "RAG for LLMs",
      "rag-faithfulness": "RAG Faithfulness"
    }
  }
};

// Static content database to ensure the guide works without external MD files
const STATIC_CONTENT: Record<string, string> = {
  "techniques/zeroshot": `
# Zero-shot Prompting

Zero-shot prompting allows the model to perform tasks without any prior examples.

### Example:
\`\`\`text
Classify the sentiment of this text: "The new update is incredible!"
Sentiment:
\`\`\`
`,
  "techniques/fewshot": `
# Few-shot Prompting

Few-shot prompting provides the model with a few examples to guide its output format or logic.

### Example:
\`\`\`text
This is awesome! // Positive
This is terrible. // Negative
The movie was okay. // Neutral
The weather is great! // 
\`\`\`
`,
  "techniques/cot": `
# Chain-of-Thought (CoT) Prompting

CoT prompting enables complex reasoning capabilities through intermediate reasoning steps.

### Example:
\`\`\`text
The cafeteria had 23 apples. If they used 20 to make lunch and bought 6 more, how many apples do they have?
Let's think step by step:
1. Start with 23 apples.
2. Use 20 for lunch: 23 - 20 = 3.
3. Buy 6 more: 3 + 6 = 9.
The answer is 9.
\`\`\`
`
};

export const loadContentRegistry = (lang: 'zh' | 'en'): FullContent => {
  const categoryKeys = ['techniques', 'risks', 'applications', 'research'];
  
  const categories: CategoryNode[] = categoryKeys.map(catId => {
    const meta = LOCALIZED_META[lang][catId] || {};
    const pages: PageNode[] = Object.keys(meta)
      .filter(key => key !== '__self__')
      .map(pageId => ({
        id: pageId,
        slug: pageId,
        title: meta[pageId] || pageId,
        path: `${catId}/${pageId}`,
        category: catId,
        description: `Deep dive into ${meta[pageId] || pageId}.`,
        content: STATIC_CONTENT[`${catId}/${pageId}`] || `# ${meta[pageId] || pageId}\n\nContent for this module is currently being indexed in the SuperEgo Second Brain.`
      }));

    return {
      id: catId,
      title: meta['__self__'] || catId.toUpperCase(),
      pages
    };
  });

  // Map paths to content for the reader
  const rawFiles: Record<string, string> = {};
  categories.forEach(cat => {
    cat.pages.forEach(page => {
      rawFiles[page.path] = page.content || '';
    });
  });

  return {
    categories,
    rawFiles
  };
};

export const loadPromptGuideContent = (lang: 'zh' | 'en' = 'zh'): ContentStructure => {
  const content = loadContentRegistry(lang);
  const allNodes = content.categories.flatMap(cat => 
    cat.pages.map(page => ({
      ...page,
      category: cat.title
    }))
  );
  return {
    ...content,
    allNodes
  };
};

export const extractPrompts = (markdown: string): string[] => {
  const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)\n```/g;
  const prompts: string[] = [];
  let match;
  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    prompts.push(match[1].trim());
  }
  return prompts;
};
