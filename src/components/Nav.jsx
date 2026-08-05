import React, { useState, useEffect } from 'react';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    /* Outer container padding pushes the floating panel away from the screen edges */
    <div className="fixed top-0 left-0 w-full z-50 px-6 pt-4 pointer-events-none">
      <nav 
        className={`mx-auto max-w-360 w-full rounded-xl transition-all duration-300 pointer-events-auto border ${
          isScrolled 
            ? 'bg-zinc-950/70 backdrop-blur-md border-zinc-900/80 shadow-lg h-16' 
            : 'bg-transparent border-transparent h-20'
        }`}
      >
        <div className="px-12 h-full flex items-center justify-between text-sm font-medium tracking-wider">
          
          {/* Left Element */}
          <div className="cursor-pointer text-zinc-300 hover:text-zinc-50 transition-colors">
            Discover EXR
          </div>

          {/* Centered Logo with Trademark */}
          <div className="absolute cursor-pointer space-font left-1/2 transform -translate-x-1/2 text-sm tracking-[0.3em] font-bold text-zinc-100 uppercase flex items-start">
            MACLARN
            <span className="text-[9px] tracking-normal font-sans font-light text-zinc-500 ml-0.5 relative -top-1">®</span>
          </div>

          {/* Right Menu + CTA */}
          <div className="flex cursor-pointer items-center gap-8">
            <span className="cursor-pointer text-zinc-400 hover:text-zinc-50 transition-colors hidden sm:inline">Our story</span>
            <span className="cursor-pointer text-zinc-400 hover:text-zinc-50 transition-colors hidden sm:inline">Support</span>
            <button className="bg-yellow-400 cursor-pointer text-zinc-950 px-5 py-2.5 rounded-sm font-semibold flex items-center gap-2 hover:bg-yellow-300 transition-colors">
              Pre-order
              <span className="text-xs border border-zinc-950 rounded-full w-4 h-4 flex items-center justify-center font-bold">+</span>
            </button>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Nav;