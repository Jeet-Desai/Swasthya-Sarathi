import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { toast } from "react-toastify";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './AddNewDoc.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#05cdec",
    }
  }
});

const AddNewDoctor = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    specialization: "",
    qualification: "",
    experience: "",
    about: "",
    dob: "",
    nationality: "",
  });

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const hospitalId = user ? user._id : null;
    if (!hospitalId) {
      toast.error("Hospital ID not found in local storage.");
      return;
    }

    const doctorData = {
      ...formData,
      hospitalId,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/hospitals/register-doctor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctorData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, { autoClose: 700 });  
        navigate('/admin/home');
        setTimeout(() => {  
          window.location.href = "/admin/home";
        }, 1100);
        
        
      } else {
        toast.error(data.message || "Failed to register doctor.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="add-new-doctor-page">
        <div className="add-new-doctor-container">
          <h1 className="add-new-doctor-title">Add New Doctor</h1>
          <form className="add-new-doctor-form-wrapper" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Doctor Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Contact Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
            >
              <option value="">Select Specialization</option>
              {departmentsArray.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <input
              type="text"
              name="qualification"
              placeholder="Qualification"
              value={formData.qualification}
              onChange={handleChange}
            />

            <input
              type="number"
              name="experience"
              placeholder="Years of Experience"
              value={formData.experience}
              onChange={handleChange}
            />

            <input
              type="text"
              name="about"
              placeholder="About Doctor"
              value={formData.about}
              onChange={handleChange}
            />

            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
            />

            <input
              type="text"
              name="nationality"
              placeholder="Nationality"
              value={formData.nationality}
              onChange={handleChange}
            />

            <button type="submit">Register Doctor</button>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AddNewDoctor;