import "./AdminNavbar.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AdminViewAppointmentRequests from "../AdminAppointmentRequests/AdminViewAppointmentRequests";
import AddNewDoctor from "../DoctorRegistarionPage/AddNewDoctor";
import AdminAppointmentDetails from "../AdminAppointmentDetails/AdminAppointmentDetails";
import AdminNavbar from "./AdminNavbar";
import AdminHome from "./AdminHome";

const AdminDashboard = () => {
  return (
    <>
      <div className="layout-container">
        <BrowserRouter>
          <AdminNavbar/>
            <Routes>
              <Route path="/" element={<AdminHome/>}/>
              <Route path="/admin/home" element={<AdminHome/>}/>
              <Route path="/admin/appointments" element={<AdminViewAppointmentRequests/>} />
              <Route path="/admin/adddoctor" element={<AddNewDoctor/>} />
              <Route path="/admin/appointments/:appointmentID" element={<AdminAppointmentDetails/>} />
            </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
        </div>
    </>
  );
};

export default AdminDashboard;