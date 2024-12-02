import Doctor from '../Models/DoctorModel.js';
import Hospital from '../Models/HospitalModel.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve('./uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Ensure directory exists
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimeType && extName) {
      return cb(null, true);
    }
    cb(new Error('Only .jpeg, .jpg, and .png formats are allowed!'));
  },
});

// Doctor registration handler
export const RegisterDoctor = async (req, res) => {
  upload.single('photo')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
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
        return res.status(400).json({ message: 'Passwords do not match!' });
      }

      const hospital = await Hospital.findById(hospitalId);
      if (!hospital) {
        return res.status(404).json({ message: 'Hospital not found' });
      }

      const doctorExists = await Doctor.findOne({ email });
      if (doctorExists) {
        return res.status(400).json({ message: 'Doctor already exists' });
      }

      const photoPath = req.file ? path.relative('./', req.file.path) : '';

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
        photo: photoPath, // Save public-facing file path
      });

      await doctor.save();
      hospital.doctors.push(doctor._id);
      await hospital.save();

      res.status(201).json({ success: true, message: 'Doctor registered successfully', doctor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });
};
