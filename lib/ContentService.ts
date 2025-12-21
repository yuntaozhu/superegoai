
/**
 * ContentService: Knowledge Indexer & Audit Manager
 * 
 * ROLE: I18n Content Architect
 * RESPONSIBILITY: 
 * 1. Mirror Mapping: en/zh directory parity based on _meta.json.
 * 2. Deep Reading: Extract content and headers.
 * 3. Sync Status: Report missing translations.
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

export interface SyncStatus {
  id: string;
  enTitle: string;
  zhTitle?: string;
  status: 'synced' | 'missing_zh' | 'missing_en' | 'orphan';
}

export interface PageContent {
  content: string;
  frontmatter: { title: string; [key: string]: any };
  title: string;
  lang: 'en' | 'zh';
  filePath: string; // Virtual file path for transparency
  isFallback?: boolean;
  availableLanguages: ('en' | 'zh')[];
}

// 1. FULL META REGISTRY (Updated based on provided file context)
const META_INDEX: Record<string, Record<string, Record<string, string>>> = {
  en: {
    introduction: {
      settings: "LLM Settings",
      basics: "Basics of Prompting",
      elements: "Prompt Elements",
      tips: "General Tips for Designing Prompts",
      examples: "Examples of Prompts"
    },
    techniques: {
      zeroshot: "Zero-shot Prompting",
      fewshot: "Few-shot Prompting",
      cot: "Chain-of-Thought Prompting",
      "meta-prompting": "Meta Prompting",
      consistency: "Self-Consistency",
      knowledge: "Generate Knowledge Prompting",
      prompt_chaining: "Prompt Chaining",
      tot: "Tree of Thoughts",
      rag: "Retrieval Augmented Generation",
      art: "Automatic Reasoning and Tool-use",
      ape: "Automatic Prompt Engineer",
      activeprompt: "Active-Prompt",
      dsp: "Directional Stimulus Prompting",
      pal: "Program-Aided Language Models",
      react: "ReAct",
      reflexion: "Reflexion",
      multimodalcot: "Multimodal CoT",
      graph: "Graph Prompting"
    },
    agents: {
      introduction: "Introduction to Agents",
      components: "Agent Components",
      "ai-workflows-vs-ai-agents": "AI Workflows vs AI Agents",
      "context-engineering": "Context Engineering for AI Agents",
      "context-engineering-deep-dive": "Context Engineering Deep Dive",
      "deep-agents": "Deep Agents"
    },
    guides: {
      "optimizing-prompts": "Optimizing Prompts",
      "deep-research": "OpenAI Deep Research",
      "reasoning-llms": "Reasoning LLMs"
    },
    applications: {
      "finetuning-gpt4o": "Fine-tuning GPT-4o",
      function_calling: "Function Calling",
      "context-caching": "Context Caching with LLMs",
      generating: "Generating Data",
      synthetic_rag: "Generating Synthetic Dataset for RAG",
      generating_textbooks: "Tackling Generated Datasets Diversity",
      coding: "Generating Code",
      workplace_casestudy: "Graduate Job Classification Case Study",
      pf: "Prompt Function"
    },
    prompts: {
      classification: "Classification",
      coding: "Coding",
      creativity: "Creativity",
      evaluation: "Evaluation",
      "information-extraction": "Information Extraction",
      "image-generation": "Image Generation",
      mathematics: "Mathematics",
      "question-answering": "Question Answering",
      reasoning: "Reasoning",
      "text-summarization": "Text Summarization",
      truthfulness: "Truthfulness",
      "adversarial-prompting": "Adversarial Prompting"
    },
    models: {
      chatgpt: "ChatGPT",
      "claude-3": "Claude 3",
      "code-llama": "Code Llama",
      flan: "Flan",
      gemini: "Gemini",
      "gemini-advanced": "Gemini Advanced",
      "gemini-pro": "Gemini 1.5 Pro",
      gemma: "Gemma",
      "gpt-4": "GPT-4",
      "grok-1": "Grok-1",
      llama: "LLaMA",
      "llama-3": "Llama 3",
      "mistral-7b": "Mistral 7B",
      "mistral-large": "Mistral Large",
      mixtral: "Mixtral",
      "mixtral-8x22b": "Mixtral 8x22B",
      olmo: "OLMo",
      "phi-2": "Phi-2",
      sora: "Sora",
      collection: "LLM Collection"
    },
    risks: {
      adversarial: "Adversarial Prompting",
      factuality: "Factuality",
      biases: "Biases"
    },
    research: {
      "llm-agents": "LLM Agents",
      rag: "RAG for LLMs",
      "llm-reasoning": "LLM Reasoning",
      "rag-faithfulness": "RAG Faithfulness",
      "llm-recall": "LLM In-Context Recall",
      "rag_hallucinations": "RAG Reduces Hallucination",
      "synthetic_data": "Synthetic Data",
      thoughtsculpt: "ThoughtSculpt",
      "infini-attention": "Infini-Attention",
      "guided-cot": "LM-Guided CoT",
      "trustworthiness-in-llms": "Trustworthiness in LLMs",
      "llm-tokenization": "LLM Tokenization",
      groq: "What is Groq?"
    }
  },
  zh: {
    introduction: {
      settings: "大语言模型设置",
      basics: "基本概念",
      elements: "提示词要素",
      tips: "设计提示的通用技巧",
      examples: "提示词示例"
    },
    techniques: {
      zeroshot: "零样本提示",
      fewshot: "少样本提示",
      cot: "链式思考（CoT）提示",
      consistency: "自我一致性",
      knowledge: "生成知识提示",
      prompt_chaining: "Prompt Chaining",
      tot: "思维树（ToT）",
      rag: "检索增强生成 (RAG)",
      art: "自动推理并使用工具（ART）",
      ape: "自动提示工程师",
      activeprompt: "Active-Prompt",
      dsp: "方向性刺激提示",
      pal: "Program-Aided Language Models",
      react: "ReAct框架",
      reflexion: "Reflexion",
      multimodalcot: "多模态思维链提示方法",
      graph: "基于图的提示"
    },
    agents: {
      // Agents ZH meta is missing in the provided context
    },
    guides: {
      // Guides ZH meta is missing in the provided context
    },
    applications: {
      generating: "生成数据",
      coding: "代码生成",
      workplace_casestudy: "毕业生工作分类案例研究",
      pf: "提示函数"
    },
    prompts: {
      classification: "分类",
      coding: "代码",
      creativity: "创意",
      evaluation: "评估",
      "information-extraction": "信息提取",
      "image-generation": "图像生成",
      mathematics: "数学",
      "question-answering": "问答",
      reasoning: "推理",
      "text-summarization": "摘要",
      truthfulness: "真实性",
      "adversarial-prompting": "对抗性提示"
    },
    models: {
      flan: "Flan",
      chatgpt: "ChatGPT",
      llama: "LLaMA",
      "gpt-4": "GPT-4",
      "mistral-7b": "Mistral 7B",
      gemini: "Gemini",
      "gemini-advanced": "Gemini Advanced",
      "gemini-pro": "Gemini 1.5 Pro",
      "phi-2": "Phi-2",
      mixtral: "Mixtral",
      "code-llama": "Code Llama",
      olmo: "OLMo",
      sora: "Sora",
      collection: "Model Collection"
    },
    risks: {
      adversarial: "对抗性提示",
      factuality: "真实性",
      biases: "偏见"
    },
    research: {
      "llm-agents": "LLM 智能体",
      rag: "RAG for LLMs",
      "llm-reasoning": "LLM Reasoning",
      "rag-faithfulness": "RAG Faithfulness",
      "llm-recall": "LLM In-Context Recall",
      "rag_hallucinations": "RAG Reduces Hallucination",
      "synthetic_data": "Synthetic Data",
      thoughtsculpt: "ThoughtSculpt",
      "infini-attention": "Infini-Attention",
      "guided-cot": "LM-Guided CoT",
      "trustworthiness-in-llms": "Trustworthiness in LLMs",
      "llm-tokenization": "LLM Tokenization",
      groq: "Groq 是什么？"
    }
  }
};

// 2. CONTENT DATABASE (Simulating File System)
// We populate this with sample content. In a real Nextra app, this would be MDX files.
const CONTENT_DB: Record<string, Record<string, string>> = {
  "techniques/cot": {
    en: `# Chain-of-Thought Prompting\n\nChain-of-thought (CoT) prompting enables complex reasoning capabilities through intermediate reasoning steps.\n\n![CoT Example](/img/cot.png "Chain of Thought Visualization")`,
    zh: `# 链式思考 (CoT) 提示\n\n链式思考 (Chain-of-Thought, CoT) 提示通过展示中间推理步骤，赋予模型处理复杂逻辑的能力。\n\n> 核心思想：让模型“把想法写出来”。`
  },
  "techniques/zeroshot": {
    en: `# Zero-Shot Prompting\n\nLarge Language Models (LLMs) are capable of performing tasks without any examples.`,
    zh: `# 零样本提示\n\n现代大语言模型 (LLMs) 能够在没有任何示例的情况下执行任务。`
  },
  "techniques/fewshot": {
    en: `# Few-Shot Prompting\n\nFew-shot prompting provides a few examples to the model to guide its generation.`,
    zh: `# 少样本提示\n\n少样本提示 (Few-Shot) 通过向模型提供少量的输入输出示例，来引导模型理解任务意图。`
  },
  "introduction/basics": {
    en: `# Basics of Prompting\n\nPrompt engineering is the art of communicating with AI.`,
    zh: `# 提示词基础\n\n提示工程是一门与 AI 交流的艺术。`
  },
  // Example of missing ZH content to test fallback/audit
  "agents/introduction": {
    en: `# Introduction to Agents\n\nAgents are systems that use LLMs as reasoning engines to determine which actions to take and in what order.`
    // zh intentionally missing
  }
};

export const ContentService = {
  // Get Navigation Tree
  getTree: (lang: 'en' | 'zh' = 'zh'): CategoryStructure[] => {
    const root = META_INDEX[lang] || META_INDEX['en'];
    
    return Object.keys(root).map(catId => ({
      id: catId,
      title: (root as any)[catId]?.['__title'] || catId.toUpperCase(), // Simplified title logic
      pages: Object.entries(root[catId] || {}).map(([pageId, title]) => ({
        id: pageId,
        title: title as string,
        category: catId,
        path: `${catId}/${pageId}`
      }))
    }));
  },

  // Deep Drill: Get Page Content with Strict File Resolution
  getPage: async (path: string, lang: 'en' | 'zh' = 'zh'): Promise<PageContent> => {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const entry = CONTENT_DB[cleanPath];
    
    // 1. Determine Availability
    const availableLanguages: ('en'|'zh')[] = entry ? (Object.keys(entry) as ('en'|'zh')[]) : [];
    
    // 2. Strict Resolution Logic
    // If requested 'zh', look for *.zh.mdx (entry['zh'])
    if (lang === 'zh') {
      if (entry && entry['zh']) {
        return {
          content: entry['zh'],
          frontmatter: { title: META_INDEX['zh'][cleanPath.split('/')[0]]?.[cleanPath.split('/')[1]] || 'Untitled' },
          title: META_INDEX['zh'][cleanPath.split('/')[0]]?.[cleanPath.split('/')[1]] || 'Untitled',
          lang: 'zh',
          filePath: `pages/${cleanPath}.zh.mdx`,
          availableLanguages
        };
      }
      // Fallback: If ZH missing, force load EN but flag it
      if (entry && entry['en']) {
        return {
          content: entry['en'],
          frontmatter: { title: META_INDEX['en'][cleanPath.split('/')[0]]?.[cleanPath.split('/')[1]] || 'Untitled' },
          title: META_INDEX['en'][cleanPath.split('/')[0]]?.[cleanPath.split('/')[1]] || 'Untitled',
          lang: 'en',
          filePath: `pages/${cleanPath}.en.mdx`, // We are reading the EN file
          isFallback: true,
          availableLanguages
        };
      }
    }

    // If requested 'en'
    if (lang === 'en') {
      if (entry && entry['en']) {
        return {
          content: entry['en'],
          frontmatter: { title: META_INDEX['en'][cleanPath.split('/')[0]]?.[cleanPath.split('/')[1]] || 'Untitled' },
          title: META_INDEX['en'][cleanPath.split('/')[0]]?.[cleanPath.split('/')[1]] || 'Untitled',
          lang: 'en',
          filePath: `pages/${cleanPath}.en.mdx`,
          availableLanguages
        };
      }
    }

    // 3. Stub Generation (If file totally missing)
    const [cat, page] = cleanPath.split('/');
    const stubTitle = META_INDEX[lang]?.[cat]?.[page] || page;
    return {
      content: `# ${stubTitle}\n\n<Callout type="warning">${lang === 'zh' ? '该模块内容正在同步中...' : 'Content pending...'}</Callout>`,
      frontmatter: { title: stubTitle },
      title: stubTitle,
      lang: lang,
      filePath: `pages/${cleanPath}.${lang}.mdx (Virtual)`,
      availableLanguages: []
    };
  },

  // Audit Tool: Generate Sync Report
  getSyncReport: (): SyncStatus[] => {
    const report: SyncStatus[] = [];
    const enStructure = META_INDEX['en'];
    const zhStructure = META_INDEX['zh'];

    Object.keys(enStructure).forEach(catId => {
      Object.keys(enStructure[catId]).forEach(pageId => {
        const path = `${catId}/${pageId}`;
        const entry = CONTENT_DB[path];
        
        const enTitle = enStructure[catId][pageId];
        const zhTitle = zhStructure[catId]?.[pageId];

        let status: SyncStatus['status'] = 'synced';
        
        const hasEnContent = entry && entry['en'];
        const hasZhContent = entry && entry['zh'];

        // Strict meta check + content check
        if (!zhTitle) status = 'missing_zh';
        else if (hasEnContent && !hasZhContent) status = 'missing_zh';
        else if (!hasEnContent && !hasZhContent) status = 'orphan';
        else if (!hasEnContent && hasZhContent) status = 'missing_en';

        report.push({
          id: path,
          enTitle,
          zhTitle: zhTitle || '---',
          status
        });
      });
    });

    return report;
  }
};
