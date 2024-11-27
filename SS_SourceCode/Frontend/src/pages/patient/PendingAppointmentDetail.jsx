import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';
import "./PendingAppointmentDetail.css";

const PendingAppointmentDetail = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/patients/get-appo-details/${appointmentId}`);
        const data = await response.json();
        
        if (data.success) {
          setAppointment(data.appointment);
        } else {
          toast.error('Failed to fetch appointment details');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error loading appointment details');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [appointmentId]);

  const handleReturnClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="pending-appointment-detail">Loading...</div>;
  }

  if (!appointment) {
    return <div className="pending-appointment-detail">Appointment not found</div>;
  }

  return (
    <div className="pending-appointment-detail">
      <h2>Appointment Details</h2>
      <p>
        <strong>Doctor:</strong> Dr. {appointment.doctor.name}
      </p>
      <p>
        <strong>Symptoms:</strong> {appointment.description}
      </p>
      <p>
        <strong>Status:</strong> {appointment.status}
      </p>
      <p>
        <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Time:</strong> {appointment.time}
      </p>
      <p>
        <strong>Hospital:</strong> {appointment.hospital.name}
      </p>
      <button className="pending-return-button" onClick={handleReturnClick}>
        Return
      </button>
    </div>
  );
};

export default PendingAppointmentDetail;