import { useState } from "react";
import "./DoctorBook.css";

const DoctorBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    doctor: "Select Doctor",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Appointment booked for ${formData.name} with ${formData.doctor}`);
    setFormData({
      name: "",
      email: "",
      date: "",
      time: "",
      doctor: "Select Doctor",
    });
  };

  return (
    <div className="booking-container">
      <h1>Book a Doctor</h1>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Appointment Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Appointment Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Select Doctor:
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
          >
            <option value="Select Doctor" disabled>
              Select Doctor
            </option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
            <option value="Dr. Williams">Dr. Williams</option>
          </select>
        </label>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default DoctorBooking;
