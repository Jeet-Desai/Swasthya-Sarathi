import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import log from "../../assets/images/rmlogo.png";
import userImg from "../../assets/images/avatar-icon.png";
import "./header.css";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Hospital" },
  { path: "/about-us", display: "About Us" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
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
          <Link to="/home">
            <div className="logo">
              <img src={log} alt="Logo" />
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
                    onClick={toggleMenu} // Close menu on link click
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Nav Right */}
          <div className="nav-right">
            <div className="user-profile hidden">
              <Link to="/">
                <figure className="profile-picture">
                  <img src={userImg} alt="User" />
                </figure>
              </Link>
            </div>
            <Link to="/login">
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
