import React from 'react';
import logo from  "../assets/logo.png";
import background from '../assets/background.svg';

const Hero = () => {
  return (

    <div className="relative w-full h-screen  font-geist flex flex-col flex-1 bg-cover bg-center bg-no-repeat"
     style={{ backgroundImage: `url(${background})` }}>

                {/* Navbar */}  

        <div className='flex gap-50 flex-row px-25 py-6 items-center justify-between bg-white shadow-xl'>
        <img className="flex w-30" src={logo} alt="" />
        <div className='flex gap-15 flex-row hover:text-[#0E840D]'>
            <a className='nav_link' href="">Home</a>
            <a className='nav_link' href="">About Us</a>
            <a className='nav_link' href="">Customer's Dashboard</a>
        </div>
        <div className='flex flex-row gap-10'>
            <a className='px-3 py-2 bg-[#0E840D] text-white rounded'
                href="">Sign Up</a>
            
             <a className='px-3 py-2 bg-[#F76319] text-white rounded-lg'
                 href="">Shop Now</a>
        </div>
        </div>
 
          {/* Hero */}
          <div className='grid-cols-2 justfiy-between mt-40 px-20 font-geist '>
            <div className='flex flex-col gap-10'>
            <div>
            <p className='text-5xl font-bold text-[#404040] w-5/6'>Wholesome Pap.</p>
            <p className='text-5xl font-bold text-[#404040] text-[#404040] w-3/12'>Naturally Nourishing.</p>
            </div>
            <div className='flex flex-row gap-5'>
            <a className='px-4 py-2 bg-[#0E840D] text-white rounded'
                href="">Contact us</a>
            
             <a className='px-4 py-2 bg-[#F76319] text-white rounded-lg'
                 href="">Shop Now</a>
            </div> 
            </div> 
            </div>
            
      
    </div>
  )
}

export default Hero
