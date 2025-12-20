
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
    "settings": "LLM Settings",
    "basics": "Basics of Prompting",
    "elements": "Prompt Elements",
    "tips": "General Tips",
    "examples": "Prompt Examples"
  },
  techniques: {
    "zeroshot": "Zero-shot Prompting",
    "fewshot": "Few-shot Prompting",
    "cot": "Chain-of-Thought",
    "meta-prompting": "Meta Prompting",
    "consistency": "Self-Consistency",
    "react": "ReAct Framework",
    "rag": "RAG Systems"
  },
  applications: {
    "generating": "Generating Data",
    "function_calling": "Function Calling",
    "coding": "Generating Code",
    "pf": "Prompt Functions"
  },
  research: {
    "llm-agents": "LLM Agents",
    "rag-faithfulness": "RAG Faithfulness",
    "synthetic_data": "Synthetic Data",
    "groq": "Hardware & Groq"
  }
};

const CATEGORY_TITLES: Record<string, string> = {
  introduction: "Introduction",
  techniques: "Prompting Techniques",
  applications: "Applications",
  research: "LLM Research",
  risks: "Risks & Misuses"
};

// 2. Content Store (Simulating the filesystem contents from prompt-engineering/guides)
// In a production env, this would be a glob import or API call.
const SOURCE_CONTENT: Record<string, string> = {
  "introduction/basics": `---
title: Basics of Prompting
author: dair-ai
description: Introduction to the basic elements of prompts.
---
# Basics of Prompting

Prompt engineering is about crafting inputs to LLMs to get better results.

<Callout type="info">
The core components are Instructions, Context, Input Data, and Output Indicators.
</Callout>

### Example of a simple prompt:
\`\`\`text
Complete the sentence:
The sky is
\`\`\`
`,
  "techniques/zeroshot": `---
title: Zero-shot Prompting
---
# Zero-shot Prompting

LLMs today are capable of performing tasks without any prior examples.

<Callout type="idea">
Use Zero-shot to test the model's base instruction-following capabilities.
</Callout>

\`\`\`text
Classify the sentiment: "This UI is incredible!"
Sentiment:
\`\`\`
`,
  "techniques/fewshot": `---
title: Few-shot Prompting
---
# Few-shot Prompting

Providing demonstrations enables In-Context Learning.

<Steps>
1. Define the task.
2. Provide 2-5 diverse examples.
3. Provide the new input.
</Steps>

<Cards>
  <Card title="Example: New Words" href="/techniques/zeroshot">Learning "whatpu" through demonstrations.</Card>
  <Card title="Format Consistency" href="/techniques/cot">Ensuring JSON output via few-shot.</Card>
</Cards>
`,
  "techniques/cot": `---
title: Chain-of-Thought
---
# Chain-of-Thought (CoT)

CoT allows models to exhibit complex reasoning through intermediate steps.

<Callout type="warning">
Smaller models often require "Let's think step by step" to trigger reasoning.
</Callout>

### Implementation
\`\`\`text
The cafeteria had 23 apples. If they used 20 to make lunch and bought 6 more, how many apples do they have?
Let's think step by step:
\`\`\`
`
};

export const ContentService = {
  /**
   * Replicates Nextra's directory scanning using the Meta Registry
   */
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

  /**
   * Fetches content and parses Frontmatter using regex (lightweight gray-matter)
   */
  getPage: async (path: string) => {
    const raw = SOURCE_CONTENT[path] || `# ${path.split('/')[1]}\n\nContent is being indexed from the core guides...`;
    
    // Simple Frontmatter Parser
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
      title: frontmatter.title || path.split('/')[1]
    };
  }
};
