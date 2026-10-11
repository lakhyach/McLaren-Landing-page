import React, { useRef, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import ConceptCar from './ConceptCar'
import { StudioEnvironment, StageLights, Floor } from './StudioEnvironment'

// Fires once the hero model has mounted AND painted its first frame — the
// authoritative signal that the car is genuinely on screen (not just fetched).
function ReadySignal({ onReady }) {
  const fired = useRef(false)
  useFrame(() => {
    if (!fired.current) {
      fired.current = true
      requestAnimationFrame(() => onReady?.())
    }
  })
  return null
}

// Cinematic keyframes the camera flies between as the page scrolls.
const KEYS = [
  { p: 0.0, pos: [5.6, 1.6, 5.4], look: [0, 0.5, 0] },
  { p: 0.35, pos: [0.2, 0.9, 6.4], look: [0.2, 0.6, 0] },
  { p: 0.65, pos: [-5.0, 2.6, 3.8], look: [-0.6, 0.6, 0] },
  { p: 1.0, pos: [0.5, 5.0, 6.2], look: [0, 0.3, 0] },
]

const smooth = (t) => t * t * (3 - 2 * t)

function sample(p) {
  const clamped = THREE.MathUtils.clamp(p, 0, 1)
  let i = 0
  while (i < KEYS.length - 1 && clamped > KEYS[i + 1].p) i++
  const a = KEYS[i]
  const b = KEYS[Math.min(i + 1, KEYS.length - 1)]
  const span = b.p - a.p || 1
  const t = smooth(THREE.MathUtils.clamp((clamped - a.p) / span, 0, 1))
  return {
    pos: a.pos.map((v, k) => THREE.MathUtils.lerp(v, b.pos[k], t)),
    look: a.look.map((v, k) => THREE.MathUtils.lerp(v, b.look[k], t)),
  }
}

function CameraRig({ progressRef, reducedMotion }) {
  const { pointer } = useThree()
  const look = useRef(new THREE.Vector3(0, 0.5, 0))

  useFrame((state) => {
    const cam = state.camera
    const p = progressRef.current
    const k = reducedMotion ? KEYS[0] : sample(p)
    const bob = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.5) * 0.05

    // Fit the whole car in narrow/portrait viewports: pull the rig back and
    // widen the vertical fov so the nose and tail stay inside the frame.
    const aspect = state.viewport.aspect
    const fit = THREE.MathUtils.clamp(1.35 / Math.max(aspect, 0.4), 1, 1.6)
    const fov = THREE.MathUtils.clamp(38 + (1.5 - aspect) * 15, 38, 58)
    if (Math.abs(cam.fov - fov) > 0.2) {
      cam.fov = fov
      cam.updateProjectionMatrix()
    }

    const target = new THREE.Vector3(k.pos[0] * fit, k.pos[1] * (1 + (fit - 1) * 0.5) + bob, k.pos[2] * fit)
    // mouse parallax
    target.x += pointer.x * 0.4
    target.y += pointer.y * 0.2
    cam.position.lerp(target, reducedMotion ? 1 : 0.06)

    look.current.lerp(new THREE.Vector3(...k.look), 0.06)
    cam.lookAt(look.current)
  })
  return null
}

export default function HeroScene({ progressRef, profile, onReady }) {
  const { dpr, shadows, reflector, reducedMotion } = profile
  return (
    <Canvas
      shadows={shadows}
      dpr={dpr}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: KEYS[0].pos, fov: 38, near: 0.1, far: 100 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.15
      }}
    >
      <color attach="background" args={['#0a0a0c']} />
      <fog attach="fog" args={['#0a0a0c', 14, 36]} />
      <CameraRig progressRef={progressRef} reducedMotion={reducedMotion} />
      <StageLights />
      <StudioEnvironment />
      <Suspense fallback={null}>
        <ConceptCar idleSpin={!reducedMotion} reducedMotion={reducedMotion} position={[0, 0, 0]} />
        <ReadySignal onReady={onReady} />
      </Suspense>
      {reflector ? (
        <Floor reflector />
      ) : (
        <ContactShadows position={[0, 0.01, 0]} opacity={0.7} scale={20} blur={2.2} far={6} />
      )}
    </Canvas>
  )
}
