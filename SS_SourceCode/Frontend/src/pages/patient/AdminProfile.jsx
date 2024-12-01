import React, { useState, useEffect } from 'react';
import './PatientProfile.css';

const AdminProfile = () => {
  const [profileData, setProfileData] = useState({
    email: "",
    firstName: "",
    contactNo: "",
    dof: "",
    type: "",
    registration_no: ""
  });

  useEffect(() => {
    // Retrieve the user's profile data from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setProfileData({
        email: user.email || '',
        firstName: user.name || '',
        contactNumber: user.contactNo || '',
        dof: user.dof ? new Date(user.dof).toISOString().split('T')[0] : '',
        type: user.type || '',
        registration_no: user.registration_no
      });
    }
  }, []);

  return (
    <div className="patient-profile-container">
      <h2 style={{ textAlign: 'center' }}>HOSPITAL PROFILE</h2>
      <form className="form">
        {/* Email */}
        <div className="patient-profile-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            readOnly
            placeholder="Email"
          />
        </div>

        {/* First Name */}
        <div className="patient-profile-form-group">
          <label>Hospital Name</label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            readOnly
            placeholder=" Name"
          />
        </div>

        {/* Contact Number */}
        <div className="patient-profile-form-group">
          <label>Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={profileData.contactNumber}
            readOnly
            placeholder="Contact Number"
          />
        </div>
        {/* Date of Birth */}
        <div className="patient-profile-form-group">
          <label>Date of Establishment</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={profileData.dof}
            readOnly
            className="dob-input"
          />
        </div>

        

        {/* Nationality */}
        <div className="patient-profile-form-group">
          <label>Registration Number</label>
          <input
            type="text"
            name="nationality"
            value={profileData.registration_no}
            readOnly
            placeholder="Nationality"
          />
        </div>


      </form>
    </div>
  );
};

export default AdminProfile;