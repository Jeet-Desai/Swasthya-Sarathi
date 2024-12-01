import express from 'express';
import { RegisterDoctor} from '../Controllers/HospitalController.js'
import {getHospitalAppointments,getAppointmentDetail,updateAppointmentStatus} from '../Controllers/appointmentController.js';
const router = express.Router();

router.post("/register-doctor",RegisterDoctor);
router.get("/get-hospital-appointments/:hospitalId",getHospitalAppointments);
router.get("/get-appointment-detail/:appointmentId",getAppointmentDetail);

router.post('/:appointmentId/status', updateAppointmentStatus);

export default router;