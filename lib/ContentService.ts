
/**
 * ContentService: Metadata-Driven Knowledge Indexer
 * Replicates Nextra/dair-ai logic for structured documentation.
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

// 1. Meta Registry (Extracted from provided _meta.json files in prompt-engineering/)
const CATEGORY_MAP: Record<string, Record<string, string>> = {
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
    "consistency": "Self-Consistency",
    "knowledge": "Generated Knowledge"
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
};

const CATEGORY_TITLES: Record<string, string> = {
  introduction: "Introduction",
  techniques: "Prompting Techniques",
  applications: "Applications",
  research: "LLM Research",
  risks: "Risks & Misuses"
};

// 2. Comprehensive Content Store
const SOURCE_CONTENT: Record<string, string> = {
  "introduction/basics": `---
title: Basics of Prompting
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

LLMs today, trained on large amounts of data and tuned to follow instructions, are capable of performing tasks zero-shot.

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

Note that in the prompt above we didn't provide the model with any examples -- that's the zero-shot capabilities at work.
`,
  "techniques/fewshot": `---
title: Few-shot Prompting
---
# Few-shot Prompting

While LLMs demonstrate remarkable zero-shot capabilities, they still fall short on more complex tasks. Few-shot prompting enables **In-Context Learning**.

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
`,
  "techniques/cot": `---
title: Chain-of-Thought
---
# Chain-of-Thought (CoT)

Introduced in Wei et al. (2022), CoT prompting enables complex reasoning capabilities through intermediate reasoning steps.

<Callout type="idea">
Simply adding "Let's think step by step" to a prompt can trigger Zero-shot CoT.
</Callout>

### Reasoning Example
\`\`\`text
The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.
A: Adding all the odd numbers (9, 15, 1) gives 25. The answer is False.

The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1. 
A:
\`\`\`

<Cards>
  <Card title="Self-Consistency" href="techniques/consistency">Sampling multiple reasoning paths.</Card>
  <Card title="Zero-shot CoT" href="techniques/zeroshot">Triggering logic without examples.</Card>
</Cards>
`,
  "techniques/react": `---
title: ReAct Framework
---
# ReAct Framework

ReAct (Reason + Act) combines reasoning traces and task-specific actions in an interleaved manner.

<Steps>
1. **Thought**: The model plans what to do.
2. **Action**: The model selects a tool (e.g., Search).
3. **Observation**: The model reads the tool's output.
4. **Loop**: The model updates its thinking based on results.
</Steps>

<Callout type="error">
Without ReAct, LLMs are limited to their training data. ReAct connects them to the real world.
</Callout>
`
};

export const ContentService = {
  getTree: (): CategoryStructure[] => {
    return Object.entries(CATEGORY_MAP).map(([catId, pages]) => ({
      id: catId,
      title: CATEGORY_TITLES[catId] || catId.toUpperCase(),
      pages: Object.entries(pages).map(([pageId, title]) => ({
        id: pageId,
        title,
        category: catId,
        path: `${catId}/${pageId}`
      }))
    }));
  },

  getPage: async (path: string) => {
    // Normalize path (ensure no leading slash)
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const raw = SOURCE_CONTENT[cleanPath] || `# ${cleanPath.split('/').pop()}\n\nContent for this module (**${cleanPath}**) is being processed from the prompt-engineering directory...`;
    
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
