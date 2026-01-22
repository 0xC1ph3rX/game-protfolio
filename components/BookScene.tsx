import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Plane, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

interface BookSceneProps {
  projects: Project[];
  currentPage: number;
  onPageChange: (page: number) => void;
  isDarkMode: boolean;
}

// Enhanced 3D Book Page with realistic paper effect and social media cards
const BookPage: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  image: string;
  title: string;
  isRight: boolean;
}> = ({ position, rotation, image, title, isRight }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.copy(new THREE.Euler(...rotation));
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main Page Mesh with detailed geometry */}
      <mesh ref={meshRef}>
        <planeGeometry args={[4, 6, 40, 40]} /> {/* More segments for realism */}
        <meshStandardMaterial
          color="#faf6f1"
          metalness={0.05}
          roughness={0.85}
          side={THREE.DoubleSide}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* Page border with gaming glow */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[3.95, 5.95]} />
        <meshStandardMaterial
          color="#e8dcc8"
          emissive="#ff1e00"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Deep shadow for 3D effect */}
      <mesh position={[isRight ? 0.15 : -0.15, 0, -0.05]}>
        <planeGeometry args={[4.3, 6.3]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#ff1e00"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Gaming page glow */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[4.5, 6.5]} />
        <meshStandardMaterial
          color="#ff1e00"
          emissive="#ff1e00"
          emissiveIntensity={0.2}
          transparent
          opacity={0.05}
        />
      </mesh>
    </group>
  );
};

// Enhanced 3D Book with realistic lighting
const Book3D: React.FC<BookSceneProps> = ({ projects, currentPage, onPageChange, isDarkMode }) => {
  const sceneRef = useRef<THREE.Scene>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [bookRotation, setBookRotation] = useState(0);

  const leftProjectIndex = currentPage * 2;
  const rightProjectIndex = currentPage * 2 + 1;

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = bookRotation;
      gsap.to(groupRef.current.rotation, {
        y: bookRotation,
        duration: 0.6,
        overwrite: 'auto',
        ease: "power2.inOut"
      });
    }
  });

  // Gaming theme lighting setup - Always dark with red/gold gaming lights
  useEffect(() => {
    if (sceneRef.current) {
      // Clear existing lights
      sceneRef.current.children
        .filter(child => child instanceof THREE.Light)
        .forEach(light => sceneRef.current?.remove(light));

      // Gaming theme: Red/Gold futuristic lighting
      const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.5);
      const directionalLight1 = new THREE.DirectionalLight(0xff1e00, 1.0); // Red gaming light
      directionalLight1.position.set(5, 8, 5);
      const directionalLight2 = new THREE.DirectionalLight(0xff6b00, 0.6); // Orange accent
      directionalLight2.position.set(-5, 5, -5);
      const pointLight = new THREE.PointLight(0xff1e00, 0.8);
      pointLight.position.set(0, 3, 8);
      
      sceneRef.current.add(ambientLight, directionalLight1, directionalLight2, pointLight);
    }
  }, []);

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && currentPage > 0) {
      onPageChange(currentPage - 1);
      setBookRotation(bookRotation - 0.3);
    } else if (e.key === 'ArrowRight' && rightProjectIndex < projects.length) {
      onPageChange(currentPage + 1);
      setBookRotation(bookRotation + 0.3);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [currentPage, rightProjectIndex, projects.length]);

  return (
    <group ref={groupRef}>
      {/* Left Page */}
      {leftProjectIndex < projects.length && (
        <BookPage
          position={[-2.1, 0, 0]}
          rotation={[0, 0.15, 0]}
          image={projects[leftProjectIndex].image}
          title={projects[leftProjectIndex].title}
          isRight={false}
        />
      )}

      {/* Book Spine - Gaming gold color */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.25, 6.2, 0.15]} />
        <meshStandardMaterial
          color="#d4a574"
          emissive="#ff1e00"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Right Page */}
      {rightProjectIndex < projects.length && (
        <BookPage
          position={[2.1, 0, 0]}
          rotation={[0, -0.15, 0]}
          image={projects[rightProjectIndex].image}
          title={projects[rightProjectIndex].title}
          isRight={true}
        />
      )}

      {/* Gaming glow point lights for atmosphere */}
      <pointLight position={[-3, 2, 3]} intensity={0.4} color="#ff1e00" />
      <pointLight position={[3, 2, 3]} intensity={0.4} color="#ff6b00" />
      <pointLight position={[0, 4, 6]} intensity={0.3} color="#4a90ff" />
    </group>
  );
};

// Canvas wrapper with gaming theme
const BookScene: React.FC<BookSceneProps> = (props) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 14], fov: 45 }}
      style={{ width: '100%', height: '650px' }}
      dpr={[1, 1.5]}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={45} />
      {/* Gaming dark background */}
      <color attach="background" args={['#0a0e27']} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0e27', 15, 50]} />

      {/* Environment lighting */}
      <ambientLight intensity={0.6} />
      
      <Book3D {...props} />

      {/* OrbitControls for mouse interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        rotateSpeed={0.3}
        minDistance={10}
        maxDistance={20}
      />
    </Canvas>
  );
};

export default BookScene;
