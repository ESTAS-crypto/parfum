import { useState, useRef, useEffect } from 'react'
import { products, getWhatsAppLink } from '../data/products'

const quizSteps = [
    {
        question: 'Apa mood yang ingin kamu rasakan?',
        options: [
            { label: '🔥 Bold & Powerful', value: 'bold', icon: '🔥' },
            { label: '🌹 Romantic & Sensual', value: 'romantic', icon: '🌹' },
            { label: '✨ Glamorous & Luxurious', value: 'glamorous', icon: '✨' },
            { label: '🌙 Mysterious & Elegant', value: 'mysterious', icon: '🌙' },
        ],
    },
    {
        question: 'Kapan kamu biasa memakai parfum?',
        options: [
            { label: '🏢 Ke kantor / meeting', value: 'formal', icon: '🏢' },
            { label: '🌃 Dinner / date night', value: 'night', icon: '🌃' },
            { label: '🎉 Pesta / acara spesial', value: 'party', icon: '🎉' },
            { label: '🌿 Sehari-hari / casual', value: 'casual', icon: '🌿' },
        ],
    },
    {
        question: 'Aroma mana yang paling kamu suka?',
        options: [
            { label: '🪵 Woody & Earthy', value: 'woody', icon: '🪵' },
            { label: '🌸 Floral & Sweet', value: 'floral', icon: '🌸' },
            { label: '🍊 Fresh & Citrus', value: 'fresh', icon: '🍊' },
            { label: '🍦 Vanilla & Warm', value: 'warm', icon: '🍦' },
        ],
    },
]

// Scoring: each answer maps to product preferences
const scoreMap = {
    bold: { 1: 3, 2: 0, 3: 1, 4: 1 },
    romantic: { 1: 0, 2: 3, 3: 1, 4: 2 },
    glamorous: { 1: 1, 2: 1, 3: 3, 4: 1 },
    mysterious: { 1: 1, 2: 1, 3: 1, 4: 3 },
    formal: { 1: 2, 2: 1, 3: 2, 4: 1 },
    night: { 1: 1, 2: 2, 3: 1, 4: 3 },
    party: { 1: 1, 2: 1, 3: 3, 4: 1 },
    casual: { 1: 1, 2: 2, 3: 1, 4: 1 },
    woody: { 1: 3, 2: 0, 3: 1, 4: 1 },
    floral: { 1: 0, 2: 3, 3: 1, 4: 2 },
    fresh: { 1: 0, 2: 0, 3: 3, 4: 1 },
    warm: { 1: 1, 2: 2, 3: 1, 4: 3 },
}

function getRecommendations(answers) {
    const scores = { 1: 0, 2: 0, 3: 0, 4: 0 }
    answers.forEach((ans) => {
        const map = scoreMap[ans]
        if (map) {
            Object.keys(map).forEach((id) => {
                scores[id] += map[id]
            })
        }
    })
    // Sort all products by score (highest first)
    const sorted = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .map(([id]) => products.find((p) => p.id === Number(id)))
        .filter(Boolean)
    return sorted
}

