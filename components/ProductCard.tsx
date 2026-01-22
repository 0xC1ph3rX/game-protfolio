import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  onAcquire: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, onAcquire }) => {
  const [hovered, setHovered] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleAcquire = () => {
    setFlash(true);
    onAcquire();
    setTimeout(() => setFlash(false), 160);
  };

  return (
    <motion.div
      className="relative group"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <div className="relative overflow-hidden bg-[#0b0b0b]/60 backdrop-blur-[12px] border border-[#ff4500]/30 shadow-[0_0_30px_rgba(255,69,0,0.15)] clip-path-card">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            animate={{
              filter: hovered ? 'grayscale(0) brightness(1.05)' : 'grayscale(1) brightness(0.7)',
              scale: hovered ? 1.05 : 1
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Scanline */}
          <motion.div
            className="absolute left-0 right-0 h-12 bg-gradient-to-b from-transparent via-[#ff4500]/20 to-transparent opacity-0"
            animate={hovered ? { opacity: 1, y: ['-20%', '120%'] } : { opacity: 0 }}
            transition={{ duration: 1.4, repeat: hovered ? Infinity : 0, ease: 'linear' }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black tracking-widest uppercase text-white">
              {title}
            </h3>
            <span className="text-sm font-bold text-[#ff4500]">{price}</span>
          </div>

          <div className="mt-6">
            <motion.button
              onClick={handleAcquire}
              whileTap={{ scale: 0.92 }}
              className="relative w-full py-3 border border-[#ff4500]/50 bg-[#0f0f0f] text-[#ff4500] font-black tracking-widest uppercase overflow-hidden"
            >
              <span className="relative z-10">ACQUIRE</span>
              <motion.span
                className="absolute inset-0 bg-white/80"
                animate={flash ? { opacity: [0, 1, 0] } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>
        </div>
      </div>

      <style>{`
        .clip-path-card {
          clip-path: polygon(6% 0%, 100% 0%, 100% 92%, 94% 100%, 0% 100%, 0% 8%);
        }
      `}</style>
    </motion.div>
  );
};

export default ProductCard;
