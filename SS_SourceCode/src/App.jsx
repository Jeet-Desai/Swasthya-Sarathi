import { useState } from 'react'
import './App.css'
import DoctorRequestPage from './pages/DoctorRequestPage/DoctorRequestPage';
import ManagePage from './pages/ManagePage/ManagePage';
import BottomBar from './pages/Patient_Navbar_and_bottombar/BottomBar';
import Navbar from './pages/Patient_Navbar_and_bottombar/Navbar';
import AdminLogin from './pages/AdminLoginPage/AdminLogin';
import AddNewDoctor from './pages/DoctorRegistarionPage/AddNewDoctor';
import AddMedicalRecord from './pages/AddMedicalRecord/AddMedicalRecord';
import DoctorNavbar from './pages/DoctorDashboard/DoctorNavbar';
import { BrowserRouter } from 'react-router-dom';
import ViewAppointmentRequests from './pages/AppointmentRequestPage/ViewAppointmentRequests';
import AppointmentDetails from './pages/AppointmentDetailsPage/AppointmentDetails';
import HospitalInfoPage from './pages/HospitalInfopage/HospitalInfoPage';
import DoctorDashboard from './pages/DoctorDashboard/DoctorDashboard';

function App() {
  return (
    <>
    {/* <DoctorRequestPage/> */}
    {/* <ManagePage/> */}
    {/* <AdminLogin/> */}
    {/* <AddNewDoctor/> */}
    {/* <AddMedicalRecord/> */}
    {/* <AddNewDoctor/> */}
    {/* <AddMedicalRecord/> */}
    {/* <BrowserRouter> */}
    {/* <DoctorNavbar/> */}
    {/* </BrowserRouter> */}
    {/* <AppointmentDetails/> */}
    {/* <ViewAppointmentRequestsContainer/> */}
    {/* <HospitalInfoPage/> */}
    <DoctorDashboard/>
    </>
  )
}

export default App
