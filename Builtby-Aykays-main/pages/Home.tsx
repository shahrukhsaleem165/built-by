
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data';
import ProjectCard from '../components/ProjectCard';
import ProjectOverlay from '../components/ProjectOverlay';
import { PortfolioItem } from '../types';
// Fixed: Added ArrowRight to imports
import { X, Filter, ArrowRight } from 'lucide-react';

const categories = ['All', 'Photography', 'Development', 'Design', 'Branding'] as const;

interface HomeProps {
  searchQuery: string;
  onClearSearch: () => void;
}

const Home: React.FC<HomeProps> = ({ searchQuery, onClearSearch }) => {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filteredProjects = useMemo(() => {
    let results = portfolioData;
    
    if (activeCategory !== 'All') {
      results = results.filter(p => p.categories.includes(activeCategory));
    }
    
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      results = results.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.shortDescription.toLowerCase().includes(q) ||
        p.categories.some(c => c.toLowerCase().includes(q))
      );
    }
    
    return results;
  }, [activeCategory, searchQuery]);

  // Handle URL hashes for direct project linking in single page
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/project/')) {
        const id = hash.replace('#/project/', '');
        const p = portfolioData.find(item => item.id === id);
        if (p) setSelectedProject(p);
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="pt-40 pb-24 min-h-screen">
      <ProjectOverlay 
        project={selectedProject} 
        onClose={() => {
          setSelectedProject(null);
          window.history.pushState("", document.title, window.location.pathname + window.location.search);
        }} 
      />

      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-20 md:mb-40">
        <div className="relative">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <h1 className="text-[14vw] md:text-[10vw] font-display font-black leading-[0.8] uppercase tracking-tighter">
              Crafting <br />
              <span className="text-outline">Digital</span> <br />
              Pioneers.
            </h1>
          </motion.div>
          
          <div className="mt-20 flex flex-col md:flex-row justify-between items-start gap-12 border-t border-black/5 pt-12">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl md:text-2xl font-light text-brand-black/70 max-w-2xl leading-relaxed"
            >
              We are a creative studio delivering world-class digital experiences for high-end luxury brands and innovative startups.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex gap-16 text-[10px] uppercase tracking-[0.3em] font-medium text-brand-black/50"
            >
              <div>Role <br /><span className="text-brand-black">Full Service</span></div>
              <div>Expertise <br /><span className="text-brand-black">Interactive</span></div>
              <div>Location <br /><span className="text-brand-black">Worldwide</span></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Controls: Category + Active Search Indicator */}
      <div className="sticky top-28 z-30 px-6 md:px-12 mb-20 pointer-events-none flex flex-col gap-4 items-start">
        <div className="flex items-center gap-4 p-2 bg-zinc-900/60 backdrop-blur-xl rounded-full border border-white/10 pointer-events-auto shadow-2xl">
          <div className="pl-4 pr-2 text-zinc-500 border-r border-white/10">
            <Filter size={14} />
          </div>
          <div className="flex gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 md:px-6 py-2 rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-500 ${
                  activeCategory === cat 
                  ? 'bg-white text-black scale-105' 
                  : 'text-zinc-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {searchQuery && (
            <motion.div 
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.9 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-zinc-100 text-black rounded-full pointer-events-auto shadow-xl"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold">Showing results for: {searchQuery}</span>
              <button 
                onClick={onClearSearch} 
                className="hover:rotate-90 transition-transform p-1 bg-black/5 rounded-full"
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid Section */}
      <section className="px-6 md:px-12">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-32"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, idx) => (
                <motion.div 
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                >
                  <ProjectCard 
                    project={project} 
                    index={idx} 
                    onClick={(p) => setSelectedProject(p)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-60 text-center"
              >
                <div className="max-w-md mx-auto">
                  <h3 className="text-zinc-600 text-3xl font-display font-black uppercase tracking-tighter mb-4 italic">No Pioneers Found.</h3>
                  <p className="text-zinc-500 font-light mb-12">We haven't built that yet, but we'd love to.</p>
                  <button 
                    onClick={() => { setActiveCategory('All'); onClearSearch(); }}
                    className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-white py-4 px-8 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all"
                  >
                    Clear Filter
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Work With Us CTA */}
      <section className="mt-60 px-6 md:px-12 text-center py-60 border-t border-white/5 relative bg-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/20 to-transparent" />
        <h2 className="text-[12vw] md:text-[8vw] font-display font-black uppercase tracking-tighter mb-12 leading-none">
          Ready to <br /><span className="text-outline italic">evolve?</span>
        </h2>
        <a 
          href="mailto:hello@agency.com" 
          className="group relative inline-flex items-center gap-6 text-2xl md:text-4xl font-light hover:text-zinc-400 transition-colors"
        >
          hello@agency.com
          <div className="p-4 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all rotate-45 group-hover:rotate-0">
             <ArrowRight size={24} />
          </div>
        </a>
      </section>
    </div>
  );
};

export default Home;
