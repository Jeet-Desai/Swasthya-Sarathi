import "./hero.css";
import heroImg01 from "../../assets/images/doct01.jpg";
import heroImg02 from "../../assets/images/doct02.jpg";
import heroImg03 from "../../assets/images/doct03.jpg";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          {/* Hero Text Content */}
          <div className="hero-text">
            <div className="hero-text-wrapper">
              <h1 className="hero-heading">Welcome! To Swasthya Sarathi.</h1>
              <p className="hero-description">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it.
              </p>
            </div>

            {/* Hero Counter Section */}
          </div>

          {/* Hero Image Content */}
          <div className="hero-images">
            <div className="first-image">
              <img src={heroImg01} alt="Hero Image 1" className="full-width" />
            </div>
            <div className="second-images">
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
