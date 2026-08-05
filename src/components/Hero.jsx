/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  
  // Total number of frames for the Hero sequence
  const TOTAL_FRAMES = 70;

  // Track the scroll progress of the Hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress (0 to 1) directly to your frames (1 to 70)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

  // Map scroll progress to fade out the text elements as you scroll down
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -20]);

  // Update image frame state
  useMotionValueEvent(frameIndex, "change", (latest) => {
    setCurrentFrame(Math.floor(latest));
  });

  // Formatter to resolve your public asset paths
  const formatFrameName = (num) => {
    const padded = String(num).padStart(3, '0');
    return `frames/frame-${padded}.png`;
  };

  return (
    // Height determines how long you scrub the sequence before moving past the Hero
    <div ref={containerRef} className="relative w-full h-[250vh] bg-zinc-950">
      
      {/* Sticky container to lock the view while scrubbing */}
      <header className="sticky top-0 left-0 w-full h-screen flex items-center overflow-hidden">
        
        {/* Dynamic Image Sequence Background */}
        <img 
          src={formatFrameName(currentFrame)} 
          alt={`Hero Sequence frame ${currentFrame}`} 
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" 
        />

        {/* Hero Content Layer wrapped in motion for fading out */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-20 w-full max-w-360 mx-auto px-12 flex flex-col justify-end pb-24 h-full"
        >
          <div className="max-w-2xl space-y-4">
            <span className="text-lg pristina-font font-mono tracking-widest text-yellow-400 font-medium">
              The MaClaren Exr.
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none text-zinc-100">
              A new era of<br />enduro starts here.
            </h1>
            <p className="text-zinc-400 text-base md:text-lg max-w-md font-light tracking-wide">
              Made for those driven to explore beyond limits.
            </p>
            
            {/* Quick action triggers */}
            <div className="pt-4 flex flex-wrap gap-4 text-sm font-medium">
              <button className="border border-zinc-700 bg-zinc-900/60 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-zinc-800 hover:border-zinc-500 transition-all flex items-center gap-2">
                Explore the car <span className="text-xs">→</span>
              </button>
              <button className="bg-yellow-400 text-zinc-950 px-6 py-3 rounded-full hover:bg-yellow-300 transition-all flex items-center gap-2">
                Configure now <span className="text-xs">→</span>
              </button>
            </div>
          </div>

          {/* Absolute Bottom Centered Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-500 text-xs tracking-widest uppercase font-mono">
            <span>Scroll</span>
            <span className="animate-bounce">↓</span>
          </div>

          {/* VIDEO BADGE CONTAINER (Bottom Right) */}
          <div className="absolute bottom-12 right-12 hidden md:flex items-center gap-4 bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-2.5 rounded-lg max-w-xs group cursor-pointer hover:border-zinc-700 transition-all">
            {/* Zinc-300 Video Preview Frame */}
            <div className="w-24 h-16 bg-zinc-300 rounded-md relative flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
              {/* Play icon overlay */}
              <div className="w-6 h-6 rounded-full bg-zinc-950/80 flex items-center justify-center text-[10px] text-zinc-100 pl-0.5 group-hover:scale-110 transition-transform">
                ▶
              </div>
            </div>
            {/* Meta text block */}
            <div className="pr-4 select-none">
              <div className="text-[11px] font-medium text-zinc-200 line-clamp-1">Play release video</div>
              <div className="text-[10px] font-mono text-zinc-500 mt-0.5">02:56</div>
            </div>
          </div>

        </motion.div>

      </header>
    </div>
  );
};

export default Hero;