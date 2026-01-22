import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import BookScene from './BookScene';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

const Work: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isDarkMode] = useState(true); // Always dark mode
  const [hasAnimated, setHasAnimated] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Project data
  const projects: Project[] = [
    {
      id: 1,
      title: "Gaming Designer",
      description: "Creating visual power for the digital arena. Interactive portfolio showcasing design expertise and gaming aesthetics.",
      image: "/assets/me.png",
      technologies: ["React", "TypeScript", "GSAP", "Three.js"]
    },
    {
      id: 2,
      title: "UI/UX Design System",
      description: "A comprehensive design system for modern applications with dark mode support and accessibility features.",
      image: "/assets/me.png",
      technologies: ["Figma", "CSS", "React", "Tailwind"]
    },
    {
      id: 3,
      title: "3D Web Experience",
      description: "Immersive 3D interactive experiences using WebGL and advanced JavaScript techniques for maximum engagement.",
      image: "/assets/me.png",
      technologies: ["Three.js", "WebGL", "JavaScript", "GLSL"]
    },
    {
      id: 4,
      title: "Motion Graphics",
      description: "Stunning animated visualizations with smooth transitions and particle effects for web and apps.",
      image: "/assets/me.png",
      technologies: ["GSAP", "Canvas", "React", "Lottie"]
    },
    {
      id: 5,
      title: "E-Commerce Platform",
      description: "Full-featured e-commerce solution with real-time inventory, payment integration, and admin dashboard.",
      image: "/assets/me.png",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"]
    }
  ];

  // Cinematic intro animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Cinematic intro animation
          gsap.from(containerRef.current, {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: "power3.out"
          });

          // Fade in heading
          const headings = sectionRef.current?.querySelectorAll('h2, p');
          headings?.forEach((el, index) => {
            gsap.from(el, {
              opacity: 0,
              y: 50,
              duration: 0.8,
              delay: 0.2 + index * 0.1,
              ease: "power3.out"
            });
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Handle mouse scroll on book
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const maxPage = Math.ceil(projects.length / 2) - 1;
    
    if (e.deltaY > 0 && currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    } else if (e.deltaY < 0 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    const maxPage = Math.ceil(projects.length / 2) - 1;
    const distance = touchStart - touchEnd;

    if (distance > 50 && currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    } else if (distance < -50 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const maxPage = Math.ceil(projects.length / 2) - 1;
      
      if (e.key === 'ArrowLeft' && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else if (e.key === 'ArrowRight' && currentPage < maxPage) {
        setCurrentPage(currentPage + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, projects.length]);

  const maxPage = Math.ceil(projects.length / 2) - 1;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 overflow-hidden scroll-snap-start bg-gradient-to-b from-black via-gray-900 to-black"
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      {/* Gaming ambient effects */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-screen filter blur-3xl bg-red-600 opacity-20 animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full mix-blend-screen filter blur-3xl bg-orange-600 opacity-20 animate-float" style={{animationDelay: "2s"}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full mix-blend-screen filter blur-3xl bg-red-500 opacity-15 animate-float" style={{animationDelay: "4s"}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 h-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
            📖 Work
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            Explore my portfolio through an interactive magical book
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Use ← → arrows, scroll, or swipe to flip pages
          </p>
        </div>



        {/* Book Container */}
        <div
          ref={containerRef}
          className="relative mx-auto max-w-6xl"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ perspective: "1200px" }}
        >
          {/* 3D Book Canvas */}
          <BookScene
            projects={projects}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            isDarkMode={isDarkMode}
          />

          {/* Page Info Below Book */}
          <div className="text-center mt-8 text-gray-300">
            <p className="font-orbitron text-sm tracking-widest text-red-500">
              PAGE {(currentPage * 2) + 1} - {Math.min((currentPage * 2) + 2, projects.length)} OF {projects.length}
            </p>
          </div>

          {/* Page Details */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* Left Page Details */}
            {currentPage * 2 < projects.length && (
              <div className="p-6 rounded-lg backdrop-blur-md bg-gradient-to-br from-red-900/30 to-orange-900/20 border border-red-500/50 hover:border-red-400/80 transition-all duration-300 relative overflow-hidden group">
                {/* Gaming corner accent */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-red-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-red-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <h3 className="text-2xl font-bold mb-2 text-red-400">
                  {projects[currentPage * 2].title}
                </h3>
                <p className="mb-4 text-gray-300">
                  {projects[currentPage * 2].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {projects[currentPage * 2].technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full bg-red-500/30 text-red-300 border border-red-400/50 hover:bg-red-500/50 transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Right Page Details */}
            {currentPage * 2 + 1 < projects.length && (
              <div className="p-6 rounded-lg backdrop-blur-md bg-gradient-to-br from-orange-900/30 to-red-900/20 border border-orange-500/50 hover:border-orange-400/80 transition-all duration-300 relative overflow-hidden group">
                {/* Gaming corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-orange-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-orange-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <h3 className="text-2xl font-bold mb-2 text-orange-400">
                  {projects[currentPage * 2 + 1].title}
                </h3>
                <p className="mb-4 text-gray-300">
                  {projects[currentPage * 2 + 1].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {projects[currentPage * 2 + 1].technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full bg-orange-500/30 text-orange-300 border border-orange-400/50 hover:bg-orange-500/50 transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentPage === index
                    ? 'bg-red-500 w-8 shadow-lg shadow-red-500'
                    : 'bg-gray-600 hover:bg-orange-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Work;
