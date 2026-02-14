
import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchOverlay from './components/SearchOverlay';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';

const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Router>
      <div className="bg-white min-h-screen selection:bg-brand-red selection:text-white relative overflow-x-hidden text-brand-black">
        <CustomCursor />
        
        {/* Dynamic Background Accents */}
        <div className="fixed top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-brand-red/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-red/5 rounded-full blur-[140px] pointer-events-none" />

        <Navbar onSearchOpen={() => setIsSearchOpen(true)} />
        
        <SearchOverlay 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)}
          onSearch={(q) => setSearchQuery(q)}
        />

        <main>
          <Home searchQuery={searchQuery} onClearSearch={() => setSearchQuery('')} />
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
