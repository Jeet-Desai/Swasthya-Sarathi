import Patient from '../Models/PatientModel.js'; 
import Hospital from '../Models/HospitalModel.js'; // Importing the Hospital model
import Doctor from '../Models/DoctorModel.js'; // Importing the Doctor model (same as hospital model)
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const RegisterDoctor = async (req, res) => {
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
      hospitalId,  // ID of the hospital to associate with the doctor
    } = req.body;
  
    try {
      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match!" });
      }
  
      // Check if the hospital exists
      const hospital = await Hospital.findById(hospitalId);
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }
  
      // Check if the doctor already exists
      const doctorExists = await Doctor.findOne({ email });
      if (doctorExists) {
        return res.status(400).json({ message: "Doctor with this email already exists!" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashed_pass = await bcrypt.hash(password, salt);
  
      // Create a new doctor
      const newDoctor = new Doctor({
        email,
        name,
        password: hashed_pass,
        phone,
        gender,
        specialization,
        qualification,
        experience,
        about,
        dob,
        nationality,
        hospital: hospitalId,  // Associate doctor with hospital
      });
  
      // Save the doctor to the database
      await newDoctor.save();
  
      // Add the new doctor to the hospital's doctors array
      hospital.doctors.push(newDoctor._id);
      await hospital.save();
  
      res.status(200).json({
        success: true,
        message: "Doctor registered successfully and added to hospital",
        doctor: newDoctor,
      });
    } catch (err) {
      console.error("Error during doctor registration:", err);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  export const UpdateDoctor = async (req, res) => {
    const {
      doctorId,  // Doctor ID to be updated
      hospitalId,  // Hospital ID to associate the doctor with
      name,
      email,
      phone,
      gender,
      specialization,
      qualification,
      experience,
      about,
      dob,
      nationality,
    } = req.body;
  
    try {
      // Find the doctor by ID
      let doctor = await Doctor.findById(doctorId);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
  
      // Find the hospital by ID
      let hospital = await Hospital.findById(hospitalId);
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }
  
      // Check if the hospital is changing (if necessary)
      const oldHospitalId = doctor.hospital.toString();
      if (oldHospitalId !== hospitalId) {
        // Remove the doctor from the old hospital's doctors array
        const oldHospital = await Hospital.findById(oldHospitalId);
        oldHospital.doctors = oldHospital.doctors.filter(
          (docId) => docId.toString() !== doctorId
        );
        await oldHospital.save();
  
        // Add the doctor to the new hospital's doctors array
        hospital.doctors.push(doctorId);
        await hospital.save();
      }
  
      // Update the doctor information
      doctor = await Doctor.findByIdAndUpdate(
        doctorId,
        {
          name,
          email,
          phone,
          gender,
          specialization,
          qualification,
          experience,
          about,
          dob,
          nationality,
          hospital: hospitalId,  // Associate with the new hospital
        },
        { new: true }
      );
  
      res.status(200).json({
        success: true,
        message: "Doctor updated successfully",
        doctor,
      });
    } catch (err) {
      console.error("Error during doctor update:", err);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  export const DeleteDoctor = async (req, res) => {
    try {
      const doctorId = req.params.id;
  
      // Remove doctor from the Doctor collection
      const doctor = await Doctor.findByIdAndDelete(doctorId);
      if (!doctor) {
        return res.status(404).json({ success: false, message: "Doctor not found" });
      }
  
      // Update the Hospital's doctor array
      const hospital = await Hospital.findOneAndUpdate(
        { doctors: doctorId },
        { $pull: { doctors: doctorId } },
        { new: true }
      );
  
      res.status(200).json({
        success: true,
        message: "Doctor deleted successfully",
        doctorId: doctorId
      });
    } catch (err) {
      console.error("Error during doctor deletion:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };