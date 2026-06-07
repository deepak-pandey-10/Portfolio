import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';

export default function Starfield() {
  const starsRef = useRef();

  useFrame((state, delta) => {
    if (starsRef.current) {
      // Very slow rotation for the entire galaxy
      starsRef.current.rotation.y += delta * 0.01;
      starsRef.current.rotation.z += delta * 0.005;
    }
  });

  return (
    <group ref={starsRef}>
      <Stars 
        radius={100} 
        depth={50} 
        count={7000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      {/* Nebula-like colored sparkles in the background */}
      <Sparkles count={500} scale={200} size={15} speed={0.4} color="#00f2fe" opacity={0.3} />
      <Sparkles count={500} scale={200} size={15} speed={0.4} color="#bd00ff" opacity={0.3} />
    </group>
  );
}
