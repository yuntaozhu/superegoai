
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

// Initial Mock Data representing the "AI First" Curriculum
let DYNAMIC_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  // LESSON 1: COGNITIVE ARCHITECTURE
  {
    id: "L1-01",
    lesson: "Lesson 1: Cognitive Architecture",
    title: "FTI Architecture",
    content: "FTI stands for Capture, Organize, Distill, Express. It is the fundamental data flow for a Second Brain.",
    context: "Defining the core data pipeline of the SuperEgo methodology.",
    parentDoc: "FTI Architecture is the backbone of the Second Brain. 'Capture' involves gathering raw signals (Articles, Papers). 'Organize' filters signal from noise using AI. 'Distill' compresses information into knowledge crystals (Summaries, Models). 'Express' turns knowledge into assets (Code, Blogs). Unlike traditional note-taking, FTI focuses on the 'flow' of information rather than static storage.",
    type: "architecture",
    tags: ["FTI", "Basics", "Data Flow", "Second Brain"]
  },
  {
    id: "L1-02",
    lesson: "Lesson 1: Cognitive Architecture",
    title: "The Extended Mind Thesis",
    content: "The philosophy that cognitive processes are not located exclusively inside the brain but extend into the environment via tools and digital systems.",
    context: "Philosophical foundation referencing Andy Clark and David Chalmers.",
    parentDoc: "The Extended Mind Thesis suggests that your notebook, smartphone, and AI agents are literal functional parts of your cognitive process. The SuperEgo course implements this by offloading memory and compute to silicon, freeing up biological processing power for intuition and strategy.",
    type: "concept",
    tags: ["Philosophy", "Extended Mind", "Cognition"]
  },

  // LESSON 2: THE GATEKEEPER (INGESTION)
  {
    id: "L2-01",
    lesson: "Lesson 2: The Gatekeeper",
    title: "Salience Network Automation",
    content: "Using AI agents to act as a 'Salience Network', automatically filtering information based on relevance and novelty before it reaches the human brain.",
    context: "Mitigating the Attention Economy through automated filtering.",
    parentDoc: "Biologically, the Salience Network determines what stimuli deserve our attention. In the digital age, this is overwhelmed. We build 'Gatekeeper Agents' using LLMs to score incoming RSS feeds, newsletters, and papers based on user-defined 'Interest Graphs', effectively automating the first layer of attention.",
    type: "technique",
    tags: ["Attention", "Automation", "Agents", "Ingestion"]
  },

  // LESSON 3: ART & AESTHETICS
  {
    id: "L3-01",
    lesson: "Lesson 3: Art & Aesthetics",
    title: "Latent Space Navigation",
    content: "Exploring the high-dimensional vector space of generative models to discover novel aesthetic combinations not found in training data.",
    context: "Moving beyond prompting into mathematical exploration of aesthetics.",
    parentDoc: "Latent Space is the mathematical representation of all possible outputs a model can generate. By mathematically interpolating between vectors (e.g., 'Van Gogh' + 'Cyberpunk'), we can navigate this space to find 'Ghost Styles'—visuals that are mathematically possible but historically non-existent.",
    type: "concept",
    tags: ["Art", "Latent Space", "Generative AI", "Vectors"]
  },
  {
    id: "L3-02",
    lesson: "Lesson 3: Art & Aesthetics",
    title: "Neural Style Transfer",
    content: "An optimization technique used to take two images—a content image and a style reference—and blend them so the output looks like the content image, but 'painted' in the style of the reference.",
    context: "Deconstructing art styles into mathematical loss functions.",
    parentDoc: "Neural Style Transfer uses a pre-trained CNN (like VGG19) to separate content and style representations. By minimizing a content loss and a style loss function simultaneously via gradient descent, we can map the artistic style of a painting onto a photograph.",
    type: "technique",
    tags: ["Art", "Computer Vision", "Style Transfer"]
  },

  // LESSON 4: SIMULATION & FINE-TUNING
  {
    id: "L4-01",
    lesson: "Lesson 4: Simulation",
    title: "LoRA (Low-Rank Adaptation)",
    content: "LoRA freezes pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture.",
    context: "Efficient fine-tuning technique for specializing models.",
    parentDoc: "LoRA (Low-Rank Adaptation) allows fine-tuning large models (like Llama 3 or Mistral) with minimal VRAM. Instead of updating all 7B+ parameters, we update low-rank matrices (representing <1% of parameters). This enables the creation of small, task-specific 'Expert Adapters' that can be hot-swapped at runtime.",
    type: "technique",
    tags: ["Fine-tuning", "LoRA", "Model Training", "Optimization"]
  },
  {
    id: "L4-02",
    lesson: "Lesson 4: Simulation",
    title: "Synthetic Data Generation",
    content: "Using powerful models (like GPT-4) to generate high-quality training datasets (Q&A pairs, code snippets) to fine-tune smaller, local models.",
    context: "Solving the 'Data Scarcity' problem for niche domains.",
    parentDoc: "To build a specialized 'Second Brain', we often lack structured data. We use 'Teacher-Student' distillation: prompting a large model to generate diverse, high-quality synthetic examples, filtering them for quality, and using them to train a smaller, private model.",
    type: "technique",
    tags: ["Data", "Synthetic Data", "Distillation"]
  },

  // LESSON 5: CONNECTION (RAG)
  {
    id: "L5-01",
    lesson: "Lesson 5: Connection",
    title: "Contextual Retrieval",
    content: "A RAG improvement technique where a context summary is generated and prepended to each chunk before embedding, preserving the semantic meaning of isolated text.",
    context: "Fixing the 'Lost in the Middle' problem in naive RAG.",
    parentDoc: "Contextual Retrieval solves the issue where individual chunks lose meaning when separated from their parent document (e.g., a chunk saying 'The company revenue grew' without mentioning *which* company). We use an LLM to generate a specific summary of the parent document and prepend it to the chunk before embedding. This ensures the vector representation captures the full context for accurate retrieval.",
    type: "technique",
    tags: ["RAG", "Embeddings", "Optimization", "Anthropic"]
  },
  {
    id: "L5-02",
    lesson: "Lesson 5: Connection",
    title: "Hybrid Search (BM25 + Vector)",
    content: "Combining keyword-based sparse search (BM25) with semantic dense vector search to capture both exact matches and conceptual similarities.",
    context: "Improving retrieval precision.",
    parentDoc: "Vector search is great for concepts, but fails at exact keywords (like specific part numbers or names). BM25 is great for keywords but misses context. Hybrid Search merges these using Reciprocal Rank Fusion (RRF) to get the best of both worlds.",
    type: "technique",
    tags: ["RAG", "Search", "Vector DB"]
  },

  // LESSON 6: EVOLUTION (AGENTS)
  {
    id: "L6-01",
    lesson: "Lesson 6: Evolution",
    title: "Agentic RAG",
    content: "Moving beyond static retrieval to dynamic agents that can reason about a query, use tools, and iteratively search until satisfied.",
    context: "The evolution from passive knowledge bases to active thinking systems.",
    parentDoc: "Unlike static RAG, an Agentic RAG system uses an LLM (The Brain) to reason about the user's query first. It may decide to rewrite the query, search multiple times, filter results, or call external tools (like a Calculator or Python interpreter) before generating an answer. It introduces a 'Thinking Loop' into the retrieval process.",
    type: "architecture",
    tags: ["Agents", "RAG", "Reasoning", "LangGraph"]
  },
  {
    id: "L6-02",
    lesson: "Lesson 6: Evolution",
    title: "Self-Correction Loops",
    content: "A system design where the Agent evaluates its own output (or retrieved documents) for relevance and hallucinations, and re-tries if the quality is low.",
    context: "Ensuring reliability in autonomous systems.",
    parentDoc: "In advanced agentic workflows, we implement a 'Critic' node. After the Agent generates an answer, the Critic evaluates it against the retrieved evidence. If the answer is not supported by facts (hallucination) or doesn't answer the query, the system loops back to the search step with a refined query.",
    type: "technique",
    tags: ["Agents", "Reliability", "Metacognition"]
  },
  
  // QUANT PLANET EXTRA
  {
    id: "L7-01",
    lesson: "Lesson 7: Quant",
    title: "VectorBT",
    content: "A high-performance library for backtesting trading strategies using vectorized operations in Python.",
    context: "Core tool for the Quant Planet automated trading pipeline.",
    parentDoc: "VectorBT allows analysts to test thousands of strategy parameter combinations in seconds by leveraging NumPy and Pandas broadcasting, rather than iterating through rows like traditional backtesters. This speed is essential for the 'Evolutionary Strategy Optimization' phase.",
    type: "technique",
    tags: ["Quant", "Backtesting", "Python", "Finance"]
  }
];

export const searchKnowledgeBase = (
  query: string, 
  topK: number = 3, 
  strategy: 'naive' | 'parent-doc' | 'contextual' = 'naive'
): any[] => {
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
  .sort((a, b) => (b.score || 0) - (a.score || 0))
  .slice(0, topK);

  // Apply Lesson 5: RAG Strategy Formatting
  return results.map(item => {
    const base = { title: item.title, content: item.content, score: item.score };
    
    if (strategy === 'naive') {
      return { ...base, _note: "Strategy: Naive (Only Chunk)" };
    }
    
    if (strategy === 'parent-doc') {
      return { 
        ...base, 
        parent_document: item.parentDoc,
        _note: "Strategy: Parent Document (Broad Context)" 
      };
    }
    
    if (strategy === 'contextual') {
      return { 
        ...base, 
        contextual_summary: item.context,
        _note: "Strategy: Contextual (High Precision)" 
      };
    }
    
    return base;
  });
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
