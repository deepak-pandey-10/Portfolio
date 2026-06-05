import { useState } from 'react';
import { ExternalLink, X, Eye } from 'lucide-react';

const Github = ({ size = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsData = [
    {
      id: 1,
      title: 'Aetheria - Creative Sound & Visual Portal',
      category: 'creative',
      shortDesc: 'An interactive canvas-based application combining real-time visual frequencies with generative audio synthesizer loops.',
      longDesc: 'Aetheria is an experimental project designed to push the boundaries of browser audio/visual processing. It leverages Web Audio APIs to synthesize ambient tones dynamically based on user coordinate inputs, while drawing reactive particle patterns to a 2D canvas running at 60 FPS. Featuring a retro-futuristic dark neon aesthetic.',
      tech: ['React', 'Web Audio API', 'HTML5 Canvas', 'Vanilla CSS'],
      image: project1,
      liveLink: '#',
      githubLink: '#',
      features: [
        'Generative synth oscillators responding to cursor coordinates.',
        'Particle systems tracking frequency amplitude.',
        'Theme matching custom CSS rendering engines.',
        'Zero-dependency high performance rendering loops.'
      ]
    },
    {
      id: 2,
      title: 'Omni SaaS Business Analytics Suite',
      category: 'webapp',
      shortDesc: 'A premium Next-generation enterprise operations hub with complex charts and interactive server log trackers.',
      longDesc: 'Omni is a high-performance business cockpit offering mock live streams of server indicators, billing metrics, and transaction ledgers. Built with modular component states, optimized layouts, and vibrant custom charts designed with HSL gradients.',
      tech: ['React', 'Chart.js', 'Redux', 'MockSockets'],
      image: project2,
      liveLink: '#',
      githubLink: '#',
      features: [
        'Real-time streaming charts representing request loads.',
        'Dynamic timeline tables featuring system operations tracking.',
        'Interactive filtering tabs and customizable table search.',
        'Fully glassmorphic widgets responding to theme accent controls.'
      ]
    },
    {
      id: 3,
      title: 'Synapse - AI Agent Conversational UI',
      category: 'webapp',
      shortDesc: 'A high-fidelity dark mode chat workspace featuring animated messaging bubbles and dynamic context indicators.',
      longDesc: 'Synapse offers a state-of-the-art interface tailored for AI workflows. The layout features collapsible menus, quick prompt cards, glowing status alerts, and micro-animations that represent processing states and incoming stream packets.',
      tech: ['React', 'CSS Variables', 'Lucide Icons', 'HTML5'],
      image: project3,
      liveLink: '#',
      githubLink: '#',
      features: [
        'Interactive mock stream chat messaging.',
        'Subtle glow trails representing network node activity.',
        'Multi-column collapsing navigations for desktop & mobile.',
        'Custom interactive accent picker integration.'
      ]
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects">
      <div className="section-header">
        <span className="section-tag">MY CREATIONS</span>
        <h2 className="section-title">Selected Works</h2>
        <p className="section-desc">
          A showcase of projects blending design precision, complex logic, and interactive mechanics.
        </p>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'webapp', label: 'Web Apps' },
          { id: 'creative', label: 'Creative UX' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className="clickable"
            style={{
              background: filter === tab.id ? 'var(--accent)' : 'rgba(255,255,255,0.02)',
              color: filter === tab.id ? '#000' : 'var(--text-secondary)',
              border: '1px solid',
              borderColor: filter === tab.id ? 'var(--accent)' : 'var(--border-color)',
              padding: '10px 22px',
              borderRadius: '30px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '30px'
      }}>
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="glass project-card"
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              position: 'relative'
            }}
          >
            {/* Image Container with Hover Overlay */}
            <div className="image-container" style={{
              width: '100%',
              height: '220px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img 
                src={project.image} 
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                className="project-image"
              />
              <div className="project-overlay" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(7, 9, 14, 0.8)',
                opacity: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transition: 'opacity 0.3s ease'
              }}>
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="glow-btn clickable"
                  style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                >
                  <Eye size={16} /> Details
                </button>
              </div>
            </div>

            {/* Content info */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
              <span style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                fontWeight: '700',
                letterSpacing: '0.1em',
                color: 'var(--accent)'
              }}>{project.category === 'creative' ? 'Creative UX' : 'Web App'}</span>
              
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{project.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', flex: 1 }}>{project.shortDesc}</p>
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                {project.tech.map((t, idx) => (
                  <span key={idx} style={{
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)'
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Modal Overlay */}
      {selectedProject && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 2000,
          background: 'rgba(7, 9, 14, 0.85)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }} onClick={() => setSelectedProject(null)}>
          <div 
            className="glass"
            style={{
              maxWidth: '850px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '24px',
              background: 'var(--bg-dark)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 30px var(--accent-glow)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()} // Stop propagation to not close modal
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="clickable"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            {/* Modal Image banner */}
            <div style={{ width: '100%', height: '350px', overflow: 'hidden' }}>
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Modal Contents */}
            <div style={{ padding: '36px' }} className="modal-contents">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>{selectedProject.title}</h3>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a href={selectedProject.githubLink} className="secondary-btn clickable" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    <Github size={16} /> Code
                  </a>
                  <a href={selectedProject.liveLink} className="glow-btn clickable" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>
              </div>

              {/* Technologies */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {selectedProject.tech.map((t, idx) => (
                  <span key={idx} style={{
                    fontSize: '0.8rem',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: 'var(--accent-glow)',
                    border: '1px solid var(--border-color-hover)',
                    color: 'var(--accent)',
                    fontWeight: '500'
                  }}>{t}</span>
                ))}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 1fr',
                gap: '32px',
                textAlign: 'left'
              }} className="modal-grid">
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--text-primary)' }}>Project Description</h4>
                  <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>{selectedProject.longDesc}</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--text-primary)' }}>Key Features</h4>
                  <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedProject.features.map((f, idx) => (
                      <li key={idx} style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'start'
                      }}>
                        <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .project-card:hover .project-image {
          transform: scale(1.05);
        }
        .project-card:hover .project-overlay {
          opacity: 1 !important;
        }
        @media (max-width: 768px) {
          .modal-contents {
            padding: 24px !important;
          }
          .modal-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
