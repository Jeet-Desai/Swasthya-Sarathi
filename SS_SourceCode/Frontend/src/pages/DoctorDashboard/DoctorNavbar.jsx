import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai"; // Import Close Icon
import log from "/assests/images/SS_logo.png"; /* Update all class names to include `doctor-navbar-` prefix */

import "./DoctorNavbar.css";

const navLinks = [
  { path: "/doctor/home", display: "Home" },
  { path: "/doctor/appointments", display: "View Appointments" },
  { path: "/doctor/addmedicalrecord", display: "Add Medical Record" }
];

const DoctorNavbar = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("doctor-navbar-sticky-header");
      } else {
        headerRef.current.classList.remove("doctor-navbar-sticky-header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="doctor-navbar-header-container" ref={headerRef}>
      <div className="doctor-navbar-header-wrapper">
        <div className="doctor-navbar-header-content">
          {/* Toggle Menu Icon - Visible on mobile */}
          <span className="doctor-navbar-menu-icon doctor-navbar-mobile-only" onClick={toggleMenu}>
            <BiMenu />
          </span>

          {/* Logo */}
          <Link to="/homedoctor">
            <div className="doctor-navbar-logo">
              <img src={log} alt="Logo" />
            </div>
          </Link>

          <div className="doctor-navbar-logoname">
            <h1>
              Swasthya <span className="doctor-navbar-logo-span">Sarathi</span>
            </h1>
          </div>

          {/* Desktop Navigation (always visible) */}
          <nav
            className={`doctor-navbar-navigation ${menuOpen ? "doctor-navbar-show-menu" : "doctor-navbar-hide-menu"}`}
            ref={menuRef}
          >
            {/* Close Button (Mobile only) */}
            <span className="doctor-navbar-close-icon doctor-navbar-mobile-only" onClick={toggleMenu}>
              <AiOutlineClose />
            </span>
            <ul className="doctor-navbar-menu-list">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive ? "doctor-navbar-menu-link active" : "doctor-navbar-menu-link"
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
            </ul>
          </nav>

          {/* Nav Right */}
          <div className="doctor-navbar-nav-right">
            <Link to="/login">
              <button className="doctor-navbar-login-button">Logout</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {menuOpen && <div className="doctor-navbar-overlay" onClick={toggleMenu}></div>}
    </header>
  );
};

export default DoctorNavbar;
