import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../config';
import './Card.css';

export default function Card({ appointmentID, patientName }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/doctors/appo/${appointmentID}`);
        const data = await response.json();
        // console.log(data);
        if (response.ok) {
          setStatus(data.appointment.status);
          setDate(new Date(data.appointment.date).toLocaleDateString());
          setTime(data.appointment.time);
        } else {
          console.error('Failed to fetch appointment details');
        }
      } catch (error) {
        console.error('Error fetching appointment details:', error);
      }
    };

    fetchAppointmentDetails();
  }, [appointmentID]);

  const handleClick = () => {
    navigate(`/doctor/appointments/${appointmentID}`);
  };

  return (
    <div className={`card card-${status.toLowerCase()}`} onClick={handleClick}>
      <div className="card-info">
        <h2>{patientName}</h2>
        <p>Appointment ID: {appointmentID}</p>
        <p>Status: {status}</p>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
      </div>
      <div>
        <button className="btn">View</button>
      </div>
    </div>
  );
}