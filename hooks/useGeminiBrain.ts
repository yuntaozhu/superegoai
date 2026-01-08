
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

const isFatalError = (err: any) => {
  const msg = (err?.message || JSON.stringify(err)).toLowerCase();
  return msg.includes('key') || msg.includes('expired') || msg.includes('403') || msg.includes('401') || msg.includes('permission_denied');
};

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
    chatSessionRef.current = null; 
  }, [config.persona, config.responseStyle]); 

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

    // Use the dedicated agent model (gemini-2.0-flash-exp) for robust tool support
    return ai.chats.create({
      model: GEMINI_CONFIG.models.agent, 
      config: {
        systemInstruction: systemInstruction,
        tools: getTools(),
        temperature: 0.2, 
      }
    });
  };

  const sendMessage = async (text: string) => {
    if (!process.env.API_KEY) {
      setMessages(prev => [...prev, { role: 'model', content: "⚠️ API Key is missing. Please check your .env file." }]);
      return;
    }

    if (!chatSessionRef.current) {
      chatSessionRef.current = initializeSession();
    }

    setTraces([]); 
    setActiveNode('user');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    addTrace({ name: 'User Input', type: 'input', content: text });

    setTimeout(() => setActiveNode('agent'), 500);

    try {
      const startTime = Date.now();
      
      // Initial Request
      let response = await chatSessionRef.current.sendMessage({ message: text });
      
      addTrace({ 
        name: 'Agent Reasoning', 
        type: 'reasoning', 
        content: `Planning...`,
        latency: Date.now() - startTime,
        tokens: 20
      });

      // --- AGENT LOOP ---
      let functionCalls = response.functionCalls;
      let stepCount = 0;
      
      while (functionCalls && functionCalls.length > 0) {
        stepCount++;
        if (stepCount > config.maxSteps) break;

        const call = functionCalls[0];
        const toolStart = Date.now();
        
        addTrace({ 
          name: `Tool Call: ${call.name}`, 
          type: 'tool_execution', 
          content: call.name,
          metadata: call.args
        });

        let toolResult = {};
        let fatalErrorOccurred = false;

        // --- 1. RETRIEVE CHUNKS ---
        if (call.name === 'retrieve_chunks') {
          setActiveNode('retriever');
          setActiveNode('vector_db');
          await new Promise(r => setTimeout(r, 600)); 

          const query = (call.args as any).query;
          const results = searchKnowledgeBase(query, config.topK, config.retrievalStrategy);
          
          toolResult = { 
            results: results.length > 0 ? results : "No relevant local knowledge found." 
          };
          
          addTrace({ 
            name: `Vector DB`, 
            type: 'tool_result', 
            content: results.length > 0 ? `Found ${results.length} chunks` : 'Miss', 
            latency: Date.now() - toolStart,
            metadata: toolResult
          });
        } 
        
        // --- 2. SEARCH WEB ---
        else if (call.name === 'search_web') {
            setActiveNode('retriever');
            const query = (call.args as any).query;
            
            try {
                addTrace({ name: 'Google Search', type: 'tool_execution', content: `Query: ${query}` });
                
                // Use a standard search-capable model for the tool execution itself if needed,
                // but usually we just call the API. Here we simulate search via the model's grounding tool
                // or just use the model to generate a search summary.
                const searchClient = getGeminiClient();
                const searchResponse = await searchClient.models.generateContent({
                    model: 'gemini-3-flash-preview',
                    contents: query,
                    config: { tools: [{ googleSearch: {} }] }
                });

                const searchSummary = searchResponse.text || "No relevant results found.";
                const sources = searchResponse.candidates?.[0]?.groundingMetadata?.groundingChunks
                    ?.map((c: any) => c.web)
                    .filter((w: any) => w)
                    .map((w: any) => ({ title: w.title, url: w.uri })) || [];
                
                toolResult = { result: searchSummary, sources: sources.slice(0, 5) };
                
                addTrace({
                    name: 'Search Results',
                    type: 'tool_result',
                    content: `Found ${sources.length} sources`,
                    latency: Date.now() - toolStart
                });
            } catch (err: any) {
                // CRITICAL: If Search fails due to key, STOP.
                if (isFatalError(err)) {
                    fatalErrorOccurred = true;
                    throw err; // Re-throw to main catch block
                }
                toolResult = { error: err.message };
                addTrace({ name: 'Search Failed', type: 'tool_result', content: err.message });
            }
        }

        // --- 3. CRAWL AND LEARN ---
        else if (call.name === 'crawl_and_learn') {
           setActiveNode('summarizer'); 
           const url = (call.args as any).url;
           
           try {
             addTrace({ name: 'Firecrawl', type: 'tool_execution', content: `Crawling ${url}...` });
             const scrapedData = await crawlUrl(url);
             const newChunk = addKnowledge({
               lesson: "External Web Knowledge",
               title: scrapedData.title,
               content: scrapedData.content.substring(0, 2000), 
               context: "Ingested from Web",
               parentDoc: `Source: ${url}`,
               type: 'web_knowledge',
               tags: ['Web'],
               sourceUrl: url
             });

             toolResult = { status: "success", title: newChunk.title };
             addTrace({ name: 'Ingestion Complete', type: 'tool_result', content: `Learned: ${newChunk.title}` });

           } catch (err: any) {
             toolResult = { status: "error", message: err.message };
             addTrace({ name: 'Firecrawl Error', type: 'tool_result', content: err.message });
           }
        }

        // Return to Agent (Only if no fatal error)
        if (!fatalErrorOccurred) {
            setActiveNode('agent');
            try {
                response = await chatSessionRef.current.sendMessage({
                  message: [{
                    functionResponse: {
                      name: call.name,
                      response: { result: toolResult }
                    }
                  }]
                });
                functionCalls = response.functionCalls;
            } catch (sendErr: any) {
                if (isFatalError(sendErr)) throw sendErr;
                // If standard generation error, break loop
                break;
            }
        }
      }

      // 4. Final Output
      setActiveNode('observability');
      const modelText = response.text;
      setMessages(prev => [...prev, { role: 'model', content: modelText }]);
      addTrace({ name: 'Final Response', type: 'output', content: modelText });
      setTimeout(() => setActiveNode(null), 2000); 

    } catch (error: any) {
      console.error("Agentic Loop Error:", error);
      let errorMessage = error.message || JSON.stringify(error);
      
      if (isFatalError(error)) {
          errorMessage = "🛑 API KEY EXPIRED or INVALID. Google has likely revoked your key because it was exposed (e.g., committed to GitHub). Please generate a NEW key, update .env, and RESTART your terminal.";
          // Clear session to force re-init next time
          chatSessionRef.current = null;
      }

      setMessages(prev => [...prev, { role: 'model', content: errorMessage }]);
      setActiveNode(null);
    }
  };

  return { messages, traces, activeNode, config, sendMessage };
};
