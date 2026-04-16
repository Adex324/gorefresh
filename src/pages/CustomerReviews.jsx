// CustomerReviews.jsx
import React, { useRef, useState, useEffect } from 'react';
import { reviews } from '../data/reviewData'; // adjust path

const StarRating = ({ stars }) => {
  const fullStars = Math.floor(stars);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={i + fullStars} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};

const CustomerReviews = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollButtons();
    container.addEventListener('scroll', checkScrollButtons);
    window.addEventListener('resize', checkScrollButtons);

    return () => {
      container.removeEventListener('scroll', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, []);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const firstCard = container.querySelector('.review-card');
    if (!firstCard) return;

    const cardWidth = firstCard.clientWidth;
    const gap = 16; // gap-4 = 1rem
    const scrollAmount = cardWidth + gap;

    const newScrollLeft =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#EBF3EB] py-16 px-6 md:px-12 font-geist">
      {/* Centered Title */}
      <p className="text-[#0C850C] font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-10">
        Customer Reviews
      </p>

      {/* Carousel Container with Arrows Overlay */}
      <div className="relative max-w-6xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200 ${
            canScrollLeft
              ? 'hover:bg-[#0C850C] hover:text-white hover:scale-105 cursor-pointer'
              : 'opacity-40 cursor-not-allowed'
          }`}
          aria-label="Scroll left"
          style={{ transform: 'translateY(-50%)', left: '-1rem' }}
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable Container (no visible scrollbar) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-6 scroll-smooth hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reviews.map((reviewer) => (
            <div
              key={reviewer.id}
              className="review-card relative flex-shrink-0 w-64 md:w-72 h-96 rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:z-10 cursor-pointer"
            >
              <img
                src={reviewer.imageUrl}
                alt={`${reviewer.name}'s review`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <StarRating stars={reviewer.stars} />
                <p className="text-white text-sm mt-2 line-clamp-3">"{reviewer.review}"</p>
                <p className="text-white text-sm font-semibold mt-2">— {reviewer.name}</p>
                {reviewer.location && (
                  <p className="text-white/70 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {reviewer.location}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200 ${
            canScrollRight
              ? 'hover:bg-[#0C850C] hover:text-white hover:scale-105 cursor-pointer'
              : 'opacity-40 cursor-not-allowed'
          }`}
          aria-label="Scroll right"
          style={{ transform: 'translateY(-50%)', right: '-1rem' }}
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CustomerReviews;