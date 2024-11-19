import React from "react";
import "./DashboardFooter.css";
import logo from "../../../../assets/images/rmlogo.png";
import youtube from "../../../../assets/images/youtube.webp";
import github from "../../../../assets/images/github.jpg";
import instagram from "../../../../assets/images/instagram.png";
import linkedin from "../../../../assets/images/linkedin.jpg";

const socialLinks = [
  { path: "https://youtube.com/", iconSrc: youtube },
  { path: "https://github.com/Jeet-Desai/Swasthya-Sarathi", iconSrc: github },
  { path: "https://www.instagram.com/", iconSrc: instagram },
  { path: "https://www.linkedin.com/home", iconSrc: linkedin },
];

const quickLinks01 = [
  { path: "/home", display: "Home" },
  { path: "/about-us", display: "About Us" },
];

const quickLinks02 = [
  { path: "/find-a-hospital", display: "Find a Hospital" },
  { path: "/", display: "Request an Appointment" },
  { path: "/", display: "Location" },
];

const quickLinks03 = [{ path: "/contact", display: "Contact Us" }];

const DashboardFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="p-dashboard-footer-container">
      <div className="p-dashboard-footer-content">
        <div className="p-dashboard-footer-branding">
          <img
            src={logo}
            alt="Swasthya Sarathi Logo"
            className="p-dashboard-footer-logo"
          />
          <p className="p-dashboard-footer-copyright">
            Copyright © {year} Swasthya Sarathi
          </p>
          <div className="p-dashboard-footer-social-links">
            {socialLinks.map((link, index) => (
              <a
                href={link.path}
                key={index}
                className="p-dashboard-social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={link.iconSrc}
                  alt={`Social icon for ${link.path}`}
                  className="p-dashboard-social-icon"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="p-dashboard-footer-links">
          <h2 className="p-dashboard-footer-title">QuickLinks</h2>
          <ul className="p-dashboard-footer-link-list">
            {quickLinks01.map((item, index) => (
              <li key={index} className="p-dashboard-footer-link-item">
                <a href={item.path} className="p-dashboard-footer-link">
                  {item.display}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-dashboard-footer-links">
          <h2 className="p-dashboard-footer-title">I want to</h2>
          <ul className="p-dashboard-footer-link-list">
            {quickLinks02.map((item, index) => (
              <li key={index} className="p-dashboard-footer-link-item">
                <a href={item.path} className="p-dashboard-footer-link">
                  {item.display}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-dashboard-footer-links">
          <h2 className="p-dashboard-footer-title">Support</h2>
          <ul className="p-dashboard-footer-link-list">
            {quickLinks03.map((item, index) => (
              <li key={index} className="p-dashboard-footer-link-item">
                <a href={item.path} className="p-dashboard-footer-link">
                  {item.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
