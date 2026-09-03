import React, { useRef, useState, useEffect } from 'react';
import { reviews } from '../data/reviewData';

const StarRating = ({ stars }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < stars ? 'text-[#F76319]' : 'text-gray-300'} fill-current`} viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ))}
  </div>
);

// ── Review Modal ──────────────────────────────────────────────
const ReviewModal = ({ reviewer, onClose }) => {
  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
      onClick={handleBackdrop}
    >
      <div className="relative rounded-2xl overflow-hidden w-full max-w-sm shadow-2xl">
        {/* Full image covering entire modal */}
        <img
          src={reviewer.imageUrl}
          alt={reviewer.name}
          className="w-full h-[500px] object-cover"
          style={{ objectPosition: 'top center' }}
        />

        {/* Dark gradient overlay — full review text at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 gap-2">
          <StarRating stars={reviewer.stars} />
          <p className="text-white text-sm leading-relaxed">"{reviewer.review}"</p>
          <p className="text-white font-semibold text-sm">— {reviewer.name}</p>
          {reviewer.location && (
            <p className="text-white/70 text-xs flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {reviewer.location}
            </p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const CustomerReviews = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeReview, setActiveReview]     = useState(null); // reviewer being viewed

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    checkScroll();
    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    const card = scrollRef.current?.querySelector('.review-card');
    const amount = (card?.clientWidth ?? 200) + 8;
    scrollRef.current?.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const Arrow = ({ direction, enabled }) => (
    <button
      onClick={() => scroll(direction)}
      disabled={!enabled}
      aria-label={`Scroll ${direction}`}
      className={`absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200
        ${direction === 'left' ? '-left-4' : '-right-4'}
        ${enabled ? 'hover:bg-[#0C850C] hover:text-white cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  );

  return (
    <section className="bg-[#EBF3EB] py-16 px-6 md:px-12 font-geist">
      <p className="text-[#0C850C] font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-4">
        Customer Reviews
      </p>
      <p className="text-center text-gray-500 text-sm mb-10">Tap a card to read the full review</p>

      <div className="relative max-w-6xl mx-auto">
        <Arrow direction="left"  enabled={canScrollLeft}  />
        <Arrow direction="right" enabled={canScrollRight} />

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((reviewer) => (
            <div
              key={reviewer.id}
              onClick={() => setActiveReview(reviewer)}
              className="review-card relative flex-shrink-0 w-44 md:w-52 h-64 md:h-72 rounded-2xl overflow-hidden cursor-pointer
                transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:z-10"
            >
              <img src={reviewer.imageUrl} alt={reviewer.name} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <StarRating stars={reviewer.stars} />
                <p className="text-white text-xs mt-1 line-clamp-2">"{reviewer.review}"</p>
                <p className="text-white text-xs font-semibold mt-1">— {reviewer.name}</p>
                {reviewer.location && (
                  <p className="text-white/70 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {reviewer.location}
                  </p>
                )}
                {/* Tap hint */}
                <p className="text-white/50 text-[10px] mt-1">Tap to read more</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full review modal */}
      {activeReview && (
        <ReviewModal reviewer={activeReview} onClose={() => setActiveReview(null)} />
      )}
    </section>
  );
};

export default CustomerReviews;