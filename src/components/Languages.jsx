import React from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import ThreadNode from './ThreadNode'

export default function Languages() {
  const { t } = useLang()
  const { languagesUI } = t

  return (
    <section id="languages" style={{ background: 'var(--forest)' }}>
      <div className="container section-wrapper">
        <ThreadNode id="languages" label={t.thread.languages} />

        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {languagesUI.label}
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {languagesUI.title}
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)', maxWidth: '640px' }} className="languages-grid">
          {languagesUI.items.map(({ lang, level }, i) => (
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--space-3) var(--space-4)',
                background: 'rgba(15,40,35,0.6)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--mint)' }}>
                {lang}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: lang.toLowerCase().includes('sign') || lang.includes('Жест') ? 'var(--ember)' : 'var(--text-muted)',
                  fontWeight: lang.toLowerCase().includes('sign') || lang.includes('Жест') ? 600 : 400,
                }}
              >
                {level}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .languages-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
