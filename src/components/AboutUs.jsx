import { useRef, useState, useEffect } from 'react'

export default function AboutUs() {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.15 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const values = [
        { icon: '🌿', title: '100% Authentic', desc: 'Setiap parfum dijamin keasliannya langsung dari produsen terpercaya.' },
        { icon: '✨', title: 'Premium Quality', desc: 'Hanya bahan-bahan berkualitas tinggi yang digunakan dalam setiap tetes.' },
        { icon: '🚀', title: 'Fast Delivery', desc: 'Pengiriman cepat dan aman ke seluruh Indonesia dengan packaging eksklusif.' },
        { icon: '💎', title: 'Exclusive Collection', desc: 'Koleksi terbatas yang dikurasi khusus untuk pelanggan istimewa kami.' },
    ]

    return (
        <section
            id="about"
            ref={ref}
            style={{
                position: 'relative',
                padding: '80px 24px',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, #0B0D14, #0F1220, #0B0D14)',
            }}
        >
            {/* Background glow */}
            <div style={{
                position: 'absolute', top: '20%', left: '10%',
                width: '400px', height: '400px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212,165,116,0.03), transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{
                maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
                        <div style={{ width: '50px', height: '1px', background: 'rgba(212,165,116,0.25)' }} />
                        <span style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 500, color: 'rgba(212,165,116,0.6)' }}>
                            Our Story
                        </span>
                        <div style={{ width: '50px', height: '1px', background: 'rgba(212,165,116,0.25)' }} />
                    </div>

                    <h2 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(28px, 5vw, 48px)',
                        fontWeight: 700, marginBottom: '14px',
                    }}>
                        <span style={{ color: '#fff' }}>Tentang </span>
                        <span className="gold-shimmer">Maison Noir</span>
                    </h2>

                    <p style={{
                        fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.35)',
                        maxWidth: '600px', margin: '0 auto',
                    }}>
                        MAISON NOIR lahir dari kecintaan terhadap seni parfum. Kami percaya bahwa aroma
                        adalah bentuk ekspresi diri yang paling intim. Setiap botol yang kami hadirkan
                        adalah hasil dari perjalanan panjang mencari keseimbangan sempurna antara
                        tradisi dan inovasi.
                    </p>
                </div>

                {/* Values Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '16px',
                }}>
                    {values.map((v, i) => (
                        <div
                            key={v.title}
                            style={{
                                padding: '28px 24px',
                                borderRadius: '20px',
                                border: '1px solid rgba(212,165,116,0.06)',
                                background: 'linear-gradient(160deg, rgba(20,23,40,0.6), rgba(14,16,32,0.6))',
                                textAlign: 'center',
                                transition: 'all 0.4s ease',
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                                transitionDelay: `${i * 0.1}s`,
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)'
                                e.currentTarget.style.transform = 'translateY(-4px)'
                                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(212,165,116,0.06)'
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            <div style={{ fontSize: '36px', marginBottom: '16px' }}>{v.icon}</div>
                            <h3 style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontSize: '17px', fontWeight: 600, color: '#fff', marginBottom: '10px',
                            }}>{v.title}</h3>
                            <p style={{
                                fontSize: '12px', lineHeight: 1.7, color: 'rgba(255,255,255,0.3)',
                            }}>{v.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Mission statement */}
                <div style={{
                    marginTop: '48px', padding: '32px',
                    borderRadius: '20px',
                    border: '1px solid rgba(212,165,116,0.06)',
                    background: 'rgba(212,165,116,0.02)',
                    textAlign: 'center',
                }}>
                    <p style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(16px, 2.5vw, 22px)',
                        fontWeight: 600, fontStyle: 'italic', lineHeight: 1.7,
                        color: 'rgba(255,255,255,0.5)',
                    }}>
                        "Kami tidak hanya menjual parfum. Kami menghadirkan pengalaman yang
                        mengubah cara Anda melihat diri sendiri."
                    </p>
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '10px', marginTop: '20px',
                    }}>
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            border: '1px solid rgba(212,165,116,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '12px', fontFamily: "'Playfair Display', Georgia, serif",
                            color: '#D4A574', fontWeight: 700,
                        }}>M</div>
                        <div>
                            <p style={{ fontSize: '12px', fontWeight: 600, color: '#D4A574' }}>MAISON NOIR</p>
                            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}>EST. 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
