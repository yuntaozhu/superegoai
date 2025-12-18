import React, { useState } from 'react';
import { getContent } from '../constants';
import { useLanguage, Link, useLocation } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  
  const content = getContent(language);
  const courses = content.courses;

  const isActive = (path: string) => location.pathname === path;

  // Determine current course color for dynamic themes
  const currentCourseId = location.pathname.startsWith('/course/') 
    ? location.pathname.split('/')[2] 
    : null;
  const currentCourse = courses.find(c => c.id === currentCourseId);

  return (
    <nav className="fixed w-full z-50 transition-all duration-500">
      {/* CSS 3D Glassmorphism Background Container */}
      <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-0"></div>
      
      {/* Gradient Border Line */}
      {currentCourse && (
         <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r ${currentCourse.color} opacity-100 z-10 shadow-[0_0_15px_rgba(255,255,255,0.3)]`} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:rotate-12 transition-transform">
                🧠
              </div>
              <span className="text-white font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400 group-hover:to-white transition-all duration-300">
                SuperEgoAI
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-lg text-sm font-bold tracking-wide transition-all ${
                  isActive('/') ? 'text-blue-400 bg-white/5' : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('nav.home')}
              </Link>

              <Link
                to="/planets"
                className={`px-3 py-2 rounded-lg text-sm font-bold tracking-wide transition-all ${
                  isActive('/planets') ? 'text-blue-400 bg-white/5' : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('nav.planets')}
              </Link>

              <Link
                to="/studio"
                className={`px-3 py-2 rounded-lg text-sm font-bold tracking-wide transition-all ${
                  isActive('/studio') ? 'text-blue-400 bg-white/5' : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('nav.studio') || 'AI Studio'}
              </Link>

              <Link
                to="/consulting"
                className={`px-3 py-2 rounded-lg text-sm font-bold tracking-wide transition-all ${
                  isActive('/consulting') ? 'text-blue-400 bg-white/5' : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('nav.consulting')}
              </Link>

              <div className="flex items-center ml-4 border-l border-white/10 pl-4 space-x-2">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`text-[10px] font-black px-2 py-1 rounded ${language === 'en' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('zh')}
                  className={`text-[10px] font-black px-2 py-1 rounded ${language === 'zh' ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                >
                  ZH
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-dark/95 backdrop-blur-2xl border-b border-white/10 px-4 py-6 space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-lg font-bold">Home</Link>
          <Link to="/planets" onClick={() => setIsOpen(false)} className="block text-lg font-bold">Planets</Link>
          <Link to="/studio" onClick={() => setIsOpen(false)} className="block text-lg font-bold">Studio</Link>
          <Link to="/consulting" onClick={() => setIsOpen(false)} className="block text-lg font-bold">Consulting</Link>
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button onClick={() => setLanguage('en')} className={`text-sm ${language === 'en' ? 'text-blue-400' : 'text-gray-500'}`}>English</button>
            <button onClick={() => setLanguage('zh')} className={`text-sm ${language === 'zh' ? 'text-blue-400' : 'text-gray-500'}`}>中文</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
