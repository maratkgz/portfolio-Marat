import React from 'react'
import { motion } from 'framer-motion'

const skillGroups = [
  {
    category: 'Фронтенд',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    category: 'Бэкенд',
    skills: ['Node.js', 'Express', 'Python'],
  },
  {
    category: 'Базы данных',
    skills: ['MongoDB', 'SQL'],
  },
  {
    category: 'Инструменты',
    skills: ['Git', 'Figma', 'VS Code', 'Vite'],
  },
  {
    category: 'Доступность',
    skills: ['WCAG', 'Визуальный UX', '🤟 КЖЯ/РЖЯ'],
  },
  {
    category: 'Soft Skills',
    skills: ['Аналитика', 'Эмпатия', 'Обучаемость', 'Коммуникация'],
  },
]

export default function Skills() {
  return (
    <section id="skills" style={{ background: 'var(--forest)' }}>
      <div className="container section-wrapper">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Навыки
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Мой стек
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--space-8)',
        }} className="skills-grid">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: gi * 0.08 }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: 'var(--space-3)',
              }}>
                {group.category}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="tag"
                    whileHover={{ scale: 1.05 }}
                    style={{
                      padding: 'var(--space-2) var(--space-4)',
                      fontSize: 'var(--text-sm)',
                      ...(skill.includes('КЖЯ') ? {
                        borderColor: 'var(--ember)',
                        color: 'var(--ember)',
                        fontWeight: 600,
                      } : {}),
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
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
