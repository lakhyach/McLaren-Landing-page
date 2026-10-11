import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AERO } from '../assets/content'

// Vector blueprint of the P1 side profile with live airflow
// streamlines. No bitmap asset; every shape here is authored for this project.
function Blueprint({ activeId, reduce }) {
  const on = (id) => activeId === id
  return (
    <svg viewBox="0 0 420 200" className="h-full w-full" role="img" aria-label="P1 aerodynamic blueprint">
      <defs>
        <linearGradient id="stroke" x1="0" x2="1">
          <stop offset="0" stopColor="#8b8b94" />
          <stop offset="1" stopColor="#f4f4f5" />
        </linearGradient>
      </defs>

      {/* ground */}
      <line x1="10" y1="150" x2="410" y2="150" stroke="#2a2a34" strokeWidth="1" strokeDasharray="2 5" />

      {/* airflow streamlines */}
      <g fill="none" strokeWidth="1.2" stroke="#ff6a1f" opacity={on('monocoque') ? 0.9 : 0.28}>
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M -20 ${64 + i * 18} C 120 ${44 + i * 18}, 240 ${96 + i * 10}, 440 ${60 + i * 16}`}
            strokeDasharray="6 10"
            animate={reduce ? {} : { strokeDashoffset: [0, -160] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </g>

      {/* body silhouette */}
      <path
        d="M 30 140
           C 40 118, 70 112, 118 110
           C 150 84, 178 74, 214 74
           C 252 74, 286 92, 320 108
           C 360 112, 392 120, 396 138
           L 396 142 L 30 142 Z"
        fill="#0f0f13"
        stroke="url(#stroke)"
        strokeWidth={on('monocoque') ? 2.4 : 1.4}
        style={{ transition: 'stroke-width .3s' }}
      />

      {/* canopy highlight */}
      <path
        d="M 150 108 C 176 82, 200 76, 214 76 C 244 76, 272 92, 300 106 Z"
        fill={on('canopy') ? 'rgba(255,106,31,0.16)' : 'transparent'}
        stroke={on('canopy') ? '#ff6a1f' : 'transparent'}
        strokeWidth="1.6"
        style={{ transition: 'all .3s' }}
      />

      {/* wing highlight */}
      <g style={{ transition: 'opacity .3s', opacity: on('wing') ? 1 : 0.4 }}>
        <rect x="26" y="96" width="46" height="6" rx="2" fill={on('wing') ? '#ff6a1f' : '#2a2a34'} />
        <line x1="52" y1="102" x2="52" y2="118" stroke="#3a3a44" strokeWidth="2" />
      </g>

      {/* wheels */}
      {[108, 322].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="138" r="24" fill="#08080a" stroke="#c9c9d1" strokeWidth="1.6" />
          <circle cx={cx} cy="138" r="9" fill="none" stroke="#3a3a44" strokeWidth="1.2" />
        </g>
      ))}

      {/* light signature dots */}
      <g style={{ opacity: on('signature') ? 1 : 0.4, transition: 'opacity .3s' }}>
        <circle cx="392" cy="126" r="4" fill="#ffd9a0" />
        <circle cx="34" cy="128" r="4" fill="#ff3b12" />
      </g>
    </svg>
  )
}

const FeatureRow = ({ feature, index, activeIndex, setActiveIndex }) => {
  const ref = useRef(null)
  const active = activeIndex === index
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActiveIndex(index),
      { rootMargin: '-48% 0px -48% 0px' },
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [index, setActiveIndex])

  return (
    <div ref={ref} className="flex min-h-[68vh] flex-col justify-center">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em]">
        <span className={active ? 'text-papaya-500' : 'text-titanium-500'}>AERO</span>
        <span className={active ? 'text-titanium-300' : 'text-titanium-500'}>{feature.index}</span>
      </div>
      <h3
        className={`mt-4 max-w-lg font-display text-3xl font-bold leading-tight tracking-tight transition-colors md:text-5xl ${
          active ? 'text-paper' : 'text-titanium-500'
        }`}
      >
        {feature.title}
      </h3>
      <p
        className={`mt-4 max-w-md text-sm font-light leading-relaxed transition-colors md:text-base ${
          active ? 'text-titanium-300' : 'text-titanium-500'
        }`}
      >
        {feature.body}
      </p>
    </div>
  )
}

export default function AeroStory() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = AERO[activeIndex]
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  return (
    <section id="aero" className="relative bg-carbon-950 text-paper">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-6 md:grid-cols-2 md:px-12">
        {/* scroll track */}
        <div className="pt-[18vh] pb-[24vh]">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.4em] text-papaya-400">
            04 — Aero &amp; design
          </p>
          {AERO.map((f, i) => (
            <FeatureRow key={f.id} feature={f} index={i} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
          ))}
        </div>

        {/* sticky blueprint */}
        <div className="sticky top-0 flex h-screen items-center justify-center">
          <div className="tech-grid relative h-[80vh] w-full overflow-hidden rounded-2xl border border-white/5 bg-carbon-900">
            <Blueprint activeId={active.id} reduce={reduce} />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-carbon-950/70 p-4 backdrop-blur-md"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-papaya-400">
                  Focus · {active.index}
                </span>
                <p className="mt-1 text-sm font-medium text-paper">{active.title}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
