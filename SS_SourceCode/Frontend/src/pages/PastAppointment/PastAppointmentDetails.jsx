import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import './PastappointmentDetails.css';


const PastAppointmentDetail = () => {
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
        return <div className="past-appointment-detail">Loading...</div>;
    }


    if (!appointment) {
        return <div className="past-appointment-detail">Appointment not found</div>;
    }


    return (
        <div className="past-appointment-container">
            <h2>Appointment Details</h2>
            <p><strong>Patient Name:</strong> {appointment.patient.name}</p>
            <p><strong>Contact No.:</strong> {appointment.patient.contactNo}</p>
            <p><strong>Ailment:</strong> {appointment.description}</p>
            <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>Status:</strong> {appointment.status}</p>
            <p><strong>Prescription:</strong> {appointment.prescription}</p>
            <p><strong>Medicines:</strong> {appointment.medicines.join(', ')}</p>
            <h3>Reports</h3>
            <ul className="report-list">
                {appointment.reports.map((report, index) => {
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
            <button className="pending-return-button" onClick={handleReturnClick}>Return</button>
        </div>
    );
};


export default PastAppointmentDetail;
