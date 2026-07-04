import React, { createContext, useContext } from 'react'
import useActiveSection from '../hooks/useActiveSection'

const ActiveSectionContext = createContext('hero')

const SECTION_IDS = ['hero', 'stats', 'about', 'roles', 'projects', 'skills', 'languages', 'process', 'contact']

export function ActiveSectionProvider({ children }) {
  const activeId = useActiveSection(SECTION_IDS)
  return (
    <ActiveSectionContext.Provider value={activeId}>
      {children}
    </ActiveSectionContext.Provider>
  )
}

export function useActiveSectionId() {
  return useContext(ActiveSectionContext)
}
