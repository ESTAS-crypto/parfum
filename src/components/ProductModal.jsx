import { Suspense, lazy, useState, useEffect } from 'react'
import { getWhatsAppLink } from '../data/products'

const Parfum3D = lazy(() => import('./Parfum3D'))

export default function ProductModal({ product, onClose }) {
    const [selectedSize, setSelectedSize] = useState(
        product.sizes ? product.sizes.length - 1 : 0
    )

    const currentSize = product.sizes ? product.sizes[selectedSize] : null
    const displayPrice = currentSize ? currentSize.price : product.price
    const bottleScale = currentSize ? currentSize.scale : 1

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handleEsc)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = ''
        }
    }, [onClose])

    return (
        <div
            onClick={onClose}
            className="modal-overlay"
            style={{
                position: 'fixed', inset: 0, zIndex: 100,
                background: 'rgba(0,0,0,0.7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '20px',
                animation: 'modalFadeIn 0.3s ease forwards',
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="modal-container"
                style={{
                    position: 'relative',
                    width: '100%', maxWidth: '900px', maxHeight: '90vh',
                    background: 'linear-gradient(160deg, #141728, #0e1020)',
                    borderRadius: '24px',
                    border: '1px solid rgba(212,165,116,0.1)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    animation: 'modalSlideUp 0.4s ease forwards',
                    boxSizing: 'border-box',
                }}
            >
                {/* Close */}
                <button onClick={onClose} style={{
                    position: 'sticky', top: '16px', float: 'right',
                    marginRight: '16px', marginTop: '16px',
                    width: '36px', height: '36px', borderRadius: '50%',
                    border: '1px solid rgba(212,165,116,0.15)',
                    background: 'rgba(11,13,20,0.8)',
                    color: '#D4A574', fontSize: '16px',
                    cursor: 'pointer', zIndex: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s',
                }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(212,165,116,0.1)'
                        e.currentTarget.style.borderColor = 'rgba(212,165,116,0.3)'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(11,13,20,0.8)'
                        e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)'
                    }}>✕</button>

                <div className="modal-grid" style={{
                    display: 'grid', gap: '0',
                }}>
                    {/* Left — Image + 3D */}
                    <div className="modal-left" style={{ padding: '32px 24px' }}>
                        {/* Product Image */}
                        <div className="modal-product-image" style={{
                            borderRadius: '16px', overflow: 'hidden',
                            marginBottom: '16px', aspectRatio: '3/4',
                        }}>
                            <img
                                src={product.image} alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        {/* 3D Viewer */}
                        <div className="modal-3d-viewer" style={{
                            height: '220px', borderRadius: '16px',
                            border: '1px solid rgba(212,165,116,0.08)',
                            background: 'rgba(0,0,0,0.3)',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            <Suspense fallback={
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{
                                        width: '28px', height: '28px',
                                        border: '2px solid rgba(212,165,116,0.15)',
                                        borderTopColor: '#D4A574', borderRadius: '50%',
                                        animation: 'spin 1s linear infinite',
                                    }} />
                                </div>
                            }>
                                <Parfum3D enableFullControl={true} bottleScale={bottleScale} />
                            </Suspense>

                            {/* Volume label on 3D */}
                            {currentSize && (
                                <div style={{
                                    position: 'absolute', bottom: '10px', left: '50%',
                                    transform: 'translateX(-50%)',
                                    padding: '4px 14px', borderRadius: '20px',
                                    background: 'rgba(11,13,20,0.75)',
                                    border: '1px solid rgba(212,165,116,0.12)',
                                    fontSize: '10px', fontWeight: 600,
                                    color: '#D4A574', letterSpacing: '0.1em',
                                    transition: 'all 0.3s',
                                }}>
                                    {currentSize.volume}
                                </div>
                            )}

                            <span style={{
                                position: 'absolute', top: '10px', right: '12px',
                                fontSize: '9px', letterSpacing: '0.15em',
                                textTransform: 'uppercase', color: 'rgba(212,165,116,0.25)',
                            }}>Drag to rotate</span>
                        </div>
                    </div>

                    {/* Right — Details */}
                    <div className="modal-right" style={{ padding: '48px 32px 32px 8px' }}>
                        {/* Badge */}
                        {product.badge && (
                            <span style={{
                                display: 'inline-block', padding: '4px 14px',
                                fontSize: '9px', fontWeight: 700, textTransform: 'uppercase',
                                letterSpacing: '0.15em', borderRadius: '20px',
                                background: 'linear-gradient(135deg, #D4A574, #B07D4F)',
                                color: '#0B0D14', marginBottom: '16px',
                            }}>{product.badge}</span>
                        )}

                        {/* Name */}
                        <h2 style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: '28px', fontWeight: 700, color: '#fff',
                            marginBottom: '12px',
                        }}>{product.name}</h2>

                        {/* Price */}
                        <p className="modal-price" style={{
                            fontSize: '24px', fontWeight: 700, color: '#D4A574',
                            marginBottom: '20px',
                            transition: 'all 0.3s',
                        }}>{displayPrice}</p>

                        {/* Size/Volume Selector */}
                        {product.sizes && (
                            <div style={{ marginBottom: '20px' }}>
                                <p style={{
                                    fontSize: '10px', fontWeight: 600, letterSpacing: '0.25em',
                                    textTransform: 'uppercase', color: 'rgba(212,165,116,0.4)',
                                    marginBottom: '10px',
                                }}>Pilih Ukuran</p>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {product.sizes.map((size, i) => (
                                        <button
                                            key={size.volume}
                                            onClick={() => setSelectedSize(i)}
                                            className="modal-size-btn"
                                            style={{
                                                padding: '10px 18px', borderRadius: '12px',
                                                fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                                                transition: 'all 0.3s',
                                                border: selectedSize === i
                                                    ? '1.5px solid #D4A574'
                                                    : '1px solid rgba(212,165,116,0.12)',
                                                background: selectedSize === i
                                                    ? 'rgba(212,165,116,0.1)'
                                                    : 'rgba(212,165,116,0.02)',
                                                color: selectedSize === i
                                                    ? '#D4A574'
                                                    : 'rgba(255,255,255,0.4)',
                                            }}
                                        >
                                            <div style={{ fontSize: '14px', fontWeight: 700 }}>{size.volume}</div>
                                            <div style={{
                                                fontSize: '10px', marginTop: '2px',
                                                color: selectedSize === i ? 'rgba(212,165,116,0.7)' : 'rgba(255,255,255,0.25)',
                                            }}>{size.price}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Separator */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            margin: '16px 0',
                        }}>
                            <div style={{ flex: 1, height: '1px', background: 'rgba(212,165,116,0.08)' }} />
                            <div style={{ width: '6px', height: '6px', transform: 'rotate(45deg)', border: '1px solid rgba(212,165,116,0.15)' }} />
                            <div style={{ flex: 1, height: '1px', background: 'rgba(212,165,116,0.08)' }} />
                        </div>

                        {/* Description */}
                        <p className="modal-desc" style={{
                            fontSize: '13px', lineHeight: 1.7,
                            color: 'rgba(255,255,255,0.35)', marginBottom: '16px',
                        }}>{product.description}</p>

                        {/* Notes */}
                        <div style={{ marginBottom: '16px' }}>
                            <p style={{
                                fontSize: '10px', fontWeight: 600, letterSpacing: '0.25em',
                                textTransform: 'uppercase', color: 'rgba(212,165,116,0.4)',
                                marginBottom: '8px',
                            }}>Fragrance Notes</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {product.notes.map((note) => (
                                    <span key={note} className="modal-notes-tag" style={{
                                        padding: '5px 12px', borderRadius: '20px', fontSize: '11px',
                                        border: '1px solid rgba(212,165,116,0.12)',
                                        color: 'rgba(255,255,255,0.4)', fontWeight: 500,
                                        textTransform: 'uppercase', letterSpacing: '0.05em',
                                    }}>{note}</span>
                                ))}
                            </div>
                        </div>

                        {/* Specs */}
                        <div className="modal-specs-grid" style={{
                            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                            gap: '10px', marginBottom: '24px',
                        }}>
                            {[
                                { label: 'Volume', value: currentSize ? currentSize.volume : '100ml' },
                                { label: 'Type', value: 'Eau de Parfum' },
                                { label: 'Origin', value: 'France' },
                            ].map((spec) => (
                                <div key={spec.label} style={{
                                    padding: '10px', borderRadius: '10px',
                                    background: 'rgba(212,165,116,0.03)',
                                    border: '1px solid rgba(212,165,116,0.06)',
                                    textAlign: 'center',
                                }}>
                                    <p style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,165,116,0.3)' }}>
                                        {spec.label}
                                    </p>
                                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                                        {spec.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <a
                            href={getWhatsAppLink(product.name, currentSize ? currentSize.volume : '')}
                            target="_blank" rel="noopener noreferrer"
                            className="modal-cta-btn"
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                gap: '10px', width: '100%', padding: '14px',
                                borderRadius: '14px', fontSize: '13px', fontWeight: 700,
                                textTransform: 'uppercase', letterSpacing: '0.1em',
                                textDecoration: 'none',
                                background: 'linear-gradient(135deg, #D4A574, #B07D4F)',
                                color: '#0B0D14',
                                transition: 'transform 0.2s, box-shadow 0.3s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'scale(1.02)'
                                e.currentTarget.style.boxShadow = '0 0 30px rgba(212,165,116,0.2)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'scale(1)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Beli via WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalSlideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
        </div>
    )
}
