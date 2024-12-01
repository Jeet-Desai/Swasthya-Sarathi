import React, { useState, useEffect } from 'react';
import './PatientProfile.css';

const DoctorProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    email: "",
    gender: "",
    specialization: "",
    qualification: "",
    experience: "",
    about: "",
    dob: "",
    nationality: "",
  });

  useEffect(() => {
    // Retrieve the user's profile data from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setProfileData({
        email: user.email || '',
        firstName: user.name || '',
        dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
        qualification: user.qualification,
        experience: user.experience,
        nationality : user.nationality,
        specialization : user.specialization,
        gender : user.gender,
      });
    }
  }, []);

  return (
    <div className="patient-profile-container">
      <h2 style={{ textAlign: 'center' }}>DOCTOR PROFILE</h2>
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

        {/* Date of Birth */}
        <div className="patient-profile-form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={profileData.dob}
            readOnly
            className="dob-input"
          />
        </div>
        
        <div className="patient-profile-form-group">
          <label>Gender</label>
          <input
            type="text"
            name="nationality"
            value={profileData.gender}
            readOnly
            placeholder="Nationality"
          />
        </div>
        <div className="patient-profile-form-group">
          <label>Specialisation</label>
          <input
            type="text"
            name="nationality"
            value={profileData.specialization}
            readOnly
            placeholder="Nationality"
          />
        </div>
        
        <div className="patient-profile-form-group">
          <label>Qualification</label>
          <input
            type="text"
            name="nationality"
            value={profileData.qualification}
            readOnly
            placeholder="Nationality"
          />
        </div>
        
        <div className="patient-profile-form-group">
          <label>Experience</label>
          <input
            type="text"
            name="nationality"
            value={profileData.experience}
            readOnly
            placeholder="Nationality"
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


      </form>
    </div>
  );
};

export default DoctorProfile;