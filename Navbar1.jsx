// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Navbar1.css'; // Import the Navbar CSS for styling

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-links">
      <Link to="/">Home</Link>
        <Link to="/pending-appointments">Pending Appointments</Link>
        <Link to="/past-appointments">Past Appointments</Link>
      </div>

      {/**<div className="search-container">
        <input type="text" placeholder="Search" />
        <button className="search-button">Search</button>
      </div>**/}
    </div> 
      
  );
};

export default Navbar;
