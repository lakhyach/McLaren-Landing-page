import React, { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

/**
 * ConceptCar — loads the ORIGINAL, Blender-authored VELOCE GT-01 hypercar GLB
 * (a real, detailed, interactive 3D mesh — no third-party asset) and drives its
 * PBR materials live: paint, rims and calipers recolour the actual model, the
 * active wing toggles, and named parts report hotspots.
 *
 * The model is authored in metres (front +X, up +Z in Blender → Y-up on export)
 * and is normalised here so it always sits on the floor and matches the scene.
 */

const MODEL_URL = '/veloce-gt01.glb'
const TARGET_LEN = 2.9 // scene units the car is scaled to

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
  // and apply the one-time premium clearcoat tuning while creating them.
  const { model, mats } = useMemo(() => {
    const root = scene.clone(true)
    const materials = {}
    root.traverse((o) => {
      if (!o.isMesh) return
      const src = Array.isArray(o.material) ? o.material[0] : o.material
      const clone = src.clone()
      clone.name = src.name
      o.material = clone
      if (!materials[clone.name]) materials[clone.name] = clone
      o.castShadow = true
      o.receiveShadow = false
    })

    const { BodyPaint, Rim, Chrome, Glass, Carbon } = materials
    if (BodyPaint) BodyPaint.setValues({ envMapIntensity: 1.25, clearcoat: 1, clearcoatRoughness: 0.04 })
    if (Rim) Rim.setValues({ metalness: 1, roughness: 0.26, envMapIntensity: 1.5 })
    if (Chrome) Chrome.setValues({ envMapIntensity: 1.6 })
    if (Glass) Glass.setValues({ envMapIntensity: 1.7, clearcoat: 1 })
    if (Carbon) Carbon.setValues({ envMapIntensity: 0.85 })

    // Normalise: centre on X/Z, rest the wheels on y=0, scale to TARGET_LEN.
    const box = new THREE.Box3().setFromObject(root)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const s = TARGET_LEN / (size.x || 1)
    root.scale.setScalar(s)
    root.position.set(-center.x * s, -box.min.y * s, -center.z * s)

    const wrap = new THREE.Group()
    wrap.add(root)
    return { model: wrap, mats: materials }
  }, [scene])

  // Toggle the active rear wing.
  useEffect(() => {
    model.traverse((o) => {
      if (o.name && o.name.startsWith('Wing')) o.visible = wing
    })
  }, [model, wing])

  useFrame((state, delta) => {
    const k = reducedMotion ? 1 : 0.12
    if (mats.BodyPaint) {
      mats.BodyPaint.color.lerp(tmp.set(paint.hex), k)
      mats.BodyPaint.setValues({
        metalness: THREE.MathUtils.lerp(mats.BodyPaint.metalness, paint.metalness ?? 0.7, k),
        roughness: THREE.MathUtils.lerp(mats.BodyPaint.roughness, paint.roughness ?? 0.3, k),
      })
    }
    if (mats.Rim) mats.Rim.color.lerp(tmp.set(rimColor), k)
    if (mats.Caliper) mats.Caliper.color.lerp(tmp.set(caliperColor), k)
    if (group.current && idleSpin && !reducedMotion) group.current.rotation.y += delta * 0.16
  })

  const handleClick = (e) => {
    const n = e.object?.name || ''
    e.stopPropagation()
    if (n.startsWith('Wing')) onHotspot('wing')
    else if (n === 'Cabin') onHotspot('canopy')
    else onHotspot('powertrain')
  }

  return (
    <group ref={group} {...props}>
      <primitive object={model} onClick={handleClick} />
    </group>
  )
}

useGLTF.preload(MODEL_URL)
