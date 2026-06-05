import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function Player({ position = [0, 0, 0] }) {
  const group = useRef();
  const leftLeg = useRef();
  const rightLeg = useRef();
  const leftArm = useRef();
  const rightArm = useRef();
  
  const scroll = useScroll();

  // Materials
  const skinMaterial = new THREE.MeshStandardMaterial({ color: '#f1c27d', roughness: 0.6 });
  const jerseyMaterial = new THREE.MeshStandardMaterial({ color: '#FFD700', roughness: 0.4 });
  const shortsMaterial = new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.8 });
  const shoeMaterial = new THREE.MeshStandardMaterial({ color: '#ff4444', roughness: 0.5 });

  useFrame((state, delta) => {
    if (!group.current) return;
    
    // Total run distance is roughly 120 units down the Z axis
    const runDistance = 120;
    
    // Calculate player Z position based on scroll offset
    // offset goes from 0 to 1. 
    // Wait for intro (0-0.1), run until goal (0.1-0.9), celebrate (0.9-1.0)
    
    let currentZ = 0;
    let isRunning = false;

    if (scroll.offset > 0.1 && scroll.offset < 0.9) {
      // Map 0.1-0.9 to 0-1
      const progress = (scroll.offset - 0.1) / 0.8;
      currentZ = progress * runDistance;
      isRunning = true;
    } else if (scroll.offset >= 0.9) {
      currentZ = runDistance;
      isRunning = false;
    }

    // Smoothly interpolate Z position
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, currentZ, 0.1);

    // Animation: running cycle
    const time = state.clock.getElapsedTime();
    
    if (isRunning) {
      // Speed multiplier
      const speed = 15;
      
      // Legs
      leftLeg.current.rotation.x = Math.sin(time * speed) * 0.5;
      rightLeg.current.rotation.x = Math.sin(time * speed + Math.PI) * 0.5;
      
      // Arms (opposite to legs)
      leftArm.current.rotation.x = Math.sin(time * speed + Math.PI) * 0.5;
      rightArm.current.rotation.x = Math.sin(time * speed) * 0.5;

      // Slight body bob
      group.current.position.y = Math.abs(Math.sin(time * speed * 2)) * 0.1;
    } else {
      // Idle animation
      leftLeg.current.rotation.x = THREE.MathUtils.lerp(leftLeg.current.rotation.x, 0, 0.1);
      rightLeg.current.rotation.x = THREE.MathUtils.lerp(rightLeg.current.rotation.x, 0, 0.1);
      leftArm.current.rotation.x = THREE.MathUtils.lerp(leftArm.current.rotation.x, 0, 0.1);
      rightArm.current.rotation.x = THREE.MathUtils.lerp(rightArm.current.rotation.x, 0, 0.1);
      
      // Idle breath bob
      group.current.position.y = Math.sin(time * 2) * 0.05;
    }
  });

  return (
    <group ref={group} position={position} castShadow>
      {/* Torso */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <boxGeometry args={[0.7, 0.8, 0.4]} />
        <primitive object={jerseyMaterial} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 2.1, 0]} castShadow>
        <sphereGeometry args={[0.3]} />
        <primitive object={skinMaterial} />
      </mesh>

      {/* Left Arm (hinged at shoulder) */}
      <group position={[-0.45, 1.7, 0]} ref={leftArm}>
        <mesh position={[0, -0.4, 0]} castShadow>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <primitive object={skinMaterial} />
        </mesh>
      </group>

      {/* Right Arm (hinged at shoulder) */}
      <group position={[0.45, 1.7, 0]} ref={rightArm}>
        <mesh position={[0, -0.4, 0]} castShadow>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <primitive object={skinMaterial} />
        </mesh>
      </group>

      {/* Left Leg (hinged at hip) */}
      <group position={[-0.2, 1.0, 0]} ref={leftLeg}>
        <mesh position={[0, -0.5, 0]} castShadow>
          <boxGeometry args={[0.25, 1.0, 0.25]} />
          <primitive object={shortsMaterial} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -1.0, 0.1]} castShadow>
          <boxGeometry args={[0.3, 0.2, 0.4]} />
          <primitive object={shoeMaterial} />
        </mesh>
      </group>

      {/* Right Leg (hinged at hip) */}
      <group position={[0.2, 1.0, 0]} ref={rightLeg}>
        <mesh position={[0, -0.5, 0]} castShadow>
          <boxGeometry args={[0.25, 1.0, 0.25]} />
          <primitive object={shortsMaterial} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -1.0, 0.1]} castShadow>
          <boxGeometry args={[0.3, 0.2, 0.4]} />
          <primitive object={shoeMaterial} />
        </mesh>
      </group>
    </group>
  );
}
