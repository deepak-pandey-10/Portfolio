import { Sparkles } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";


export default function BlackHole() {
  const groupRef = useRef();
  const diskRef = useRef();

  useFrame(() => {
    if (diskRef.current) {
      diskRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[15, -8, -10]} // right-bottom
      scale={1.2}
    >  
      {/* Event Horizon */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#050505"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Soft White Halo */}
      <mesh scale={5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.03}
        />
      </mesh>

      {/* Gravitational Lensing Shell */}
      <mesh scale={2.8}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.05}
          transmission={1}
          roughness={0}
          thickness={3}
        />
      </mesh>

      {/* Accretion Disk */}
      <group ref={diskRef}>
        {/* Outer Disk */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.2, 0.3, 32, 256]} />
          <meshBasicMaterial
            color="#d9d9d9"
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Bright Core Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.7, 0.12, 32, 256]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Space Dust */}
      <Sparkles
        count={150}
        scale={12}
        size={1.5}
        speed={0.1}
        color="#ffffff"
      />
    </group>
  );
}