export default function ScentFinder() {
    const [started, setStarted] = useState(false)
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState([])
    const [results, setResults] = useState(null)
    const [fadeIn, setFadeIn] = useState(true)
    const sectionRef = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.15 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const handleAnswer = (value) => {
        setFadeIn(false)
        setTimeout(() => {
            const newAnswers = [...answers, value]
            setAnswers(newAnswers)

            if (step < quizSteps.length - 1) {
                setStep(step + 1)
            } else {
                setResults(getRecommendations(newAnswers))
            }
            setFadeIn(true)
        }, 250)
    }

    const reset = () => {
        setFadeIn(false)
        setTimeout(() => {
            setStarted(false)
            setStep(0)
            setAnswers([])
            setResults(null)
            setFadeIn(true)
        }, 250)
    }

    const currentStep = quizSteps[step]
    const progress = results ? 100 : ((step) / quizSteps.length) * 100

    return (
        <section
            ref={sectionRef}
            style={{
                position: 'relative',
                padding: 'clamp(40px, 10vw, 80px) clamp(12px, 4vw, 24px)',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, #0B0D14, #0F1220, #0B0D14)',
            }}
        >
            {/* Background glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px', height: '600px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212,165,116,0.04), transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div
                style={{
                    position: 'relative', zIndex: 10,
                    maxWidth: '700px', margin: '0 auto',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.8s ease, transform 0.8s ease',
                }}
            >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
                        <div style={{ width: '50px', height: '1px', background: 'rgba(212,165,116,0.25)' }} />
                        <span style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 500, color: 'rgba(212,165,116,0.6)' }}>
                            Personalized
                        </span>
                        <div style={{ width: '50px', height: '1px', background: 'rgba(212,165,116,0.25)' }} />
                    </div>
                    <h2 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(28px, 5vw, 48px)',
                        fontWeight: 700, marginBottom: '14px',
                    }}>
                        <span style={{ color: '#fff' }}>Find Your </span>
                        <span className="gold-shimmer">Perfect Scent</span>
                    </h2>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, maxWidth: '450px', margin: '0 auto' }}>
                        Jawab 3 pertanyaan singkat dan kami akan merekomendasikan parfum yang paling cocok untukmu.
                    </p>
                </div>

                {/* Quiz Card */}
                <div style={{
                    borderRadius: '24px',
                    border: '1px solid rgba(212,165,116,0.08)',
                    background: 'linear-gradient(160deg, rgba(20,23,40,0.9), rgba(14,16,32,0.9))',
                    padding: '32px 24px',
                    minHeight: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                }}>
                    {!started && !results && (
                        <div style={{
                            textAlign: 'center',
                            opacity: fadeIn ? 1 : 0,
                            transform: fadeIn ? 'scale(1)' : 'scale(0.95)',
                            transition: 'all 0.3s ease',
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🧪</div>
                            <h3 style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontSize: '22px', fontWeight: 600, color: '#fff', marginBottom: '12px',
                            }}>
                                Scent Quiz
                            </h3>
                            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginBottom: '28px', lineHeight: 1.7 }}>
                                Temukan parfum yang sesuai dengan kepribadian dan gaya hidupmu dalam 30 detik!
                            </p>
                            <button
                                onClick={() => { setStarted(true); setFadeIn(true) }}
                                style={{
                                    padding: '14px 40px', borderRadius: '14px',
                                    fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em',
                                    textTransform: 'uppercase', border: 'none', cursor: 'pointer',
                                    background: 'linear-gradient(135deg, #D4A574, #B07D4F)',
                                    color: '#0B0D14',
                                    transition: 'transform 0.2s, box-shadow 0.3s',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'scale(1.05)'
                                    e.currentTarget.style.boxShadow = '0 0 30px rgba(212,165,116,0.2)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'scale(1)'
                                    e.currentTarget.style.boxShadow = 'none'
                                }}
                            >
                                Mulai Quiz →
                            </button>
                        </div>
                    )}

                    {started && !results && currentStep && (
                        <div style={{
                            width: '100%',
                            opacity: fadeIn ? 1 : 0,
                            transform: fadeIn ? 'translateX(0)' : 'translateX(20px)',
                            transition: 'all 0.3s ease',
                        }}>
                            {/* Progress bar */}
                            <div style={{ marginBottom: '28px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,165,116,0.4)' }}>
                                        Pertanyaan {step + 1} / {quizSteps.length}
                                    </span>
                                    <span style={{ fontSize: '10px', color: 'rgba(212,165,116,0.3)' }}>
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                                <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(212,165,116,0.08)' }}>
                                    <div style={{
                                        height: '100%', borderRadius: '2px',
                                        background: 'linear-gradient(90deg, #D4A574, #B07D4F)',
                                        width: `${progress}%`,
                                        transition: 'width 0.4s ease',
                                    }} />
                                </div>
                            </div>

                            {/* Question */}
                            <h3 style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontSize: '20px', fontWeight: 600, color: '#fff',
                                textAlign: 'center', marginBottom: '24px',
                            }}>
                                {currentStep.question}
                            </h3>

                            {/* Options */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                {currentStep.options.map((opt, i) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleAnswer(opt.value)}
                                        style={{
                                            padding: '16px 14px',
                                            borderRadius: '14px',
                                            border: '1px solid rgba(212,165,116,0.1)',
                                            background: 'rgba(212,165,116,0.03)',
                                            color: 'rgba(255,255,255,0.6)',
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            textAlign: 'center',
                                            animation: `quizOptionIn 0.4s ease ${i * 0.08}s both`,
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.3)'
                                            e.currentTarget.style.background = 'rgba(212,165,116,0.08)'
                                            e.currentTarget.style.color = '#D4A574'
                                            e.currentTarget.style.transform = 'translateY(-2px)'
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.1)'
                                            e.currentTarget.style.background = 'rgba(212,165,116,0.03)'
                                            e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                                            e.currentTarget.style.transform = 'translateY(0)'
                                        }}
                                    >
                                        <div style={{ fontSize: '24px', marginBottom: '6px' }}>{opt.icon}</div>
                                        {opt.label.replace(opt.icon + ' ', '')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {results && results.length > 0 && (() => {
                        const bestMatch = results[0]
                        const otherMatches = results.slice(1)
                        return (
                            <div style={{
                                width: '100%',
                                opacity: fadeIn ? 1 : 0,
                                transform: fadeIn ? 'scale(1)' : 'scale(0.95)',
                                transition: 'all 0.4s ease',
                            }}>
                                {/* Celebration */}
                                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                    <div style={{ fontSize: '36px', marginBottom: '8px', animation: 'celebrateEmoji 0.6s ease' }}>✨</div>
                                    <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(212,165,116,0.5)' }}>
                                        Rekomendasi untukmu
                                    </p>
                                </div>

                                {/* Best Match Label */}
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px',
                                }}>
                                    <span style={{
                                        fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em',
                                        textTransform: 'uppercase', color: '#D4A574',
                                        padding: '4px 12px', borderRadius: '10px',
                                        background: 'rgba(212,165,116,0.1)',
                                        border: '1px solid rgba(212,165,116,0.15)',
                                    }}>🏆 Best Match</span>
                                    <div style={{ flex: 1, height: '1px', background: 'rgba(212,165,116,0.08)' }} />
                                </div>

                                {/* Best Match Product */}
                                <div className="scent-best-match-card" style={{
                                    padding: '16px',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(212,165,116,0.12)',
                                    background: 'rgba(0,0,0,0.3)',
                                    marginBottom: '12px',
                                }}>
                                    <img
                                        src={bestMatch.image}
                                        alt={bestMatch.name}
                                        style={{ width: '120px', height: '150px', objectFit: 'cover', borderRadius: '12px' }}
                                    />
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px' }}>
                                        {bestMatch.badge && (
                                            <span className="scent-badge" style={{
                                                padding: '3px 10px', fontSize: '8px', fontWeight: 700,
                                                textTransform: 'uppercase', letterSpacing: '0.12em',
                                                borderRadius: '12px',
                                                background: 'linear-gradient(135deg, #D4A574, #B07D4F)',
                                                color: '#0B0D14',
                                            }}>{bestMatch.badge}</span>
                                        )}
                                        <h4 style={{
                                            fontFamily: "'Playfair Display', Georgia, serif",
                                            fontSize: '20px', fontWeight: 700, color: '#fff',
                                        }}>{bestMatch.name}</h4>
                                        <p style={{ fontSize: '16px', fontWeight: 700, color: '#D4A574' }}>{bestMatch.price}</p>
                                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
                                            {bestMatch.description}
                                        </p>
                                        <div className="scent-notes" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                                            {bestMatch.notes.map(n => (
                                                <span key={n} style={{
                                                    fontSize: '9px', padding: '3px 8px', borderRadius: '10px',
                                                    border: '1px solid rgba(212,165,116,0.15)', color: 'rgba(212,165,116,0.5)',
                                                    textTransform: 'uppercase', letterSpacing: '0.05em',
                                                }}>{n}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Best Match WhatsApp Button */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                                    <a
                                        href={getWhatsAppLink(bestMatch.name)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                                            padding: '12px 28px', borderRadius: '12px',
                                            fontSize: '12px', fontWeight: 700, textTransform: 'uppercase',
                                            letterSpacing: '0.08em', textDecoration: 'none',
                                            background: 'linear-gradient(135deg, #D4A574, #B07D4F)',
                                            color: '#0B0D14',
                                            transition: 'transform 0.2s',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <svg style={{ width: '14px', height: '14px' }} fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Beli Sekarang
                                    </a>
                                </div>

                                {/* Other Matches Section */}
                                {otherMatches.length > 0 && (
                                    <>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px',
                                        }}>
                                            <span style={{
                                                fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em',
                                                textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
                                            }}>Juga cocok untukmu</span>
                                            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                                        </div>

                                        <div className="scent-other-grid" style={{
                                            marginBottom: '24px',
                                        }}>
                                            {otherMatches.map((product, i) => (
                                                <div
                                                    key={product.id}
                                                    style={{
                                                        borderRadius: '14px',
                                                        border: '1px solid rgba(212,165,116,0.08)',
                                                        background: 'rgba(0,0,0,0.25)',
                                                        padding: '12px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        animation: `quizOptionIn 0.4s ease ${(i + 1) * 0.12}s both`,
                                                        transition: 'border-color 0.3s, transform 0.2s',
                                                    }}
                                                    onMouseEnter={e => {
                                                        e.currentTarget.style.borderColor = 'rgba(212,165,116,0.2)'
                                                        e.currentTarget.style.transform = 'translateY(-2px)'
                                                    }}
                                                    onMouseLeave={e => {
                                                        e.currentTarget.style.borderColor = 'rgba(212,165,116,0.08)'
                                                        e.currentTarget.style.transform = 'translateY(0)'
                                                    }}
                                                >
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        style={{
                                                            width: '100%', height: '90px', objectFit: 'cover',
                                                            borderRadius: '10px',
                                                        }}
                                                    />
                                                    <h5 style={{
                                                        fontFamily: "'Playfair Display', Georgia, serif",
                                                        fontSize: '12px', fontWeight: 600, color: '#fff',
                                                        textAlign: 'center', lineHeight: 1.3,
                                                        margin: 0,
                                                    }}>{product.name}</h5>
                                                    <p style={{
                                                        fontSize: '11px', fontWeight: 700, color: '#D4A574',
                                                        margin: 0,
                                                    }}>{product.price}</p>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', justifyContent: 'center' }}>
                                                        {product.notes.slice(0, 2).map(n => (
                                                            <span key={n} className="scent-note-tag" style={{
                                                                fontSize: '7px', padding: '2px 6px', borderRadius: '8px',
                                                                border: '1px solid rgba(212,165,116,0.12)', color: 'rgba(212,165,116,0.45)',
                                                                textTransform: 'uppercase', letterSpacing: '0.03em',
                                                            }}>{n}</span>
                                                        ))}
                                                    </div>
                                                    <a
                                                        href={getWhatsAppLink(product.name)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            gap: '4px', width: '100%',
                                                            padding: '7px 0', borderRadius: '8px',
                                                            fontSize: '9px', fontWeight: 700, textTransform: 'uppercase',
                                                            letterSpacing: '0.06em', textDecoration: 'none',
                                                            border: '1px solid rgba(212,165,116,0.15)',
                                                            background: 'transparent',
                                                            color: '#D4A574',
                                                            transition: 'all 0.3s',
                                                            marginTop: 'auto',
                                                        }}
                                                        onMouseEnter={e => {
                                                            e.currentTarget.style.background = 'rgba(212,165,116,0.08)'
                                                            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.3)'
                                                        }}
                                                        onMouseLeave={e => {
                                                            e.currentTarget.style.background = 'transparent'
                                                            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.15)'
                                                        }}
                                                    >
                                                        <svg style={{ width: '10px', height: '10px' }} fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                        </svg>
                                                        Beli
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* Reset Button */}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        onClick={reset}
                                        style={{
                                            padding: '12px 28px', borderRadius: '12px',
                                            fontSize: '12px', fontWeight: 600, textTransform: 'uppercase',
                                            letterSpacing: '0.08em',
                                            border: '1px solid rgba(212,165,116,0.2)',
                                            background: 'transparent', color: '#D4A574', cursor: 'pointer',
                                            transition: 'all 0.3s',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = 'rgba(212,165,116,0.06)'
                                            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.35)'
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = 'transparent'
                                            e.currentTarget.style.borderColor = 'rgba(212,165,116,0.2)'
                                        }}
                                    >
                                        Coba Lagi ↻
                                    </button>
                                </div>
                            </div>
                        )
                    })()}
                </div>
            </div>

            <style>{`
        @keyframes quizOptionIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes celebrateEmoji {
          0% { transform: scale(0) rotate(-20deg); }
          60% { transform: scale(1.3) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>
        </section>
    )
}
