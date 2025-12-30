
import { useState, useRef } from 'react';
import { FunctionDeclaration, Type } from "@google/genai";
import { searchKnowledgeBase } from '../lib/secondBrainData';
import { getGeminiClient } from '../api/client';
import { GEMINI_CONFIG } from '../api/config';
import { ActiveNodeType } from '../components/ArchitectureMap';

export interface TraceStep {
  id: string;
  name: string;
  type: 'input' | 'reasoning' | 'tool_execution' | 'tool_result' | 'output';
  content: string;
  latency?: number;
  tokens?: number;
  metadata?: any;
}

export interface RAGConfig {
  strategy: 'parent' | 'contextual';
  topK: number;
  temperature: number;
}

export const useGeminiBrain = () => {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [traces, setTraces] = useState<TraceStep[]>([]);
  const [activeNode, setActiveNode] = useState<ActiveNodeType>(null);
  const [config, setConfig] = useState<RAGConfig>({
    strategy: 'contextual',
    topK: 3,
    temperature: 0.2
  });
  
  const chatSessionRef = useRef<any>(null);

  const addTrace = (step: Omit<TraceStep, 'id'>) => {
    setTraces(prev => [...prev, {
      id: Date.now().toString() + Math.random(),
      ...step
    }]);
  };

  // Tools Definition
  const tools: { functionDeclarations: FunctionDeclaration[] }[] = [{
    functionDeclarations: [
      {
        name: "retrieve_chunks",
        description: "Fetch relevant knowledge chunks from the Vector Database.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            query: { type: Type.STRING, description: "The semantic search query." },
          },
          required: ["query"]
        }
      },
      {
        name: "summarize_document",
        description: "Summarize a long retrieved document to fit into context window.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            content: { type: Type.STRING, description: "Text to summarize." },
            focus: { type: Type.STRING, description: "Specific focus for summary." }
          },
          required: ["content"]
        }
      }
    ]
  }];

  const initializeSession = () => {
    const ai = getGeminiClient();
    return ai.chats.create({
      model: GEMINI_CONFIG.models.default,
      config: {
        systemInstruction: `You are the "Second Brain Agent". You are an Agentic RAG system.
        
        ARCHITECTURE:
        1. PLAN: Receive user input, reason about what information is needed.
        2. ACT: Use 'retrieve_chunks' to search the vector database.
        3. OBSERVE: Analyze results. If too long, use 'summarize_document'.
        4. ANSWER: Synthesize final answer based ONLY on retrieved data.

        STRATEGY:
        - If the user asks about course content (FTI, LoRA, Agents), you MUST use tools.
        - Be transparent about your process.
        `,
        tools: tools,
        temperature: config.temperature,
      }
    });
  };

  const sendMessage = async (text: string) => {
    if (!process.env.API_KEY) return;

    if (!chatSessionRef.current) {
      chatSessionRef.current = initializeSession();
    }

    // 1. User Input Trace
    setTraces([]); // Clear previous traces for new request
    setActiveNode('user');
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    addTrace({ name: 'User Input', type: 'input', content: text });

    setTimeout(() => setActiveNode('agent'), 500); // Simulate network to agent

    try {
      // 2. Agent Reasoning
      const startTime = Date.now();
      let response = await chatSessionRef.current.sendMessage({ message: text });
      
      addTrace({ 
        name: 'Agent Reasoning', 
        type: 'reasoning', 
        content: 'Analyzing intent & selecting tools...',
        latency: Date.now() - startTime,
        tokens: 15
      });

      let functionCalls = response.functionCalls;

      // 3. Tool Loop
      while (functionCalls && functionCalls.length > 0) {
        const call = functionCalls[0];
        const toolStart = Date.now();
        
        // VISUALIZATION: Switch Active Node based on tool
        if (call.name === 'retrieve_chunks') setActiveNode('retriever');
        if (call.name === 'summarize_document') setActiveNode('summarizer');

        addTrace({ 
          name: `Tool Call: ${call.name}`, 
          type: 'tool_execution', 
          content: call.name,
          metadata: call.args
        });

        // Simulate Latency for Effect
        await new Promise(r => setTimeout(r, 800));

        let toolResult = {};

        // --- EXECUTE TOOLS ---
        if (call.name === 'retrieve_chunks') {
          setActiveNode('vector_db'); // Move to DB
          await new Promise(r => setTimeout(r, 600)); // DB Latency

          const query = (call.args as any).query;
          const results = searchKnowledgeBase(query, config.topK);
          
          // Apply Strategy
          const processedResults = results.map(r => ({
            title: r.title,
            content: config.strategy === 'parent' ? r.parentDoc || r.content : `${r.context || ''}\n${r.content}`,
            score: r.score
          }));

          toolResult = { results: processedResults };
          
          addTrace({ 
            name: 'Vector DB Result', 
            type: 'tool_result', 
            content: `Retrieved ${results.length} chunks`, 
            latency: Date.now() - toolStart,
            metadata: toolResult
          });
        } 
        else if (call.name === 'summarize_document') {
           toolResult = { summary: "Content condensed for context window optimization." };
           addTrace({
             name: 'Summarizer Output',
             type: 'tool_result',
             content: 'Document compressed',
             latency: Date.now() - toolStart
           });
        }

        // Return to Agent
        setActiveNode('agent');
        
        response = await chatSessionRef.current.sendMessage({
          functionResponses: [{
            name: call.name,
            response: { result: toolResult }
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

      setTimeout(() => setActiveNode(null), 2000); // Reset

    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "⚠️ Error in Agentic Loop: " + error.message }]);
      setActiveNode(null);
    }
  };

  return { messages, traces, activeNode, config, setConfig, sendMessage };
};
