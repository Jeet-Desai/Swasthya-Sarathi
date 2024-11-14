import React from "react";
import './AdminLogin.css'

function AdminLogin() {
  return (
    <>
      {/* To access login */}
      <div className="background">
        <div className="container">
          <div className="logo">
          <img src="./Logo2.png" alt="Swathyasarthi Logo" />

          </div>
          <h1 className="title">
            Welcome To <br />
            Swathyasarthi
          </h1>
          <p className="subtitle">Admin Access Only</p>

          <form>
            <div className="input-group">
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Confirm Password" required />
            </div>
            <button type="submit" className="login-btn">Log In</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
