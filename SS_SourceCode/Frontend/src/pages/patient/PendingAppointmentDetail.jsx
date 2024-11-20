import { useParams, useNavigate } from "react-router-dom";
import "./PendingAppointmentDetail.css";

const PendingAppointmentDetail = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const appointmentDetails = {
    1: {
      doctor: "Dr. Alice Johnson",
      symptomDescription:
        "Patient experiences mild chest pain and occasional shortness of breath.",
    },
    2: {
      doctor: "Dr. Robert Brown",
      symptomDescription:
        "Patient reports dizziness and mild headaches, especially in the mornings.",
    },
    // Add more details as needed
  };

  const appointment = appointmentDetails[appointmentId] || {
    doctor: "Unknown",
    symptomDescription: "No description available.",
  };

  const handleReturnClick = () => {
    navigate(-1); // This goes back to the previous page
  };

  return (
    <div className="pending-appointment-detail">
      <h2>Appointment Details</h2>
      <p>
        <strong>Doctor:</strong> {appointment.doctor}
      </p>
      <p>
        <strong>Symptoms:</strong> {appointment.symptomDescription}
      </p>
      <button className="pending-return-button" onClick={handleReturnClick}>
        Return
      </button>
    </div>
  );
};

export default PendingAppointmentDetail;
