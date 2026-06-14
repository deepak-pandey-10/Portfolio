import { useGLTF, Center } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function TempleRuins() {
  const { scene } = useGLTF(
    "/src/components/medieval_ruin_tample.glb"
  );

  const groupRef = useRef();
  const rotationSpeed = useRef(0.003);

  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!groupRef.current) return;

    const targetSpeed = hovered
      ? 0.002
      : 0.006;

    rotationSpeed.current +=
      (targetSpeed - rotationSpeed.current) *
      0.05;

    groupRef.current.rotation.y +=
      rotationSpeed.current;
  });

  return (
    <group
      ref={groupRef}
      position={[-25, -10, -2]}
      scale={0.005}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}