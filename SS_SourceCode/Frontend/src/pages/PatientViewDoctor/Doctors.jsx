import React from "react";
import { doctors } from "./../../assets/data/doctors";
import DoctorCard from "../components/DoctorCard";
import "./Doctors.css";

const Doctors = () => {
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
                placeholder="Search Doctors"
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

      <section>
        <div className="docp-container">
          <div className="docp-doctor-grid">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Doctors;
