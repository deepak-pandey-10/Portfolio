import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function Football() {
  const ballRef = useRef();
  const scroll = useScroll();

  // Create a procedural soccer ball material
  const material = useMemo(() => {
    // Just a simple black and white standard material for now
    return new THREE.MeshStandardMaterial({ 
      color: '#ffffff',
      roughness: 0.4,
    });
  }, []);

  useFrame((state, delta) => {
    if (!ballRef.current) return;

    const runDistance = 120; // Match player run distance
    let currentZ = 0;
    let isRunning = false;
    let isKicked = false;
    
    // offset 0.1 - 0.8: Running
    // offset 0.8 - 0.9: Kicking to goal
    
    if (scroll.offset > 0.1 && scroll.offset <= 0.8) {
      const progress = (scroll.offset - 0.1) / 0.7;
      currentZ = progress * runDistance;
      isRunning = true;
    } else if (scroll.offset > 0.8) {
      currentZ = runDistance;
      isKicked = true;
    }

    // Target position for interpolation
    let targetX = 0;
    let targetY = 0.2; // Radius
    let targetZ = currentZ + 1.0; // Slightly ahead of player

    if (isRunning) {
      // Dribbling offset - ball moves side to side slightly
      const time = state.clock.getElapsedTime();
      targetX = Math.sin(time * 15) * 0.3;
      
      // Roll rotation
      ballRef.current.rotation.x += 15 * delta;
    }

    if (isKicked) {
      // The kick into the goal
      const kickProgress = Math.min((scroll.offset - 0.8) / 0.1, 1.0);
      
      // Arc trajectory
      targetZ = runDistance + 1.0 + (kickProgress * 15); // Move forward 15 units into goal
      
      // Height arc (parabola)
      const arcHeight = 4;
      targetY = 0.2 + Math.sin(kickProgress * Math.PI) * arcHeight;
      
      // Fast spin
      ballRef.current.rotation.x += 30 * delta;
    }

    // Smooth position update
    ballRef.current.position.x = THREE.MathUtils.lerp(ballRef.current.position.x, targetX, 0.1);
    ballRef.current.position.y = THREE.MathUtils.lerp(ballRef.current.position.y, targetY, 0.2);
    ballRef.current.position.z = THREE.MathUtils.lerp(ballRef.current.position.z, targetZ, 0.1);
  });

  return (
    <mesh ref={ballRef} position={[0, 0.2, 1.0]} castShadow>
      <icosahedronGeometry args={[0.2, 2]} />
      <primitive object={material} />
      
      {/* Dark patches for soccer ball look */}
      <mesh>
        <icosahedronGeometry args={[0.201, 1]} />
        <meshStandardMaterial color="#111" wireframe={true} />
      </mesh>
    </mesh>
  );
}
