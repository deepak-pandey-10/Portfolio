import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function Confetti({ count = 200, position = [0, 5, 135] }) {
  const meshRef = useRef();
  const scroll = useScroll();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Generate random particle data
  const particles = useMemo(() => {
    const temp = [];
    const colors = ['#FFD700', '#ff4444', '#44ff44', '#4444ff', '#ffffff'];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 20,
        factor: Math.random() * 2 + 1,
        speed: Math.random() * 0.05 + 0.01,
        xRotSpeed: Math.random() * 0.1,
        yRotSpeed: Math.random() * 0.1,
        color: new THREE.Color(colors[Math.floor(Math.random() * colors.length)])
      });
    }
    return temp;
  }, [count]);

  const colorArray = useMemo(() => {
    const arr = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      p.color.toArray(arr, i * 3);
    });
    return arr;
  }, [particles, count]);

  useFrame(() => {
    if (!meshRef.current) return;

    // Only show and animate when we are near the goal
    if (scroll.offset < 0.85) {
      meshRef.current.visible = false;
      return;
    } else {
      meshRef.current.visible = true;
    }

    particles.forEach((particle, i) => {
      // Fall down
      particle.y -= particle.speed;
      // Reset if too low
      if (particle.y < -10) {
        particle.y = 10;
        particle.x = (Math.random() - 0.5) * 20;
        particle.z = (Math.random() - 0.5) * 20;
      }

      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.rotation.x += particle.xRotSpeed;
      dummy.rotation.y += particle.yRotSpeed;
      dummy.updateMatrix();
      
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={position}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <planeGeometry args={[0.2, 0.4]} />
        <meshBasicMaterial side={THREE.DoubleSide} vertexColors />
        <instancedBufferAttribute attach="instanceColor" args={[colorArray, 3]} />
      </instancedMesh>
    </group>
  );
}
