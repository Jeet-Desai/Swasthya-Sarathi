import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data for appointments
  const appointmentStats = {
    total: 13,
    pending: 2,
    past: 15,
  };

  return (
    <>
      <div className="p-dashboard">
          <div className="p-dashboard-page-container">
        <div className="p-dashboard-main-content">
          <div className="p-dashboard-header">
            <h1>Dashboard</h1>
            <div className="p-dashboard-search-box">
              <input
                type="search"
                placeholder="Search..."
                className="p-dashboard-search-input"
              />
              <button className="p-dashboard-search-button">Search</button>
            </div>
          </div>

          <div className="p-dashboard-cards-container">
            <div className="p-dashboard-card">
              <div className="p-dashboard-card-header">
                <h2 className="p-dashboard-card-title">Total Appointments</h2>
              </div>
              <div className="p-dashboard-card-number">
                {appointmentStats.total}
              </div>
            </div>

            <div className="p-dashboard-card">
              <div className="p-dashboard-card-header">
                <h2 className="p-dashboard-card-title">Pending Appointments</h2>
              </div>
              <div className="p-dashboard-card-number">
                {appointmentStats.pending}
              </div>
            </div>

            <div className="p-dashboard-card">
              <div className="p-dashboard-card-header">
                <h2 className="p-dashboard-card-title">Past Appointments</h2>
              </div>
              <div className="p-dashboard-card-number">
                {appointmentStats.past}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
