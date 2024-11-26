// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./PendingAppointments.css";

// const PendingAppointments = () => {
//   // const navigate = useNavigate();

//   // const appointments = [
//   //   { id: 1, hospital: "City Hospital", date: "11/15/2024", time: "10:00 AM" },
//   //   {
//   //     id: 2,
//   //     hospital: "Green Valley Clinic",
//   //     date: "11/16/2024",
//   //     time: "02:00 PM",
//   //   },
//   //   // Add more appointments if needed
//   // ];
//   const navigate = useNavigate();
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     const fetchPendingAppointments = async () => {
//       const user = JSON.parse(localStorage.getItem('user'));
//       const patientId = user ? user._id : null;
//       if (!patientId) {
//         console.error('Patient ID not found in local storage.');
//         return;
//       }

//       try {
//         const response = await fetch(`http://localhost:5000/api/v1/patients/${patientId}/pending-appointments`);
//         const data = await response.json();
//         if (response.ok) {
//           setAppointments(data.appointments);
//         } else {
//           console.error(data.message);
//         }
//       } catch (error) {
//         console.error('An error occurred while fetching pending appointments:', error);
//       }
//     };

//     fetchPendingAppointments();
//   }, []);

//   console.log(appointments);
//   const handleViewClick = id => {
//     navigate(`/patient-pending-appointmentdetails/${id}`); // Fixed template literal syntax
//   };

//   return (
//     // Wrapper div with background color
//     <div
//       style={{
//         minHeight: "100vh",
//         padding: "20px",
//       }}
//     >
//       <div className="new-pending-appointments">
//         <h2>Pending Appointments</h2>
//         <div className="new-appointments-list">
//           {appointments.map(appointment => (
//             <div key={appointments.id} className="new-appointment-card">
//               <div className="new-appointment-details">
//                 <p className="new-appointment-hospital">
//                   {appointments.hospital.name}
//                 </p>
//                 <p className="new-appointment-date">Date: {appointments.date}</p>
//                 <p className="new-appointment-time">Time: {appointments.time}</p>
//               </div>
//               <button
//                 className="new-view-button"
//                 onClick={() => handleViewClick(appointments.id)}
//               >
//                 View
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PendingAppointments;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PendingAppointments.css";

const PendingAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPendingAppointments = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const patientId = user ? user._id : null;
      if (!patientId) {
        console.error('Patient ID not found in local storage.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/v1/patients/${patientId}/pending-appointments`);
        const data = await response.json();
        if (response.ok) {
          setAppointments(data.appointments);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching pending appointments:', error);
      }
    };

    fetchPendingAppointments();
  }, []);

  const handleViewClick = id => {
    navigate(`/patient-pending-appointmentdetails/${id}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="new-pending-appointments">
        <h2>Pending Appointments</h2>
        <div className="new-appointments-list">
          {appointments.map(appointment => (
            <div key={appointment._id} className="new-appointment-card">
              <div className="new-appointment-details">
                <p className="new-appointment-hospital">
                  {appointment.hospital.name}
                </p>
                <p className="new-appointment-date">Date: {new Date(appointment.date).toLocaleDateString()}</p>
                <p className="new-appointment-time">Time: {appointment.time}</p>
              </div>
              <button
                className="new-view-button"
                onClick={() => handleViewClick(appointment._id)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PendingAppointments;