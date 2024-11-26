import express from  'express';

import { authenticate, restrict } from '../auth/verifyToken.js';
import { updateAppointment } from '../Controllers/DoctorController.js';
import  { getDoctorById } from '../controllers/UserController.js';

const router = express.Router();
router.post('/upd_appo/:appointmentId',updateAppointment);



router.get('/api/v1/doctors/:id', getDoctorById);


export default router;