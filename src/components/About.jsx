import React from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import ThreadNode from './ThreadNode'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] },
})

export default function About() {
  const { t } = useLang()
  const { about } = t

  return (
    <section id="about" style={{ background: 'var(--forest)' }}>
      <div className="container section-wrapper">
        <ThreadNode id="about" label={t.thread.about} />

        <motion.span className="section-label" {...fadeUp(0)}>
          {about.label}
        </motion.span>

        <motion.h2
          style={{ color: 'var(--mint)', maxWidth: '720px', marginBottom: 'var(--space-8)', lineHeight: 1.15 }}
          {...fadeUp(0.1)}
        >
          {about.title}
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: '760px' }}>
          {about.paragraphs.map((paragraph, i) => (
            <motion.p key={i} style={{ fontSize: 'var(--text-base)' }} {...fadeUp(0.15 + i * 0.08)}>
              {paragraph}
            </motion.p>
          ))}
        </div>

        <motion.p
          style={{
            marginTop: 'var(--space-8)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
            letterSpacing: '0.03em',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 'var(--space-6)',
          }}
          {...fadeUp(0.5)}
        >
          {about.footNote}
        </motion.p>
      </div>
    </section>
  )
}
