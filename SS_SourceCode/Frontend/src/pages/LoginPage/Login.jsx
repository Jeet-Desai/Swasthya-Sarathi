import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    gender: "",
  });

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="logp-login-section">
      <div className="logp-login-container">
        <h3 className="logp-login-heading">
          Hello! <span className="logp-highlight">Welcome</span> Back
        </h3>

        <form className="logp-login-form">
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
                name="role"
                value={formData.gender}
                onChange={handleInputChange}
                className="logp-role-select"
              >
                <option value="">Select</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="management">Management</option>
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
