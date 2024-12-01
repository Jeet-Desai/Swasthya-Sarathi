import express from 'express';
import { authenticate, restrict } from '../auth/verifyToken.js';
import { updateAppointment } from '../Controllers/appointmentController.js';
import { getAppointmentDetail } from '../Controllers/appointmentController.js';
import { getPendingAppointmentsbyDiD } from '../Controllers/DoctorController.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/reports/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/appo/:appointmentId', getAppointmentDetail);
router.post('/upd_appo/:appointmentId', upload.array('reports', 10), updateAppointment);
router.get('/get-pending-appo/:doctorId', getPendingAppointmentsbyDiD);

export default router;