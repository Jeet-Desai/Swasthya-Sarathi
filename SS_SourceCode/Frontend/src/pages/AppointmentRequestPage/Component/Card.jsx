import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Card({ appointmentID, patientName }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/doctor/appointments/${appointmentID}`);
  };

  return (
    <div className="card">
      <div className="card-info">
        <h2>{patientName}</h2>
        <p>Appointment ID: {appointmentID}</p>
      </div>
      <div>
        <button className="btn" onClick={handleClick}>View</button>
      </div>
    </div>
  );
}