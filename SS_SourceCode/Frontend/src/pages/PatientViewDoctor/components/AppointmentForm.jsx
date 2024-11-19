import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        patientName: "",
        contactNo: "",
        ailment: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
        onClose();
    };

    return (
        <div className="afp-appointment-form">
            <h2 className="afp-appointment-form__title">Book Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div className="afp-form-group">
                    <label className="afp-form-label">Patient Name:</label>
                    <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        className="afp-form-input"
                        required
                    />
                </div>
                <div className="afp-form-group">
                    <label className="afp-form-label">Contact No:</label>
                    <input
                        type="text"
                        name="contactNo"
                        value={formData.contactNo}
                        onChange={handleChange}
                        className="afp-form-input"
                        required
                    />
                </div>
                <div className="afp-form-group">
                    <label className="afp-form-label">Ailment:</label>
                    <input
                        type="text"
                        name="ailment"
                        value={formData.ailment}
                        onChange={handleChange}
                        className="afp-form-input"
                        required
                    />
                </div>
                <div className="afp-form-group">
                    <label className="afp-form-label">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="afp-form-input"
                        rows="3"
                    />
                </div>
                <div className="afp-form-actions">
                    <button
                        type="button"
                        onClick={onClose}
                        className="afp-form-button afp-form-button--cancel"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="afp-form-button afp-form-button--submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;