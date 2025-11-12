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
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main>
        <Hero />
        <About />
        <Tokenomics />
        <Buy />
        <Roadmap />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}

export default App;
