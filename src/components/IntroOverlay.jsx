import { useScroll } from '@react-three/drei';
import { useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function IntroOverlay() {
  const scroll = useScroll();
  const [opacity, setOpacity] = useState(1);

  useFrame(() => {
    // Fade out quickly as scroll begins
    const newOpacity = 1 - Math.min(scroll.offset / 0.05, 1);
    if (Math.abs(newOpacity - opacity) > 0.05) {
      setOpacity(newOpacity);
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <div 
      className="fullscreen-overlay html-overlay" 
      style={{ opacity, transition: 'opacity 0.1s' }}
    >
      <div className="pointer-events-none max-w-[800px] px-6 text-center">
        <div className="mb-4 font-mono text-[0.8rem] tracking-[5px] text-space-accent">
          SYSTEM ONLINE // V_1.0.0
        </div>
        
        <h1 className="mb-2 text-5xl text-space-primary drop-shadow-[0_0_30px_rgb(0_242_254_/_60%)] sm:text-[5rem]">
          DEEPAK PANDEY
        </h1>
        
        <h2 className="mb-16 text-[1.2rem] font-normal tracking-[0.2em] text-space-secondary">
          CREATIVE DEVELOPER • DIGITAL EXPLORER
        </h2>
        
        <div className="mt-20 animate-pulse-glow">
          <p className="font-mono text-[0.9rem] uppercase tracking-[3px] text-space-accent">
            [ INITIATE THRUSTERS - SCROLL DOWN ]
          </p>
          <div className="mx-auto my-8 h-[60px] w-px bg-gradient-to-b from-space-accent to-transparent" />
        </div>
      </div>
    </div>
  );
}
