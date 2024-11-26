// import React from "react";
// import Card from "./Component/Card"; // for importing card (request component)
// import "./AdminViewAppointmentRequests.css"; // Import the updated CSS

// export default function AdminViewAppointmentRequests() {
//   return (
//     <>
//       {/* Wrapping the whole content inside a specific div for this page */}
//       <div className="view-appointment-requests-page">
//         <div className="view-appointment-requests-container">
//           <div className="view-appointment-requests-title">Appointment Requests</div>
//           <div className="view-appointment-requests-list">
//             <Card appointmentID="6xxx9" />
//             <Card appointmentID="7xxx7" />
//             <Card appointmentID="8xxx8" />
//             <Card appointmentID="9xxx9" />
//             <Card appointmentID="6xxx9" />
//             <Card appointmentID="7xxx7" />
//             <Card appointmentID="8xxx8" />
//             <Card appointmentID="9xxx9" />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// AdminViewAppointmentRequests.jsx
import React from "react";
import Card from "./Component/Card";
import "./AdminViewAppointmentRequests.css";
import { getHospitalAppointments } from "./../../assets/data/admin_app.jsx";
// SS_SourceCode\Frontend\src\assets\data\admin_app.jsx
export default function AdminViewAppointmentRequests() {
  const { appointments, loading, error } = getHospitalAppointments();

  if (loading) return <div className="view-appointment-requests-page">Loading...</div>;
  if (error) return <div className="view-appointment-requests-page">Error: {error}</div>;

  return (
    <>
      <div className="view-appointment-requests-page">
        <div className="view-appointment-requests-container">
          <div className="view-appointment-requests-title">Appointment Requests</div>
          <div className="view-appointment-requests-list">
            {appointments.map((appointment) => (
              <Card
                key={appointment._id}
                appointmentID={appointment._id}
                patientName={appointment.patient.name}
                doctorName={appointment.doctor.name}
                date={new Date(appointment.date).toLocaleDateString()}
                time={appointment.time}
                status={appointment.status}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}