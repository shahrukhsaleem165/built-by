
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search as SearchIcon, ArrowRight, Command } from 'lucide-react';
import { portfolioData } from '../data';
import { PortfolioItem } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PortfolioItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    onSearch(query);
    if (query.trim() === '') {
      setResults([]);
    } else {
      const q = query.toLowerCase();
      const filtered = portfolioData.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.categories.some(c => c.toLowerCase().includes(q))
      );
      setResults(filtered.slice(0, 5));
    }
  }, [query, onSearch]);

  const handleResultClick = (projectId: string) => {
    // In our single page app, clicking a search result should trigger the overlay
    // We achieve this by letting Home's filter/search logic handle it or 
    // simply closing the search and letting the user see the filtered grid.
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ y: -40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-white/90 backdrop-blur-3xl border border-black/5 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.1)] overflow-hidden"
          >
            {/* Spotlight Header */}
            <div className="flex items-center px-6 py-5 border-b border-black/5">
              <SearchIcon className="text-brand-black/40 mr-4" size={22} />
              <input 
                ref={inputRef}
                type="text"
                placeholder="Search projects, categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-xl font-light focus:outline-none placeholder:text-brand-black/30 text-brand-black"
              />
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-2 py-1 bg-black/5 rounded border border-black/5 text-[10px] text-brand-black/40 font-mono">
                  <Command size={10} />
                  <span>K</span>
                </div>
                <button 
                  onClick={onClose} 
                  className="p-1 hover:bg-black/5 rounded transition-colors text-brand-black/50"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-[50vh] overflow-y-auto custom-scrollbar">
              {query && results.length > 0 && (
                <div className="p-3">
                  <div className="px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-brand-black/50 font-bold">Top Hits</div>
                  {results.map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => handleResultClick(item.id)}
                      className="w-full group flex items-center justify-between p-3 hover:bg-white/5 transition-all rounded-xl text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-zinc-800 border border-white/5">
                           <img src={item.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                        </div>
                        <div>
                          <h4 className="text-base font-display font-bold uppercase tracking-tight group-hover:text-white transition-colors">{item.title}</h4>
                          <div className="flex gap-2 mt-1">
                            {item.categories.map(c => (
                              <span key={c} className="text-[10px] text-zinc-500 uppercase tracking-widest">{c}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={18} className="text-zinc-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              )}

              {query && results.length === 0 && (
                <div className="p-16 text-center">
                  <p className="text-zinc-500 text-lg font-light italic">No results found for "{query}"</p>
                </div>
              )}

              {!query && (
                <div className="p-8">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-6">Suggestions</div>
                  <div className="grid grid-cols-2 gap-3">
                    {['Photography', 'Development', 'Design', 'Branding', 'Luxury', 'E-commerce'].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-white/20 bg-white/0 hover:bg-white/5 text-sm text-zinc-400 hover:text-white transition-all text-left"
                      >
                        <span className="uppercase tracking-widest">{tag}</span>
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Spotlight Footer */}
            <div className="px-6 py-3 border-t border-white/5 bg-black/20 flex justify-between items-center text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
              <div className="flex gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
              </div>
              <span>Spotlight v1.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
