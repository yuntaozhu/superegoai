
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage, Link } from '../context/LanguageContext';
import { Home, ChevronRight, Search, ArrowLeft, Loader2, FileText, Calendar, Tag } from 'lucide-react';
import { ContentService, PageMeta, PageContent } from '../lib/ContentService';
import MdxRenderer from '../components/MdxRenderer';
import { motion, AnimatePresence } from 'framer-motion';

// Using any to bypass framer-motion type mismatch
const m = motion as any;

const POSTS_INCREMENT = 10;

const BlogPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [posts, setPosts] = useState<PageMeta[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedPostMeta, setSelectedPostMeta] = useState<PageMeta | null>(null);
  const [postContent, setPostContent] = useState<PageContent | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [visibleCount, setVisibleCount] = useState(POSTS_INCREMENT);
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 1. Fetch Blog Posts List on Mount/Lang Change
  useEffect(() => {
    const fetchedPosts = ContentService.getBlogPosts(language);
    setPosts(fetchedPosts);
  }, [language]);

  // 2. Fetch Post Content when selected
  useEffect(() => {
    if (selectedPostMeta) {
      setIsLoadingContent(true);
      ContentService.getPage(selectedPostMeta.path, language).then(content => {
        setPostContent(content);
        setIsLoadingContent(false);
        window.scrollTo(0, 0);
      });
    } else {
      setPostContent(null);
    }
  }, [selectedPostMeta, language]);

  // Extract all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || []))).sort();

  // Filter posts based on search AND selected tag
  const filteredPosts = posts.filter((post) => {
    const searchContent = (post.title + (post.description || '') + (post.tags || []).join(' ')).toLowerCase();
    const matchesSearch = searchContent.includes(searchValue.toLowerCase());
    const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  // Calculate displayed posts (Infinite Scroll)
  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(POSTS_INCREMENT);
    if (!selectedPostMeta) window.scrollTo(0, 0);
  }, [searchValue, selectedTag, selectedPostMeta]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount((prev) => prev + POSTS_INCREMENT);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore]);

  // Reading Progress Logic
  useEffect(() => {
    const handleScroll = () => {
      if (!selectedPostMeta) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPostMeta]);

  // Handle Detail View
  if (selectedPostMeta) {
    return (
      <div className="min-h-screen bg-brand-dark pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/5">
           <div 
             className="h-full bg-blue-500 transition-all duration-100" 
             style={{ width: `${scrollProgress}%` }} 
           />
        </div>

        <article className="max-w-3xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 mb-8 text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-500 overflow-hidden whitespace-nowrap">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-3 h-3" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <button 
              onClick={() => { setSelectedPostMeta(null); setScrollProgress(0); }}
              className="hover:text-white transition-colors"
            >
              {language === 'en' ? 'Insights' : '洞察'}
            </button>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-gray-400 truncate max-w-[150px] sm:max-w-xs">
              {selectedPostMeta.title}
            </span>
          </nav>

          {/* Back Button */}
          <button 
            onClick={() => { setSelectedPostMeta(null); setScrollProgress(0); }}
            className="group mb-12 flex items-center text-sm text-gray-400 hover:text-blue-400 transition-colors font-medium bg-white/5 px-4 py-2 rounded-full border border-white/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            {language === 'en' ? 'All Posts' : '所有文章'}
          </button>

          {isLoadingContent ? (
             <div className="flex flex-col items-center justify-center py-20 text-gray-500">
               <Loader2 className="w-8 h-8 animate-spin mb-4" />
               <span className="text-xs font-mono uppercase tracking-widest">Loading Signal...</span>
             </div>
          ) : postContent ? (
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Header */}
              <header className="mb-12 text-center">
                 <div className="mb-4 text-xs text-blue-500 font-mono tracking-widest uppercase flex items-center justify-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {selectedPostMeta.date ? new Date(selectedPostMeta.date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown Date'}
                 </div>
                 <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-[1.1] uppercase">
                   {postContent.title}
                 </h1>
                 <div className="flex justify-center gap-3 flex-wrap">
                    {selectedPostMeta.tags?.map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10 uppercase tracking-widest flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" /> {tag}
                      </span>
                    ))}
                 </div>
              </header>
              
              {/* Main Content Rendered via MDX */}
              <div className="prose prose-invert prose-lg max-w-none">
                 <MdxRenderer content={postContent.content} />
              </div>

              {/* Social Share & Author */}
              <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl text-white font-bold">
                      {selectedPostMeta.author ? selectedPostMeta.author.charAt(0) : 'S'}
                   </div>
                   <div>
                      <div className="text-white font-bold">{selectedPostMeta.author || 'SuperEgo Team'}</div>
                      <div className="text-xs text-gray-500">SuperEgo Architect</div>
                   </div>
                 </div>
              </div>
            </m.div>
          ) : (
            <div className="text-center py-20 text-red-400">Failed to load content.</div>
          )}
        </article>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="group inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 font-mono text-xs uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {language === 'en' ? 'Back to Home' : '返回首页'}
        </Link>

        <header className="mb-16 border-b border-white/10 pb-12">
          <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
            {t('nav.blog')}
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl">
            {language === 'en' ? 'Insights on AI, Architecture, and the SuperEgo.' : '关于 AI、架构与超我的深度洞察。'}
          </p>
          
          <div className="mt-10 relative max-w-xl">
            <input
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={language === 'en' ? 'Search signals...' : '搜索信号...'}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white focus:outline-none focus:border-blue-500 transition-all backdrop-blur-md"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-grow space-y-20">
            {displayedPosts.length === 0 && (
              <div className="text-center py-20 text-gray-500 italic">No signals found in the matrix.</div>
            )}
            {displayedPosts.map((post) => (
              <article key={post.id} className="group relative">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/4">
                    <div className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-2">{post.date}</div>
                    <div className="flex flex-wrap gap-2">
                       {post.tags?.map(t => (
                         <button 
                           key={t} 
                           onClick={() => setSelectedTag(t)}
                           className="text-[9px] font-bold text-blue-500/60 hover:text-blue-500 uppercase tracking-widest transition-colors"
                         >
                           {t}
                         </button>
                       ))}
                    </div>
                  </div>
                  <div className="md:w-3/4 space-y-6">
                    <h2 className="text-3xl md:text-4xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                      <button onClick={() => setSelectedPostMeta(post)} className="text-left leading-tight">
                        {post.title}
                      </button>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed font-light line-clamp-3">
                      {post.description}
                    </p>
                    <button 
                      onClick={() => setSelectedPostMeta(post)}
                      className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black uppercase tracking-widest text-[10px] border border-white/5 transition-all group/btn"
                    >
                      {language === 'en' ? 'Read Signal' : '阅读信号'}
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
            
            <div ref={observerTarget} className="h-10" />
          </div>

          <aside className="lg:w-1/4 space-y-12">
             <div className="sticky top-24">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-2">Archives</h3>
                <div className="flex flex-wrap gap-2">
                   <button 
                     onClick={() => setSelectedTag(null)}
                     className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${!selectedTag ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                   >
                     All
                   </button>
                   {allTags.map(tag => (
                     <button 
                       key={tag}
                       onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                       className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                     >
                       {tag}
                     </button>
                   ))}
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
