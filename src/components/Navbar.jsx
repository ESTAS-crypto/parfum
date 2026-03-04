import { useState, useEffect } from 'react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { label: 'Home', href: '#home' },
        { label: 'Collection', href: '#collection' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
    ]

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 50,
            background: scrolled ? 'rgba(11,13,20,0.96)' : 'rgba(11,13,20,0.7)',
            borderBottom: scrolled ? '1px solid rgba(212,165,116,0.08)' : '1px solid transparent',
            transition: 'all 0.4s ease',
        }}>
            <div style={{
                maxWidth: '1600px',
                width: '92%',
                margin: '0 auto',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        border: '1.5px solid rgba(212,165,116,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '14px', fontFamily: "'Playfair Display', Georgia, serif",
                        color: '#D4A574', fontWeight: 700,
                    }}>M</div>
                    <span style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '17px', fontWeight: 700, letterSpacing: '0.18em', color: '#D4A574',
                    }}>MAISON NOIR</span>
                </a>

                {/* Desktop Nav */}
                <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            style={{
                                fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em',
                                textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
                                textDecoration: 'none', padding: '8px 16px', borderRadius: '8px',
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = '#D4A574'
                                e.currentTarget.style.background = 'rgba(212,165,116,0.06)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                                e.currentTarget.style.background = 'transparent'
                            }}
                        >{link.label}</a>
                    ))}
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="mobile-menu-btn"
                    style={{
                        display: 'none', flexDirection: 'column', gap: '5px',
                        padding: '8px', background: 'none', border: 'none', cursor: 'pointer',
                    }}
                    aria-label="Toggle menu"
                >
                    <span style={{
                        display: 'block', width: '22px', height: '2px', borderRadius: '1px',
                        background: '#D4A574', transition: 'all 0.4s cubic-bezier(0.68,-0.55,0.27,1.55)',
                        transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                    }} />
                    <span style={{
                        display: 'block', width: menuOpen ? '0px' : '16px', height: '2px', borderRadius: '1px',
                        background: '#D4A574', transition: 'all 0.3s ease',
                        opacity: menuOpen ? 0 : 1, marginLeft: 'auto',
                    }} />
                    <span style={{
                        display: 'block', width: '22px', height: '2px', borderRadius: '1px',
                        background: '#D4A574', transition: 'all 0.4s cubic-bezier(0.68,-0.55,0.27,1.55)',
                        transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
                    }} />
                </button>
            </div>

            {/* Mobile Menu — animated slide */}
            <div style={{
                overflow: 'hidden',
                maxHeight: menuOpen ? '300px' : '0px',
                opacity: menuOpen ? 1 : 0,
                transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                background: 'rgba(11,13,20,0.98)',
                borderTop: menuOpen ? '1px solid rgba(212,165,116,0.08)' : '1px solid transparent',
            }}>
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: '6px', padding: '24px 0',
                }}>
                    {navLinks.map((link, i) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                                padding: '12px 24px', borderRadius: '10px',
                                width: '80%', textAlign: 'center',
                                transition: 'all 0.3s',
                                animation: menuOpen ? `mobileNavFadeIn 0.4s ease ${i * 0.1}s both` : 'none',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(212,165,116,0.06)'
                                e.currentTarget.style.color = '#D4A574'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent'
                                e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes mobileNavFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </nav>
    )
}
