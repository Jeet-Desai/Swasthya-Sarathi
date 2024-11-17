const mongoose = require('mongoose');

const HospitalModel = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    photo: { type: String, default: null },
    establishmentYear: { type: Number, required: true },
    address: { type: String, required: true },
    type: { type: String, enum: ['gov', 'semi-gov', 'private'], required: true },
    departments: [{ type: String, required: true }],  // Array of departments like cardio, ortho, etc.
    registrationNo: { type: String, required: true },
    website: { type: String, default: null },
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hospital', HospitalModel);
