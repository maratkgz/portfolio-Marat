import React from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'
import ThreadNode from './ThreadNode'
import icons from '../data/icons'

export default function Skills() {
  const { t } = useLang()
  const { skillsUI } = t

  return (
    <section id="skills" style={{ background: 'var(--forest)' }}>
      <div className="container section-wrapper">
        <ThreadNode id="skills" label={t.thread.skills} />

        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {skillsUI.label}
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {skillsUI.title}
        </motion.h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--space-8)',
          }}
          className="skills-grid"
        >
          {skillsUI.groups.map((group, gi) => {
            const Icon = icons[group.icon]
            return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: gi * 0.08 }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: 'var(--space-3)',
                }}
              >
                <Icon size={15} strokeWidth={1.8} color="var(--ember)" aria-hidden="true" />
                {group.category}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="tag"
                    whileHover={{ scale: 1.05 }}
                    style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
