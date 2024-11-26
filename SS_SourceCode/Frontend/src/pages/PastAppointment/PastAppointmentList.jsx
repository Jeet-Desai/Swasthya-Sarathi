import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PastappointmentList.css";

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
        const response = await fetch(`http://localhost:5000/api/v1/patients/${patientId}/past-appointments`);
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

  console.log(appointments);
  const handleViewClick = id => {
    navigate(`/patient-pastappointmentdetails/${id}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="new-past-appointments">
        <h2>Past Appointments</h2>
        <div className="new-appointments-list">
          {appointments.map(appointment => (
            <div key={appointment._id} className="new-appointment-card">
              <div className="new-appointment-details">
                <p className="new-appointment-hospital">
                  {appointment.hospital.name}
                </p>
                <p className="new-appointment-date">Date: {new Date(appointment.date).toLocaleDateString()}</p>
                <p className="new-appointment-time">Time: {appointment.time}</p>
              </div>
              <button
                className="new-view-button"
                onClick={() => handleViewClick(appointment._id)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastAppointmentList;