import "./about.css";
import teamImage from "../../assets/images/Photo1.jpg";
import jeetPhoto from "../../assets/images/JeetProfile.jpg";
import harshPhoto from "../../assets/images/HarshProfile.jpg";
import jeminiPhoto from "../../assets/images/JeminiProfile.jpg";
import mayankPhoto from "../../assets/images/MaynakProfile.jpg";
import anujPhoto from "../../assets/images/AnujProfile.jpg";
import aryanPhoto from "../../assets/images/AryanProfile.jpg";
import nandiniPhoto from "../../assets/images/NandiniProfile.jpg";
import popatiyaPhoto from "../../assets/images/PopHarshProfile.jpg";
import jaikritPhoto from "../../assets/images/JaikritProfile.jpg";
import arnoldPhoto from "../../assets/images/ArnoldProfile.jpg";

// Sample team data
const teamMembers = [
  {
    name: "Jeet Desai",
    img: `${jeetPhoto}`,
  },
  {
    name: "Jemini Chaudhari",
    img: `${jeminiPhoto}`,
  },
  {
    name: "Mayank Parmar",
    img: `${mayankPhoto}`,
  },
  {
    name: "Anuj Valambhiya",
    img: `${anujPhoto}`,
  },
  { name: "Nandini Mandaviya", img: `${nandiniPhoto}` },
  { name: "Harsh Lad", img: `${harshPhoto}` },
  { name: "Aryan Patel", img: `${aryanPhoto}` },
  { name: "Harsh Popatiya", img: `${popatiyaPhoto}` },
  { name: "Jaikrit Sanandiya", img: `${jaikritPhoto}` },
  {
    name: "Arnold Mochahari",
    img: `${arnoldPhoto}`,
  },
];

const About = () => {
  return (
    <div className="about-us-container">
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
              Building our Swasthya Sarathi System was a journey of dedication
              and innovation. We worked tirelessly to design a user-friendly
              website where patients and doctors can seamlessly interact. The
              system allows patients to register, book appointments, and access
              medical records, while doctors can manage schedules, view patient
              histories, and update prescriptions. Our team focused on intuitive
              interfaces, secure data handling, and smooth functionality,
              spending countless hours coding, testing, and refining to ensure
              every feature operates flawlessly. It was a challenging but
              rewarding experience that reflects our commitment to enhancing
              healthcare accessibility and efficiency.
            </p>
          </div>
        </div>
      </div>
      <div className="our-team">
        <div className="our-team-content">
          <h2 className="our-team-heading">Our team members</h2>
          <p className="our-team-description"></p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
