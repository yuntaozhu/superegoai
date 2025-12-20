
import React from 'react';
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

// Import specific planet pages
import ArtPlanet from './pages/ArtPlanet';
import SportsPlanet from './pages/SportsPlanet';
import SuperEgoPlanet from './pages/SuperEgoPlanet';
import QuantPlanet from './pages/QuantPlanet';
import CodePlanet from './pages/CodePlanet';
import ResearchPlanet from './pages/ResearchPlanet';

import { LanguageProvider, HashRouter as Router, Routes, Route } from './context/LanguageContext';
import { PromptRegistryProvider } from './context/PromptRegistryContext';
import P5Background from './components/P5Background';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <PromptRegistryProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-brand-dark text-white relative">
            <P5Background />
            <Navbar />
            <main className="flex-grow z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/planets" element={<PlanetsPage />} />
                <Route path="/studio" element={<Studio />} />
                <Route path="/consulting" element={<Consulting />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/prompt-guide" element={<PromptGuide />} />
                
                {/* Refactored Specific Planet Routes */}
                <Route path="/course/art" element={<ArtPlanet />} />
                <Route path="/course/sports" element={<SportsPlanet />} />
                <Route path="/course/data" element={<SuperEgoPlanet />} />
                <Route path="/course/quant" element={<QuantPlanet />} />
                <Route path="/course/solopreneur" element={<CodePlanet />} />
                <Route path="/course/digital-twin" element={<ResearchPlanet />} />
              </Routes>
            </main>
            <ChatAssistant />
            <Footer />
          </div>
        </Router>
      </PromptRegistryProvider>
    </LanguageProvider>
  );
};

export default App;
