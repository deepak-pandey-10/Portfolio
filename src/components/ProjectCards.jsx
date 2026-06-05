import { Html } from '@react-three/drei';

export default function ProjectCards() {
  const projects = [
    {
      id: 1,
      title: "Neon Dashboard",
      desc: "A futuristic data visualization dashboard with real-time analytics.",
      tech: "React, D3.js, Tailwind",
      z: 40, // Distance down the pitch
      x: -12 // Left side
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      desc: "High-performance storefront with 3D product previews.",
      tech: "Next.js, Three.js, Stripe",
      z: 70, // Further down
      x: 12 // Right side
    },
    {
      id: 3,
      title: "AI Chat Interface",
      desc: "Sleek conversational UI for LLM interactions.",
      tech: "React, WebSocket, Framer Motion",
      z: 100, // Even further
      x: -12 // Left side
    }
  ];

  return (
    <group>
      {projects.map((proj, i) => (
        <group key={proj.id} position={[proj.x, 0, proj.z]}>
          {/* Post structure */}
          <mesh position={[0, 4, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 8]} />
            <meshStandardMaterial color="#444" />
          </mesh>

          {/* Jumbotron Screen */}
          <mesh position={[0, 8, 0]} rotation={[0, proj.x > 0 ? -Math.PI / 8 : Math.PI / 8, 0]}>
            <boxGeometry args={[16, 9, 0.5]} />
            <meshStandardMaterial color="#111" />
          </mesh>

          {/* Screen Content */}
          <Html 
            transform 
            occlude 
            position={[0, 8, proj.x > 0 ? -0.26 : 0.26]} 
            rotation={[0, proj.x > 0 ? Math.PI - Math.PI / 8 : Math.PI / 8, 0]}
            distanceFactor={18}
          >
            <div className="glass-panel" style={{ 
              width: '800px', 
              height: '450px',
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              border: '4px solid var(--accent)'
            }}>
              <h3 style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '1rem' }}>{proj.title}</h3>
              <p style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9 }}>{proj.desc}</p>
              <div style={{ marginTop: 'auto' }}>
                <strong style={{ fontSize: '1.2rem', textTransform: 'uppercase' }}>Tech Stack:</strong>
                <p style={{ fontSize: '1.2rem', marginTop: '0.5rem', color: '#a0a0a0' }}>{proj.tech}</p>
              </div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
