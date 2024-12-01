import React, { useState } from "react";
import "./HospitalSignup.css";
import signupImg from "../../assets/images/rmlogo.png";
import { BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const HospitalSignup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
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
    role: "hospital",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handlePhoneChange = (value, country) => {
    setFormData({ ...formData, contactNo: value });
    setErrors({ ...errors, contactNo: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!validatePassword(formData.password)) newErrors.password = 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.contactNo || formData.contactNo.length < 10) newErrors.contactNo = 'Valid phone number is required';
    if (!formData.dof) newErrors.dof = 'Date of foundation is required';
    if (!formData.type) newErrors.type = 'Hospital type is required';
    if (!formData.registration_no) newErrors.registration_no = 'Registration number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOtp = async () => {
    if (!formData.email) {
      setErrors({ ...errors, email: 'Email is required' });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/v1/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('OTP sent successfully! Please check your email');
        setIsOtpSent(true); // Update state to show the verify button
      } else {
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/v1/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email,
          otp: otp 
        }),
      });
      const data = await response.json();
      
      if (data.success) {
        setIsVerified(true);
        toast.success('Email verified successfully');
      } else {
        toast.error(data.message || 'Invalid OTP');
      }
    } catch (error) {
      toast.error('Error verifying OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (!isVerified) {
      toast.error('Please verify your email first');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Registration successful!');
        navigate('/login');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Error during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hospital-signup-wrapper">
      <div className="hospital-signup-container">
        <div className="signup-left">
          <img src={signupImg} alt="Signup" className="signup-img" />
        </div>
        <div className="signup-right">
          <h2>Hospital Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="email-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isVerified}
                  required
                />
                <button 
                  type="button" 
                  onClick={sendOtp}
                  disabled={loading || isVerified}
                  className="otp-button"
                >
                  {loading ? 'Sending...' : isVerified ? 'Verified' : 'Send OTP'}
                </button>
              </div>
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            {isOtpSent && !isVerified && (
              <div className="form-group">
                <label htmlFor="otp">Enter OTP</label>
                <div className="otp-group">
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    onClick={verifyOtp}
                    disabled={loading}
                    className="verify-button"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Hospital Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle" 
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle" 
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contactNo">Contact Number</label>
              <PhoneInput
                country={'in'}
                value={formData.contactNo}
                onChange={handlePhoneChange}
                inputProps={{
                  required: true,
                }}
              />
              {errors.contactNo && <span className="error">{errors.contactNo}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="dof">Date of Foundation</label>
              <input
                type="date"
                id="dof"
                name="dof"
                value={formData.dof}
                onChange={handleInputChange}
                required
              />
              {errors.dof && <span className="error">{errors.dof}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="type">Hospital Type</label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              />
              {errors.type && <span className="error">{errors.type}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="registration_no">Registration Number</label>
              <input
                type="text"
                id="registration_no"
                name="registration_no"
                value={formData.registration_no}
                onChange={handleInputChange}
                required
              />
              {errors.registration_no && <span className="error">{errors.registration_no}</span>}
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={loading || !isVerified}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HospitalSignup;