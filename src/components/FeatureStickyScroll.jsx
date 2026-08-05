/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';

const FEATURES_DATA = [
  {
    id: "swap",
    title: "Swap in 30 seconds",
    description: "Rapidly swappable battery architecture designed to eliminate charging friction completely.",
    caption: "Zero downtime. Continuous track pacing.",
    images: [
      "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3QlMjBncmFkaWVudHN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1604076850742-4c7221f3101b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFic3RyYWN0JTIwZ3JhZGllbnRzfGVufDB8fDB8fHww"
    ]
  },
  {
    id: "power",
    title: "Power, instantly",
    description: "Pure electrical torque engineered for blistering responsiveness through any track condition.",
    caption: "Instantaneous delivery. Zero delay.",
    images: [
      "https://images.unsplash.com/photo-1646038572815-43fe759e459b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFic3RyYWN0JTIwZ3JhZGllbnRzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1605184861770-63503faee099?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8"
    ]
  },
  {
    id: "storage",
    title: "Smart storage",
    description: "Robust, speed-inducing frame lines with integrated weatherproof utility chambers built for purpose.",
    caption: "Strongly defined lines. Built for purpose.",
    images: [
      "https://images.unsplash.com/photo-1605184861733-be9f5814095e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM3fHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1605184861755-8f190fea96a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDg3fHx8ZW58MHx8fHx8"
    ]
  },
  {
    id: "silence",
    title: "Ride in silence",
    description: "A near-silent electric powertrain lets you focus entirely on the terrain feedback and natural trails.",
    caption: "Unprecedented clarity through nature.",
    images: [
      "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3QlMjBncmFkaWVudHN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1646038572815-43fe759e459b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFic3RyYWN0JTIwZ3JhZGllbnRzfGVufDB8fDB8fHww"
    ]
  },
  {
    id: "maintenance",
    title: "Less maintenance",
    description: "Fewer moving mechanics means less time wrenching in the garage and vastly more hours tracking data lines out wide.",
    caption: "Engineered reliability. Maximum uptime.",
    images: [
      "https://images.unsplash.com/photo-1604076850742-4c7221f3101b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFic3RyYWN0JTIwZ3JhZGllbnRzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1605184861733-be9f5814095e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM3fHx8ZW58MHx8fHx8"
    ]
  },
  {
    id: "tune",
    title: "Tune your ride",
    description: "Instantly calibrate throttle maps, regen levels, and power limits directly via the dynamic user profiles.",
    caption: "Tailored dynamics on the fly.",
    images: [
      "https://images.unsplash.com/photo-1605184861770-63503faee099?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1605184861755-8f190fea96a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDg3fHx8ZW58MHx8fHx8"
    ]
  }
];

const FeatureStickyScroll = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const activeFeature = FEATURES_DATA[activeIndex];

  return (
    <div ref={containerRef} className="relative w-full bg-zinc-50 text-zinc-950">
      <div className="max-w-360 mx-auto px-12 w-full flex flex-col md:flex-row gap-12 relative">
        
        {/* Left Scrollable Track Column */}
        <div className="w-full md:w-1/2 flex flex-col pt-[30vh] pb-[20vh]">
          {FEATURES_DATA.map((feature, idx) => (
            <FeatureTextRow 
              key={feature.id} 
              feature={feature} 
              index={idx}
              setActiveIndex={setActiveIndex}
            />
          ))}

          {/* Persistent CTA Block Trigger */}
          <div className="min-h-[50vh] flex flex-col justify-center items-start pt-12 select-none">
            <button className="bg-zinc-950 text-zinc-50 px-8 py-4 rounded-full font-medium hover:bg-zinc-800 transition-all flex items-center gap-3 group text-sm">
              Explore the EXR
              <span className="bg-zinc-800 text-zinc-300 w-5 h-5 rounded-full flex items-center justify-center text-xs group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Right Sticky Container Box Panel */}
        <div className="w-full md:w-1/2 h-screen sticky top-0 flex items-center justify-center overflow-hidden py-12">
          {/* Visual Container Frame (No Shadows) */}
          <div className="w-full h-[88vh] mt-18 rounded-2xl overflow-hidden bg-zinc-200 relative border border-zinc-200/60">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "linear" }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={activeFeature.images[0]} 
                  alt={activeFeature.title}
                  className="w-full h-full object-cover"
                />

                {/* Floating Caption Overlay Badge */}
                <div className="absolute bottom-6 right-6 z-30 max-w-xs bg-zinc-900/60 backdrop-blur-md border border-zinc-800/40 px-4 py-2.5 rounded-full shadow-lg">
                  <p className="text-zinc-100 font-sans tracking-wide text-[11px] font-medium leading-none whitespace-nowrap">
                    {activeFeature.caption}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>
    </div>
  );
};

// Sub-Component with high-accuracy Intersection Observer boundary thresholds
const FeatureTextRow = ({ feature, index, setActiveIndex }) => {
  const rowRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 0.65", "start 0.5", "end 0.5", "end 0.35"]
  });

  const titleColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["#d4d4d8", "#09090b", "#09090b", "#d4d4d8"]
  );

  const descOpacity = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [0.15, 1, 1, 0.15]
  );

  // Trigger swap cleanly exactly when the target item sits centered in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveIndex(index);
        }
      },
      {
        rootMargin: "-49% 0px -49% 0px" // Narrow focal plane directly across the screen's center axis
      }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => observer.disconnect();
  }, [index, setActiveIndex]);

  return (
    <div ref={rowRef} className="min-h-[75vh] flex flex-col justify-center select-none">
      <motion.h2 
        style={{ color: titleColor }}
        className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight transition-colors duration-150"
      >
        {feature.title}
      </motion.h2>
      <motion.p 
        style={{ opacity: descOpacity }}
        className="text-zinc-500 text-base md:text-lg max-w-md font-light tracking-wide"
      >
        {feature.description}
      </motion.p>
    </div>
  );
};

export default FeatureStickyScroll;