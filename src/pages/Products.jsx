import { useState, useEffect, useRef } from 'react'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import { products } from '../data/products'

// Hook for scroll-triggered visibility
function useInView(threshold = 0.15) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold])

    return [ref, visible]
}

export default function Products() {
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [headerRef, headerVisible] = useInView(0.2)
    const [gridRef, gridVisible] = useInView(0.1)

    return (
        <>
            <section
                id="collection"
                style={{
                    position: 'relative',
                    padding: '80px 24px 60px',
                    overflow: 'hidden',
                    background: '#0B0D14',
                }}
            >
                {/* Accent glow */}
                <div style={{
                    position: 'absolute', top: '-100px', left: '50%',
                    transform: 'translateX(-50%)', width: '600px', height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(212,165,116,0.04), transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 10, maxWidth: '1500px', margin: '0 auto' }}>
                    {/* Section Header — animated on scroll */}
                    <div
                        ref={headerRef}
                        style={{
                            textAlign: 'center',
                            marginBottom: '56px',
                            opacity: headerVisible ? 1 : 0,
                            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'opacity 0.8s ease, transform 0.8s ease',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ width: '50px', height: '1px', background: 'rgba(212,165,116,0.25)' }} />
                            <span style={{
                                fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase',
                                fontWeight: 500, color: 'rgba(212,165,116,0.6)',
                            }}>Our Signature</span>
                            <div style={{ width: '50px', height: '1px', background: 'rgba(212,165,116,0.25)' }} />
                        </div>

                        <h2 style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 700,
                            color: '#fff', marginBottom: '16px', textAlign: 'center',
                        }}>
                            The <span className="gold-shimmer">Collection</span>
                        </h2>

                        <div style={{
                            width: '80px', height: '1px',
                            background: 'linear-gradient(90deg, transparent, #D4A574, transparent)',
                            margin: '0 auto 20px',
                        }} />

                        <p style={{
                            color: 'rgba(255,255,255,0.3)', maxWidth: '500px', margin: '0 auto',
                            lineHeight: 1.7, fontSize: '14px', textAlign: 'center',
                        }}>
                            Koleksi parfum eksklusif yang dibuat dari bahan-bahan terbaik dunia.
                            Klik produk untuk melihat detail & model 3D interaktif.
                        </p>
                    </div>

                    {/* Product Grid — staggered card entrance */}
                    <div ref={gridRef} className="product-grid">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                style={{
                                    opacity: gridVisible ? 1 : 0,
                                    transform: gridVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                                    transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
                                }}
                            >
                                <ProductCard
                                    product={product}
                                    onSelect={setSelectedProduct}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </>
    )
}
