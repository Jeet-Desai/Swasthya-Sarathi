const mongoose = require('mongoose');

const PatientModel = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    profilePhoto: { type: String, default: null },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    nationality: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', PatientModel);
