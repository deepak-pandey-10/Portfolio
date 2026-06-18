import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import BlackHole from "./BlackHole";

export default function ProjectModelViewer() {
  return (
    <div className="relative w-full h-full min-h-75 md:min-h-100">
      <Canvas
        camera={{ position: [0, 10, -17], fov: 55 }}
        style={{ width: "100%", height: "100%" }}
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
          radius={80}
          depth={40}
          count={3000}
          factor={4}
          fade
        />

        <BlackHole
          position={[0, 0, 0]}
          scale={0.62}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />

        <EffectComposer>
          <Bloom
            intensity={0.2}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
