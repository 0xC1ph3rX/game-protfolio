import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import ProjectPage from './ProjectPage';
import { PROJECTS } from '../constants';

const TerminalIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 24 }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16v16H4z" />
    <path d="M7 8l4 4-4 4" />
    <path d="M13 16h4" />
  </svg>
);

const HashIcon: React.FC<{ className?: string; size?: number }> = ({ className, size = 16 }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

import { Project } from '../types';

interface AnimatedBookProps {
  projects: Project[];
}

const AnimatedBook: React.FC<AnimatedBookProps> = ({ projects }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const total = projects.length;

  const handleNext = () => {
    if (index < total - 1) {
      setDirection(1);
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (index < total - 1) {
        setDirection(1);
        setIndex((prev) => prev + 1);
      } else {
        setDirection(-1);
        setIndex(0);
      }
    }, 8000);

    return () => window.clearInterval(timer);
  }, [index, total]);

  const pageVariants: Variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 110 : -110,
      opacity: 0
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      transition: {
        rotateY: { type: 'spring', stiffness: 80, damping: 15 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -110 : 110,
      opacity: 0,
      transition: {
        rotateY: { type: 'spring', stiffness: 80, damping: 15 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Decorative HUD background lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] border-y border-red-900/10 pointer-events-none"></div>

      {/* Main Perspective Container */}
      <div className="relative w-full max-w-6xl h-[750px] flex items-center justify-center perspective-3d">
        {/* Left Side Static "Casing" */}
        <div className="hidden lg:block absolute left-[5%] w-[45%] h-[80%] bg-zinc-950 border-2 border-red-900/30 rounded-l-2xl shadow-[0_0_50px_rgba(255,0,0,0.1)] -rotate-y-12 origin-right translate-x-4 translate-z-[-50px]"></div>

        {/* Right Side Static "Casing" */}
        <div className="hidden lg:block absolute right-[5%] w-[45%] h-[80%] bg-zinc-950 border-2 border-red-900/30 rounded-r-2xl shadow-[0_0_50px_rgba(255,0,0,0.1)] rotate-y-12 origin-left -translate-x-4 translate-z-[-50px]"></div>

        {/* The Animated Book Core */}
        <div className="relative w-full md:w-[90%] h-full flex preserve-3d">
          {/* Controls - Gaming Style */}
          <div className="absolute -top-16 inset-x-0 flex justify-between px-10 z-50">
            <button
              onClick={handlePrev}
              disabled={index === 0}
              className={`group flex items-center gap-4 font-gaming text-xs tracking-[0.3em] transition-all ${index === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-80 hover:opacity-100 hover:text-red-500'
                } cursor-target`}
            >
              <div className="w-10 h-10 border border-red-600/30 flex items-center justify-center group-hover:bg-red-600 group-hover:text-black transition-all">
                L1
              </div>
              PREV_PROJECT
            </button>

            <div className="flex flex-col items-center">
              <div className="text-red-500 font-gaming text-[10px] tracking-[0.5em] mb-1 animate-pulse italic">
                ACCESSING_FILES...
              </div>
              <div className="flex gap-1">
                {projects.map((_, i) => (
                  <div key={i} className={`h-1.5 transition-all duration-500 ${i === index ? 'w-10 bg-red-600' : 'w-2 bg-zinc-800'}`}></div>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={index === total - 1}
              className={`group flex items-center gap-4 font-gaming text-xs tracking-[0.3em] transition-all ${index === total - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-80 hover:opacity-100 hover:text-red-500'
                } cursor-target`}
            >
              NEXT_PROJECT
              <div className="w-10 h-10 border border-red-600/30 flex items-center justify-center group-hover:bg-red-600 group-hover:text-black transition-all">
                R1
              </div>
            </button>
          </div>

          {/* Book Inner Content */}
          <div
            className="relative w-full h-[90%] mt-[5%] flex justify-center preserve-3d"
            onClick={handleNext}
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full flex preserve-3d bg-black shadow-[0_0_100px_rgba(255,0,0,0.15)] border-2 border-red-600/40 rounded-sm overflow-hidden"
              >
                {/* Dual Page Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
                  {/* Left Side: Main Project Visual & Bio */}
                  <div className="relative border-r border-red-900/50">
                    <ProjectPage project={projects[index]} />
                  </div>

                  {/* Right Side: Technical Specs & Interface */}
                  <div className="hidden md:flex flex-col bg-black p-12 relative overflow-hidden">
                    {/* Digital Spine Overlay */}
                    <div className="absolute left-0 inset-y-0 w-8 bg-gradient-to-r from-red-600/5 to-transparent"></div>

                    <div className="mb-10 flex items-center gap-4">
                      <TerminalIcon className="text-red-600" size={24} />
                      <h3 className="font-gaming text-xl text-white tracking-widest uppercase italic">Subsystem_Log</h3>
                    </div>

                    <div className="flex-1 space-y-8 font-gaming text-[11px] text-zinc-500 leading-relaxed uppercase tracking-widest">
                      <div className="space-y-2">
                        <div className="flex justify-between border-b border-red-900/20 pb-1">
                          <span>PROTOCOL:</span>
                          <span className="text-red-600">SECURE_LINK</span>
                        </div>
                        <div className="flex justify-between border-b border-red-900/20 pb-1">
                          <span>UPLOADER:</span>
                          <span className="text-white">DEV_04</span>
                        </div>
                        <div className="flex justify-between border-b border-red-900/20 pb-1">
                          <span>STATUS:</span>
                          <span className="text-green-500">ACTIVE_PROJECT</span>
                        </div>
                      </div>

                      <div className="bg-red-950/10 p-6 border border-red-900/30 relative">
                        <div className="absolute -top-3 left-4 bg-black px-2 text-[8px] text-red-500">CORE_MODULE_ANALYSIS</div>
                        <div className="flex flex-col gap-4">
                          {['RENDERING', 'UX_LOGIC', 'BACKEND'].map((mod) => (
                            <div key={mod} className="flex items-center gap-4">
                              <div className="w-24 shrink-0">{mod}</div>
                              <div className="flex-1 h-1 bg-zinc-900">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.random() * 60 + 40}%` }}
                                  className="h-full bg-red-600"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <button className="w-full py-4 bg-red-600 text-black font-bold tracking-[0.5em] hover:bg-red-500 transition-all uppercase flex items-center justify-center gap-3 glitch-hover">
                          <HashIcon size={16} />
                          LAUNCH_EXPERIENCE
                        </button>
                      </div>
                    </div>

                    {/* Aesthetic background code block */}
                    <div className="mt-8 opacity-10 text-[8px] font-mono overflow-hidden whitespace-pre pointer-events-none">
                      {`function initSystem() {\n  const kernel = new GrimoireOS();\n  kernel.boot({\n    security: \"HIGH\",\n    graphics: \"ULTRA_DXR\",\n    runtime: PROJECTS[${index}].id\n  });\n  console.log(\"Session Initialized...\");\n}`}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer Hint */}
      <div className="mt-12 text-zinc-600 font-gaming text-[10px] tracking-[0.8em] animate-pulse">
        NAVIGATE_WITH_TRIGGERS_OR_KEYS [LEFT/RIGHT]
      </div>
    </div>
  );
};

export default AnimatedBook;
