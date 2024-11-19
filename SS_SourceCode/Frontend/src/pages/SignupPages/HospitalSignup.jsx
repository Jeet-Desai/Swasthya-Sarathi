import React, { useState } from "react";
import "./HospitalSignup.css";
import signupImg from "../../assets/images/rmlogo.png";

const HospitalSignup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Toggle visibility of password fields
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Simulate OTP sending (replace this with an API call)
  const sendOtp = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(generated);

    // Simulate sending OTP (use backend in production)
    alert(`OTP sent to your email: ${generated}`);
  };

  // Verify OTP
  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setIsVerified(true);
      alert("Email verified successfully!");
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  return (
    <section className="hospitalsgp-signup-section">
      <div className="hospitalsgp-signup-container">
        <div className="hospitalsgp-signup-grid">
          {/* Image Box */}
          <div className="hospitalsgp-signup-img-box">
            <figure>
              <img src={signupImg} alt="Sign Up" className="hospitalsgp-signup-img" />
            </figure>
          </div>

          {/* Signup Form */}
          <div className="hospitalsgp-signup-form-container">
            <h3 className="hospitalsgp-signup-heading">
              Create an <span className="hospitalsgp-highlight">account</span>
            </h3>

            <form className="hospitalsgp-signup-form">
              {/* Email Address with OTP Verification */}
              <div className="hospitalsgp-form-group">
                <label className="hospitalsgp-field-instruction">Hospital Email Address:</label>
                <input
                  type="email"
                  placeholder="Enter Hospital Email"
                  name="email"
                  className="hospitalsgp-form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="hospitalsgp-otp-btn"
                  onClick={sendOtp}
                  disabled={isVerified}
                >
                  {isVerified ? "Verified" : "Send OTP"}
                </button>
              </div>

              {generatedOtp && !isVerified && (
                <div className="hospitalsgp-form-group">
                  <label className="hospitalsgp-field-instruction">Enter OTP:</label>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    name="otp"
                    className="hospitalsgp-form-input"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <button type="button" className="hospitalsgp-verify-otp-btn" onClick={verifyOtp}>
                    Verify OTP
                  </button>
                </div>
              )}

              {/* Hospital Name */}
              <div className="hospitalsgp-form-group">
                <label className="hospitalsgp-field-instruction">Hospital Name:</label>
                <input
                  type="text"
                  placeholder="Hospital Name"
                  name="name"
                  className="hospitalsgp-form-input"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="hospitalsgp-form-group password-field">
                <label className="hospitalsgp-field-instruction">Password:</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter Your Password"
                  name="password"
                  className="hospitalsgp-form-input"
                  required
                />
                <button
                  type="button"
                  className="hospitalsgp-toggle-password-btn"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="hospitalsgp-form-group password-field">
                <label className="hospitalsgp-field-instruction">Confirm Password:</label>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Your Password"
                  name="confirmPassword"
                  className="hospitalsgp-form-input"
                  required
                />
                <button
                  type="button"
                  className="hospitalsgp-toggle-password-btn"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? "Hide" : "Show"}
                </button>
              </div>

              {/* Contact Number */}
              <div className="hospitalsgp-form-group">
                <label className="hospitalsgp-field-instruction">Contact Number:</label>
                <input
                  type="tel"
                  placeholder="Contact No."
                  name="contactNo"
                  className="hospitalsgp-form-input"
                  required
                />
              </div>

              {/* Address */}
              <div className="hospitalsgp-form-group">
                <label className="hospitalsgp-field-instruction">Address:</label>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  className="hospitalsgp-form-input"
                  required
                />
              </div>

              {/* Registration Number */}
              <div className="hospitalsgp-form-group">
                <label className="hospitalsgp-field-instruction">Registration Number:</label>
                <input
                  type="text"
                  placeholder="Registration No."
                  name="registerNo"
                  className="hospitalsgp-form-input"
                  required
                />
              </div>

              {/* Ownership Type */}
              <div className="hospitalsgp-form-group">
                <label className="hospitalsgp-field-instruction">Ownership Type:</label>
                <input
                  list="owner-options"
                  type="text"
                  placeholder="Select Ownership Type"
                  name="owner"
                  className="hospitalsgp-form-input"
                  required
                />
                <datalist id="owner-options">
                  <option value="Private" />
                  <option value="Semi-Government" />
                  <option value="Government" />
                </datalist>
              </div>

              <div className="hospitalsgp-form-group">
                <label className="hospitalsgp-field-instruction">Departments:</label>
                <select
                  name="departments"
                  className="hospitalsgp-form-input"
                  multiple
                  required
                >
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopaedic">Orthopaedic</option>
                  <option value="Paediatric">Paediatric</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Psychiatrist">Psychiatrist</option>
                  <option value="ENT">ENT</option>
                </select>
                <small className="hospitalsgp-form-helper-text">
                  Hold down the Ctrl (Windows) or Command (Mac) key to select multiple options.
                </small>
              </div>

              <div className="hospitalsgp-form-group">
                {/* Website Link */}
                <label className="hospitalsgp-field-instruction">Website:</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  name="website"
                  className="hospitalsgp-form-input"
                  required
                />
              </div>

              <div className="hospitalsgp-form-group">
                {/* Image Upload */}
                <label className="hospitalsgp-field-instruction">Upload Image:</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hospitalsgp-form-input"
                  required
                />
                <small className="hospitalsgp-form-helper-text">Supported formats: JPG, PNG, GIF.</small>
              </div>

              <div className="hospitalsgp-form-group">
                <label className="hospitalsgp-field-instruction">Description:</label>
                <textarea
                  name="description"
                  placeholder="Enter a detailed description here..."
                  className="hospitalsgp-form-input"
                  rows="5"
                  required
                ></textarea>
              </div>

              <div className="hospitalsgp-form-group">
                <button type="submit" className="hospitalsgp-form-submit-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalSignup;
