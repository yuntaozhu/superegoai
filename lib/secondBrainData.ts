
export interface KnowledgeChunk {
  id: string;
  lesson: string;
  title: string;
  content: string; // The specific chunk
  context?: string; // The "Contextual Retrieval" header
  parentDoc?: string; // The "Parent Document" for parent retrieval strategy
  type: 'concept' | 'technique' | 'architecture' | 'web_knowledge';
  tags: string[];
  score?: number; // Similarity score simulation
  sourceUrl?: string;
}

// Initial Mock Data
let DYNAMIC_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "L1-01",
    lesson: "Lesson 1: Cognitive Architecture",
    title: "FTI Architecture",
    content: "FTI stands for Capture, Organize, Distill, Express. It is the fundamental data flow for a Second Brain.",
    context: "This chunk defines the core data pipeline of the Second Brain methodology taught in Lesson 1.",
    parentDoc: "FTI Architecture is the backbone of the Second Brain. 'Capture' involves gathering raw signals. 'Organize' filters signal from noise. 'Distill' compresses information into knowledge crystals. 'Express' turns knowledge into assets. Unlike traditional note-taking, FTI focuses on the 'flow' of information.",
    type: "architecture",
    tags: ["FTI", "Basics", "Data Flow"]
  },
  {
    id: "L1-02",
    lesson: "Lesson 1: Cognitive Architecture",
    title: "The Extended Mind Thesis",
    content: "The philosophy that cognitive processes are not located exclusively inside the brain but extend into the environment.",
    context: "Philosophical foundation of the course, referencing Andy Clark and David Chalmers.",
    parentDoc: "The Extended Mind Thesis suggests that your notebook, smartphone, and tools are literal parts of your cognitive process. The Second Brain is a practical implementation of this thesis, offloading memory to silicon to free up biological processing power.",
    type: "concept",
    tags: ["Philosophy", "Extended Mind"]
  },
  {
    id: "L4-01",
    lesson: "Lesson 4: Simulation & Fine-tuning",
    title: "LoRA (Low-Rank Adaptation)",
    content: "LoRA freezes pre-trained weights and injects trainable rank decomposition matrices.",
    context: "Technical definition of the LoRA fine-tuning technique used in the Simulation module.",
    parentDoc: "LoRA (Low-Rank Adaptation) allows fine-tuning large models with minimal VRAM. By freezing the pre-trained model weights and injecting trainable rank decomposition matrices into each layer of the Transformer architecture, we greatly reduce the number of trainable parameters for downstream tasks.",
    type: "technique",
    tags: ["Fine-tuning", "LoRA", "Model Training"]
  },
  {
    id: "L5-01",
    lesson: "Lesson 5: Connection & RAG",
    title: "Contextual Retrieval",
    content: "Prepend a context summary to each chunk before embedding it to fix lost meaning.",
    context: "A specific RAG optimization technique to improve retrieval accuracy.",
    parentDoc: "Contextual Retrieval solves the issue where individual chunks lose meaning when separated from their parent document. The technique involves using an LLM to generate a specific summary of the parent document and prepending it to the chunk before embedding. This ensures the vector representation captures the full context.",
    type: "technique",
    tags: ["RAG", "Embeddings", "Optimization"]
  },
  {
    id: "L6-01",
    lesson: "Lesson 6: Evolution",
    title: "Agentic RAG",
    content: "Agentic RAG uses an LLM to reason about the user's query first, enabling tool use and multi-step retrieval.",
    context: "The evolution from static RAG to dynamic, agent-driven systems.",
    parentDoc: "Unlike static RAG, an Agentic RAG system uses an LLM (The Brain) to reason about the user's query first. It may decide to rewrite the query, search multiple times, filter results, or call external tools (like a Calculator or Python interpreter) before generating an answer.",
    type: "architecture",
    tags: ["Agents", "RAG", "Reasoning"]
  },
  {
    id: "L3-01",
    lesson: "Lesson 3: Art & Aesthetics",
    title: "Neural Style Transfer",
    content: "An optimization technique used to take three images (content, style, input) and blend them.",
    context: "Used in the Art Planet to teach mathematical aesthetics.",
    parentDoc: "Neural Style Transfer uses a pre-trained CNN (like VGG19) to separate content and style representations. By minimizing a content loss and a style loss function simultaneously, we can map the artistic style of a painting onto a photograph.",
    type: "technique",
    tags: ["Art", "Generative AI", "Computer Vision"]
  },
  {
    id: "L7-01",
    lesson: "Lesson 7: Quant",
    title: "VectorBT",
    content: "A high-performance library for backtesting trading strategies using vectorized operations.",
    context: "Core tool for the Quant Planet automated trading pipeline.",
    parentDoc: "VectorBT allows analysts to test thousands of strategy parameter combinations in seconds by leveraging NumPy and Pandas broadcasting, rather than iterating through rows like traditional backtesters.",
    type: "technique",
    tags: ["Quant", "Backtesting", "Python"]
  }
];

export const searchKnowledgeBase = (query: string, topK: number = 3): KnowledgeChunk[] => {
  const lowerQ = query.toLowerCase().trim();
  if (!lowerQ) return [];

  const results = DYNAMIC_KNOWLEDGE_BASE.map(item => {
    let score = 0;
    
    // 1. Exact Title Match (Highest)
    if (item.title.toLowerCase().includes(lowerQ)) score += 15;
    
    // 2. Tag Match (High)
    if (item.tags.some(t => t.toLowerCase().includes(lowerQ))) score += 8;
    
    // 3. Content Match (Medium)
    if (item.content.toLowerCase().includes(lowerQ)) score += 5;
    
    // 4. Context/Parent Match (Low)
    if (item.context?.toLowerCase().includes(lowerQ)) score += 3;
    if (item.parentDoc?.toLowerCase().includes(lowerQ)) score += 2;

    // 5. Multi-term boost
    const terms = lowerQ.split(' ');
    if (terms.length > 1) {
        const matches = terms.filter(term => 
            item.content.toLowerCase().includes(term) || 
            item.title.toLowerCase().includes(term)
        );
        score += matches.length * 1.5;
    }

    // 6. Simulation Jitter (Simulate vector distance variance)
    if (score > 0) {
        score += Math.random() * 0.5;
    }

    return { ...item, score };
  })
  .filter(item => item.score && item.score > 0)
  .sort((a, b) => (b.score || 0) - (a.score || 0));

  return results.slice(0, topK);
};

// Method to add new knowledge from Firecrawl
export const addKnowledge = (chunk: Omit<KnowledgeChunk, 'id' | 'score'>) => {
  const newChunk: KnowledgeChunk = {
    ...chunk,
    id: `WEB-${Date.now()}`,
    score: 0
  };
  DYNAMIC_KNOWLEDGE_BASE.push(newChunk);
  console.log("🧠 New knowledge added to Brain:", newChunk.title);
  return newChunk;
};
