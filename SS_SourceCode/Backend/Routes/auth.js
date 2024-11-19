import express from 'express'
import { Register,Login,RegisterDoctor,UpdateDoctor,DeleteDoctor } from '../Controllers/authController.js'

const router = express.Router();

router.post("/register",Register);
router.post("/login",Login);
router.post("/register-doctor",RegisterDoctor);
router.post("/update-doctor",UpdateDoctor);
router.delete("/delete-doctor/:id",DeleteDoctor);



export default router;