
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';

import ScrollIndicator from './components/ScrollIndicator';
import ChatBot from './components/ChatBot';
import ContactTerminal from './components/ContactTerminal';
import CursorFX from './components/CursorFX';
import GameLoader from './components/GameLoader';

import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
    if (!gl) {
      document.body.classList.add('no-webgl');
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <GameLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen bg-black text-white relative overflow-hidden animate-in fade-in duration-1000">
          <div className="fixed inset-0 -z-10">
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(#ff1e00 1px, transparent 1px), linear-gradient(90deg, #ff1e00 1px, transparent 1px)',
                backgroundSize: '80px 80px'
              }}
            />
            <div className="absolute -top-32 left-1/3 h-80 w-80 rounded-full bg-red-600/20 blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-orange-500/10 blur-[140px]" />
          </div>
          <div className="fixed inset-0 -z-10 pointer-events-none scanlines" />
          <div className="fixed inset-0 -z-10 pointer-events-none noise-layer" />
          <Navbar scrolled={scrolled} />

          <main>
            <Hero />

            <Portfolio />
            <section id="contact" className="border-t border-red-600/10">
              <ContactTerminal />
            </section>
          </main>



          {/* Floating UI Elements */}
          <ScrollIndicator />
          <ChatBot />
          <CursorFX />
          <CursorFX />
        </div>
      )}
    </>
  );
};

export default App;
