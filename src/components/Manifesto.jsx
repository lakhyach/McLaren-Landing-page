import React from 'react'
import { motion } from 'framer-motion'
import { BRAND } from '../assets/content'

export default function Manifesto() {
  const word = BRAND.marque
  return (
    <section id="concept" className="relative overflow-hidden border-t border-white/5 bg-carbon-950 py-24 md:py-32">
      {/* marquee */}
      <div aria-hidden className="animate-marquee flex select-none whitespace-nowrap opacity-[0.06]">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="font-display px-8 text-[16vw] font-bold tracking-tighter text-paper">
            {word} · CONCEPT ·
          </span>
        ))}
      </div>

      <div className="mx-auto mt-16 grid max-w-[1400px] gap-10 px-6 md:grid-cols-2 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.4em] text-papaya-400">
            The idea
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tighter text-paper md:text-5xl">
            A study in how far a browser can push automotive storytelling.
          </h2>
          <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-titanium-300 md:text-base">
            The P1 here is not a photograph or a baked video. It is rendered live — geometry, clearcoat
            physics, a lightformer studio and a scroll-bound camera — so every interaction stays honest
            to what the hardware can actually do. One of motorsport’s most uncompromising road cars —
            the carbon MonoCage, the active rear wing, the teardrop tail lights — rebuilt as a real-time
            experience you can orbit, recolour and inspect.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col justify-end"
        >
          <div className="rounded-2xl border border-white/10 bg-carbon-900 p-6">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-paper">
              Disclosure
            </h3>
            <p className="mt-3 text-xs font-light leading-relaxed text-titanium-500">{BRAND.disclaimer}</p>
          </div>
          <dl className="mt-6 grid grid-cols-3 gap-4 font-mono text-[11px] uppercase tracking-wider">
            {[
              ['Stack', 'R3F · Three.js'],
              ['Motion', 'Framer Motion'],
              ['Model', 'vecarz · CC-BY'],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-white/10 pt-3">
                <dt className="text-titanium-500">{k}</dt>
                <dd className="mt-1 text-paper">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
