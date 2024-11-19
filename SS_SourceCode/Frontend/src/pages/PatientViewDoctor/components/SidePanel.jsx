// SidePanel.jsx
import React, { useState } from "react";
import AppointmentForm from "./AppointmentForm";
import "./SidePanel.css";

const SidePanel = () => {
    const [showForm, setShowForm] = useState(false);

    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
    };

    return (
        <div className="spp-side-panel">
            
            <button
                className="spp-booking-button"
                onClick={handleButtonClick}
            >
                Book Appointment
            </button>
            {showForm && <AppointmentForm onClose={handleFormClose} />}
        </div>
    );
};

export default SidePanel;
