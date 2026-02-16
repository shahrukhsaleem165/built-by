
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search as SearchIcon, ArrowRight, Command } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = useState('');
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
  }, [query, onSearch]);

  const handleResultClick = () => {
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
            className="relative w-full max-w-2xl bg-brand-dark/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Spotlight Header */}
            <div className="flex items-center px-6 py-5 border-b border-white/10">
              <SearchIcon className="text-white/40 mr-4" size={22} />
              <input 
                ref={inputRef}
                type="text"
                placeholder="Search projects, categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-xl font-light focus:outline-none placeholder:text-white/30 text-white"
              />
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded border border-white/10 text-[10px] text-white/60 font-mono">
                  <Command size={10} />
                  <span>K</span>
                </div>
                <button 
                  onClick={onClose} 
                  className="p-1 hover:bg-white/5 rounded transition-colors text-white/60"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-[50vh] overflow-y-auto custom-scrollbar">
              {query && (
                <div className="p-16 text-center">
                  <p className="text-zinc-500 text-lg font-light italic">
                    Results update in the grid below.
                  </p>
                  <button
                    onClick={handleResultClick}
                    className="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 text-[11px] uppercase tracking-[0.3em] text-white/70 transition-all"
                  >
                    Close
                    <ArrowRight size={14} />
                  </button>
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
            <div className="px-6 py-3 border-t border-white/5 bg-black/40 flex justify-between items-center text-[10px] text-white/40 font-mono uppercase tracking-widest">
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
