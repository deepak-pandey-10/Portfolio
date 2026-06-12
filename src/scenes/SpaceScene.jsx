import { Canvas } from "@react-three/fiber";
import { Stars, CameraControls } from "@react-three/drei";
import { useRef, useState } from "react";

import CameraBoundary from "./CameraBoundary";
import TempleRuins from "../components/TempleRuins";
import CelestialEntity from "../components/CelestialEntity";
import BlackHole from "../components/BlackHole";
import AboutPanel from "../components/AboutPanel";

export default function SpaceScene() {
  const cosmicSystemRef = useRef();
  const [showAbout, setShowAbout] = useState(false);

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

        <TempleRuins />

        <group ref={cosmicSystemRef}>
          <CelestialEntity
            cosmicSystemRef={cosmicSystemRef}
            onShowAbout={() => setShowAbout(true)}
          />
        </group>

        <BlackHole />

        <CameraControls
          minDistance={8}
          maxDistance={40}
        />
      </Canvas>

      {showAbout && (
        <AboutPanel onClose={() => setShowAbout(false)} />
      )}
    </div>
  );
}