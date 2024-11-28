import React, { useState, useEffect } from "react";
import { useDoctors } from "./../../assets/data/doctors.jsx";
import DoctorCard from "./components/DoctorCard"
import "./Doctors.css";

const Doctors = () => {
  const allDoctors = useDoctors();
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    setDoctors(allDoctors);
  }, [allDoctors]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filteredDoctors = query 
      ? allDoctors.filter(doctor => 
          doctor.name.toLowerCase().includes(query) ||
          doctor.specialization.toLowerCase().includes(query) ||
          doctor.hospital.name.toLowerCase().includes(query)
        )
      : allDoctors;
    setDoctors(filteredDoctors);
  };

  return (
    <>
      <section className="docp-doctor-search-section">
        <div className="docp-container text-center">
          <h2 className="docp-heading">Find a Doctor</h2>
          <div className="docp-search-container">
            <div className="docp-search-bar">
              <input
                type="search"
                className="docp-search-input"
                placeholder="Search by Doctor's Name, Department, or Hospital"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="docp-search-button">
                <svg
                  className="docp-search-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="docp-doctor-list-section">
        <div className="docp-container">
          <div className="docp-doctor-grid">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Doctors;   