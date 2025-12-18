import React, { useState } from 'react';
import { getContent } from '../constants';
import { useLanguage, Link, useLocation } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  
  const content = getContent(language);
  const courses = content.courses;

  const isActive = (path: string) => location.pathname === path || (path === '/planets' && location.pathname.startsWith('/course/'));

  return (
    <nav className="fixed w-full z-50 bg-brand-dark/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-white font-bold text-2xl tracking-tight">
                SuperEgoAI
              </span>
            </Link>
          </div>
          
          {/* Main Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-5 py-2.5 rounded-lg text-lg font-medium transition-all ${
                location.pathname === '/' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {t('nav.home')}
            </Link>

            <Link
              to="/consulting"
              className={`px-5 py-2.5 rounded-lg text-lg font-medium transition-all ${
                location.pathname === '/consulting' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {t('nav.consulting')}
            </Link>

            <Link
              to="/blog"
              className={`px-5 py-2.5 rounded-lg text-lg font-medium transition-all ${
                location.pathname === '/blog' ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {t('nav.blog')}
            </Link>

            <Link
              to="/planets"
              className={`px-5 py-2.5 rounded-lg text-lg font-medium transition-all flex items-center gap-1 ${
                isActive('/planets') ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {t('nav.planets')}
              <svg className="w-4 h-4 mt-0.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </Link>

            {/* Separator and Language Switcher */}
            <div className="flex items-center ml-4">
              <div className="h-6 w-[1px] bg-white/10 mx-6"></div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`${language === 'en' ? 'text-white' : 'text-gray-500 hover:text-gray-300'} transition-colors`}
                >
                  EN
                </button>
                <span className="text-gray-700">/</span>
                <button 
                  onClick={() => setLanguage('zh')}
                  className={`${language === 'zh' ? 'text-white' : 'text-gray-500 hover:text-gray-300'} transition-colors`}
                >
                  中
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
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
        <div className="md:hidden bg-brand-dark/98 backdrop-blur-2xl border-b border-white/5 px-4 py-6 space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-xl font-medium text-gray-300 hover:text-white">首页</Link>
          <Link to="/consulting" onClick={() => setIsOpen(false)} className="block text-xl font-medium text-gray-300 hover:text-white">AI 咨询</Link>
          <Link to="/blog" onClick={() => setIsOpen(false)} className="block text-xl font-medium text-gray-300 hover:text-white">博客</Link>
          <Link to="/planets" onClick={() => setIsOpen(false)} className="block text-xl font-medium text-gray-300 hover:text-white">课程星球</Link>
          <div className="flex gap-4 pt-4 border-t border-white/5">
            <button onClick={() => { setLanguage('en'); setIsOpen(false); }} className={`text-sm ${language === 'en' ? 'text-white font-bold' : 'text-gray-500'}`}>EN</button>
            <button onClick={() => { setLanguage('zh'); setIsOpen(false); }} className={`text-sm ${language === 'zh' ? 'text-white font-bold' : 'text-gray-500'}`}>中</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;