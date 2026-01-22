import React from 'react';
import SocialCard from './SocialCard';

const SocialDeck: React.FC = () => {
  return (
    <group position={[0, 0.5, 0]}>
      <SocialCard label="Discord" icon="💬" color="#ff2d00" position={[-3.2, 0.2, 0]} />
      <SocialCard label="Pinterest" icon="📌" color="#ff6b00" position={[0, 0.6, 0.2]} />
      <SocialCard label="Instagram" icon="📷" color="#ff4500" position={[3.2, 0.2, 0]} />
    </group>
  );
};

export default SocialDeck;
