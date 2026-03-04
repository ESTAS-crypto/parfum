import { getWhatsAppLink } from '../data/products'

export default function ProductCard({ product, onSelect }) {
    return (
        <div
            onClick={() => onSelect(product)}
            style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'linear-gradient(160deg, #141728, #0e1020)',
                border: '1px solid rgba(212,165,116,0.06)',
                transition: 'all 0.4s ease',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,165,116,0.12)'
                e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'rgba(212,165,116,0.06)'
            }}
        >
            {/* Badge */}
            {product.badge && (
                <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    zIndex: 5,
                    padding: '5px 14px',
                    fontSize: '9px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #D4A574, #B07D4F)',
                    color: '#0B0D14',
                }}>
                    {product.badge}
                </div>
            )}

            {/* Click hint icon */}
            <div style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                zIndex: 5,
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'rgba(11,13,20,0.5)',
                border: '1px solid rgba(212,165,116,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: 'rgba(212,165,116,0.4)',
            }}>
                ↗
            </div>

            {/* Image */}
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}>
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                {/* Gradient overlay at bottom */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, #10121A, transparent 60%)',
                }} />
            </div>

            {/* Info */}
            <div style={{ padding: '16px 18px 18px' }}>
                <h3 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#fff',
                    marginBottom: '6px',
                }}>
                    {product.name}
                </h3>
                <p style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#D4A574',
                    marginBottom: '10px',
                }}>
                    {product.price}
                </p>
                <p style={{
                    fontSize: '12px',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.3)',
                    marginBottom: '14px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {product.description}
                </p>

                {/* View Detail hint */}
                <div style={{
                    fontSize: '10px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(212,165,116,0.35)',
                    fontWeight: 600,
                    textAlign: 'center',
                    padding: '10px 0 2px',
                    borderTop: '1px solid rgba(212,165,116,0.06)',
                }}>
                    Tap untuk detail →
                </div>
            </div>
        </div>
    )
}
