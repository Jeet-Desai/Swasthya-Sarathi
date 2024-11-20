import express from  'express';

import { authenticate, restrict } from '../auth/verifyToken.js';
import { updateAppointment } from '../Controllers/DoctorController.js';

const router = express.Router();
router.post('/upd_appo/:appointmentId',updateAppointment);
export default router;