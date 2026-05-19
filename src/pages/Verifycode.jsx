import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/background.svg';
import logo from '../assets/logo.png';

const VerifyCode = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    // Only allow single digit
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // take only last character
    setOtp(newOtp);

    // Auto move to next box
    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move back on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 4) return alert('Please enter the full 4-digit code');
    console.log('OTP submitted:', code); // replace with API call later
    navigate('/new-password');
  };

  return (
    <section
      className="w-full min-h-screen font-geist flex items-center justify-center bg-cover bg-center bg-no-repeat px-6"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full max-w-sm flex flex-col items-center gap-8">

        {/* Logo */}
        <img src={logo} alt="Gorefresh Logo" className="w-36" />

        {/* Heading */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-xl font-bold text-[#1a1a1a]">Security code to reset password</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Insert the security code sent to your email in order to proceed with the password reset.
          </p>
        </div>

        {/* OTP Boxes */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-8">
          <div className="flex gap-4 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-16 h-16 text-center text-xl font-semibold border-2 border-gray-300 rounded-xl outline-none focus:border-[#0C850C] transition-colors bg-transparent"
              />
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#0C850C] text-white font-semibold text-lg py-4 rounded-xl hover:bg-[#075207] transition-colors duration-200"
          >
            Submit
          </button>
        </form>

        {/* Request new code */}
        <button
          onClick={() => console.log('Request new code')} // replace with API call later
          className="text-sm text-[#1a1a1a] underline font-medium hover:text-[#0C850C] transition-colors"
        >
          Request For New Code
        </button>

      </div>
    </section>
  );
};

export default VerifyCode;