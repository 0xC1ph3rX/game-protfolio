
import React, { useState } from 'react';
import AnimatedBook from './AnimatedBook';
import { PROJECTS } from '../constants';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', 'Game Design', 'World Building', 'Level Design', '3D Environments'];

  const filteredProjects = filter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section className="py-24 bg-black relative border-t border-red-600/10">
      <div className="container mx-auto px-6 relative hud-frame">
        <div className="hud-corner tl" />
        <div className="hud-corner tr" />
        <div className="hud-corner bl" />
        <div className="hud-corner br" />
        <div className="flex flex-col items-center text-center mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-orbitron text-4xl md:text-6xl font-black mb-4 uppercase">
              PROJECT <span className="text-red-600">DOSSIER</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Tactical archive of high-impact projects. Navigate with triggers or arrow keys.
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 border font-gaming tracking-wider text-sm transition-all duration-300 ${filter === cat
                    ? 'bg-red-600 text-black border-red-600 shadow-[0_0_15px_#ff1e00]'
                    : 'bg-transparent text-gray-500 border-gray-800 hover:border-red-600 hover:text-red-600'
                    }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center py-12">
          {filteredProjects.length > 0 ? (
            <AnimatedBook projects={filteredProjects} />
          ) : (
            <div className="text-red-600 font-mono animate-pulse">NO_DATA_FOUND_IN_SECTOR</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;


