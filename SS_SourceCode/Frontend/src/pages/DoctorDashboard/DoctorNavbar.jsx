import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import MyProfileImage from "../../assets/images/MyProfile.jpg"
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai"; // Import Close Icon
import log from "/assests/images/SS_logo.png"; /* Update all class names to include `doctor-navbar-` prefix */

// import "./DoctorNavbar.css";

const navLinks = [
  { path: "/doctor/home", display: "Home" },
  { path: "/doctor/appointments", display: "View Appointments" }
];

const DoctorNavbar = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
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
  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);
  useEffect(() => {
    // Retrieve the user's name from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="doctor-navbar-header-container" ref={headerRef}>
      <div className="doctor-navbar-header-wrapper">
        <div className="doctor-navbar-header-content">
          {/* Toggle Menu Icon - Visible on mobile */}
          <span
            className="doctor-navbar-menu-icon doctor-navbar-mobile-only"
            onClick={toggleMenu}
          >
            <BiMenu />
          </span>

          {/* Logo */}
          <Link
            to="/doctor/home"
            onClick={e => {
              toggleMenu(); // Close menu
              window.location.href = link.path; // Navigate to the link and trigger page reload
            }}
          >
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
            className={`doctor-navbar-navigation ${
              menuOpen ? "doctor-navbar-show-menu" : "doctor-navbar-hide-menu"
            }`}
            ref={menuRef}
          >
            {/* Close Button (Mobile only) */}
            <span
              className="doctor-navbar-close-icon doctor-navbar-mobile-only"
              onClick={toggleMenu}
            >
              <AiOutlineClose />
            </span>
            <ul className="doctor-navbar-menu-list">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "doctor-navbar-menu-link active"
                        : "doctor-navbar-menu-link"
                    }
                    onClick={e => {
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
          <div className="nav-right">
                {/* Profile Button with Circle for Profile Image */}
                <NavLink to="/doctor/profile" onClick={(e) => {
                      window.location.href = "/doctor/profile"; // Navigate to the link and trigger page reload
                    }}  style={{ textDecoration: 'none' }}>
                  <button className="profile-button">
                    <div className="profile-photo">
                      {/* Use the imported image */}
                      <img src={MyProfileImage} alt="User Profile" />
                    </div>
                    <span className="user-name">{userName}</span>
                  </button>
                </NavLink>
                <button
                  className="logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {menuOpen && (
        <div className="doctor-navbar-overlay" onClick={toggleMenu}></div>
      )}
    </header>
  );
};

export default DoctorNavbar;
