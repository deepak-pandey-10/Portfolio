import { PresentationControls } from "@react-three/drei";
import GodModel from "./GodModel";
import Orbiter from "./Orbiter";

export default function CelestialEntity() {
  return (
    <PresentationControls
      global={false}
      snap={false}
      speed={1.5}
      polar={[-0.3, 0.3]}
      azimuth={[-Math.PI, Math.PI]}
    >
      <group>
        <GodModel />

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
  );
}