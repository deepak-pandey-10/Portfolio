import { useGLTF, Center, DragControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function TempleRuins() {
  const { scene } = useGLTF(
    "/src/components/medieval_ruin_tample.glb"
  );

  const groupRef = useRef();

  const targetPos = useRef(
    new THREE.Vector3(-30, -10, -2)
  );

  const rotationSpeed = useRef(0.003);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!groupRef.current) return;

    // Very smooth, heavy movement
    groupRef.current.position.lerp(
      targetPos.current,
      0.001
    );

    const targetSpeed = hovered ? 0.002 : 0.004;

    rotationSpeed.current +=
      (targetSpeed - rotationSpeed.current) * 0.05;

    groupRef.current.rotation.y +=
      rotationSpeed.current;
  });

  return (
    <DragControls
      onDrag={(localMatrix) => {
        const pos = new THREE.Vector3();
        pos.setFromMatrixPosition(localMatrix);

        // Reduce drag sensitivity
        targetPos.current.lerp(pos, 0.2);
      }}
    >
      <group
        ref={groupRef}
        position={[-30, -10, -2]}
        scale={0.005}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Center>
          <primitive object={scene} />
        </Center>
      </group>
    </DragControls>
  );
}