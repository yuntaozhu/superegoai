import React from 'react';
import { MdxComponents } from './MdxComponents';
import { useLanguage } from '../context/LanguageContext';

interface MdxRendererProps {
  content: string;
}

const MdxRenderer: React.FC<MdxRendererProps> = ({ content }) => {
  const { language } = useLanguage();

  if (!content) return null;

  // Split content by custom component tags and markdown elements.
  // Use [\s\S] for dotAll matching to handle multiline components.
  const parts = content.split(/(<PromptAnatomy[\s\S]*?\/>|<Callout[\s\S]*?>[\s\S]*?<\/Callout>|<Cards[\s\S]*?>[\s\S]*?<\/Cards>|<Steps>[\s\S]*?<\/Steps>|```[\s\S]*?```|#{1,3}\s.*)/g);

  return (
    <div className="mdx-content space-y-6">
      {parts.map((part, i) => {
        if (!part || !part.trim()) return null;

        // 1. PromptAnatomy
        if (part.startsWith('<PromptAnatomy')) {
          // Helper to extract attributes that might span multiple lines
          const getAttr = (name: string) => {
            const match = part.match(new RegExp(`${name}="([\\s\\S]*?)"`));
            return match ? match[1] : '';
          };

          const instruction = getAttr('instruction');
          const context = getAttr('context');
          const data = getAttr('data');
          const indicator = getAttr('indicator');
          
          return (
            <MdxComponents.PromptAnatomy 
              key={i} 
              instruction={instruction} 
              context={context} 
              data={data} 
              indicator={indicator} 
            />
          );
        }

        // 2. Callout
        if (part.startsWith('<Callout')) {
          const typeMatch = part.match(/type="(.*?)"/);
          const type = (typeMatch ? typeMatch[1] : 'info') as any;
          // Extract content between tags, supporting multiline
          const children = part.replace(/<Callout.*?>|<\/Callout>/g, '').trim();
          return <MdxComponents.Callout key={i} type={type}>{children}</MdxComponents.Callout>;
        }
        
        // 3. Cards
        if (part.startsWith('<Cards')) {
          // Extract inner Card components using regex that handles whitespace/newlines
          const cardMatches = Array.from(part.matchAll(/<Card\s+title="([^"]*)"\s+href="([^"]*)"\s*>(.*?)<\/Card>/gs));
          const cards = cardMatches.map((m_match, ci) => (
            <MdxComponents.Card key={ci} title={m_match[1]} href={m_match[2]}>{m_match[3]}</MdxComponents.Card>
          ));
          return <MdxComponents.Cards key={i}>{cards}</MdxComponents.Cards>;
        }

        // 4. Steps
        if (part.startsWith('<Steps>')) {
          const children = part.replace(/<Steps>|<\/Steps>/g, '').trim();
          // Split steps by number list pattern "1. ", handling potential newlines
          // We look for a newline followed by a digit and a dot, or the start of the string
          const items = children.split(/\n+(?=\d+\.\s)/).filter(s => s.trim().length > 0);
          
          const steps = items.map((s, si) => {
            // Remove the leading "1. " part for cleaner display if we want to use our own numbering
            const cleanText = s.replace(/^\d+\.\s/, '').trim();
            return (
              <div key={si} className="mb-4">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                   <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] flex items-center justify-center border border-blue-500/20">{si + 1}</span>
                   {language === 'zh' ? '步骤' : 'Step'}
                </h4>
                <MdxComponents.p dangerouslySetInnerHTML={{ 
                  __html: cleanText
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                    .replace(/`([^`]+)`/g, '<code class="bg-white/10 text-blue-400 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
                }} />
              </div>
            );
          });
          return <MdxComponents.Steps key={i}>{steps}</MdxComponents.Steps>;
        }
        
        // 5. Code Blocks
        if (part.startsWith('```')) {
          const lines = part.split('\n');
          const firstLine = lines[0];
          const lang = firstLine.replace('```', '').trim() || 'text';
          // Join lines back, removing first and last (```)
          const code = lines.slice(1, -1).join('\n').trim();
          return <MdxComponents.code key={i} className={`language-${lang}`}>{code}</MdxComponents.code>;
        }

        // 6. Headers
        if (part.startsWith('# ')) return <MdxComponents.h1 key={i}>{part.replace('# ', '')}</MdxComponents.h1>;
        if (part.startsWith('## ')) return <MdxComponents.h2 key={i}>{part.replace('## ', '')}</MdxComponents.h2>;
        if (part.startsWith('### ')) return <MdxComponents.h3 key={i}>{part.replace('### ', '')}</MdxComponents.h3>;
        
        // 7. Paragraphs / Standard Text
        return (
          <MdxComponents.p 
            key={i} 
            dangerouslySetInnerHTML={{ 
              __html: part
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') 
                .replace(/`([^`]+)`/g, '<code class="bg-white/10 text-blue-400 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
            }} 
          />
        );
      })}
    </div>
  );
};

export default MdxRenderer;