import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false)
  const { title, description, image, techStack, githubUrl, liveUrl } = project

  const visibleTags = techStack.slice(0, 3)
  const extraCount  = techStack.length - 3

  return (
    <motion.article
      style={{
        background: 'var(--charcoal)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s',
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
        borderColor: 'rgba(236,94,39,0.4)',
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div style={{
        height: '220px',
        overflow: 'hidden',
        background: imgError ? 'var(--charcoal)' : 'var(--charcoal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0,
      }}>
        {!imgError ? (
          <img
            src={image}
            alt={`Скриншот проекта ${title}`}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--charcoal)',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <span style={{ fontSize: '2rem', opacity: 0.3 }} aria-hidden="true">◫</span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
            }}>
              {title}
            </span>
          </div>
        )}
        {/* Overlay on hover */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(30,46,43,0.7) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} aria-hidden="true" />
      </div>

      {/* Body */}
      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1 }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          fontWeight: 700,
          color: 'var(--mint)',
          lineHeight: 1.25,
        }}>
          {title}
        </h3>

        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--text-muted)',
          lineHeight: 1.65,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'auto', paddingTop: 'var(--space-2)' }}>
          {visibleTags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
          {extraCount > 0 && (
            <span className="tag" style={{ color: 'var(--ember)', borderColor: 'var(--ember-mid)' }}>
              +{extraCount}
            </span>
          )}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--border-subtle)', marginTop: 'var(--space-2)' }}>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Исходный код проекта ${title} на GitHub`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color var(--transition)',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ember)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              🐙 Source
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Открыть проект ${title}`}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color var(--transition)',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ember)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              ↗ Website
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
