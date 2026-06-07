import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';

export default function AboutBillboard() {
  const scroll = useScroll();
  const [opacity, setOpacity] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  useFrame(() => {
    const isVisible = scroll.offset > 0.04 && scroll.offset < 0.28;
    const nextOpacity = isVisible ? 1 : 0;

    if (nextOpacity !== opacity) {
      setOpacity(nextOpacity);
    }

    if (Math.abs(scroll.offset - scrollOffset) > 0.005) {
      setScrollOffset(scroll.offset);
    }
  });

  if (!opacity) {
    return null;
  }

  return (
    <div
      className="fullscreen-overlay html-overlay px-4"
      style={{ transform: `translate3d(0, ${scrollOffset * 600}vh, 0)` }}
    >
      <div className="glass-panel w-[min(86vw,520px)] p-6 text-white sm:p-10">
        <div className="absolute left-0 top-0 bg-space-accent px-2.5 py-1 text-[0.7rem] font-bold tracking-[2px] text-black">
          DATABANK // ABOUT
        </div>

        <h2 className="mb-5 mt-5 text-3xl text-space-accent drop-shadow-[0_0_10px_rgb(0_242_254_/_50%)] sm:mb-6 sm:mt-4 sm:text-[2.5rem]">
          THE JOURNEY
        </h2>

        <p className="mb-6 text-base leading-[1.65] text-space-secondary sm:mb-8 sm:text-[1.1rem]">
          I am a creative developer navigating the digital universe. My mission is to engineer immersive,
          high-performance web experiences that push the boundaries of what's possible in the browser.
          From intricate 3D worlds to sleek, functional dashboards, I build the future.
        </p>

        <h3 className="mb-4 text-base tracking-[2px] text-space-accent sm:text-[1.2rem]">
          CORE SYSTEMS
        </h3>

        <div className="flex flex-wrap gap-2">
          {['React', 'Three.js / WebGL', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind'].map(skill => (
            <span key={skill} className="glass-pill">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
