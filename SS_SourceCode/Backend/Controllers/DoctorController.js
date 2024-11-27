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

// Get all pending appointments for a specific doctor
export const getPendingAppointmentsbyDiD = async (req, res) => {
    const { doctorId } = req.params;

    try {
        // Find all pending appointments for the doctor
        const pendingAppointments = await Appointment.find({
            doctor: doctorId,
            status: "pending"
        })
        .populate('patient', 'name') // Only get patient name
        .select('_id patient date time description'); // Select required fields

        // Format the response
        const formattedAppointments = pendingAppointments.map(appointment => ({
            appointmentId: appointment._id,
            patientName: appointment.patient.name,
            date: appointment.date,
            time: appointment.time,
            description: appointment.description
        }));

        res.status(200).json({
            success: true,
            count: formattedAppointments.length,
            appointments: formattedAppointments
        });

    } catch (error) {
        console.error("Error fetching pending appointments:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch pending appointments"
        });
    }
};