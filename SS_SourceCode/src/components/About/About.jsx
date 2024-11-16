import "./about.css";
import teamImage from "../../assets/images/Photo1.jpg";

const About = () => {
  return (
    <div className="about-us-wrapper">
      <div className="about-us-header">
        <div className="about-text-container">
          <h2 className="about-heading">Swasthya Sarathi</h2>
        </div>
      </div>
      <div className="about-us-content">
        <div className="about-us-image">
          <img src={teamImage} alt="Team" />
        </div>
        <div className="about-us-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            tincidunt varius metus, vitae facilisis felis. Sed vitae varius
            justo. Maecenas faucibus lectus quam, id ornare velit euismod
            vel.Nunc tempor laoreet ullamcorper.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            tincidunt varius metus, vitae facilisis felis. Sed vitae varius
            justo. Maecenas faucibus lectus quam, id ornare velit euismod
            vel.Nunc tempor laoreet ullamcorper.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
