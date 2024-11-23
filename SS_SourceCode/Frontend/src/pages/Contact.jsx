import "./contact.css";
import profile1 from "../assets/images/MyPhoto.jpg";
import jeetPhoto from "../assets/images/JeetProfile.jpg";
import harshPhoto from "../assets/images/HarshProfile.jpg";
import jeminiPhoto from "../assets/images/jeminiProfile.jpg";
import mayankPhoto from "../assets/images/MaynakProfile.jpg";
import anujPhoto from "../assets/images/AnujProfile.jpg";
import aryanPhoto from "../assets/images/AryanProfile.jpg";

const teamMembers = [
  {
    name: "Jeet Desai",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",

    img: `${jeetPhoto}`,
  },
  {
    name: "Jemini Chaudhari",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",
    img: `${jeminiPhoto}`,
  },
  {
    name: "Mayank Parmar",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",

    img: `${mayankPhoto}`,
  },
  {
    name: "Anuj Valambhiya",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",

    img: `${anujPhoto}`,
  },
  {
    name: "Arnold Mochahari",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",
    img: `${profile1}`,
  },
  {
    name: "Harsh Lad",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",
    img: `${harshPhoto}`,
  },
  {
    name: "Aryan Patel",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",
    img: `${aryanPhoto}`,
  },
  {
    name: "Harsh",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",
    img: `${profile1}`,
  },
  {
    name: "Member 9",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",
    img: `${profile1}`,
  },
  {
    name: "Member 10",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",
    img: `${profile1}`,
  },
];

const Contact = () => {
  return (
    <>
      <div className="our-team">
        <div className="our-team-content">
          <h2 className="our-team-heading">Contact Us</h2>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <p>email:{member.email}</p>
              <p>github:{member.github}</p>
              <p>contact:{member.contact}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Contact;
