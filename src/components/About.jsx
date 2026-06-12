import React from 'react'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] },
})

const facts = [
  { label: 'Локация',     value: 'Бишкек, Кыргызстан' },
  { label: 'Образование', value: 'IT-факультет, 3 курс' },
  { label: 'Фокус',       value: 'Full-Stack Development' },
  { label: 'Доступен',    value: 'Для работы и стажировок' },
]

const languages = [
  { lang: 'Кыргызский',      level: 'Родной' },
  { lang: 'Русский',          level: 'Свободно' },
  { lang: 'Жестовый (КЖЯ)',   level: 'Свободно' },
  { lang: 'Английский',       level: 'Средний (B1)' },
  { lang: 'Арабский',         level: 'Базовый' },
]

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--forest)' }}>
      <div className="container section-wrapper">
        <motion.span className="section-label" {...fadeUp(0)}>
          О себе
        </motion.span>

        {/* Big statement */}
        <motion.h2
          style={{
            color: 'var(--mint)',
            maxWidth: '720px',
            marginBottom: 'var(--space-6)',
            lineHeight: 1.15,
          }}
          {...fadeUp(0.1)}
        >
          Я слышу мир иначе —<br />
          <span style={{ color: 'var(--ember)' }}>и именно поэтому вижу его точнее.</span>
        </motion.h2>

        <motion.p style={{ maxWidth: '620px', marginBottom: 'var(--space-12)' }} {...fadeUp(0.2)}>
          С детства ношу слуховой аппарат и владею жестовым языком (КЖЯ/РЖЯ).
          Двойной способ восприятия — через звук и жест одновременно — научил меня
          замечать то, что другие пропускают: детали интерфейса, разрывы в UX,
          моменты, где пользователь теряется. Это не ограничение. Это профессиональный инструмент.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-10)',
        }} className="about-grid">
          {/* Facts */}
          <motion.div {...fadeUp(0.25)}>
            <h3 style={{ color: 'var(--mint)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)', fontFamily: 'var(--font-display)' }}>
              Основное
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {facts.map(({ label, value }) => (
                <div key={label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--space-3) 0',
                  borderBottom: '1px solid var(--border-subtle)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    {label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--mint)', fontWeight: 500 }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div {...fadeUp(0.35)}>
            <h3 style={{ color: 'var(--mint)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)', fontFamily: 'var(--font-display)' }}>
              Языки
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {languages.map(({ lang, level }) => (
                <div key={lang} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'rgba(30,46,43,0.6)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--mint)' }}>
                    {lang}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: lang.includes('Жест') ? 'var(--ember)' : 'var(--text-muted)',
                    fontWeight: lang.includes('Жест') ? 600 : 400,
                  }}>
                    {level}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Value props */}
        <motion.div
          style={{
            marginTop: 'var(--space-12)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-6)',
          }}
          {...fadeUp(0.4)}
          className="value-grid"
        >
          {[
            {
              icon: '◎',
              title: 'Визуальное мышление',
              desc: 'Воспринимаю интерфейс целиком — как систему образов, а не набор элементов.',
            },
            {
              icon: '◈',
              title: 'Эмпатия к пользователю',
              desc: 'Знаю, как это — когда тебя не слышат. Проектирую так, чтобы слышали всех.',
            },
            {
              icon: '◆',
              title: 'Внимание к деталям',
              desc: 'Когда один канал восприятия усилен — глаза не упускают ничего.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{
              padding: 'var(--space-6)',
              background: 'rgba(30,46,43,0.4)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              transition: 'border-color var(--transition)',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--ember)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
            >
              <span style={{ fontSize: '1.5rem', color: 'var(--ember)', display: 'block', marginBottom: 'var(--space-3)' }} aria-hidden="true">
                {icon}
              </span>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', color: 'var(--mint)', marginBottom: 'var(--space-2)', fontWeight: 600 }}>
                {title}
              </h4>
              <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .value-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
