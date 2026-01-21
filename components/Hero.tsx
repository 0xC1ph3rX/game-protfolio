
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Scene3D from './Scene3D';

const Hero: React.FC = () => {
  const [particles, setParticles] = useState<any[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const yPhoto = useTransform(scrollY, [0, 500], [0, 150]);
  const yBackground = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    // Enhanced particle system with varied sizes and speeds
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      left: Math.random() * 100,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(newParticles);

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full flex flex-col items-center justify-center pt-20 overflow-hidden bg-black">
      
      {/* Enhanced Dynamic Background Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map(p => (
          <motion.div 
            key={p.id}
            className="particle"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, p.opacity, 0],
              y: [window.innerHeight + 10, -100]
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              position: 'absolute',
              bottom: 0,
              background: p.size > 2.5 ? 'linear-gradient(135deg, #ff1e00, #ff6b00)' : '#ff4500',
              borderRadius: '50%',
              boxShadow: p.size > 2.5 ? '0 0 10px #ff1e00' : 'none',
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>

      {/* Cyber Grid Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#ff1e00 1.5px, transparent 1.5px), linear-gradient(90deg, #ff1e00 1.5px, transparent 1.5px)', 
          backgroundSize: '50px 50px',
          y: yBackground 
        }} 
      />

      {/* Digital Waveforms */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-0 w-full h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, #ff1e00, transparent)',
            x: mousePosition.x * 2
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-full h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, #ff6b00, transparent)',
            x: -mousePosition.x * 2
          }}
        />
      </div>

      {/* Abstract Shapes */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'radial-gradient(circle, #ff1e00, #ff6b00)',
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center h-full text-center">
        
        {/* Centered Photo with Neon Glow - THE MAIN FOCUS */}
        <motion.div 
          className="relative mb-8 group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ 
            y: yPhoto,
            x: mousePosition.x,
          }}
        >
          {/* Multi-layered Neon Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full z-0"
               style={{
                 background: 'radial-gradient(circle, rgba(255,30,0,0.4), rgba(255,107,0,0.2), transparent)',
                 filter: 'blur(60px)',
                 animation: 'neonPulse 3s ease-in-out infinite'
               }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full z-0"
               style={{
                 background: 'radial-gradient(circle, rgba(255,69,0,0.6), transparent)',
                 filter: 'blur(40px)',
                 animation: 'neonPulse 2s ease-in-out infinite reverse'
               }}
          />
          
          {/* Photo Container with Depth */}
          <motion.div 
            className="relative z-10 w-80 h-80 md:w-96 md:h-96"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* 3D Animation Background */}
            <Scene3D />
            
            <div className="absolute inset-0 rounded-full border-2 border-red-500/30"
                 style={{
                   boxShadow: '0 0 30px rgba(255,30,0,0.5), inset 0 0 30px rgba(255,30,0,0.2)',
                 }}
            />
            
            {/* Your Photo - Sharp and Clear */}
            <img 
              src="/assets/me.png" 
              alt="Gaming Designer" 
              className="w-full h-full object-cover rounded-full"
              style={{
                filter: 'contrast(1.1) brightness(1.05)',
                clipPath: 'circle(50% at 50% 50%)',
                boxShadow: '0 0 60px rgba(255,30,0,0.8), 0 0 100px rgba(255,107,0,0.5)',
              }}
            />
            
            {/* Animated Border Ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: '3px solid transparent',
                backgroundImage: 'linear-gradient(45deg, rgb(255, 30, 0), rgb(255, 107, 0), rgb(255, 30, 0))',
                backgroundClip: 'padding-box',
                WebkitMask: 'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px), linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                maskClip: 'content-box, border-box',
                maskOrigin: 'content-box, border-box',
                maskRepeat: 'repeat, repeat',
                maskPosition: '0% 0%, 0% 0%',
                maskSize: 'auto, auto',
                padding: '3px',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>

        {/* Title Text */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="font-orbitron text-4xl md:text-7xl font-black text-white leading-tight uppercase">
            <span className="inline-block mr-3">🎮</span>
            <span className="relative inline-block">
              GAMING DESIGNER
              <div className="absolute -inset-2 blur-2xl bg-gradient-to-r from-red-600 to-orange-600 opacity-50 -z-10"></div>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.h2 
          className="font-orbitron text-red-500 text-sm md:text-xl tracking-wide mb-12 uppercase max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Creating Visual Power for the Digital Arena
        </motion.h2>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.button 
            className="group relative px-12 py-4 overflow-hidden rounded-full border-2 border-red-600 bg-red-600 hover:bg-transparent transition-all duration-500 neon-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="border-animate border-animate-1"></span>
            <span className="border-animate border-animate-2"></span>
            <span className="border-animate border-animate-3"></span>
            <span className="border-animate border-animate-4"></span>
            <span className="relative z-10 font-orbitron text-base font-bold tracking-wider text-white group-hover:text-red-500 transition-colors duration-300">
              VIEW PORTFOLIO
            </span>
          </motion.button>

          <motion.button 
            className="group relative px-12 py-4 overflow-hidden rounded-full border-2 border-orange-600 bg-transparent hover:bg-orange-600 transition-all duration-500 neon-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="border-animate border-animate-1"></span>
            <span className="border-animate border-animate-2"></span>
            <span className="border-animate border-animate-3"></span>
            <span className="border-animate border-animate-4"></span>
            <span className="relative z-10 font-orbitron text-base font-bold tracking-wider text-orange-500 group-hover:text-white transition-colors duration-300">
              CONTACT ME
            </span>
          </motion.button>
        </motion.div>

      </div>

      {/* Corner Accent Lines */}
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none z-20">
        <div className="absolute top-8 left-8 w-16 h-[2px] bg-gradient-to-r from-red-600 to-transparent"></div>
        <div className="absolute top-8 left-8 w-[2px] h-16 bg-gradient-to-b from-red-600 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none z-20">
        <div className="absolute bottom-8 right-8 w-16 h-[2px] bg-gradient-to-l from-orange-600 to-transparent"></div>
        <div className="absolute bottom-8 right-8 w-[2px] h-16 bg-gradient-to-t from-orange-600 to-transparent"></div>
      </div>

    </section>
  );
};

export default Hero;
