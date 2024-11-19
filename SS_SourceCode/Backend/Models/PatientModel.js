// import mongoose from "mongoose";

// const UserModel = new mongoose.Schema({
//   Email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   FullName: { type: String, required: true },
//   phone: { type: Number },
//   Profilepic: { type: String },
//   role: {
//     type: String,
//     enum: ["patient", "admin"],
//     default: "patient",
//   },
//   gender: { type: String, enum: ["male", "female", "other"] },
//   bloodType: { type: String },
//   appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
// });

// export default mongoose.model("User", UserModel);

import mongoose from "mongoose";

const PatientModel = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true }, // Email
    password: { type: String, required: true }, // Password
    name: { type: String, required: true }, // Full Name
    contactNo: { type: String, required: false }, // Contact Number (as string to support international format)
    nationality: { type: String, required: true }, // Nationality
    dob: { type: Date, required: true }, // Date of Birth
    gender: { 
      type: String, 
      enum: ["Male", "Female", "other"], 
      required: true 
    }, // Gender
    bloodGroup: { 
      type: String, 
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], 
      required: true 
    }, // Blood Group
    
    role: { 
      type: String, 
      enum: ["patient", "admin"], 
      default: "patient" 
    }, // User Role
    appointments: [{ 
      type: mongoose.Types.ObjectId, 
      ref: "Appointment" 
    }], // Linked Appointments
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

export default mongoose.model("Patient", PatientModel);