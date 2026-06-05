import { useState } from 'react';
import { Mail, Send, CheckCircle, Copy } from 'lucide-react';

const Github = ({ size = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Twitter = ({ size = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus('sending');
    // Simulate API delivery
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      // Reset status back to idle after 4 seconds
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@deepakpandey.dev');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact">
      <div className="section-header">
        <span className="section-tag">CONTACT ME</span>
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-desc">
          Have an interesting project, job opportunity, or just want to say hi? Shoot me a message.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.3fr',
        gap: '40px',
        alignItems: 'start'
      }} className="contact-grid">
        
        {/* Left Column: Direct info and copy-clicker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
          <div className="glass" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Connection Details</h3>
            <p style={{ marginBottom: '24px', fontSize: '0.98rem', color: 'var(--text-secondary)' }}>
              If you prefer direct emails or want to connect on social spaces, use the coordinates below.
            </p>

            {/* Email Copier */}
            <div 
              className="clickable"
              onClick={copyEmail}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                marginBottom: '32px',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail size={20} style={{ color: 'var(--accent)' }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>EMAIL</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-primary)' }}>hello@deepakpandey.dev</span>
                </div>
              </div>
              <div style={{ color: copied ? 'var(--accent)' : 'var(--text-muted)' }}>
                {copied ? <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>Copied!</span> : <Copy size={16} />}
              </div>
            </div>

            {/* Socials link list */}
            <div>
              <span style={{
                display: 'block',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px'
              }}>Find me on</span>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { icon: <Github size={20} />, href: 'https://github.com', label: 'GitHub' },
                  { icon: <Linkedin size={20} />, href: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: <Twitter size={20} />, href: 'https://twitter.com', label: 'Twitter' }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href} 
                    target="_blank" 
                    rel="noreferrer"
                    className="clickable"
                    title={social.label}
                    style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-secondary)',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--accent)';
                      e.currentTarget.style.borderColor = 'var(--accent)';
                      e.currentTarget.style.boxShadow = '0 0 10px var(--accent-glow)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Message form */}
        <div>
          <form 
            onSubmit={handleFormSubmit} 
            className="glass" 
            style={{ 
              padding: '32px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '20px',
              textAlign: 'left'
            }}
          >
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>Send Message</h3>

            {/* Input name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="name" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                required
                placeholder="John Doe"
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'var(--transition-fast)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.boxShadow = '0 0 10px var(--accent-glow)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-color)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Input email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="email" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                required
                placeholder="john@example.com"
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'var(--transition-fast)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.boxShadow = '0 0 10px var(--accent-glow)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-color)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Input message */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="message" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Message</label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleInputChange}
                required
                rows="5"
                placeholder="Hi Deepak, I would love to collaborate on..."
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'none',
                  transition: 'var(--transition-fast)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.boxShadow = '0 0 10px var(--accent-glow)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-color)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Status alerts */}
            {status === 'success' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                background: 'rgba(0, 245, 160, 0.1)',
                border: '1px solid rgba(0, 245, 160, 0.3)',
                borderRadius: '8px',
                color: '#00f5a0',
                fontSize: '0.9rem'
              }}>
                <CheckCircle size={18} />
                <span>Thank you! Your message was sent successfully.</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="glow-btn clickable"
              style={{
                alignSelf: 'start',
                padding: '12px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                opacity: status === 'sending' ? 0.7 : 1
              }}
            >
              {status === 'sending' ? (
                <>Sending...</>
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
