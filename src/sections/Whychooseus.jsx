import React from 'react'
import second_background from '../assets/second_background.svg';
import delicious_pic from '../assets/delicious_pic.svg';
import quality_pic from '../assets/quality_pic.svg';
import fastest_pic from '../assets/fastest_pic.svg';

const Whychooseus = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 text-center font-geist mt-5">
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
  )
}

export default Whychooseus
