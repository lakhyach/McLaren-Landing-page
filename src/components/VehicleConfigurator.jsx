/* eslint-disable no-unused-vars */
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { BydSeal } from './models/2024_byd_seal'; // Adjust paths as necessary

import { CONFIG_OPTIONS } from '../assets/data';

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

          {/* Coolors Style Dynamic Color Deck Palette UI */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Exterior Paint</h3>
              <span className="text-xs text-zinc-500 font-mono tracking-wider">{activeColor.hex.toUpperCase()}</span>
            </div>
            
            {/* Extended Color Palette Panels */}
            <div className="flex h-32 w-full rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900/20 p-1.5 gap-1">
              {CONFIG_OPTIONS.colors.map((color) => {
                const isSelected = activeColor.id === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => setActiveColor(color)}
                    className="h-full relative transition-all duration-300 ease-out cursor-pointer group flex flex-col justify-end items-center pb-3"
                    style={{ 
                      backgroundColor: color.hex,
                      width: isSelected ? '28%' : '8%'
                    }}
                    title={color.name}
                  >
                    {/* Dynamic Label Display for Extended Strip */}
                    {isSelected && (
                      <motion.span 
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] uppercase tracking-wider font-bold text-zinc-950 bg-white/90 px-2 py-0.5 rounded shadow-sm whitespace-nowrap mb-1"
                      >
                        {color.hex}
                      </motion.span>
                    )}
                    
                    {/* Subtle Hover Overlay indicator */}
                    {!isSelected && (
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-zinc-400 text-xs mt-3 font-medium tracking-wide transition-all">{activeColor.name}</p>
          </div>

          {/* Configuration Section: Wheel Rims */}
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-wider text-zinc-400 font-medium mb-4">Wheel Options</h3>
            <div className="flex flex-col gap-3">
              {CONFIG_OPTIONS.rims.map((rim) => (
                <button
                  key={rim.id}
                  onClick={() => setActiveRim(rim)}
                  className={`w-full flex justify-between items-center p-4 rounded-xl border transition-all text-sm font-medium cursor-pointer ${
                    activeRim.id === rim.id 
                      ? 'border-zinc-50 bg-zinc-900 text-zinc-50' 
                      : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700'
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
                  {activeHotspot === 'engine' && 'Twin-turbocharged V8 chassis configuration yielding raw performance curves.'}
                </p>
              </motion.div>
            ) : (
              <p className="text-xs font-light text-zinc-500 italic">Select an interactive component hotspot in the viewport to inspect structural blueprints.</p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive 3D Viewport */}
      <div className="w-full md:w-3/5 h-[60vh] md:h-screen relative bg-gradient-to-b from-zinc-900 to-zinc-950">
        <Canvas camera={{ position: [0, 1.5, 3.5], fov: 45 }}>
          <color attach="background" args={['#09090b']} />
          <ambientLight intensity={0.7} />
          
          <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-5, 5, -5]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <Stage intensity={0.5} environment="city" adjustCamera={false}>
              <BydSeal 
                activeColor={activeColor} 
                activeRim={activeRim} 
                setActiveHotspot={setActiveHotspot} 
              />
            </Stage>
          </Suspense>

          <OrbitControls 
            enableZoom={true} 
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={2.5} 
            maxDistance={6} 
          />
        </Canvas>

        {/* Top Right HUD Indicator */}
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