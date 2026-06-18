/* eslint-disable react-hooks/immutability */
import { Billboard } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";


// Custom particle system that orbits the black hole on a disk using Kepler's laws
function OrbitalDust({
  count = 250,
  innerRadius = 2.0,
  outerRadius = 9.0,
  animate = true,
}) {
  const pointsRef = useRef();

  const [positions, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const phs = new Float32Array(count);

    // Deterministic pseudo-random number generator to satisfy react-hooks/purity
    let seed = 42.0;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
      const r = innerRadius + random() * (outerRadius - innerRadius);
      const theta = random() * Math.PI * 2;
      // Make particles flatter as they get farther from the center
      const heightScale = 0.5 * (1.0 - (r - innerRadius) / (outerRadius - innerRadius));
      const y = (random() - 0.5) * heightScale;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Keplerian speed: v proportional to 1/sqrt(r)
      spd[i] = 0.4 + 1.2 * Math.sqrt(1.0 / r);
      phs[i] = theta;
    }

    return [pos, spd, phs];
  }, [count, innerRadius, outerRadius]);

  useFrame((state) => {
    if (!animate) return;
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positionAttribute = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      // Calculate current angle based on time and individual orbital speed
      const angle = phases[i] - time * speeds[i] * 0.4;
      const x = positionAttribute.getX(i);
      const z = positionAttribute.getZ(i);
      const r = Math.sqrt(x * x + z * z);

      positionAttribute.setX(i, Math.cos(angle) * r);
      positionAttribute.setZ(i, Math.sin(angle) * r);
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffa366" // Warm ember color
        size={0.003}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function BlackHole({
  onClick,
  animate = true,
  position = [20, -10, -10],
  scale = 0.6,
}) {
  const groupRef = useRef();

  // Custom shader for the accretion disk meshes
  const diskMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        void main() {
          vPosition = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vPosition;
        varying vec2 vUv;

        // Description : Array and textureless GLSL 2D/3D/4D simplex noise functions.
        // Author : Ian McEwan, Ashima Arts.
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

        float snoise(vec3 v){
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);

          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);

          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - D.yyy;

          i = mod(i, 289.0);
          vec4 p = permute(permute(permute(
                     i.z + vec4(0.0, i1.z, i2.z, 1.0))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0));

          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;

          vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);

          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);

          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);

          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));

          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);

          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;

          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1),
                                        dot(p2,x2), dot(p3,x3)));
        }

        void main() {
          // Distance from black hole singularity in local space coordinates
          float r = length(vPosition.xy);
          
          // Polar angle in the orbital plane
          float theta = atan(vPosition.y, vPosition.x);
          
          // Relativistic rotation speed (faster at smaller radius)
          float speed = 2.2;
          float angle = theta - uTime * (speed / (r + 0.3));
          
          // Generate moving noise coords
          vec3 noiseCoord = vec3(cos(angle) * r * 1.6, sin(angle) * r * 1.6, uTime * 0.3);
          
          // Compute fractional Brownian motion noise
          float noiseVal = snoise(noiseCoord) * 0.5 + 0.5;
          noiseVal += snoise(noiseCoord * 2.5) * 0.25;
          noiseVal += snoise(noiseCoord * 5.0) * 0.125;
          noiseVal = clamp(noiseVal, 0.0, 1.0);
          
          // Procedural ring boundaries
          float innerR = 1.0;
          float outerR = 9.0;
          
          // Edge feathering masks
          float mask = smoothstep(innerR, innerR + 0.5, r) * (1.0 - smoothstep(outerR - 2.5, outerR, r));
          
          // Doppler beaming: gas orbiting towards the camera is brightened, receding gas is dimmed
          float doppler = 1.0 + 0.65 * sin(theta);
          
          // Gas color profile mapping (hot central accretion to cooled outer rim)
          float t = clamp((r - innerR) / (outerR - innerR), 0.0, 1.0);
          vec3 hotColor = vec3(2.5, 2.1, 1.6);    // Glowing white-hot center
          vec3 midColor = vec3(1.8, 0.7, 0.08);   // Luminous golden orange
          vec3 coldColor = vec3(0.5, 0.015, 0.0);  // Deep fading amber-red
          
          vec3 diskColor = vec3(0.0);
          if (t < 0.2) {
            diskColor = mix(hotColor, midColor, t / 0.2);
          } else if (t < 0.6) {
            diskColor = mix(midColor, coldColor, (t - 0.2) / 0.4);
          } else {
            diskColor = mix(coldColor, vec3(0.0), (t - 0.6) / 0.4);
          }
          
          // Combine components
          float alpha = mask * (0.15 + 0.85 * noiseVal);
          vec3 finalColor = diskColor * (0.3 + 0.7 * noiseVal) * doppler * 2.2; // Toned down from 3.2
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // No GLB traversal needed, using procedural meshes

  useFrame((state) => {
    if (!animate) return;

    const elapsed = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Slow rotation for the entire black hole group
      groupRef.current.rotation.y += 0.0035;

      // Update the uTime uniform on the shared shader material
      diskMaterial.uniforms.uTime.value = elapsed;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      onClick={onClick}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      {/* Horizontal Accretion Disk */}
      <mesh material={diskMaterial} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 8.5, 128, 16]} />
      </mesh>

      {/* Vertical Lensing Ring (Always faces camera to simulate 3D bent light) */}
      <Billboard>
        <mesh material={diskMaterial}>
          <ringGeometry args={[1.2, 5.0, 128, 16]} />
        </mesh>
      </Billboard>

      {/* Explicit Event Horizon (pure black sphere) */}
      {/* Placed after the disks so it renders on top if needed, but since it has depthWrite=true, it will physically block anything behind it. */}
      <mesh scale={1.15}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Volumetric Corona Glow (rendered only on the backside to keep center black) */}
      <mesh scale={1.3}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            void main() {
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              vNormal = normalize(normalMatrix * normal);
              vViewPosition = -mvPosition.xyz;
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            varying vec3 vViewPosition;
            void main() {
              vec3 normal = normalize(vNormal);
              vec3 viewDir = normalize(vViewPosition);
              // Fresnel halo intensity
              float intensity = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);
              vec3 glowColor = vec3(1.4, 0.45, 0.05); // Hot orange glow
              gl_FragColor = vec4(glowColor * intensity * 1.5, intensity * 0.5);
            }
          `}
          transparent
          side={THREE.BackSide} // Render backside only to avoid covering the event horizon
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Orbiting space dust particles */}
      <OrbitalDust
        animate={animate}
        count={350}
        innerRadius={2.4}
        outerRadius={11.0}
      />
    </group>
  );
}
