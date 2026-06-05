import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BackgroundCanvas from './components/BackgroundCanvas';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import { ArrowUp } from 'lucide-react';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Visual background systems */}
      <BackgroundCanvas />
      <div className="bg-grid" />
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content layouts */}
      <main style={{ width: '100%' }}>
        <Hero />
        <About />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      {/* Sticky footer */}
      <footer style={{
        padding: '40px 24px',
        textAlign: 'center',
        borderTop: '1px solid var(--border-color)',
        zIndex: 5,
        position: 'relative',
        background: 'rgba(7, 9, 14, 0.9)',
        marginTop: '80px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }} className="footer-container">
          <span style={{
            fontFamily: 'var(--font-title)',
            fontWeight: '800',
            fontSize: '1.2rem',
            letterSpacing: '-1px'
          }}>
            DEEPAK<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
          
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Designed & Engineered by Deepak Pandey © 2026
          </span>
          
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <a href="#about" className="clickable" style={{ hover: 'color: var(--accent)' }}>Bio</a>
            <a href="#projects" className="clickable">Portfolio</a>
            <a href="#contact" className="clickable">Hire</a>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="clickable"
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            background: 'var(--accent)',
            color: '#000',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(var(--accent-rgb), 0.5)',
            zIndex: 1000,
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(var(--accent-rgb), 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(var(--accent-rgb), 0.5)';
          }}
        >
          <ArrowUp size={20} />
        </button>
      )}

      <style>{`
        @media (max-width: 600px) {
          .footer-container {
            flex-direction: column !important;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}

export default App;
