import { useNavigate } from "react-router-dom";
import "./PastappointmentList.css";

const PastAppointmentList = () => {
  const navigate = useNavigate();

  const appointments = [
    {
      id: 1,
      hospital: "City Hospital",
      date: "22 Aug 2024",
      time: "10:00 AM",
    },
    {
      id: 2,
      hospital: "County Hospital",
      date: "23 Aug 2024",
      time: "11:00 AM",
    },
    {
      id: 3,
      hospital: "General Hospital",
      date: "24 Aug 2024",
      time: "12:00 PM",
    },
  ];

  const handleViewClick = id => {
    navigate(`/patient/pastappointmentdetails/${id}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="past-appointment-list">
        <h2>Past Appointments</h2>
        <div className="past-appointments-container">
          {appointments.map(appointment => (
            <div key={appointment.id} className="past-appointment-card">
              <div className="past-appointment-details">
                <p className="past-appointment-hospital">
                  {appointment.hospital}
                </p>
                <p className="past-appointment-date">
                  Date: {appointment.date}
                </p>
                <p className="past-appointment-time">
                  Time: {appointment.time}
                </p>
              </div>
              <button
                className="past-view-button"
                onClick={() => handleViewClick(appointment.id)}
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

export default PastAppointmentList;
