import Patient from '../Models/PatientModel.js';
import Appointment from '../Models/AppointmentModel.js';
import Doctor from '../Models/DoctorModel.js';
import Hospital from '../Models/HospitalModel.js';
    

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('hospital', 'name');
    
    
    res.status(200).json({
      success: true,
      doctors,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctors.',
      error: error.message,
    });
  }
};

export const getDoctorById = async (req, res) => {
    const { id } = req.params;
    try {
      const doctor = await Doctor.findById(id).populate('hospital', 'name');
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found',
        });
      }
      res.status(200).json({
        success: true,
        doctor,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch doctor details.',
        error: error.message,
      });
    }
  };
