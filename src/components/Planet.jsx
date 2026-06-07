import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Planet({ position, scale = 1, color = "#00f2fe", wireframe = false, hasRings = false }) {
  const planetRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Core Planet */}
      <mesh ref={planetRef}>
        <icosahedronGeometry args={[scale, 8]} />
        <meshStandardMaterial 
          color={color} 
          wireframe={wireframe} 
          roughness={0.7} 
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Atmospheric Glow */}
      <mesh scale={scale * 1.05}>
        <icosahedronGeometry args={[1, 4]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.15} 
          blending={2} // Additive blending
        />
      </mesh>

      {/* Optional Rings */}
      {hasRings && (
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[scale * 1.5, scale * 2.2, 64]} />
          <meshBasicMaterial 
            color={color} 
            side={2} // Double side
            transparent 
            opacity={0.3}
            wireframe={true}
          />
        </mesh>
      )}
    </group>
  );
}
