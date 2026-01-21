
import React from 'react';

const SearchButton: React.FC = () => {
  return (
    <div className="fixed bottom-10 right-10 z-40">
      <button className="w-14 h-14 bg-red-600 text-black flex items-center justify-center rounded-full red-glow hover:scale-110 transition-all active:scale-95 group">
        <svg 
          className="w-6 h-6 group-hover:rotate-12 transition-transform" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
};

export default SearchButton;
