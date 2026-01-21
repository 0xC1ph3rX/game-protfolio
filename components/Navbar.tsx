
import React, { useState } from 'react';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Work', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Left Side: Logo Text */}
        <div className="flex-1 hidden md:flex">
          <span className="font-orbitron text-xl font-bold tracking-tighter text-white">
            STUDIO <span className="text-red-600">SHODWE</span>
          </span>
        </div>

        {/* Center: Hexagon Logo */}
        <div className="flex-none relative">
          <div className="w-16 h-18 bg-red-600 clip-path-hexagon flex items-center justify-center red-glow hover:scale-110 transition-transform cursor-pointer">
            <svg 
              viewBox="0 0 24 24" 
              className="w-8 h-8 text-black" 
              fill="currentColor"
            >
              <path d="M21,6H3C1.9,6,1,6.9,1,8v8c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V8C23,6.9,22.1,6,21,6z M10,13.5H9V14.5c0,0.3-0.2,0.5-0.5,0.5h-1 C7.2,15,7,14.8,7,14.5v-1H6c-0.3,0-0.5-0.2-0.5-0.5v-1c0-0.3,0.2-0.5,0.5-0.5h1v-1C7,10.2,7.2,10,7.5,10h1C8.8,10,9,10.2,9,10.5v1h1 c0.3,0,0.5,0.2,0.5,0.5v1C10.5,13.3,10.3,13.5,10,13.5z M14.5,12c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S15.1,12,14.5,12z M15.5,15 c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S16.1,15,15.5,15z M16.5,12c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S17.1,12,16.5,12z M17.5,15 c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S18.1,15,17.5,15z" />
            </svg>
          </div>
          <style>{`
            .clip-path-hexagon {
              clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
            }
          `}</style>
        </div>

        {/* Right Side: Desktop Menu */}
        <div className="flex-1 flex justify-end items-center">
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="font-orbitron text-sm uppercase tracking-widest hover:text-red-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/98 border-t border-red-600/30 flex flex-col items-center py-10 space-y-8 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="font-orbitron text-xl uppercase tracking-widest hover:text-red-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
