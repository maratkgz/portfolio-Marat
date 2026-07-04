import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Mail, Send, GitFork } from 'lucide-react'
import { useLang } from '../context/LangContext'
import ThreadNode from './ThreadNode'

const DIRECT = [
  { name: 'Email', href: 'mailto:xxxzm.05@gmail.com', Icon: Mail, display: 'xxxzm.05@gmail.com' },
  { name: 'Telegram', href: 'https://t.me/xxxzm05', Icon: Send, display: '@xxxzm05' },
  { name: 'GitHub', href: 'https://github.com/maratkgz', Icon: GitFork, display: 'github.com/maratkgz' },
]

export default function Contact() {
  const { t, lang } = useLang()
  const { contactUI } = t
  const form = contactUI.form

  const formRef = useRef(null)
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})
  const [isOnline, setIsOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine)

  useEffect(() => {
    const goOnline = () => setIsOnline(true)
    const goOffline = () => setIsOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  const validate = () => {
    const e = {}
    if (!fields.name.trim()) e.name = form.errorName
    if (!fields.email.trim()) e.email = form.errorEmail
    else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = form.errorEmailInvalid
    if (!fields.message.trim()) e.message = form.errorMessage
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: fields.name, from_email: fields.email, message: fields.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
      setFields({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = (hasError) => ({
    width: '100%',
    background: 'rgba(15,40,35,0.6)',
    border: `1.5px solid ${hasError ? 'var(--ember)' : 'var(--border-subtle)'}`,
    borderRadius: 'var(--radius-sm)',
    padding: 'var(--space-3) var(--space-4)',
    color: 'var(--mint)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-base)',
    outline: 'none',
    transition: 'border-color 0.15s',
    boxSizing: 'border-box',
    minHeight: '44px',
  })

  return (
    <section id="contact" style={{ background: 'var(--forest)' }}>
      <div className="container section-wrapper thread-end">
        <ThreadNode id="contact" label={t.thread.contact} />

        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {contactUI.label}
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {contactUI.title}
        </motion.h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 'var(--space-12)',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)', lineHeight: 1.7 }}>
              {contactUI.subtitle}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
                marginBottom: 'var(--space-8)',
              }}
            >
              {contactUI.location}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {DIRECT.map(({ name, href, Icon, display }) => (
                <a
                  key={name}
                  href={href}
                  target={name === 'Email' ? undefined : '_blank'}
                  rel={name === 'Email' ? undefined : 'noopener noreferrer'}
                  aria-label={`${name}: ${display}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3) var(--space-4)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    transition: 'border-color 0.15s, color 0.15s',
                    minHeight: '44px',
                    touchAction: 'manipulation',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--ember)'
                    e.currentTarget.style.color = 'var(--mint)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)'
                    e.currentTarget.style.color = 'var(--text-muted)'
                  }}
                >
                  <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                  {display}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    padding: 'var(--space-10)',
                    border: '1px solid rgba(236,94,39,0.35)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--ember-dim)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }} aria-hidden="true">✓</div>
                  <h3 style={{ color: 'var(--mint)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
                    {form.sentTitle}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)' }}>{form.sentText}</p>
                  <button onClick={() => setStatus('idle')} className="btn btn-outline" style={{ marginTop: 'var(--space-6)' }}>
                    {form.sendAnother}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                    >
                      {form.name}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={fields.name}
                      onChange={handleChange}
                      placeholder={form.namePlaceholder}
                      style={inputStyle(errors.name)}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--ember)')}
                      onBlur={(e) => (e.target.style.borderColor = errors.name ? 'var(--ember)' : 'var(--border-subtle)')}
                      aria-describedby={errors.name ? 'error-name' : undefined}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <span id="error-name" style={{ fontSize: 'var(--text-xs)', color: 'var(--ember)', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                    >
                      {form.email}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={fields.email}
                      onChange={handleChange}
                      placeholder={form.emailPlaceholder}
                      style={inputStyle(errors.email)}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--ember)')}
                      onBlur={(e) => (e.target.style.borderColor = errors.email ? 'var(--ember)' : 'var(--border-subtle)')}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <span id="error-email" style={{ fontSize: 'var(--text-xs)', color: 'var(--ember)', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'block', marginBottom: 'var(--space-2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                    >
                      {form.message}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={fields.message}
                      onChange={handleChange}
                      placeholder={form.messagePlaceholder}
                      style={{ ...inputStyle(errors.message), resize: 'vertical', minHeight: '120px' }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--ember)')}
                      onBlur={(e) => (e.target.style.borderColor = errors.message ? 'var(--ember)' : 'var(--border-subtle)')}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && <span id="error-message" style={{ fontSize: 'var(--text-xs)', color: 'var(--ember)', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
                  </div>

                  {status === 'error' && (
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ember)' }}>
                      {form.errorNetwork}
                    </p>
                  )}

                  {!isOnline && (
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ember)' }}>
                      {form.offlineNotice}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === 'sending' || !isOnline}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      opacity: status === 'sending' || !isOnline ? 0.6 : 1,
                      cursor: status === 'sending' || !isOnline ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {status === 'sending' ? form.sending : form.send}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
