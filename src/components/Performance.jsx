import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { STATS } from '../assets/content'

function Counter({ value, decimals = 0, run }) {
  const [n, setN] = useState(0)
  const raf = useRef()
  useEffect(() => {
    if (!run) return
    const dur = 1400
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      setN(value * eased)
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [run, value])
  return decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString()
}

export default function Performance() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const reduce = useReducedMotion()
  const run = inView && !reduce

  return (
    <section
      id="performance"
      ref={ref}
      className="relative border-t border-white/5 bg-carbon-900 px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex flex-col gap-4 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.4em] text-papaya-400">
              02 — Performance
            </p>
            <h2 className="max-w-2xl font-display text-4xl font-bold leading-tight tracking-tighter text-paper md:text-6xl">
              Numbers that only matter if the air can get out of the way.
            </h2>
          </div>
          <p className="max-w-xs text-sm font-light leading-relaxed text-titanium-500">
            Target figures for the GT-01 concept, modelled for this study. Concept values — not a
            production specification.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 md:grid-cols-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: reduce ? 0 : i * 0.06, duration: 0.5 }}
              className="group relative bg-carbon-900 p-6 md:p-10"
            >
              <div className="flex items-baseline font-display text-4xl font-bold tracking-tight text-paper md:text-6xl">
                <Counter value={s.value} decimals={s.decimals || 0} run={run} />
                <span className="text-papaya-500">{s.suffix}</span>
              </div>
              <div className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-titanium-300">
                {s.label}
              </div>
              <div className="mt-1 text-xs font-light text-titanium-500">{s.detail}</div>
              <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-papaya-500 transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
