import "./about.css";
import teamImage from "../../assets/images/Photo1.jpg";
import profile1 from "../../assets/images/MyPhoto.jpg";
import jeetPhoto from "../../assets/images/JeetProfile.jpg";

// Sample team data
const teamMembers = [
  {
    name: "Jeet Desai",
    img: `${jeetPhoto}`,
  },
  {
    name: "Member2",
    img: `${profile1}`,
  },
  {
    name: "Member3",
    img: `${profile1}`,
  },
  {
    name: "Member4",
    img: `${profile1}`,
  },
  { name: "Member 5", role: "Role 5", id: "202201522", img: `${profile1}` },
  { name: "Member 6", role: "Role 6", id: "202201522", img: `${profile1}` },
  { name: "Member 7", role: "Role 7", id: "202201522", img: `${profile1}` },
  { name: "Member 8", role: "Role 8", id: "202201522", img: `${profile1}` },
  { name: "Member 9", role: "Role 9", id: "202201522", img: `${profile1}` },
  {
    name: "Member 10",
    img: `${profile1}`,
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
      <div className="our-team">
        <div className="our-team-content">
          <h2 className="our-team-heading">Our team members</h2>
          <p className="our-team-description">
            Building our Swasthya Sarathi System was a journey of dedication and
            innovation. We worked tirelessly to design a user-friendly website
            where patients and doctors can seamlessly interact. The system
            allows patients to register, book appointments, and access medical
            records, while doctors can manage schedules, view patient histories,
            and update prescriptions. Our team focused on intuitive interfaces,
            secure data handling, and smooth functionality, spending countless
            hours coding, testing, and refining to ensure every feature operates
            flawlessly. It was a challenging but rewarding experience that
            reflects our commitment to enhancing healthcare accessibility and
            efficiency.
          </p>
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
