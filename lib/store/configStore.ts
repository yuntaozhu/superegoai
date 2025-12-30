
import { create } from 'zustand';

export interface AgentConfig {
  // Lesson 3 & 4: Persona & Style
  persona: string;
  responseStyle: 'concise' | 'detailed' | 'bullet-points' | 'socratic';
  
  // Lesson 5: Memory & RAG
  retrievalStrategy: 'naive' | 'parent-doc' | 'contextual';
  topK: number;
  minRelevanceScore: number;
  
  // Lesson 6: Agentic Behavior
  maxSteps: number;
  toolsEnabled: {
    webSearch: boolean;
    deepResearch: boolean; // Simulates "crawl_and_learn"
  };
}

interface ConfigState {
  config: AgentConfig;
  setConfig: (updates: Partial<AgentConfig>) => void;
  applyPreset: (level: 'junior' | 'senior' | 'superego') => void;
  isPanelOpen: boolean;
  togglePanel: () => void;
}

const PRESETS = {
  junior: {
    persona: "You are a Junior Assistant. You answer simply and directly.",
    responseStyle: 'concise',
    retrievalStrategy: 'naive',
    topK: 2,
    minRelevanceScore: 0.8,
    maxSteps: 3,
    toolsEnabled: { webSearch: false, deepResearch: false }
  },
  senior: {
    persona: "You are a Senior Analyst. You provide detailed, data-backed answers.",
    responseStyle: 'detailed',
    retrievalStrategy: 'parent-doc',
    topK: 5,
    minRelevanceScore: 0.6,
    maxSteps: 5,
    toolsEnabled: { webSearch: true, deepResearch: false }
  },
  superego: {
    persona: "You are the SuperEgo. You are a strategic partner capable of deep reasoning and self-correction.",
    responseStyle: 'socratic',
    retrievalStrategy: 'contextual',
    topK: 8,
    minRelevanceScore: 0.5,
    maxSteps: 10,
    toolsEnabled: { webSearch: true, deepResearch: true }
  }
} as const;

export const useConfigStore = create<ConfigState>((set) => ({
  config: PRESETS.senior as AgentConfig, // Default to Senior
  isPanelOpen: false,
  
  setConfig: (updates) => set((state) => ({ 
    config: { ...state.config, ...updates } 
  })),
  
  applyPreset: (level) => set({ 
    config: PRESETS[level] as AgentConfig 
  }),
  
  togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen }))
}));
