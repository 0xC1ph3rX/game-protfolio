import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Project } from '../types';

interface ProjectPageProps {
  project: Project;
  isLeft?: boolean;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project, isLeft = true }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="w-full h-full p-8 md:p-12 flex flex-col bg-zinc-950 border-r border-red-900/20 relative overflow-hidden"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* HUD Elements */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600/50 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-600/20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-600/20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-600/50 pointer-events-none"></div>

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none transform translate-z-[-10px]"
        style={{
          backgroundImage:
            'linear-gradient(#ff0000 1px, transparent 1px), linear-gradient(90deg, #ff0000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="relative z-10 flex flex-col h-full transform translate-z-[10px]">
        <header className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-red-600 animate-pulse"></span>
            <span className="text-[10px] font-gaming text-red-500 tracking-[0.4em] uppercase">
              {project.category}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-gaming font-bold text-white leading-tight uppercase tracking-tighter italic">
            {project.title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? 'text-red-600' : ''}>
                {word}{' '}
              </span>
            ))}
          </h2>
        </header>

        <div className="relative group mb-6 flex-shrink-0 perspective-3d">
          <div className="absolute -inset-0.5 bg-red-600 opacity-20 group-hover:opacity-100 transition duration-500 blur-[2px]"></div>
          <div className="relative overflow-hidden aspect-video border border-red-900/50">
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              whileHover={{ scale: 1.1 }}
            />
            <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 border border-red-600/30 text-[8px] font-gaming text-red-500">
              LIVE_DATA: OK
            </div>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-red-600/30 pl-4 py-1 italic">
            {project.description}
          </p>

          {project.stats && (
            <div className="grid grid-cols-2 gap-px bg-red-900/20 p-[1px] mt-4">
              {project.stats.map((stat, idx) => (
                <div key={idx} className="bg-black p-3 hover:bg-zinc-900 transition-colors">
                  <div className="text-[9px] text-zinc-600 font-gaming uppercase tracking-widest">
                    {stat.label}
                  </div>
                  <div className="text-lg font-gaming text-white group-hover:text-red-500 transition-colors">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <footer className="mt-8 pt-4 border-t border-red-900/20 flex justify-between items-center text-[9px] font-gaming">
          <div className="flex gap-3">
            {project.tags.map((tag) => (
              <span key={tag} className="text-red-600/60 hover:text-red-500 cursor-default">
                #{tag}
              </span>
            ))}
          </div>
          <div className="text-zinc-700">COORD: 40.7128° N, 74.0060° W</div>
        </footer>
      </div>
    </motion.div>
  );
};

export default ProjectPage;
