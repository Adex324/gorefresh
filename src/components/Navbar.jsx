import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ logo }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home",                 to: "/"          },
    { label: "About Us",             to: "/about"     },
    { label: "Customer's Dashboard", to: "/dashboard" },
  ];

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-25 py-4 bg-white shadow-xl">
        <Link to="/">
          <img className="w-24 md:w-30" src={logo} alt="Logo" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 lg:gap-15">
          {navLinks.map(({ label, to }) => (
            <Link key={to} to={to} className="nav_link">{label}</Link>
          ))}
        </div>

        <div className="hidden md:flex gap-3 lg:gap-10">
          <Link to="/signup"  className="btn-green">Sign Up</Link>
          <Link to="/shop"    className="btn-orange">Shop Now</Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg flex flex-col items-start px-6 py-4 gap-4 z-50">
          {navLinks.map(({ label, to }) => (
            <Link key={to} to={to} className="nav_link" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <Link to="/signup" className="btn-green">Sign Up</Link>
            <Link to="/shop"   className="btn-orange">Shop Now</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;