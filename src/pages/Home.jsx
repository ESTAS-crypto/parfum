import { Suspense } from 'react'
import Parfum3D from '../components/Parfum3D'
import { ADMIN_WHATSAPP } from '../data/products'

// Perfume spray mist particles
function SprayParticles() {
    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 3,
        opacity: Math.random() * 0.4 + 0.1,
    }))

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            right: '20%',
            transform: 'translate(50%, -50%)',
            width: '300px',
            height: '300px',
            pointerEvents: 'none',
            zIndex: 5,
        }}>
            {particles.map(p => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: `calc(50% + ${p.x}px)`,
                        top: `calc(50% + ${p.y}px)`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, rgba(212,165,116,${p.opacity}), transparent)`,
                        animation: `sprayFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
                    }}
                />
            ))}
        </div>
    )
}

// Sparkle/twinkle dots
function SparkleEffect() {
    const sparkles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
        size: Math.random() * 3 + 1,
    }))

    return (
        <>
            {sparkles.map(s => (
                <div
                    key={s.id}
                    style={{
                        position: 'absolute',
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        borderRadius: '50%',
                        background: '#D4A574',
                        animation: `twinkle 2s ease-in-out ${s.delay}s infinite`,
                        pointerEvents: 'none',
                        zIndex: 2,
                    }}
                />
            ))}
        </>
    )
}

