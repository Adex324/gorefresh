import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/background.svg';
import logo from '../assets/logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailLocked, setEmailLocked] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setError(''); // Clear any previous errors
    console.log('Reset requested for:', email); // replace with API call later
    navigate('/verify-code');
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
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">Recover your password</h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            You can request a password reset below. We will send a security code
            to the email address, please make sure it is correct.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

          {/* Email — locks on blur */}
          <div className={`flex items-center justify-between px-4 py-4 rounded-xl border text-sm
            ${emailLocked ? 'bg-gray-200 border-gray-200' : 'bg-transparent border-gray-400'}`}
          >
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => { setError(''); setEmail(e.target.value); }}
              onBlur={() => { if (email) setEmailLocked(true); }}
              readOnly={emailLocked}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
            {emailLocked && (
              <button
                type="button"
                onClick={() => setEmailLocked(false)}
                className="text-[#0C850C] font-medium text-sm ml-2"
              >
                Edit
              </button>
            )}
          </div>

          {/* Submit */}
          {error && (
  <p className="text-red-500 text-sm text-center">{error}</p>
)}
          <button
            type="submit"
            className="w-full bg-[#0C850C] text-white font-semibold text-lg py-4 rounded-xl hover:bg-[#075207] transition-colors duration-200 mt-2"
          >
            Send Code
          </button>
        </form>

        {/* Back to login */}
        <Link
          to="/login"
          className="text-sm text-[#1a1a1a] underline font-semibold hover:text-[#0C850C] transition-colors"
        >
          Back to Login
        </Link>

      </div>
    </section>
  );
};

export default ForgotPassword;