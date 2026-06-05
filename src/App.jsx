import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll, Environment, Sky } from '@react-three/drei';
import Lenis from 'lenis';

// Import Components
import FootballField from './components/FootballField';
import Player from './components/Player';
import Football from './components/Football';
import StadiumLights from './components/StadiumLights';
import GoalPost from './components/GoalPost';
import Confetti from './components/Confetti';

import IntroOverlay from './components/IntroOverlay';
import AboutBillboard from './components/AboutBillboard';
import ProjectCards from './components/ProjectCards';
import GoalCelebration from './components/GoalCelebration';

// Camera Rig to follow the player
function CameraRig() {
  const scroll = useScroll();
  const runDistance = 120; // Match player's run distance

  useFrame((state) => {
    // Determine player's target Z based on scroll
    let playerZ = 0;
    if (scroll.offset > 0.1 && scroll.offset < 0.9) {
      const progress = (scroll.offset - 0.1) / 0.8;
      playerZ = progress * runDistance;
    } else if (scroll.offset >= 0.9) {
      playerZ = runDistance;
    }

    // Camera follows player but stays slightly behind and above
    // Add some dynamic lookAt based on scroll phase
    const targetCamX = 0;
    const targetCamY = 3;
    const targetCamZ = playerZ - 6; // Behind the player

    // Smoothly interpolate camera position
    state.camera.position.x = state.camera.position.x + (targetCamX - state.camera.position.x) * 0.05;
    state.camera.position.y = state.camera.position.y + (targetCamY - state.camera.position.y) * 0.05;
    state.camera.position.z = state.camera.position.z + (targetCamZ - state.camera.position.z) * 0.05;

    // Look at player (or goal at the very end)
    let lookTargetZ = playerZ;
    if (scroll.offset > 0.8) {
      // Look towards the goal
      lookTargetZ = 135; 
    }
    
    state.camera.lookAt(0, 1, lookTargetZ);
  });

  return null;
}

export default function App() {
  // Setup Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Canvas shadows camera={{ position: [0, 3, -6], fov: 60 }}>
        <color attach="background" args={['#0a110a']} />
        
        {/* Environment setup */}
        <fog attach="fog" args={['#0a110a', 10, 80]} />
        <Sky sunPosition={[0, 1, 0]} turbidity={0.1} rayleigh={0.5} inclination={0.6} distance={1000} />
        
        <Suspense fallback={null}>
          <ScrollControls pages={6} damping={0.1} distance={1.2}>
            
            {/* Camera Controller */}
            <CameraRig />

            {/* Lights */}
            <StadiumLights />

            {/* 3D Scene */}
            <FootballField />
            <Player position={[0, 0, 0]} />
            <Football />
            <GoalPost position={[0, 0, 135]} />
            <Confetti position={[0, 5, 135]} count={300} />

            {/* Billboards and 3D UI */}
            <AboutBillboard position={[-8, 0, 20]} />
            <ProjectCards />

            {/* HTML Overlays tied to scroll */}
            <Scroll html style={{ width: '100%', height: '100%' }}>
              <IntroOverlay />
              <GoalCelebration />
            </Scroll>

          </ScrollControls>
        </Suspense>
      </Canvas>
      
      {/* Loading Screen Overlay (Optional but good for 3D) */}
      {/* <Loader /> */}
    </>
  );
}
