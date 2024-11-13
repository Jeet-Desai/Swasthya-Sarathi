import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DoctorRequestPage from './pages/DoctorRequestPage/DoctorRequestPage';
import ManagePage from './pages/ManagePage/ManagePage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <DoctorRequestPage/> */}
    <ManagePage/>
    <h1>HEllo</h1>
    </>
  )
}

export default App
