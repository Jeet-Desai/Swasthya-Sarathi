import { useState } from 'react'
import './App.css'

import AddNewDoctor from './pages/DoctorRegistarionPage/AddNewDoctor';
import AddMedicalRecord from './pages/AddMedicalRecord/AddMedicalRecord';
import DoctorNavbar from './pages/DoctorDashboard/DoctorNavbar';
import { BrowserRouter } from 'react-router-dom';
import ViewAppointmentRequests from './pages/AppointmentRequestPage/ViewAppointmentRequests';
import DoctorDashboard from './pages/DoctorDashboard/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Layout from './layout/Layout';
import PDashboard from './pages/PatientDashboard/Components/PDashboard/PDashboard';
import DashboardHeader from './pages/PatientDashboard/Components/DashboardHeader/DashboardHeader';
import DashboardFooter from './pages/PatientDashboard/Components/DashboardFooter/DashboardFooter';
import AppointmentDetail from './pages/patient/AppointmentDetail';
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
    {/* <DoctorDashboard/> */}
    {/* <DoctorDashboard/> */}
    {/* <Layout/> */}
    {/* <AdminDashboard/> */}
     {/* <DashboardHeader/>
    <PDashboard/>
    <DashboardFooter/>  */}
    <AppointmentDetail/>
    </>
  )
}

export default App
