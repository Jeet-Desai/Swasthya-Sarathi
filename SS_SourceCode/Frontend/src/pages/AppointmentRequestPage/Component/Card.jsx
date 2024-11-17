import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import "./Card.css"
export default function Card({appointmentID }) {
  const navigate = useNavigate();  // Initialize the navigate hook

  const handleClick = () => {
    // Navigate to AppointmentDetails and pass the appointmentId via state
    navigate(`/appointments/${appointmentID}`);
  };

  return (
    <div className="card">
      <div className="card-info">
        <h2>New Appointment</h2>
        <p>AppointmentID: {appointmentID}</p>
      </div>
      <div>
        <button className="btn" onClick={handleClick}>View</button>
      </div>
    </div>
  );
}
