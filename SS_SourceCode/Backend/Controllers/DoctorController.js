import Appointment from '../Models/AppointmentModel.js';
import Doctor from '../Models/DoctorModel.js';

export const updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { status, prescription, medicines, reports } = req.body;

  try {
    // Fetch the appointment by appointmentId
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found!" });
    }
    console.log(req.body.doctorId);

    // Check if the doctor is assigned to this appointment
    if (appointment.doctor.toString() !== req.body.doctorId) {
      return res.status(403).json({ message: "You are not authorized to update this appointment." });
    }

    // Update the necessary fields in the appointment
    appointment.status = status || appointment.status;
    appointment.prescription = prescription || appointment.prescription;
    appointment.medicines = medicines || appointment.medicines;
    appointment.reports = reports || appointment.reports;

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
