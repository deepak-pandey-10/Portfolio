import { useFrame, useThree } from "@react-three/fiber";

export default function CameraBoundary() {
  const { camera } = useThree();

  useFrame(() => {
    const STAR_RADIUS = 100;

    const distance = camera.position.length();

    if (distance > STAR_RADIUS) {
      camera.position.normalize().multiplyScalar(STAR_RADIUS);
    }
  });

  return null;
}