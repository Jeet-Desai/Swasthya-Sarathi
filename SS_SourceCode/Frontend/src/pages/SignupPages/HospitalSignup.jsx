import React, { useState } from "react";
import "./HospitalSignup.css";
import signupImg from "../../assets/images/rmlogo.png";
import { BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HospitalSignup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    contactNo: "",
    dof: "",
    type: "",
    registration_no: "",
    role:"hospital",
  });

  
  const navigate = useNavigate()

  // Toggle visibility of password fields
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Simulate OTP sending (replace this with an API call)
  const sendOtp = async () => {
    if (!formData.email) {
      alert("Please enter your email first.");
      return;
    }

    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(generated);

    // Simulate sending OTP (use backend in production)
    alert(`OTP sent to your email: ${generated}`);
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if passwords match on the client side
    if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        setLoading(false);
        return;
    }

    try {
        const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        toast.success(data.message);
        navigate("/login");
    } catch (err) {
        toast.error(err.message);
    } finally {
        setLoading(false);
    }
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
  
            <form className="hospitalsgp-signup-form" onSubmit={submitHandler}>
              {/* Email Address with OTP Verification */}
              <div className="hospitalsgp-form-group">
                <label className="hospitalsgp-field-instruction">Hospital Email Address:</label>
                <input
                  type="email"
                  placeholder="Enter Hospital Email"
                  name="email"
                  className="hospitalsgp-form-input"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  value={formData.name}
                  onChange={handleInputChange}
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
                  value={formData.password}
                  onChange={handleInputChange}
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
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
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
                  value={formData.contactNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
  
              {/* Other Fields (Address, Registration Number, Ownership Type, etc.)
              {/* Address */}
              <div className="hospitalsgp-form-group">
                <label className="hospitalsgp-field-instruction">Address:</label>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  className="hospitalsgp-form-input"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div> 
  
              {/* Registration Number */}
              <div className="hospitalsgp-form-group">
                <label className="hospitalsgp-field-instruction">Registration Number:</label>
                <input
                  type="text"
                  placeholder="Registration No."
                  name="registration_no"
                  className="hospitalsgp-form-input"
                  value={formData.registration_no}
                  onChange={handleInputChange}
                  required
                />
              </div>

              
              <div className="form-group">
  <label className="field-instruction">Date of Foundation:</label>
  <input
    type="date"
    name="dof"  // Ensure this matches with formData key
    className="form-input"
    value={formData.dof}  // Ensure the value is linked to formData
    onChange={handleInputChange}  // Update state on change
    required
  />
</div>
              {/* Ownership Type */}
              <div className="hospitalsgp-form-group">
                <label className="hospitalsgp-field-instruction">Ownership Type:</label>
                <select
                  name="type"
                  className="hospitalsgp-form-input"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select Ownership Type
                  </option>
                  <option value="Private">Private</option>
                  <option value="Semi-Gov">Semi-Government</option>
                  <option value="Gov">Government</option>
                </select>
              </div>
  
              {/* Submit Button */}
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