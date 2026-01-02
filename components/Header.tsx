import React from 'react';
import { Leaf } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-stone-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-nutri-primary text-white p-2 rounded-xl shadow-lg shadow-nutri-primary/30">
            <Leaf size={20} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-nutri-dark tracking-tight leading-none">NutriGen</h1>
            <p className="text-[10px] font-bold text-nutri-primary uppercase tracking-[0.2em] mt-0.5">Studio</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="text-nutri-dark hover:text-nutri-primary transition-colors">Create</a>
          <a href="#" className="text-stone-400 hover:text-nutri-dark transition-colors">Showcase</a>
          <a href="#" className="text-stone-400 hover:text-nutri-dark transition-colors">Settings</a>
          <button className="bg-nutri-dark text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-black transition-colors">
            Pro Plan
          </button>
        </nav>
      </div>
    </header>
  );
};