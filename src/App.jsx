import React from 'react'
import { LangProvider } from './context/LangContext'
import { ActiveSectionProvider } from './context/ActiveSectionContext'
import ErrorBoundary from './components/ErrorBoundary'
import OfflineOverlay from './components/OfflineOverlay'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Roles from './components/Roles'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Languages from './components/Languages'
import HowIWork from './components/HowIWork'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <ErrorBoundary>
      <LangProvider>
        <ActiveSectionProvider>
          <Navbar />
          <main>
            <Hero />
            <Stats />
            <About />
            <Roles />
            <Projects />
            <Skills />
            <Languages />
            <HowIWork />
            <Contact />
          </main>
          <Footer />
          <OfflineOverlay />
        </ActiveSectionProvider>
      </LangProvider>
    </ErrorBoundary>
  )
}
