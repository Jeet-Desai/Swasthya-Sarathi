import "./register.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register-main-container">
      <div className="register-grid">
        <div className="register-section-hospital">
          <h3>
            For <span>Hospital</span>
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            nec est sit amet erat posuere pulvinar. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
          <Link to="/signup-hos">
            <button className="register-btn">Register</button>
          </Link>
        </div>

        <div className="register-section-patient">
          <h3>
            For <span>Patient</span>
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            nec est sit amet erat posuere pulvinar. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
          <Link to="/signup-patient">
            <button className="register-btn">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
