import React, { useState } from "react";
import "./Signup.css";
import signupImg from "../../assets/images/rmlogo.png";

const Signup = () => {
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
    <section className="patientsgp-signup-section">
      <div className="patientsgp-signup-container">
        <div className="patientsgp-signup-grid">
          {/* Image Box */}
          <div className="patientsgp-signup-img-box">
            <figure>
              <img src={signupImg}alt="Sign Up" className="patientsgp-signup-img" />
            </figure>
          </div>

          {/* Signup Form */}
          <div className="patientsgp-signup-form-container">
            <h3 className="patientsgp-signup-heading">
              Create an <span className="patientsgp-highlight">account</span>
            </h3>

            <form className="patientsgp-signup-form">
              {/* Email Address with OTP Verification */}
              <div className="patientsgp-form-group">
                <label className="patientsgp-field-instruction">Email Address:</label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  className="patientsgp-form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="patientsgp-otp-btn"
                  onClick={sendOtp}
                  disabled={isVerified}
                >
                  {isVerified ? "Verified" : "Send OTP"}
                </button>
              </div>

              {generatedOtp && !isVerified && (
                <div className="patientsgp-form-group">
                  <label className="patientsgp-field-instruction">Enter OTP:</label>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    name="otp"
                    className="patientsgp-form-input"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <button type="button" className="patientsgp-verify-otp-btn" onClick={verifyOtp}>
                    Verify OTP
                  </button>
                </div>
              )}

              {/* Full Name */}
              <div className="patientsgp-form-group">
                <label className="patientsgp-field-instruction">Full Name:</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  className="patientsgp-form-input"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="patientsgp-form-group password-field">
                <label className="patientsgp-field-instruction">Password:</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter Your Password"
                  name="password"
                  className="patientsgp-form-input"
                  required
                />
                <button
                  type="button"
                  className="patientsgp-toggle-password-btn"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="patientsgp-form-group password-field">
                <label className="patientsgp-field-instruction">Confirm Password:</label>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Your Password"
                  name="confirmPassword"
                  className="patientsgp-form-input"
                  required
                />
                <button
                  type="button"
                  className="patientsgp-toggle-password-btn"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? "Hide" : "Show"}
                </button>
              </div>

              {/* Contact Number */}
              <div className="patientsgp-form-group">
                <label className="patientsgp-field-instruction">Contact Number:</label>
                <input
                  type="tel"
                  placeholder="Contact No."
                  name="contactNo"
                  className="patientsgp-form-input"
                  required
                />
              </div>

              {/* Nationality */}
              <div className="patientsgp-form-group">
                <label className="patientsgp-field-instruction">Nationality:</label>
                <input
                  type="text"
                  placeholder="Nationality"
                  name="nationality"
                  className="patientsgp-form-input"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="patientsgp-form-group">
                <label className="patientsgp-field-instruction">Date of Birth:</label>
                <input
                  type="date"
                  placeholder="Date of Birth"
                  name="dob"
                  className="patientsgp-form-input"
                  required
                />
              </div>

              {/* Gender */}
              <div className="patientsgp-form-group">
                <label className="patientsgp-field-instruction">Gender:</label>
                <input
                  list="gender-options"
                  type="text"
                  placeholder="Select Gender"
                  name="gender"
                  className="patientsgp-form-input"
                  required
                />
                <datalist id="gender-options">
                  <option value="Male" />
                  <option value="Female" />
                  <option value="Other" />
                </datalist>
              </div>

              {/* Blood Group */}
              <div className="patientsgp-form-group">
                <label className="patientsgp-field-instruction">Blood Group:</label>
                <input
                  list="blood-group-options"
                  type="text"
                  placeholder="Select Blood Group"
                  name="bloodGroup"
                  className="patientsgp-form-input"
                  required
                />
                <datalist id="blood-group-options">
                  <option value="A+" />
                  <option value="A-" />
                  <option value="B+" />
                  <option value="B-" />
                  <option value="AB+" />
                  <option value="AB-" />
                  <option value="O+" />
                  <option value="O-" />
                </datalist>
              </div>

              <div className="patientsgp-form-group">
                <button type="submit" className="patientsgp-form-submit-btn">
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

export default Signup;
