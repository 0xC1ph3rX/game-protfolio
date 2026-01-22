import React, { useEffect, useRef, useState } from 'react';

const CursorFX: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const hoverRef = useRef(false);

  useEffect(() => {
    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        const scale = hoverRef.current ? 1.4 : 1;
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(${scale})`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        const scale = hoverRef.current ? 1.25 : 1;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
      }
      raf = requestAnimationFrame(animate);
    };

    const handlePointerOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.cursor-target')) {
        hoverRef.current = true;
        setIsHovering(true);
      }
    };

    const handlePointerOut = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.cursor-target')) {
        hoverRef.current = false;
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('pointerover', handlePointerOver);
    window.addEventListener('pointerout', handlePointerOut);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerout', handlePointerOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cursor-layer">
      <div ref={dotRef} className={`cursor-dot ${isHovering ? 'cursor-dot--active' : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${isHovering ? 'cursor-ring--active' : ''}`} />
    </div>
  );
};

export default CursorFX;
