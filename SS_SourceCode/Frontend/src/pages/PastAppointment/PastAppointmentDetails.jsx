
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import './PastappointmentDetails.css';

const PendingAppointmentDetail = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(appointmentId);
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
        return <div className="loading">Loading appointment details...</div>;
    }

    if (!appointment) {
        return <div className="error">Appointment not found</div>;
    }

    return (
        <div className="pending-appointment-detail">
            <div className="appointment-header">
                <h2>Appointment Details</h2>
                
            </div>

            <div className="appointment-info">
                <p>
                    <strong>Doctor:</strong> Dr. {appointment.doctor.name}
                </p>
                <p>
                    <strong>Specialization:</strong> {appointment.doctor.specialization}
                </p>
                <p>
                    <strong>Patient:</strong> {appointment.patient.name}
                </p>
                <p>
                    <strong>Contact:</strong> {appointment.patient.contactNo}
                </p>
                <p>
                    <strong>Hospital:</strong> {appointment.hospital.name}
                </p>
                <p>
                    <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
                </p>
                <p>
                    <strong>Time:</strong> {appointment.time}
                </p>
                <p>
                    <strong>Status:</strong> {appointment.status}
                </p>
                <p>
                    <strong>Description:</strong> {appointment.description}
                </p>
                <button onClick={handleReturnClick} className="pending-return-button">
                    Back
                </button>
            </div>
        </div>
    );
};

export default PendingAppointmentDetail;