import React, { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Performance from './components/Performance'
import Powertrain from './components/Powertrain'
import AeroStory from './components/AeroStory'
import Manifesto from './components/Manifesto'
import Configurator from './components/Configurator'
import Specifications from './components/Specifications'
import Footer from './components/Footer'

const App = () => {
  const [loaded, setLoaded] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <div className="grain relative w-full bg-carbon-900 font-sans text-paper antialiased">
      <Preloader ready={sceneReady} onDone={() => setLoaded(true)} />

      {/* scroll progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: bar }}
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-papaya-500"
      />

      <Nav />

      <main>
        <Hero onSceneReady={() => setSceneReady(true)} />
        <Performance />
        <Powertrain />
        <AeroStory />
        <Manifesto />
        <Configurator />
        <Specifications />
      </main>

      <Footer />

      {/* Ensure content is reachable even before intro ends */}
      <span className="sr-only" aria-live="polite">
        {loaded ? 'Experience ready.' : 'Loading experience.'}
      </span>
    </div>
  )
}

export default App
