
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
  // --- INTRODUCTION ---
  "introduction/basics": {
    en: `# Basics of Prompting\n\nPrompt engineering is the art of communicating with AI to achieve desired results.`,
    zh: `# 提示词基础\n\n提示工程（Prompt Engineering）是一门通过优化输入（Prompt）来与 AI 交流，从而获得理想输出的艺术。\n\n> 核心理念：**Garbage In, Garbage Out (垃圾进，垃圾出)**。`
  },
  "introduction/elements": {
    en: `# Prompt Elements\n\nA prompt can contain the following elements:\n\n**Instruction** - a specific task or instruction you want the model to perform\n\n**Context** - can involve external information or additional context that can steer the model to better responses\n\n**Input Data** - is the input or question that we are interested to find a response for\n\n**Output Indicator** - indicates the type or format of the output.`,
    zh: `# 提示词要素\n\n一个完善的提示词通常包含以下四个要素：\n\n1. **指令 (Instruction)**\n   - 您希望模型执行的具体任务。\n   - 例如："请翻译"、"请分类"、"请总结"。\n\n2. **上下文 (Context)**\n   - 涉及外部信息或额外的背景，引导模型做出更好的响应。\n   - 例如："作为一名资深软件工程师..."。\n\n3. **输入数据 (Input Data)**\n   - 我们感兴趣的输入或问题。\n   - 例如：需要被翻译的具体文本。\n\n4. **输出指示符 (Output Indicator)**\n   - 指示输出的类型或格式。\n   - 例如："请以 JSON 格式输出"、"请生成 Python 代码"。`
  },
  "introduction/tips": {
    en: `# General Tips for Designing Prompts\n\n1. Start Simple\n2. Be Specific\n3. Avoid Impreciseness`,
    zh: `# 设计提示的通用技巧\n\n### 1. 从简单开始 (Start Simple)\n在开始设计提示时，这是一个迭代的过程。建议从简单的 Prompt 开始，观察结果，然后逐步添加更多上下文或约束。\n\n### 2. 具体明确 (Be Specific)\n对模型下达的指令越具体，结果通常越好。避免模棱两可的描述。\n\n### 3. 避免否定句\n告诉模型**要做什么**，而不是**不要做什么**。`
  },
  "introduction/examples": {
    en: `# Examples of Prompts\n\nHere are some examples of effective prompts for various tasks.`,
    zh: `# 提示词示例\n\n本节将展示一些用于文本摘要、信息提取、问答等任务的标准提示词示例。`
  },
  "introduction/settings": {
    en: `# LLM Settings\n\nTemperature, Top P, and other hyperparameters allow you to control the randomness and determinism of the model.`,
    zh: `# 大语言模型设置\n\n在使用 LLM 时，除了 Prompt 本身，配置参数也至关重要。\n\n- **Temperature**: 控制随机性。较低的值（如 0.2）使输出更确定，较高的值（如 0.8）使输出更具创造性。\n- **Top P**: 核采样。`
  },

  // --- TECHNIQUES ---
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
  "techniques/react": {
    en: `# ReAct Framework\n\nReason + Act. Allowing LLMs to interact with external tools.`,
    zh: `# ReAct 框架\n\nReAct (Reason + Act) 是一种结合了**推理**和**行动**的范式。它允许 LLM 不仅生成文本，还能调用外部工具（如搜索、计算器）来获取信息，从而回答更复杂的问题。`
  },
  
  // --- AGENTS (Simulating EN-only content to test fallback) ---
  "agents/introduction": {
    en: `# Introduction to Agents\n\nAgents are systems that use LLMs as reasoning engines to determine which actions to take and in what order.`
  },
  "agents/components": {
    en: `# Agent Components\n\nAgents consist of three main components: Profile, Memory, and Planning.`
  },
  "agents/ai-workflows-vs-ai-agents": {
    en: `# AI Workflows vs AI Agents\n\nWorkflows are deterministic chains. Agents are probabilistic reasoning loops.`
  },
  "agents/context-engineering": {
    en: `# Context Engineering\n\nThe art of structuring context for optimal agent performance.`
  },
  "agents/context-engineering-deep-dive": {
    en: `# Context Engineering Deep Dive\n\nAdvanced techniques for managing token windows and memory retrieval.`
  },
  "agents/deep-agents": {
    en: `# Deep Agents\n\nRecursive agentic systems capable of self-correction.`
  },

  // --- GUIDES (Simulating EN-only content) ---
  "guides/optimizing-prompts": {
    en: `# Optimizing Prompts\n\nStrategies for iteratively improving prompt performance.`
  },
  "guides/deep-research": {
    en: `# OpenAI Deep Research\n\nAnalyzing the capabilities of deep research models.`
  },
  "guides/reasoning-llms": {
    en: `# Reasoning LLMs\n\nUnderstanding how Chain-of-Thought models process information.`
  },

  // --- RISKS ---
  "risks/adversarial": {
    en: `# Adversarial Prompting\n\nTechniques used to bypass safety guardrails.`,
    zh: `# 对抗性提示\n\n对抗性提示（Adversarial Prompting）是指通过精心设计的输入，诱导模型产生本应被安全机制拦截的输出（如仇恨言论、虚假信息等）。`
  },
  "risks/factuality": {
    en: `# Factuality\n\nIssues related to hallucinations and incorrect information.`,
    zh: `# 真实性 (Factuality)\n\nLLM 容易产生“幻觉” (Hallucination)，即一本正经地胡说八道。本节讨论如何通过 RAG 和引用来提高真实性。`
  },
  "risks/biases": {
    en: `# Biases\n\nUnderstanding and mitigating biases in LLM outputs.`,
    zh: `# 偏见 (Biases)\n\n模型可能继承训练数据中的社会偏见。了解这些偏见对于负责任的 AI 开发至关重要。`
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
