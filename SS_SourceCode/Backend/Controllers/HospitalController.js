import Doctor from '../Models/DoctorModel.js';
import Hospital from '../Models/HospitalModel.js';
import multer from 'multer';
import path from 'path';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  }, 
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const RegisterDoctor = async (req, res) => {
  upload.single('photo')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file' });
    }

    const {
      email,
      name,
      password,
      confirmPassword,
      phone,
      gender,
      specialization,
      qualification,
      experience,
      about,
      dob,
      nationality,
      hospitalId,
    } = req.body;

    try {
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match!" });
      }

      const hospital = await Hospital.findById(hospitalId);
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }

      const doctorExists = await Doctor.findOne({ email });
      if (doctorExists) {
        return res.status(400).json({ message: "Doctor already exists" });
      }

      const doctor = new Doctor({
        email,
        name,
        password,
        phone,
        gender,
        specialization,
        qualification,
        experience,
        about,
        dob,
        nationality,
        hospital: hospitalId,
        photo: req.file ? req.file.path : '', // Save photo path
      });

      await doctor.save();
      hospital.doctors.push(doctor._id);
      await hospital.save();

      res.status(201).json({ success: true, message: "Doctor registered successfully", doctor });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  });
};