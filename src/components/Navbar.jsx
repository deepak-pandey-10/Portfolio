import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'timeline' },
  { label: 'Contact', id: 'contact' }
];

const themes = [
  { name: 'cyan', color: '#00f2fe' },
  { name: 'purple', color: '#bd00ff' },
  { name: 'emerald', color: '#00f5a0' },
  { name: 'orange', color: '#ff6a00' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [activeTheme, setActiveTheme] = useState('cyan'); // cyan, purple, emerald, orange

  const handleThemeChange = (themeName) => {
    setActiveTheme(themeName);
    if (themeName === 'cyan') {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', themeName);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky navbar background
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check current visible section for indicator updates
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <nav className={`nav-container ${scrolled ? 'scrolled-active' : ''}`} style={{
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)' : 'none',
        background: scrolled ? 'rgba(7, 9, 14, 0.85)' : 'rgba(7, 9, 14, 0.5)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.04)'
      }}>
        <div className="logo-text clickable" onClick={() => scrollTo('hero')}>
          DEEPAK<span className="logo-dot">.</span>
        </div>

        {/* Desktop Nav Items */}
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link clickable ${activeSection === item.id ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {item.label}
            </button>
          ))}
          
          {/* Accent Customizer */}
          <div className="theme-selector">
            {themes.map((t) => (
              <span
                key={t.name}
                className={`color-dot clickable ${activeTheme === t.name ? 'active' : ''}`}
                style={{ backgroundColor: t.color }}
                onClick={() => handleThemeChange(t.name)}
                title={`Switch accent to ${t.name}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="mobile-menu-btn clickable" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Links Overlay */}
        {isOpen && (
          <div className="nav-links open">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link clickable ${activeSection === item.id ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', padding: '8px 0' }}
              >
                {item.label}
              </button>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Accent Theme</span>
              <div className="theme-selector" style={{ border: 'none', paddingLeft: 0 }}>
                {themes.map((t) => (
                  <span
                    key={t.name}
                    className={`color-dot clickable ${activeTheme === t.name ? 'active' : ''}`}
                    style={{ backgroundColor: t.color }}
                    onClick={() => handleThemeChange(t.name)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
