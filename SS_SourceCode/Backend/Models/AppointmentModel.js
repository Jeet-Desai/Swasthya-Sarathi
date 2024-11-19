
import mongoose from "mongoose";

const AppointmentModel = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'completed', 'rejected'], default: 'pending' },
    prescription: { type: String, default: null },
    medicines: { type: [String], default: [] },
    reports: { type: [String], default: [] },

    // Patient's description of their problem
    description: { type: String, default: null }, // Patient's explanation of the symptoms or issue

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Appointment', AppointmentModel);
