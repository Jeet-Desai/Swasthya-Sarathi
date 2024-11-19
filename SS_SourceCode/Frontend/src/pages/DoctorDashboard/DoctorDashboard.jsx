import "./DoctorNavbar.css";
// import Header from "../components/Header/Header";
// import Footer from "../components/Footer/Footer";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import Contact from "../pages/Contact";
// import Doctors from "../pages/Doctors/Doctors";
// import DoctorsDetails from "../pages/Doctors/DoctorsDetails";
// import About from "../components/About/About";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import DoctorNavbar from "./DoctorNavbar";
import AddMedicalRecord from './../AddMedicalRecord/AddMedicalRecord';
import ViewAppointmentRequests from "../AppointmentRequestPage/ViewAppointmentRequests";
import AppointmentDetails from "../AppointmentDetailsPage/AppointmentDetails";
import DoctorHome from "./DoctorHome";
import AdminHome from "../AdminDashboard/AdminHome";

const DoctorDashboard = () => {
  return (
    <>
      <div className="layout-container">
        <BrowserRouter>
          <DoctorNavbar/>
            <Routes>
              <Route path="/homedoctor" element={<AdminHome/>}/>
              <Route path="/doctorappointments" element={<ViewAppointmentRequests/>} />
              <Route path="/addmedicalrecord" element={<AddMedicalRecord />} />
              <Route path="/doctorappointments/:appointmentID" element={<AppointmentDetails/>} />
            </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
        </div>
    </>
  );
};

export default DoctorDashboard;