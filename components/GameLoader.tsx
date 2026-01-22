import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GameLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING SYSTEM...');

  const bootSequence = [
    'LOADING KERNEL...',
    'MOUNTING FILE SYSTEM...',
    'CONNECTING TO NEURAL NET...',
    'ACTIVATING VISUAL CORTEX...',
    'SYNCING ANIME ASSETS...',
    'SYSTEM READY'
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 5;
      });

      if (Math.random() > 0.7 && currentStep < bootSequence.length) {
        setLoadingText(bootSequence[currentStep]);
        currentStep++;
      }
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setLoadingText('SYSTEM READY');
      setTimeout(onComplete, 800);
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center font-orbitron text-[#ff1e00]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-md p-8 relative">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ff1e00]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ff1e00]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ff1e00]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ff1e00]" />

        <div className="mb-8 text-2xl font-black tracking-widest text-center animate-pulse">
          STUDIO SHODWE
        </div>

        <div className="mb-2 flex justify-between text-xs font-mono tracking-wider opacity-70">
          <span>{loadingText}</span>
          <span>{Math.floor(progress)}%</span>
        </div>

        <div className="h-2 bg-[#1a1a1a] overflow-hidden relative border border-[#ff1e00]/30">
          <motion.div
            className="h-full bg-[#ff1e00] shadow-[0_0_15px_#ff1e00]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2 text-[10px] text-[#ff1e00]/50 font-mono text-center">
          MEMORY: 64TB // CPU: QUANTUM CORE // GPU: UNLIMITED
        </div>
      </div>

      {/* Glitch Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/assets/noise.png')] mix-blend-overlay" />
    </motion.div>
  );
};

export default GameLoader;
