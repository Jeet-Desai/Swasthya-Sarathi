import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "./Component/Card";
import "./ViewAppointmentRequests.css";
import { BASE_URL } from "../../config";

export default function ViewAppointmentRequests() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const doctor = JSON.parse(localStorage.getItem('user'));
  const doctorId = doctor?._id;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/doctors/get-pending-appo/${doctorId}`);
        const data = await response.json();

        if (data.success) {
          setAppointments(data.appointments);
        } else {
          toast.error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error loading appointments');
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchAppointments();
    }
  }, [doctorId]);

  if (loading) {
    return <div className="view-appointment-requests-page">Loading...</div>;
  }

  return (
    <div className="view-appointment-requests-page">
      <div className="view-appointment-requests-container">
        <div className="view-appointment-requests-title">
          Appointment Requests
        </div>
        <div className="view-appointment-requests-list">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <Card 
                key={appointment.appointmentId}
                appointmentID={appointment.appointmentId}
                patientName={appointment.patientName}
              />
            ))
          ) : (
            <div>No pending appointments</div>
          )}
        </div>
      </div>
    </div>
  );
}