
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

  // Determine current course color
  const currentCourseId = location.pathname.startsWith('/course/') 
    ? location.pathname.split('/')[2] 
    : null;
  const currentCourse = courses.find(c => c.id === currentCourseId);
  
  // Dynamic styles based on course
  const navStyle = currentCourse ? { paddingBottom: '1px' } : {};

  return (
    <nav 
      className="fixed w-full z-50 transition-all duration-500" 
      style={navStyle}
    >
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
              {/* Logo Image with 3D hover effect */}
              <div className="relative transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                 <img src="/logo.png" alt="SuperEgoAI" className="w-10 h-10 object-contain" />
              </div>
              <span className="text-white font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400 group-hover:to-white transition-all duration-300 drop-shadow-sm">
                SuperEgoAI
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {/* Nav Item: Home */}
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 ${
                  isActive('/') 
                    ? 'bg-white/10 text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] border border-white/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
                }`}
              >
                {t('nav.home')}
              </Link>

              {/* Nav Item: Consulting */}
              <Link
                to="/consulting"
                className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 ${
                  isActive('/consulting') 
                    ? 'bg-white/10 text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] border border-white/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
                }`}
              >
                {t('nav.consulting')}
              </Link>

              {/* Nav Item: Blog */}
              <Link
                to="/blog"
                className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 ${
                  isActive('/blog') 
                    ? 'bg-white/10 text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] border border-white/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
                }`}
              >
                {t('nav.blog')}
              </Link>
              
              {/* Dropdown: Planets */}
              <div className="relative group">
                <button className="px-4 py-2 rounded-lg text-lg font-semibold text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-1 focus:outline-none transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                  {t('nav.planets')}
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className="absolute left-0 mt-3 w-72 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-brand-dark/95 border border-white/10 ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left backdrop-blur-md translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="py-2">
                    {courses.map((course) => (
                      <Link
                        key={course.id}
                        to={`/course/${course.id}`}
                        className="block px-4 py-3 text-base font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors flex items-center group/item"
                      >
                        <span className="mr-3 text-xl group-hover/item:scale-110 transition-transform duration-200">{course.icon}</span>
                        {course.shortTitle}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center ml-6 border-l border-white/20 pl-6 space-x-3">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5 ${language === 'en' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  EN
                </button>
                <span className="text-gray-600">/</span>
                <button 
                  onClick={() => setLanguage('zh')}
                  className={`text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5 ${language === 'zh' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  中
                </button>
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors"
            >
              <svg className="h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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

      {isOpen && (
        <div className="md:hidden bg-brand-surface/95 backdrop-blur-xl border-b border-white/10 relative z-40 shadow-2xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-3 rounded-lg text-lg font-bold text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/consulting"
              className="block px-3 py-3 rounded-lg text-lg font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.consulting')}
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-3 rounded-lg text-lg font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.blog')}
            </Link>
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="block px-3 py-3 rounded-lg text-lg font-bold text-gray-300 hover:text-white hover:bg-white/10 flex items-center transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">{course.icon}</span>
                {course.shortTitle}
              </Link>
            ))}
             <div className="flex items-center px-3 py-4 space-x-6 border-t border-white/10 mt-2">
                <button 
                  onClick={() => { setLanguage('en'); setIsOpen(false); }}
                  className={`text-lg font-bold ${language === 'en' ? 'text-blue-400' : 'text-gray-400'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => { setLanguage('zh'); setIsOpen(false); }}
                  className={`text-lg font-bold ${language === 'zh' ? 'text-blue-400' : 'text-gray-400'}`}
                >
                  中文
                </button>
              </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
