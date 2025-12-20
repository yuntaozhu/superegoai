
export interface PromptNode {
  id: string;
  title: { zh: string; en: string; ar: string };
  description: { zh: string; en: string };
  content: string; 
  template?: string; // 可直接使用的模板
  tags: string[];
}

export interface PromptCategory {
  id: string;
  title: { zh: string; en: string };
  icon: string;
  nodes: PromptNode[];
}

export const PROMPT_GUIDE_DATA: PromptCategory[] = [
  {
    id: "introduction",
    title: { zh: "基础入门", en: "Introduction" },
    icon: "Terminal",
    nodes: [
      {
        id: "basics",
        title: { zh: "提示词基础", en: "Prompt Basics", ar: "أساسيات التلقين" },
        description: { zh: "掌握提示工程的基本定义与原则。", en: "Master the definitions and principles of PE." },
        tags: ["Core", "Beginner"],
        template: "请作为一名[角色]，针对[任务]，在[背景]下提供[输出格式]。",
        content: `<h3>提示工程 (Prompt Engineering)</h3><p>提示工程是优化大语言模型（LLM）输入以获得高质量输出的艺术。核心原则：</p><ul><li><b>明确性：</b> 不要让模型猜测你的意图。</li><li><b>情境化：</b> 提供足够的背景信息。</li><li><b>分步引导：</b> 将复杂任务拆解。</li></ul>`
      }
    ]
  },
  {
    id: "techniques",
    title: { zh: "核心技术", en: "Techniques" },
    icon: "Layers",
    nodes: [
      {
        id: "cot",
        title: { zh: "思维链 (CoT)", en: "Chain-of-Thought", ar: "سلسلة من الأفكار" },
        description: { zh: "引导模型展示推理过程，提升逻辑任务表现。", en: "Improve logic by showing reasoning steps." },
        tags: ["Reasoning", "Advanced"],
        template: "让我们一步步思考：首先分析[A]，然后推导[B]。",
        content: `<h3>思维链 (Chain-of-Thought)</h3><p>通过让模型在输出答案前生成中间推理步骤，可以显著提高处理数学、常识推理和符号操作任务的能力。</p><h4>最佳实践：</h4><p>在 Prompt 中加入 "Let's think step by step" 或提供一个包含中间步骤的 Few-shot 示例。</p>`
      },
      {
        id: "react",
        title: { zh: "ReAct 框架", en: "ReAct", ar: "ReAct" },
        description: { zh: "结合推理与行动，让模型使用外部工具。", en: "Synergizing reasoning and acting for tool use." },
        tags: ["Agents", "Workflow"],
        content: `<h3>ReAct (Reason + Act)</h3><p>ReAct 允许模型以交替的方式生成推理轨迹和特定于任务的行动。这种协同作用使模型能够动态地推理并与外部环境（如 Google 搜索或数据库）交互。</p>`
      }
    ]
  },
  {
    id: "applications",
    title: { zh: "应用场景", en: "Applications" },
    icon: "Code",
    nodes: [
      {
        id: "function_calling",
        title: { zh: "函数调用", en: "Function Calling", ar: "استدعاء الدوال" },
        description: { zh: "将模型能力连接到外部 API 和工具。", en: "Connect models to external APIs and tools." },
        tags: ["Dev", "Integration"],
        content: `<h3>函数调用 (Function Calling)</h3><p>现代模型（如 Gemini 1.5 Pro）支持结构化输出，可以将用户意图转化为特定的函数参数。这是构建 AI 智能体的基础。</p>`
      },
      {
        id: "synthetic_data",
        title: { zh: "合成数据生成", en: "Data Generation", ar: "توليد البيانات" },
        description: { zh: "利用 LLM 批量生成高质量训练数据。", en: "Generate high-quality datasets using LLMs." },
        tags: ["MLOps", "Data"],
        content: `<h3>数据生成</h3><p>LLM 可以根据分布描述生成大量的合成数据（Text-to-Data），用于冷启动 RAG 系统或微调小模型。</p>`
      }
    ]
  },
  {
    id: "risks",
    title: { zh: "安全性与风险", en: "Risks & Ethics" },
    icon: "ShieldAlert",
    nodes: [
      {
        id: "jailbreaking",
        title: { zh: "越狱防御", en: "Jailbreaking Defence", ar: "كسر الحماية" },
        description: { zh: "防御对抗性提示，保护系统安全。", en: "Defend against adversarial prompt injections." },
        tags: ["Security", "Safety"],
        content: `<h3>越狱防御 (Jailbreaking)</h3><p>对抗性提示旨在绕过模型的内置过滤器。防御策略包括：</p><ul><li><b>分隔符：</b> 使用独特的标记（如 ###）分隔指令和输入。</li><li><b>二次验证：</b> 使用专门的安全分类模型检查输入。</li></ul>`
      }
    ]
  }
];
