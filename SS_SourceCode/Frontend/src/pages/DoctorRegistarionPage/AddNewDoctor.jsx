import React, { useState } from "react";
import './AddNewDoc.css';

const AddNewDoctor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const departmentsArray = [
    "Pediatrics", "Orthopedics", "Cardiology", "Neurology", "Oncology",
    "Radiology", "Physical Therapy", "Dermatology", "ENT",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
    };
  };

  return (
    <section className="add-new-doctor-page">
      <div className="add-new-doctor-container">
        <h1 className="add-new-doctor-title">REGISTER A NEW DOCTOR</h1>
        <form>
          <div className="add-new-doctor-form-wrapper">
            <div>
              <input
                type="text" placeholder="First Name"
                value={firstName} onChange={(e) => setFirstName(e.target.value)}
                className="add-new-doctor-input"
              />
              <input
                type="text" placeholder="Last Name"
                value={lastName} onChange={(e) => setLastName(e.target.value)}
                className="add-new-doctor-input"
              />
              <input
                type="email" placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="add-new-doctor-input"
              />
              <input
                type="tel" placeholder="Mobile Number"
                value={phone} onChange={(e) => setPhone(e.target.value)}
                className="add-new-doctor-input"
              />
              <input
                type="date" placeholder="Date of Birth"
                value={dob} onChange={(e) => setDob(e.target.value)}
                className="add-new-doctor-input"
              />
              <select
                value={gender} onChange={(e) => setGender(e.target.value)}
                className="add-new-doctor-select"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="password" placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="add-new-doctor-input"
              />
              <select
                value={doctorDepartment} onChange={(e) => setDoctorDepartment(e.target.value)}
                className="add-new-doctor-select"
              >
                <option value="">Select Department</option>
                {departmentsArray.map((dept, index) => (
                  <option value={dept} key={index}>{dept}</option>
                ))}
              </select>
              <button type="submit" className="add-new-doctor-register-btn">Register New Doctor</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddNewDoctor;
