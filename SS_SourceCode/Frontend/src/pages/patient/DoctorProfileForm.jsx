import { useState } from "react";
import "./DoctorProfileForm.css";

const DoctorProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "", // State for password
    phone: "",
    medicalLicense: "",
    yearsOfExperience: "",
    gender: "",
    age: "",
    dateOfBirth: "",
    registrationNumber: "",
    qualification: "",
    about: "", // Added about field
    associatedHospital: "", // Added associated hospital field
    field: "", // Added field field
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="doctor-form-wrapper">
      {" "}
      {/* Background color wrapper */}
      <div className="doctor-form-container">
        <h2 className="doctor-form-title">DOCTOR PROFILE</h2>
        <form className="doctor-profile-form">
          {/* First Name */}
          <div className="doctor-form-group">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Middle Name */}
          <div className="doctor-form-group">
            <input
              type="text"
              placeholder="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
            />
          </div>

          {/* Last Name */}
          <div className="doctor-form-group">
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email */}
          <div className="doctor-form-group">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password */}
          <div className="doctor-form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="doctor-form-group">
            <input
              type="tel"
              placeholder="Phone number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Medical License No. */}
          <div className="doctor-form-group">
            <input
              type="text"
              placeholder="License Number"
              name="medicalLicense"
              value={formData.medicalLicense}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Years of Experience */}
          <div className="doctor-form-group">
            <input
              type="number"
              placeholder="Years of Experience"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Associated Hospital */}
          <div className="doctor-form-group">
            <input
              type="text"
              placeholder="Associated Hospital"
              name="associatedHospital"
              value={formData.associatedHospital}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Field */}
          <div className="doctor-form-group">
            <input
              type="text"
              placeholder="Field of Expertise"
              name="field"
              value={formData.field}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Gender */}
          <div className="doctor-form-group">
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

          {/* Age */}
          <div className="doctor-form-group">
            <input
              type="number"
              placeholder="Age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="doctor-form-group doctor-form-floating-label">
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
              className="doctor-form-dob-input"
            />
            <label htmlFor="dateOfBirth" className="doctor-form-dob-label">
              Date of Birth
            </label>
          </div>

          {/* Registration Number */}
          <div className="doctor-form-group">
            <input
              type="text"
              placeholder="Registration Number"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Qualification */}
          <div className="doctor-form-group">
            <input
              type="text"
              placeholder="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* About */}
          <div className="doctor-form-group">
            <textarea
              placeholder="About"
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="doctor-form-group">
            <button type="submit" className="doctor-form-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfileForm;
