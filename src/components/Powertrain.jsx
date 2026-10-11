import React, { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { POWERTRAIN } from '../assets/content'

const EASE = [0.22, 1, 0.36, 1]

export default function Powertrain() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const reveal = reduce
    ? {}
    : { initial: 'hidden', whileInView: 'show', viewport: { once: false, margin: '-15%' } }

  // Scroll-linked horizontal drift of the combined-output glow (subtle, bidirectional).
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const glowX = useTransform(scrollYProgress, [0, 1], [-40, 40])

  const block = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  }

  return (
    <section
      id="powertrain"
      ref={ref}
      className="relative overflow-hidden border-t border-white/5 bg-carbon-950 px-6 py-24 md:px-12 md:py-32"
    >
      <div
        aria-hidden
        style={reduce ? undefined : { x: glowX }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-papaya-600/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="max-w-3xl">
          <motion.p
            {...reveal}
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-papaya-400"
          >
            03 — Hybrid powertrain
          </motion.p>
          <motion.h2
            {...reveal}
            variants={block}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tighter text-paper md:text-6xl"
          >
            {POWERTRAIN.headline}
          </motion.h2>
          <motion.p
            {...reveal}
            variants={block}
            className="mt-6 max-w-xl text-sm font-light leading-relaxed text-titanium-300 md:text-base"
          >
            {POWERTRAIN.intro}
          </motion.p>
        </div>

        {/* three power sources building to the combined figure */}
        <motion.div
          {...reveal}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 md:mt-20 md:grid-cols-3"
        >
          {POWERTRAIN.sources.map((s, i) => (
            <motion.div
              key={s.id}
              variants={{
                hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
                show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE } },
              }}
              className="group relative bg-carbon-950 p-8 md:p-10"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-titanium-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <div className="flex items-baseline font-display text-5xl font-bold tracking-tighter text-paper md:text-7xl">
                {s.figure}
                <span className="text-2xl font-semibold text-papaya-500 md:text-3xl">{s.unit}</span>
              </div>
              <h3 className="mt-5 font-display text-sm font-semibold uppercase tracking-widest text-paper">
                {s.title}
              </h3>
              <p className="mt-1 font-mono text-[11px] tracking-wide text-papaya-300">{s.sub}</p>
              <p className="mt-4 text-sm font-light leading-relaxed text-titanium-500">{s.body}</p>
              {i === 2 && (
                <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-papaya-500 transition-transform duration-500 group-hover:scale-x-100" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* documented driving modes */}
        <motion.div
          {...reveal}
          variants={block}
          className="mt-12 flex flex-col gap-6 rounded-2xl border border-white/10 bg-carbon-900/60 p-6 md:mt-16 md:flex-row md:items-center md:gap-10 md:p-8"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-titanium-500 md:w-40 md:shrink-0">
            Driving modes
          </p>
          <div className="grid flex-1 grid-cols-2 gap-4 md:grid-cols-4">
            {POWERTRAIN.modes.map((m) => (
              <div key={m.name} className="border-l border-white/10 pl-4">
                <div className="font-display text-2xl font-bold text-papaya-500">{m.name}</div>
                <p className="mt-1 text-xs font-light leading-relaxed text-titanium-500">{m.note}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
