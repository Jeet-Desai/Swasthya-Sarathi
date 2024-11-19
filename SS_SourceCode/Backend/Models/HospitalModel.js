
import mongoose from "mongoose";

const HospitalModel = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Email is mandatory and unique
  name: { type: String, required: true }, // Full Name of the hospital
  password: { type: String, required: true }, // Password
  confirmPassword: { type: String }, // Optional, used for confirmation
  contactNo: { type: String, required: true }, // Contact number
  dof: { type: Date, required: true }, // Date of foundation
  type: { type: String, required: true, enum: ["Gov", "Semi-Gov", "Private"] }, // Type of hospital
  registration_no: { type: String, required: true }, // Registration number
  role: { type: String, default: "hospital" }, // Role defaulted to "hospital"
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
});

export default mongoose.model("Hospital", HospitalModel);