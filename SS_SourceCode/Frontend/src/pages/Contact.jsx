import "./contact.css";
import profile1 from "../assets/images/MyPhoto.jpg";
import jeetPhoto from "../assets/images/JeetProfile.jpg";

const teamMembers = [
  {
    name: "Jeet Desai",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",

    img: `${jeetPhoto}`,
  },
  {
    name: "Member2",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",
    img: `${profile1}`,
  },
  {
    name: "Member3",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",

    img: `${profile1}`,
  },
  {
    name: "Member4",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",

    img: `${profile1}`,
  },
  {
    name: "Member 5",
    role: "Role 5",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",
    img: `${profile1}`,
  },
  {
    name: "Member 6",
    role: "Role 6",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",
    img: `${profile1}`,
  },
  {
    name: "Member 7",
    role: "Role 7",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",
    img: `${profile1}`,
  },
  {
    name: "Member 8",
    role: "Role 8",

    email: "@gmail.com",
    github: "https//github",
    contact: "6000649992",
    img: `${profile1}`,
  },
  {
    name: "Member 9",
    role: "Role 9",

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
  );
};

export default Contact;
