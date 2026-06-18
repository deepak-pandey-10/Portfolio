import { Canvas } from "@react-three/fiber";
import { Stars, CameraControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import CameraBoundary from "./CameraBoundary";
import TempleRuins from "../components/TempleRuins";
import CelestialEntity from "../components/CelestialEntity";
import BlackHole from "../components/BlackHole";
import AboutPanel from "../components/AboutPanel";
import JourneyPanel from "../components/JourneyPanel";
import ProjectsPanel from "../components/ProjectsPanel";

export default function SpaceScene() {
  const cosmicSystemRef = useRef();
  const [showAbout, setShowAbout] = useState(false);
  const [showJourney, setShowJourney] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <Canvas
        camera={{
          position: [4, 5, 15],
          fov: 75,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <color attach="background" args={["black"]} />

        <ambientLight intensity={1.5} />

        <pointLight position={[10, 10, 10]} intensity={30} />

        <pointLight
          position={[-10, -10, -10]}
          intensity={15}
          color="#7c3aed"
        />

        <Stars
          radius={150}
          depth={80}
          count={12000}
          factor={5}
          fade
        />

        <CameraBoundary />

        <TempleRuins onShowJourney={() => setShowJourney(true)} />

        <group ref={cosmicSystemRef}>
          <CelestialEntity
            cosmicSystemRef={cosmicSystemRef}
            onShowAbout={() => setShowAbout(true)}
          />
        </group>

        <BlackHole
          onClick={() => setShowProjects(true)}
        />


        <CameraControls
          minDistance={8}
          maxDistance={40}
        />

        <EffectComposer>
          <Bloom
            intensity={0.2}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>

      {showAbout && (
        <AboutPanel onClose={() => setShowAbout(false)} />
      )}

      {showJourney && (
        <JourneyPanel onClose={() => setShowJourney(false)} />
      )}
      {showProjects && (
      <ProjectsPanel
          onClose={() => setShowProjects(false)}
        />
      )}
    </div>
  );
}