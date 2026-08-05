import React, { useRef, useState,  } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const ScrollSequence = () => {
  const containerRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  
  // 1. Define the total number of frames you have prepared
  const TOTAL_FRAMES = 70; // Change this to your exact total frame count (e.g., 50, 100, 120)

  // 2. Track the scroll progress of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 3. Map the scroll percentage (0 to 1) directly to your frame indices (1 to TOTAL_FRAMES)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

  // 4. Update the state smoothly whenever the user scrolls
  useMotionValueEvent(frameIndex, "change", (latest) => {
    setCurrentFrame(Math.floor(latest));
  });

  // 5. Helper function to format numbers to match your "frame-001.png" setup
  const formatFrameName = (num) => {
    const padded = String(num).padStart(3, '0');
    return `frames/frame-${padded}.png`; // Assumes files are in public/ or matching your asset path
  };

  return (
    // The wrapper dictates how long the scroll experience lasts. 
    // h-[300vh] means the user scrolls 3 full viewport heights to finish the sequence.
    <div ref={containerRef} className="relative w-full h-[300vh] bg-zinc-950">
      
      {/* Sticky viewport viewport layer that stays locked while frames scrub */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* The active sequence image */}
        <img
          src={formatFrameName(currentFrame)}
          alt={`Sequence frame ${currentFrame}`}
          className="w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Optional Context overlay layout layered on top of the sequence */}
        <div className="absolute inset-0 bg-linear-to-r from-zinc-950/40 to-transparent z-10" />
        
        <div className="absolute left-12 md:left-24 top-1/2 -translate-y-1/2 z-20 max-w-md pointer-events-none select-none">
          {/* We can dynamically swap text titles here depending on currentFrame progress later! */}
          <span className="text-xs font-mono tracking-widest text-yellow-400 uppercase">Engineering Depth</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100 mt-2">
            Chassis engineered to endure.
          </h2>
        </div>

        {/* Frame Debugger Indicator (handy for testing) */}
        <div className="absolute bottom-6 left-6 font-mono text-[10px] text-zinc-600 z-20">
          FRAME: {formatFrameName(currentFrame)} / {TOTAL_FRAMES}
        </div>

      </div>
    </div>
  );
};

export default ScrollSequence;