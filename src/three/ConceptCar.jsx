import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'

/**
 * ConceptCar — an ORIGINAL, fully procedural stylised hypercar built from
 * stacked rounded forms (chassis, bonnet, rear deck, cabin) plus wheels, an
 * active wing and an emissive light signature. No third-party 3D asset.
 *
 * Units are authored "car-scale" then scaled by the parent group.
 */

function Wheel({ position, flip, rimColor, caliperColor }) {
  return (
    <group position={position}>
      {/* tyre (axis along Z so it rolls along X) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.42, 40]} />
        <meshStandardMaterial color="#0b0b0d" roughness={0.85} metalness={0.1} />
      </mesh>
      {/* outer rim face */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, flip * 0.22]}>
        <cylinderGeometry args={[0.34, 0.34, 0.03, 34]} />
        <meshStandardMaterial color={rimColor} roughness={0.28} metalness={0.95} />
      </mesh>
      {/* hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.46, 24]} />
        <meshStandardMaterial color="#1a1a20" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* brake caliper */}
      <mesh position={[0, 0.28, flip * 0.16]}>
        <boxGeometry args={[0.14, 0.2, 0.1]} />
        <meshStandardMaterial color={caliperColor} roughness={0.4} metalness={0.4} emissive={caliperColor} emissiveIntensity={0.15} />
      </mesh>
    </group>
  )
}

export default function ConceptCar({
  paint = { hex: '#ff6a1f', metalness: 0.85, roughness: 0.28 },
  rimColor = '#d4d4d8',
  caliperColor = '#ff6a1f',
  wing = true,
  idleSpin = false,
  reducedMotion = false,
  onHotspot = () => {},
  ...props
}) {
  const group = useRef()

  // One shared paint material so every body panel recolours together.
  const paintMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: paint.hex,
        metalness: paint.metalness,
        roughness: paint.roughness,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        envMapIntensity: 1.0,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const setPaint = (e) => {
    e.stopPropagation()
    onHotspot('powertrain')
  }

  useFrame((state, delta) => {
    if (paintMat) {
      paintMat.color.lerp(new THREE.Color(paint.hex), reducedMotion ? 1 : 0.12)
      paintMat.metalness = THREE.MathUtils.lerp(paintMat.metalness, paint.metalness, 0.12)
      paintMat.roughness = THREE.MathUtils.lerp(paintMat.roughness, paint.roughness, 0.12)
    }
    if (group.current && idleSpin && !reducedMotion) {
      group.current.rotation.y += delta * 0.16
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Chassis */}
      <RoundedBox args={[4.5, 0.62, 1.7]} radius={0.22} smoothness={5} position={[0, 0.52, 0]} castShadow receiveShadow onClick={setPaint} material={paintMat} />

      {/* Bonnet wedge */}
      <RoundedBox args={[1.7, 0.36, 1.55]} radius={0.16} smoothness={4} position={[1.35, 0.78, 0]} scale={[1, 1, 0.92]} castShadow onClick={setPaint} material={paintMat} />

      {/* Rear deck */}
      <RoundedBox args={[1.5, 0.36, 1.6]} radius={0.16} smoothness={4} position={[-1.55, 0.8, 0]} castShadow onClick={setPaint} material={paintMat} />

      {/* Cabin / glass canopy */}
      <RoundedBox
        args={[1.9, 0.6, 1.32]}
        radius={0.28}
        smoothness={5}
        position={[-0.1, 1.02, 0]}
        onClick={(e) => { e.stopPropagation(); onHotspot('canopy') }}
      >
        <meshPhysicalMaterial color="#0a0a0d" metalness={0.4} roughness={0.05} transparent opacity={0.6} envMapIntensity={1.6} />
      </RoundedBox>

      {/* Lower carbon skirt */}
      <RoundedBox args={[3.9, 0.24, 1.55]} radius={0.08} smoothness={3} position={[0, 0.26, 0]}>
        <meshStandardMaterial color="#141418" roughness={0.5} metalness={0.6} />
      </RoundedBox>

      {/* Front splitter + rear diffuser */}
      <RoundedBox args={[0.4, 0.08, 1.6]} radius={0.03} smoothness={2} position={[2.28, 0.26, 0]}>
        <meshStandardMaterial color="#0f0f12" roughness={0.4} metalness={0.7} />
      </RoundedBox>
      <RoundedBox args={[0.4, 0.1, 1.55]} radius={0.03} smoothness={2} position={[-2.32, 0.3, 0]}>
        <meshStandardMaterial color="#0f0f12" roughness={0.4} metalness={0.7} />
      </RoundedBox>

      {/* Light signature */}
      <mesh position={[2.34, 0.62, 0]}>
        <boxGeometry args={[0.05, 0.08, 1.15]} />
        <meshStandardMaterial color="#ffe6c4" emissive="#ffcf9a" emissiveIntensity={0.7} toneMapped={false} />
      </mesh>
      <mesh position={[-2.36, 0.66, 0]}>
        <boxGeometry args={[0.05, 0.08, 1.3]} />
        <meshStandardMaterial color="#ff3b12" emissive="#ff2a00" emissiveIntensity={1.1} toneMapped={false} />
      </mesh>

      {/* Active rear wing */}
      {wing && (
        <group position={[-2.28, 1.12, 0]} onClick={(e) => { e.stopPropagation(); onHotspot('wing') }}>
          <RoundedBox args={[0.36, 0.06, 1.75]} radius={0.02} smoothness={3} castShadow>
            <meshStandardMaterial color="#111116" roughness={0.35} metalness={0.7} />
          </RoundedBox>
          {[-0.72, 0.72].map((z) => (
            <mesh key={z} position={[0.06, -0.28, z]}>
              <boxGeometry args={[0.12, 0.5, 0.06]} />
              <meshStandardMaterial color="#111116" roughness={0.4} metalness={0.7} />
            </mesh>
          ))}
        </group>
      )}

      {/* Wheels */}
      <Wheel position={[1.42, 0.5, 0.86]} flip={1} rimColor={rimColor} caliperColor={caliperColor} />
      <Wheel position={[1.42, 0.5, -0.86]} flip={-1} rimColor={rimColor} caliperColor={caliperColor} />
      <Wheel position={[-1.42, 0.5, 0.86]} flip={1} rimColor={rimColor} caliperColor={caliperColor} />
      <Wheel position={[-1.42, 0.5, -0.86]} flip={-1} rimColor={rimColor} caliperColor={caliperColor} />
    </group>
  )
}
