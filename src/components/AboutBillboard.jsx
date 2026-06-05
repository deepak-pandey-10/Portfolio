import { Html } from '@react-three/drei';

export default function AboutBillboard({ position }) {
  return (
    <group position={position}>
      {/* 3D Frame/Mount for the billboard */}
      <mesh position={[0, -2, -0.5]}>
        <boxGeometry args={[1, 4, 1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* HTML Content */}
      <Html 
        transform 
        occlude 
        position={[0, 0, 0]}
        rotation={[0, -Math.PI / 6, 0]} // Angled slightly towards the player
        distanceFactor={15} // Scales the HTML based on distance
      >
        <div className="glass-panel" style={{ 
          width: '500px', 
          padding: '2rem',
          color: 'white',
          border: '2px solid var(--accent)'
        }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '1rem' }}>
            ABOUT ME
          </h2>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.6, marginBottom: '1.5rem', opacity: 0.9 }}>
            I'm a passionate creative developer who loves turning complex problems into elegant, interactive web experiences. 
            Just like on the pitch, I value teamwork, strategy, and continuous improvement.
          </p>
          
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>SKILLS</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['React', 'Three.js', 'JavaScript', 'CSS/SCSS', 'Node.js', 'UI/UX Design'].map(skill => (
              <span key={skill} className="glass-pill">{skill}</span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}
