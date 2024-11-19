import { useNavigate } from "react-router-dom";
import "./appointmentList.css";

const AppointmentList = () => {
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
    navigate(`/appointment/${id}`);
  };

  return (
    <div
      style={{
        backgroundColor: "#f3f8fc",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="appointment-list">
        <h2>Past Appointments</h2>
        <div className="appointments-container">
          {appointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-details">
                <p className="appointment-hospital">{appointment.hospital}</p>
                <p className="appointment-date">Date: {appointment.date}</p>
                <p className="appointment-time">Time: {appointment.time}</p>
              </div>
              <button
                className="view-button"
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

export default AppointmentList;
