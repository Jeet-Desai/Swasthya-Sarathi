import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../../config';
import "./PendingAppointments.css";

const PendingAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPendingAppointments = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const patientId = user ? user._id : null;
      if (!patientId) {
        console.error('Patient ID not found in local storage.');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/v1/patients/${patientId}/pending-appointments`);
        const data = await response.json();
        if (response.ok) {
          setAppointments(data.appointments);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching pending appointments:', error);
      }
    };

    fetchPendingAppointments();
  }, []);

  const handleViewClick = id => {
    navigate(`/patient/pending-appointmentdetails/${id}`);
  };

  return (
    <div className="pending-appointment-list">
      <h2>Pending Appointments</h2>
      <div className="pending-appointments-container">
        {appointments.map(appointment => (
          <div key={appointment._id} className="pending-appointment-card">
            <div className="pending-appointment-details">
              <p className="pending-appointment-hospital">
                {appointment.hospital.name}
              </p>
              <p className="pending-appointment-date">Date: {new Date(appointment.date).toLocaleDateString()}</p>
              <p className="pending-appointment-time">Time: {appointment.time}</p>
            </div>
            <button
              className="pending-view-button"
              onClick={() => handleViewClick(appointment._id)}
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingAppointments;