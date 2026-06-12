import React from 'react'
import { motion } from 'framer-motion'

const events = [
  {
    year: '2023',
    ongoing: true,
    title: 'IT-факультет, Бишкек',
   description: 'Студент специальности «Прикладная информатика» Международного Кувейтского университета. Осваиваю разработку программного обеспечения, проектирование баз данных, веб-технологии и современные IT-инструменты. Активно применяю полученные знания в собственных проектах и практической разработке.' 
  },
  {
    year: '2023',
    ongoing: true,
    title: 'Кайрымдуу Жүрөк',
    description: 'Сооснователь и координатор благотворительного движения. Вместе с командой реализовал более 40 благотворительных и социальных проектов, направленных на поддержку различных групп населения. Курирую организацию мероприятий, управление командой, взаимодействие с партнёрами и подготовку аналитических и презентационных материалов.',
  },
]

export default function Timeline() {
  return (
    <section id="timeline" style={{ background: 'var(--charcoal)' }}>
      <div className="container section-wrapper">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Путь
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Как я здесь оказался
        </motion.h2>

        {/* Timeline track */}
        <div style={{ position: 'relative', paddingLeft: 'var(--space-10)', marginTop: 'var(--space-10)' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '7px',
            top: '8px',
            bottom: '8px',
            width: '2px',
            background: 'linear-gradient(to bottom, var(--ember), rgba(236,94,39,0.15))',
          }} aria-hidden="true" />

          {events.map((event, i) => (
            <motion.div
              key={event.year}
              style={{
                position: 'relative',
                marginBottom: i < events.length - 1 ? 'var(--space-10)' : 0,
              }}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Dot */}
              <div style={{
                position: 'absolute',
                left: 'calc(-1 * var(--space-10) + 2px)',
                top: '6px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'var(--ember)',
                border: '2px solid var(--charcoal)',
                boxShadow: '0 0 0 2px var(--ember)',
              }} aria-hidden="true" />

              {/* Year badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-3)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--ember)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}>
                  {event.year}
                </span>
                {event.ongoing && (
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-muted)',
                    padding: '2px 8px',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-full)',
                  }}>
                    н.в.
                  </span>
                )}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                color: 'var(--mint)',
                marginBottom: 'var(--space-2)',
                fontWeight: 600,
              }}>
                {event.title}
              </h3>

              <p style={{ maxWidth: '520px', fontSize: 'var(--text-base)' }}>
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
