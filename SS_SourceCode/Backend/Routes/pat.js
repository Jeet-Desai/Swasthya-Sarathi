import express from  'express';
import { Update_patient_data,Delete_patient_data,get_all_pats,find_one_patient, requestAppointment } from '../Controllers/UserController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';
const router = express.Router();

router.get('/:id',authenticate,restrict(["admin"]),find_one_patient);
router.get('/',get_all_pats);
router.put('/:id',Update_patient_data);
router.post('/create_appo',requestAppointment)
router.delete('/:id',Delete_patient_data);

export default router;