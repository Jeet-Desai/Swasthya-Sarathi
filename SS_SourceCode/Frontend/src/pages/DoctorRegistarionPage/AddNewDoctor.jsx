import React, { useState, useContext } from "react";
import './AddNewDoc.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddNewDoctor = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("");
  const navigate = useNavigate();
  const departmentsArray = [
    "Pediatrics", "Orthopedics", "Cardiology", "Neurology", "Oncology",
    "Radiology", "Physical Therapy", "Dermatology", "ENT",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    const hospitalId = user ? user._id : null;
    if (!hospitalId) {
      toast.error('Hospital ID not found in local storage.');
      return;
    }
    console.log(hospitalId);

    const doctorData = {
      name,
      email,
      password,
      confirmPassword,
      phone,
      gender,
      specialization,
      qualification,
      experience,
      about,
      dob,
      nationality,
      hospitalId: hospitalId,
    };

    try {
      const response = await fetch('http://localhost:5000/api/v1/hospitals/register-doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Doctor registered successfully!');
        // Clear form fields
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
        setGender('');
        setSpecialization('');
        setQualification('');
        setExperience('');
        setAbout('');
        setDob('');
        setNationality('');
        navigate('/admin/home');
      } else {
        toast.error(data.message || 'Failed to register doctor.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <section className="add-new-doctor-page">
      <div className="add-new-doctor-container">
        <h1 className="add-new-doctor-title">REGISTER A NEW DOCTOR</h1>
        <form onSubmit={handleSubmit}>
          <div className="add-new-doctor-form-wrapper">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="add-new-doctor-input"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="add-new-doctor-input"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="add-new-doctor-input"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="add-new-doctor-input"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="add-new-doctor-input"
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="add-new-doctor-select"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Specialization</label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
                className="add-new-doctor-select"
              >
                <option value="">Select Specialization</option>
                {departmentsArray.map((dept, index) => (
                  <option value={dept} key={index}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Qualification</label>
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                required
                className="add-new-doctor-input"
              />
            </div>
            <div className="form-group">
              <label>Experience</label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
                className="add-new-doctor-input"
              />
            </div>
            <div className="form-group">
              <label>About</label>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                required
                className="add-new-doctor-input"
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="add-new-doctor-input"
              />
            </div>
            <div className="form-group">
              <label>Nationality</label>
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
                className="add-new-doctor-input"
              />
            </div>
            <button type="submit" className="add-new-doctor-register-btn">Register New Doctor</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewDoctor;