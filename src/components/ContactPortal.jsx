import { useScroll } from '@react-three/drei';
import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mail, Code, Briefcase, MessageCircle } from 'lucide-react';

export default function ContactPortal() {
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
        transition: 'opacity 0.1s'
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(189_0_255_/_10%),rgb(5_5_16_/_90%))]" />
      <div className="glass-panel max-w-[800px] px-8 py-16 text-center backdrop-blur-2xl sm:px-16">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap bg-space-accent px-5 py-1 text-[0.8rem] font-bold tracking-[4px] text-black">
          DESTINATION REACHED
        </div>

        <h2 className="mb-4 mt-8 text-4xl text-space-primary drop-shadow-[0_0_30px_rgb(189_0_255_/_80%)] sm:text-[4rem]">
          TRANSMISSION ESTABLISHED
        </h2>
        
        <h3 className="mb-16 text-[1.5rem] font-normal tracking-[2px] text-space-secondary">
          Let's build the future together.
        </h3>
        
        <div className="mb-16 flex justify-center gap-8 text-space-accent sm:gap-12">
          <a href="#" className="transition-transform hover:scale-110"><Code size={36} /></a>
          <a href="#" className="transition-transform hover:scale-110"><Briefcase size={36} /></a>
          <a href="#" className="transition-transform hover:scale-110"><MessageCircle size={36} /></a>
          <a href="#" className="transition-transform hover:scale-110"><Mail size={36} /></a>
        </div>

        <button className="cursor-pointer rounded border-2 border-space-accent bg-transparent px-10 py-5 text-[1.2rem] font-bold uppercase tracking-[4px] text-space-accent shadow-[inset_0_0_20px_rgb(0_242_254_/_20%),0_0_20px_rgb(0_242_254_/_20%)] transition-all hover:bg-space-accent/10 sm:px-16">
          Send Signal
        </button>
      </div>
    </div>
  );
}
