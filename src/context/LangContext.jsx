import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import content from '../data/content'

const LangContext = createContext(null)

const STORAGE_KEY = 'lang'

function getInitialLang() {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored === 'ru' || stored === 'en') return stored
  } catch {
    /* sessionStorage unavailable (private mode / SSR) — fall back to default */
  }
  return 'ru'
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      sessionStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore — persistence is a nicety, not a requirement */
    }
  }, [lang])

  const setLang = (next) => setLangState(next)
  const toggleLang = () => setLangState((prev) => (prev === 'ru' ? 'en' : 'ru'))

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t: content[lang] }),
    [lang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
