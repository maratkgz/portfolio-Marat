import React from 'react'
import content from '../data/content'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    const lang = document.documentElement.lang === 'en' ? 'en' : 'ru'
    const t = content[lang].errorBoundary

    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--forest)',
          textAlign: 'center',
          padding: 'var(--space-6)',
        }}
      >
        <div>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-6)' }} aria-hidden="true">⚠</div>
          <h2 style={{ color: 'var(--mint)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)' }}>
            {t.title}
          </h2>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            {t.reload}
          </button>
        </div>
      </div>
    )
  }
}
