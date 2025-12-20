
import React, { useState } from 'react';
import { getContent } from '../constants';
import { useLanguage, Link, useLocation } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  
  const content = getContent(language);
  const courses = content.courses;

  const isActive = (path: string) => 
    location.pathname === path || (path === '/planets' && location.pathname.startsWith('/course/'));

  return (
    <nav className="fixed w-full z-50 bg-brand-dark/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="text-white font-black text-xl md:text-2xl tracking-tighter group-hover:text-blue-400 transition-colors">
                SuperEgoAI
              </span>
            </Link>
          </div>
          
          {/* Main Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-5 py-2 rounded-lg text-base font-bold transition-all ${
                location.pathname === '/' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t('nav.home')}
            </Link>

            <Link
              to="/prompt-guide"
              className={`px-5 py-2 rounded-lg text-base font-bold transition-all flex items-center gap-2 ${
                location.pathname === '/prompt-guide' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t('nav.prompt_guide')}
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            </Link>

            <Link
              to="/about"
              className={`px-5 py-2 rounded-lg text-base font-bold transition-all ${
                location.pathname === '/about' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t('nav.about')}
            </Link>

            <Link
              to="/consulting"
              className={`px-5 py-2 rounded-lg text-base font-bold transition-all ${
                location.pathname === '/consulting' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t('nav.consulting')}
            </Link>

            <Link
              to="/blog"
              className={`px-5 py-2 rounded-lg text-base font-bold transition-all ${
                location.pathname === '/blog' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t('nav.blog')}
            </Link>

            <Link
              to="/planets"
              className={`px-5 py-2 rounded-lg text-base font-bold transition-all flex items-center gap-1.5 ${
                isActive('/planets') ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t('nav.planets')}
              <svg className={`w-4 h-4 mt-0.5 transition-transform ${isActive('/planets') ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {/* Separator and Language Switcher */}
            <div className="flex items-center">
              <div className="h-5 w-[1px] bg-white/10 mx-5"></div>
              <div className="flex items-center gap-1 text-xs font-black font-mono">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded transition-colors ${language === 'en' ? 'text-white bg-blue-600' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('zh')}
                  className={`px-2 py-1 rounded transition-colors ${language === 'zh' ? 'text-white bg-blue-600' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  ZH
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[64px] z-40 bg-brand-dark/95 backdrop-blur-3xl animate-in fade-in slide-in-from-top-4 duration-300 overflow-y-auto">
          <div className="px-6 py-10 space-y-2 flex flex-col h-full">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)} 
              className={`block px-4 py-4 rounded-2xl text-2xl font-black tracking-tight transition-colors ${location.pathname === '/' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/prompt-guide" 
              onClick={() => setIsOpen(false)} 
              className={`block px-4 py-4 rounded-2xl text-2xl font-black tracking-tight transition-colors ${location.pathname === '/prompt-guide' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t('nav.prompt_guide')}
            </Link>
            <Link 
              to="/about" 
              onClick={() => setIsOpen(false)} 
              className={`block px-4 py-4 rounded-2xl text-2xl font-black tracking-tight transition-colors ${location.pathname === '/about' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/consulting" 
              onClick={() => setIsOpen(false)} 
              className={`block px-4 py-4 rounded-2xl text-2xl font-black tracking-tight transition-colors ${location.pathname === '/consulting' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t('nav.consulting')}
            </Link>
            <Link 
              to="/blog" 
              onClick={() => setIsOpen(false)} 
              className={`block px-4 py-4 rounded-2xl text-2xl font-black tracking-tight transition-colors ${location.pathname === '/blog' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t('nav.blog')}
            </Link>
            <Link 
              to="/planets" 
              onClick={() => setIsOpen(false)} 
              className={`block px-4 py-4 rounded-2xl text-2xl font-black tracking-tight transition-colors ${isActive('/planets') ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t('nav.planets')}
            </Link>

            <div className="mt-auto pb-10">
              <div className="h-[1px] bg-white/10 mb-8 mx-4"></div>
              <div className="flex gap-4 px-4">
                <button 
                  onClick={() => { setLanguage('en'); setIsOpen(false); }} 
                  className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all ${language === 'en' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white/5 text-gray-500'}`}
                >
                  ENGLISH
                </button>
                <button 
                  onClick={() => { setLanguage('zh'); setIsOpen(false); }} 
                  className={`flex-1 py-4 rounded-2xl font-black text-lg transition-all ${language === 'zh' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white/5 text-gray-500'}`}
                >
                  中文
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
