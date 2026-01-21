
import React from 'react';

const ScrollIndicator: React.FC = () => {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none hidden md:flex">
      <span className="text-[9px] text-red-600/60 font-orbitron tracking-[0.5em] uppercase">Scroll</span>
      <div className="w-[1px] h-12 bg-red-600/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600 animate-[scroll-anim_2s_infinite]" />
      </div>
      <style>{`
        @keyframes scroll-anim {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </div>
  );
};

export default ScrollIndicator;
