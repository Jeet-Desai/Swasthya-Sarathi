import express from  'express';

import { authenticate, restrict } from '../auth/verifyToken.js';
import { updateAppointment } from '../Controllers/DoctorController.js';
import { getPendingAppointmentsbyDiD } from '../Controllers/DoctorController.js';
const router = express.Router();
router.post('/upd_appo/:appointmentId',updateAppointment);
router.get('/get-pending-appo/:doctorId',getPendingAppointmentsbyDiD);

export default router;