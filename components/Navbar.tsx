import React, { useState } from 'react';
import { useLanguage, Link, useLocation } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  
  const isActive = (path: string) => location.pathname === path;
  const logoSrc = './images/logo.png';

  return (
    <nav className="fixed w-full z-50 transition-all duration-500">
      <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex items-center">
                 <img 
                   src={logoSrc} 
                   alt="SuperEgoAI Logo" 
                   className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" 
                   onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                 />
              </div>
              <span className="text-white font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400">
                SuperEgoAI
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all ${
                  isActive('/') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('nav.home')}
              </Link>

              <Link
                to="/planets"
                className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all ${
                  isActive('/planets') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('nav.planets')}
              </Link>

              <Link
                to="/consulting"
                className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all ${
                  isActive('/consulting') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('nav.consulting')}
              </Link>

              <Link
                to="/blog"
                className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all ${
                  isActive('/blog') ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
                }`}
              >
                {t('nav.blog')}
              </Link>

              <div className="flex items-center ml-6 border-l border-white/20 pl-6 space-x-3">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`text-sm font-bold ${language === 'en' ? 'text-white' : 'text-gray-500'}`}
                >
                  EN
                </button>
                <span className="text-gray-600">/</span>
                <button 
                  onClick={() => setLanguage('zh')}
                  className={`text-sm font-bold ${language === 'zh' ? 'text-white' : 'text-gray-500'}`}
                >
                  中
                </button>
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-brand-surface/95 backdrop-blur-xl border-b border-white/10 px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 text-white" onClick={() => setIsOpen(false)}>{t('nav.home')}</Link>
          <Link to="/planets" className="block px-3 py-2 text-white" onClick={() => setIsOpen(false)}>{t('nav.planets')}</Link>
          <Link to="/consulting" className="block px-3 py-2 text-white" onClick={() => setIsOpen(false)}>{t('nav.consulting')}</Link>
          <Link to="/blog" className="block px-3 py-2 text-white" onClick={() => setIsOpen(false)}>{t('nav.blog')}</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;