
import { useState, useRef } from 'react';
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { searchKnowledgeBase, KnowledgeChunk } from '../lib/secondBrainData';

export interface ThoughtLog {
  id: string;
  timestamp: string;
  type: 'user' | 'agent_thought' | 'tool_call' | 'tool_result' | 'agent_response' | 'error';
  content: string;
  metadata?: any;
}

export const useGeminiBrain = (apiKey: string | undefined) => {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [logs, setLogs] = useState<ThoughtLog[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const chatSessionRef = useRef<any>(null);

  const addLog = (type: ThoughtLog['type'], content: string, metadata?: any) => {
    setLogs(prev => [...prev, {
      id: Date.now().toString() + Math.random(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      content,
      metadata
    }]);
  };

  const tools: { functionDeclarations: FunctionDeclaration[] }[] = [{
    functionDeclarations: [
      {
        name: "search_knowledge_base",
        description: "Search the 'Second Brain' course database for concepts, techniques, or lessons. Use this when the user asks about course content (e.g., RAG, LoRA, FTI).",
        parameters: {
          type: Type.OBJECT,
          properties: {
            query: { type: Type.STRING, description: "The search keyword or concept." }
          },
          required: ["query"]
        }
      },
      {
        name: "get_agent_capabilities",
        description: "Returns a list of what this agent can do. Call this when the user asks 'What can you do?' or 'Help'.",
        parameters: {
          type: Type.OBJECT,
          properties: {},
        }
      }
    ]
  }];

  const initializeSession = () => {
    if (!apiKey) return null;
    const ai = new GoogleGenAI({ apiKey });
    return ai.chats.create({
      model: 'gemini-2.5-flash-latest', // Fast model for interactive agents
      config: {
        systemInstruction: `You are the "Second Brain Teaching Assistant". 
        Your goal is to help students understand the AI First Course content.
        
        CRITICAL RULES:
        1. You are a "Glass Box" agent. You MUST use tools to retrieve information. Do not answer from your own memory if it's about course specifics (LoRA, RAG, FTI).
        2. When you use a tool, you are demonstrating "Agentic RAG". 
        3. Be concise and educational. 
        4. If the user asks a general question unrelated to the course, answer politely but steer them back to Second Brain topics.
        `,
        tools: tools,
        temperature: 0.2, // Lower temp for more deterministic tool use
      }
    });
  };

  const sendMessage = async (text: string) => {
    if (!apiKey) {
      addLog('error', "API Key missing");
      return;
    }

    if (!chatSessionRef.current) {
      chatSessionRef.current = initializeSession();
    }

    // 1. User Message
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    addLog('user', text);
    setIsThinking(true);
    addLog('agent_thought', "Analyzing user intent...");

    try {
      let response = await chatSessionRef.current.sendMessage({ message: text });
      let functionCalls = response.functionCalls;

      // 2. Loop for Tool Calls (Agentic Loop)
      while (functionCalls && functionCalls.length > 0) {
        setIsThinking(true);
        const call = functionCalls[0]; // Handle first call for simplicity
        
        addLog('tool_call', `Invoking tool: ${call.name}`, { args: call.args });

        let toolResult = {};
        
        // Execute Tool
        if (call.name === 'search_knowledge_base') {
          const query = (call.args as any).query;
          addLog('agent_thought', `Searching vector database for: "${query}"...`);
          const results = searchKnowledgeBase(query);
          toolResult = { results: results.length > 0 ? results : "No records found." };
          addLog('tool_result', `Found ${results.length} documents`, { results });
        } else if (call.name === 'get_agent_capabilities') {
          toolResult = { capabilities: ["Search Course Content", "Explain RAG Concepts", "Summarize Lessons"] };
          addLog('tool_result', "Capabilities retrieved");
        }

        // Send Tool Result back to model
        response = await chatSessionRef.current.sendMessage({
          functionResponses: [{
            name: call.name,
            response: { result: toolResult }
          }]
        });
        
        functionCalls = response.functionCalls;
      }

      // 3. Final Response
      const modelText = response.text;
      setMessages(prev => [...prev, { role: 'model', content: modelText }]);
      addLog('agent_response', "Response generated.");
      
    } catch (error: any) {
      console.error(error);
      addLog('error', `Error: ${error.message}`);
      setMessages(prev => [...prev, { role: 'model', content: "⚠️ Neural link unstable. Please try again." }]);
    } finally {
      setIsThinking(false);
    }
  };

  return { messages, logs, sendMessage, isThinking };
};
