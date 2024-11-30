import express from 'express'
import { Register,Login,validateEmail} from '../Controllers/authController.js'

const router = express.Router();

router.post("/register",Register);
router.post("/login",Login);
router.post('/validate-email', validateEmail);

export default router;