import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

const PortfolioBook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const bookRef = useRef<HTMLDivElement>(null);
  const leftPageRef = useRef<HTMLDivElement>(null);
  const rightPageRef = useRef<HTMLDivElement>(null);

  // Project data
  const projects: Project[] = [
    {
      id: 1,
      title: "Gaming Designer",
      description: "Creating visual power for the digital arena. Interactive portfolio showcasing design expertise and gaming aesthetics.",
      image: "/assets/me.png",
      technologies: ["React", "TypeScript", "GSAP", "Three.js"],
      link: "#"
    },
    {
      id: 2,
      title: "UI/UX Design System",
      description: "A comprehensive design system for modern applications with dark mode support and accessibility features.",
      image: "/assets/me.png",
      technologies: ["Figma", "CSS", "React", "Tailwind"],
      link: "#"
    },
    {
      id: 3,
      title: "3D Web Experience",
      description: "Immersive 3D interactive experiences using WebGL and advanced JavaScript techniques for maximum engagement.",
      image: "/assets/me.png",
      technologies: ["Three.js", "WebGL", "JavaScript", "GLSL"],
      link: "#"
    },
    {
      id: 4,
      title: "Motion Graphics",
      description: "Stunning animated visualizations with smooth transitions and particle effects for web and apps.",
      image: "/assets/me.png",
      technologies: ["GSAP", "Canvas", "React", "Lottie"],
      link: "#"
    },
    {
      id: 5,
      title: "E-Commerce Platform",
      description: "Full-featured e-commerce solution with real-time inventory, payment integration, and admin dashboard.",
      image: "/assets/me.png",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#"
    }
  ];

  // Play page turn sound
  const playPageTurnSound = () => {
    if (soundEnabled) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  // Animate page flip
  const flipPage = (direction: 'next' | 'prev') => {
    if (isFlipping) return;

    const maxPage = Math.ceil(projects.length / 2) - 1;
    let newPage = currentPage;

    if (direction === 'next' && currentPage < maxPage) {
      newPage = currentPage + 1;
    } else if (direction === 'prev' && currentPage > 0) {
      newPage = currentPage - 1;
    } else {
      return;
    }

    setIsFlipping(true);
    playPageTurnSound();

    // Animate left page out
    if (leftPageRef.current) {
      gsap.to(leftPageRef.current, {
        rotationY: direction === 'next' ? -180 : 0,
        duration: 0.8,
        ease: "power2.inOut",
        transformOrigin: "right center"
      });
    }

    // Animate right page in
    if (rightPageRef.current) {
      gsap.to(rightPageRef.current, {
        rotationY: direction === 'next' ? 0 : 180,
        duration: 0.8,
        ease: "power2.inOut",
        transformOrigin: "left center"
      });
    }

    setTimeout(() => {
      setCurrentPage(newPage);
      setIsFlipping(false);
    }, 400);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') flipPage('prev');
      if (e.key === 'ArrowRight') flipPage('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipping, currentPage]);

  // Get left and right page projects
  const leftProjectIndex = currentPage * 2;
  const rightProjectIndex = currentPage * 2 + 1;
  const leftProject = projects[leftProjectIndex];
  const rightProject = projects[rightProjectIndex];

  return (
    <div className="portfolio-book-container w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: "2s"}}></div>
      </div>

      {/* Sound toggle */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 font-bold"
        title={soundEnabled ? "Sound: ON" : "Sound: OFF"}
      >
        {soundEnabled ? "🔊" : "🔇"}
      </button>

      {/* Main Book Container */}
      <div ref={bookRef} className="book-container relative w-full max-w-6xl h-[600px] md:h-[700px]" style={{ perspective: "1200px" }}>
        
        {/* Book spine / center */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-yellow-900 to-amber-900 shadow-2xl z-40"></div>

        {/* Left Page */}
        <div
          ref={leftPageRef}
          className="page page-left absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-amber-50 to-yellow-50 rounded-r-sm shadow-2xl overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "right center"
          }}
        >
          {leftProject ? (
            <div className="page-content p-8 md:p-12 h-full flex flex-col justify-between relative">
              {/* Decorative border */}
              <div className="absolute inset-4 border-2 border-yellow-800 opacity-30 rounded pointer-events-none"></div>

              {/* Project Image */}
              <div className="relative z-10 mb-4">
                <div className="relative w-full h-40 md:h-48 rounded-lg overflow-hidden border-4 border-yellow-900 shadow-lg">
                  <img
                    src={leftProject.image}
                    alt={leftProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Project Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-yellow-900 mb-2 relative z-10">{leftProject.title}</h2>

              {/* Project Description */}
              <p className="text-sm md:text-base text-gray-700 mb-4 relative z-10 line-clamp-3">{leftProject.description}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                {leftProject.technologies.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 bg-yellow-200 text-yellow-900 rounded-full border border-yellow-400">
                    {tech}
                  </span>
                ))}
              </div>

              {/* View Project Button */}
              <a
                href={leftProject.link}
                className="inline-block px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 relative z-10 text-center text-sm"
              >
                View Project →
              </a>

              {/* Page number */}
              <div className="absolute bottom-4 right-4 text-xs text-gray-500">{leftProjectIndex + 1}</div>
            </div>
          ) : (
            <div className="page-content p-8 md:p-12 h-full flex items-center justify-center relative">
              <div className="absolute inset-4 border-2 border-yellow-800 opacity-30 rounded pointer-events-none"></div>
              <p className="text-center text-gray-500 text-sm relative z-10">Cover Page</p>
            </div>
          )}
        </div>

        {/* Right Page */}
        <div
          ref={rightPageRef}
          className="page page-right absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-amber-50 to-yellow-50 rounded-l-sm shadow-2xl overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "left center"
          }}
        >
          {rightProject ? (
            <div className="page-content p-8 md:p-12 h-full flex flex-col justify-between relative">
              {/* Decorative border */}
              <div className="absolute inset-4 border-2 border-yellow-800 opacity-30 rounded pointer-events-none"></div>

              {/* Project Image */}
              <div className="relative z-10 mb-4">
                <div className="relative w-full h-40 md:h-48 rounded-lg overflow-hidden border-4 border-yellow-900 shadow-lg">
                  <img
                    src={rightProject.image}
                    alt={rightProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Project Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-yellow-900 mb-2 relative z-10">{rightProject.title}</h2>

              {/* Project Description */}
              <p className="text-sm md:text-base text-gray-700 mb-4 relative z-10 line-clamp-3">{rightProject.description}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                {rightProject.technologies.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 bg-yellow-200 text-yellow-900 rounded-full border border-yellow-400">
                    {tech}
                  </span>
                ))}
              </div>

              {/* View Project Button */}
              <a
                href={rightProject.link}
                className="inline-block px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 relative z-10 text-center text-sm"
              >
                View Project →
              </a>

              {/* Page number */}
              <div className="absolute bottom-4 left-4 text-xs text-gray-500">{rightProjectIndex + 1}</div>
            </div>
          ) : (
            <div className="page-content p-8 md:p-12 h-full flex items-center justify-center relative">
              <div className="absolute inset-4 border-2 border-yellow-800 opacity-30 rounded pointer-events-none"></div>
              <p className="text-center text-gray-500 text-sm relative z-10">Back Cover</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => flipPage('prev')}
        disabled={currentPage === 0 || isFlipping}
        className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 shadow-lg z-30"
        title="Previous Page"
      >
        ←
      </button>

      <button
        onClick={() => flipPage('next')}
        disabled={currentPage >= Math.ceil(projects.length / 2) - 1 || isFlipping}
        className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 shadow-lg z-30"
        title="Next Page"
      >
        →
      </button>

      {/* Page indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-center z-30">
        <p className="text-white text-sm font-orbitron">
          Page {currentPage + 1} of {Math.ceil(projects.length / 2)}
        </p>
        <p className="text-gray-400 text-xs mt-1">Use ← → arrows or click buttons</p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        
        .page {
          backdrop-filter: blur(10px);
          box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }

        .page-content {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 243, 199, 0.95) 100%);
          position: relative;
        }

        .page::after {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(217, 119, 6, 0.03) 2px,
              rgba(217, 119, 6, 0.03) 4px
            );
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default PortfolioBook;
