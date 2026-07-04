import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import ThreadNode from './ThreadNode'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
})

const EMBER = '#ec5e27'
const MINT = 'rgba(218,241,222,0.85)'
const SHELLS = [
  { count: 9, radiusRatio: 0.22, speed: 0.014 },
  { count: 13, radiusRatio: 0.36, speed: -0.009 },
  { count: 17, radiusRatio: 0.48, speed: 0.006 },
]
const POINTER_RADIUS = 85
const POINTER_STRENGTH = 1.1
const BURST_RADIUS = 220
const BURST_STRENGTH = 26

// Interactive "energy core": orbiting particles pulled toward the pointer,
// click/tap fires a radial impulse — replaces the static dot grid with
// something the visitor can actually push around.
function EnergyCore({ onCharge }) {
  const canvasRef = useRef(null)
  const pointerRef = useRef({ x: -999, y: -999, active: false })
  const flashRef = useRef(0)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animId
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    if (!particlesRef.current.length) {
      const particles = []
      SHELLS.forEach((shell, shellIndex) => {
        for (let i = 0; i < shell.count; i++) {
          particles.push({
            shellIndex,
            angle: (i / shell.count) * Math.PI * 2,
            angularSpeed: shell.speed,
            radiusRatio: shell.radiusRatio,
            size: shellIndex === 0 ? 3 : 2,
            isEmber: (i + shellIndex) % 4 === 0,
            dispX: 0,
            dispY: 0,
            velX: 0,
            velY: 0,
          })
        }
      })
      particlesRef.current = particles
    }

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true }
    }
    const handlePointerLeave = () => {
      pointerRef.current.active = false
    }
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      particlesRef.current.forEach((p) => {
        const w = canvas.offsetWidth
        const h = canvas.offsetHeight
        const cxOrigin = w / 2
        const cyOrigin = h / 2
        const minDim = Math.min(w, h)
        const baseX = cxOrigin + Math.cos(p.angle) * p.radiusRatio * minDim
        const baseY = cyOrigin + Math.sin(p.angle) * p.radiusRatio * minDim
        const x = baseX + p.dispX
        const y = baseY + p.dispY
        const dx = x - cx
        const dy = y - cy
        const dist = Math.hypot(dx, dy) || 0.001
        const impulse = BURST_STRENGTH * Math.max(0, 1 - dist / BURST_RADIUS)
        p.velX += (dx / dist) * impulse
        p.velY += (dy / dist) * impulse
      })
      flashRef.current = 1
      onCharge?.((c) => c + 1)
      if (reduceMotion) drawFrame()
    }

    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerleave', handlePointerLeave)
    canvas.addEventListener('click', handleClick)

    function drawFrame() {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const cx = w / 2
      const cy = h / 2
      const minDim = Math.min(w, h)
      ctx.clearRect(0, 0, w, h)

      const { x: px, y: py, active } = pointerRef.current
      flashRef.current *= 0.92

      // core glow
      const pulse = reduceMotion ? 0 : Math.sin(t * 1.4) * 3
      const coreRadius = 16 + pulse + flashRef.current * 14
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * 2.6)
      gradient.addColorStop(0, `rgba(236,94,39,${0.9 + flashRef.current * 0.1})`)
      gradient.addColorStop(0.5, 'rgba(236,94,39,0.25)')
      gradient.addColorStop(1, 'rgba(236,94,39,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, coreRadius * 2.6, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.beginPath()
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2)
      ctx.fillStyle = EMBER
      ctx.fill()

      particlesRef.current.forEach((p) => {
        if (!reduceMotion) p.angle += p.angularSpeed
        const baseX = cx + Math.cos(p.angle) * p.radiusRatio * minDim
        const baseY = cy + Math.sin(p.angle) * p.radiusRatio * minDim

        if (active) {
          const dx = px - (baseX + p.dispX)
          const dy = py - (baseY + p.dispY)
          const dist = Math.hypot(dx, dy)
          if (dist < POINTER_RADIUS && dist > 0.001) {
            const f = (1 - dist / POINTER_RADIUS) * POINTER_STRENGTH
            p.velX += (dx / dist) * f
            p.velY += (dy / dist) * f
          }
        }

        p.velX *= 0.9
        p.velY *= 0.9
        p.dispX += p.velX
        p.dispY += p.velY
        p.dispX *= 0.94
        p.dispY *= 0.94

        const x = baseX + p.dispX
        const y = baseY + p.dispY

        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.isEmber ? EMBER : MINT
        ctx.globalAlpha = p.isEmber ? 0.85 : 0.55
        ctx.fill()
      })
      ctx.globalAlpha = 1
    }

    const draw = () => {
      drawFrame()
      t += 0.02
      animId = requestAnimationFrame(draw)
    }

    if (reduceMotion) {
      drawFrame()
    } else {
      draw()
    }

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
      canvas.removeEventListener('click', handleClick)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [onCharge])

  return (
    <canvas
      ref={canvasRef}
      role="button"
      tabIndex={-1}
      aria-hidden="true"
      style={{ width: '100%', height: '100%', display: 'block', cursor: 'pointer', touchAction: 'manipulation' }}
    />
  )
}

