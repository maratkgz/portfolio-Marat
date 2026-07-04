import React from 'react'
import { useActiveSectionId } from '../context/ActiveSectionContext'

export default function ThreadNode({ id, label }) {
  const activeId = useActiveSectionId()
  const isActive = activeId === id

  return (
    <>
      <span className={`thread-node${isActive ? ' is-active' : ''}`} aria-hidden="true" />
      <span className={`thread-label${isActive ? ' is-active' : ''}`}>{label}</span>
    </>
  )
}
