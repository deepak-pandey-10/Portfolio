import { useEffect, useState } from 'react';
import { ArrowRight, Code2, Cpu, Sparkles } from 'lucide-react';

const roles = [
  'Front-End Architect',
  'Interactive Designer',
  'Full Stack Developer',
  'Creative Engineer'
];

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 1500;

  useEffect(() => {
    let timer;
    const currentRole = roles[roleIndex];

    if (!isDeleting && typedText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && typedText === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 200);
    } else if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentRole.substring(0, typedText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentRole.substring(0, typedText.length + 1));
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '40px',
      position: 'relative'
    }}>
      {/* Left Column: Text Content */}
      <div className="hero-content" style={{ flex: '1', zIndex: 10, maxWidth: '650px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          marginBottom: '24px'
        }}>
          <Sparkles size={14} className="gradient-text" style={{ stroke: 'var(--accent)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>
            AVAILABLE FOR PROJECTS
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          lineHeight: '1.05',
          marginBottom: '20px',
          textAlign: 'left'
        }}>
          Crafting Digital<br />
          <span className="gradient-text" style={{ paddingBottom: '10px' }}>Experiences.</span>
        </h1>

        <h2 style={{
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
          fontWeight: '500',
          color: 'var(--text-primary)',
          textAlign: 'left',
          marginBottom: '20px',
          minHeight: '40px',
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'var(--font-sans)'
        }}>
          I am a&nbsp;
          <span style={{
            color: 'var(--accent)',
            borderRight: '2px solid var(--accent)',
            paddingRight: '4px',
            animation: 'blink 0.75s step-end infinite',
            fontWeight: '700'
          }}>
            {typedText}
          </span>
        </h2>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          textAlign: 'left',
          marginBottom: '36px',
          maxWidth: '520px'
        }}>
          Hi, I'm Deepak Pandey. I specialize in building highly interactive, pixel-perfect, and visually striking web applications that merge cutting-edge technology with aesthetic design.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button onClick={() => scrollToSection('projects')} className="glow-btn clickable">
            View My Work <ArrowRight size={18} />
          </button>
          <button onClick={() => scrollToSection('contact')} className="secondary-btn clickable">
            Get In Touch
          </button>
        </div>
      </div>

      {/* Right Column: Visual Component (Interactive Glowing Cube/Sphere) */}
      <div className="hero-visual-wrapper" style={{
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        minWidth: '300px'
      }}>
        <div className="visual-orb" style={{
          position: 'relative',
          width: '320px',
          height: '320px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Outer glowing ring */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: '2px dashed var(--accent)',
            borderRadius: '50%',
            opacity: '0.2',
            animation: 'rotate-slow 20s linear infinite'
          }} />

          {/* Core CSS Glowing Sphere */}
          <div style={{
            position: 'absolute',
            width: '80%',
            height: '80%',
            background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(30px)',
            animation: 'pulse-glow 4s ease-in-out infinite'
          }} />

          {/* Interactive Geometric Shapes */}
          <div className="cube-3d" style={{
            width: '120px',
            height: '120px',
            position: 'relative',
            transformStyle: 'preserve-3d',
            animation: 'float 6s ease-in-out infinite'
          }}>
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: '2px solid var(--accent)',
              boxShadow: '0 0 15px var(--accent-glow)',
              borderRadius: '24px',
              background: 'rgba(13, 17, 28, 0.4)',
              backdropFilter: 'blur(5px)',
              transform: 'rotateX(45deg) rotateY(45deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Code2 size={40} style={{ color: 'var(--accent)' }} />
            </div>

            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: '2px solid var(--accent-secondary)',
              borderRadius: '24px',
              transform: 'rotateX(45deg) rotateY(45deg) translateZ(-30px) scale(0.85)',
              opacity: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Cpu size={24} style={{ color: 'var(--accent-secondary)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation Overrides */}
      <style>{`
        @keyframes blink {
          from, to { border-color: transparent }
          50% { border-color: var(--accent); }
        }
        @media (max-width: 900px) {
          .hero-section {
            flex-direction: column !important;
            padding-top: 140px !important;
            text-align: center;
            gap: 20px !important;
          }
          .hero-content {
            max-width: 100% !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-content h1, .hero-content h2, .hero-content p {
            text-align: center !important;
          }
          .hero-visual-wrapper {
            margin-top: 20px;
          }
        }
      `}</style>
    </section>
  );
}
