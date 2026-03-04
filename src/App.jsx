import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import ScentFinder from './components/ScentFinder'
import AboutUs from './components/AboutUs'
import FloatingButtons from './components/FloatingButtons'
import ParticleCanvas from './components/ParticleCanvas'
import { ADMIN_WHATSAPP } from './data/products'

export default function App() {
    const contactLink = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(
        'Halo, saya ingin mengetahui lebih lanjut tentang koleksi parfum Anda.'
    )}`

    return (
        <div style={{ backgroundColor: '#0B0D14', minHeight: '100vh', color: '#fff' }}>
            <Navbar />
            <FloatingButtons />
            <ParticleCanvas />

            <main>
                <Home />

                {/* Separator */}
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{
                        height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(212,165,116,0.2), transparent)',
                    }} />
                </div>

                <Products />

                <ScentFinder />

                <AboutUs />

                {/* ========== CONTACT CTA ========== */}
                <section
                    id="contact"
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        padding: '100px 24px',
                        background: 'linear-gradient(180deg, #0B0D14 0%, #141728 30%, #181B30 50%, #141728 70%, #0B0D14 100%)',
                        textAlign: 'center',
                    }}
                >
                    {/* Decorative glow */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(ellipse, rgba(212,165,116,0.05), transparent 70%)',
                        pointerEvents: 'none',
                    }} />

                    <div style={{ position: 'relative', zIndex: 10, maxWidth: '650px', margin: '0 auto' }}>
                        {/* Diamond ornament */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
                            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,165,116,0.3))' }} />
                            <div style={{ width: '8px', height: '8px', transform: 'rotate(45deg)', border: '1px solid rgba(212,165,116,0.3)', background: 'rgba(212,165,116,0.05)' }} />
                            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(270deg, transparent, rgba(212,165,116,0.3))' }} />
                        </div>

                        {/* Label */}
                        <p style={{
                            fontSize: '11px',
                            letterSpacing: '0.35em',
                            textTransform: 'uppercase',
                            fontWeight: 500,
                            color: 'rgba(212,165,116,0.5)',
                            marginBottom: '24px',
                            textAlign: 'center',
                        }}>Exclusive Service</p>

                        {/* Heading */}
                        <h2 style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: 'clamp(28px, 5vw, 48px)',
                            fontWeight: 700,
                            lineHeight: 1.3,
                            marginBottom: '20px',
                            textAlign: 'center',
                        }}>
                            <span style={{ color: '#fff' }}>Tertarik dengan </span>
                            <span className="gold-shimmer">koleksi kami</span>
                            <span style={{ color: '#fff' }}>?</span>
                        </h2>

                        {/* Description */}
                        <p style={{
                            fontSize: '14px',
                            lineHeight: 1.7,
                            color: 'rgba(255,255,255,0.35)',
                            maxWidth: '420px',
                            margin: '0 auto 36px auto',
                            textAlign: 'center',
                        }}>
                            Hubungi kami langsung via WhatsApp untuk konsultasi aroma,
                            rekomendasi personal, dan pemesanan eksklusif.
                        </p>

                        {/* CTA */}
                        <div style={{ textAlign: 'center' }}>
                            <a
                                href={contactLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '16px 44px',
                                    borderRadius: '16px',
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.12em',
                                    textDecoration: 'none',
                                    background: 'linear-gradient(135deg, #D4A574, #B07D4F)',
                                    color: '#0B0D14',
                                    transition: 'transform 0.2s, box-shadow 0.3s',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'scale(1.05)'
                                    e.currentTarget.style.boxShadow = '0 0 40px rgba(212,165,116,0.25)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'scale(1)'
                                    e.currentTarget.style.boxShadow = 'none'
                                }}
                            >
                                <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Chat via WhatsApp
                            </a>
                        </div>

                        {/* Bottom ornament */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '48px' }}>
                            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,165,116,0.15))' }} />
                            <div style={{ width: '6px', height: '6px', transform: 'rotate(45deg)', border: '1px solid rgba(212,165,116,0.15)' }} />
                            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(270deg, transparent, rgba(212,165,116,0.15))' }} />
                        </div>
                    </div>
                </section>

                {/* ========== FOOTER ========== */}
                <footer style={{
                    background: '#080A10',
                    borderTop: '1px solid rgba(212,165,116,0.06)',
                    padding: '56px 24px 24px',
                }}>
                    <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
                        <div className="footer-grid" style={{ marginBottom: '40px' }}>
                            {/* Brand */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                                    <div style={{
                                        width: '28px', height: '28px', borderRadius: '50%',
                                        border: '1px solid rgba(212,165,116,0.25)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '12px', fontFamily: "'Playfair Display', Georgia, serif",
                                        color: '#D4A574', fontWeight: 700,
                                    }}>M</div>
                                    <span style={{
                                        fontFamily: "'Playfair Display', Georgia, serif",
                                        fontSize: '16px', fontWeight: 700, letterSpacing: '0.12em', color: '#D4A574',
                                    }}>MAISON NOIR</span>
                                </div>
                                <p style={{ fontSize: '12px', lineHeight: 1.7, color: 'rgba(255,255,255,0.2)', maxWidth: '280px' }}>
                                    Koleksi parfum luxury eksklusif untuk mereka yang menghargai keindahan aroma dan kemewahan sejati.
                                </p>
                            </div>

                            {/* Navigation */}
                            <div>
                                <h4 style={{
                                    fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em',
                                    textTransform: 'uppercase', color: 'rgba(212,165,116,0.4)', marginBottom: '16px',
                                }}>Navigation</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {['Home', 'Collection', 'Contact'].map(label => (
                                        <a
                                            key={label}
                                            href={`#${label.toLowerCase()}`}
                                            style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s' }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#D4A574'}
                                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                                        >
                                            {label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Contact */}
                            <div>
                                <h4 style={{
                                    fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em',
                                    textTransform: 'uppercase', color: 'rgba(212,165,116,0.4)', marginBottom: '16px',
                                }}>Contact</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>WhatsApp: +62 812-3456-7890</span>
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Email: hello@maisonnoir.id</span>
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Jakarta, Indonesia</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer bottom */}
                        <div style={{
                            borderTop: '1px solid rgba(255,255,255,0.04)',
                            paddingTop: '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '12px',
                        }}>
                            <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.12)' }}>
                                © 2025 MAISON NOIR. All rights reserved.
                            </span>
                            <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.08)' }}>
                                Crafted with passion & precision
                            </span>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    )
}
