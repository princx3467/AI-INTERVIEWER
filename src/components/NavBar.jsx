import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="container nav-inner">

        {/* Logo */}
        <div className="nav-logo">
          <img src="/logo.png" alt="MockAI" className="nav-logo-img" />
          Mock<span>AI</span>
        </div>

        {/* Nav Links */}
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#advantages">Advantages</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>

        {/* Profile Button */}
        <div className="nav-profile-wrapper" ref={dropdownRef}>
          <button
            className="nav-profile-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="nav-dropdown">
              <Link
                to="/login"
                className="nav-dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                 Login
              </Link>
              <Link
                to="/signup"
                className="nav-dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                 Sign Up Free
              </Link>
                <Link to="/profile" className="nav-dropdown-item" onClick={() => setIsDropdownOpen(false)}>
       Profile
    </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default NavBar;
