
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadPromptGuideContent, ContentStructure, ParsedPrompt } from '../lib/content-parser';

interface PromptRegistryContextType {
  structure: ContentStructure | null;
  isLoading: boolean;
  getPromptById: (id: string) => ParsedPrompt | undefined;
  searchPrompts: (query: string) => ParsedPrompt[];
}

const PromptRegistryContext = createContext<PromptRegistryContextType | undefined>(undefined);

export const PromptRegistryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [structure, setStructure] = useState<ContentStructure | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const data = loadPromptGuideContent();
      setStructure(data);
    } catch (error) {
      console.error("Failed to index ar-pages content:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPromptById = (id: string) => {
    return structure?.allNodes.find(node => node.id === id);
  };

  const searchPrompts = (query: string) => {
    if (!query || !structure) return [];
    const q = query.toLowerCase();
    return structure.allNodes.filter(node => 
      node.title.toLowerCase().includes(q) || 
      node.description.toLowerCase().includes(q) ||
      node.category.toLowerCase().includes(q)
    );
  };

  return (
    <PromptRegistryContext.Provider value={{ structure, isLoading, getPromptById, searchPrompts }}>
      {children}
    </PromptRegistryContext.Provider>
  );
};

export const usePromptRegistry = () => {
  const context = useContext(PromptRegistryContext);
  if (context === undefined) {
    throw new Error('usePromptRegistry must be used within a PromptRegistryProvider');
  }
  return context;
};
