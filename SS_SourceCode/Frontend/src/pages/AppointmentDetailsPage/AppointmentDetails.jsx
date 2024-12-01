import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';
import './AppointmentDetails.css';

export default function AppointmentDetails() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    prescription: '',
    medicines: '',
    reports: '',
  });

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        if (!appointmentId) {
          throw new Error('Appointment ID is missing');
        }
        const response = await fetch(`${BASE_URL}/api/v1/doctors/appo/${appointmentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointment data');
        }
        const data = await response.json();
        setAppointmentData(data.appointment);
        setFormData({
          status: data.appointment.status,
          prescription: data.appointment.prescription || '',
          medicines: data.appointment.medicines.join(', ') || '',
          reports: data.appointment.reports.join(', ') || '',
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentData();
  }, [appointmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/v1/doctors/upd_appo/${appointmentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          medicines: formData.medicines.split(',').map(med => med.trim()),
          reports: formData.reports.split(',').map(rep => rep.trim()),
          doctorId: appointmentData.doctor._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update appointment');
      }

      toast.success('Appointment updated successfully');
      navigate('/doctor/appointments');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="appointment-details">
      <div className="container">
        <h1>Appointment Details</h1>
        <div className="colored-section blue">
          <p><strong>Patient Name:</strong> {appointmentData.patient.name}</p>
          <p><strong>Contact No.:</strong> {appointmentData.patient.contactNo}</p>
        </div>
        <div className="colored-section purple">
          <p><strong>Ailment:</strong> {appointmentData.description}</p>
          <p><strong>Date:</strong> {new Date(appointmentData.date).toISOString().split('T')[0]}</p>
          <p><strong>Time:</strong> {appointmentData.time}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange}>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
          </select>

          <label htmlFor="prescription">Prescription:</label>
          <textarea id="prescription" name="prescription" value={formData.prescription} onChange={handleChange} />

          <label htmlFor="medicines">Medicines (comma separated):</label>
          <input type="text" id="medicines" name="medicines" value={formData.medicines} onChange={handleChange} />

          <label htmlFor="reports">Reports (comma separated):</label>
          <input type="text" id="reports" name="reports" value={formData.reports} onChange={handleChange} />

          <button type="submit" className="btn-success">Update Appointment</button>
        </form>
      </div>
    </div>
  );
}