
export interface PromptNode {
  id: string;
  title: { zh: string; en: string; ar: string };
  description: { zh: string; en: string };
  content: string; // Markdown or HTML content
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
        description: { zh: "学习提示工程的基本定义与原则。", en: "Learn the core definitions and principles of prompt engineering." },
        tags: ["Core", "Foundations"],
        content: `<h3>提示工程 (Prompt Engineering)</h3><p>提示工程是与大语言模型（LLM）进行高效交流的艺术与科学。它涉及设计、优化和精炼输入（提示词），以引导模型产生更准确、更有用或更具创造性的输出。</p><h4>核心原则：</h4><ul><li><b>清晰性：</b> 避免模糊的表达，明确告诉模型你想要什么。</li><li><b>上下文：</b> 提供相关的背景信息，帮助模型理解任务环境。</li><li><b>约束：</b> 设定输出格式、长度或语气限制。</li></ul>`
      },
      {
        id: "elements",
        title: { zh: "提示词要素", en: "Prompt Elements", ar: "عناصر الأوامر" },
        description: { zh: "构成一个完美提示词的四大核心组件。", en: "The four key components that make up a perfect prompt." },
        tags: ["Architecture"],
        content: `<p>一个高效的提示词通常包含以下要素：</p><ol><li><b>指令 (Instruction)：</b> 想要模型执行的具体任务。</li><li><b>上下文 (Context)：</b> 外部信息或补充背景。</li><li><b>输入数据 (Input Data)：</b> 我们希望模型处理的具体问题。</li><li><b>输出指示 (Output Indicator)：</b> 指定输出的类型或格式。</li></ol>`
      }
    ]
  },
  {
    id: "techniques",
    title: { zh: "进阶技术", en: "Techniques" },
    icon: "Layers",
    nodes: [
      {
        id: "zeroshot",
        title: { zh: "零样本提示", en: "Zero-Shot Prompting", ar: "التلقين بدون أمثلة مسبقة" },
        description: { zh: "在没有任何示例的情况下让模型执行任务。", en: "Performing tasks without any prior examples given to the model." },
        tags: ["Logic"],
        content: `<p>Zero-shot 依靠模型在大规模预训练中获得的先验知识。直接提出问题，模型根据其内部表示生成答案。</p><blockquote>Prompt: 判定以下文本的情感：'今天的天气真不错！'<br>Output: 正面/积极</blockquote>`
      },
      {
        id: "fewshot",
        title: { zh: "少样本提示", en: "Few-Shot Prompting", ar: "التلقين ببضع أمثلة" },
        description: { zh: "通过提供少量示例来提高模型的任务执行能力。", en: "Improving performance by providing a few examples of the task." },
        tags: ["Improvement"],
        content: `<p>Few-shot 通过在提示中包含“输入-输出”对，引导模型模仿特定模式。适用于复杂格式或罕见任务。</p>`
      },
      {
        id: "cot",
        title: { zh: "思维链 (CoT)", en: "Chain-of-Thought", ar: "التلقين بسلسلة من الأفكار" },
        description: { zh: "通过引导模型解释其推理过程来解决复杂逻辑问题。", en: "Solving complex logic problems by letting the model explain its reasoning step-by-step." },
        tags: ["Reasoning", "Advanced"],
        content: `<p>CoT 极大地提高了模型在数学、符号推理和常识任务上的表现。核心是让模型“一步步思考”。</p><h4>技巧：</h4><p>在提示词末尾加上：<b>"Let's think step by step."</b></p>`
      }
    ]
  },
  {
    id: "prompts_library",
    title: { zh: "提示词库", en: "Prompt Library" },
    icon: "Sparkles",
    nodes: [
      {
        id: "classification",
        title: { zh: "情感与分类", en: "Classification", ar: "التصنيف" },
        description: { zh: "如何训练模型进行精准的文本分类。", en: "Strategies for high-accuracy text categorization." },
        tags: ["NLP", "Industry"],
        content: `<p>文本分类是提示词工程最常见的应用之一。从垃圾邮件识别到工单分类，利用指令设定类别标签是关键。</p>`
      },
      {
        id: "coding",
        title: { zh: "代码生成", en: "Coding Prompts", ar: "كتابة أكواد" },
        description: { zh: "提升 AI 生成代码的质量与安全性。", en: "Elevate the quality and security of AI-generated code." },
        tags: ["Dev", "Software"],
        content: `<p>生成代码时，建议提供技术栈版本、性能要求以及具体的错误处理逻辑。</p>`
      }
    ]
  },
  {
    id: "risks",
    title: { zh: "风险与伦理", en: "Risks & Ethics" },
    icon: "ShieldAlert",
    nodes: [
      {
        id: "adversarial",
        title: { zh: "对抗性提示词", en: "Adversarial Prompting", ar: "التلقين العكسي" },
        description: { zh: "识别并防御提示词注入与越狱攻击。", en: "Identifying and defending against injection and jailbreak attacks." },
        tags: ["Security", "Safety"],
        content: `<p>对抗性提示词通过精巧设计的输入绕过模型的安全过滤。作为架构师，你需要设计多层检测机制来防御此类攻击。</p>`
      }
    ]
  }
];
