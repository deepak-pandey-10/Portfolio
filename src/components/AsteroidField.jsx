import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function seededRandom(seed) {
  let value = seed;

  return () => {
    value += 0x6D2B79F5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

export default function AsteroidField({ count = 300, position = [0, 0, 0], radius = 40 }) {
  const meshRef = useRef();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const asteroids = useMemo(() => {
    const temp = [];
    const random = seededRandom(count * 1000 + radius);

    for (let i = 0; i < count; i++) {
      // Create a cylindrical field along the Z axis
      const theta = random() * Math.PI * 2;
      const r = radius + (random() - 0.5) * 20; // Spread width
      const z = (random() - 0.5) * 100; // Spread length along Z

      temp.push({
        position: new THREE.Vector3(r * Math.cos(theta), (random() - 0.5) * 20, z),
        rotation: new THREE.Euler(random() * Math.PI, random() * Math.PI, random() * Math.PI),
        scale: random() * 2 + 0.5,
        rotSpeed: new THREE.Vector3((random() - 0.5) * 0.02, (random() - 0.5) * 0.02, (random() - 0.5) * 0.02)
      });
    }
    return temp;
  }, [count, radius]);

  useFrame(() => {
    if (!meshRef.current) return;

    asteroids.forEach((asteroid, i) => {
      asteroid.rotation.x += asteroid.rotSpeed.x;
      asteroid.rotation.y += asteroid.rotSpeed.y;
      asteroid.rotation.z += asteroid.rotSpeed.z;

      dummy.position.copy(asteroid.position);
      dummy.rotation.copy(asteroid.rotation);
      dummy.scale.setScalar(asteroid.scale);
      dummy.updateMatrix();
      
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={position}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <dodecahedronGeometry args={[1, 0]} /> {/* Low poly rock look */}
        <meshStandardMaterial 
          color="#333344" 
          roughness={0.9} 
          metalness={0.2} 
        />
      </instancedMesh>
    </group>
  );
}
