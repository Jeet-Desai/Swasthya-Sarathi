import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppointmentPage from './pages/ManageAppointment/AppointmentPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AppointmentPage date="17/03/2004" time="5:45pm" email="doctorstrange@gmail.com"/>
    </>
  )
}

export default App
