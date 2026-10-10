import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import HeroScene from '../three/HeroScene'
import { usePerformanceProfile } from '../lib/hooks'
import { BRAND, HERO } from '../assets/content'

const go = (href) => (e) => {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const containerRef = useRef(null)
  const progressRef = useRef(0)
  const profile = usePerformanceProfile()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v
  })

  const textOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.22], [0, -40])

  // Reset progress when leaving
  useEffect(() => () => { progressRef.current = 0 }, [])

  return (
    <section id="overview" ref={containerRef} className="relative h-[340vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <HeroScene progressRef={progressRef} profile={profile} />
        </div>

        {/* legibility gradient — heavier at the bottom so the headline keeps
            contrast when the car sits behind the copy on tall screens */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon-950 from-35% via-carbon-950/30 to-carbon-950/40" />

        {/* content */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 flex h-full max-w-[1400px] flex-col justify-end px-6 pb-24 md:px-12"
        >
          <div className="mx-auto w-full max-w-[1400px]">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-papaya-400"
            >
              {HERO.kicker}
            </motion.p>

            <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tighter text-paper text-balance sm:text-7xl md:text-8xl">
              {HERO.title[0]}{' '}
              <span className="text-titanium-500">{HERO.title[1]}</span>{' '}
              <span className="glow-papaya text-papaya-500">{HERO.title[2]}</span>
            </h1>

            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                className="max-w-md text-sm font-light leading-relaxed tracking-wide text-titanium-300 md:text-base"
              >
                {HERO.sub}
              </motion.p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={go('#configure')}
                  className="rounded-full bg-papaya-500 px-7 py-3 text-sm font-semibold text-carbon-950 transition-colors hover:bg-papaya-400"
                >
                  Configure the P1
                </button>
                <button
                  onClick={go('#performance')}
                  className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-paper backdrop-blur-sm transition-colors hover:border-white/40"
                >
                  Explore the build →
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-titanium-500">
          <span>Scroll</span>
          <span className="relative block h-8 w-px overflow-hidden bg-carbon-600">
            <span className="scroll-dot absolute left-0 top-0 h-3 w-px bg-papaya-500" />
          </span>
        </div>

        {/* brand watermark */}
        <div className="pointer-events-none absolute right-6 top-24 z-10 hidden text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.25em] text-titanium-500 md:block">
          {BRAND.marque} {BRAND.model}
          <br />
          <span className="text-carbon-600">{BRAND.tagline}</span>
        </div>
      </div>
    </section>
  )
}
