import { useState } from 'react';
import { User, Code, Palette, Settings, Terminal, Briefcase, Award } from 'lucide-react';

export default function About() {
  const [activeCategory, setActiveCategory] = useState('all');

  const stats = [
    { label: 'Years Experience', value: '4+', icon: <Briefcase size={20} /> },
    { label: 'Completed Projects', value: '25+', icon: <Code size={20} /> },
    { label: 'Happy Collaborators', value: '15+', icon: <Award size={20} /> }
  ];

  const skillGroups = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: <Terminal size={18} />,
      skills: [
        { name: 'React', level: '95%' },
        { name: 'Next.js', level: '85%' },
        { name: 'JavaScript (ES6+)', level: '90%' },
        { name: 'CSS3 / Sass', level: '95%' },
        { name: 'Redux / Toolkit', level: '80%' },
        { name: 'TypeScript', level: '75%' }
      ]
    },
    {
      id: 'tools',
      title: 'Workflow & Tools',
      icon: <Settings size={18} />,
      skills: [
        { name: 'Vite / Webpack', level: '85%' },
        { name: 'Git & GitHub', level: '90%' },
        { name: 'REST APIs', level: '90%' },
        { name: 'Tailwind CSS', level: '95%' },
        { name: 'Node.js / Express', level: '70%' },
        { name: 'Jest / Testing', level: '75%' }
      ]
    },
    {
      id: 'design',
      title: 'Design & Creative',
      icon: <Palette size={18} />,
      skills: [
        { name: 'UI/UX Design', level: '88%' },
        { name: 'Figma', level: '92%' },
        { name: 'Web Animation', level: '85%' },
        { name: 'Responsive Layouts', level: '98%' },
        { name: '3D Mockups (Blender)', level: '60%' },
        { name: 'Brand Identity', level: '75%' }
      ]
    }
  ];

  const filteredGroups = activeCategory === 'all' 
    ? skillGroups 
    : skillGroups.filter(group => group.id === activeCategory);

  return (
    <section id="about">
      <div className="section-header">
        <span className="section-tag">WHO I AM</span>
        <h2 className="section-title">About Me</h2>
        <p className="section-desc">
          I am a builder who translates imaginative designs into high-performance, functional codebase realities.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gap: '48px',
        alignItems: 'start'
      }} className="about-grid">
        {/* Left Column: Story and Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '16px',
              fontFamily: 'var(--font-display)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <User style={{ color: 'var(--accent)' }} size={22} />
              My Creative Journey
            </h3>
            
            <p style={{ marginBottom: '16px', fontSize: '1.05rem', lineHeight: '1.7' }}>
              I started my journey as a developer with a passion for designing visual layouts. Realizing that the web could be more than static templates, I dove deep into frontend engineering, interactive animations, and responsive architecture.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              Today, I build premium React applications that offer seamless UX, fluid physics-based transitions, and structured styling. I believe that writing code is a creative art form, and I aim to prove it through every pixel of my projects.
            </p>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px'
          }} className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="glass" style={{
                padding: '20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  color: 'var(--accent)',
                  background: 'var(--accent-glow)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {stat.icon}
                </div>
                <span style={{
                  fontSize: '1.8rem',
                  fontWeight: '800',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-primary)'
                }}>{stat.value}</span>
                <span style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Skills & Tech stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Skill Filter tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.02)',
            padding: '6px',
            borderRadius: '30px',
            border: '1px solid var(--border-color)',
            alignSelf: 'start'
          }}>
            {['all', 'frontend', 'tools', 'design'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="clickable"
                style={{
                  background: activeCategory === cat ? 'var(--accent)' : 'transparent',
                  color: activeCategory === cat ? '#000' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'var(--transition-fast)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skill lists */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredGroups.map((group) => (
              <div key={group.id} className="glass" style={{ padding: '24px' }}>
                <h4 style={{
                  fontSize: '1.15rem',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--text-primary)'
                }}>
                  <span style={{ color: 'var(--accent)' }}>{group.icon}</span>
                  {group.title}
                </h4>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px'
                }} className="skills-subgrid">
                  {group.skills.map((skill, index) => (
                    <div key={index} className="skill-item" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.9rem'
                      }}>
                        <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{skill.name}</span>
                        <span style={{ color: 'var(--accent)', fontWeight: '600' }}>{skill.level}</span>
                      </div>
                      
                      {/* Interactive Glow Progress Bar */}
                      <div style={{
                        width: '100%',
                        height: '6px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        <div style={{
                          width: skill.level,
                          height: '100%',
                          background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-secondary) 100%)',
                          borderRadius: '3px',
                          boxShadow: '0 0 8px rgba(var(--accent-rgb), 0.5)'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .skills-subgrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
