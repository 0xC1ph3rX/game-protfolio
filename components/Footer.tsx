
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-zinc-950 border-t border-orange-500/20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
            <span className="font-orbitron text-xl font-bold tracking-tighter text-white">
                STUDIO <span className="text-orange-500">SHODWE</span>
            </span>
            <p className="text-zinc-600 text-sm mt-2">© 2024 STUDIO SHODWE. ALL RIGHTS RESERVED.</p>
        </div>

        <div className="flex gap-8">
            <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors font-orbitron text-xs tracking-widest">TWITTER</a>
            <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors font-orbitron text-xs tracking-widest">DISCORD</a>
            <a href="#" className="text-zinc-400 hover:text-orange-500 transition-colors font-orbitron text-xs tracking-widest">INSTAGRAM</a>
        </div>

        <div className="text-zinc-600 text-[10px] font-orbitron uppercase tracking-[0.3em]">
            BUILT FOR THE FUTURE
        </div>
      </div>
    </footer>
  );
};

export default Footer;
