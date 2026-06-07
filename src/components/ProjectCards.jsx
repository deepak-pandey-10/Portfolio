import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';

function getPanelOpacity(scrollOffset, index) {
  const centers = [0.38, 0.56, 0.74];
  const distance = Math.abs(scrollOffset - centers[index]);

  if (distance < 0.07) return 1;
  if (distance > 0.1) return 0;

  return 1 - (distance - 0.07) / 0.03;
}

export default function ProjectCards() {
  const scroll = useScroll();
  const [opacities, setOpacities] = useState([0, 0, 0]);
  const [scrollOffset, setScrollOffset] = useState(0);
  const projects = [
    {
      id: 1,
      title: "Neon Dashboard",
      desc: "A futuristic data visualization dashboard with real-time analytics.",
      tech: "React, D3.js, Tailwind",
      z: -50, // Space coordinates
      x: 0
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      desc: "High-performance storefront with 3D product previews.",
      tech: "Next.js, Three.js, Stripe",
      z: -100, 
      x: 0
    },
    {
      id: 3,
      title: "AI Chat Interface",
      desc: "Sleek conversational UI for LLM interactions.",
      tech: "React, WebSocket, Framer Motion",
      z: -150, 
      x: 0
    }
  ];

  useFrame(() => {
    const nextOpacities = projects.map((_, index) => getPanelOpacity(scroll.offset, index));
    const hasChanged = nextOpacities.some((opacity, index) => Math.abs(opacity - opacities[index]) > 0.05);

    if (hasChanged) {
      setOpacities(nextOpacities);
    }

    if (Math.abs(scroll.offset - scrollOffset) > 0.005) {
      setScrollOffset(scroll.offset);
    }
  });

  return (
    <>
      {projects.map((proj, index) => (
        <div key={proj.id}>
          {opacities[index] > 0 && (
            <div
              className="fullscreen-overlay html-overlay px-4"
              style={{ transform: `translate3d(0, ${scrollOffset * 600}vh, 0)` }}
            >
              <div className="glass-panel flex w-[min(86vw,560px)] flex-col justify-center p-6 sm:p-10">
                <div className="absolute left-0 top-0 bg-space-accent px-2.5 py-1 text-[0.7rem] font-bold tracking-[2px] text-black">
                  DATABANK // ARCHIVE_{proj.id}
                </div>

                <h3 className="mb-4 mt-5 text-3xl text-space-accent sm:mt-4 sm:text-[2.5rem]">
                  {proj.title}
                </h3>
                <p className="mb-6 text-base leading-[1.6] text-space-secondary sm:mb-8 sm:text-[1.2rem]">
                  {proj.desc}
                </p>

                <div className="mt-auto border-t border-panel-border pt-6">
                  <strong className="text-base uppercase tracking-[2px] text-white">
                    System Architecture:
                  </strong>
                  <p className="mt-2 font-mono text-base text-space-accent sm:text-[1.1rem]">
                    &gt; {proj.tech}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
