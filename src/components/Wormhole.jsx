import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Wormhole({ position = [0, 0, -200] }) {
  const groupRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const ringRef3 = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Rotate rings in opposite directions
    ringRef1.current.rotation.z += delta * 1.5;
    ringRef2.current.rotation.z -= delta * 2.0;
    ringRef3.current.rotation.z += delta * 2.5;

    // Pulse scale slightly
    const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group position={position} ref={groupRef}>
      {/* Outer Glow */}
      <mesh>
        <circleGeometry args={[25, 32]} />
        <meshBasicMaterial color="#bd00ff" transparent opacity={0.1} fog={false} />
      </mesh>

      {/* Ring 1 */}
      <mesh ref={ringRef1} position={[0, 0, 1]}>
        <torusGeometry args={[10, 0.2, 16, 100]} />
        <meshBasicMaterial color="#00f2fe" wireframe />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ringRef2} position={[0, 0, -1]}>
        <torusGeometry args={[8, 0.5, 16, 50]} />
        <meshBasicMaterial color="#bd00ff" wireframe />
      </mesh>

      {/* Ring 3 */}
      <mesh ref={ringRef3} position={[0, 0, -3]}>
        <torusGeometry args={[5, 1, 16, 32]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
      
      {/* Center Black Hole */}
      <mesh position={[0, 0, -5]}>
        <circleGeometry args={[4.5, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Intense light from wormhole */}
      <pointLight position={[0, 0, 10]} intensity={500} color="#00f2fe" distance={100} />
      <pointLight position={[0, 0, 10]} intensity={500} color="#bd00ff" distance={100} />
    </group>
  );
}
