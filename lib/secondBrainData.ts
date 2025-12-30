
export interface KnowledgeChunk {
  id: string;
  lesson: string;
  title: string;
  content: string;
  type: 'concept' | 'technique' | 'architecture';
  tags: string[];
}

export const MOCK_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "L1-01",
    lesson: "Lesson 1: Cognitive Architecture",
    title: "FTI Architecture",
    content: "FTI stands for Capture, Organize, Distill, Express. It is the fundamental data flow for a Second Brain. Unlike traditional note-taking, FTI focuses on the 'flow' of information from raw input to actionable output.",
    type: "architecture",
    tags: ["FTI", "Basics"]
  },
  {
    id: "L1-02",
    lesson: "Lesson 1: Cognitive Architecture",
    title: "The Extended Mind Thesis",
    content: "The philosophy that cognitive processes are not located exclusively inside the brain but extend into the environment (e.g., notebooks, smartphones). The Second Brain is a practical implementation of this thesis.",
    type: "concept",
    tags: ["Philosophy"]
  },
  {
    id: "L4-01",
    lesson: "Lesson 4: Simulation & Fine-tuning",
    title: "LoRA (Low-Rank Adaptation)",
    content: "LoRA freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture. This greatly reduces the number of trainable parameters for downstream tasks.",
    type: "technique",
    tags: ["Fine-tuning", "LoRA"]
  },
  {
    id: "L5-01",
    lesson: "Lesson 5: Connection & RAG",
    title: "Contextual Retrieval",
    content: "A RAG technique where you prepend a context summary to each chunk before embedding it. This solves the issue where individual chunks lose meaning when separated from their parent document.",
    type: "technique",
    tags: ["RAG", "Embeddings"]
  },
  {
    id: "L5-02",
    lesson: "Lesson 5: Connection & RAG",
    title: "Parent Document Retrieval",
    content: "Retireving small chunks for semantic matching, but passing the larger 'Parent Document' to the LLM for generation. This balances precise search with comprehensive context.",
    type: "technique",
    tags: ["RAG"]
  },
  {
    id: "L6-01",
    lesson: "Lesson 6: Evolution",
    title: "Agentic RAG",
    content: "Unlike static RAG, an Agentic RAG system uses an LLM to reason about the user's query first. It may decide to rewrite the query, search multiple times, or filter results before generating an answer.",
    type: "architecture",
    tags: ["Agents", "RAG"]
  }
];

export const searchKnowledgeBase = (query: string): KnowledgeChunk[] => {
  const lowerQ = query.toLowerCase();
  // Simple fuzzy simulation
  return MOCK_KNOWLEDGE_BASE.filter(item => 
    item.title.toLowerCase().includes(lowerQ) || 
    item.content.toLowerCase().includes(lowerQ) ||
    item.tags.some(t => t.toLowerCase().includes(lowerQ))
  );
};
