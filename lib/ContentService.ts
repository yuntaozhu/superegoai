
/**
 * ContentService: Advanced Indexing & Retrieval for Prompt Engineering Guide
 */

export interface DocNode {
  id: string;
  title: string;
  slug: string;
  path: string;
  category: string;
  order?: number;
  content: string;
  lang: 'en' | 'zh' | 'ar';
}

export interface CategoryGroup {
  id: string;
  title: string;
  items: DocNode[];
}

// Pre-defined registry of available files to simulate FS scanning in browser env
const FILE_REGISTRY = [
  { path: 'introduction/basics', lang: 'en', cat: 'introduction' },
  { path: 'introduction/settings', lang: 'en', cat: 'introduction' },
  { path: 'techniques/zeroshot', lang: 'en', cat: 'techniques' },
  { path: 'techniques/fewshot', lang: 'en', cat: 'techniques' },
  { path: 'techniques/cot', lang: 'en', cat: 'techniques' },
  { path: 'techniques/react', lang: 'en', cat: 'techniques' },
  { path: 'applications/generating', lang: 'en', cat: 'applications' },
  { path: 'applications/coding', lang: 'en', cat: 'applications' },
  { path: 'research/rag', lang: 'en', cat: 'research' },
  { path: 'research/llm-agents', lang: 'en', cat: 'research' },
  { path: 'risks/adversarial', lang: 'en', cat: 'risks' }
];

const LOCALIZED_TITLES: Record<string, any> = {
  en: {
    introduction: "Introduction",
    techniques: "Techniques",
    applications: "Applications",
    research: "Advanced Research",
    risks: "Risks & Ethics",
    basics: "Prompt Basics",
    settings: "LLM Settings",
    zeroshot: "Zero-shot Prompting",
    fewshot: "Few-shot Prompting",
    cot: "Chain-of-Thought",
    react: "ReAct Framework",
    generating: "Data Generation",
    coding: "Generating Code",
    rag: "RAG for LLMs",
    "llm-agents": "LLM Agents",
    adversarial: "Adversarial Prompting"
  },
  zh: {
    introduction: "基础入门",
    techniques: "核心技术",
    applications: "实战应用",
    research: "前沿研究",
    risks: "风险与伦理",
    basics: "提示词基础",
    settings: "模型设置",
    zeroshot: "零样本提示",
    fewshot: "少样本提示",
    cot: "思维链 (CoT)",
    react: "ReAct 框架",
    generating: "数据生成",
    coding: "代码生成",
    rag: "检索增强生成 (RAG)",
    "llm-agents": "智能体 Agent",
    adversarial: "对抗性提示"
  }
};

export const ContentService = {
  getIndex: (lang: 'en' | 'zh' | 'ar' = 'en'): CategoryGroup[] => {
    const categories: Record<string, DocNode[]> = {};
    const effectiveLang = lang === 'ar' ? 'en' : lang; // Fallback strategy

    FILE_REGISTRY.forEach(file => {
      const catId = file.cat;
      const docId = file.path.split('/')[1];
      
      if (!categories[catId]) categories[catId] = [];
      
      categories[catId].push({
        id: docId,
        slug: docId,
        path: file.path,
        category: catId,
        title: LOCALIZED_TITLES[effectiveLang]?.[docId] || docId,
        content: '', // Loaded on demand
        lang: lang
      });
    });

    return Object.entries(categories).map(([id, items]) => ({
      id,
      title: LOCALIZED_TITLES[effectiveLang]?.[id] || id.toUpperCase(),
      items
    }));
  },

  loadContent: async (path: string, lang: string): Promise<string> => {
    // In a real build, we'd fetch the MDX file from the server
    // For now, return high-quality simulation content based on the guide
    const docId = path.split('/')[1];
    
    // Simulate real MDX content with custom components
    if (docId === 'basics') {
      return `
# Prompt Basics

Prompt engineering is the art of crafting inputs to LLMs.

<Callout type="info">
  The core principle is specificity. Don't ask "how to cook", ask "provide a recipe for vegan lasagna".
</Callout>

### Key Elements
<Steps>
  1. **Instruction**: What you want the model to do.
  2. **Context**: Background info for the task.
  3. **Input Data**: The actual text to process.
  4. **Output Indicator**: How you want the result.
</Steps>

\`\`\`text
Classify the sentiment of this text: "I love the new UI!"
Sentiment:
\`\`\`
      `;
    }

    if (docId === 'cot') {
      return `
# Chain-of-Thought (CoT)

CoT prompting enables complex reasoning.

<Callout type="idea">
  Use "Let's think step by step" to trigger reasoning.
</Callout>

### Example
\`\`\`text
The cafeteria had 23 apples. If they used 20 to make lunch and bought 6 more, how many apples do they have?
Let's think step by step:
\`\`\`

<Cards>
  <Card title="Few-shot CoT" href="techniques/fewshot">Providing examples of reasoning steps.</Card>
  <Card title="Zero-shot CoT" href="techniques/zeroshot">Just asking the model to think.</Card>
</Cards>
      `;
    }

    return `# ${docId}\n\nContent for this module is being processed from the prompt-engineering directory...`;
  }
};
