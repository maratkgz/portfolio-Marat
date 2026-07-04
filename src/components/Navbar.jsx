import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../context/LangContext'

export default function Navbar() {
  const { lang, toggleLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled ? 'rgba(15, 40, 35, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(218, 241, 222, 0.08)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLink(e, '#hero')}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            color: 'var(--mint)',
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            minHeight: '44px',
            touchAction: 'manipulation',
          }}
          aria-label={t.nav.logoAria}
        >
          <span style={{ color: 'var(--ember)', fontWeight: 700 }}>MB</span>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span>Marat</span>
        </a>

        {/* Desktop nav */}
        <nav
          style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center' }}
          className="nav-desktop"
          aria-label={lang === 'ru' ? 'Основная навигация' : 'Main navigation'}
        >
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLink(e, link.href)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-muted)',
                fontWeight: 500,
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--mint)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={toggleLang}
            aria-label={t.nav.switchLangAria}
            style={{
              display: 'flex',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.05em',
              background: 'none',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 12px',
              cursor: 'pointer',
              minHeight: '44px',
              touchAction: 'manipulation',
            }}
          >
            <span style={{ color: lang === 'ru' ? 'var(--ember)' : 'var(--text-muted)', fontWeight: lang === 'ru' ? 700 : 400 }}>RU</span>
            <span style={{ color: 'var(--text-muted)' }}>|</span>
            <span style={{ color: lang === 'en' ? 'var(--ember)' : 'var(--text-muted)', fontWeight: lang === 'en' ? 700 : 400 }}>EN</span>
          </button>

          <a
            href="/cv-marat.pdf"
            download
            className="btn btn-outline"
            style={{ padding: '8px 20px', fontSize: 'var(--text-xs)', minHeight: 'auto' }}
          >
            {t.nav.resume}
          </a>
        </nav>

        {/* Mobile controls */}
        <div className="nav-mobile-controls" style={{ display: 'none', alignItems: 'center', gap: 'var(--space-3)' }}>
          <button
            onClick={toggleLang}
            aria-label={t.nav.switchLangAria}
            style={{
              display: 'flex',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              background: 'none',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 10px',
              cursor: 'pointer',
              minHeight: '44px',
              touchAction: 'manipulation',
            }}
          >
            <span style={{ color: lang === 'ru' ? 'var(--ember)' : 'var(--text-muted)', fontWeight: lang === 'ru' ? 700 : 400 }}>RU</span>
            <span style={{ color: 'var(--text-muted)' }}>|</span>
            <span style={{ color: lang === 'en' ? 'var(--ember)' : 'var(--text-muted)', fontWeight: lang === 'en' ? 700 : 400 }}>EN</span>
          </button>

          <button
            className="nav-burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '10px',
              minHeight: '44px',
              minWidth: '44px',
              justifyContent: 'center',
              touchAction: 'manipulation',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: 'var(--mint)',
                  transition: 'all 0.2s',
                  transform: menuOpen
                    ? i === 0
                      ? 'translateY(7px) rotate(45deg)'
                      : i === 2
                        ? 'translateY(-7px) rotate(-45deg)'
                        : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(15,40,35,0.97)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid var(--border-subtle)',
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
            }}
          >
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLink(e, link.href)}
                style={{
                  fontSize: 'var(--text-lg)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  color: 'var(--mint)',
                  padding: 'var(--space-3) 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  minHeight: '44px',
                }}
              >
                {link.label}
              </a>
            ))}
            <a href="/cv-marat.pdf" download className="btn btn-primary" style={{ marginTop: 'var(--space-2)', justifyContent: 'center' }}>
              {t.nav.resume}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-controls { display: flex !important; }
        }
      `}</style>
    </motion.header>
  )
}
