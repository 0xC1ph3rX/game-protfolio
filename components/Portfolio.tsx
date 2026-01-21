
import React from 'react';

const Portfolio: React.FC = () => {
  const projects = [
    { title: 'CYBER STRIKE', category: 'Action / FPS', image: 'https://picsum.photos/id/10/800/600' },
    { title: 'NEON RUNNER', category: 'Racing / Arcade', image: 'https://picsum.photos/id/20/800/600' },
    { title: 'HEXA PROTOCOL', category: 'Strategy / RPG', image: 'https://picsum.photos/id/30/800/600' },
    { title: 'VOID WALKER', category: 'Adventure / Horror', image: 'https://picsum.photos/id/40/800/600' },
  ];

  return (
    <section className="py-24 bg-black relative border-t border-red-600/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-orbitron text-4xl md:text-5xl font-black mb-4 uppercase">
              FEATURED <span className="text-red-600">PROJECTS</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Showcasing visual power through high-performance game design and creative direction.
            </p>
          </div>
          <div className="flex gap-4">
             <button className="p-4 border border-red-600/30 hover:bg-red-600 hover:text-black transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
             </button>
             <button className="p-4 border border-red-600/30 hover:bg-red-600 hover:text-black transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="group relative bg-zinc-950 overflow-hidden border border-red-600/10 hover:border-red-600 transition-all duration-500">
               <div className="h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                  />
               </div>
               <div className="p-6">
                  <span className="text-red-600 text-xs font-orbitron tracking-widest">{project.category}</span>
                  <h3 className="text-2xl font-orbitron font-bold mt-1 group-hover:text-red-600 transition-colors">{project.title}</h3>
                  <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-gray-400 uppercase tracking-tighter">View Concept</span>
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-8 h-8 bg-red-600 translate-x-4 -translate-y-4 rotate-45 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
