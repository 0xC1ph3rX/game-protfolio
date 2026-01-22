import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Edges } from '@react-three/drei';
import * as THREE from 'three';

interface SocialCardProps {
  label: string;
  icon: string;
  color?: string;
  position?: [number, number, number];
  onClick?: () => void;
}

const SocialCard: React.FC<SocialCardProps> = ({
  label,
  icon,
  color = '#ff2d00',
  position = [0, 0, 0],
  onClick
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useFrame(({ mouse }) => {
    if (!groupRef.current) return;
    const targetX = hovered ? mouse.y * 0.35 : 0;
    const targetY = hovered ? mouse.x * 0.35 : 0;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.08);

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, hovered ? 2.8 : 1.2, 0.1);
    }
  });

  const handleClick = () => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 180);
    onClick?.();
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      <RoundedBox args={[2.8, 3.6, 0.3]} radius={0.12} smoothness={6}>
        <meshPhysicalMaterial
          transmission={0.9}
          thickness={1.2}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          color="#0c0c0c"
          emissive={color}
          emissiveIntensity={hovered ? 0.9 : 0.4}
          reflectivity={1}
        />
      </RoundedBox>

      <Edges color={hovered ? '#ff6b00' : color} />

      <mesh ref={glowRef} position={[0, 0, 0.2]}>
        <planeGeometry args={[2.6, 3.4]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive={color}
          emissiveIntensity={1.2}
          transparent
          opacity={0.12}
        />
      </mesh>

      <Text position={[0, 0.6, 0.26]} fontSize={0.75} color={hovered ? color : '#ffffff'}>
        {glitch ? `${icon}▮` : icon}
      </Text>
      <Text position={[0, -1.2, 0.26]} fontSize={0.24} color="#d9d9d9">
        {glitch ? `${label}▮` : label}
      </Text>
    </group>
  );
};

export default SocialCard;
