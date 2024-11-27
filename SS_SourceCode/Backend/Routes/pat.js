import express from  'express';
import { getAllDoctors} from '../Controllers/UserController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';
import {requestAppointment} from '../Controllers/appointmentController.js';
import { getPendingAppointments ,getPastAppointments,getAppointmentStats} from '../controllers/appointmentController.js';
import  { getDoctorById,getHospitalIdbyDoctorId } from '../controllers/UserController.js';
import {getAppointmentDetail} from '../Controllers/appointmentController.js';

const router = express.Router();

router.get('/doctors_fetch', getAllDoctors);
router.post('/request_appointment',requestAppointment);


router.get('/:patientId/pending-appointments', getPendingAppointments);
router.get('/:patientId/past-appointments', getPastAppointments);
router.get('/:patientId/appointment-stats', getAppointmentStats);
router.get('/view-doctor/:doctorId', getDoctorById);
router.get('/hospital-by-id/:doctorId', getHospitalIdbyDoctorId);
router.get('/get-appo-details/:appointmentId',getAppointmentDetail)



export default router; 
