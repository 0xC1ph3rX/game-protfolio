
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import SearchButton from './components/SearchButton';
import ScrollIndicator from './components/ScrollIndicator';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Navbar scrolled={scrolled} />
      
      <main>
        <Hero />
        <Portfolio />
      </main>

      <Footer />
      
      {/* Floating UI Elements */}
      <SearchButton />
      <ScrollIndicator />
    </div>
  );
};

export default App;
