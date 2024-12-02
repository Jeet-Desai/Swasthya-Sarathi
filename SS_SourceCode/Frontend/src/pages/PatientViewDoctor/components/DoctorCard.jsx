import React from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorCard.css";
import { BASE_URL } from '../../config';

const DoctorCard = ({ doctor }) => {
  const { name, photo, specialization, hospital } = doctor;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/patient/doctor-view/${doctor._id}`);
  };

  return (
    <div className="dcp-doctor-card" onClick={handleClick}>
      <div className="dcp-doctor-card__image">
        <img src={photo ? `${BASE_URL}/${photo}` : "default-photo-url"} alt="Doctor profile" />
      </div>
      <div className="dcp-doctor-card__info">
        <h3 className="dcp-doctor-card__name">{name}</h3>
        <p className="dcp-doctor-card__specialization">{specialization}</p>
        <p className="dcp-doctor-card__hospital">{hospital.name}</p>
      </div>
    </div>
  );
};

export default DoctorCard;