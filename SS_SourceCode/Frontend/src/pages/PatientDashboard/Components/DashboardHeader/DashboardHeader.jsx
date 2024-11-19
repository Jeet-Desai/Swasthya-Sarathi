import { useState, useEffect, useRef } from "react";
import "./DashboardHeader.css";
import MyProfileImage from "../../../../assets/images/MyProfile.jpg"; // Import the image
import logo from "../../../../assets/images/rmlogo.png"; 


const navLinks = [
  { path: "#Book-an-Appointment", display: "Book an Appointment" },
  { path: "#pending-appointments", display: "Pending Appointments" },
  { path: "#past-appointments", display: "Past Appointments" },
  { path: "#about-us", display: "About Us" },
];

const DashboardHeader = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky-header");
      } else {
        headerRef.current.classList.remove("sticky-header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  // Close menu when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
    <div className="p-dashboard-head">
      <header className="header-container" ref={headerRef}>
          <div className="header-wrapper">
            <div className="header-content">
              {/* Toggle Menu Icon - Visible on mobile */}
              <span className="menu-icon mobile-only" onClick={toggleMenu}>
                ☰
              </span>
              {/* Logo */}
              <a href="#home">
                <div className="logo">
                  <img src={logo} alt="Logo" /> {/* Corrected to use imported logo */}
                </div>
              </a>

              <div className="logoname">
                <h1>
                  Swasthya <span className="logo-span">Sarathi</span>
                </h1>
              </div>

              {/* Desktop Navigation (always visible) */}
              <nav
                className={`navigation ${menuOpen ? "show-menu" : "hide-menu"}`}
                ref={menuRef}
              >
                {/* Close Button (Mobile only) */}
                <span className="close-icon mobile-only" onClick={toggleMenu}>
                  ✕
                </span>
                <ul className="menu-list">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.path}
                        className="menu-link"
                        onClick={toggleMenu} // Close menu on link click
                      >
                        {link.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Nav Right */}
              <div className="nav-right">
                {/* Profile Button with Circle for Profile Image */}
                <a href="#profile">
                  <button className="profile-button">
                    <div className="profile-photo">
                      {/* Use the imported image */}
                      <img src={MyProfileImage} alt="User Profile" />
                    </div>
                    My Profile
                  </button>
                </a>
              </div>
            </div>
          </div>
          {/* Overlay for Mobile Menu */}
          {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
        </header>

    </div>        
    </>

  );
};

export default DashboardHeader;
