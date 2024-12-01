import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai"; // Import Close Icon
import log from "/assests/images/SS_logo.png"; /* Update all class names to include `doctor-navbar-` prefix */
import { useNavigate } from "react-router-dom"; // Add useNavigate
import { toast } from "react-toastify";
import MyProfileImage from "../../assets/images/MyProfile.jpg"

// import "./AdminNavbar.css";

const navLinks = [
  { path: "/admin/home", display: "Home" },
  { path: "/admin/appointments", display: "View Appointments" },
  { path: "/admin/adddoctor", display: "Add Doctor" },
];

const AdminNavbar = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [userName, setUserName] = useState('');
  const handleLogout = () => {
    alert("Logging out...");
    // Clear all stored data
    localStorage.clear();
    // Show success message
    toast.success("Logged out successfully");
    // Navigate to login page
    window.location.href = "/login";
  };

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
            to="/admin/home"
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
                    }} // Close menu on link click
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
                <NavLink to="/admin/profile" onClick={(e) => {
                      window.location.href = "/admin/profile"; // Navigate to the link and trigger page reload
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

export default AdminNavbar;
