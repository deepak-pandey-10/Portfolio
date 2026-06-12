import { PresentationControls } from "@react-three/drei";

import GodModel from "./GodModel";
import Orbiter from "./Orbiter";

export default function CelestialEntity({ onShowAbout }) {
  return (
    <group position={[0, 0, 0]}>
      <PresentationControls
        global={false}
        snap={false}
        speed={2}
        damping={0.2}
        polar={[-0.25, 0.25]}
        azimuth={[-Math.PI, Math.PI]}
      >
        <group>
          <GodModel
            onClick={(e) => {
              e.stopPropagation();
              onShowAbout();
            }}
          />

          {Array.from({ length: 10 }).map((_, i) => (
            <Orbiter
              key={i}
              radius={6}
              speed={0.3}
              offset={(Math.PI * 2 * i) / 10}
            />
          ))}
        </group>
      </PresentationControls>
    </group>
  );
}