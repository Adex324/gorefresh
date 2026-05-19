import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background.svg';
import logo from '../assets/logo.png';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) return alert('Please fill in both fields');
    if (password !== confirmPassword) return alert('Passwords do not match');
    console.log('New password:', password); // replace with API call later
    navigate('/login');
  };

  const EyeButton = ({ show, onToggle }) => (
    <button
      type="button"
      onClick={onToggle}
      className="text-gray-400 hover:text-[#0C850C] transition-colors"
    >
      {show ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )}
    </button>
  );

  return (
    <section
      className="w-full min-h-screen font-geist flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full max-w-xl flex flex-col items-center gap-6">

        {/* Logo */}
        <img src={logo} alt="Gorefresh Logo" className="w-36" />

        {/* Heading */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">Create new password</h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Your new password must be different from your previous password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">

          {/* New Password */}
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-gray-500 z-10">
              New Password
            </label>
            <div className="flex items-center border border-gray-400 rounded-lg px-4 py-3 gap-2 focus-within:border-[#0C850C] transition-colors">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
              />
              <EyeButton show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-gray-500 z-10">
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-400 rounded-lg px-4 py-3 gap-2 focus-within:border-[#0C850C] transition-colors">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
              />
              <EyeButton show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />
            </div>
          </div>

          {/* Password mismatch warning */}
          {confirmPassword && password !== confirmPassword && (
            <p className="text-red-500 text-xs -mt-4">Passwords do not match</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#0C850C] text-white font-semibold text-lg py-4 rounded-lg hover:bg-[#075207] transition-colors duration-200"
          >
            Reset Password
          </button>
        </form>

      </div>
    </section>
  );
};

export default NewPassword;