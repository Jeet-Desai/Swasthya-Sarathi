import express from "express"
import cookieParser from "cookie-parser" 
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectDB } from './config/database.js'
import authRoute from '../../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Routes/auth.js'
import patRoute from '../../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Routes/pat.js'
import docRoute from '../../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Routes/doc.js'
import hosRoute from '../../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Routes/hos.js'
import appointmentRoutes from '../../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Routes/appointmentRoutes.js';
import { 
    requestAppointment, 
    updateAppointment, 
    updateAppointmentStatus,
    getPastAppointments,
    getPendingAppointments,
    getAppointmentStats,
    getHospitalAppointments 
} from '../../../SS/Swasthya-Sarathi/SS_SourceCode/Backend/Controllers/appointmentController.js';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'uploads/test');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Test route
app.get('/',(req,res)=>{
    res.send('Hello');
});

// Specific routes first (before the general routes)
app.put('/api/v1/appointments/:appointmentId', upload.array('reports'), updateAppointment);
app.put('/api/v1/appointments/status/:appointmentId', updateAppointmentStatus);

// General routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/patients', patRoute);
app.use('/api/v1/doctors', docRoute);
app.use('/api/v1/hospitals', hosRoute);
app.use('/api/v1/appointments', appointmentRoutes);

// Only start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    const startServer = async () => {
        try {
            await connectDB(process.env.MONGO_URL);
            app.listen(port, () => {
                console.log("Server is running on port... " + port);
            });
        } catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    };
    
    startServer();
}

export default app;