import React, { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

/**
 * ConceptCar — loads the McLaren P1 study GLB (original model by vecarz,
 * www.vecarz.com — Sketchfab, licensed CC-BY 4.0; see README "Asset credits")
 * and drives its real PBR materials live:
 *   • paint   → material bound to the *_Carpaint_* body meshes (Sketchfab's
 *               conversion renames it to "PaletteMaterial005", so we resolve
 *               it by mesh name, never by material name)
 *   • rims    → material of the *_Rim_* meshes ("PaletteMaterial001")
 *   • calipers→ "Brake_Caliper"
 *   • wing    → g_Wing* nodes toggle for the active-aero story
 * Palette materials bake their colour into a shared 32×4 palette texture, so
 * we detach that baseColor map and drive the plain colour factor instead —
 * keeping the metallicRoughness texture for the flake response.
 * Named parts also report click hotspots (wing / canopy / powertrain).
 *
 * The GLB is Sketchfab-normalised (length along Z, ~2.0 units). We re-scale it
 * to TARGET_LEN along its long axis, rest the tyres on y=0 and point the nose
 * toward +X so the existing camera rig keeps its framing.
 */

const MODEL_URL = '/mclaren-p1.glb'
const TARGET_LEN = 3.05 // scene units along the car's long axis
const NOSE_SIGN = -1 // nose toward +X so the hero camera sees the front 3/4
const DEFAULT_PAINT = '#ff6a1f' // Papaya Spark (content.js CONFIG.paints[0])
const DEFAULT_RIM = '#d4d4d8'
const DEFAULT_CALIPER = '#ff6a1f'

export default function ConceptCar({
  paint = { hex: '#ff6a1f', metalness: 0.7, roughness: 0.3 },
  rimColor = '#d4d4d8',
  caliperColor = '#ff6a1f',
  wing = true,
  idleSpin = false,
  reducedMotion = false,
  onHotspot = () => {},
  ...props
}) {
  const { scene } = useGLTF(MODEL_URL)
  const group = useRef()
  const tmp = useMemo(() => new THREE.Color(), [])

  // Clone the imported scene once so each <Canvas> instance owns independent
  // material copies (hero and configurator never fight over shared materials),
  // and collect the handles we animate by real material name.
  const { model, mats } = useMemo(() => {
    const root = scene.clone(true)
    const materials = {}
    // One clone per SOURCE material, shared by every mesh that used it — so
    // recolouring hits all four rims/calipers at once, while each Canvas
    // instance still owns independent copies of the imported scene.
    const cache = new Map()
    const cloneOf = (src) => {
      if (!cache.has(src.uuid)) {
        const c = src.clone()
        c.name = src.name
        cache.set(src.uuid, c)
        if (!materials[c.name]) materials[c.name] = c
      }
      return cache.get(src.uuid)
    }
    root.traverse((o) => {
      if (!o.isMesh) return
      const single = !Array.isArray(o.material)
      o.material = single ? cloneOf(o.material) : o.material.map(cloneOf)
      o.castShadow = true
      o.receiveShadow = false
      // Paint and rim materials are renamed "PaletteMaterial00N" on this
      // export — resolve them through the mesh name ({obj}_{Material}_{n}).
      if (/Carpaint/i.test(o.name) && !/Carpaint_Black/i.test(o.name) && !materials.Carpaint) {
        materials.Carpaint = single ? o.material : o.material[0]
      }
      if (/_Rim_/i.test(o.name) && !materials.Rim) materials.Rim = single ? o.material : o.material[0]
    })

    // Detach the shared palette baseColor strip so the colour factor — which
    // useFrame lerps toward the active swatch — is the whole base colour.
    const unpalette = (m, hex) => {
      if (!m) return
      if (m.map) { m.map = null; m.needsUpdate = true }
      m.color.set(hex)
    }
    unpalette(materials.Carpaint, DEFAULT_PAINT)
    unpalette(materials.Rim, DEFAULT_RIM)
    unpalette(materials.Brake_Caliper, DEFAULT_CALIPER)

    const { Rim, Brake_Caliper, Windows, Clear_Glass, Chrome, Carbon_Mult50, Taillights, Headlights } = materials
    if (materials.Carpaint) materials.Carpaint.setValues({ envMapIntensity: 1.35, clearcoat: 1, clearcoatRoughness: 0.05 })
    if (Rim) Rim.setValues({ metalness: 0.95, roughness: 0.28, envMapIntensity: 1.5 })
    if (Brake_Caliper) Brake_Caliper.setValues({ metalness: 0.55, roughness: 0.35 })
    if (Chrome) Chrome.setValues({ envMapIntensity: 1.7 })
    if (Windows) Windows.setValues({ envMapIntensity: 1.6, clearcoat: 1 })
    if (Clear_Glass) Clear_Glass.setValues({ envMapIntensity: 1.6 })
    if (Carbon_Mult50) Carbon_Mult50.setValues({ envMapIntensity: 0.9 })
    if (Taillights) Taillights.setValues({ envMapIntensity: 1 })
    if (Headlights) Headlights.setValues({ envMapIntensity: 1.4 })

    // Normalise: long axis → X (nose +X), centre on X/Z, tyres on y=0.
    const box = new THREE.Box3().setFromObject(root)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const longAxis = size.z > size.x ? 'z' : 'x'
    const s = TARGET_LEN / (longAxis === 'z' ? size.z : size.x)

    const wrap = new THREE.Group()
    root.scale.setScalar(s)
    root.position.set(-center.x * s, -box.min.y * s, -center.z * s)
    wrap.rotation.y = longAxis === 'z' ? NOSE_SIGN * Math.PI / 2 : (NOSE_SIGN === 1 ? 0 : Math.PI)
    wrap.add(root)

    // Re-measure after orientation so the wrapper sits exactly on y=0.
    const box2 = new THREE.Box3().setFromObject(wrap)
    root.position.y -= box2.min.y

    return { model: wrap, mats: materials }
  }, [scene])

  // Toggle the active rear wing (g_Wing, g_Wing_Guide, g_Wing_Turn).
  useEffect(() => {
    model.traverse((o) => {
      if (o.name && /^g?_?Wing|Wing_/i.test(o.name)) o.visible = wing
    })
  }, [model, wing])

  useFrame((state, delta) => {
    const k = reducedMotion ? 1 : 0.12
    if (mats.Carpaint) {
      mats.Carpaint.color.lerp(tmp.set(paint.hex), k)
      mats.Carpaint.setValues({
        metalness: THREE.MathUtils.lerp(mats.Carpaint.metalness, paint.metalness ?? 0.7, k),
        roughness: THREE.MathUtils.lerp(mats.Carpaint.roughness, paint.roughness ?? 0.3, k),
      })
    }
    if (mats.Rim) mats.Rim.color.lerp(tmp.set(rimColor), k)
    if (mats.Brake_Caliper) mats.Brake_Caliper.color.lerp(tmp.set(caliperColor), k)
    if (group.current && idleSpin && !reducedMotion) group.current.rotation.y += delta * 0.16
  })

  const handleClick = (e) => {
    const n = e.object?.name || ''
    e.stopPropagation()
    if (/Wing/i.test(n)) onHotspot('wing')
    else if (/Window|Cockpit|Seat|Door|Mirror/i.test(n)) onHotspot('canopy')
    else onHotspot('powertrain')
  }

  return (
    <group ref={group} {...props}>
      <primitive object={model} onClick={handleClick} />
    </group>
  )
}

useGLTF.preload(MODEL_URL)
