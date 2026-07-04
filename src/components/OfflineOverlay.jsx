import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../context/LangContext'

const DOT_COUNT = 48

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

function ScatterDots({ reduced }) {
  const dots = useMemo(() => {
    const cols = 8
    const rows = 6
    const items = []
    for (let i = 0; i < DOT_COUNT; i++) {
      const col = i % cols
      const row = Math.floor(i / cols) % rows
      items.push({
        id: i,
        gridX: (col / (cols - 1)) * 100,
        gridY: (row / (rows - 1)) * 100,
        jitterX: (Math.sin(i * 12.9898) * 43758.5453 % 1) * 60 - 30,
        jitterY: (Math.sin(i * 78.233) * 12543.123 % 1) * 60 - 30,
        isEmber: i % 5 === 0,
      })
    }
    return items
  }, [])

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          initial={reduced ? { opacity: 0 } : { opacity: 0, left: `${dot.gridX}%`, top: `${dot.gridY}%`, x: 0, y: 0 }}
          animate={
            reduced
              ? { opacity: 0.5 }
              : {
                  opacity: dot.isEmber ? 0.7 : 0.35,
                  left: `${dot.gridX}%`,
                  top: `${dot.gridY}%`,
                  x: dot.jitterX,
                  y: dot.jitterY,
                }
          }
          exit={
            reduced
              ? { opacity: 0 }
              : { opacity: 0, x: 0, y: 0, transition: { duration: 0.5 } }
          }
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'absolute',
            width: dot.isEmber ? '6px' : '4px',
            height: dot.isEmber ? '6px' : '4px',
            borderRadius: '50%',
            background: dot.isEmber ? 'var(--ember)' : 'var(--mint)',
          }}
        />
      ))}
    </div>
  )
}

export default function OfflineOverlay() {
  const { t } = useLang()
  const reduced = useReducedMotion()
  const [isOffline, setIsOffline] = useState(typeof navigator !== 'undefined' && !navigator.onLine)
  const [showReconnected, setShowReconnected] = useState(false)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    const goOffline = () => setIsOffline(true)
    const goOnline = () => {
      setIsOffline(false)
      setShowReconnected(true)
    }
    window.addEventListener('offline', goOffline)
    window.addEventListener('online', goOnline)
    return () => {
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('online', goOnline)
    }
  }, [])

  useEffect(() => {
    if (!showReconnected) return
    const timer = setTimeout(() => setShowReconnected(false), 2000)
    return () => clearTimeout(timer)
  }, [showReconnected])

  const handleRetry = () => {
    setChecking(true)
    setTimeout(() => {
      setChecking(false)
      if (navigator.onLine) setIsOffline(false)
    }, 500)
  }

  return (
    <>
      <AnimatePresence>
        {isOffline && (
          <motion.div
            role="alert"
            aria-live="assertive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'var(--forest)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ScatterDots reduced={reduced} />

            <div style={{ position: 'relative', textAlign: 'center', padding: 'var(--space-6)', maxWidth: '440px' }}>
              <motion.div
                style={{ fontSize: '3rem', marginBottom: 'var(--space-6)' }}
                animate={reduced ? {} : { rotate: [0, -8, 8, -8, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                🫰🏻
              </motion.div>

              <h2 style={{ color: 'var(--mint)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)', lineHeight: 1.3 }}>
                {t.offline.title}
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  marginBottom: 'var(--space-8)',
                }}
              >
                {t.offline.waiting}
                <motion.span
                  animate={reduced ? {} : { opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  …
                </motion.span>
              </p>

              <button onClick={handleRetry} className="btn btn-outline">
                <motion.span
                  animate={checking ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: 'inline-block' }}
                  aria-hidden="true"
                >
                  ↻
                </motion.span>{' '}
                {t.offline.retry}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReconnected && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              background: 'var(--charcoal)',
              border: '1px solid var(--ember-mid)',
              borderRadius: 'var(--radius-full)',
              padding: 'var(--space-2) var(--space-5)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--mint)',
            }}
          >
            {t.offline.backOnline}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