export default function Hero() {
  const { t } = useLang()
  const [charge, setCharge] = useState(0)

  const scrollToProjects = (e) => {
    e.preventDefault()
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="section-wrapper thread-start"
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
      <ThreadNode id="hero" label={t.thread.hero} />

      <div className="container" style={{ width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-12)',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left — text */}
          <div style={{ position: 'relative' }}>
            <motion.span
              className="section-label"
              style={{ marginBottom: 'var(--space-4)' }}
              {...fadeUp(0.1)}
            >
              {t.hero.kicker}
            </motion.span>

            <motion.h1
              style={{ color: 'var(--mint)', lineHeight: 1.08, marginBottom: 'var(--space-4)' }}
              {...fadeUp(0.2)}
            >
              {t.hero.titleLine1}
              <br />
              <span style={{ color: 'var(--ember)' }}>{t.hero.titleName}</span>
            </motion.h1>

            <motion.p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                color: 'var(--text-muted)',
                fontWeight: 600,
                marginBottom: 'var(--space-6)',
              }}
              {...fadeUp(0.3)}
            >
              {t.hero.subtitle}
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
              {t.hero.quoteLine1}
              <br />
              <span style={{ color: 'var(--text-muted)' }}>{t.hero.quoteLine2}</span>
            </motion.blockquote>

            <motion.div
              style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}
              {...fadeUp(0.5)}
            >
              <a href="/cv-marat.pdf" download className="btn btn-primary">
                {t.hero.ctaResume}
              </a>
              <a href="#projects" onClick={scrollToProjects} className="btn btn-outline">
                {t.hero.ctaProjects}
              </a>
            </motion.div>
          </div>

          {/* Right — interactive energy core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              height: '460px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              background: 'rgba(15, 40, 35, 0.5)',
              border: '1px solid var(--border-subtle)',
              position: 'relative',
            }}
          >
            <EnergyCore onCharge={setCharge} />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, transparent 40%, var(--forest) 90%)',
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            />

            <div
              style={{
                position: 'absolute',
                top: 'var(--space-4)',
                right: 'var(--space-4)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.08em',
                color: 'var(--ember)',
                background: 'rgba(15,40,35,0.7)',
                border: '1px solid var(--ember-mid)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                pointerEvents: 'none',
              }}
            >
              ⚡ {t.hero.energyLabel} {charge}
            </div>

            {charge === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                style={{
                  position: 'absolute',
                  bottom: 'var(--space-4)',
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.05em',
                  pointerEvents: 'none',
                }}
              >
                {t.hero.energyHint}
              </motion.div>
            )}
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
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
            }}
          >
            {t.hero.scroll}
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
