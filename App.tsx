import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import { LanguageProvider } from './context/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-brand-dark text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
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
