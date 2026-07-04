import React from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import ThreadNode from './ThreadNode'

export default function HowIWork() {
  const { t } = useLang()
  const { processUI } = t

  return (
    <section id="process" style={{ background: 'var(--pine)' }}>
      <div className="container section-wrapper">
        <ThreadNode id="process" label={t.thread.process} />

        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {processUI.label}
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {processUI.title}
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginTop: 'var(--space-8)', maxWidth: '640px' }}>
          {processUI.steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'flex-start' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--ember)',
                  fontWeight: 700,
                  border: '1.5px solid var(--ember)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--mint)', marginBottom: 'var(--space-2)', fontWeight: 600 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
