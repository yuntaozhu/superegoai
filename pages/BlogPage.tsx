import React, { useState, useEffect } from 'react';
import { getContent } from '../constants';
import { useLanguage, BlogPost } from '../context/LanguageContext';

const BlogPage: React.FC = () => {
  const { language, t } = useLanguage();
  const content = getContent(language);
  const [searchValue, setSearchValue] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(content.blogPosts.flatMap(post => post.tags))).sort();

  // Filter posts based on search AND selected tag
  const filteredPosts = content.blogPosts.filter((post) => {
    const searchContent = post.title + post.excerpt + post.tags.join(' ');
    const matchesSearch = searchContent.toLowerCase().includes(searchValue.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  // Scroll to top when entering or changing view
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPost]);

  // Handle Detail View
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-brand-dark pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => setSelectedPost(null)}
            className="group mb-8 flex items-center text-sm text-gray-400 hover:text-blue-400 transition-colors font-medium"
          >
            <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to blog
          </button>

          {/* Header */}
          <header className="mb-10 text-center border-b border-white/10 pb-10">
             <div className="mb-4 text-sm text-gray-500 font-mono tracking-wider">
                <time dateTime={selectedPost.date}>
                  {new Date(selectedPost.date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
             </div>
             <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
               {selectedPost.title}
             </h1>
             <div className="flex justify-center gap-3 flex-wrap">
                {selectedPost.tags.map(tag => (
                  <span key={tag} className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
             </div>
          </header>
          
          {/* Prose Content - Using Tailwind Typography */}
          <div 
            className="prose prose-invert prose-lg max-w-none text-gray-300 leading-8 prose-headings:text-gray-100 prose-a:text-blue-400 prose-strong:text-white prose-code:text-pink-400 prose-pre:bg-gray-800 prose-pre:border prose-pre:border-white/10"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />

          {/* Author Footer */}
          <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between text-sm text-gray-500">
             <div>Author: <span className="text-gray-200 font-medium">{selectedPost.author}</span></div>
             <div className="flex gap-4">
                <button className="hover:text-white transition-colors">Share on Twitter</button>
             </div>
          </div>
        </article>
      </div>
    );
  }

  // Handle Main List View with Sidebar
  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="space-y-2 pb-8 pt-6 md:space-y-5 border-b border-white/10 mb-10">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-white sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('nav.blog')}
          </h1>
          <p className="text-lg leading-7 text-gray-400">
            {language === 'en' ? 'Insights on AI, Architecture, and the SuperEgo.' : '关于 AI、架构与超我的深度洞察。'}
          </p>
          
          {/* Search Bar - Styled to match reference */}
          <div className="relative max-w-lg mt-6">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={language === 'en' ? 'Search articles' : '搜索文章'}
              className="block w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 pl-10 text-gray-100 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-1 sm:text-sm placeholder-gray-500 transition-all backdrop-blur-sm shadow-inner"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* 2-Column Layout: Main Content + Tags Sidebar */}
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Left Column: Post List */}
          <div className="md:w-3/4">
            <ul className="divide-y divide-white/10">
              {!filteredPosts.length && (
                <li className="py-12 text-center text-gray-500 italic">
                    {language === 'en' ? 'No posts found matching your criteria.' : '没有找到匹配的文章。'}
                </li>
              )}
              {filteredPosts.map((post) => {
                const date = new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });
                return (
                  <li key={post.id} className="py-12 group">
                    <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 gap-6">
                      
                      {/* Date Column - Sticky for visual structure */}
                      <dl className="xl:col-span-1">
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 font-mono">
                          <time dateTime={post.date}>{date}</time>
                        </dd>
                      </dl>
                      
                      {/* Content Column */}
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight mb-2">
                              <button
                                onClick={() => setSelectedPost(post)}
                                className="text-gray-100 hover:text-blue-400 transition-colors duration-200 text-left"
                              >
                                {post.title}
                              </button>
                            </h2>
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag) => (
                                <button 
                                  key={tag} 
                                  onClick={(e) => { e.stopPropagation(); setSelectedTag(tag); }}
                                  className="text-xs font-medium px-2 py-0.5 rounded uppercase text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                  {tag.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="prose prose-invert max-w-none text-gray-400 line-clamp-3">
                            {post.excerpt}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <button
                            onClick={() => setSelectedPost(post)}
                            className="text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1 group-hover:gap-2 duration-300"
                            aria-label={`Read "${post.title}"`}
                          >
                            {language === 'en' ? 'Read more' : '阅读更多'} &rarr;
                          </button>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column: Tags Sidebar (Sticky) */}
          <aside className="md:w-1/4">
             <div className="sticky top-24 space-y-8 bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
                <div>
                   <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                      {language === 'en' ? 'Tags' : '标签'}
                   </h3>
                   <div className="flex flex-wrap gap-3">
                      {/* 'All' Tag */}
                      <button
                        onClick={() => setSelectedTag(null)}
                        className={`text-xs px-2 py-1 rounded transition-all font-mono ${
                            !selectedTag 
                            ? 'text-blue-400 underline underline-offset-4 decoration-blue-500/50' 
                            : 'text-gray-400 hover:text-blue-400'
                        }`}
                      >
                         ALL
                      </button>
                      {/* Dynamic Tags */}
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                          className={`text-xs px-2 py-1 rounded transition-all font-mono uppercase ${
                              selectedTag === tag
                              ? 'text-blue-400 underline underline-offset-4 decoration-blue-500/50'
                              : 'text-gray-400 hover:text-blue-400'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                   </div>
                </div>

                {/* About Widget */}
                <div className="pt-4 border-t border-white/10">
                   <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      About
                   </h3>
                   <p className="text-sm text-gray-500 leading-relaxed">
                      {language === 'en' 
                        ? 'Technical deep dives into AI agents, architecture, and the future of coding.' 
                        : '关于 AI 智能体、架构与编程未来的技术深度探索。'}
                   </p>
                </div>
             </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default BlogPage;