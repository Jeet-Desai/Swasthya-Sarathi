import React, { useState } from "react";
import "./AdminProfile.css";

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    hospitalAddress: "",
    verificationDocument: "",
    registrationNumber: "",
    contactNumber: "",
    department: "",
    websiteLink: "",
    ownership: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDoctor = () => {
    alert("Add Doctor functionality triggered.");
  };

  return (
    <div className="admin-form-container">
      <h2 style={{ textAlign: "center" }}>ADMIN PROFILE</h2>
      <form className="admin-form">
        <div className="admin-form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        </div>

        <div className="admin-form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
        </div>

        <div className="admin-form-group">
          <input
            type="text"
            name="hospitalAddress"
            value={formData.hospitalAddress}
            onChange={handleInputChange}
            placeholder="Hospital Address"
            required
          />
        </div>

        <div className="admin-form-group">
          <input
            type="text"
            name="verificationDocument"
            value={formData.verificationDocument}
            onChange={handleInputChange}
            placeholder="Verification Document"
            required
          />
        </div>

        <div className="admin-form-group">
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleInputChange}
            placeholder="Registration Number"
            required
          />
        </div>

        <div className="admin-form-group">
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            placeholder="Contact Number"
            required
          />
        </div>

        <div className="admin-form-group">
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="Department"
            required
          />
        </div>

        <div className="admin-form-group">
          <input
            type="url"
            name="websiteLink"
            value={formData.websiteLink}
            onChange={handleInputChange}
            placeholder="Website Link"
          />
        </div>

        <div className="admin-form-group">
          <input
            type="text"
            name="ownership"
            value={formData.ownership}
            onChange={handleInputChange}
            placeholder="Ownership"
            required
          />
        </div>

        <button type="submit" className="admin-submit-button">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
