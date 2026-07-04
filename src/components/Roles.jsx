import React from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import ThreadNode from './ThreadNode'
import icons from '../data/icons'

export default function Roles() {
  const { t } = useLang()
  const { roles } = t

  return (
    <section id="roles" style={{ background: 'var(--charcoal)' }}>
      <div className="container section-wrapper">
        <ThreadNode id="roles" label={t.thread.roles} />

        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {roles.label}
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {roles.title}
        </motion.h2>

        <div
          style={{
            marginTop: 'var(--space-8)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-6)',
          }}
          className="roles-grid"
        >
          {roles.items.map(({ icon, title, text }, i) => {
            const Icon = icons[icon]
            return (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{
                padding: 'var(--space-6)',
                background: 'rgba(15,40,35,0.4)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--ember)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
            >
              <Icon
                size={30}
                strokeWidth={1.6}
                color="var(--ember)"
                style={{ display: 'block', marginBottom: 'var(--space-4)' }}
                aria-hidden="true"
              />
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--mint)',
                  marginBottom: 'var(--space-3)',
                  fontWeight: 600,
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.65 }}>{text}</p>
            </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .roles-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
