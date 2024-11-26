

import React, { useState, useEffect } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import "./AdminAppointmentDetails.css";

export default function AdminAppointmentDetails() {
  const { appointmentID } = useParams();
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/hospitals/get-appointment-detail/${appointmentID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointment data');
        }
        const data = await response.json();
        setAppointmentData(data.appointment);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentData();
  }, [appointmentID]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleUpdateStatus = async (status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/hospitals/${appointmentID}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update appointment status');
      }

      setAppointmentData(data.appointment);
      navigate('/admin/appointments');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!appointmentData) return <div>No appointment data found</div>;

  return (
    <div className="appointment-details">
      <div className="container">
        <h1>Appointment Details</h1>
        <form>
          <label htmlFor="patientName">Patient Name:</label>
          <input type="text" id="patientName" name="patientName" value={appointmentData.patient.name} disabled />
          <label htmlFor="patientName">Patient Name:</label>
          <input type="text" id="patientName" name="patientName" value={appointmentData.patient.name} disabled />

          <label htmlFor="contact">Contact No.:</label>
          <input type="text" id="contact" name="contact" value={appointmentData.patient.contactNo} disabled />
          <input type="text" id="contact" name="contact" value={appointmentData.patient.contactNo} disabled />

          <label htmlFor="doctorName">Doctor Name:</label>
          <input type="text" id="doctorName" name="doctorName" value={appointmentData.doctor.name} disabled />

          <label htmlFor="specialization">Specialization:</label>
          <input type="text" id="specialization" name="specialization" value={appointmentData.doctor.specialization} disabled />

          <label htmlFor="hospitalName">Hospital Name:</label>
          <input type="text" id="hospitalName" name="hospitalName" value={appointmentData.hospital.name} disabled />
          <label htmlFor="doctorName">Doctor Name:</label>
          <input type="text" id="doctorName" name="doctorName" value={appointmentData.doctor.name} disabled />

          <label htmlFor="specialization">Specialization:</label>
          <input type="text" id="specialization" name="specialization" value={appointmentData.doctor.specialization} disabled />

          <label htmlFor="hospitalName">Hospital Name:</label>
          <input type="text" id="hospitalName" name="hospitalName" value={appointmentData.hospital.name} disabled />

          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={appointmentData.description} disabled></textarea>
          <textarea id="description" name="description" value={appointmentData.description} disabled></textarea>

          <label htmlFor="date">Date:</label>
          <input type="text" id="date" name="date" value={formatDate(appointmentData.date)} disabled />
          <input type="text" id="date" name="date" value={formatDate(appointmentData.date)} disabled />

          <label htmlFor="time">Time:</label>
          <input type="text" id="time" name="time" value={appointmentData.time} disabled />

          <label htmlFor="status">Status:</label>
          <input type="text" id="status" name="status" value={appointmentData.status} disabled />

          <label htmlFor="appointmentId">Appointment ID:</label>
          <input type="text" id="appointmentId" name="appointmentId" value={appointmentData._id} disabled />
          <input type="text" id="time" name="time" value={appointmentData.time} disabled />

          <label htmlFor="status">Status:</label>
          <input type="text" id="status" name="status" value={appointmentData.status} disabled />

          <label htmlFor="appointmentId">Appointment ID:</label>
          <input type="text" id="appointmentId" name="appointmentId" value={appointmentData._id} disabled />

          <button type="button" className="btn-danger" onClick={() => handleUpdateStatus('rejected')}>Discard Appointment</button>
          <button type="button" className="btn-success" onClick={() => handleUpdateStatus('approved')}>Confirm Appointment</button>
          <button type="button" className="btn-danger" onClick={() => handleUpdateStatus('rejected')}>Discard Appointment</button>
          <button type="button" className="btn-success" onClick={() => handleUpdateStatus('approved')}>Confirm Appointment</button>
        </form>
      </div>
    </div>
  );
}