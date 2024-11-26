import React from "react";
import { doctors } from "./../../assets/data/doctors.jsx";
import DoctorCard from "./DoctorCard";
import "./DoctorList.css";

const DoctorList = () => {
  return (
    <div className="dlp-doctor-list">
      {doctors.map(doctor => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
x