import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, useGLTF } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils.js";

function Model() {
  const { scene } = useGLTF(
    "/src/components/celestial_fallen_angel_warrior.glb"
  );

  const clonedScene = useMemo(() => {
    const clone = SkeletonUtils.clone(scene);
    clone.traverse((child) => {
      if (!child.isMesh) return;

      if (child.material) {
        child.material = child.material.clone();
      }

      if (child.name.includes("Wings")) {
        child.material.color.set("#fbbf24");
        child.material.emissive.set("#d97706");
        child.material.emissiveIntensity = 1.5;
      }

      if (child.name.includes("Eyes")) {
        child.material.color.set("#ffffff");
        child.material.emissive.set("#fbbf24");
        child.material.emissiveIntensity = 6;
      }

      if (child.name.includes("Armor")) {
        child.material.color.set("#d97706");
        child.material.metalness = 0.9;
        child.material.roughness = 0.15;
      }
    });
    return clone;
  }, [scene]);

  return (
    <Center>
      <primitive
        object={clonedScene}
        scale={2.2}
        rotation={[0.1, -Math.PI / 4, 0]}
      />
    </Center>
  );
}

export default function AboutModelViewer() {
  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-[400px]">
      <Suspense
        fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400">
            <div className="w-10 h-10 border-4 border-t-violet-500 border-zinc-700 rounded-full animate-spin mb-4"></div>
            <span className="text-xs tracking-wider uppercase font-semibold text-violet-400">
              Loading Cosmic Entity...
            </span>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 1.2, 7], fov: 45 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={1.8} />
          {/* Main key light */}
          <pointLight position={[10, 10, 10]} intensity={30} />
          {/* Gold fill light */}
          <pointLight position={[-10, 5, 5]} intensity={20} color="#eab308" />
          {/* Golden backlight for the wings glow */}
          <directionalLight
            position={[0, 5, -10]}
            intensity={25}
            color="#fbbf24"
          />

          <Suspense fallback={null}>
            <Model />
          </Suspense>

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={1.0}
            minDistance={4}
            maxDistance={12}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
