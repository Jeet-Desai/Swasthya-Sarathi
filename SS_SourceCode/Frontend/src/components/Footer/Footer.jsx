import { Link } from "react-router-dom";
import logo from "../../assets/images/rmlogo.png";
import { AiFillYoutube, AiFillGithub } from "react-icons/ai";
import "./footer.css";

const socialLinks = [
  {
    path: "",
    icon: <AiFillYoutube className="social-icon" />,
  },
  {
    path: "https://github.com/Jeet-Desai/Swasthya-Sarathi",
    icon: <AiFillGithub className="social-icon" />,
  },
];

const quickLinks01 = [
  { path: "/homepatient", display: "Home" },
  { path: "/about-us", display: "About Us" },
];

const quickLinks02 = [
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/", display: "Request an Appointment" },
];

const quickLinks03 = [{ path: "/contact", display: "Contact Us" }];

const Footer = () => {
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
              <Link to={link.path} key={index} className="social-link">
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
                <Link to={item.path} className="footer-link">
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
                <Link to={item.path} className="footer-link">
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
                <Link to={item.path} className="footer-link">
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

export default Footer;
