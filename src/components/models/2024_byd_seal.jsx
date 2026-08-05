import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function BydSeal({ activeColor, activeRim, setActiveHotspot, ...props }) {
  const { nodes, materials } = useGLTF('/2024_byd_seal-transformed.glb')
  
  // Create references to target components for runtime texture morphing
  const bodyMaterialRef = useRef()
  const brakeMaterialRef = useRef()

  // Intercept every system frame to smoothly transition properties toward the target config state
  useFrame((state, delta) => {
    if (bodyMaterialRef.current) {
      // Linearly interpolate paint color values smoothly over roughly 0.2 seconds
      bodyMaterialRef.current.color.lerp(new THREE.Color(activeColor.hex), 0.15)
      bodyMaterialRef.current.metalness = THREE.MathUtils.lerp(bodyMaterialRef.current.metalness, activeColor.metalness, 0.15)
      bodyMaterialRef.current.roughness = THREE.MathUtils.lerp(bodyMaterialRef.current.roughness, activeColor.roughness, 0.15)
    }
    
    if (brakeMaterialRef.current) {
      // Morph caliper accents dynamically to contrast with the core panel configuration selection
      const targetCaliperColor = activeColor.id === 'stealth-satin' ? '#dc2626' : '#ea580c'
      brakeMaterialRef.current.color.lerp(new THREE.Color(targetCaliperColor), 0.15)
    }
  })

  return (
    <group {...props} dispose={null}>
      {/* Primary Exterior Car Paint Body Panel */}
      <mesh 
        geometry={nodes.bodypaint_A_Car_Paint_0.geometry} 
        scale={0.01}
        onClick={(e) => {
          e.stopPropagation();
          setActiveHotspot('engine');
        }}
      >
        <meshStandardMaterial 
          ref={bodyMaterialRef}
          color={activeColor.hex}
          metalness={activeColor.metalness}
          roughness={activeColor.roughness}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* Wheel Rim Layer */}
      <mesh 
        geometry={nodes.alpha_rim_map_0.geometry} 
        scale={0.01}
        onClick={(e) => {
          e.stopPropagation();
          setActiveHotspot('brake');
        }}
      >
        <meshStandardMaterial 
          color={activeRim.id === 'rim-aero' ? '#1c1917' : '#e4e4e7'}
          metalness={0.95}
          roughness={0.2}
        />
      </mesh>

      {/* Rims Secondary Accents & Badges */}
      <mesh geometry={nodes.blk_B_Rim_0.geometry} material={materials.B_Rim} scale={0.01} />
      <mesh geometry={nodes.badges_rim_Badges_0.geometry} material={materials.rim_Badges} scale={0.01} />
      <mesh geometry={nodes.badges001_map_C_AD_0.geometry} material={materials.map_C_AD} scale={0.01} />

      {/* Glass Windows & Windshield Wrap */}
      <mesh geometry={nodes.b_gls_glass1_0.geometry} scale={0.01}>
        <meshStandardMaterial color="#0d0d0d" roughness={0.02} transparent opacity={0.4} transmission={0.9} />
      </mesh>
      
      {/* Brake Discs & Caliper Clusters */}
      <mesh geometry={nodes.disk_phong27breaks_0.geometry} scale={0.01}>
        <meshStandardMaterial 
          ref={brakeMaterialRef}
          color="#ea580c"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Headlights and Tail light Shells */}
      <mesh geometry={nodes.glass_mat_HL_Glass_0.geometry} material={materials.HL_Glass} scale={0.01} />
      <mesh geometry={nodes.light_cover_tail_light_0.geometry} material={materials.tail_light} scale={0.01} />
      <mesh geometry={nodes.light_texture_map_C_0.geometry} material={materials.map_C} scale={0.01} />
      <mesh geometry={nodes.red_light_texture_red_emis_0.geometry} material={materials.PaletteMaterial005} scale={0.01} />
      <mesh geometry={nodes.Uc_Tail_light_Plas_0.geometry} material={materials.Tail_light_Plas} scale={0.01} />
      <mesh geometry={nodes.sticker001_tail_Light_Ad_0.geometry} material={materials.tail_Light_Ad} scale={0.01} />

      {/* Trim Elements, Plastics, and Chrome Highlights */}
      <mesh geometry={nodes.blk001_black_Col_Mat_0.geometry} material={materials.black_Col_Mat} scale={0.01} />
      <mesh geometry={nodes.blk_rear_light_blk_map_C_Plas_0.geometry} material={materials.map_C_Plas} scale={0.01} />
      <mesh geometry={nodes.blkmat_HL_Mat_0.geometry} material={materials.HL_Mat} scale={0.01} />
      <mesh geometry={nodes.corner_corner1_0.geometry} material={materials.corner1} scale={0.01} />
      <mesh geometry={nodes.crom_chrome1_0.geometry} material={materials.PaletteMaterial002} scale={0.01} />
      <mesh geometry={nodes.defooger_phong22_0.geometry} material={materials.phong22} scale={0.01} />
      <mesh geometry={nodes.glass_mirror_mirror_0.geometry} material={materials.PaletteMaterial003} scale={0.01} />
      <mesh geometry={nodes.lines_tex_HL_CHR_0.geometry} material={materials.HL_CHR} scale={0.01} />
      <mesh geometry={nodes.sensor_cp_plastic_0.geometry} material={materials.cp_plastic} scale={0.01} />

      {/* Tires, Interior Assembly & Undercarriage */}
      <mesh geometry={nodes.tyre_tire_0.geometry} material={materials.tire} scale={0.01} />
      <mesh geometry={nodes.Interior_interior_0.geometry} material={materials.interior} scale={0.01} />
      <mesh geometry={nodes.Interior_sticker_glass_surr_0.geometry} material={materials.PaletteMaterial004} scale={0.01} />
      <mesh geometry={nodes.UC_under_0.geometry} material={materials.under} scale={0.01} />
    </group>
  )
}

useGLTF.preload('/2024_byd_seal-transformed.glb')