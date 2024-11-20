import express from  'express';
import { } from '../Controllers/UserController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';
const router = express.Router();


export default router;