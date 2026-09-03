import React from 'react'
import background_footer from '../assets/footer_bg_pic.svg';
import gorefresh_footer from '../assets/gorefresh_footer_pic.svg';
import youtube_footer from '../assets/youtube_footer.svg';
import ig_footer from '../assets/ig_footer.svg';
import fb_footer from '../assets/fb_footer.svg';
import whatsapp_footer from '../assets/whatsapp.png';

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
          Gorefresh foods is a fresh food industry that converts most Nigerian staple foods into their best and most convenient form, without tampering with their composition. 

All food products are organically processed, making them ideal for all age groups.
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
               <a href="https://www.instagram.com/gorefreshfoods?igsh=ZHhsb2EzOXMyM3Zv"><img src={ig_footer}      alt="Instagram" className="w-6 h-6 object-contain"  /></a>
              <img src={fb_footer}      alt="Facebook" className="w-6 h-6 object-contain" />
              <a href="https://wa.link/2bhuqq" target="_blank" rel="noopener noreferrer">
                <svg
                  className="w-6 h-6 text-[#0C850C]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
            </a>

              
             
              <img src={youtube_footer} alt="YouTube" className="w-6 h-6 object-contain" />
              
              
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