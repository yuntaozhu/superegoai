
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { getContent } from '../constants';
import { useLanguage, BlogPost, Link } from '../context/LanguageContext';

const POSTS_INCREMENT = 10;

const BlogPage: React.FC = () => {
  const { language, t } = useLanguage();
  const content = getContent(language);
  const [searchValue, setSearchValue] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(POSTS_INCREMENT);
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(content.blogPosts.flatMap(post => post.tags))).sort();

  // Filter posts based on search AND selected tag
  const filteredPosts = content.blogPosts.filter((post) => {
    const searchContent = post.title + post.excerpt + post.tags.join(' ');
    const matchesSearch = searchContent.toLowerCase().includes(searchValue.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  // Calculate displayed posts (Infinite Scroll)
  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(POSTS_INCREMENT);
    if (!selectedPost) window.scrollTo(0, 0);
  }, [searchValue, selectedTag, selectedPost]);

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
      if (!selectedPost) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedPost]);

  // SEO: Dynamic Meta Tags
  useEffect(() => {
    const baseTitle = language === 'en' ? 'Blog | AI First Course' : '博客 | AI First Course';
    const baseDesc = language === 'en' 
        ? 'Insights on AI, Architecture, and the SuperEgo. Technical deep dives into AI agents, architecture, and the future of coding.' 
        : '关于 AI、架构与超我的深度洞察。关于 AI 智能体、架构与编程未来的技术深度探索。';

    let title = baseTitle;
    let description = baseDesc;

    if (selectedPost) {
        title = `${selectedPost.title} | AI First Course`;
        description = selectedPost.excerpt;
    }

    document.title = title;
    
    const setMetaTag = (name: string, content: string) => {
        let element = document.querySelector(`meta[name="${name}"]`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute('name', name);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    setMetaTag('description', description);
  }, [selectedPost, language]);

  // Social Sharing Logic
  const handleShare = (platform: 'twitter' | 'wechat' | 'rednote') => {
    if (!selectedPost) return;
    const url = window.location.href;
    const text = `${selectedPost.title} - AI First Course`;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else {
      navigator.clipboard.writeText(`${text} ${url}`).then(() => {
        const msg = language === 'en' ? 'Link copied!' : '链接已复制！';
        setToastMsg(msg);
        setTimeout(() => setToastMsg(null), 3000);
      });
    }
  };

  // Handle Detail View
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-brand-dark pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/5">
           <div 
             className="h-full bg-blue-500 transition-all duration-100" 
             style={{ width: `${scrollProgress}%` }} 
           />
        </div>

        {/* Toast Notification */}
        {toastMsg && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4">
             <div className="bg-brand-surface/90 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full shadow-2xl">
               {toastMsg}
             </div>
          </div>
        )}

        <article className="max-w-3xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => { setSelectedPost(null); setScrollProgress(0); }}
            className="group mb-12 flex items-center text-sm text-gray-400 hover:text-blue-400 transition-colors font-medium bg-white/5 px-4 py-2 rounded-full border border-white/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            {language === 'en' ? 'All Posts' : '所有文章'}
          </button>

          {/* Header */}
          <header className="mb-12 text-center">
             <div className="mb-4 text-xs text-blue-500 font-mono tracking-widest uppercase">
                {new Date(selectedPost.date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
             </div>
             <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-[1.1] uppercase">
               {selectedPost.title}
             </h1>
             <div className="flex justify-center gap-3 flex-wrap">
                {selectedPost.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
             </div>
          </header>
          
          {/* Main Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none text-gray-300 leading-8"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />

          {/* Social Share & Author */}
          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl">🧠</div>
               <div>
                  <div className="text-white font-bold">{selectedPost.author}</div>
                  <div className="text-xs text-gray-500">SuperEgo Architect</div>
               </div>
             </div>
             
             <div className="flex items-center gap-4">
                <button onClick={() => handleShare('twitter')} className="p-3 bg-white/5 rounded-full hover:bg-blue-400 hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                </button>
                <button onClick={() => handleShare('wechat')} className="p-3 bg-white/5 rounded-full hover:bg-green-500 hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.5,13.5A2.5,2.5 0 0,0 11,11A2.5,2.5 0 0,0 8.5,8.5C7.12,8.5 6,9.62 6,11A2.5,2.5 0 0,0 8.5,13.5M16.5,13.5A2.5,2.5 0 0,0 19,11A2.5,2.5 0 0,0 16.5,8.5C15.12,8.5 14,9.62 14,11A2.5,2.5 0 0,0 16.5,13.5M12.5,2C6.98,2 2.5,6.03 2.5,11C2.5,13.68 3.93,16.09 6.24,17.72L5.5,22L9.56,20.06C10.47,20.36 11.45,20.53 12.47,20.53L12.5,20.53C18.02,20.53 22.5,16.5 22.5,11.53C22.5,6.56 18.02,2 12.5,2Z"></path></svg>
                </button>
             </div>
          </div>
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
                    <div className="text-xs font-mono text-gray-600 uppercase tracking-widest">{post.date}</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                       {post.tags.map(t => (
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
                      <button onClick={() => setSelectedPost(post)} className="text-left leading-tight">
                        {post.title}
                      </button>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed font-light line-clamp-3">
                      {post.excerpt}
                    </p>
                    <button 
                      onClick={() => setSelectedPost(post)}
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

const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
);

// Local definition of ArrowLeft used for consistent SVG icon styling
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
);

export default BlogPage;
