
export interface PromptNode {
  id: string;
  title: { zh: string; en: string; ar?: string };
  description: { zh: string; en: string };
  category: string;
  content: string;
  template?: string;
  tags: string[];
}

export const PROMPT_REGISTRY: PromptNode[] = [
  // TECHNIQUES
  {
    id: "zeroshot",
    category: "techniques",
    title: { zh: "零样本提示", en: "Zero-shot Prompting", ar: "التلقين بدون أمثلة مسبقة" },
    description: { zh: "直接向模型描述任务，不提供任何示例。", en: "Describe the task directly without any examples." },
    tags: ["Basic", "Zero-shot"],
    template: "请将以下文本分类为【正面】、【负面】或【中性】：\n文本：{{input}}",
    content: "<h3>零样本提示 (Zero-shot)</h3><p>零样本提示是指直接向大模型下达指令，而不提供任何关于任务的示例。现代大模型（如 Gemini 2.5/3 系列）由于经过大规模指令微调，具备极强的零样本泛化能力。</p><h4>使用场景：</h4><ul><li>简单分类任务</li><li>基础翻译</li><li>摘要生成</li></ul>"
  },
  {
    id: "fewshot",
    category: "techniques",
    title: { zh: "少样本提示", en: "Few-shot Prompting", ar: "التلقين ببضع أمثلة" },
    description: { zh: "提供少量示例，引导模型理解复杂的输出格式或逻辑。", en: "Provide a few examples to guide the model's output format or logic." },
    tags: ["Core", "Context"],
    template: "这太棒了！ // 正面\n这太糟了。 // 负面\n那个电影还可以。 // 中性\n{{input}} // ",
    content: "<h3>少样本提示 (Few-shot)</h3><p>当任务的输出格式极其特殊，或者逻辑较为复杂时，提供 1-5 个示例可以显著提升模型的表现。这在处理低资源语言或特定行业术语时尤为有效。</p>"
  },
  {
    id: "cot",
    category: "techniques",
    title: { zh: "思维链 (CoT)", en: "Chain-of-Thought", ar: "التلقين بسلسلة من الأفكار" },
    description: { zh: "通过展示推理步骤，提升模型在数学和逻辑任务中的表现。", en: "Improve model performance in math and logic by showing reasoning steps." },
    tags: ["Reasoning", "Advanced"],
    template: "让我们一步步思考：\n1. 首先分析{{problem}}的关键要素...\n2. 然后推导其逻辑关系...",
    content: "<h3>思维链 (CoT)</h3><p>思维链通过引入中间推理步骤，使模型能够处理复杂的逻辑推演。对于具有思维能力的模型（如 Gemini 3 Pro），CoT 是激发其深层推理潜能的关键。</p>"
  },
  {
    id: "react",
    category: "techniques",
    title: { zh: "ReAct 框架", en: "ReAct", ar: "ReAct" },
    description: { zh: "协同推理与行动，让模型能够使用外部搜索或数据库工具。", en: "Synergizing reasoning and acting for external tool use." },
    tags: ["Agents", "Tools"],
    template: "思考：我需要查找关于{{query}}的信息。\n行动：搜索[{{query}}]\n观察：[此处为搜索结果]\n思考：根据观察，我发现...",
    content: "<h3>ReAct</h3><p>ReAct (Reason + Act) 是构建 AI Agent 的核心框架。它让模型在行动前进行思考，并根据行动的观察结果调整后续的推理方向。</p>"
  },
  
  // APPLICATIONS
  {
    id: "function_calling",
    category: "applications",
    title: { zh: "函数调用", en: "Function Calling", ar: "استدعاء الدوال" },
    description: { zh: "将自然语言指令转换为结构化的 API 参数。", en: "Convert natural language to structured API parameters." },
    tags: ["Dev", "API"],
    template: "系统提示：你是一个 API 助手。请根据用户需求输出合法的 JSON 格式函数参数。\n用户：{{request}}",
    content: "<h3>函数调用</h3><p>函数调用是连接 LLM 与真实世界的桥梁。它允许模型根据用户意图，生成符合特定 Schema 的参数，从而触发外部代码执行。</p>"
  },
  {
    id: "synthetic_data",
    category: "applications",
    title: { zh: "合成数据生成", en: "Synthetic Data", ar: "توليد البيانات" },
    description: { zh: "利用大模型批量生产高质量的训练或测试数据。", en: "Generate high-quality datasets for training or testing." },
    tags: ["Data", "MLOps"],
    template: "请生成 10 条关于{{topic}}的对话数据，要求包含多样化的意图和情绪。",
    content: "<h3>合成数据生成</h3><p>在缺乏真实数据的情况下，利用高性能模型（如 Gemini 3）生成合成数据已成为主流做法。这可以大幅降低 RAG 系统的冷启动成本。</p>"
  },

  // RESEARCH
  {
    id: "rag_faithfulness",
    category: "research",
    title: { zh: "RAG 忠实度", en: "RAG Faithfulness", ar: "RAG Faithfulness" },
    description: { zh: "研究如何减少 RAG 系统的幻觉问题。", en: "Study on reducing hallucinations in RAG systems." },
    tags: ["RAG", "Reliability"],
    content: "<h3>RAG 忠实度</h3><p>忠实度衡量模型回答是否完全基于检索到的上下文。通过优化 Prompt 约束（如“仅根据提供的文档回答”），可以显著提升系统的可靠性。</p>"
  }
];
