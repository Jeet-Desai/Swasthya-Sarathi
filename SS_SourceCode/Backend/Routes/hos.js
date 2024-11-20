import express from 'express';
import { RegisterDoctor,UpdateDoctor,DeleteDoctor } from '../Controllers/HospitalController.js'

const router = express.Router();

router.post("/register-doctor",RegisterDoctor);
router.post("/update-doctor",UpdateDoctor);
router.delete("/delete-doctor/:id",DeleteDoctor);

export default router;