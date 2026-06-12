import React from 'react'
import { motion } from 'framer-motion'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: 'var(--charcoal)',
      borderTop: '1px solid var(--border-subtle)',
      padding: 'var(--space-10) 0',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-4)',
      }}>
        {/* Name + sign */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-base)',
            color: 'var(--mint)',
            fontWeight: 600,
          }}>
            Baktiyar uulu Marat
          </span>
          <span
            style={{ fontSize: '1.25rem', lineHeight: 1 }}
            title="Жестовый язык (КЖЯ/РЖЯ)"
            aria-label="Жестовый язык КЖЯ/РЖЯ"
          >
            🤟
          </span>
        </motion.div>

        {/* Copyright */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
        }}>
          © {year} — Собран с заботой и вниманием к деталям
        </span>

        {/* Links */}
        <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/maratbaktiyar' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/maratbaktiyar' },
            { label: 'Telegram', href: 'https://t.me/maratbaktiyar' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} профиль`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                transition: 'color var(--transition)',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--ember)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
