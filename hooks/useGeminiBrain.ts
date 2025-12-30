
import { useState, useRef, useEffect } from 'react';
import { FunctionDeclaration, Type } from "@google/genai";
import { searchKnowledgeBase, addKnowledge } from '../lib/secondBrainData';
import { crawlUrl } from '../lib/firecrawl';
import { getGeminiClient } from '../api/client';
import { GEMINI_CONFIG } from '../api/config';
import { ActiveNodeType } from '../components/ArchitectureMap';
import { useConfigStore } from '../lib/store/configStore';

export interface RAGConfig {
  strategy: 'naive' | 'parent-doc' | 'contextual';
  topK: number;
  temperature: number;
}

export interface TraceStep {
  id: string;
  name: string;
  type: 'input' | 'reasoning' | 'tool_execution' | 'tool_result' | 'output';
  content: string;
  latency?: number;
  tokens?: number;
  metadata?: any;
}

export const useGeminiBrain = () => {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [traces, setTraces] = useState<TraceStep[]>([]);
  const [activeNode, setActiveNode] = useState<ActiveNodeType>(null);
  
  // Use Global Config Store
  const { config } = useConfigStore();
  
  const chatSessionRef = useRef<any>(null);
  const currentConfigRef = useRef(config); // Track config to detect changes

  // Update ref when config changes
  useEffect(() => {
    currentConfigRef.current = config;
    // Note: In a real app, we might want to reset the chat if the Persona changes dramatically.
    // For this simulation, we'll let the user continue, but the NEXT message will use the new system prompt logic if we re-init.
    // To properly support hot-swapping System Prompts, we typically need to start a new chat.
    chatSessionRef.current = null; 
  }, [config.persona, config.responseStyle]); // Only reset session if persona changes

  const addTrace = (step: Omit<TraceStep, 'id'>) => {
    setTraces(prev => [...prev, {
      id: Date.now().toString() + Math.random(),
      ...step
    }]);
  };

  // Tools Definition - Dynamic based on Config
  const getTools = () => {
    const tools: any[] = [];
    const funcs: FunctionDeclaration[] = [
      {
        name: "retrieve_chunks",
        description: `Fetch relevant knowledge chunks from the internal Vector Database. Strategy: ${config.retrievalStrategy}`,
        parameters: {
          type: Type.OBJECT,
          properties: {
            query: { type: Type.STRING, description: "The semantic search query." },
          },
          required: ["query"]
        }
      }
    ];

    if (config.toolsEnabled.webSearch) {
      funcs.push({
        name: "search_web",
        description: "Search the live internet for information when the internal database (retrieve_chunks) is insufficient.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            query: { type: Type.STRING, description: "The search query." },
          },
          required: ["query"]
        }
      });
    }

    if (config.toolsEnabled.deepResearch) {
      funcs.push({
        name: "crawl_and_learn",
        description: "Visit a specific URL found via 'search_web', read its full content, and add it to the Knowledge Base (Long-term memory).",
        parameters: {
          type: Type.OBJECT,
          properties: {
            url: { type: Type.STRING, description: "The URL to crawl and ingest." },
            tag: { type: Type.STRING, description: "A topic tag for this knowledge (e.g. 'Pricing', 'Competitor')." }
          },
          required: ["url"]
        }
      });
    }

    tools.push({ functionDeclarations: funcs });
    return tools;
  };

  const initializeSession = () => {
    const ai = getGeminiClient();
    
    // Dynamic System Instruction based on Config
    let systemInstruction = `You are the "Second Brain Agent".
    
    PERSONA SETTINGS:
    - Role: ${config.persona}
    - Style: ${config.responseStyle}
    
    WORKFLOW:
    1. ANALYZE: Check if you have the answer in your internal memory first.
    2. RETRIEVE: Use 'retrieve_chunks' to search the internal database.
    3. FALLBACK: If 'retrieve_chunks' yields no results, use 'search_web' (if available) to find live information.
    4. LEARN: If you find a highly relevant URL via search, use 'crawl_and_learn' (if available) to ingest it.
    5. ANSWER: Synthesize the final answer based on your Role and Style settings.
    `;

    if (config.responseStyle === 'concise') {
      systemInstruction += "\nIMPORTANT: Be extremely brief. Avoid filler words.";
    } else if (config.responseStyle === 'bullet-points') {
      systemInstruction += "\nIMPORTANT: Format your response primarily using bullet points.";
    } else if (config.responseStyle === 'socratic') {
      systemInstruction += "\nIMPORTANT: Do not give the answer directly. Guide the user with questions.";
    }

    return ai.chats.create({
      model: GEMINI_CONFIG.models.pro,
      config: {
        systemInstruction: systemInstruction,
        tools: getTools(),
        temperature: 0.2, // Low temp for more deterministic tool use
      }
    });
  };

  const sendMessage = async (text: string) => {
    if (!process.env.API_KEY) return;

    // Re-init if null (happens on config change)
    if (!chatSessionRef.current) {
      chatSessionRef.current = initializeSession();
    }

    // 1. User Input Trace
    setTraces([]); 
    setActiveNode('user');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    addTrace({ name: 'User Input', type: 'input', content: text });

    setTimeout(() => setActiveNode('agent'), 500);

    try {
      // 2. Agent Reasoning
      const startTime = Date.now();
      
      let response = await chatSessionRef.current.sendMessage({ message: text });
      
      addTrace({ 
        name: 'Agent Reasoning', 
        type: 'reasoning', 
        content: `Planning (Persona: ${config.persona.substring(0, 20)}...)`,
        latency: Date.now() - startTime,
        tokens: 20
      });

      // --- AGENT LOOP ---
      let functionCalls = response.functionCalls;
      let stepCount = 0;
      
      // Loop for Function Calls
      while (functionCalls && functionCalls.length > 0) {
        stepCount++;
        if (stepCount > config.maxSteps) {
           addTrace({ name: 'Safety', type: 'reasoning', content: 'Max steps reached. Halting.' });
           break;
        }

        const call = functionCalls[0];
        const toolStart = Date.now();
        
        addTrace({ 
          name: `Tool Call: ${call.name}`, 
          type: 'tool_execution', 
          content: call.name,
          metadata: call.args
        });

        let toolResult = {};

        // --- 1. RETRIEVE CHUNKS (Strategy Applied) ---
        if (call.name === 'retrieve_chunks') {
          setActiveNode('retriever');
          setActiveNode('vector_db');
          await new Promise(r => setTimeout(r, 600)); 

          const query = (call.args as any).query;
          
          // Apply Configured Strategy
          const results = searchKnowledgeBase(query, config.topK, config.retrievalStrategy);
          
          toolResult = { 
            results: results.length > 0 ? results : "No relevant local knowledge found. Consider searching web." 
          };
          
          addTrace({ 
            name: `Vector DB (${config.retrievalStrategy})`, 
            type: 'tool_result', 
            content: results.length > 0 ? `Found ${results.length} chunks` : 'Miss - Database Empty', 
            latency: Date.now() - toolStart,
            metadata: toolResult
          });
        } 
        
        // --- 2. SEARCH WEB (VIA GOOGLE GROUNDING PROXY) ---
        else if (call.name === 'search_web') {
            if (!config.toolsEnabled.webSearch) {
                toolResult = { error: "Web Search tool is disabled by administrator configuration." };
            } else {
                setActiveNode('retriever');
                const query = (call.args as any).query;
                
                try {
                    addTrace({ name: 'Searching Web', type: 'tool_execution', content: `Query: ${query}` });
                    
                    const searchClient = getGeminiClient();
                    const searchResponse = await searchClient.models.generateContent({
                        model: 'gemini-3-flash-preview',
                        contents: query,
                        config: {
                            tools: [{ googleSearch: {} }]
                        }
                    });

                    const searchSummary = searchResponse.text || "No relevant results found.";
                    const sources = searchResponse.candidates?.[0]?.groundingMetadata?.groundingChunks
                        ?.map((c: any) => c.web)
                        .filter((w: any) => w)
                        .map((w: any) => ({ title: w.title, url: w.uri })) || [];
                    
                    toolResult = { 
                        result: searchSummary,
                        sources: sources.slice(0, 5) 
                    };
                    
                    addTrace({
                        name: 'Search Results',
                        type: 'tool_result',
                        content: `Found ${sources.length} sources via Google`,
                        latency: Date.now() - toolStart,
                        metadata: toolResult
                    });
                } catch (err: any) {
                    toolResult = { error: err.message };
                    addTrace({ name: 'Search Error', type: 'tool_result', content: err.message });
                }
            }
        }

        // --- 3. CRAWL AND LEARN (FIRECRAWL) ---
        else if (call.name === 'crawl_and_learn') {
           if (!config.toolsEnabled.deepResearch) {
                toolResult = { error: "Deep Research tool is disabled in configuration." };
           } else {
               setActiveNode('summarizer'); 
               const url = (call.args as any).url;
               const tag = (call.args as any).tag || 'General';
               
               try {
                 addTrace({ name: 'Firecrawl', type: 'tool_execution', content: `Crawling ${url}...` });
                 
                 const scrapedData = await crawlUrl(url);
                 
                 const newChunk = addKnowledge({
                   lesson: "External Web Knowledge",
                   title: scrapedData.title,
                   content: scrapedData.content.substring(0, 2000), 
                   context: scrapedData.description || "Ingested from Web",
                   parentDoc: `Source: ${url}`,
                   type: 'web_knowledge',
                   tags: ['Web', tag],
                   sourceUrl: url
                 });

                 toolResult = { status: "success", message: "Content crawled and added to Knowledge Base.", title: newChunk.title };
                 
                 addTrace({
                   name: 'Ingestion Complete',
                   type: 'tool_result',
                   content: `Learned: ${newChunk.title}`,
                   latency: Date.now() - toolStart
                 });

               } catch (err: any) {
                 toolResult = { status: "error", message: err.message };
                 addTrace({ name: 'Firecrawl Error', type: 'tool_result', content: err.message });
               }
           }
        }

        // Return to Agent
        setActiveNode('agent');
        
        response = await chatSessionRef.current.sendMessage({
          message: [{
            functionResponse: {
              name: call.name,
              response: { result: toolResult }
            }
          }]
        });
        
        functionCalls = response.functionCalls;
      }

      // 4. Final Output
      setActiveNode('observability');
      const modelText = response.text;
      setMessages(prev => [...prev, { role: 'model', content: modelText }]);
      addTrace({ 
        name: 'Final Response', 
        type: 'output', 
        content: modelText,
        tokens: 150
      });

      setTimeout(() => setActiveNode(null), 2000); 

    } catch (error: any) {
      console.error("Agentic Loop Error:", error);
      setMessages(prev => [...prev, { role: 'model', content: "⚠️ Error in Agentic Loop: " + (error.message || JSON.stringify(error)) }]);
      setActiveNode(null);
    }
  };

  return { messages, traces, activeNode, config, sendMessage };
};
