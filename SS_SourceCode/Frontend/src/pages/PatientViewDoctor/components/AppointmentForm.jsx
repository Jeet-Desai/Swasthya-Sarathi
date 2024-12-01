import React, { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AppointmentForm.css";
import { BASE_URL } from "../../../config";

const AppointmentForm = ({ onClose, doctor }) => {
    const { doctorId } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const patientId = user?._id;
    const navigate = useNavigate();
    const [hospitalId, setHospitalId] = useState(null);
 
    useEffect(() => {
        const fetchHospitalId = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/patients/hospital-by-id/${doctorId}`);
                const data = await response.json();
                console.log(data);
                if (data.success) {
                    setHospitalId(data.hospitalId);
                }
            } catch (error) {
                console.error("Error fetching hospital ID:", error);
                toast.error("Error fetching hospital details");
            }
        };

        if (doctorId) {
            fetchHospitalId();
        }
    }, [doctorId]);
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if(!patientId){
                toast.error("Please login to book an appointment");
                navigate('/login');
                return;
            }
            const response = await fetch(`${BASE_URL}/api/v1/patients/request_appointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    doctorId: doctorId,
                    hospitalId: hospitalId,
                    patientId: patientId,
                    date: formData.date,
                    time: formData.time,
                    description: formData.description
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Appointment requested successfully!");
                navigate('/patient/dashboard');
                onClose();
            } else {
                toast.error(data.message || "Failed to request appointment");
            }
        } catch (error) {
            toast.error("Error requesting appointment");
            console.error(error);
        }
    };

    return (
        <div className="afp-appointment-form">
            <h2 className="afp-appointment-form__title">Book Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div className="afp-form-group">
                    <label className="afp-form-label">Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="afp-form-input"
                    />
                </div>

                <div className="afp-form-group">
                    <label className="afp-form-label">Time:</label> 
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="afp-form-input"
                    />
                </div>

                <div className="afp-form-group">
                    <label className="afp-form-label">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="afp-form-input"
                        placeholder="Reason for appointment"
                    />
                </div>

                <div className="afp-form-actions">
                    <button type="submit" className="afp-submit-btn">Book Appointment</button>
                    <button type="button" onClick={onClose} className="afp-cancel-btn">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;