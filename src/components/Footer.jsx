import React from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'

export default function Footer() {
  const { t, lang } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--pine)', borderTop: '1px solid var(--border-subtle)', padding: 'var(--space-10) 0' }}>
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}
      >
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', color: 'var(--mint)', fontWeight: 600 }}>
            Baktiyar uulu Marat
          </span>
          <span
            style={{ fontSize: '1.25rem', lineHeight: 1 }}
            title={lang === 'ru' ? 'Жестовый язык (КЖЯ/РЖЯ)' : 'Sign language (RSL)'}
            aria-label={lang === 'ru' ? 'Жестовый язык КЖЯ/РЖЯ' : 'Sign language RSL'}
          >
            🫰🏻
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            © {year}
          </span>
        </motion.div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
          }}
        >
          {t.footerUI.builtWith}
        </span>
      </div>
    </footer>
  )
}
