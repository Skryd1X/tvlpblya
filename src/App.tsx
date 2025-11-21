import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Tokenomics } from './components/sections/Tokenomics';
import { Buy } from './components/sections/Buy';
import { Roadmap } from './components/sections/Roadmap';
import { FAQ } from './components/sections/FAQ';
import { Contacts } from './components/sections/Contacts';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-slate-100 relative overflow-hidden">
      {/* Global background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
      </div>

      <Header />

      <main className="relative z-10">
        <Hero />
        <About />
        <Tokenomics />
        <Buy />
        <Roadmap />
        <FAQ />
        <Contacts />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
