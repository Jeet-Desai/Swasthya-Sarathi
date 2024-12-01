import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';
import './AppointmentDetails.css';


export default function AppointmentDetails() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    prescription: '',
    medicines: '',
    reports: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/doctors/appo/${appointmentId}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch appointment data');
        }
        setAppointmentData(data.appointment);
        setFormData({
          status: data.appointment.status,
          prescription: data.appointment.prescription || '',
          medicines: data.appointment.medicines.join(', ') || '',
          reports: data.appointment.reports || []
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
    const { name, value, files } = e.target;
    if (name === 'reports') {
      setFormData((prevData) => ({
        ...prevData,
        reports: files,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('status', formData.status);
      formDataToSend.append('prescription', formData.prescription);
      formDataToSend.append('medicines', formData.medicines.split(',').map(med => med.trim()));
      formDataToSend.append('doctorId', appointmentData.doctor._id);


      for (let i = 0; i < formData.reports.length; i++) {
        formDataToSend.append('reports', formData.reports[i]);
      }


      const response = await fetch(`${BASE_URL}/api/v1/doctors/upd_appo/${appointmentId}`, {
        method: 'POST',
        body: formDataToSend,
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


  const renderCompletedAppointment = () => (
    <div className="completed-appointment">
      <h2>Completed Appointment Details</h2>
      <p><strong>Patient Name:</strong> {appointmentData.patient.name}</p>
      <p><strong>Contact No.:</strong> {appointmentData.patient.contactNo}</p>
      <p><strong>Ailment:</strong> {appointmentData.description}</p>
      <p><strong>Date:</strong> {new Date(appointmentData.date).toISOString().split('T')[0]}</p>
      <p><strong>Time:</strong> {appointmentData.time}</p>
      <p><strong>Prescription:</strong> {appointmentData.prescription}</p>
      <p><strong>Medicines:</strong> {appointmentData.medicines.join(', ')}</p>
      <h3>Reports:</h3>
      <ul>
      {appointmentData.reports.map((report, index) => {
                    const reportName = report.split('\\').pop().split('-').slice(1).join('-');
                    return (
                        <li key={index}>
                            <a href={`${BASE_URL}/${report}`} download>
                                {reportName}
                            </a>
                        </li>
                    );
                })}
      </ul>
     
               
    </div>
  );


  const renderApprovedAppointment = () => (
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


      <label htmlFor="reports">Reports:</label>
      <input type="file" id="reports" name="reports" multiple onChange={handleChange} />


      <button type="submit" className="btn-success">Update Appointment</button>
    </form>
  );


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
        {appointmentData.status === 'completed' && renderCompletedAppointment()}
        {appointmentData.status === 'approved' && renderApprovedAppointment()}
      </div>
    </div>
  );
}



