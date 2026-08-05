/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Config options matching the premium, high-contrast inspiration matrix
const CONFIG_OPTIONS = {
  colors: [
    { id: 'stealth-gunmetal', name: 'Stealth Gunmetal', hex: '#374151', metalness: 0.8, roughness: 0.2 },
    { id: 'apex-red', name: 'Apex Red', hex: '#dc2626', metalness: 0.6, roughness: 0.15 },
    { id: 'volt-orange', name: 'Volt Orange', hex: '#ea580c', metalness: 0.5, roughness: 0.2 },
    { id: 'carbon-satin', name: 'Carbon Satin', hex: '#111827', metalness: 0.9, roughness: 0.3 }
  ],
  rims: [
    { id: 'rim-sport', name: '20" Sport Forged', price: 'Included' },
    { id: 'rim-aero', name: '21" Aero Carbon', price: '+$2,500' }
  ]
};

const VehicleConfigurator = () => {
  const [activeColor, setActiveColor] = useState(CONFIG_OPTIONS.colors[0]);
  const [activeRim, setActiveRim] = useState(CONFIG_OPTIONS.rims[0]);
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-50 font-sans flex flex-col md:flex-row relative overflow-hidden">
      
      {/* LEFT COLUMN: Controls & Configurations */}
      <div className="w-full md:w-2/5 flex flex-col justify-between p-8 md:p-12 z-20 bg-zinc-950/80 backdrop-blur-md border-r border-zinc-900 overflow-y-auto h-screen">
        <div>
          {/* Header Specs */}
          <div className="mb-12">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Configurator</span>
            <h1 className="text-4xl font-bold tracking-tight mt-1 mb-2">McLaren 720S</h1>
            <p className="text-zinc-400 text-sm font-light">Custom specification environment.</p>
          </div>

          {/* Configuration Section: Exterior Paint */}
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-wider text-zinc-400 font-medium mb-4">Exterior Paint</h3>
            <div className="flex gap-4">
              {CONFIG_OPTIONS.colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setActiveColor(color)}
                  className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center relative ${
                    activeColor.id === color.id ? 'ring-2 ring-zinc-50 ring-offset-4 ring-offset-zinc-950 scale-105' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {activeColor.id === color.id && (
                    <motion.div layoutId="activeCheck" className="w-2 h-2 bg-zinc-950 rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-zinc-400 text-xs mt-3 font-medium tracking-wide">{activeColor.name}</p>
          </div>

          {/* Configuration Section: Wheel Rims */}
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-wider text-zinc-400 font-medium mb-4">Wheel Options</h3>
            <div className="flex flex-col gap-3">
              {CONFIG_OPTIONS.rims.map((rim) => (
                <button
                  key={rim.id}
                  onClick={() => setActiveRim(rim)}
                  className={`w-full flex justify-between items-center p-4 rounded-xl border transition-all text-sm font-medium ${
                    activeRim.id === rim.id 
                      ? 'border-zinc-50 bg-zinc-900 text-zinc-50' 
                      : 'border-zinc-850 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span>{rim.name}</span>
                  <span className="text-xs font-light text-zinc-500">{rim.price}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Hotspot Detail Footer */}
        <div className="mt-8 border-t border-zinc-900 pt-6 min-h-[100px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {activeHotspot ? (
              <motion.div
                key={activeHotspot}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500">Component Focus</h4>
                <p className="text-sm font-light mt-1 text-zinc-300">
                  {activeHotspot === 'brake' && 'High-performance carbon-ceramic discs painted in corresponding accent finishes.'}
                  {activeHotspot === 'engine' && 'Twin-turbocharged V8 core generating blistering responsiveness.'}
                </p>
              </motion.div>
            ) : (
              <p className="text-xs font-light text-zinc-500 italic">Select an interactive component hotspot in the viewport to inspect structural blueprints.</p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive 3D Viewport */}
      <div className="w-full md:w-3/5 h-60vh md:h-screen relative bg-gradient-to-b from-zinc-900 to-zinc-950">
        <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
          <color attach="background" args={['#09090b']} />
          <ambientLight intensity={0.5} />
          
          <Stage intensity={0.6} environment="city" adjustCamera={false}>
            {/* Placeholder scene element to confirm container setup */}
            <mesh 
              onClick={() => setActiveHotspot(activeHotspot === 'engine' ? null : 'engine')}
              position={[0, 0.5, 0]}
            >
              <boxGeometry args={[1.5, 0.8, 2.5]} />
              <meshStandardMaterial 
                color={activeColor.hex} 
                metalness={activeColor.metalness} 
                roughness={activeColor.roughness}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
              />
            </mesh>

            {/* Simulated Brake Calliper Hotspot */}
            <mesh 
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspot(activeHotspot === 'brake' ? null : 'brake');
              }}
              position={[0.8, 0.2, 0.8]}
            >
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.2} />
            </mesh>
          </Stage>

          <OrbitControls 
            enableZoom={true} 
            maxPolarAngle={Math.PI / 2} 
            minDistance={3} 
            maxDistance={8} 
          />
        </Canvas>

        {/* Clear Top Right Action HUD */}
        <div className="absolute top-8 right-8 pointer-events-none z-30">
          <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-medium text-zinc-400">
            60FPS Engine Active
          </div>
        </div>
      </div>

    </div>
  );
};

export default VehicleConfigurator;