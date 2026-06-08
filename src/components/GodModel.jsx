import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function GodModel() {
  const { scene } = useGLTF(
    "/src/components/celestial_fallen_angel_warrior.glb"
  );

  useEffect(() => {
    scene.traverse((child) => {
      if (child.name.includes("Wings")) {
        child.material.color.set("#7c3aed");
      }
      
      if (child.name.includes("Eyes")) {
        child.material.color.set("#ffffff");
        child.material.emissive.set("#00ffff");
        child.material.emissiveIntensity = 5;
      }
      
      if (child.name.includes("Armor")) {
        child.material.color.set("#1e40af");
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      position={[-12, 0, -5]} 
      scale={3}
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}