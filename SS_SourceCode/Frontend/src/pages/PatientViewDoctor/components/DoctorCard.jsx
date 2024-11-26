import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import "./DoctorCard.css";
import doctorphoto1 from "../../../assets/images/doct01.jpg";
const DoctorCard = ({ doctor }) => {
  const {
    name,
    //avgRating,
    //totalRating,
    photo,
    specialization,
    //totalPatient,
    hospital
  } = doctor;

  return (
    <div className="dcp-doctor-card">
      <div className="dcp-doctor-card__image">
        <img src={doctorphoto1} alt={name}
          style={{
            width: "330px",
            height: "330px",
            objectFit: "cover",
            borderRadius: "8px",
          }} />
      </div>
      
      <h2 className="dcp-doctor-card__name">{name}</h2>
      
      <div className="dcp-doctor-card__specialization-container">
        <span className="dcp-doctor-card__specialization">
          {specialization}
        </span>
      </div>

      {/* Commented Rating Section for future use
      <div className="doctor-card__rating">
        <span className="rating-score">
          <img src={starIcon} alt="rating" />
          {avgRating}
        </span>
        <span className="total-ratings">({totalRating})</span>
      </div>
      */}

      <div className="dcp-doctor-card__footer">
        <div className="dcp-doctor-card__hospital">
          {/* Commented Patient Count for future use
          <h3 className="patient-count">+{totalPatient} patients</h3>
          */}
          <p className="dcp-hospital-name">At {hospital.name}</p>
        </div>
        
        <Link to="/doctor/01" className="dcp-doctor-card__link">
          <BsArrowRight className="dcp-arrow-icon" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;