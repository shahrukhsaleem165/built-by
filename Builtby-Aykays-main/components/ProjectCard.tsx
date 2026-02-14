
import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: PortfolioItem;
  index: number;
  onClick: (project: PortfolioItem) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  return (
    <motion.div 
      layout
      onClick={() => onClick(project)}
      className="group relative block w-full overflow-hidden mb-12 cursor-pointer"
    >
      <div className="relative aspect-[4/5] md:aspect-[16/11] overflow-hidden bg-brand-gray">
        <motion.div 
          className="w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 ease-out"
          />
        </motion.div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute top-8 right-8 p-3 rounded-full border border-white/50 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white/30 backdrop-blur-md group-hover:bg-brand-red group-hover:border-brand-red">
          <ArrowUpRight size={24} className="text-white" />
        </div>
      </div>

      <div className="mt-8 flex justify-between items-start">
        <div className="max-w-[80%]">
          <div className="flex gap-4 mb-3">
             <span className="text-[10px] uppercase tracking-[0.3em] text-brand-black/40 font-mono">
               Project 0{index + 1}
             </span>
             {project.categories.slice(0, 2).map(cat => (
                <span key={cat} className="text-[10px] uppercase tracking-[0.3em] text-brand-black/40">
                  {cat}
                </span>
              ))}
          </div>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-brand-black uppercase leading-none tracking-tighter">
            {project.title}
          </h3>
          <p className="mt-4 text-brand-black/60 text-sm md:text-base font-light line-clamp-2 max-w-md group-hover:text-brand-black transition-colors">
            {project.shortDescription}
          </p>
        </div>
        <div className="text-right font-mono text-xs text-brand-black/50">
          [{project.year}]
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
