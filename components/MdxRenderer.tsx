
import React from 'react';
import PromptBlock from './PromptBlock';

interface MdxRendererProps {
  content: string;
}

const MdxRenderer: React.FC<MdxRendererProps> = ({ content }) => {
  // Simple custom parser to map standard Markdown sections and intercept code blocks
  // For a production env with actual MDX files, we would use @mdx-js/react, 
  // but for raw string parsing from glob imports:
  
  const parseContent = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const match = part.match(/```(?:\w+)?\n([\s\S]*?)\n```/);
        const code = match ? match[1] : '';
        const langMatch = part.match(/```(\w+)/);
        const lang = langMatch ? langMatch[1] : 'markdown';
        
        return <PromptBlock key={index} code={code.trim()} language={lang} />;
      }
      
      // Basic Frontmatter removal if exists
      const cleanPart = part.replace(/^---[\s\S]*?---\n/, '');
      
      return (
        <div 
          key={index} 
          className="prose prose-invert prose-blue max-w-none mb-4 font-light leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: cleanPart
              .replace(/\n\n/g, '</p><p>')
              .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-black mb-8 uppercase tracking-tighter">$1</h1>')
              .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-12 mb-6 border-b border-white/10 pb-2">$1</h2>')
              .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4 text-blue-400">$1</h3>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
          }} 
        />
      );
    });
  };

  return <div className="mdx-content">{parseContent(content)}</div>;
};

export default MdxRenderer;
