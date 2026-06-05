import { useRef } from 'react';
import * as THREE from 'three';

export default function FootballField() {
  const fieldLength = 150;
  const fieldWidth = 30;

  return (
    <group>
      {/* Main Pitch */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, fieldLength / 2 - 10]} receiveShadow>
        <planeGeometry args={[fieldWidth, fieldLength]} />
        <meshStandardMaterial color="#2d5e1e" roughness={0.8} />
      </mesh>

      {/* Field Lines - simplified for stylization */}
      {/* Center Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[fieldWidth, 0.2]} />
        <meshBasicMaterial color="white" />
      </mesh>
      
      {/* Center Circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[3.8, 4, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Goal Line (Far end) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, fieldLength - 10]} receiveShadow>
        <planeGeometry args={[fieldWidth, 0.2]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Goal Line (Near end) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]} receiveShadow>
        <planeGeometry args={[fieldWidth, 0.2]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Side Lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-fieldWidth / 2, 0, fieldLength / 2 - 10]} receiveShadow>
        <planeGeometry args={[0.2, fieldLength]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[fieldWidth / 2, 0, fieldLength / 2 - 10]} receiveShadow>
        <planeGeometry args={[0.2, fieldLength]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Penalty Box (Far end) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, fieldLength - 16]}>
        <planeGeometry args={[12, 0.2]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-6, 0, fieldLength - 13]}>
        <planeGeometry args={[0.2, 6]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6, 0, fieldLength - 13]}>
        <planeGeometry args={[0.2, 6]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  );
}
