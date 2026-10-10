import React, { useRef, useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import ConceptCar from '../three/ConceptCar'
import { StudioEnvironment, StageLights, Floor } from '../three/StudioEnvironment'
import { usePerformanceProfile } from '../lib/hooks'
import { CONFIG, HOTSPOT_INFO, BRAND } from '../assets/content'

const money = (n) => '$' + n.toLocaleString('en-US')

export default function Configurator() {
  const [paint, setPaint] = useState(CONFIG.paints[0])
  const [rim, setRim] = useState(CONFIG.rims[0])
  const [caliper, setCaliper] = useState(CONFIG.calipers[0])
  const [wing, setWing] = useState(true)
  const [hotspot, setHotspot] = useState(null)

  const profile = usePerformanceProfile()
  const canvasWrap = useRef(null)

  const total = CONFIG.basePrice + rim.price

  return (
    <section id="configure" className="relative border-t border-white/5 bg-carbon-900">
      <div className="flex flex-col lg:h-[100vh] lg:flex-row">
        {/* Controls */}
        <div className="order-2 w-full overflow-y-auto border-white/5 bg-carbon-900 p-6 md:p-10 lg:order-1 lg:w-[38%] lg:border-r">
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-papaya-400">
            04 — Configure
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-paper md:text-4xl">
            {BRAND.marque} {BRAND.model}
          </h2>
          <p className="mt-1 text-sm font-light text-titanium-500">
            Live specification studio. Changes render in real time.
          </p>

          {/* Paint */}
          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-medium uppercase tracking-wider text-titanium-300">
                Exterior paint
              </h3>
              <span className="font-mono text-xs text-titanium-500">{paint.hex.toUpperCase()}</span>
            </div>
            <div className="flex h-24 w-full gap-1 overflow-hidden rounded-2xl border border-white/10 bg-carbon-850 p-1.5">
              {CONFIG.paints.map((c) => {
                const selected = paint.id === c.id
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={c.name}
                    aria-pressed={selected}
                    onClick={() => setPaint(c)}
                    title={c.name}
                    className="group relative flex flex-col items-center justify-end rounded-lg transition-all duration-300"
                    style={{ backgroundColor: c.swatch, width: selected ? '26%' : '9%', minWidth: '34px' }}
                  >
                    {!selected && (
                      <span className="absolute inset-0 rounded-lg opacity-0 transition-opacity group-hover:opacity-100" style={{ boxShadow: 'inset 0 0 0 2px rgba(255,255,255,.5)' }} />
                    )}
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-xs font-medium tracking-wide text-titanium-300">{paint.name}</p>
          </div>

          {/* Rims */}
          <div className="mt-8">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-titanium-300">
              Wheels
            </h3>
            <div className="flex flex-col gap-2">
              {CONFIG.rims.map((r) => {
                const selected = rim.id === r.id
                return (
                  <button
                    key={r.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setRim(r)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors ${
                      selected
                        ? 'border-papaya-500/60 bg-papaya-500/10 text-paper'
                        : 'border-white/10 bg-carbon-850 text-titanium-300 hover:border-white/25'
                    }`}
                  >
                    <span className="font-medium">{r.name}</span>
                    <span className="font-mono text-xs text-titanium-500">
                      {r.price === 0 ? 'Included' : `+${money(r.price)}`}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Calipers + wing */}
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-titanium-300">
                Calipers
              </h3>
              <div className="flex flex-wrap gap-2">
                {CONFIG.calipers.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={c.name}
                    aria-pressed={caliper.id === c.id}
                    onClick={() => setCaliper(c)}
                    className={`h-10 w-10 rounded-full border-2 transition-transform ${
                      caliper.id === c.id ? 'scale-110 border-paper' : 'border-white/15 hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-titanium-300">
                Rear aero
              </h3>
              <button
                type="button"
                role="switch"
                aria-checked={wing}
                onClick={() => setWing((v) => !v)}
                className={`flex h-9 items-center gap-2 rounded-full border px-4 text-xs font-medium transition-colors ${
                  wing ? 'border-papaya-500/60 text-paper' : 'border-white/15 text-titanium-500'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${wing ? 'bg-papaya-500' : 'bg-carbon-600'}`} />
                Active wing {wing ? 'on' : 'off'}
              </button>
            </div>
          </div>

          {/* Hotspot readout */}
          <div className="mt-8 min-h-[84px] border-t border-white/10 pt-5">
            <AnimatePresence mode="wait">
              {hotspot ? (
                <motion.div
                  key={hotspot}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-papaya-400">
                    {HOTSPOT_INFO[hotspot] ? 'Component focus' : 'Component focus'}
                  </h4>
                  <p className="mt-1 text-sm font-light text-titanium-300">
                    {HOTSPOT_INFO[hotspot] ?? 'Click the body, canopy or wing to inspect the build.'}
                  </p>
                </motion.div>
              ) : (
                <p className="text-xs font-light italic text-titanium-500">
                  Drag to orbit · click the body, canopy or wing to inspect a component.
                </p>
              )}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="mt-6 flex items-end justify-between rounded-2xl border border-white/10 bg-carbon-850 p-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-titanium-500">Estimated total</p>
              <p className="mt-1 font-display text-3xl font-bold text-paper">{money(total)}</p>
            </div>
            <span className="max-w-[9rem] text-right text-[10px] font-light leading-tight text-titanium-500">
              Illustrative concept pricing. No order is placed.
            </span>
          </div>
        </div>

        {/* Viewport — sticky on mobile so the car stays visible while the
            controls scroll over it; static on desktop (side-by-side layout). */}
        <div ref={canvasWrap} className="sticky top-0 order-1 z-20 h-[45vh] w-full bg-gradient-to-b from-carbon-850 to-carbon-950 lg:static lg:order-2 lg:h-full lg:w-[62%]">
          <Canvas
            shadows={profile.shadows}
            dpr={profile.dpr}
            camera={{ position: [4.2, 1.7, 4.6], fov: 40 }}
            onCreated={({ gl }) => (gl.toneMapping = 4)}
          >
            <color attach="background" args={['#0a0a0c']} />
            <StageLights />
            <StudioEnvironment />
            <Suspense fallback={null}>
              <group position={[0, -0.35, 0]}>
                <ConceptCar
                  paint={paint}
                  rimColor={rim.color}
                  caliperColor={caliper.hex}
                  wing={wing}
                  reducedMotion={profile.reducedMotion}
                  onHotspot={setHotspot}
                />
              </group>
              {profile.reflector ? (
                <Floor reflector />
              ) : (
                <ContactShadows position={[0, 0.01, 0]} opacity={0.7} scale={16} blur={2.4} far={5} />
              )}
            </Suspense>
            <OrbitControls
              enablePan={false}
              enableZoom
              autoRotate={!profile.reducedMotion}
              autoRotateSpeed={0.6}
              minDistance={3.4}
              maxDistance={8}
              minPolarAngle={0.15}
              maxPolarAngle={Math.PI / 2 - 0.02}
            />
          </Canvas>

          <div className="pointer-events-none absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.3em] text-titanium-500">
            Real-time · {profile.compact ? 'Lite' : 'High'} fidelity
          </div>
        </div>
      </div>
    </section>
  )
}
