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
        // console.log(data);

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
  console.log(appointments);
  // Sort appointments: approved first, then completed, then others
  const sortedAppointments = [...appointments].sort((a, b) => {
    const order = ['approved', 'completed', 'pending', 'rejected'];
    return order.indexOf(a.status) - order.indexOf(b.status);
  });

  return (
    <div className="view-appointment-requests-page">
      <div className="view-appointment-requests-container">
        <div className="view-appointment-requests-title">
          Appointment Requests
        </div>
        <div className="view-appointment-requests-list">
          {sortedAppointments.length > 0 ? (
            sortedAppointments.map((appointment) => (
              <Card 
                key={appointment.appointmentId}
                appointmentID={appointment.appointmentId}
                patientName={appointment.patientName}
                status={appointment.status}
                date={appointment.date}
                time={appointment.time}
              />
            )) 
          ) : (
            <div>No appointments found</div>
          )}
        </div>
      </div>
    </div>
  );
}