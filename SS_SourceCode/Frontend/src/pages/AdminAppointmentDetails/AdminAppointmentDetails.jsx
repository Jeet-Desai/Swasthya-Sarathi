import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import "./AdminAppointmentDetails.css"; // Import the updated CSS

export default function AdminAppointmentDetails() {
  // Get the state passed from the Card component
  const location = useLocation();
  const { appointmentId } = location.state || {}; // Extract appointmentId from the state

  // Simulate fetching appointment details based on the appointmentId
  const initialData = {
    name: 'John Doe',
    contact: '123-456-7890',
    ailment: 'Flu',
    description: 'Fever and sore throat',
    date: '2025-01-26',
    time: '10:00',
    appointmentId: appointmentId, // Display the appointmentId
  };

  return (
    <div className="appointment-details">
      <div className="container">
        <h1>Appointment Details</h1>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={initialData.name} disabled />

          <label htmlFor="contact">Contact No.:</label>
          <input type="text" id="contact" name="contact" value={initialData.contact} disabled />

          <label htmlFor="ailment">Ailment:</label>
          <input type="text" id="ailment" name="ailment" value={initialData.ailment} disabled />

          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={initialData.description} disabled />

          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={initialData.date} disabled />

          <label htmlFor="time">Time:</label>
          <input type="time" id="time" name="time" value={initialData.time} disabled />

          <button type="submit" className="btn-danger">Discard Appointment</button>
          <button type="submit" className="btn-success">Confirm Appointment</button>
        </form>
      </div>
    </div>
  );
}
