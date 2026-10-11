import React, { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SPECS } from '../assets/content'

const EASE = [0.22, 1, 0.36, 1]

export default function Specifications() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const reveal = reduce
    ? {}
    : { initial: 'hidden', whileInView: 'show', viewport: { once: false, margin: '-12%' } }

  const block = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  }

  return (
    <section
      id="specs"
      ref={ref}
      className="relative border-t border-white/5 bg-carbon-900 px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 max-w-2xl">
          <motion.p
            {...reveal}
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-papaya-400"
          >
            06 — Specifications
          </motion.p>
          <motion.h2
            {...reveal}
            variants={block}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tighter text-paper md:text-5xl"
          >
            The numbers, and where they come from.
          </motion.h2>
          <motion.p {...reveal} variants={block} className="mt-6 text-sm font-light leading-relaxed text-titanium-500">
            {SPECS.intro}
          </motion.p>
        </div>

        <motion.div
          {...reveal}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
          className="grid gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 md:grid-cols-3"
        >
          {SPECS.groups.map((g) => (
            <motion.div key={g.title} variants={block} className="bg-carbon-900 p-6 md:p-8">
              <h3 className="mb-6 font-display text-sm font-semibold uppercase tracking-widest text-papaya-400">
                {g.title}
              </h3>
              <dl className="space-y-4">
                {g.rows.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-3 last:border-0">
                    <dt className="text-xs font-medium uppercase tracking-[0.15em] text-titanium-500">{k}</dt>
                    <dd className="text-right font-mono text-sm text-paper">{v}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...reveal} variants={block} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-titanium-500">Sources</span>
          {SPECS.sources.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-titanium-300 transition-colors hover:text-paper"
            >
              {s.label}
              <span className="text-papaya-500 transition-transform group-hover:translate-x-0.5">↗</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
