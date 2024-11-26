import Patient from '../Models/PatientModel.js';
import Appointment from '../Models/AppointmentModel.js';
import Doctor from '../Models/DoctorModel.js';
import Hospital from '../Models/HospitalModel.js';
    
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