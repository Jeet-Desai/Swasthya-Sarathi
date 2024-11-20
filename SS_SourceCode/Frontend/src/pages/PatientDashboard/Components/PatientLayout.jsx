import DashboardHeader from "./DashboardHeader/DashboardHeader";
import PDashboard from "./PDashboard/PDashboard";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
import PastAppointmentList from "../../PastAppointment/PastAppointmentList";
import PastAppointmentDetails from "../../PastAppointment/PastAppointmentDetails";
import PendingAppointments from "../../patient/PendingAppointments";
import PendingAppointmentDetail from "../../patient/PendingAppointmentDetail";
import PatientProfile from "../../patient/PatientProfile";
import DoctorBooking from "../../Booking/DoctorBooking";
import DoctorsDetails from "../../PatientViewDoctor/DoctorsDetails";
import Doctors from "../../PatientViewDoctor/Doctors";
const PatientLayout = () => {
  return (
    <div>
      <BrowserRouter>
        <DashboardHeader />
        <main>
          <Routes>
          <Route path="/" element={<PDashboard />} />
            <Route path="/patient-dashBoard" element={<PDashboard />} />
            <Route path="/doctor/:id" element={<DoctorsDetails />} />
            <Route path="/patient-bookDoctor" element={<Doctors />} />
            <Route
              path="/patient-pending-appointment-list"
              element={<PendingAppointments />}
            />
            <Route
              path="/patient-pending-appointmentdetails/:id"
              element={<PendingAppointmentDetail />}
            />

            <Route
              path="/patient-pastappointment-list"
              element={<PastAppointmentList />}
            />
            <Route
              path="/patient-pastappointmentdetails/:id"
              element={<PastAppointmentDetails />}
            />
            <Route path="/patient-profile" element={<PatientProfile />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default PatientLayout;
