import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/background.svg';
import logo from '../assets/logo.png';
import api from '../api/axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailLocked, setEmailLocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const response = await api.post("/users/login", { email, password });

const token = response.data.data.tokens.access_token;
const refresh = response.data.data.tokens.refresh_token;

// console.log("token:", token); // confirm it prints

localStorage.setItem('token', token);
localStorage.setItem('refresh_token', refresh);

// console.log("saved:", localStorage.getItem('token')); // confirm it saved

// alert("Login successful!");
window.location.href = "/";
    } catch (error) {
      console.log(error);

      if (error.response) {
        setError(error.response.data.detail || "Login failed. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <section
      className="w-full min-h-screen font-geist flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full max-w-xl flex flex-col items-center gap-6">

        {/* Logo */}
        <img src={logo} alt="Gorefresh Logo" className="w-36" />

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">Welcome to Gorefresh Foods</h1>
          <p className="text-sm text-gray-500 mt-2">Use your email or phone number to log in</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

          {/* Email */}
          <div className={`flex items-center justify-between px-4 py-4 rounded-xl border text-sm
            ${emailLocked ? 'bg-gray-200 border-gray-200' : 'bg-transparent border-gray-400'}`}
          >
            <input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => { setError(''); setEmail(e.target.value); }}
              
              onBlur={() => { if (email) setEmailLocked(true); }}
              readOnly={emailLocked}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
            {emailLocked && (
              <button type="button" onClick={() => setEmailLocked(false)} className="text-[#0C850C] font-medium text-sm ml-2">
                Edit
              </button>
            )}
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-400 rounded-xl px-4 py-4 gap-2 focus-within:border-[#0C850C] transition-colors bg-transparent">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => { setError(''); setPassword(e.target.value); }}
              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-[#0C850C] transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                // Eye-off icon
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                // Eye icon
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>

          {/* Submit */}
          {error && (
  <p className="text-red-500 text-sm text-center">{error}</p>
)}
          <button
            type="submit"
            className="w-full bg-[#0C850C] text-white font-semibold text-lg py-4 rounded-xl hover:bg-[#075207] transition-colors duration-200 mt-2"
          >
            Log in
          </button>
        </form>

        {/* Forgot Password */}
        <div className='flex text-sm text-[#1a1a1a] justify-center gap-2 font-semibold'>
        <Link to="/forgot-password" className=" underline  hover:text-[#0C850C] transition-colors">
          Forgot your Password?
        </Link>
        <p>or Don't have an account?</p>
          <Link to="/signup" className=" underline  hover:text-[#0C850C] transition-colors">
           Sign up
        </Link>
        </div>

      </div>
    </section>
  );
};

export default Login;