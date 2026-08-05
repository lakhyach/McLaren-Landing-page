import React from 'react';

const Hero = () => {
  return (
    <header className="relative w-full h-screen flex items-center overflow-hidden">
      
      {/* Placeholder for hero.png Background */}
      {/* <div className="absolute inset-0 bg-zinc-900/50 mix-blend-multiply z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" /> */}
      <img src="hero.png" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover" />

      {/* Hero Content Layer */}
      <div className="relative z-20 w-full max-w-360 mx-auto px-12 flex flex-col justify-end pb-24 h-full">
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

      </div>

    </header>
  );
};

export default Hero;