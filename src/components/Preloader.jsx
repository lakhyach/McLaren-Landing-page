import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useProgress } from '@react-three/drei'
import { BRAND } from '../assets/content'

// Loading is driven by REAL signals, never a fake countdown:
//   • useProgress  → GLB + texture download % (drei's loading manager)
//   • fontsReady   → document.fonts.ready
//   • ready (prop) → the hero scene has rendered its first frame (authoritative)
// The bar eases toward the true value, caps just below 100 until everything is
// actually done, then completes and reveals. A hard timeout guarantees we never
// leave the user waiting forever (e.g. WebGL unavailable / a failed asset).
const SETTLE = 550 // ms — let the bar fill + first frame paint before reveal
const TIMEOUT = 20000 // ms — absolute ceiling, then force-reveal regardless

export default function Preloader({ ready = false, onDone }) {
  const reduce = useReducedMotion()
  const { progress, loaded, errors, itemsTotal } = useProgress()
  const [fontsReady, setFontsReady] = useState(
    () => typeof document === 'undefined' || !document.fonts?.ready,
  )
  const [shown, setShown] = useState(reduce ? 100 : 0)
  const [active, setActive] = useState(true)

  // If WebGL can't initialise (unsupported device, or a headless browser with
  // no GPU for the deployment-screenshot crawler) the hero scene can never
  // paint, so `ready` would never fire. Detect that up front and reveal the
  // page promptly instead of trapping the visitor behind the overlay until the
  // hard timeout. Real users with WebGL are unaffected — they still get the
  // full cinematic intro.
  const webglOk = React.useMemo(() => {
    if (typeof window === 'undefined') return true
    try {
      const c = document.createElement('canvas')
      return !!(
        window.WebGLRenderingContext &&
        (c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'))
      )
    } catch {
      return false
    }
  }, [])

  const failed = errors && Object.keys(errors).length > 0
  // Nothing tracked yet (cached/preloaded) counts as asset-complete; the real
  // gate is `ready` (first frame painted), which always fires for a live scene.
  const assetsDone = failed || (loaded && fontsReady) || (itemsTotal === 0 && ready)
  const contentReady = assetsDone && ready
  const canFinish = contentReady || failed || !webglOk

  // Resolve fonts asynchronously (with a safety fallback if the API stalls).
  useEffect(() => {
    if (typeof document === 'undefined' || !document.fonts?.ready) return
    let alive = true
    document.fonts.ready.then(() => alive && setFontsReady(true))
    const t = setTimeout(() => alive && setFontsReady(true), 3000)
    return () => {
      alive = false
      clearTimeout(t)
    }
  }, [])

  // Live values for the animation loop without re-triggering it.
  const targetRef = useRef(0)
  useEffect(() => {
    targetRef.current = canFinish ? 100 : Math.min(92, progress)
  }, [canFinish, progress])

  // Smoothly ease the displayed value toward the real target (monotonic — never
  // jumps backwards). Runs on the main thread; a wall-clock interval guarantees
  // completion even if rAF is throttled in a background tab.
  useEffect(() => {
    if (!active || reduce) return
    let raf
    const loop = () => {
      setShown((prev) => {
        const target = targetRef.current
        const next = prev + (target - prev) * 0.12
        const v = target - next < 0.6 ? target : next
        return Math.min(100, Math.max(prev, v))
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [active, reduce])

  // Dismiss once content is ready (after a short settle) — independent of rAF.
  useEffect(() => {
    if (!active || !canFinish) return
    const delay = reduce ? 0 : SETTLE
    const t = setTimeout(() => setActive(false), delay)
    return () => clearTimeout(t)
  }, [active, canFinish, reduce])

  // Hard ceiling: never trap the user behind the overlay.
  useEffect(() => {
    const t = setTimeout(() => setActive(false), TIMEOUT)
    return () => clearTimeout(t)
  }, [])

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

  const shownPct = reduce ? 100 : shown
  const pct = Math.round(shownPct)

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-carbon-950 px-8 py-10 md:px-16 md:py-14"
          initial={{ y: 0 }}
          exit={reduce ? { opacity: 0 } : { y: '-100%' }}
          transition={
            reduce
              ? { duration: 0.2 }
              : { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }
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
            <div
              className="mt-6 h-px w-full overflow-hidden bg-carbon-700"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Loading experience"
            >
              <div
                className="h-full bg-papaya-500"
                style={{ width: `${shownPct}%` }}
              />
            </div>
          </div>

          <div className="flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-titanium-500">
            <span>
              {failed
                ? 'Starting with reduced detail'
                : canFinish
                  ? 'Ready'
                  : 'Compiling geometry · lighting · materials'}
            </span>
            <span className="text-paper tabular-nums">{String(pct).padStart(3, '0')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
