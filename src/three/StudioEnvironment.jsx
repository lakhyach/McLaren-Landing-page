import React from 'react'
import * as THREE from 'three'
import { Environment, Lightformer, ContactShadows, MeshReflectorMaterial } from '@react-three/drei'

/**
 * StudioEnvironment — original, offline-safe lighting rig.
 * Uses drei <Lightformer> panels baked into a small environment map instead of
 * fetching an external HDRI, so builds and deployments never depend on the CDN.
 */
export function StudioEnvironment({ resolution = 256 }) {
  return (
    <Environment resolution={resolution} frames={1}>
      {/* soft key */}
      <Lightformer intensity={2.2} position={[0, 4, -6]} scale={[12, 6, 1]} color="#ffffff" />
      {/* papaya rim from behind-left */}
      <Lightformer
        form="rect"
        intensity={2}
        position={[-6, 2, -3]}
        rotation={[0, Math.PI / 3, 0]}
        scale={[6, 3, 1]}
        color="#ff7a2a"
      />
      {/* cool fill right */}
      <Lightformer
        form="rect"
        intensity={1.6}
        position={[6, 1.5, 2]}
        rotation={[0, -Math.PI / 3, 0]}
        scale={[6, 4, 1]}
        color="#9ec5ff"
      />
      {/* top strip for clearcoat streak */}
      <Lightformer form="ring" intensity={2} position={[0, 6, 2]} scale={4} color="#ffffff" />
    </Environment>
  )
}

export function StageLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 4]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]}>
        <orthographicCamera attach="shadow-camera" args={[-6, 6, 6, -6, 0.1, 30]} />
      </directionalLight>
      <spotLight position={[-6, 4, -4]} angle={0.6} penumbra={1} intensity={12} color="#ff7a2a" />
    </>
  )
}

export function Floor({ reflector = true, ...props }) {
  if (!reflector) {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow {...props}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.9} metalness={0.1} />
      </mesh>
    )
  }
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow {...props}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        resolution={512}
        blur={[400, 200]}
        mixBlur={1}
        mixStrength={3.5}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.2}
        roughness={0.85}
        metalness={0.6}
        mirror={0.35}
        color="#08080a"
      />
    </mesh>
  )
}

export { ContactShadows }
