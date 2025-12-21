
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
      introduction: "Agents 简介",
      components: "Agents 组件",
      "ai-workflows-vs-ai-agents": "AI 工作流 vs AI 智能体",
      "context-engineering": "上下文工程",
      "context-engineering-deep-dive": "上下文工程深度解析",
      "deep-agents": "深度智能体"
    },
    guides: {
      "optimizing-prompts": "优化提示词",
      "deep-research": "OpenAI Deep Research",
      "reasoning-llms": "推理型 LLM"
    },
    applications: {
      "finetuning-gpt4o": "微调 GPT-4o",
      function_calling: "函数调用",
      "context-caching": "上下文缓存",
      generating: "生成数据",
      synthetic_rag: "生成 RAG 合成数据",
      generating_textbooks: "处理生成数据集的多样性",
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
  "techniques/tot": {
    en: `# Tree of Thoughts (ToT)\n\nToT maintains a tree of thoughts, where thoughts represent coherent language sequences that serve as intermediate steps toward solving a problem.`,
    zh: `# 思维树 (ToT)\n\n对于需要探索或预判战略的复杂任务来说，传统或简单的提示技巧是不够的。最近，[Yao et al. (2023)](https://arxiv.org/abs/2305.10601) 提出了思维树（Tree of Thoughts，ToT）框架，该框架基于思维链提示进行了总结，引导语言模型探索把思维作为中间步骤来解决通用问题。\n\nToT 维护着一棵思维树，思维由连贯的语言序列表示，这个序列就是解决问题的中间步骤。使用这种方法，LM 能够自己对严谨推理过程中的中间思维进行评估。LM 将生成及评估思维的能力与搜索算法（如广度优先搜索和深度优先搜索）相结合，在系统性探索思维的时候可以向前验证和回溯。\n\n### ToT 框架原理如下：\n\n![ToT Framework](https://www.promptingguide.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTOT.3b13bc5e.png&w=3840&q=75)\n\nToT 需要针对不同的任务定义思维/步骤的数量以及每步的候选选项数量。例如，论文中的“算 24 游戏”是一种数学推理任务，需要分成 3 个思维步骤，每一步都需要一个中间方程。而每个步骤保留最优的（best） 5 个候选选项。\n\nToT 完成算 24 的游戏任务要执行广度优先搜索（BFS），每步思维的候选项都要要求 LM 给出能否得到 24 的评估：“sure/maybe/impossible”（一定能/可能/不可能）。作者讲到：“目的是得到经过少量向前尝试就可以验证正确（sure）的局部解，基于‘太大/太小’的常识消除那些不可能（impossible）的局部解，其余的局部解作为‘maybe’保留。”每步思维都要抽样得到 3 个评估结果。整个过程如下图所示：\n\n![ToT Process](https://www.promptingguide.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTOT2.20339d98.png&w=3840&q=75)\n\n从下图中报告的结果来看，ToT 的表现大大超过了其他提示方法：\n\n![ToT Results](https://www.promptingguide.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FTOT3.0f7f2b94.png&w=3840&q=75)\n\n[这里](https://github.com/princeton-nlp/tree-of-thought-llm)还有[这里](https://github.com/kyegomez/tree-of-thoughts)可以找到代码例子。\n\n从大方向上来看，[Yao et al. (2023)](https://arxiv.org/abs/2305.10601) 和 [Long (2023)](https://arxiv.org/abs/2305.17126) 的核心思路是类似的。两种方法都是以多轮对话搜索树的形式来增强 LLM 解决复杂问题的能力。主要区别在于 [Yao et al. (2023)](https://arxiv.org/abs/2305.10601) 采用了深度优先（DFS）/广度优先（BFS）/集束（beam）搜索，而 [Long (2023)](https://arxiv.org/abs/2305.17126) 则提出了由强化学习（Reinforcement Learning）训练出的“ToT 控制器”（ToT Controller）来驱动树的搜索策略。\n\n[Hulbert (2023)](https://github.com/dave1010/tree-of-thought-prompting) 提出了思维树（ToT）提示法，将 ToT 框架的主要概念概括成了一段简短的提示词，指导 LLM 在一次提示中对中间思维做出评估。\nToT 提示词的例子如下：\n\n\`\`\`text\n假设三位不同的专家来回答这个问题。\n所有专家都写下他们思考这个问题的第一个步骤，然后与大家分享。\n然后，所有专家都写下他们思考的下一个步骤并分享。\n以此类推，直到所有专家写完他们思考的所有步骤。\n只要大家发现有专家的步骤出错了，就让这位专家离开。\n请问...\n\`\`\`\n`
  },
  "techniques/consistency": {
    en: "# Self-Consistency\n\nSelf-consistency aims to replace the naive greedy decoding used in chain-of-thought prompting.",
    zh: "# 自我一致性 (Self-Consistency)\n\n自我一致性（Self-Consistency）旨在替代链式思考提示中使用的朴素贪婪解码。其核心思想是通过少样本 CoT 采样多条推理路径，并使用这些生成结果来选择最一致的答案。"
  },
  "techniques/knowledge": {
    en: "# Generate Knowledge Prompting\n\nUsing the model to generate knowledge before making a prediction.",
    zh: "# 生成知识提示\n\nLLM 能够生成知识信息，用于帮助模型做出更准确的预测。"
  },
  "techniques/rag": {
    en: "# Retrieval Augmented Generation (RAG)\n\nRAG combines an information retrieval component with a text generator model.",
    zh: "# 检索增强生成 (RAG)\n\n检索增强生成（RAG）结合了信息检索组件和文本生成模型。RAG 可以通过引入外部知识库来解决 LLM 的幻觉问题和知识过时问题。"
  },
  
  // --- AGENTS ---
  "agents/introduction": {
    en: `# Introduction to Agents\n\nAgents are systems that use LLMs as reasoning engines to determine which actions to take and in what order.`,
    zh: `# Agents 简介\n\n智能体（Agents）是指将 LLM 作为推理引擎的系统，它们可以决定采取哪些行动以及采取行动的顺序。`
  },
  "agents/components": {
    en: `# Agent Components\n\nAgents consist of three main components: Profile, Memory, and Planning.`,
    zh: `# Agents 组件\n\n智能体通常由三个核心组件构成：\n1. **规划 (Planning)**：子目标分解、反思与改进。\n2. **记忆 (Memory)**：短期记忆（上下文）与长期记忆（向量数据库）。\n3. **工具使用 (Tool Use)**：调用外部 API 获取信息或执行操作。`
  },
  "agents/ai-workflows-vs-ai-agents": {
    en: `# AI Workflows vs AI Agents\n\nWorkflows are deterministic chains. Agents are probabilistic reasoning loops.`,
    zh: `# AI 工作流 vs AI 智能体\n\n**工作流 (Workflows)** 是预定义的、确定性的执行路径。例如：步骤 A -> 步骤 B -> 步骤 C。\n\n**智能体 (Agents)** 是概率性的推理循环。它们自主决定："为了达成目标，我现在应该做什么？"`
  },
  
  // --- GUIDES ---
  "guides/optimizing-prompts": {
    en: `# Optimizing Prompts\n\nStrategies for iteratively improving prompt performance.`,
    zh: `# 优化提示词\n\n提示词优化是一个迭代过程。本指南介绍如何通过 A/B 测试、引入评估指标以及使用更高级的框架（如 DSPy）来系统性地提升提示词效果。`
  },
  "guides/deep-research": {
    en: `# OpenAI Deep Research\n\nAnalyzing the capabilities of deep research models.`,
    zh: `# OpenAI Deep Research\n\n深入分析 OpenAI o1/o3 等具备深度推理能力的模型在科研领域的应用。`
  },

  // --- RISKS ---
  "risks/adversarial": {
    en: `# Adversarial Prompting\n\nTechniques used to bypass safety guardrails.`,
    zh: `# 对抗性提示\n\n对抗性提示（Adversarial Prompting）是指通过精心设计的输入，诱导模型产生本应被安全机制拦截的输出（如仇恨言论、虚假信息等）。常见攻击包括提示词注入（Prompt Injection）和越狱（Jailbreaking）。`
  },
  "risks/factuality": {
    en: `# Factuality\n\nIssues related to hallucinations and incorrect information.`,
    zh: `# 真实性 (Factuality)\n\nLLM 容易产生“幻觉” (Hallucination)，即一本正经地胡说八道。本节讨论如何通过 RAG 和引用来提高真实性。`
  },
  "risks/biases": {
    en: `# Biases\n\nUnderstanding and mitigating biases in LLM outputs.`,
    zh: `# 偏见 (Biases)\n\n模型可能继承训练数据中的社会偏见。了解这些偏见对于负责任的 AI 开发至关重要。`
  },

  // --- APPLICATIONS ---
  "applications/generating": {
    en: "Generating Data",
    zh: "# 生成数据\n\nLLM 不仅能处理数据，还能生成高质量的合成数据（Synthetic Data），用于训练小模型或进行压力测试。"
  },
  "applications/coding": {
    en: "Generating Code",
    zh: "# 代码生成\n\n利用 LLM 生成、解释和调试代码。Copilot 和 Cursor 是这一领域的典型应用。"
  },
  
  // --- MODELS ---
  "models/gemini-pro": {
    en: "Gemini 1.5 Pro",
    zh: "# Gemini 1.5 Pro\n\nGoogle 的中量级模型，具有突破性的 1M+ token 上下文窗口，擅长长文档分析和多模态理解。"
  },
  "models/gpt-4": {
    en: "GPT-4",
    zh: "# GPT-4\n\nOpenAI 的旗舰模型，以其强大的推理能力和多模态支持著称。"
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
          filePath: `prompt-engineering/pages/${cleanPath}.zh.mdx`,
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
          filePath: `prompt-engineering/pages/${cleanPath}.en.mdx`, // We are reading the EN file
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
          filePath: `prompt-engineering/pages/${cleanPath}.en.mdx`,
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
      filePath: `prompt-engineering/pages/${cleanPath}.${lang}.mdx (Virtual)`,
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
