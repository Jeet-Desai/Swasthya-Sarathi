import { Link } from "react-router-dom";
import logo from "../../assets/images/rmlogo.png";
import { AiFillYoutube, AiFillGithub } from "react-icons/ai";
import "./footer.css";

const socialLinks = [
  {
    path: "https://www.youtube.com",
    icon: <AiFillYoutube className="social-icon" />,
  },
  {
    path: "https://github.com/Jeet-Desai/Swasthya-Sarathi",
    icon: <AiFillGithub className="social-icon" />,
  },
];

const quickLinks01 = [
  { path: "/doctor/home", display: "Home" },
  { path: "/doctor/about-us", display: "About Us" },
];

const quickLinks02 = [
  { path: "/doctor/appointments", display: "View Appointment" },
  { path: "/doctor/addmedicalrecord", display: "Add Medical Record" },
];

const quickLinks03 = [{ path: "/doctor/contact", display: "Contact Us" }];

const DoctorFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-branding">
          <img src={logo} alt="Logo" className="footer-logo" />
          <p className="footer-copyright">
            Copyright © {year} Swasthya Sarathi
          </p>
          <div className="footer-social-links">
            {socialLinks.map((link, index) => (
              <Link
                to={link.path}
                key={index}
                className="social-link"
                onClick={e => {
                  toggleMenu(); // Close menu
                  window.location.href = link.path; // Navigate to the link and trigger page reload
                }}
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-links">
          <h2 className="footer-title">QuickLinks</h2>
          <ul className="footer-link-list">
            {quickLinks01.map((item, index) => (
              <li key={index} className="footer-link-item">
                <Link
                  to={item.path}
                  className="footer-link"
                  onClick={e => {
                    toggleMenu(); // Close menu
                    window.location.href = link.path; // Navigate to the link and trigger page reload
                  }}
                >
                  {item.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links">
          <h2 className="footer-title">I want to</h2>
          <ul className="footer-link-list">
            {quickLinks02.map((item, index) => (
              <li key={index} className="footer-link-item">
                <Link
                  to={item.path}
                  className="footer-link"
                  onClick={e => {
                    toggleMenu(); // Close menu
                    window.location.href = link.path; // Navigate to the link and trigger page reload
                  }}
                >
                  {item.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links">
          <h2 className="footer-title">Support</h2>
          <ul className="footer-link-list">
            {quickLinks03.map((item, index) => (
              <li key={index} className="footer-link-item">
                <Link
                  to={item.path}
                  className="footer-link"
                  onClick={e => {
                    toggleMenu(); // Close menu
                    window.location.href = link.path; // Navigate to the link and trigger page reload
                  }}
                >
                  {item.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default DoctorFooter;
