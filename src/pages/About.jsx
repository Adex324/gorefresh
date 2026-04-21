import React from 'react'
import Navbar from '../components/Navbar';
import logo from "../assets/logo.png";
import left_green from "../assets/left_green.svg";
import right_green from "../assets/right_green.svg";
import about_go from "../assets/about_go.svg";
import background from '../assets/background.svg';
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section  className="relative w-full min-h-screen font-geist flex flex-col bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${background})` }}>
      <Navbar logo={logo} />
      <div className='flex gap-5 p-10 justify-center items-center text-center '>
        <img src={left_green} alt="" />
        <p className=' text-xl md:text-3xl text-[#0C850C] font-bold'>About us</p>
        <img src={right_green} alt="" />

      </div>
      <div className='flex flex-col p-5 md:grid grid-cols-2 gap-10 '>
      <div className='flex border-black p-1 border-2  mx-20 justify-center items-center text-center gap-10'>
        <img className='w-70 p-1' src={about_go} alt="" />
      </div>
      <div className='flex flex-col justify-center items-center '>
        <div className='flex flex-col gap-5 items-center justify-center mb-10  text-[#707070]'>
        <p>Gorefresh foods is a digital fresh food marketplace that connects producers directly to customers, enabling the purchase and delivery of organically processed food items with real-time order and delivery tracking. </p>
      <p>Gorefresh foods is a digital fresh food marketplace that connects producers directly to customers, enabling the purchase and delivery of organically processed food items with real-time order and delivery tracking. </p>
     
      </div>
         <Link to="/"  className="btn-green w-40 h-10 items-center text-center justify-center md:self-start">Back</Link>
      </div>
      
      
      </div>
    </section>
  )
}

export default About
