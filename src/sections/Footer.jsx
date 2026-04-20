import React from 'react'
import background_footer from '../assets/footer_bg_pic.svg';
import gorefresh_footer from '../assets/gorefresh_footer_pic.svg';
import youtube_footer from '../assets/youtube_footer.svg';
import ig_footer from '../assets/ig_footer.svg';
import fb_footer from '../assets/fb_footer.svg';

const Footer = () => {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 text-black font-geist"
      style={{ backgroundImage: `url(${background_footer})` }}
    >
      {/* Left — Logo + Description */}
      <div className="flex flex-col gap-5">
        <img className="w-40 md:w-50" src={gorefresh_footer} alt="Gorefresh Footer" />
        <p className="font-thin text-sm md:text-base leading-relaxed">
          Pap, commonly known as akamu or ogi in many parts of Nigeria and West Africa, is a smooth,
          fermented cereal pudding made from maize, sorghum, or millet. It is one of the oldest and
          most widely consumed traditional foods across several African cultures. Its simplicity,
          affordability, and nutritional value make it a staple in many homes.
        </p>
      </div>

      {/* Right — Connect + Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

        {/* Connect with us */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl md:text-2xl font-thin">Connect with us</h2>
          <div>
            <p className="font-thin text-sm">Locate Us</p>
            <p className="font-normal text-sm leading-relaxed">
              Abiola Ajimobi Technical University, Ibadan<br />
              Female University Hostel, room 19
            </p>
            <p className="font-light text-sm my-1">or</p>
          </div>
          <div>
            <p className="font-light text-sm mb-2">Social Media</p>
            <div className="flex flex-row gap-4 items-center">
              <img src={youtube_footer} alt="YouTube" className="w-6 h-6 object-contain" />
              <img src={fb_footer}      alt="Facebook" className="w-6 h-6 object-contain" />
              <img src={ig_footer}      alt="Instagram" className="w-6 h-6 object-contain" />
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 font-light text-sm mb-50 md:mb-70 ">
          {['Contact Us', 'Terms of Use', 'Cookie Policy', 'Privacy Policy'].map((link) => (
            <a key={link} href="" className="hover:underline hover:text-[#0C850C] transition-colors duration-200">
              {link}
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Footer