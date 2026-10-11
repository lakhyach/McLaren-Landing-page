import React, { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { STATS } from '../assets/content'

const EASE = [0.22, 1, 0.36, 1]
const HEADLINE = 'Numbers that only matter if the air can get out of the way.'.split(' ')

// Counts up on reveal and restarts from zero every time the section re-enters
// (both directions). Reduced-motion users get the final figure immediately.
function Counter({ value, decimals = 0, run, reduce }) {
  const [n, setN] = useState(0)
  const raf = useRef()
  useEffect(() => {
    if (!run) return
    const dur = 1400
    let start
    const tick = (now) => {
      if (start === undefined) start = now
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      setN(value * eased)
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [run, value])

  const out = reduce ? value : n
  return decimals > 0 ? out.toFixed(decimals) : Math.round(out).toLocaleString()
}

export default function Performance() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { margin: '-20% 0px' })
  const run = inView && !reduce

  // Subtle scroll-progress parallax on the heading block (bidirectional, GPU-driven).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const headY = useTransform(scrollYProgress, [0, 1], [48, -48])

  // When reduced motion is requested, render static, immediately-visible content.
  const reveal = reduce
    ? {}
    : { initial: 'hidden', whileInView: 'show', viewport: { once: false, margin: '-15%' } }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.035, delayChildren: 0.08 } },
  }
  const wordVariant = {
    hidden: { y: '110%' },
    show: { y: 0, transition: { duration: 0.62, ease: EASE } },
  }
  const cardVariant = {
    hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE } },
  }

  return (
    <section
      id="performance"
      ref={ref}
      className="relative overflow-hidden border-t border-white/5 bg-carbon-900 px-6 py-24 md:px-12 md:py-32"
    >
      {/* faint technical grid + glow backdrop for depth */}
      <div aria-hidden className="tech-grid pointer-events-none absolute inset-0 opacity-[0.5]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-papaya-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div style={reduce ? undefined : { y: headY }}>
            <motion.p
              {...reveal}
              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-papaya-400"
            >
              02 — Performance
            </motion.p>

            <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tighter text-paper md:text-6xl">
              {/* line-mask reveal: each word rises out of an overflow-hidden clip */}
              <motion.span
                {...reveal}
                variants={container}
                className="block flex-wrap"
              >
                {HEADLINE.map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span variants={wordVariant} className="inline-block">
                      {w}
                      {i < HEADLINE.length - 1 ? '\u00A0' : ''}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </h2>
          </div>

          <motion.p
            {...reveal}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
            className="max-w-xs shrink-0 text-sm font-light leading-relaxed text-titanium-500"
          >
            McLaren’s published P1 figures, shown for study purposes. Not a quotation or a
            production specification.
          </motion.p>
        </div>

        <motion.div
          {...reveal}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 md:grid-cols-3"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.id}
              variants={cardVariant}
              className="group relative bg-carbon-900 p-6 md:p-10"
            >
              <div className="flex items-baseline font-display text-4xl font-bold tracking-tight text-paper md:text-6xl">
                <Counter value={s.value} decimals={s.decimals || 0} run={run} reduce={reduce} />
                <span className="text-papaya-500">{s.suffix}</span>
              </div>
              <div className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-titanium-300">
                {s.label}
              </div>
              <div className="mt-1 text-xs font-light text-titanium-500">{s.detail}</div>
              <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-papaya-500 transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
