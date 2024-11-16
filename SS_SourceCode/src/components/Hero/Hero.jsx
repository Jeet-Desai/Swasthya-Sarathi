import "./hero.css";
import heroImg01 from "../../assets/images/hero-img01.png";
import heroImg02 from "../../assets/images/hero-img02.png";
import heroImg03 from "../../assets/images/hero-img03.png";

const HeroSection = () => {
  return (
    <section className="hero-section custom-hero-padding">
      <div className="container">
        <div className="hero-content">
          {/* Hero Text Content */}
          <div className="hero-text">
            <div className="text-wrapper">
              <h1 className="hero-heading">
                We help patients live a healthy, longer life.
              </h1>
              <p className="hero-description">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it.
              </p>
              <button className="primary-button">Request</button>
            </div>

            {/* Hero Counter Section */}
            <div className="hero-counter">
              <div className="counter-item">
                <h2 className="counter-number">15+</h2>
                <span className="counter-bar locations-bar"></span>
                <p className="counter-label">Clinic Locations</p>
              </div>
              <div className="counter-item">
                <h2 className="counter-number">100%</h2>
                <span className="counter-bar satisfaction-bar"></span>
                <p className="counter-label">Patient Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Hero Image Content */}
          <div className="hero-images">
            <div className="main-image">
              <img src={heroImg01} alt="Hero Image 1" className="full-width" />
            </div>
            <div className="secondary-images">
              <img
                src={heroImg02}
                alt="Hero Image 2"
                className="image-margin"
              />
              <img src={heroImg03} alt="Hero Image 3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
