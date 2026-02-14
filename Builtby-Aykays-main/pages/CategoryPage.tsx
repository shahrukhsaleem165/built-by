
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioData } from '../data';
import ProjectCard from '../components/ProjectCard';
import { ArrowLeft } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, [slug]);

  const filteredProjects = portfolioData.filter(p => 
    p.categories.some(c => c.toLowerCase() === slug?.toLowerCase())
  );

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <header className="px-6 md:px-12 mb-24">
        <Link to="/" className="group inline-flex items-center gap-2 text-brand-black/50 hover:text-brand-red mb-12 uppercase tracking-[0.2em] text-[10px] transition-colors">
          <ArrowLeft size={14} /> Back to Work
        </Link>
        <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter">
            {slug} <span className="text-brand-black/40 block md:inline md:ml-4 text-4xl md:text-6xl font-light">projects</span>
          </h1>
          <p className="mt-8 text-xl font-light text-brand-black/60 max-w-xl">
            A curated selection of our best work specializing in {slug?.toLowerCase()}.
          </p>
        </div>
      </header>

      <section className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} onClick={() => {}} />
          ))
        ) : (
          <div className="col-span-full py-24 text-center">
            <p className="text-brand-black/50 text-2xl font-light italic">No projects found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;
