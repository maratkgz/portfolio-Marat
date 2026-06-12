import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
})

function DotGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const COLS = 14
    const ROWS = 18
    const EMBER = '#ec5e27'
    const MINT  = 'rgba(218,241,222,0.18)'

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const colGap = w / (COLS + 1)
      const rowGap = h / (ROWS + 1)

      for (let r = 1; r <= ROWS; r++) {
        for (let c = 1; c <= COLS; c++) {
          const x = c * colGap
          const y = r * rowGap

          // Wave offset
          const wave = Math.sin(t * 0.6 + c * 0.5 + r * 0.3) * 0.5 + 0.5
          const dist = Math.sqrt((c - COLS / 2) ** 2 + (r - ROWS / 2) ** 2)
          const glow = Math.max(0, 1 - dist / 9)

          if (wave > 0.78 && glow > 0.2) {
            ctx.beginPath()
            ctx.arc(x, y, 2.5, 0, Math.PI * 2)
            ctx.fillStyle = EMBER
            ctx.globalAlpha = wave * glow
            ctx.fill()
          } else {
            ctx.beginPath()
            ctx.arc(x, y, 1.5, 0, Math.PI * 2)
            ctx.fillStyle = MINT
            ctx.globalAlpha = 0.6 + wave * 0.4
            ctx.fill()
          }
        }
      }

      ctx.globalAlpha = 1
      t += 0.018
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}

export default function Hero() {
  const scrollToProjects = (e) => {
    e.preventDefault()
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `
          radial-gradient(ellipse 80% 60% at 70% 50%, rgba(236,94,39,0.06) 0%, transparent 70%),
          var(--forest)
        `,
        paddingTop: '96px',
        paddingBottom: 'var(--space-16)',
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-12)',
          alignItems: 'center',
        }}
          className="hero-grid"
        >
          {/* Left — text */}
          <div style={{ paddingLeft: 'var(--space-8)', position: 'relative' }}>
            {/* Ember thread */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: '8px',
              bottom: '8px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--ember), rgba(236,94,39,0.2))',
            }} aria-hidden="true" />

            <motion.span
              className="section-label"
              style={{ marginBottom: 'var(--space-4)' }}
              {...fadeUp(0.1)}
            >
              Привет, я — Марат
            </motion.span>

            <motion.h1
              style={{ color: 'var(--mint)', lineHeight: 1.08, marginBottom: 'var(--space-4)' }}
              {...fadeUp(0.2)}
            >
              Baktiyar uulu<br />
              <span style={{ color: 'var(--ember)' }}>Marat</span>
            </motion.h1>

            <motion.p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                color: 'var(--text-muted)',
                fontWeight: 500,
                marginBottom: 'var(--space-6)',
              }}
              {...fadeUp(0.3)}
            >
              Full-Stack Developer &amp; IT Student
            </motion.p>

            <motion.blockquote
              style={{
                borderLeft: '2px solid var(--ember)',
                paddingLeft: 'var(--space-4)',
                margin: '0 0 var(--space-8)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                color: 'var(--mint)',
                fontStyle: 'normal',
                lineHeight: 1.6,
              }}
              {...fadeUp(0.4)}
            >
              Я воспринимаю мир иначе —<br />
              <span style={{ color: 'var(--text-muted)' }}>
                и именно это делает мои решения нестандартными
              </span>
            </motion.blockquote>

            <motion.div
              style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}
              {...fadeUp(0.5)}
            >
              <a href="/cv-marat.pdf" download className="btn btn-primary">
                Скачать резюме ↓
              </a>
              <a href="#projects" onClick={scrollToProjects} className="btn btn-outline">
                Посмотреть проекты →
              </a>
            </motion.div>
          </div>

          {/* Right — dot grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              height: '460px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: 'rgba(30, 46, 43, 0.5)',
              border: '1px solid var(--border-subtle)',
              position: 'relative',
            }}
          >
            <DotGrid />
            {/* Overlay gradient */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, transparent 40%, var(--forest) 90%)',
              pointerEvents: 'none',
            }} aria-hidden="true" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{
            marginTop: 'var(--space-16)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            style={{
              width: '1px',
              height: '48px',
              background: 'linear-gradient(to bottom, var(--ember), transparent)',
            }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
          }}>
            scroll
          </span>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .hero-grid > div:last-child {
            height: 280px !important;
          }
        }
      `}</style>
    </section>
  )
}
