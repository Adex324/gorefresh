import React, { useState } from 'react';
import logo from "../assets/logo.png";
import background from '../assets/background.svg';
import second_background from '../assets/second_background.svg';
import delicious_pic from '../assets/delicious_pic.svg';
import quality_pic from '../assets/quality_pic.svg';
import fastest_pic from '../assets/fastest_pic.svg';

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

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-8 lg:gap-15">
            <a className="nav_link" href="">Home</a>
            <a className="nav_link" href="">About Us</a>
            <a className="nav_link" href="">Customer's Dashboard</a>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex gap-3 lg:gap-10">
            <a className="btn-green" href="">Sign Up</a>
            <a className="btn-orange" href="">Shop Now</a>
          </div>

          {/* Mobile Hamburger */}
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

        {/* Mobile Menu Dropdown */}
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
        <div className="flex flex-col gap-8 mt-20 md:mt-40 px-6 md:px-20">
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#404040] md:w-5/6">Wholesome Pap.</p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#404040] md:w-3/12">Naturally Nourishing.</p>
          </div>
          <div className="flex gap-4">
            <a className="btn-green" href="">Contact us</a>
            <a className="btn-orange" href="">Shop Now</a>
          </div>
        </div>
      </section>

      {/* Section 2 — Pure & Nutritious */}
      <section
        className="relative w-full min-h-screen font-geist flex flex-col bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${second_background})` }}
      >
        <div className="flex flex-col items-center text-center text-white px-6 pt-12 md:pt-16 gap-4">
          <p className="text-3xl sm:text-4xl md:text-5xl">
            Pure &amp; Nutritious <span className="font-bold block">PAP</span>
          </p>
          <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-sm md:max-w-md">
            Enjoy the wholesome goodness of traditional fermented pap made from premium corn
          </p>
          <a className="px-4 py-2 bg-white text-[#075207] rounded-lg font-medium hover:bg-gray-100 transition-colors" href="">
            Shop Now
          </a>
        </div>
      </section>

      {/* Section 3 — Why Choose Us */}
      <section className="bg-white py-16 px-6 md:px-12 text-center font-geist">
        <p className="text-[#0C850C] font-bold text-3xl sm:text-4xl md:text-5xl mb-10">Why Choose Us?</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {[
            { img: delicious_pic, title: 'Delicious Taste', desc: 'Satisfy your sweet cravings with our irresistible pap' },
            { img: quality_pic,   title: 'Best Quality',    desc: 'Experience the melt in your mouth goodness of our pap' },
            { img: fastest_pic,   title: 'Fastest Delivery',desc: 'Get your pap delivered hot and fresh.' },
          ].map(({ img, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-2">
              <img className="w-14 mb-4" src={img} alt={title} />
              <p className="text-[#534519] font-bold">{title}</p>
              <p className="text-[#534519] font-light text-sm max-w-[200px]">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;