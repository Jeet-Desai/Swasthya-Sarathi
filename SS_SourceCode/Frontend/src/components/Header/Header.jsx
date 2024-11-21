import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import log from "../../assets/images/rmlogo.png";
import "./header.css";

const navLinks = [
  { path: "/", display: "Home" },
  { path: "/doctors", display: "Doctors" },
  { path: "/about-us", display: "About Us" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header-container" ref={headerRef}>
      <div className="header-wrapper">
        <div className="header-content">
          {/* Toggle Menu Icon - Visible on mobile */}
          <span className="menu-icon mobile-only" onClick={toggleMenu}>
            <BiMenu />
          </span>
          {/* Logo */}
          <Link to="/homepatient">
            <div className="logo">
              <img src={log} alt="Logo" />
            </div>
          </Link>

          <div className="logoname">
            <h1>
              Swasthya <span className="logo-span">Sarathi</span>
            </h1>
          </div>

          {/* Desktop Navigation  */}
          <nav
            className={`navigation ${menuOpen ? "show-menu" : "hide-menu"}`}
            ref={menuRef}
          >
            {/* Close Button (Mobile only) */}
            <span className="close-icon mobile-only" onClick={toggleMenu}>
              <AiOutlineClose />
            </span>
            <ul className="menu-list">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive ? "menu-link active" : "menu-link"
                    }
                    onClick={(e) => {
                      toggleMenu(); // Close menu
                      window.location.href = link.path; // Navigate to the link and trigger page reload
                    }}
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
              {/* Mobile view added register and login on navbar*/}
              <li className="mobile-only">
                <Link to="/register" className="menu-link" onClick={(e) => {
                      toggleMenu(); // Close menu
                      window.location.href = link.path; // Navigate to the link and trigger page reload
                    }}>
                  Register
                </Link>
              </li>
              <li className="mobile-only">
                <Link to="/login" className="menu-link" onClick={(e) => {
                      toggleMenu(); // Close menu
                      window.location.href = link.path; // Navigate to the link and trigger page reload
                    }}>
                  Login
                </Link>
              </li>
            </ul>
          </nav>

          {/* Nav Right */}
          <div className="nav-right">
            <Link to="/register"  onClick={(e) => {
                      toggleMenu(); // Close menu
                      window.location.href = link.path; // Navigate to the link and trigger page reload
                    }}>
              <button className="login-button">Register</button>
            </Link>
            <Link to="/login"  onClick={(e) => {
                      toggleMenu(); // Close menu
                      window.location.href = link.path; // Navigate to the link and trigger page reload
                    }}>
              <button className="login-button">Login</button>
            </Link>
          </div>
        </div>
      </div>
      {/* Overlay for Mobile Menu */}
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </header>
  );
};

export default Header;
