import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
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
    photo: null, // Add photo field
  });

  const [isFormValid, setIsFormValid] = useState(false);

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
    const { name, value, files } = event.target;
    if (name === "photo") {
      setFormData((prevData) => ({
        ...prevData,
        photo: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const isValid = Object.values(formData).every(value => value !== "" && value !== null);
    setIsFormValid(isValid);
  }, [formData]);

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

    const doctorData = new FormData();
    for (const key in formData) {
      doctorData.append(key, formData[key]);
    }
    doctorData.append('hospitalId', hospitalId);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/hospitals/register-doctor",
        {
          method: "POST",
          body: doctorData,
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
            <label htmlFor="name">Doctor Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Doctor Name"
              value={formData.name}
              onChange={handleChange}
            />

            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <label htmlFor="phone">Contact Number</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Contact Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="specialization">Specialization</label>
            <select
              name="specialization"
              id="specialization"
              value={formData.specialization}
              onChange={handleChange}
            >
              <option value="">Select Specialization</option>
              {departmentsArray.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <label htmlFor="qualification">Qualification</label>
            <input
              type="text"
              name="qualification"
              id="qualification"
              placeholder="Qualification"
              value={formData.qualification}
              onChange={handleChange}
            />

            <label htmlFor="experience">Years of Experience</label>
            <input
              type="number"
              name="experience"
              id="experience"
              placeholder="Years of Experience"
              value={formData.experience}
              onChange={handleChange}
            />

            <label htmlFor="about">About Doctor</label>
            <input
              type="text"
              name="about"
              id="about"
              placeholder="About Doctor"
              value={formData.about}
              onChange={handleChange}
            />

            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              name="dob"
              id="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]} // Set the max to today's date
                required
            />

            <label htmlFor="nationality">Nationality</label>
            <input
              type="text"
              name="nationality"
              id="nationality"
              placeholder="Nationality"
              value={formData.nationality}
              onChange={handleChange}
            />

            <label htmlFor="photo">Photo</label>
            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              onChange={handleChange}
            /> {/* Add photo input */}

            <button type="submit" disabled={!isFormValid}>Register Doctor</button>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AddNewDoctor;