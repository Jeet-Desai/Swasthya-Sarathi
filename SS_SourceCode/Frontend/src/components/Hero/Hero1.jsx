import "./hero1.css";
import icon01 from "../../assets/images/icon01.png";
import icon02 from "../../assets/images/icon02.png";
import icon03 from "../../assets/images/icon03.png";

const Hero1 = () => {
  return (
    <section className="hero1-section">
      <div className="hero1-container">
        <div className="hero1-intro-text">
          <h2 className="hero1-section-heading">
            Providing the best medical Services
          </h2>
          <p className="hero1-section-description">
            World-class care for everyone. Our health system offers unmatched
            expertise in health care.
          </p>
        </div>

        <div className="hero1-grid">
          {/* hero Item */}
          <div className="hero1-item">
            <div className="hero1-icon-container">
              <img src={icon01} alt="Find a Doctor" />
            </div>
            <div className="hero1-content">
              <h3 className="hero1-title">Find a Doctor</h3>
              <p className="hero1-description">
                World-class care for everyone. Our health system offers
                unmatched, expert health care, from the lab to the clinic.
              </p>
            </div>
          </div>

          {/* hero Item */}
          <div className="hero1-item">
            <div className="hero1-icon-container">
              <img src={icon02} alt="Find a Location" />
            </div>
            <div className="hero1-content">
              <h3 className="hero1-title">Get Your Medical History</h3>
              <p className="hero1-description">
                World-class care for everyone. Our health system offers
                unmatched, expert health care, from the lab to the clinic.
              </p>
            </div>
          </div>

          {/* hero Item */}
          <div className="hero1-item">
            <div className="hero1-icon-container">
              <img src={icon03} alt="Book Appointment" />
            </div>
            <div className="hero1-content">
              <h3 className="hero1-title">Book Appointment</h3>
              <p className="hero1-description">
                World-class care for everyone. Our health system offers
                unmatched, expert health care, from the lab to the clinic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero1;
