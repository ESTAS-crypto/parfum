import { useEffect, useRef } from 'react'

// =============================================
// Perfume Mist on Glass
// Titik-titik kecil air yang nempel di kaca
// setelah disemprot parfum — muncul saat scroll
// Kecil-kecil seperti embun, lalu perlahan turun
// =============================================

class MistDot {
    constructor(canvas, x, y) {
        this.canvas = canvas
        this.x = x ?? Math.random() * canvas.width
        this.y = y ?? Math.random() * canvas.height * 0.85
        // Ukuran KECIL — titik air sangat halus
        this.size = Math.random() * 1.7 + 0.8
        this.initialOpacity = Math.random() * 0.15 + 0.15
        this.opacity = this.initialOpacity

        // Diam dulu, lalu turun pelan
        this.stickTime = Math.random() * 120 + 120   // diam 2-4 detik
        this.slideTime = Math.random() * 180 + 120    // turun 2-5 detik
        this.fadeTime = 60                             // hilang 1 detik
        this.totalLife = this.stickTime + this.slideTime + this.fadeTime
        this.age = 0

        this.slideSpeed = 0
        this.maxSlide = Math.random() * 0.6 + 0.15
    }

    update() {
        this.age++

        if (this.age > this.stickTime) {
            // Mulai turun pelan
            this.slideSpeed += 0.002
            if (this.slideSpeed > this.maxSlide) this.slideSpeed = this.maxSlide
            this.y += this.slideSpeed

            // Fade out perlahan saat turun
            const slideProgress = (this.age - this.stickTime) / this.slideTime
            this.opacity = (1 - slideProgress) * (Math.random() * 0.1 + 0.3)
            this.size *= 0.9998
        }

        return this.age < this.totalLife && this.opacity > 0.01
    }

    draw(ctx) {
        ctx.save()
        ctx.globalAlpha = this.opacity

        // Titik air kecil — simple circle with tiny highlight
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 215, 235, ${this.opacity * 0.6})`
        ctx.fill()

        // Tiny bright center
        if (this.size > 1.5) {
            ctx.beginPath()
            ctx.arc(this.x - this.size * 0.2, this.y - this.size * 0.2, this.size * 0.3, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`
            ctx.fill()
        }

        // Subtle edge
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(180, 200, 230, ${this.opacity * 0.2})`
        ctx.lineWidth = 0.3
        ctx.stroke()

        ctx.restore()
    }
}

// Cursor sparkle
class Sparkle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 1.8 + 0.5
        this.speedX = (Math.random() - 0.5) * 1
        this.speedY = (Math.random() - 0.5) * 1
        this.opacity = 0.5
        this.life = Math.random() * 18 + 8
        this.maxLife = this.life
    }
    update() {
        this.x += this.speedX
        this.y += this.speedY
        this.speedX *= 0.95
        this.speedY *= 0.95
        this.life--
        this.opacity = (this.life / this.maxLife) * 0.35
        return this.life > 0
    }
    draw(ctx) {
        if (this.opacity <= 0) return
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.shadowColor = 'rgba(212, 165, 116, 0.3)'
        ctx.shadowBlur = 4
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 165, 116, ${this.opacity})`
        ctx.fill()
        ctx.restore()
    }
}

// Spawn a cluster of tiny mist dots (like spray residue on glass)
function spawnMistCluster(canvas, dots, centerX, centerY) {
    const count = Math.floor(Math.random() * 3 + 3) // 3-5 titik halus
    for (let i = 0; i < count; i++) {
        // Spread area — lingkaran besar
        const angle = Math.random() * Math.PI * 2
        const dist = Math.random() * 200 + 30
        const x = centerX + Math.cos(angle) * dist
        const y = centerY + Math.sin(angle) * dist
        // Pastikan dalam layar
        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
            dots.push(new MistDot(canvas, x, y))
        }
    }
}

export default function ParticleCanvas() {
    const canvasRef = useRef(null)
    const dotsRef = useRef([])
    const sparklesRef = useRef([])
    const animRef = useRef(null)
    const lastScrollRef = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        // Initial mist — sedikit titik awal
        spawnMistCluster(canvas, dotsRef.current,
            canvas.width * 0.5, canvas.height * 0.35)

        // SCROLL = spray parfum → titik air muncul di layar
        const handleScroll = () => {
            const scrollY = window.scrollY
            const delta = Math.abs(scrollY - lastScrollRef.current)

            if (delta > 200 && dotsRef.current.length < 15) {
                // Spawn cluster di posisi random
                const x = Math.random() * canvas.width
                const y = Math.random() * canvas.height
                spawnMistCluster(canvas, dotsRef.current, x, y)
                lastScrollRef.current = scrollY
            }
        }

        // Cursor sparkles
        const handleMouseMove = (e) => {
            if (Math.random() > 0.78) {
                sparklesRef.current.push(new Sparkle(e.clientX, e.clientY))
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('mousemove', handleMouseMove, { passive: true })

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update & draw mist dots
            dotsRef.current = dotsRef.current.filter(d => {
                const alive = d.update()
                if (alive) d.draw(ctx)
                return alive
            })

            // Update & draw sparkles
            sparklesRef.current = sparklesRef.current.filter(s => {
                const alive = s.update()
                if (alive) s.draw(ctx)
                return alive
            })

            animRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animRef.current)
            window.removeEventListener('resize', resize)
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 30,
                pointerEvents: 'none',
            }}
        />
    )
}
