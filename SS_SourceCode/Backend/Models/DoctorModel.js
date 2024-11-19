import mongoose from "mongoose";

const DoctorModel = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    specialization: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    dob: { type: Date, required: true },
    nationality: { type: String, required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


export default mongoose.model("Doctor", DoctorModel);