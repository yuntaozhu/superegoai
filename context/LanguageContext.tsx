import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations } from '../translations';
import { BlogPost } from '../types';

export type { BlogPost };
export type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh'); // Default to Chinese as per course material

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        return key; // Fallback to key if not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// --- Custom Router Implementation ---

const RouterContext = createContext<{ path: string }>({ path: '/' });
const RouteParamsContext = createContext<Record<string, string>>({});

export const HashRouter: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handler = () => {
      const currentPath = window.location.hash.slice(1);
      setPath(currentPath || '/');
    };
    window.addEventListener('hashchange', handler);
    // Initialize if hash is empty
    if (!window.location.hash) {
        window.location.hash = '#/';
    }
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return (
    <RouterContext.Provider value={{ path }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useLocation = () => {
  const { path } = useContext(RouterContext);
  return { pathname: path };
};

export const useParams = <T extends Record<string, string>>(): T => {
    return (useContext(RouteParamsContext) || {}) as T;
};

export const Navigate: React.FC<{ to: string; replace?: boolean }> = ({ to, replace }) => {
    useEffect(() => {
        if (replace) {
             const url = window.location.href.split('#')[0] + '#' + to;
             window.location.replace(url);
        } else {
             window.location.hash = to;
        }
    }, [to, replace]);
    return null;
};

// --- Fix: Link component should accept React.MouseEventHandler to allow passing event arguments (like stopPropagation) ---
export const Link: React.FC<{ to: string; children: ReactNode; className?: string; onClick?: React.MouseEventHandler<HTMLAnchorElement> }> = ({ to, children, className, onClick }) => {
    return (
        <a href={`#${to}`} className={className} onClick={onClick}>
            {children}
        </a>
    );
};

export const Route: React.FC<{ path: string; element: ReactNode }> = () => null;

export const Routes: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { path } = useContext(RouterContext);
    
    let match = null;
    let element = null;
    let params = {};

    React.Children.forEach(children, child => {
        if (match) return;
        if (!React.isValidElement(child)) return;
        
        const props = child.props as { path: string; element: ReactNode };
        const pattern = props.path;
        
        // Simple matching logic for / and /course/:id
        const patternParts = pattern.split('/');
        const pathParts = path.split('/');
        
        if (patternParts.length === pathParts.length) {
            let isMatch = true;
            const currentParams: Record<string, string> = {};
            
            for (let i = 0; i < patternParts.length; i++) {
                if (patternParts[i].startsWith(':')) {
                    currentParams[patternParts[i].slice(1)] = pathParts[i];
                } else if (patternParts[i] !== pathParts[i]) {
                    isMatch = false;
                    break;
                }
            }
            
            if (isMatch) {
                match = true;
                element = props.element;
                params = currentParams;
            }
        }
    });

    if (match) {
        return (
            <RouteParamsContext.Provider value={params}>
                {element}
            </RouteParamsContext.Provider>
        );
    }
    
    return null;
};