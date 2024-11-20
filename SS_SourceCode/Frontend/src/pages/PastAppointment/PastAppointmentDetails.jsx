import { useParams, useNavigate } from "react-router-dom";
import "./PastappointmentDetails.css";

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
    Prescriptions: ["Prescription 1", "Prescription 2"], // Multiple prescriptions
    Reports: [
      {
        label: "Report 1",
        link: "https://www.delhimedicalcouncil.org/pdf/modalprescription.pdf",
      },
      {
        label: "Report 2",
        link: "https://example.com/prescriptions/prescription2.pdf",
      },
    ], // Multiple Report
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
    Prescriptions: ["Prescription 1"], // Single prescription
    Reports: [
      {
        label: "Report 1",
        link: "https://www.delhimedicalcouncil.org/pdf/modalprescription.pdf",
      },
      {
        label: "Report 2",
        link: "https://example.com/prescriptions/prescription2.pdf",
      },
      {
        label: "Report 3",
        link: "https://example.com/prescriptions/prescription2.pdf",
      },
    ],
  },
];

const PastAppointmentDetails = () => {
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
    <div className="past-appointment-container">
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

      <p>
        <strong>Presctiption:</strong>
        <ul>
          {appointment.Prescriptions.map((Pres, index) => (
            <li key={index}>{Pres}</li>
          ))}
        </ul>
      </p>

      <div className="past-report-buttons">
        <strong>Reports:</strong>
        {appointment.Reports.map((Reports, index) => (
          <button
            key={index}
            className="past-report-button"
            onClick={() => window.open(Reports.link, "_blank")}
          >
            {Reports.label}
          </button>
        ))}
      </div>
      <button className="past-return-button" onClick={handleReturnClick}>
        Return
      </button>
    </div>
  );
};

export default PastAppointmentDetails;
