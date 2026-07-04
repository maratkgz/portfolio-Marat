import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import projects from '../data/projects'
import { useLang } from '../context/LangContext'
import ThreadNode from './ThreadNode'

export default function Projects() {
  const { t } = useLang()
  const { projectsUI } = t
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.tags.includes(filter))

  return (
    <section id="projects" style={{ background: 'var(--charcoal)' }}>
      <div className="container section-wrapper">
        <ThreadNode id="projects" label={t.thread.projects} />

        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {projectsUI.label}
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {projectsUI.title}
        </motion.h2>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-10)' }}>
          {projectsUI.filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`filter-pill${filter === f.key ? ' is-active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-6)',
          }}
          className="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          style={{ marginTop: 'var(--space-10)', textAlign: 'center' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="https://github.com/maratkgz"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            GitHub →
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
