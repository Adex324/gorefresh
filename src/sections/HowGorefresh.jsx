import React from 'react'
import one_icon from '../assets/one_icon.svg';
import two_icon from '../assets/two_icon.svg';
import three_icon from '../assets/three_icon.svg';

const HowGorefresh = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 text-center font-geist">
        <div className="bg-[#D8E7D8] p-10 md:p-15 rounded-lg">
          <p className="text-[#0C850C] font-bold text-3xl sm:text-4xl md:text-5xl mb-10">How Gorefresh works</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { img: one_icon,   title: 'Mix the powder with room temperature water' },
              { img: two_icon,   title: 'Add boiling water and stir well to avoid lumps' },
              { img: three_icon, title: 'Enjoy the rich taste of the gorefresh pap' },
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
  )
}

export default HowGorefresh
