import React, { useState } from 'react';
import ProductCard from './ProductCard';

const StoreSection: React.FC = () => {
  const [count, setCount] = useState(0);

  const products = [
    {
      title: 'Neon Tactical Rig',
      price: '$189',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Cyber Core Headset',
      price: '$249',
      image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Aegis Controller',
      price: '$159',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  return (
    <div className="relative h-full w-full flex items-center justify-center bg-[#050505]">
      {/* Cart HUD */}
      <div className="absolute top-8 right-8 z-20">
        <div className="relative px-4 py-3 bg-[#0b0b0b]/70 border border-[#ff4500]/40 backdrop-blur-[12px] shadow-[0_0_25px_rgba(255,69,0,0.2)]">
          <div className="text-xs text-[#ff4500] tracking-[0.3em] uppercase">Inventory</div>
          <div className="text-white font-black tracking-widest">GEAR</div>
          <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#ff4500] text-black flex items-center justify-center font-black shadow-[0_0_15px_rgba(255,69,0,0.6)]">
            {count}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-widest uppercase">
            <span className="text-white">Gear</span>
            <span className="text-[#ff4500] ml-3">Store</span>
          </h2>
          <p className="text-gray-400 mt-3">
            Loadout-grade equipment curated for the digital arena
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard
              key={product.title}
              title={product.title}
              price={product.price}
              image={product.image}
              onAcquire={() => setCount((prev) => prev + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreSection;
