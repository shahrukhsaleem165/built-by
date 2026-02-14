
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioItem } from '../types';
import { X, Globe, ArrowRight, ArrowUpRight } from 'lucide-react';

interface ProjectOverlayProps {
  project: PortfolioItem | null;
  onClose: () => void;
}

const ProjectOverlay: React.FC<ProjectOverlayProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-end"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Content Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full md:w-[85vw] lg:w-[70vw] h-full bg-white border-l border-black/5 overflow-y-auto text-brand-black"
          >
            <button 
              onClick={onClose}
              className="sticky top-8 right-8 float-right z-[110] p-4 bg-black/5 hover:bg-black/10 rounded-full transition-colors mr-8"
            >
              <X size={24} />
            </button>

            <div className="pt-32 px-8 md:px-20 pb-20">
              <header className="mb-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                  <h1 className="text-[10vw] md:text-[6vw] font-display font-black uppercase tracking-tighter leading-[0.85]">
                    {project.title}
                  </h1>
                  <div className="text-right">
                    <span className="text-brand-black/50 font-mono text-sm block mb-2">/ YEAR</span>
                    <span className="text-2xl font-light">{project.year}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-black/5 pt-12">
                  <div className="md:col-span-4 space-y-12">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.4em] text-brand-black/50 mb-4">Discipline</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.categories.map(c => (
                          <span key={c} className="text-lg font-light">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.4em] text-brand-black/50 mb-4">Client</h4>
                      <p className="text-lg font-light">{project.client}</p>
                    </div>
                  </div>

                  <div className="md:col-span-8">
                    <h4 className="text-[10px] uppercase tracking-[0.4em] text-brand-black/50 mb-8">Brief</h4>
                    <p className="text-xl md:text-3xl font-light text-brand-black/80 leading-tight mb-12">
                      {project.longDescription}
                    </p>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-bold border-b border-black pb-2 hover:text-brand-red transition-colors"
                    >
                      Visit Live Site <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </header>

              <div className="w-full aspect-video bg-brand-gray overflow-hidden rounded-xl mb-20">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="py-20 border-t border-white/5">
                <h2 className="text-3xl md:text-5xl font-display font-medium text-zinc-100 mb-8 italic">
                   The design approach focused on minimal interactions that evoke a sense of luxury.
                </h2>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectOverlay;
