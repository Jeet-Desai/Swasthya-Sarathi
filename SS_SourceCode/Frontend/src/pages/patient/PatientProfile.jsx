import React, { useState, useEffect } from 'react';
import './PatientProfile.css';

const PatientProfile = () => {
  const [profileData, setProfileData] = useState({
    email: '',
    firstName: '',
    gender: '',
    contactNumber: '',
    nationality: '',
    dateOfBirth: '',
    bloodGroup: '',
  });

  useEffect(() => {
    // Retrieve the user's profile data from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setProfileData({
        email: user.email || '',
        firstName: user.name || '',
        gender: user.gender || '',
        contactNumber: user.contactNo || '',
        nationality: user.nationality || '',
        dateOfBirth: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
        bloodGroup: user.bloodGroup || '',
      });
    }
  }, []);

  return (
    <div className="patient-profile-container">
      <h2 style={{ textAlign: 'center' }}>PATIENT PROFILE</h2>
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
          <label>Name</label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            readOnly
            placeholder=" Name"
          />
        </div>

        {/* Gender */}
        <div className="patient-profile-form-group">
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={profileData.gender}
            readOnly
            placeholder="Gender"
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

        {/* Nationality */}
        <div className="patient-profile-form-group">
          <label>Nationality</label>
          <input
            type="text"
            name="nationality"
            value={profileData.nationality}
            readOnly
            placeholder="Nationality"
          />
        </div>

        {/* Date of Birth */}
        <div className="patient-profile-form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={profileData.dateOfBirth}
            readOnly
            className="dob-input"
          />
        </div>

        {/* Blood Group */}
        <div className="patient-profile-form-group">
          <label>Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={profileData.bloodGroup}
            readOnly
            placeholder="Blood Group"
          />
        </div>
      </form>
    </div>
  );
};

export default PatientProfile;