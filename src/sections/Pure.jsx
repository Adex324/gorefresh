import React from 'react';
import second_background_mobile from '../assets/green_bg_mobile.svg';
import second_background from '../assets/second_background.svg';

const Pure = () => {
  return (
    <section className="relative w-full min-h-screen font-geist flex flex-col">

      {/* Mobile background — hidden on md+ */}
      <div
        className="absolute inset-0 md:hidden bg-no-repeat bg-center bg-[length:120%]"
        style={{ backgroundImage: `url(${second_background_mobile})` }}
      />

      {/* Desktop background — hidden below md */}
      <div
        className="absolute inset-0 hidden md:block bg-no-repeat bg-center bg-[length:110%]"
        style={{ backgroundImage: `url(${second_background})` }}
      />

      {/* Content — z-10 so it sits above both backgrounds */}
      <div className="relative z-10 flex flex-col items-center text-center text-white px-6 pt-12 md:pt-16 gap-4">
        <p className="text-3xl sm:text-4xl md:text-5xl">
          Pure &amp; Nutritious <span className="font-bold block">PAP</span>
        </p>
        <p className="text-base sm:text-lg md:text-xl max-w-xs sm:max-w-sm md:max-w-md">
          Enjoy the wholesome goodness of traditional fermented pap made from premium corn
        </p>
        <a
          className="px-4 py-2 bg-white text-[#075207] rounded-lg font-medium hover:bg-gray-100 transition-colors"
          href=""
        >
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default Pure;