import React from 'react';
import { ArrowLeft, Compass, ShoppingBag, Home } from 'lucide-react';

const NotFoundPage = ({ onNavigate }) => {
  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white font-sans flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center space-y-8 relative z-10 py-16 px-8 bg-neutral-900/60 border border-neutral-800 rounded-3xl backdrop-blur-md shadow-2xl">
        
        {/* Emblem & 404 Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-[#c5a880]/10 border border-[#c5a880]/20 rounded-full text-[#c5a880] shadow-inner mb-2">
            <Compass size={32} strokeWidth={1.5} className="animate-spin-slow" />
          </div>
          
          <span className="block text-[11px] font-bold uppercase tracking-[0.3em] text-[#c5a880]">
            ERROR 404 • PAGE NOT FOUND
          </span>

          <h1 className="text-4xl sm:text-5xl font-heading font-medium tracking-tight text-white leading-tight">
            Lost in The District
          </h1>

          <div className="w-16 h-[1.5px] bg-[#c5a880] mx-auto opacity-70" />

          <p className="text-[13px] sm:text-[14px] text-neutral-400 font-light leading-relaxed max-w-md mx-auto">
            The requested page, bespoke route, or collection does not exist or has been relocated in our master catalog.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#c5a880] hover:bg-[#b59870] text-black font-bold text-[11px] uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
          >
            <Home size={16} />
            <span>Return Home</span>
          </button>

          <button
            onClick={() => onNavigate('catalogue')}
            className="w-full sm:w-auto px-8 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-[11px] uppercase tracking-widest border border-neutral-700 rounded-xl transition-all flex items-center justify-center space-x-2"
          >
            <ShoppingBag size={16} />
            <span>View Catalogue</span>
          </button>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-6 border-t border-neutral-800/80 flex flex-wrap justify-center gap-6 text-[12px] text-neutral-400 font-medium">
          <button onClick={() => onNavigate('shirt')} className="hover:text-[#c5a880] transition-colors">Shirts</button>
          <span className="text-neutral-700">•</span>
          <button onClick={() => onNavigate('pant')} className="hover:text-[#c5a880] transition-colors">Trousers</button>
          <span className="text-neutral-700">•</span>
          <button onClick={() => onNavigate('combo')} className="hover:text-[#c5a880] transition-colors">Curated Combos</button>
          <span className="text-neutral-700">•</span>
          <button onClick={() => onNavigate('contact')} className="hover:text-[#c5a880] transition-colors">Contact Us</button>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;
