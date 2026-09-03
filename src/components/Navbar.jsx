import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import api from "../api/axios";
import { UserAuthService } from "../utils/userAuthService";

const Navbar = ({ logo }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Customer's Dashboard", to: "/dashboard" },
  ];

  // Fetch user
  useEffect(() => {
    const loadUser = async () => {
      if (!UserAuthService.isAuthenticated()) return;
      // Try to get stored user data first
      let userData = UserAuthService.getUserData();
      if (!userData) {
        // fetch fresh if missing
        userData = await UserAuthService.fetchAndStoreUser();
      }
      setUser(userData);
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    UserAuthService.logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-25 py-4 bg-white shadow-xl">
        <Link to="/">
          <img className="w-24 md:w-30" src={logo} alt="Logo" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 lg:gap-15">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`nav_link ${location.pathname === to ? "text-[#0C850C] font-semibold" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Side — changes based on login state */}
        <div className="hidden md:flex items-center gap-3 lg:gap-6">
          {user ? (
            <>
              <span className="text-sm text-gray-600">
                Hi,{" "}
                <span className="font-semibold text-[#0C850C]">
                  {user.first_name}
                </span>
              </span>
              <button onClick={handleLogout} className="btn-green">
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-green">
                Sign in
              </Link>
              <a href="#marketplace" className="btn-orange">
                Shop Now
              </a>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg flex flex-col items-start px-6 py-4 gap-4 z-50">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`nav_link ${location.pathname === to ? "text-[#0C850C] font-semibold" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  Hi,{" "}
                  <span className="font-semibold text-[#0C850C]">
                    {user.first_name}
                  </span>
                </span>
                <button onClick={handleLogout} className="btn-green w-fit">
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="btn-green"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <a
                  href="#marketplace"
                  className="btn-orange"
                  onClick={() => setMenuOpen(false)}
                >
                  Shop Now
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
