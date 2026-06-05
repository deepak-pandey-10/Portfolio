import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';

export default function Timeline() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const timelineData = [
    {
      year: '2024 - PRESENT',
      role: 'Senior Frontend Architect',
      company: 'PixelForge Studios',
      description: 'Leading a team of developers focused on constructing ultra-fast interactive dashboards, micro-frontend modules, and fluid web animations.',
      details: [
        'Migrated a legacy web app to React Vite, resulting in a 40% improvement in load times.',
        'Established styling guidelines using CSS variables and unified Design Tokens.',
        'Mentored junior engineers and hosted training sessions on React hooks and performance optimization.',
        'Built dynamic client presentation dashboards with responsive charts.'
      ]
    },
    {
      year: '2022 - 2024',
      role: 'Interactive Full-Stack Developer',
      company: 'Nexus Digital Systems',
      description: 'Worked on cross-functional client systems, managing Node.js REST servers, PostgreSQL databases, and clean frontend UI integrations.',
      details: [
        'Maintained and optimized robust state models with Redux Toolkit.',
        'Engineered responsive web client layouts connecting via WebSockets for real-time logs.',
        'Built full-stack automation dashboards reducing deployment verification time by 20%.',
        'Implemented strict unit testing and Cypress end-to-end integration workflows.'
      ]
    },
    {
      year: '2020 - 2022',
      role: 'UI/UX & Frontend Developer',
      company: 'CreativeSpace Agency',
      description: 'Designed interactive client landing pages, branding identities, and modular interface prototypes inside Figma and standard CSS/HTML.',
      details: [
        'Created custom mockups and vectorized branding assets for high-growth tech startups.',
        'Converted visual layouts from Figma mockups to pixel-perfect responsive HTML, CSS, and JS components.',
        'Built interactive parallax scroll effects and keyframe hover visual states.',
        'Maintained SEO optimization standards raising client visibility audits to 98%.'
      ]
    }
  ];

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <section id="timeline">
      <div className="section-header">
        <span className="section-tag">MY PATHWAY</span>
        <h2 className="section-title">Career Experience</h2>
        <p className="section-desc">
          An interactive pathway showing my roles, achievements, and technology transitions.
        </p>
      </div>

      <div className="timeline-container" style={{
        position: 'relative',
        maxWidth: '850px',
        margin: '0 auto',
        padding: '20px 0'
      }}>
        {/* Vertical Center Line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, var(--accent) 15%, var(--accent-secondary) 85%, transparent)',
          transform: 'translateX(-50%)',
          zIndex: 1
        }} className="timeline-line" />

        {/* Timeline Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            const isExpanded = expandedIndex === index;

            return (
              <div 
                key={index} 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  width: '100%',
                  position: 'relative',
                  zIndex: 2
                }}
                className={`timeline-item ${isEven ? 'even' : 'odd'}`}
              >
                {/* Side Content Block (shows blank on desktop to keep grid structure) */}
                <div style={{ width: '45%' }} className="timeline-spacer" />

                {/* Center Node Bullet */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--bg-dark)',
                  border: '2px solid var(--accent)',
                  boxShadow: '0 0 10px var(--accent-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'var(--accent)',
                  marginTop: '10px'
                }} className="timeline-node">
                  <Briefcase size={16} />
                </div>

                {/* Actual Card content */}
                <div 
                  className="glass" 
                  style={{
                    width: '45%',
                    padding: '24px',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onClick={() => toggleExpand(index)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--accent)', fontSize: '0.85rem', fontWeight: '600' }}>
                    <Calendar size={14} />
                    <span>{item.year}</span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '4px', color: 'var(--text-primary)' }}>{item.role}</h3>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '12px' }}>{item.company}</h4>
                  
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{item.description}</p>
                  
                  {/* Expandable achievements section */}
                  {isExpanded && (
                    <div style={{ 
                      marginTop: '16px', 
                      paddingTop: '16px', 
                      borderTop: '1px solid var(--border-color)',
                      animation: 'slideDown 0.3s ease'
                    }}>
                      <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {item.details.map((detail, idx) => (
                          <li key={idx} style={{
                            fontSize: '0.88rem',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'start'
                          }}>
                            <span style={{ color: 'var(--accent)' }}>▸</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    alignItems: 'center', 
                    color: 'var(--accent)', 
                    fontSize: '0.85rem', 
                    fontWeight: '600',
                    marginTop: '12px',
                    gap: '4px'
                  }}>
                    <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Desktop staggered layout settings */
        .timeline-item.even {
          flex-direction: row;
        }
        .timeline-item.odd {
          flex-direction: row-reverse;
        }
        
        @media (max-width: 768px) {
          .timeline-line {
            left: 20px !important;
            transform: none !important;
          }
          .timeline-node {
            left: 20px !important;
            transform: translateX(-50%) !important;
            margin-top: 15px !important;
          }
          .timeline-item {
            flex-direction: row !important;
            padding-left: 45px;
          }
          .timeline-spacer {
            display: none !important;
          }
          .timeline-item.even div:nth-child(3),
          .timeline-item.odd div:nth-child(3) {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
