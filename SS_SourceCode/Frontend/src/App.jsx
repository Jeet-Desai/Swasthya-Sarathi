import { useState } from 'react'
import './App.css'

import AddNewDoctor from './pages/DoctorRegistarionPage/AddNewDoctor';
import AddMedicalRecord from './pages/AddMedicalRecord/AddMedicalRecord';
import DoctorNavbar from './pages/DoctorDashboard/DoctorNavbar';
import { BrowserRouter } from 'react-router-dom';
import ViewAppointmentRequests from './pages/AppointmentRequestPage/ViewAppointmentRequests';
import DoctorDashboard from './pages/DoctorDashboard/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
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
    {/* <AdminDashboard/> */}
    </>
  )
}

export default App
