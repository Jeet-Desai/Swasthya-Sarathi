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
export const getPendingAppointmentsbyDiD = async (req, res) => {
  const { doctorId } = req.params;

  try {
      // Find all appointments for the doctor (not just pending)
      const appointments = await Appointment.find({
          doctor: doctorId
      })
      .populate('patient', 'name')
      .select('_id patient date time description status')
      .sort({ status: 1 }); // Sort by status

      // Format the response
      const formattedAppointments = appointments.map(appointment => ({
          appointmentId: appointment._id,
          patientName: appointment.patient.name,
          date: appointment.date,
          time: appointment.time,
          description: appointment.description,
          status: appointment.status
      }));

      res.status(200).json({
          success: true,
          count: formattedAppointments.length,
          appointments: formattedAppointments
      });

  } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({
          success: false,
          message: "Failed to fetch appointments"
      });
  }
};