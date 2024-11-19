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
import HospitalSignup from './../pages/SignupPages/HospitalSignup';
import Login from "../pages/LoginPage/Login";
import Doctors from "../pages/PatientViewDoctor/Doctors";
import DoctorsDetails from "../pages/PatientViewDoctor/DoctorsDetails";

const Layout = () => {
  return (
    <>
      <div className="layout-container">
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/homepatient" element={<Home />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/doctor/:id" element={<DoctorsDetails />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/signup-patient" element={<Signup />} />
              <Route path="/signup-hos" element={<HospitalSignup />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
};

export default Layout;