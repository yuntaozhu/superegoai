
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import { 
  Search, ChevronRight, List, Terminal, Zap, ExternalLink, ArrowRight, Folder, Hash, Home, Globe
} from 'lucide-react';
import { ContentService, CategoryStructure, PageMeta } from '../lib/ContentService';
import { MdxComponents } from '../components/MdxComponents';

// Using any to bypass framer-motion type mismatch in the current environment
const m = motion as any;

const PromptGuide: React.FC = () => {
  const { language } = useLanguage();
  const [tree, setTree] = useState<CategoryStructure[]>([]);
  const [activePage, setActivePage] = useState<PageMeta | null>(null);
  const [doc, setDoc] = useState<{ content: string; frontmatter: any; title: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initial Indexing and re-index on language change
  useEffect(() => {
    const dataTree = ContentService.getTree(language);
    setTree(dataTree);
    
    // Attempt to maintain selection if path exists in new language tree, otherwise reset to first page
    if (activePage) {
      const currentPath = activePage.path;
      let found = false;
      for (const cat of dataTree) {
        const match = cat.pages.find(p => p.path === currentPath);
        if (match) {
          setActivePage(match);
          found = true;
          break;
        }
      }
      if (!found && dataTree.length > 0) {
        setActivePage(dataTree[0].pages[0]);
      }
    } else if (dataTree.length > 0) {
      setActivePage(dataTree[0].pages[0]);
    }
  }, [language]);

  // Load content when active page or language changes
  useEffect(() => {
    if (activePage) {
      setIsLoading(true);
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      
      ContentService.getPage(activePage.path, language).then(res => {
        setDoc(res);
        setTimeout(() => setIsLoading(false), 200);
      });
    }
  }, [activePage, language]);

  const filteredTree = useMemo(() => {
    if (!searchQuery) return tree;
    const q = searchQuery.toLowerCase();
    return tree.map(cat => ({
      ...cat,
      pages: cat.pages.filter(p => 
        p.title.toLowerCase().includes(q) || 
        cat.title.toLowerCase().includes(q)
      )
    })).filter(cat => cat.pages.length > 0);
  }, [tree, searchQuery]);

  const activeCategoryTitle = useMemo(() => {
    if (!activePage) return '';
    return tree.find(c => c.id === activePage.category)?.title || activePage.category;
  }, [tree, activePage]);

  // Enhanced regex-based "MDX" renderer for browser environment
  const renderMdx = (content: string) => {
    const parts = content.split(/(<Callout[\s\S]*?<\/Callout>|<Cards[\s\S]*?<\/Cards>|<Steps[\s\S]*?<\/Steps>|```[\s\S]*?```|#{1,3}\s.*)/g);

    return parts.map((part, i) => {
      if (!part || !part.trim()) return null;

      // Handle custom components
      if (part.startsWith('<Callout')) {
        const type = part.match(/type="(.*?)"/)?.[1] || 'info';
        const children = part.replace(/<Callout.*?>|<\/Callout>/g, '').trim();
        return <MdxComponents.Callout key={i} type={type as any}>{children}</MdxComponents.Callout>;
      }
      if (part.startsWith('<Cards')) {
        const cardMatches = part.matchAll(/<Card title="(.*?)" href="(.*?)">(.*?)<\/Card>/g);
        const cards = Array.from(cardMatches).map((m_match, ci) => (
          <MdxComponents.Card key={ci} title={m_match[1]} href={m_match[2]}>{m_match[3]}</MdxComponents.Card>
        ));
        return <MdxComponents.Cards key={i}>{cards}</MdxComponents.Cards>;
      }
      if (part.startsWith('<Steps')) {
        const children = part.replace(/<Steps>|<\/Steps>/g, '').trim();
        const steps = children.split(/\n\s*\d+\.\s+/).filter(Boolean).map((s, si) => (
          <div key={si} className="mb-2">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
               {language === 'zh' ? `步骤 ${si + 1}` : `Step ${si + 1}`}
            </h3>
            <MdxComponents.p>{s.trim()}</MdxComponents.p>
          </div>
        ));
        return <MdxComponents.Steps key={i}>{steps}</MdxComponents.Steps>;
      }
      
      // Handle standard markdown
      if (part.startsWith('```')) {
        const lang = part.match(/```(\w+)/)?.[1] || 'text';
        const code = part.replace(/```\w+\n|```/g, '').trim();
        return <MdxComponents.code key={i} className={`language-${lang}`}>{code}</MdxComponents.code>;
      }
      if (part.startsWith('# ')) return <MdxComponents.h1 key={i}>{part.replace('# ', '')}</MdxComponents.h1>;
      if (part.startsWith('## ')) return <MdxComponents.h2 key={i}><Hash className="w-5 h-5 opacity-20" /> {part.replace('## ', '')}</MdxComponents.h2>;
      if (part.startsWith('### ')) return <MdxComponents.h3 key={i}>{part.replace('### ', '')}</MdxComponents.h3>;
      
      return <MdxComponents.p key={i} dangerouslySetInnerHTML={{ __html: part.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>') }} />;
    });
  };

  return (
    <div className="min-h-screen bg-[#020308] pt-16 flex overflow-hidden">
      
      {/* Sidebar: Navigation Matrix */}
      <AnimatePresence>
        {isSidebarOpen && (
          <m.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-72 border-r border-white/5 bg-[#05060f]/90 backdrop-blur-3xl flex flex-col h-[calc(100vh-64px)] z-20"
          >
            <div className="p-6 border-b border-white/5">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-blue-500" />
                </div>
                <h2 className="text-[10px] font-black text-white uppercase tracking-widest">
                  {language === 'zh' ? '索引目录' : 'Metadata Index'}
                </h2>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2