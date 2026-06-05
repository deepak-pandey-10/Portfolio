import { useScroll } from '@react-three/drei';
import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mail, Code, Briefcase, MessageCircle } from 'lucide-react';

export default function GoalCelebration() {
  const scroll = useScroll();
  const [opacity, setOpacity] = useState(0);

  useFrame(() => {
    // Fade in at the very end (0.9 to 1.0)
    let newOpacity = 0;
    if (scroll.offset > 0.9) {
      newOpacity = Math.min((scroll.offset - 0.9) / 0.1, 1);
    }
    
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
        background: `radial-gradient(circle at center, rgba(10, 17, 10, 0.4), rgba(10, 17, 10, 0.9))`
      }}
    >
      <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', maxWidth: '800px' }}>
        <h2 style={{ fontSize: '5rem', color: 'var(--accent)', marginBottom: '1rem', textShadow: '0 0 30px rgba(255,215,0,0.8)' }}>
          GOAL!
        </h2>
        <h3 style={{ fontSize: '2rem', marginBottom: '3rem' }}>
          Let's build something amazing together.
        </h3>
        
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <a href="#" style={{ color: 'white' }}><Code size={40} /></a>
          <a href="#" style={{ color: 'white' }}><Briefcase size={40} /></a>
          <a href="#" style={{ color: 'white' }}><MessageCircle size={40} /></a>
          <a href="#" style={{ color: 'white' }}><Mail size={40} /></a>
        </div>

        <button style={{
          padding: '1rem 3rem',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          background: 'var(--accent)',
          color: 'black',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          boxShadow: '0 0 20px rgba(255,215,0,0.5)'
        }}>
          Contact Me
        </button>
      </div>
    </div>
  );
}
