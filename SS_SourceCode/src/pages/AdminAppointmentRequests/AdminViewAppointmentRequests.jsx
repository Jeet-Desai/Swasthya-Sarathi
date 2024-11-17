import React from "react";
import Card from "./Component/Card"; // for importing card (request component)
import "./AdminViewAppointmentRequests.css"; // Import the updated CSS

export default function AdminViewAppointmentRequests() {
  return (
    <>
      {/* Wrapping the whole content inside a specific div for this page */}
      <div className="view-appointment-requests-page">
        <div className="view-appointment-requests-container">
          <div className="view-appointment-requests-title">Appointment Requests</div>
          <div className="view-appointment-requests-list">
            <Card appointmentID="6xxx9" />
            <Card appointmentID="7xxx7" />
            <Card appointmentID="8xxx8" />
            <Card appointmentID="9xxx9" />
            <Card appointmentID="6xxx9" />
            <Card appointmentID="7xxx7" />
            <Card appointmentID="8xxx8" />
            <Card appointmentID="9xxx9" />
          </div>
        </div>
      </div>
    </>
  );
}