export default function Home() {
    const ctaLink = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(
        'Halo, saya ingin mengetahui koleksi parfum terbaru Anda.'
    )}`

    return (
        <section
            id="home"
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                background: '#0B0D14',
            }}
        >
            {/* Animated gradient blobs */}
            <div style={{
                position: 'absolute', top: '10%', left: '5%',
                width: '600px', height: '600px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212,165,116,0.06), transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none',
                animation: 'blobFloat1 12s ease-in-out infinite',
            }} />
            <div style={{
                position: 'absolute', bottom: '10%', right: '10%',
                width: '400px', height: '400px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(100,80,160,0.05), transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none',
                animation: 'blobFloat2 15s ease-in-out infinite',
            }} />

            {/* Dot grid */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.03,
                backgroundImage: 'radial-gradient(circle, rgba(212,165,116,0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px', pointerEvents: 'none',
            }} />

            {/* Sparkles */}
            <SparkleEffect />

            {/* Spray Particles near 3D */}
            <SprayParticles />

            {/* Content */}
            <div
                className="hero-layout"
                style={{
                    position: 'relative', zIndex: 10,
                    maxWidth: '1500px', margin: '0 auto',
                    padding: 'clamp(72px, 12vw, 100px) clamp(12px, 4vw, 24px) clamp(32px, 8vw, 60px)', width: '100%',
                }}
            >
                {/* Text Side */}
                <div className="hero-text" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    {/* Subtitle */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                        animation: 'fadeSlideRight 0.8s ease forwards',
                        opacity: 0,
                    }}>
                        <div style={{
                            width: '40px', height: '2px',
                            background: 'linear-gradient(90deg, #D4A574, transparent)',
                            borderRadius: '1px',
                        }} />
                        <span style={{
                            fontSize: '11px', letterSpacing: '0.35em',
                            textTransform: 'uppercase', color: '#D4A574', fontWeight: 500,
                        }}>
                            Luxury Fragrance
                        </span>
                    </div>

                    {/* Heading with staggered animation */}
                    <h1 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(38px, 7vw, 82px)',
                        fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.01em',
                    }}>
                        <span style={{
                            display: 'inline-block', color: '#fff',
                            animation: 'fadeSlideUp 0.8s ease 0.2s forwards', opacity: 0,
                        }}>Discover</span>
                        <br />
                        <span style={{
                            display: 'inline-block',
                            animation: 'fadeSlideUp 0.8s ease 0.4s forwards', opacity: 0,
                        }} className="gold-shimmer">Your Signature</span>
                        <br />
                        <span style={{
                            display: 'inline-block', color: 'rgba(255,255,255,0.85)',
                            animation: 'fadeSlideUp 0.8s ease 0.6s forwards', opacity: 0,
                        }}>Scent</span>
                    </h1>

                    {/* Description */}
                    <p style={{
                        fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.35)',
                        maxWidth: '440px', margin: '0 auto',
                        animation: 'fadeSlideUp 0.8s ease 0.8s forwards', opacity: 0,
                    }}>
                        Setiap tetes parfum menceritakan kisah kemewahan yang tak terucapkan.
                        Temukan aroma eksklusif yang mendefinisikan dirimu.
                    </p>

                    {/* CTA Buttons */}
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center',
                        animation: 'fadeSlideUp 0.8s ease 1s forwards', opacity: 0,
                    }}>
                        <a
                            href="#collection"
                            style={{
                                padding: '14px 32px', borderRadius: '14px',
                                fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em',
                                textTransform: 'uppercase', textDecoration: 'none',
                                background: 'linear-gradient(135deg, #D4A574, #B07D4F)',
                                color: '#0B0D14',
                                transition: 'transform 0.2s, box-shadow 0.3s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-2px)'
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(212,165,116,0.25)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            Explore Collection
                        </a>
                        <a
                            href={ctaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: '14px 32px', borderRadius: '14px',
                                fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em',
                                textTransform: 'uppercase', textDecoration: 'none',
                                border: '1px solid rgba(212,165,116,0.25)', color: '#D4A574',
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(212,165,116,0.08)'
                                e.currentTarget.style.borderColor = 'rgba(212,165,116,0.4)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent'
                                e.currentTarget.style.borderColor = 'rgba(212,165,116,0.25)'
                            }}
                        >
                            Hubungi Kami
                        </a>
                    </div>

                    {/* Stats */}
                    <div style={{
                        display: 'flex', gap: '0', paddingTop: '16px', flexWrap: 'wrap', justifyContent: 'center',
                        animation: 'fadeSlideUp 0.8s ease 1.2s forwards', opacity: 0,
                    }}>
                        {[
                            { value: '50+', label: 'Variants' },
                            { value: '10K+', label: 'Customers' },
                            { value: '100%', label: 'Authentic' },
                        ].map((stat, i) => (
                            <div key={stat.label} style={{
                                paddingRight: 'clamp(16px, 4vw, 32px)',
                                paddingLeft: i > 0 ? 'clamp(16px, 4vw, 32px)' : '0',
                                borderLeft: i > 0 ? '1px solid rgba(212,165,116,0.1)' : 'none',
                            }}>
                                <p style={{
                                    fontFamily: "'Playfair Display', Georgia, serif",
                                    fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 700, color: '#D4A574',
                                }}>{stat.value}</p>
                                <p style={{
                                    fontSize: 'clamp(8px, 1.5vw, 10px)', letterSpacing: '0.2em',
                                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginTop: '4px',
                                }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3D Side */}
                <div className="hero-3d" style={{
                    position: 'relative', height: '520px', width: '100%',
                    animation: 'fadeScale 1s ease 0.5s forwards', opacity: 0,
                }}>
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '320px', height: '320px', borderRadius: '50%',
                        border: '1px solid rgba(212,165,116,0.06)', pointerEvents: 'none',
                        animation: 'ringPulse 4s ease-in-out infinite',
                    }} />
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '240px', height: '240px', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(212,165,116,0.04), transparent 70%)',
                        filter: 'blur(30px)', pointerEvents: 'none',
                    }} />

                    <Suspense
                        fallback={
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{
                                    width: '36px', height: '36px',
                                    border: '2px solid rgba(212,165,116,0.15)',
                                    borderTopColor: '#D4A574', borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                }} />
                            </div>
                        }
                    >
                        <Parfum3D />
                    </Suspense>
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{
                position: 'absolute', bottom: 'clamp(10px, 3vh, 28px)', left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 20 // ensure it's above the 3D canvas
            }}>
                <div className="scroll-indicator" style={{
                    width: '100px', // Fixed width
                    textAlign: 'center', // Center everything inside
                    animation: 'fadeSlideUp 1s ease 2s forwards', opacity: 0,
                    paddingBottom: '20px' // Add padding for safer interaction area
                }}>
                    <div style={{ marginBottom: '8px', paddingLeft: '0.35em' }}>
                        <span style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(212,165,116,0.6)', fontWeight: 600 }}>
                            Scroll
                        </span>
                    </div>
                    <div style={{
                        width: '2px', height: 'clamp(20px, 5vh, 32px)',
                        background: 'linear-gradient(to bottom, rgba(212,165,116,0.6), transparent)',
                        animation: 'scrollBounce 2s ease-in-out infinite',
                        borderRadius: '2px',
                        margin: '0 auto' // Center the line
                    }} />
                </div>
            </div>

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blobFloat1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,-20px); } }
        @keyframes blobFloat2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
        @keyframes fadeSlideUp { to { opacity: 1; transform: translateY(0); } from { opacity: 0; transform: translateY(24px); } }
        @keyframes fadeSlideRight { to { opacity: 1; transform: translateX(0); } from { opacity: 0; transform: translateX(-20px); } }
        @keyframes fadeScale { to { opacity: 1; transform: scale(1); } from { opacity: 0; transform: scale(0.9); } }
        @keyframes twinkle { 0%,100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 0.6; transform: scale(1.2); } }
        @keyframes sprayFloat {
          0% { opacity: 0; transform: translate(0, 0) scale(0.5); }
          30% { opacity: 0.5; }
          70% { opacity: 0.2; }
          100% { opacity: 0; transform: translate(${Math.random() > 0.5 ? '' : '-'}40px, -60px) scale(1.5); }
        }
        @keyframes ringPulse { 0%,100% { opacity: 0.4; transform: translate(-50%,-50%) scale(1); } 50% { opacity: 0.8; transform: translate(-50%,-50%) scale(1.05); } }
        @keyframes scrollBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
      `}</style>
        </section>
    )
}
