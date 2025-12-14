import React, { useState, useRef, useEffect } from 'react';
import { getContent } from '../constants';
import { useLanguage, BlogPost } from '../context/LanguageContext';

declare global {
  interface Window {
    MediumEditor: any;
  }
}

interface BlogModuleProps {
  className?: string;
}

const BlogModule: React.FC<BlogModuleProps> = ({ className }) => {
  const { language, t } = useLanguage();
  const content = getContent(language);
  const [posts, setPosts] = useState<BlogPost[]>(content.blogPosts);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Editor State
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  
  const editorRef = useRef<HTMLDivElement>(null);
  const mediumEditorInstance = useRef<any>(null);

  // Initialize Medium Editor when entering edit mode
  useEffect(() => {
    if (isEditing && editorRef.current && window.MediumEditor) {
      mediumEditorInstance.current = new window.MediumEditor(editorRef.current, {
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
        },
        placeholder: {
          text: 'Type your AI insight here...',
          hideOnClick: true,
        },
        theme: 'beagle'
      });

      mediumEditorInstance.current.subscribe('editableInput', (event: any, editable: any) => {
        setEditContent(editable.innerHTML);
      });
    }

    return () => {
      if (mediumEditorInstance.current) {
        mediumEditorInstance.current.destroy();
        mediumEditorInstance.current = null;
      }
    };
  }, [isEditing]);

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: editTitle || 'Untitled Insight',
      excerpt: editContent.replace(/<[^>]+>/g, '').substring(0, 100) + '...',
      content: editContent,
      date: new Date().toISOString().split('T')[0],
      author: 'SuperEgo',
      tags: ['AI', 'Thought']
    };
    
    setPosts([newPost, ...posts]);
    setIsEditing(false);
    setEditTitle('');
    setEditContent('');
  };

  return (
    <div className={`bg-brand-surface/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col relative ${className || 'h-[600px]'}`}>
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-brand-dark/50">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          AI Signals
        </h3>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs px-3 py-1 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-full transition-all border border-blue-500/20"
        >
          {isEditing ? 'Cancel' : 'New Signal'}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto custom-scrollbar p-4 relative">
        
        {/* EDIT MODE */}
        {isEditing && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <input 
              type="text" 
              placeholder="Title of your insight..."
              className="w-full bg-transparent text-xl font-bold text-white mb-4 border-b border-white/10 focus:outline-none focus:border-blue-500 pb-2"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <div 
              ref={editorRef} 
              className="prose prose-invert prose-sm max-w-none focus:outline-none min-h-[300px] text-gray-300"
            />
            <button 
              onClick={handleCreatePost}
              className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:opacity-90 transition-opacity"
            >
              Publish to Second Brain
            </button>
          </div>
        )}

        {/* FEED MODE */}
        {!isEditing && !selectedPost && (
          <div className="space-y-4">
            {posts.map(post => (
              <div 
                key={post.id} 
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all hover:translate-x-1"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-blue-400">{post.date}</span>
                  <div className="flex gap-1">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-gray-400">{tag}</span>
                    ))}
                  </div>
                </div>
                <h4 className="text-md font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{post.title}</h4>
                <p className="text-sm text-gray-400 line-clamp-2">{post.excerpt}</p>
              </div>
            ))}
          </div>
        )}

        {/* READER MODE */}
        {!isEditing && selectedPost && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <button 
              onClick={() => setSelectedPost(null)}
              className="mb-4 flex items-center text-sm text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              Back
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">{selectedPost.title}</h2>
            <div className="flex items-center gap-2 mb-6 text-xs text-gray-500 font-mono border-b border-white/10 pb-4">
              <span>{selectedPost.date}</span>
              <span>//</span>
              <span>AUTHOR: {selectedPost.author}</span>
            </div>
            <div 
              className="prose prose-invert prose-sm max-w-none text-gray-300"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
          </div>
        )}
      </div>
      
      {/* Decorative Footer */}
      <div className="p-3 border-t border-white/10 bg-black/20 text-center">
        <span className="text-[10px] text-gray-600 font-mono tracking-widest">HEXO-INSPIRED REACT SYSTEM // V1.0</span>
      </div>
    </div>
  );
};

export default BlogModule;