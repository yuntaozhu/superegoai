
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
    template: "请将以下文本分类为【正面】、【负面】或【中性】：\n文本：\"我觉得这次更新非常棒，极大地提高了生产力。\"\n分类：",
    content: "<h3>零样本提示 (Zero-shot)</h3><p>零样本提示是指直接向大模型下达指令，而不提供任何关于任务的示例。</p>"
  },
  {
    id: "fewshot",
    category: "techniques",
    title: { zh: "少样本提示", en: "Few-shot Prompting", ar: "التلقين ببضع أمثلة" },
    description: { zh: "提供少量示例，引导模型理解复杂的输出格式或逻辑。", en: "Provide a few examples to guide the model's output format or logic." },
    tags: ["Core", "Context"],
    template: "这太棒了！ // 正面\n这太糟了。 // 负面\n那个电影还可以。 // 中性\n这部剧集制作精良，但节奏稍慢。 // ",
    content: "<h3>少样本提示 (Few-shot)</h3><p>提供 1-5 个示例可以显著提升模型的表现。</p>"
  },
  {
    id: "cot",
    category: "techniques",
    title: { zh: "思维链 (CoT)", en: "Chain-of-Thought", ar: "التلقين بسلسلة من الأفكار" },
    description: { zh: "通过展示推理步骤，提升模型在数学和逻辑任务中的表现。", en: "Improve model performance in math and logic by showing reasoning steps." },
    tags: ["Reasoning", "Advanced"],
    template: "问题：如果一个果园里有 15 棵树，果农今天又种了一些，现在一共有 21 棵。请问果农种了多少棵？\n让我们一步步思考：",
    content: "<h3>思维链 (CoT)</h3><p>让模型在输出答案前生成中间推理步骤。</p>"
  },
  {
    id: "expert_role",
    category: "foundations",
    title: { zh: "专家角色设定", en: "Expert Role Prompting" },
    description: { zh: "赋予 AI 一个特定的专家身份，以获得更专业的回答。", en: "Assign a specific persona to the AI." },
    tags: ["Foundation", "Persona"],
    template: "你是一名拥有 20 年经验的资深软件架构师。请评审以下代码段并指出潜在的性能瓶颈：\n\n[插入代码]",
    content: "<h3>角色设定 (Role Prompting)</h3><p>通过赋予 AI 一个专家身份，可以显著改善其输出的深度和专业度。</p>"
  },
  {
    id: "structured_output",
    category: "applications",
    title: { zh: "结构化输出", en: "Structured Output" },
    description: { zh: "强制 AI 以 JSON 或特定格式输出数据。", en: "Force AI to output JSON or specific schema." },
    tags: ["Dev", "JSON"],
    template: "请提取以下段落中的姓名、日期和地点，并以 JSON 格式输出：\n\n段落：\"张三在 2023 年 5 月 20 日访问了北京。\"",
    content: "<h3>结构化输出</h3><p>对于程序化处理，要求 AI 输出 JSON 格式至关重要。</p>"
  },
  {
    id: "react",
    category: "techniques",
    title: { zh: "ReAct 框架", en: "ReAct", ar: "ReAct" },
    description: { zh: "协同推理与行动，让模型能够使用外部搜索或数据库工具。", en: "Synergizing reasoning and acting for external tool use." },
    tags: ["Agents", "Tools"],
    template: "思考：我需要查找关于当前 AI 趋势的信息。\n行动：搜索 [2025 AI trends]\n观察：[此处为搜索结果]\n思考：根据观察，我发现...",
    content: "<h3>ReAct</h3><p>ReAct (Reason + Act) 是构建 AI Agent 的核心框架。</p>"
  }
];
