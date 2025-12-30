
export interface KnowledgeChunk {
  id: string;
  lesson: string;
  title: string;
  content: string; // The specific chunk
  context?: string; // The "Contextual Retrieval" header
  parentDoc?: string; // The "Parent Document" for parent retrieval strategy
  type: 'concept' | 'technique' | 'architecture';
  tags: string[];
  score?: number; // Similarity score simulation
}

export const MOCK_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "L1-01",
    lesson: "Lesson 1: Cognitive Architecture",
    title: "FTI Architecture",
    content: "FTI stands for Capture, Organize, Distill, Express. It is the fundamental data flow for a Second Brain.",
    context: "This chunk defines the core data pipeline of the Second Brain methodology taught in Lesson 1.",
    parentDoc: "FTI Architecture is the backbone of the Second Brain. 'Capture' involves gathering raw signals. 'Organize' filters signal from noise. 'Distill' compresses information into knowledge crystals. 'Express' turns knowledge into assets. Unlike traditional note-taking, FTI focuses on the 'flow' of information.",
    type: "architecture",
    tags: ["FTI", "Basics"]
  },
  {
    id: "L1-02",
    lesson: "Lesson 1: Cognitive Architecture",
    title: "The Extended Mind Thesis",
    content: "The philosophy that cognitive processes are not located exclusively inside the brain but extend into the environment.",
    context: "Philosophical foundation of the course, referencing Andy Clark and David Chalmers.",
    parentDoc: "The Extended Mind Thesis suggests that your notebook, smartphone, and tools are literal parts of your cognitive process. The Second Brain is a practical implementation of this thesis, offloading memory to silicon to free up biological processing power.",
    type: "concept",
    tags: ["Philosophy"]
  },
  {
    id: "L4-01",
    lesson: "Lesson 4: Simulation & Fine-tuning",
    title: "LoRA (Low-Rank Adaptation)",
    content: "LoRA freezes pre-trained weights and injects trainable rank decomposition matrices.",
    context: "Technical definition of the LoRA fine-tuning technique used in the Simulation module.",
    parentDoc: "LoRA (Low-Rank Adaptation) allows fine-tuning large models with minimal VRAM. By freezing the pre-trained model weights and injecting trainable rank decomposition matrices into each layer of the Transformer architecture, we greatly reduce the number of trainable parameters for downstream tasks.",
    type: "technique",
    tags: ["Fine-tuning", "LoRA"]
  },
  {
    id: "L5-01",
    lesson: "Lesson 5: Connection & RAG",
    title: "Contextual Retrieval",
    content: "Prepend a context summary to each chunk before embedding it to fix lost meaning.",
    context: "A specific RAG optimization technique to improve retrieval accuracy.",
    parentDoc: "Contextual Retrieval solves the issue where individual chunks lose meaning when separated from their parent document. The technique involves using an LLM to generate a specific summary of the parent document and prepending it to the chunk before embedding. This ensures the vector representation captures the full context.",
    type: "technique",
    tags: ["RAG", "Embeddings"]
  },
  {
    id: "L6-01",
    lesson: "Lesson 6: Evolution",
    title: "Agentic RAG",
    content: "Agentic RAG uses an LLM to reason about the user's query first, enabling tool use and multi-step retrieval.",
    context: "The evolution from static RAG to dynamic, agent-driven systems.",
    parentDoc: "Unlike static RAG, an Agentic RAG system uses an LLM (The Brain) to reason about the user's query first. It may decide to rewrite the query, search multiple times, filter results, or call external tools (like a Calculator or Python interpreter) before generating an answer.",
    type: "architecture",
    tags: ["Agents", "RAG"]
  }
];

export const searchKnowledgeBase = (query: string, topK: number = 3): KnowledgeChunk[] => {
  const lowerQ = query.toLowerCase();
  // Simple fuzzy simulation with scoring
  const results = MOCK_KNOWLEDGE_BASE.map(item => {
    let score = 0;
    if (item.title.toLowerCase().includes(lowerQ)) score += 0.5;
    if (item.content.toLowerCase().includes(lowerQ)) score += 0.3;
    if (item.tags.some(t => t.toLowerCase().includes(lowerQ))) score += 0.2;
    return { ...item, score: score + Math.random() * 0.1 }; // Add jitter
  })
  .filter(item => item.score > 0.1)
  .sort((a, b) => b.score - a.score);

  return results.slice(0, topK);
};
