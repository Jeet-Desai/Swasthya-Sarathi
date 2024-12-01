import express from 'express'
import { Register,Login,validateEmail,sendEmailOTP,verifyEmailOTP} from '../Controllers/authController.js'

const router = express.Router();

router.post("/register",Register);
router.post("/login",Login);
router.post('/validate-email', validateEmail);
router.post('/send-otp', sendEmailOTP);
router.post('/verify-otp', verifyEmailOTP);

export default router; 