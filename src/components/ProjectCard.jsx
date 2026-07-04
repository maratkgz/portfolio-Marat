import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../context/LangContext'

export default function ProjectCard({ project }) {
  const { lang, t } = useLang()
  const [imgError, setImgError] = useState(false)
  const { title, image, techStack, githubUrl, liveUrl } = project
  const copy = project[lang]

  const visibleTags = techStack.slice(0, 4)
  const extraCount = techStack.length - 4

  return (
    <motion.article
      style={{
        background: 'var(--forest)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'border-color 0.2s',
      }}
      whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(0,0,0,0.5)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div
        style={{
          height: '180px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          flexShrink: 0,
          background: 'var(--charcoal)',
        }}
      >
        {!imgError ? (
          <img
            src={image}
            alt={lang === 'ru' ? `Скриншот проекта ${title}` : `${title} screenshot`}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', opacity: 0.3 }} aria-hidden="true">◫</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                textAlign: 'center',
                padding: '0 var(--space-4)',
              }}
            >
              {title}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--mint)', lineHeight: 1.25 }}>
          {title}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {[
            [t.projectsUI.task, copy.task],
            [t.projectsUI.solution, copy.solution],
            [t.projectsUI.result, copy.result],
          ].map(([label, text]) => (
            <p key={label} style={{ fontSize: 'var(--text-sm)', lineHeight: 1.6, display: 'flex', gap: '8px' }}>
              <span style={{ color: 'var(--ember)', flexShrink: 0 }} aria-hidden="true">→</span>
              <span>
                <strong style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{label}: </strong>
                {text}
              </span>
            </p>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'auto', paddingTop: 'var(--space-2)' }}>
          {visibleTags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
          {extraCount > 0 && (
            <span className="tag" style={{ color: 'var(--ember)', borderColor: 'var(--ember-mid)' }}>
              {t.projectsUI.moreTags(extraCount)}
            </span>
          )}
        </div>

        {/* Links */}
        {(githubUrl || liveUrl) && (
          <div style={{ display: 'flex', gap: 'var(--space-4)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-subtle)', marginTop: 'var(--space-2)' }}>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === 'ru' ? `Исходный код проекта ${title} на GitHub` : `${title} source code on GitHub`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  minHeight: '44px',
                  touchAction: 'manipulation',
                }}
              >
                ⌥ {t.projectsUI.source}
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === 'ru' ? `Открыть проект ${title}` : `Open ${title}`}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  minHeight: '44px',
                  touchAction: 'manipulation',
                }}
              >
                ↗ {t.projectsUI.website}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}
