import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Card.css"

export default function Card({ appointmentID, patientName, doctorName, date, time, status }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/appointments/${appointmentID}`);
  };  

  return (
    <div className="card">
      <div className="card-info">
        <h2>Appointment Details</h2>
        <p>AppointmentID: {appointmentID}</p>
        <p>Patient: {patientName}</p>
        <p>Doctor: {doctorName}</p>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
        <p>Status: {status}</p>
      </div>
      <div>
        <button className="btn" onClick={handleClick}>View</button>
      </div>
    </div>
  );
}