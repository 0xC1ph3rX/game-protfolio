import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, MeshReflectorMaterial } from '@react-three/drei';
import Book3D from './Book3D';
import { PROJECTS } from '../constants';

const WorkSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStart.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStart.current === null) return;
    const delta = e.clientX - pointerStart.current;
    pointerStart.current = null;

    if (delta < -60) {
      setIndex((prev) => (prev + 1) % PROJECTS.length);
    }

    if (delta > 60) {
      setIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    }
  };

  return (
    <div className="relative h-full w-full flex items-center justify-center bg-[#050505]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'linear-gradient(#ff2d00 1px, transparent 1px), linear-gradient(90deg, #ff2d00 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-widest uppercase">
            <span className="text-white">Project</span>
            <span className="text-red-500 ml-3">Dossier</span>
          </h2>
          <p className="text-gray-400 mt-3">
            Drag left or right to flip through the archive
          </p>
        </div>

        <div
          className="w-full h-[60vh] md:h-[70vh]"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <Canvas
            camera={{ position: [0, 2.5, 10], fov: 35 }}
            dpr={[1, 2]}
            gl={{ antialias: true }}
          >
            <color attach="background" args={['#050505']} />
            <fog attach="fog" args={['#050505', 10, 30]} />

            <ambientLight intensity={0.25} />
            <directionalLight position={[6, 8, 6]} intensity={1.2} color="#ff2d00" />
            <directionalLight position={[-6, 6, -4]} intensity={0.6} color="#ff6b00" />
            <Environment preset="city" />

            <Book3D projects={PROJECTS} index={index} />

            {/* Wet floor reflection */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.3, 0]}>
              <planeGeometry args={[30, 30]} />
              <MeshReflectorMaterial
                blur={[400, 100]}
                resolution={1024}
                mixBlur={2}
                mixStrength={20}
                roughness={0.2}
                metalness={0.4}
                color="#0b0b0b"
                mirror={0.6}
                depthScale={1.5}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
              />
            </mesh>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default WorkSection;
