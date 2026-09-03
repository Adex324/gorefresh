import React, { useState } from 'react';
import logo from "../assets/logo.png";
import background from '../assets/background.svg';

import hero_side_pic from '../assets/hero_side_pic.svg';

import HowGorefresh from '../sections/HowGorefresh';
import Marketplace from '../sections/Marketplace';
import Pure from '../sections/Pure';
import Whychooseus from '../sections/Whychooseus';
import CustomerReviews from '../sections/CustomerReviews';
import PapNutrients from '../sections/PapNutrients';
import Footer from '../sections/Footer';
import Navbar from '../components/Navbar';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";





/* ── Hero Component ───────────────────────────────────────── */
const Hero = () => {
 const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);


  return (
    <>
      {/* Section 1 — Hero */}
      <section
        className="relative w-full min-h-screen font-geist flex flex-col bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Navbar */}
         <div>
      <Navbar logo={logo} />
    </div>

        {/* Hero Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  <div className="flex flex-col gap-8 mt-20 md:mt-40 px-6 md:px-20">
    <div>
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#404040] md:w-5/6">Wholesome Pap.</p>
      <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#404040]">Naturally Nourishing.</p>
    </div>
    <div className="flex gap-4">
      <a className="btn-green" href="https://wa.link/2bhuqq">Contact us</a>
      <a href="#marketplace" className="btn-orange">Shop Now</a>
    </div>
  </div>

  {/* Hide on mobile, show on md+ */}
  <div className="flex items-center justify-center px-6 md:px-0">
  <img src={hero_side_pic} alt="" className="w-2/3 md:w-full max-h-[300px] md:max-h-[500px] object-contain" />
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
      <section id="marketplace">
      <Marketplace />
      </section>
      {/* Section 6 — Customer Reviews */}
     <CustomerReviews />
        
    {/* Section 7 — Pap nutrients */}
   <PapNutrients/>

   {/* Section 8 — Pap nutrients */}
    <Footer/>
    </>
  );
};

export default Hero;