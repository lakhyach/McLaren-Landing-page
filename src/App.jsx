import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ScrollSequence from './components/ScrollSequence'; // Import the new section
import FeatureStickyScroll from './components/FeatureStickyScroll'; // Import the new section
import VehicleConfigurator from './components/VehicleConfigurator'; // Import the new section
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-50 font-sans antialiased selection:bg-yellow-400 selection:text-zinc-950">
      
      <Nav />

      <Hero />

      {/* The cinematic scroll animation sequence */}
      <ScrollSequence />
      
      {/* The split layout with sticky visual panel and scrollable text */}
      <FeatureStickyScroll />

      {/* The interactive 3D vehicle configurator */}
      <VehicleConfigurator />
      {/* Footer */}
      <Footer/>
    </div>
  );
}


export default App;