import React, { useState } from 'react';
import logo from "../assets/logo.png";
import background from '../assets/background.svg';

import hero_side_pic from '../assets/hero_side_pic.svg';

import HowGorefresh from '../sections/HowGorefresh';
import Marketplace from '../sections/Marketplace';
import Pure from '../sections/Pure';
import Whychooseus from '../sections/Whychooseus';
import CustomerReviews from '../sections/CustomerReviews';


/* ── Star Rating ─────────────────────────────────────────── */


/* ── Product Card ─────────────────────────────────────────── */


/* ── Hero Component ───────────────────────────────────────── */
const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Section 1 — Hero */}
      <section
        className="relative w-full min-h-screen font-geist flex flex-col bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 md:px-12 lg:px-25 py-4 bg-white shadow-xl">
          <img className="w-24 md:w-30" src={logo} alt="Logo" />

          <div className="hidden md:flex gap-8 lg:gap-15">
            <a className="nav_link" href="">Home</a>
            <a className="nav_link" href="">About Us</a>
            <a className="nav_link" href="">Customer's Dashboard</a>
          </div>

          <div className="hidden md:flex gap-3 lg:gap-10">
            <a className="btn-green" href="">Sign Up</a>
            <a className="btn-orange" href="">Shop Now</a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg flex flex-col items-start px-6 py-4 gap-4 z-50">
            <a className="nav_link text-base" href="">Home</a>
            <a className="nav_link text-base" href="">About Us</a>
            <a className="nav_link text-base" href="">Customer's Dashboard</a>
            <div className="flex gap-3 pt-2">
              <a className="btn-green" href="">Sign Up</a>
              <a className="btn-orange" href="">Shop Now</a>
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-8 mt-20 md:mt-40 px-6 md:px-20">
            <div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#404040] md:w-5/6">Wholesome Pap.</p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#404040]">Naturally Nourishing.</p>
            </div>
            <div className="flex gap-4">
              <a className="btn-green" href="">Contact us</a>
              <a className="btn-orange" href="">Shop Now</a>
            </div>
          </div>
          <div>
            <img src={hero_side_pic} alt="" />
          </div>
        </div>
      </section>

      {/* Section 2 — Pure & Nutritious */}
     <Pure/>

      {/* Section 3 — Why Choose Us */}
      <Whychooseus />

      {/* Section 4 — How Gorefresh Works */}
      <HowGorefresh/>

      {/* Section 5 — MarketPlace */}
      <Marketplace />
      {/* Section 6 — Customer Reviews */}
     <CustomerReviews />
        
    {/* Section 7 — Pap nutrients */}
    <section className='flex flex-col bg-white items-center text-center justify-center p-5'>
        <p className='items-center text-center justify-center p-6 text-[#000000] max-w-3xl'>Introducing our pap, packed with 4 essential vitamins and minerals, specially formulated to support your physical and mental growth and development.</p>
        
    
    </section>

    </>
  );
};

export default Hero;