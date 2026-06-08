import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Orbiter({
  radius = 6,
  speed = 0.3,
  offset = 0,

  centerX = -12,
  centerY = 0,
  centerZ = -5,
}) {
  const sphereRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
  
    sphereRef.current.position.x =
      centerX + Math.cos(t * speed + offset) * radius;
  
    sphereRef.current.position.y =
      centerY + Math.sin(t * speed + offset) * radius;
  
    sphereRef.current.position.z =
      centerZ - 2;
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[0.8, 32, 32]} />

      <pointLight
        position={[0, 5, 5]}
        intensity={50}
        color="#FFD700"
      />

      <pointLight
        position={[0, -5, 5]}
        intensity={20}
        color="#FFFACD"
      />

      <meshStandardMaterial
        color="#4A3B00"
        emissive="#7A3E1D"
        emissiveIntensity={0.4}
        metalness={1}
        roughness={0.2}
      />
    </mesh>
  );
}