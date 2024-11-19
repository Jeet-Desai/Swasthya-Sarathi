import React, { useState } from "react";
import "./PatientProfile.css";

const PatientProfile = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    contactNumber: "",
    nationality: "",
    dateOfBirth: "",
    bloodGroup: "",
    password: "", // Added password field to formData
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="patient-profile-container">
      <h2 style={{ textAlign: "center" }}>PATIENT PROFILE</h2>
      <form className="form">
        {/* First Name */}
        <div className="patient-profile-form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        </div>

        {/* First Name */}
        <div className="patient-profile-form-group">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            required
          />
        </div>

        {/* Middle Name */}
        <div className="patient-profile-form-group">
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleInputChange}
            placeholder="Middle Name"
          />
        </div>

        {/* Last Name */}
        <div className="patient-profile-form-group">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            required
          />
        </div>

        {/* Password */}
        <div className="patient-profile-form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
        </div>

        {/* Gender */}
        <div className="patient-profile-form-group">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Contact Number */}
        <div className="patient-profile-form-group">
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            placeholder="Contact Number"
            required
          />
        </div>

        {/* Nationality */}
        <div className="patient-profile-form-group">
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            placeholder="Nationality"
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="patient-profile-form-group floating-label">
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
            className="dob-input"
          />
          <label htmlFor="dateOfBirth" className="dob-label">
            Date of Birth
          </label>
        </div>

        {/* Blood Group */}
        <div className="patient-profile-form-group">
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
            required
          >
            <option value="">Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="patient-profile-submit-button">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default PatientProfile;
