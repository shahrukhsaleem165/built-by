
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Command } from 'lucide-react';

interface NavbarProps {
  onSearchOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearchOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-5 flex justify-between items-center ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-black/5 shadow-sm py-4' : 'bg-transparent'}`}>
      <Link to="/" className="block w-20 md:w-20">
         <img src="/assets/images/Aykays.png" alt="Aykays" className="w-full h-auto object-contain" />
      </Link>

      <div className="hidden md:flex items-center space-x-12">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-[13px] uppercase tracking-[0.1em] hover:text-brand-red transition-colors font-medium ${
              location.pathname === link.path ? 'text-brand-red' : 'text-brand-black/70'
            }`}
          >
            {link.name}
          </Link>
        ))}
        <button 
          onClick={onSearchOpen}
          className="flex items-center gap-3 group px-4 py-2 rounded-full border border-black/10 hover:border-brand-red/20 hover:bg-brand-red/5 transition-all"
        >
          <Search size={16} strokeWidth={2} className="text-brand-black/60 group-hover:text-brand-red transition-colors" />
          <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity text-brand-black">
            <Command size={12} />
            <span className="text-[11px] font-mono">K</span>
          </div>
        </button>
      </div>

      <div className="md:hidden flex items-center space-x-6 text-brand-black">
        <button onClick={onSearchOpen} className="p-2">
          <Search size={20} />
        </button>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 z-50 relative">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-start justify-center p-12 text-brand-black md:hidden"
          >
             <div className="space-y-6">
               {['Work', 'Studio', 'Services', 'Contact'].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="text-6xl font-display font-black uppercase tracking-tighter hover:text-brand-red hover:italic transition-all"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
             </div>
             
             <div className="mt-auto pt-12 border-t border-black/5 w-full flex justify-between items-end">
               <div className="text-[10px] uppercase tracking-widest text-gray-500">
                 Office <br />
                 <span className="text-brand-black">London / UK</span>
               </div>
               <div className="text-[10px] uppercase tracking-widest text-zinc-500 text-right">
                 Say Hi <br />
                 <span className="text-white">hello@agency.com</span>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
