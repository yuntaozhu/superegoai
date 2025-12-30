import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BlogPage from './pages/BlogPage';
import Consulting from './pages/Consulting';
import PlanetsPage from './pages/PlanetsPage';
import Studio from './pages/Studio';
import AboutPage from './pages/AboutPage';
import PromptGuide from './pages/PromptGuide';
import ChatAssistant from './components/ChatAssistant';

// Lazy load Dashboard for performance
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Import specific planet pages
import ArtPlanet from './pages/ArtPlanet';
import SportsPlanet from './pages/SportsPlanet';
import SuperEgoPlanet from './pages/SuperEgoPlanet';
import QuantPlanet from './pages/QuantPlanet';
import CodePlanet from './pages/CodePlanet';
import ResearchPlanet from './pages/ResearchPlanet';
import SecondBrainPage from './pages/SecondBrainPage';

import { LanguageProvider, HashRouter as Router, Routes, Route } from './context/LanguageContext';
import { PromptRegistryProvider } from './context/PromptRegistryContext';
import { ThemeProvider } from './context/ThemeContext';
import P5Background from './components/P5Background';

const LoadingScreen = () => (
  <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center gap-6">
    <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.5em] animate-pulse">Syncing_Nodes...</div>
  </div>
);

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <PromptRegistryProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-brand-light dark:bg-brand-dark text-slate-900 dark:text-white transition-colors duration-300 relative">
              <P5Background />
              <Navbar />
              <main className="flex-grow z-10">
                <Suspense fallback={<LoadingScreen />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/planets" element={<PlanetsPage />} />
                    <Route path="/studio" element={<Studio />} />
                    <Route path="/consulting" element={<Consulting />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/prompt-guide" element={<PromptGuide />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/tools/second-brain" element={<SecondBrainPage />} />
                    
                    {/* Planet Routes */}
                    <Route path="/course/art" element={<ArtPlanet />} />
                    <Route path="/course/sports" element={<SportsPlanet />} />
                    <Route path="/course/data" element={<SuperEgoPlanet />} />
                    <Route path="/course/quant" element={<QuantPlanet />} />
                    <Route path="/course/solopreneur" element={<CodePlanet />} />
                    <Route path="/course/digital-twin" element={<ResearchPlanet />} />
                  </Routes>
                </Suspense>
              </main>
              <ChatAssistant />
              <Footer />
            </div>
          </Router>
        </PromptRegistryProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;