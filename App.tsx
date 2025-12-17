import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import BlogPage from './pages/BlogPage';
import Studio from './pages/Studio';
import Consulting from './pages/Consulting';
import { LanguageProvider, HashRouter as Router, Routes, Route } from './context/LanguageContext';
import P5Background from './components/P5Background';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-brand-dark text-white relative">
          <P5Background />
          <Navbar />
          <main className="flex-grow z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/consulting" element={<Consulting />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/course/:id" element={<CourseDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;