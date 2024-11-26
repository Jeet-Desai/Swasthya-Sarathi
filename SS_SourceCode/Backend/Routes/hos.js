import express from 'express';
import { RegisterDoctor,UpdateDoctor,DeleteDoctor } from '../Controllers/HospitalController.js'
import {getHospitalAppointments,getAppointmentDetail,updateAppointmentStatus} from '../Controllers/appointmentController.js';
const router = express.Router();

router.post("/register-doctor",RegisterDoctor);
router.get("/get-hospital-appointments/:hospitalId",getHospitalAppointments);
router.get("/get-appointment-detail/:appointmentId",getAppointmentDetail);
router.post("/update-doctor",UpdateDoctor);
router.delete("/delete-doctor/:id",DeleteDoctor);
router.post('/:appointmentId/status', updateAppointmentStatus);

export default router;