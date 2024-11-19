import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PendingAppointments.css';

const PendingAppointments = () => {
  const navigate = useNavigate();

  const appointments = [
    { id: 1, hospital: 'City Hospital', date: '11/15/2024', time: '10:00 AM' },
    { id: 2, hospital: 'Green Valley Clinic', date: '11/16/2024', time: '02:00 PM' },
    // Add more appointments if needed
  ];

  const handleViewClick = (id) => {
    navigate(`/appointment/${id}`); // Fixed template literal syntax
  };

  return (
    // Wrapper div with background color
    <div style={{ backgroundColor: '#05CDEC', minHeight: '100vh', padding: '20px' }}>
      <div className="new-pending-appointments">
        <h2>Pending Appointments</h2>
        <div className="new-appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="new-appointment-card">
              <div className="new-appointment-details">
                <p className="new-appointment-hospital">{appointment.hospital}</p>
                <p className="new-appointment-date">Date: {appointment.date}</p>
                <p className="new-appointment-time">Time: {appointment.time}</p>
              </div>
              <button className="new-view-button" onClick={() => handleViewClick(appointment.id)}>
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PendingAppointments;

