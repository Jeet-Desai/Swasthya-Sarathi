import express from  'express';
import { getAllDoctors} from '../Controllers/UserController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';
const router = express.Router();

router.get('/doctors_fetch', getAllDoctors);

export default router;