import React, { useState,useContext } from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../../Context/AuthContext";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";


export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // In a login form, there's typically no 'confirmPassword' field. Remove this validation
    // Check if passwords match on the client side (if applicable)
    // if (formData.password !== formData.confirmPassword) {
    //   toast.error("Passwords do not match!");
    //   setLoading(false);
    //   return;
    // }

    try {
      const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.message);
      }

      // Dispatch login success with correct data
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: data.user,   // Correct data usage here
          token: data.token,  // Correct data usage here
          role: data.role,    // Correct data usage here
        },
      });

      // Store user data in localStorage (optional)
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      toast.success(data.message); // Display success message
      navigate("/patient-dashBoard"); // Navigate to the home page after successful login
    } catch (err) {
      toast.error(err.message); // Show error if login fails
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <section className="logp-login-section">
      <div className="logp-login-container">
        <h3 className="logp-login-heading">
          Hello! <span className="logp-highlight">Welcome</span> Back
        </h3>

        <form className="logp-login-form"  onSubmit={submitHandler}>
          <div className="logp-input-group">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="logp-input-field"
            />
          </div>

          <div className="logp-input-group">
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="logp-input-field"
            />
          </div>

          <div className="logp-input-group">
            <label htmlFor="role" className="logp-role-label">
              Are you a:
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="logp-role-select"
              >
                <option value="">Select</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="hospital">Hospital</option>
              </select>
            </label>
          </div>

          <div className="logp-btn-group">
            <button type="submit" className="logp-login-button">
              Login
            </button>
          </div>

          <p className="logp-signup-text">
            Don&apos;t have an account?
            <Link to="/register" className="logp-signup-link">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
