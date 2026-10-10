import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { BRAND } from '../assets/content'

export default function Preloader({ onDone }) {
  const reduce = useReducedMotion()
  const [progress, setProgress] = useState(reduce ? 100 : 0)
  const [active, setActive] = useState(true)

  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => setActive(false), 300)
      return () => clearTimeout(t)
    }
    const start = performance.now()
    const DURATION = 1500
    let raf
    let done

    const finish = () => {
      if (done) return
      done = true
      setProgress(100)
      cancelAnimationFrame(raf)
      clearInterval(fallback)
      setTimeout(() => setActive(false), 260)
    }

    // Smooth progress while the tab is visible.
    const tick = () => {
      const p = Math.min(100, Math.round(((performance.now() - start) / DURATION) * 100))
      setProgress(p)
      if (p < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        finish()
      }
    }
    raf = requestAnimationFrame(tick)

    // Wall-clock fallback: rAF is paused in background tabs, so guarantee the
    // intro always completes and scroll is restored regardless of visibility.
    const fallback = setInterval(() => {
      if (performance.now() - start >= DURATION) finish()
    }, 120)

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(fallback)
    }
  }, [reduce])

  // Lock scroll only while the intro is visible; restore as soon as it exits.
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  useEffect(() => {
    if (!active) onDone?.()
  }, [active, onDone])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-carbon-950 px-8 py-10 md:px-16 md:py-14"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-titanium-500">
            <span>{BRAND.marque}</span>
            <span>{BRAND.model}</span>
          </div>

          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-display text-[19vw] font-bold leading-none tracking-tighter text-paper md:text-[13vw]"
            >
              {BRAND.marque}
            </motion.h1>
            <div className="mt-6 h-px w-full overflow-hidden bg-carbon-700">
              <motion.div
                className="h-full bg-papaya-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>

          <div className="flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-titanium-500">
            <span>Compiling geometry · lighting · materials</span>
            <span className="text-paper tabular-nums">{String(progress).padStart(3, '0')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
