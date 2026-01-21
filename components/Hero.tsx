
import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generate simple particles for background effect
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-20 overflow-hidden bg-black">
      
      {/* Dynamic Background Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map(p => (
          <div 
            key={p.id}
            className="particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              bottom: '-10px',
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      {/* Background Graphic Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none">
        <h1 className="font-orbitron text-[20vw] font-black text-white/5 uppercase select-none leading-none tracking-tighter">
          DESIGNER
        </h1>
        <div className="absolute w-full h-full bg-red-gradient opacity-40"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#ff1e00 1px, transparent 1px), linear-gradient(90deg, #ff1e00 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center h-full text-center">
        
        {/* Top Text Layer */}
        <div className="mb-6 transform transition-all duration-1000">
          <h2 className="font-orbitron text-red-500 text-sm md:text-xl tracking-[0.6em] mb-2 uppercase animate-pulse">
            Turning Ideas Into Visual Power
          </h2>
          <h1 className="font-orbitron text-5xl md:text-8xl font-black text-white leading-tight uppercase relative inline-block">
            GAME <span className="text-red-600">DESIGNER</span>
            <div className="absolute -inset-4 blur-3xl bg-red-600/10 z-0"></div>
          </h1>
        </div>

        {/* Central Character Visual */}
        <div className="relative w-full max-w-xl group">
          {/* Radial Glow behind character */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-600/10 blur-[100px] rounded-full z-0 animate-pulse"></div>
          
          <div className="relative z-10 animate-float">
            <div className="relative p-1 border border-white/10 rounded-2xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm overflow-hidden group-hover:border-red-600/50 transition-colors duration-700">
              
              {/* The User Photo */}
              <img 
                src="https://prod-files-secure.s3.us-west-2.amazonaws.com/97805175-6807-4286-9856-4b476f57e849/f6c4c5b1-d3c2-487b-8919-4b469e38f6b4/input_file_0.png" 
                alt="Game Designer Visual" 
                className="w-full h-auto rounded-xl character-glow transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Tactical HUD Overlays */}
              <div className="absolute top-6 left-6 flex flex-col gap-1">
                <div className="w-10 h-[2px] bg-red-600"></div>
                <span className="text-[10px] font-orbitron text-red-500 tracking-widest">SYSTEM: ALPHA_01</span>
              </div>
              
              <div className="absolute bottom-6 right-6 flex flex-col items-end gap-1">
                <span className="text-[10px] font-orbitron text-red-500 tracking-widest">RENDER_MODE: HIGH_INTENSITY</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-red-600"></div>
                  <div className="w-2 h-2 bg-red-600/40"></div>
                  <div className="w-2 h-2 bg-red-600/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Layer */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <button 
            className="group relative px-16 py-5 overflow-hidden rounded-full border border-red-600/50 bg-black/40 backdrop-blur-md hover:border-red-600 transition-all duration-500 red-glow"
          >
            <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative z-10 font-orbitron text-lg font-bold tracking-[0.2em] text-white group-hover:text-black transition-colors duration-500">
              VIEW MY WORK
            </span>
          </button>
          
          <div className="flex gap-4 items-center opacity-40">
            <div className="h-[1px] w-12 bg-white"></div>
            <span className="font-orbitron text-[10px] uppercase tracking-widest">Est. 2024</span>
            <div className="h-[1px] w-12 bg-white"></div>
          </div>
        </div>

      </div>

      {/* Sidebar Labels */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden lg:flex flex-col gap-12 z-20">
        <div className="flex flex-col items-center gap-4">
          <span className="text-red-600 font-orbitron text-[9px] [writing-mode:vertical-lr] uppercase tracking-[0.5em]">Interactive</span>
          <div className="w-[1px] h-12 bg-red-600/30"></div>
        </div>
      </div>

      <div className="absolute top-1/2 right-8 -translate-y-1/2 hidden lg:flex flex-col gap-12 z-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-12 bg-red-600/30"></div>
          <span className="text-red-600 font-orbitron text-[9px] [writing-mode:vertical-lr] uppercase tracking-[0.5em]">Creative</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
