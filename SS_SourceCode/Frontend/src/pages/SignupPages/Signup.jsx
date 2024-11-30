import React, { useState } from "react";
import "./Signup.css";
import signupImg from "../../assets/images/rmlogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();   
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
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
    nationality: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    role: "patient",
  });

  const [errors, setErrors] = useState({});

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
    if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmailAddress = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/validate-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
  
      if (data.success) {
        return true;
      } else {
        setErrors({ ...errors, email: data.message });
        toast.error(data.message);
        return false;
      }
    } catch (err) {
      toast.error('Error validating email');
      return false;
    }
  };

  const sendOtp = async () => {
    if (!formData.email) {
      setErrors({ ...errors, email: 'Email is required to send OTP' });
      return;
    }

    const isEmailValid = await validateEmailAddress();

    if (isEmailValid) {
      setLoading(true);
      // Simulate OTP generation 
      const simulatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(simulatedOtp);
      toast.success(`OTP sent to ${formData.email} is ${simulatedOtp}`);
      setLoading(false);
    }
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setIsVerified(true);
      toast.success('Email verified successfully');
    } else {
      toast.error('Invalid OTP');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!isVerified) {
        toast.error('Please verify your email before submitting');
        return;
      }
      setLoading(true);
      try {
        // Implement API call to register user
        const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
          toast.success('User registered successfully');  
          navigate('/login');
        } else {
          toast.error(data.message || 'Registration failed');
        }
      } catch (error) {
        toast.error('An error occurred during registration');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="signup-left">
          <img src={signupImg} alt="Signup" className="signup-img" />
        </div>
        <div className="signup-right">
          <h2>Patient Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
              <button type="button" onClick={sendOtp} disabled={loading || isVerified}>
                {isVerified ? 'Verified' : 'Send OTP'}
              </button>
            </div>

            {generatedOtp && !isVerified && (
              <div className="form-group">
                <label htmlFor="otp">OTP</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button type="button" onClick={verifyOtp}>Verify OTP</button>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Name</label>
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
                <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
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
                <button type="button" className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
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
              <label htmlFor="nationality">Nationality</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                required
              />
              {errors.nationality && <span className="error">{errors.nationality}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
              {errors.dob && <span className="error">{errors.dob}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span className="error">{errors.gender}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                required
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {errors.bloodGroup && <span className="error">{errors.bloodGroup}</span>}
            </div>

            <button type="submit" disabled={loading || !isVerified}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;