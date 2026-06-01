import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../assets/background.svg';
import logo from '../assets/logo.png';
import api from '../api/axios';


const Field = ({ label, name, children, errors }) => (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <label className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-gray-500 z-10">
          {label}
        </label>
        {children}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs ml-1">{errors[name]}</p>
      )}
    </div>
  );
const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ── Validation ───────────────────────────────────────────
  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim())
      newErrors.firstName = 'First name is required';

    if (!form.lastName.trim())
      newErrors.lastName = 'Last name is required';

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+234\d{10}$/.test(form.phone)) {
      newErrors.phone = 'Format must be +2348012345678';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: '' })); // clear field error on type
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await api.post('/users', {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      navigate('/login');
    } catch (error) {
      const msg = error.response?.data?.error?.msg || '';
      if (msg.toLowerCase().includes('email')) {
        setErrors({ email: 'This email is already registered' });
      } else if (msg.toLowerCase().includes('phone')) {
        setErrors({ phone: 'Invalid phone number. Use +2348012345678' });
      } else if (msg.toLowerCase().includes('password')) {
        setErrors({ password: 'Password is too weak' });
      } else {
        setErrors({ general: 'Something went wrong. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Reusable field wrapper ────────────────────────────────
  

  return (
    <section
      className="w-full min-h-screen font-geist flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full max-w-xl flex flex-col items-center gap-6">

        <img src={logo} alt="Gorefresh Logo" className="w-36" />

        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Welcome to Gorefresh Foods</h1>
          <p className="text-sm tracking-widest text-gray-500 mt-1">CREATE ACCOUNT</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">

          {/* First + Last Name */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
            <Field label="First Name" name="firstName" errors={errors}>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full border border-gray-400 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0C850C] transition-colors bg-transparent"
              />
            </Field>
            </div>

            <div className="flex-1"> 
            <Field label="Last Name" name="lastName" errors={errors}>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full border border-gray-400 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0C850C] transition-colors bg-transparent"
              />
            </Field>
          </div>

          </div>
          

          {/* Email */}
          <Field label="Email Address" name="email" errors={errors}>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="johndoe@gmail.com"
              className="w-full border border-gray-400 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0C850C] transition-colors bg-transparent"
            />
          </Field>

          {/* Phone */}
          <Field label="Phone Number" name="phone" errors={errors}>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={(e) => {
      const value = e.target.value.replace(/[^\d+]/g, ''); // only digits and +
       handleChange({ target: { name: 'phone', value } });
      }}
              placeholder="+2348012345678"
              className="w-full border border-gray-400 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0C850C] transition-colors bg-transparent"
            />
          </Field>

          {/* Password */}
          <Field label="Password" name="password" errors={errors}>
            <div className="flex items-center border border-gray-400 rounded-lg px-4 py-3 gap-2 focus-within:border-[#0C850C] transition-colors">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-[#0C850C] transition-colors"
              >
                {showPassword ? (
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
            </div>
          </Field>

          {/* General error */}
          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0C850C] text-white font-bold tracking-widest py-4 rounded-lg hover:bg-[#075207] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-[#0C850C] font-medium underline">Login</Link>
        </p>

      </div>
    </section>
  );
};

export default SignUp;