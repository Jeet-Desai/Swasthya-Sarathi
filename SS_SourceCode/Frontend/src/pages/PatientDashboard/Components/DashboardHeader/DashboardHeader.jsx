import { useState, useEffect, useRef } from "react";
import "./DashboardHeader.css";
import MyProfileImage from "../../../../assets/images/MyProfile.jpg"; // Import the image
import logo from "../../../../assets/images/rmlogo.png";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { path: "/patient/dashboard", display: "Dashboard" },
  { path: "/patient/bookdoctor", display: "Book an Appointment" },
  {
    path: "/patient/pending-appointment-list",
    display: "Pending Appointments",
  },
  { path: "/patient/pastappointment-list", display: "Past Appointments" },
];

const DashboardHeader = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  // Close menu when clicking outside (for mobile)
  // useEffect(() => {
  //   const handleClickOutside = event => {
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       setMenuOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);
  useEffect(() => {
    // Retrieve the user's name from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);
  const handleLogout = () => {
    alert("Logging out...");
    // Clear user data from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // Navigate to the home page
    navigate("/login");
    window.location.href = "/login/";
  };

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
              <Link
                to="/patient/dashboard"
                onClick={e => {
                  toggleMenu(); // Close menu
                  window.location.href = link.path; // Navigate to the link and trigger page reload
                }}
              >
                <div className="logo">
                  <img src={logo} alt="Logo" />{" "}
                  {/* Corrected to use imported logo */}
                </div>
              </Link>

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
                <div className="nav-mid">
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
                    <li className="mobile-only">
                      <Link
                        to="/patient/profile"
                        className="menu-link"
                        onClick={toggleMenu}
                      >
                        <span className="user-name">{userName}</span>
                      </Link>
                    </li>
                    <li className="mobile-only">
                      <Link
                        to="/login"
                        className="menu-link"
                        onClick={toggleMenu}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>

              {/* Nav Right */}
              <div className="nav-right">
                {/* Profile Button with Circle for Profile Image */}
                <Link to="/patient/profile">
                  <button className="profile-button">
                    <div className="profile-photo">
                      {/* Use the imported image */}
                      <img src={MyProfileImage} alt="User Profile" />
                    </div>
                    <span className="user-name">{userName}</span>
                  </button>
                </Link>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
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
