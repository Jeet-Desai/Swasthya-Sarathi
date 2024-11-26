import "./Layout.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../components/About/About";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Register from "../components/Register/Register";
import Signup from "../pages/SignupPages/Signup";
import HospitalSignup from "./../pages/SignupPages/HospitalSignup";
import Login from "../pages/LoginPage/Login";
import Doctors from "../pages/PatientViewDoctor/Doctors";
import DoctorsDetails from "../pages/PatientViewDoctor/DoctorsDetails";
import DashboardHeader from "../pages/PatientDashboard/Components/DashboardHeader/DashboardHeader";
import DoctorNavbar from "../pages/DoctorDashboard/DoctorNavbar";
import AdminNavbar from "../pages/AdminDashboard/AdminNavbar";
import PendingAppointments from "../pages/patient/PendingAppointments";
import PDashboard from "../pages/PatientDashboard/Components/PDashboard/PDashboard";
import PendingAppointmentDetail from "../pages/patient/PendingAppointmentDetail";
import PastAppointmentList from "../pages/PastAppointment/PastAppointmentList";
import PastAppointmentDetails from "../pages/PastAppointment/PastAppointmentDetails";
import PatientProfile from "../pages/patient/PatientProfile";
import AdminHome from "../pages/AdminDashboard/AdminHome";
import ViewAppointmentRequests from "../pages/AppointmentRequestPage/ViewAppointmentRequests";
import AddMedicalRecord from "../pages/AddMedicalRecord/AddMedicalRecord";
import AppointmentDetails from "../pages/AppointmentDetailsPage/AppointmentDetails";
import AdminViewAppointmentRequests from "../pages/AdminAppointmentRequests/AdminViewAppointmentRequests";
import AddNewDoctor from "../pages/DoctorRegistarionPage/AddNewDoctor";
import AdminAppointmentDetails from "../pages/AdminAppointmentDetails/AdminAppointmentDetails";
import PatientFooter from "../components/Footer/PatientFooter";
import AdminFooter from "../components/Footer/AdminFooter";
import DoctorFooter from "../components/Footer/DoctorFooter";

const Layout = () => {
  return (
    <>
      <div className="layout-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/doctors" element={<Header />} />
            {/* <Route path="/doctor/:id" element={<Header />} /> */}
            <Route path="/login" element={<Header />} />
            <Route path="/register" element={<Header />} />
            <Route path="/contact" element={<Header />} />
            <Route path="/about-us" element={<Header />} />
            <Route path="/signup-patient" element={<Header />} />
            <Route path="/signup-hos" element={<Header />} />
            <Route path="/patient/*" element={<DashboardHeader />} />
            <Route path="/doctor/*" element={<DoctorNavbar />} />
            <Route path="/admin/*" element={<AdminNavbar />} />
          </Routes>
        </BrowserRouter>
        <BrowserRouter>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctor/:id" element={<DoctorsDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/patient/contact" element={<Contact />} />
              <Route path="/admin/contact" element={<Contact />} />
              <Route path="/doctor/contact" element={<Contact />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/patient/about-us" element={<About />} />
              <Route path="/admin/about-us" element={<About />} />
              <Route path="/doctor/about-us" element={<About />} />
              <Route path="/signup-patient" element={<Signup />} />
              <Route path="/signup-hos" element={<HospitalSignup />} />
              <Route path="/patient/dashboard" element={<PDashboard />} />
              <Route path="/patient/" element={<PDashboard />} />
              <Route path="/patient/bookdoctor" element={<Doctors />} />
              <Route
                path="/patient/pending-appointment-list"
                element={<PendingAppointments />}
              />
              <Route
                path="/patient/pending-appointmentdetails/:id"
                element={<PendingAppointmentDetail />}
              />

              <Route
                path="/patient/pastappointment-list"
                element={<PastAppointmentList />}
              />
              <Route
                path="/patient/pastappointmentdetails/:id"
                element={<PastAppointmentDetails />}
              />
              <Route path="/patient/profile" element={<PatientProfile />} />
              <Route path="/doctor/home" element={<AdminHome />} />
              <Route path="/doctor/" element={<AdminHome />} />
              <Route
                path="/doctor/appointments/"
                element={<ViewAppointmentRequests />}
              />
              <Route
                path="/doctor/addmedicalrecord/"
                element={<AddMedicalRecord />}
              />
              <Route
                path="/doctor/appointments/:appointmentID/"
                element={<AppointmentDetails />}
              />
              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/admin/" element={<AdminHome />} />
              <Route
                path="/admin/appointments"
                element={<AdminViewAppointmentRequests />}
              />
              <Route path="/admin/adddoctor" element={<AddNewDoctor />} />
              <Route
                path="/doctor/addmedicalrecord"
                element={<AddNewDoctor />}
              />
              <Route
                path="/admin/appointments/:appointmentID"
                element={<AdminAppointmentDetails />}
              />
            </Routes>
          </main>
        </BrowserRouter>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Footer />} />
            <Route path="/doctors" element={<Footer />} />
            {/* <Route path="/doctor/:id" element={<Footer />} /> */}
            <Route path="/login" element={<Footer />} />
            <Route path="/register" element={<Footer />} />
            <Route path="/contact" element={<Footer />} />
            <Route path="/about-us" element={<Footer />} />
            <Route path="/signup-patient" element={<Footer />} />
            <Route path="/signup-hos" element={<Footer />} />
            <Route path="/patient/*" element={<PatientFooter />} />
            <Route path="/doctor/*" element={<DoctorFooter />} />
            <Route path="/admin/*" element={<AdminFooter />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default Layout;
