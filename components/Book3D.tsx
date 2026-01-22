import React, { useEffect, useMemo, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Project } from '../types';

interface CurvedPageProps {
  textureUrl?: string;
  position: [number, number, number];
  rotation: [number, number, number];
  bend: number;
}

const CurvedPage: React.FC<CurvedPageProps> = ({ textureUrl, position, rotation, bend }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(textureUrl || 'https://picsum.photos/seed/blank/800/600');

  const geometry = useMemo(() => new THREE.PlaneGeometry(4.2, 6.2, 40, 10), []);

  useEffect(() => {
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const width = 4.2;
    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i);
      const curve = Math.sin((x / width) * Math.PI) * bend;
      pos.setZ(i, curve);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
  }, [bend, geometry]);

  return (
    <mesh ref={meshRef} geometry={geometry} position={position} rotation={rotation}>
      <meshStandardMaterial
        map={texture}
        roughness={0.85}
        metalness={0.1}
        side={THREE.DoubleSide}
        emissive="#0a0a0a"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

interface Book3DProps {
  projects: Project[];
  index: number;
}

const Book3D: React.FC<Book3DProps> = ({ projects, index }) => {
  const leftIndex = index % projects.length;
  const rightIndex = (index + 1) % projects.length;

  return (
    <group position={[0, 0.2, 0]} rotation={[0, 0.15, 0]}>
      {/* Left Page */}
      <CurvedPage
        textureUrl={projects[leftIndex]?.image}
        position={[-2.15, 0, 0]}
        rotation={[0, 0.1, 0]}
        bend={0.18}
      />

      {/* Spine */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.25, 6.3, 0.2]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#ff2d00"
          emissiveIntensity={0.35}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Right Page */}
      <CurvedPage
        textureUrl={projects[rightIndex]?.image}
        position={[2.15, 0, 0]}
        rotation={[0, -0.1, 0]}
        bend={-0.18}
      />

      {/* Book Base Shadow */}
      <mesh position={[0, -3.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.4, 64]} />
        <meshStandardMaterial color="#000" opacity={0.3} transparent />
      </mesh>
    </group>
  );
};

export default Book3D;
