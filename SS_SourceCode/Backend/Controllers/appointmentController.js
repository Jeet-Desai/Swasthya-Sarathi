import Patient from '../Models/PatientModel.js';
import Appointment from '../Models/AppointmentModel.js';
import Doctor from '../Models/DoctorModel.js';
import Hospital from '../Models/HospitalModel.js';
   
import multer from 'multer';
import path from 'path';


import fs from 'fs';


export const updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { status, prescription, medicines, doctorId } = req.body;


  try {
    // Fetch the appointment by appointmentId
    const appointment = await Appointment.findById(appointmentId);


    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found!" });
    }


    if (appointment.doctor.toString() !== doctorId) {
      return res.status(403).json({ message: "You are not authorized to update this appointment." });
    }


    appointment.status = status || appointment.status;
    appointment.prescription = prescription || appointment.prescription;
    appointment.medicines = medicines || appointment.medicines;


    // Handle file uploads
    if (req.files) {
      const reportPaths = req.files.map(file => file.path);
      appointment.reports = appointment.reports.concat(reportPaths);
    }


    // Save the updated appointment
    await appointment.save();


    res.status(200).json({
      success: true,
      message: "Appointment updated successfully.",
      appointment,
    });
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update appointment.",
    });
  }
};


    
import multer from 'multer';
import path from 'path';

import fs from 'fs';

export const updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { status, prescription, medicines, doctorId } = req.body;

  try {
    // Fetch the appointment by appointmentId
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found!" });
    }

    if (appointment.doctor.toString() !== doctorId) {
      return res.status(403).json({ message: "You are not authorized to update this appointment." });
    }

    appointment.status = status || appointment.status;
    appointment.prescription = prescription || appointment.prescription;
    appointment.medicines = medicines || appointment.medicines;

    // Handle file uploads
    if (req.files) {
      const reportPaths = req.files.map(file => file.path);
      appointment.reports = appointment.reports.concat(reportPaths);
    }

    // Save the updated appointment
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully.",
      appointment,
    });
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update appointment.",
    });
  }
};

export const requestAppointment = async (req, res) => {
    const { doctorId, hospitalId, date, time, description, patientId } = req.body;
   
    try {
      // 1. Create a new appointment
      const newAppointment = new Appointment({
        patient: patientId, // the patient making the request
        doctor: doctorId,
        hospital: hospitalId,
        date,
        time,  
        description,
        status:'pending', // Initial status is 'pending'
      });
   
      // Save the appointmentx  
      const appointment = await newAppointment.save();
 
      // 2. Update the Doctor's appointment array
      await Doctor.findByIdAndUpdate(
        doctorId,
        { $push: { appointments: appointment._id } },
        { new: true }
      );
      await Patient.findByIdAndUpdate(
        patientId,
        { $push: { appointments: appointment._id } },
        { new: true }
      );  
 
 
      // 3. Update the Hospital's appointment array
      await Hospital.findByIdAndUpdate(
        hospitalId,
        { $push: { appointments: appointment._id } },
        { new: true }
      );
 
      res.status(200).json({
        success: true,
        message: "Appointment requested successfully",
        appointment,
      });
    } catch (error) {
      console.error("Error in requesting appointment:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong while requesting the appointment.",
      });
    }
  };


  export const getPendingAppointments = async (req, res) => {
    const { patientId } = req.params;
    try {
      const appointments = await Appointment.find({ patient: patientId, status: 'pending' }).populate('hospital', 'name');
      res.status(200).json({
        success: true,
        appointments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch pending appointments.',
        error: error.message,
      });
    }
  };


  export const getPastAppointments = async (req, res) => {
    const { patientId } = req.params;
    try {
      const appointments = await Appointment.find({ patient: patientId, status: 'completed' }).populate('hospital', 'name');
      res.status(200).json({
        success: true,
        appointments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch pending appointments.',
        error: error.message,
      });
    }
  };
 


export const getAppointmentStats = async (req, res) => {
  const { patientId } = req.params;
  try {
    const totalAppointments = await Appointment.countDocuments({ patient: patientId });
    const pendingAppointments = await Appointment.countDocuments({ patient: patientId, status: 'pending' });
    const completedAppointments = await Appointment.countDocuments({ patient: patientId, status: 'completed' });
    const rejectedAppointments = await Appointment.countDocuments({ patient: patientId, status: 'rejected' });
    const approvedAppointments = await Appointment.countDocuments({ patient: patientId, status: 'approved' });


    res.status(200).json({
      success: true,
      stats: {
        total: totalAppointments,
        pending: pendingAppointments,
        completed: completedAppointments,
        rejected: rejectedAppointments,
        approved: approvedAppointments
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointment statistics.',
      error: error.message,
    });
  }
};


export const getHospitalAppointments = async (req, res) => {
  const { hospitalId } = req.params;
  try {
    const appointments = await Appointment.find({ hospital: hospitalId })
      .populate('patient', 'name email contactNo')
      .populate('doctor', 'name specialization');
     


    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hospital appointments.',
      error: error.message,
    });
  }
};


export const getAppointmentDetail = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await Appointment.findById(appointmentId)
      .populate('patient', 'name email contactNo')
      .populate('doctor', 'name specialization')
      .populate('hospital', 'name');
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }
    res.status(200).json({
      success: true,
      appointment,
    });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointment details.',
      error: error.message,
    });
  }
}
export const updateAppointmentStatus = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;


  try {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
 
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }


    res.status(200).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update appointment status', error: error.message });
  }
};
