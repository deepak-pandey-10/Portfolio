import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll } from '@react-three/drei';
import * as THREE from 'three';

// Import Space Components
import Starfield from './components/Starfield';
import Planet from './components/Planet';
import AsteroidField from './components/AsteroidField';
import Wormhole from './components/Wormhole';

// Import Overlays
import IntroOverlay from './components/IntroOverlay';
import AboutBillboard from './components/AboutBillboard';
import ProjectCards from './components/ProjectCards';
import ContactPortal from './components/ContactPortal';

// Spaceship Camera Rig
function CameraRig() {
  const scroll = useScroll();
  const journeyDistance = -200; // Fly forward into -Z space

  useFrame((state) => {
    // 0 to 1 scroll maps to 0 to journeyDistance
    const targetZ = scroll.offset * journeyDistance;
    
    // Slight banking/swaying effect
    const time = state.clock.getElapsedTime();
    const swayX = Math.sin(time * 0.5) * 2;
    const swayY = Math.cos(time * 0.3) * 1;
    
    // Add intentional banking on X axis based on scroll position
    let bankX = 0;
    if (scroll.offset > 0.2 && scroll.offset < 0.5) bankX = 5; // Look at planet
    if (scroll.offset > 0.5 && scroll.offset < 0.8) bankX = -2; // Navigate asteroids

    // Smoothly interpolate camera position
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, swayX + bankX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, swayY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ + 10, 0.05); // +10 to be slightly ahead of the actual Z mark

    // Always look forward down the Z axis, but slightly offset
    state.camera.lookAt(swayX * 0.5, swayY * 0.5, targetZ - 100);
  });

  return null;
}

export default function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <color attach="background" args={['#050510']} />
        
        {/* Deep space fog */}
        <fog attach="fog" args={['#050510', 20, 100]} />
        
        {/* Basic lighting */}
        <ambientLight intensity={0.2} color="#bd00ff" />
        <directionalLight position={[10, 20, 10]} intensity={1} color="#00f2fe" />
        
        <Suspense fallback={null}>
          <ScrollControls pages={7} damping={0.1} distance={1.2}>
            
            <CameraRig />

            {/* Background */}
            <Starfield />

            {/* Scene 1: The First Planet */}
            <Planet position={[25, -8, -55]} scale={7} color="#00f2fe" hasRings={true} />

            {/* Scene 2: The Asteroid Belt */}
            <AsteroidField position={[0, 0, -100]} count={400} radius={30} />

            {/* Scene 3: The Wormhole */}
            <Wormhole position={[0, 0, -210]} />

            {/* HTML Overlays tied to scroll */}
            <Scroll html style={{ width: '100%', height: '100%' }}>
              <IntroOverlay />
              <AboutBillboard />
              <ProjectCards />
              <ContactPortal />
            </Scroll>

          </ScrollControls>
        </Suspense>
      </Canvas>
    </>
  );
}
