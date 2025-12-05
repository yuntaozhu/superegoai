import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getContent } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  
  const content = getContent(language);
  const courses = content.courses;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-brand-dark/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">First Course</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') ? 'bg-brand-surface text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {t('nav.home')}
              </Link>
              
              <div className="relative group">
                <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-1 focus:outline-none">
                  {t('nav.planets')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-brand-surface border border-white/10 ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                  <div className="py-1">
                    {courses.map((course) => (
                      <Link
                        key={course.id}
                        to={`/course/${course.id}`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                      >
                        <span className="mr-2">{course.icon}</span>
                        {course.shortTitle}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center ml-4 border-l border-white/20 pl-4 space-x-2">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`text-sm font-medium transition-colors ${language === 'en' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  EN
                </button>
                <span className="text-gray-600">/</span>
                <button 
                  onClick={() => setLanguage('zh')}
                  className={`text-sm font-medium transition-colors ${language === 'zh' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  中
                </button>
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
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

      {isOpen && (
        <div className="md:hidden bg-brand-surface border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.home')}
            </Link>
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {course.shortTitle}
              </Link>
            ))}
             <div className="flex items-center px-3 py-3 space-x-4 border-t border-white/10 mt-2">
                <button 
                  onClick={() => { setLanguage('en'); setIsOpen(false); }}
                  className={`text-base font-medium ${language === 'en' ? 'text-blue-400' : 'text-gray-400'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => { setLanguage('zh'); setIsOpen(false); }}
                  className={`text-base font-medium ${language === 'zh' ? 'text-blue-400' : 'text-gray-400'}`}
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
