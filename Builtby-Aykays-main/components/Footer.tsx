
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black px-6 md:px-12 pt-32 pb-12 border-t border-white/10 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32">
        <div>
          <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none mb-12">
            Let's build the <br /><span className="text-outline-white">Future</span>
          </h2>
          <a 
            href="mailto:hello@aykays.com"
            className="group flex items-center gap-6 text-2xl md:text-4xl font-light hover:text-brand-red transition-colors"
          >
            hello@aykays.com
            <div className="p-4 rounded-full border border-white/20 group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red transition-all">
              <ArrowUpRight size={24} />
            </div>
          </a>
        </div>
        
        <div className="grid grid-cols-2 gap-12 self-end">
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6">Social</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-brand-red transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Dribbble</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Awwwards</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">X (Twitter)</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.5em] text-white/40 mb-6">Office</h4>
            <ul className="space-y-4 text-sm font-light text-white/60">
              <li>123 Digital Square</li>
              <li>London, E1 6AN</li>
              <li>United Kingdom</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-12 text-[10px] uppercase tracking-widest text-white/40">
        <p>© 2024 Aykays — All rights reserved.</p>
        <p className="mt-4 md:mt-0">Built with precision and passion.</p>
      </div>
    </footer>
  );
};

export default Footer;
