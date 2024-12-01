import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import './PastappointmentList.css';

const PastAppointmentList = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPastAppointments = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const patientId = user ? user._id : null;
      if (!patientId) {
        console.error('Patient ID not found in local storage.');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/v1/patients/${patientId}/past-appointments`);
        const data = await response.json();
        if (response.ok) {
          setAppointments(data.appointments);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching past appointments:', error);
      }
    };

    fetchPastAppointments();
  }, []);

  const handleViewClick = id => {
    navigate(`/patient/pastappointmentdetails/${id}`);
  };

  return (
    <div className="past-appointment-list">
      <h2>Past Appointments</h2>
      <div className="past-appointments-container">
        {appointments.map(appointment => (
          <div key={appointment._id} className="past-appointment-card">
            <div className="past-appointment-details">
              <p className="past-appointment-hospital">
                {appointment.hospital.name}
              </p>
              <p className="past-appointment-date">Date: {new Date(appointment.date).toLocaleDateString()}</p>
              <p className="past-appointment-time">Time: {appointment.time}</p>
            </div>
            <button
              className="past-view-button"
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

export default PastAppointmentList;