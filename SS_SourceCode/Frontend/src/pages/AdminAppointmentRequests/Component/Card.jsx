import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Card.css";

export default function Card({ appointmentID, patientName, doctorName, date, time, status }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/appointments/${appointmentID}`);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'card-pending';
      case 'Approved':
        return 'card-approved';
      case 'Rejected':
        return 'card-rejected';
      case 'Completed':
        return 'card-completed';
      default:
        return '';
    }
  };

  return (
    <div className={`card ${getStatusClass(status)}`}>
      <div className="card-info">
        <h2>{`Appointment with Dr. ${doctorName}`}</h2>
        <p><strong>Appointment ID:</strong> {appointmentID}</p>
        <p><strong>Patient:</strong> {patientName}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Status:</strong> {status}</p>
      </div>
      <div>
        <button className="btn" onClick={handleClick}>View</button>
      </div>
    </div>
  );
}