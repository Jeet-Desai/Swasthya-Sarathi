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
            Join Us to Transform Healthcare! Register your hospital with
            Swaasthya Sarathi and expand your reach to thousands of patients.
            Simplify appointment management, showcase your top doctors, and
            provide seamless care like never before.
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
            Your Gateway to Smarter Healthcare! Sign up to experience healthcare
            like never before. Discover top-rated doctors, book appointments
            instantly, and keep your medical history at your fingertips. Your
            journey to better health starts here—because you deserve the best
            care!
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
