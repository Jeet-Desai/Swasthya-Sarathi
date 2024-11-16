import { useState } from 'react'
import './App.css'
import DoctorRequestPage from './pages/DoctorRequestPage/DoctorRequestPage';
import ManagePage from './pages/ManagePage/ManagePage';
import BottomBar from './pages/Patient_Navbar_and_bottombar/BottomBar';
import Navbar from './pages/Patient_Navbar_and_bottombar/Navbar';
import AdminLogin from './pages/AdminLoginPage/AdminLogin';
import AddNewDoctor from './pages/DoctorRegistarionPage/AddNewDoctor';
import AddMedicalRecord from './pages/AddMedicalRecord/AddMedicalRecord';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <DoctorRequestPage/> */}
    {/* <ManagePage/> */}
    {/* <AdminLogin/> */}
    { <AddNewDoctor/> }
    {/* <AddMedicalRecord/> */}
    </>
  )
}

export default App
