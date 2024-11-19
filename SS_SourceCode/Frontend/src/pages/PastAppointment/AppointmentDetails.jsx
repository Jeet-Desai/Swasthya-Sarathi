import { useParams, useNavigate } from "react-router-dom";
import "./appointmentDetails.css";

const appointments = [
  {
    id: 1,
    doctor: "Dr. Alice Johnson",
    hospital: "City Hospital",
    department: "Cardiology",
    patientName: "John Doe",
    height: "5'8\"",
    weight: "150 kg",
    age: 35,
    gender: "Male",
    ailment: "Chest Pain",
    diagnoses: ["Mild Angina", "High Cholesterol"], // Multiple diagnoses
    date: "22 Aug 2024",
    time: "10:00 AM",
    prescriptions: [
      {
        label: "Prescription 1",
        link: "https://www.delhimedicalcouncil.org/pdf/modalprescription.pdf",
      },
      {
        label: "Prescription 2",
        link: "https://example.com/prescriptions/prescription2.pdf",
      },
    ], // Multiple prescriptions
  },
  {
    id: 2,
    doctor: "Dr. Robert Brown",
    hospital: "County Hospital",
    department: "Neurology",
    patientName: "Jane Smith",
    height: "5'5\"",
    weight: "135 kg",
    age: 28,
    gender: "Female",
    ailment: "Headaches and Dizziness",
    diagnoses: ["Migraine"], // Single diagnosis
    date: "23 Aug 2024",
    time: "11:00 AM",
    prescriptions: [
      {
        label: "Main Prescription",
        link: "https://example.com/prescriptions/prescription3.pdf",
      },
    ], // Single prescription
  },
  // Add more appointments as needed
];

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const appointment = appointments.find(a => a.id === parseInt(id));

  if (!appointment) {
    return <div>Appointment not found</div>;
  }

  const handleReturnClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="appointment-container">
      <h2>Appointment Details</h2>
      <p>
        <strong>Hospital:</strong> {appointment.hospital}
      </p>
      <p>
        <strong>Department:</strong> {appointment.department}
      </p>
      <p>
        <strong>Doctor:</strong> {appointment.doctor}
      </p>
      <p>
        <strong>Patient Name:</strong> {appointment.patientName}
      </p>
      <p>
        <strong>Age:</strong> {appointment.age}
      </p>
      <p>
        <strong>Gender:</strong> {appointment.gender}
      </p>
      <p>
        <strong>Height:</strong> {appointment.height}
      </p>
      <p>
        <strong>Weight:</strong> {appointment.weight}
      </p>
      <p>
        <strong>Ailment:</strong> {appointment.ailment}
      </p>
      <p>
        <strong>Diagnoses:</strong>
        <ul>
          {appointment.diagnoses.map((diag, index) => (
            <li key={index}>{diag}</li>
          ))}
        </ul>
      </p>
      <p>
        <strong>Date:</strong> {appointment.date}
      </p>
      <p>
        <strong>Time:</strong> {appointment.time}
      </p>
      <div className="prescription-buttons">
        <strong>Prescriptions:</strong>
        {appointment.prescriptions.map((prescription, index) => (
          <button
            key={index}
            className="prescription-button"
            onClick={() => window.open(prescription.link, "_blank")}
          >
            {prescription.label}
          </button>
        ))}
      </div>
      <button className="return-button" onClick={handleReturnClick}>
        Return
      </button>
    </div>
  );
};

export default AppointmentDetails;
