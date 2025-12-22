
import React from 'react';
import { MdxComponents } from './MdxComponents';
import { useLanguage } from '../context/LanguageContext';

interface MdxRendererProps {
  content: string;
}

const MdxRenderer: React.FC<MdxRendererProps> = ({ content }) => {
  const { language } = useLanguage();

  if (!content) return null;

  // Helper to process markdown text (images, links, bold, code)
  const processMarkdown = (text: string) => {
    let processed = text;

    // 1. Images: ![](url) -> <img src="url" />
    // Regex handles optional title: ![alt](url "title")
    processed = processed.replace(/!\[(.*?)\]\(([^" )]+)(?: "(.*?)")?\)/g, (match, alt, src, title) => {
        let finalSrc = src;
        // Map relative paths to the Dair AI GitHub repo
        if (src.startsWith('../img/')) {
            finalSrc = `https://raw.githubusercontent.com/dair-ai/Prompt-Engineering-Guide/main/img/${src.replace('../img/', '')}`;
        } else if (src.startsWith('./img/')) {
             finalSrc = `https://raw.githubusercontent.com/dair-ai/Prompt-Engineering-Guide/main/img/${src.replace('./img/', '')}`;
        } else if (src.startsWith('img/')) {
             finalSrc = `https://raw.githubusercontent.com/dair-ai/Prompt-Engineering-Guide/main/img/${src.replace('img/', '')}`;
        }
        
        return `
          <figure class="my-10 group">
            <div class="rounded-2xl border border-white/10 overflow-hidden bg-black/20 shadow-2xl relative">
              <img src="${finalSrc}" alt="${alt}" class="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" loading="lazy" />
              <div class="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none"></div>
            </div>
            ${title ? `<figcaption class="mt-3 text-center text-xs text-gray-500 font-mono uppercase tracking-widest">${title}</figcaption>` : ''}
          </figure>
        `;
    });

    // 2. Links: [text](url)
    processed = processed.replace(/([^!]|^)\[(.*?)\]\((.*?)\)/g, '$1<a href="$3" target="_blank" rel="noopener noreferrer" class="text-blue-400 font-medium hover:text-blue-300 underline decoration-blue-500/30 underline-offset-4 transition-all hover:decoration-blue-400">$2</a>');

    // 3. Bold: **text**
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold tracking-tight">$1</strong>');
    
    // 4. Italic: *text*
    processed = processed.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em class="text-blue-200/90 italic font-serif">$2</em>');

    // 5. Inline Code: `text`
    processed = processed.replace(/`([^`]+)`/g, '<code class="bg-blue-500/10 text-blue-300 px-1.5 py-0.5 rounded-md text-[0.9em] font-mono border border-blue-500/20">$1</code>');

    return processed;
  };

  // Split content by custom component tags and markdown elements.
  const parts = content.split(/(<PromptAnatomy[\s\S]*?\/>|<Callout[\s\S]*?>[\s\S]*?<\/Callout>|<Cards[\s\S]*?>[\s\S]*?<\/Cards>|<Steps>[\s\S]*?<\/Steps>|```[\s\S]*?```|#{1,3}\s.*)/g);

  return (
    <div className={`mdx-content max-w-none ${language === 'zh' ? 'leading-loose' : 'leading-relaxed'}`}>
      {parts.map((part, i) => {
        if (!part || !part.trim()) return null;

        // 1. PromptAnatomy
        if (part.startsWith('<PromptAnatomy')) {
          const getAttr = (name: string) => {
            const match = part.match(new RegExp(`${name}="([\\s\\S]*?)"`));
            return match ? match[1] : '';
          };

          return (
            <MdxComponents.PromptAnatomy 
              key={i} 
              instruction={getAttr('instruction')} 
              context={getAttr('context')} 
              data={getAttr('data')} 
              indicator={getAttr('indicator')} 
            />
          );
        }

        // 2. Callout
        if (part.startsWith('<Callout')) {
          const typeMatch = part.match(/type="(.*?)"/);
          const type = (typeMatch ? typeMatch[1] : 'info') as any;
          const children = part.replace(/<Callout.*?>|<\/Callout>/g, '').trim();
          
          return (
            <MdxComponents.Callout key={i} type={type}>
               <div dangerouslySetInnerHTML={{ __html: processMarkdown(children) }} />
            </MdxComponents.Callout>
          );
        }
        
        // 3. Cards
        if (part.startsWith('<Cards')) {
          const cardMatches = Array.from(part.matchAll(/<Card\s+title="([^"]*)"\s+href="([^"]*)"\s*>(.*?)<\/Card>/gs));
          const cards = cardMatches.map((m_match, ci) => (
            <MdxComponents.Card key={ci} title={m_match[1]} href={m_match[2]}>{m_match[3]}</MdxComponents.Card>
          ));
          return <MdxComponents.Cards key={i}>{cards}</MdxComponents.Cards>;
        }

        // 4. Steps
        if (part.startsWith('<Steps>')) {
          const children = part.replace(/<Steps>|<\/Steps>/g, '').trim();
          const items = children.split(/\n+(?=\d+\.\s)/).filter(s => s.trim().length > 0);
          
          const steps = items.map((s, si) => {
            const cleanText = s.replace(/^\d+\.\s/, '').trim();
            return (
              <div key={si} className="mb-8 relative">
                <div className="absolute -left-10 top-0.5 w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold font-mono flex items-center justify-center border border-blue-500/20 shadow-sm ring-4 ring-[#020308]">
                  {si + 1}
                </div>
                <div 
                    className="text-gray-300"
                    dangerouslySetInnerHTML={{ __html: processMarkdown(cleanText) }} 
                />
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
          const code = lines.slice(1, -1).join('\n').trim();
          return <MdxComponents.code key={i} className={`language-${lang}`}>{code}</MdxComponents.code>;
        }

        // 6. Headers
        if (part.startsWith('# ')) return <MdxComponents.h1 key={i}>{part.replace('# ', '')}</MdxComponents.h1>;
        if (part.startsWith('## ')) return <MdxComponents.h2 key={i}>{part.replace('## ', '')}</MdxComponents.h2>;
        if (part.startsWith('### ')) return <MdxComponents.h3 key={i}>{part.replace('### ', '')}</MdxComponents.h3>;
        
        // 7. Paragraphs, Lists, and Blockquotes
        // We use a simpler split to avoid breaking lists that are close to paragraphs
        // Splitting by double newline usually indicates a paragraph break.
        const blocks = part.split(/\n{2,}/);
        
        return (
          <React.Fragment key={i}>
            {blocks.map((block, pi) => {
                if (!block.trim()) return null;

                // Blockquotes
                if (block.trim().startsWith('> ')) {
                    const clean = block.replace(/^> /gm, '').trim();
                    return (
                        <MdxComponents.blockquote key={`${i}-${pi}`}>
                            <div dangerouslySetInnerHTML={{ __html: processMarkdown(clean) }} />
                        </MdxComponents.blockquote>
                    );
                }

                // Unordered List (starts with - )
                if (block.trim().startsWith('- ')) {
                    const items = block.trim().split('\n').filter(l => l.trim().startsWith('- ')).map(l => l.replace(/^- /, '').trim());
                    return (
                        <MdxComponents.ul key={`${i}-${pi}`}>
                            {items.map((item, idx) => (
                                <li key={idx} className="relative pl-6 mb-2">
                                  <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-white/20"></span>
                                  <span dangerouslySetInnerHTML={{ __html: processMarkdown(item) }} />
                                </li>
                            ))}
                        </MdxComponents.ul>
                    );
                }

                // Ordered List (starts with 1. )
                if (/^\d+\.\s/.test(block.trim())) {
                    const items = block.trim().split('\n').filter(l => /^\d+\.\s/.test(l.trim())).map(l => l.replace(/^\d+\.\s/, '').trim());
                    return (
                        <MdxComponents.ol key={`${i}-${pi}`}>
                            {items.map((item, idx) => (
                                <li key={idx} dangerouslySetInnerHTML={{ __html: processMarkdown(item) }} />
                            ))}
                        </MdxComponents.ol>
                    );
                }

                return (
                  <MdxComponents.p 
                    key={`${i}-${pi}`} 
                    dangerouslySetInnerHTML={{ 
                      __html: processMarkdown(block)
                    }} 
                  />
                );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default MdxRenderer;
