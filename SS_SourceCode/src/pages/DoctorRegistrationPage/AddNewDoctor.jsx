import React, { useState } from "react";
import './AddNewDoc.css'

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
    <section className="page">
      <section className="container add-doctor-form">
      
        <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
        <br></br>
        <form>
          <div className="first-wrapper">
           
            <div>
              <input
                type="text" placeholder="First Name"
                value={firstName} onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text" placeholder="Last Name"
                value={lastName} onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="email" placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="tel" placeholder="Mobile Number"
                value={phone} onChange={(e) => setPhone(e.target.value)}
              />
             
              <input
                type="date" placeholder="Date of Birth"
                value={dob} onChange={(e) => setDob(e.target.value)}
              />
              <select
                value={gender} onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="password" placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <select
                value={doctorDepartment} onChange={(e) => setDoctorDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                {departmentsArray.map((dept, index) => (
                  <option value={dept} key={index}>{dept}</option>
                ))}
              </select>
              <button type="submit" className="register-btn">Register New Doctor</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;
