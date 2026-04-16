import React, { useState } from 'react';
import logo from "../assets/logo.png";
import background from '../assets/background.svg';
import second_background from '../assets/second_background.svg';
import delicious_pic from '../assets/delicious_pic.svg';
import quality_pic from '../assets/quality_pic.svg';
import fastest_pic from '../assets/fastest_pic.svg';
import hero_side_pic from '../assets/hero_side_pic.svg';
import one_icon from '../assets/one_icon.svg';
import two_icon from '../assets/two_icon.svg';
import three_icon from '../assets/three_icon.svg';
import { PRODUCTS } from '../data/marketData'; 
import CustomerReviews from './CustomerReviews';

/* ── Star Rating ─────────────────────────────────────────── */
const StarRating = ({ stars, max = 5 }) => {
  const count = parseInt(stars, 10);
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-[#F76319]' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
};

/* ── Product Card ─────────────────────────────────────────── */
const ProductCard = ({ image, label, stars, price }) => (
  <div className="flex flex-col rounded-lg overflow-hidden border-2 border-gray-200 bg-white 
    transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer">
    <div className="bg-gray-100 flex items-center justify-center p-4 aspect-square">
      <img src={image} alt={label} className="object-contain w-full h-full" />
    </div>
    <div className="p-3 flex flex-col gap-1.5">
      <p className="text-[#404040] font-medium text-sm leading-tight">{label}</p>
      <StarRating stars={stars} />
      <div className="flex items-center justify-between mt-1 flex-wrap gap-2">
        <p className="text-[#404040] font-bold text-base">₦{price.toLocaleString()}</p>
        <button className="btn-green text-xs px-3 py-1.5">Add to cart</button>
      </div>
    </div>
  </div>
);

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

      {/* Section 4 — How Gorefresh Works */}
      <section className="bg-white py-16 px-6 md:px-12 text-center font-geist">
        <div className="bg-[#D8E7D8] p-10 md:p-15 rounded-lg">
          <p className="text-[#0C850C] font-bold text-3xl sm:text-4xl md:text-5xl mb-10">How Gorefresh works</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { img: one_icon,   title: 'Choose Your Products' },
              { img: two_icon,   title: 'Place Your Order' },
              { img: three_icon, title: 'Fastest Delivery' },
            ].map(({ img, title }, index, array) => (
              <div
                key={title}
                className={`flex flex-col items-center justify-center text-center p-6 relative
                  ${index < array.length - 1
                    ? 'border-b border-[#F7641C] pb-6 mb-6 sm:border-b-0 sm:pb-0 sm:mb-0 sm:border-r sm:border-[#F7641C]'
                    : ''
                  }`}
              >
                <img className="w-16 h-16 object-contain mb-4" src={img} alt={title} />
                <p className="text-[#095E08] font-medium text-lg">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — MarketPlace */}
      <section className="bg-white py-16 px-6 md:px-12 font-geist">
        <p className="text-[#0C850C] font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-10">
          MarketPlace
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {PRODUCTS.map((item, index) => (
            <ProductCard key={item.label} {...item} featured={index === 0} />
          ))}
        </div>
      </section>

      {/* Section 6 — Customer Reviews */}
     <CustomerReviews />
    </>
  );
};

export default Hero;