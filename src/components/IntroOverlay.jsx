import { useScroll } from '@react-three/drei';
import { useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function IntroOverlay() {
  const scroll = useScroll();
  const [opacity, setOpacity] = useState(1);

  useFrame(() => {
    // Fade out as scroll begins (0 to 0.1)
    const newOpacity = 1 - Math.min(scroll.offset / 0.1, 1);
    if (Math.abs(newOpacity - opacity) > 0.05) {
      setOpacity(newOpacity);
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <div 
      className="fullscreen-overlay html-overlay" 
      style={{ 
        opacity, 
        transition: 'opacity 0.1s',
        background: `linear-gradient(to bottom, rgba(10, 17, 10, 0.8), transparent)`
      }}
    >
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--accent)', marginBottom: '0.5rem', textShadow: '0 0 20px rgba(255,215,0,0.5)' }}>
          DEEPAK PANDEY
        </h1>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 500, letterSpacing: '0.1em', marginBottom: '2rem' }}>
          CREATIVE DEVELOPER • FOOTBALL ENTHUSIAST
        </h2>
        
        <div style={{ marginTop: '3rem' }} className="animate-bounce">
          <p style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}>
            Scroll to kick off
          </p>
          <div style={{ width: '2px', height: '40px', background: 'var(--accent)', margin: '1rem auto' }} />
        </div>
      </div>
    </div>
  );
}
