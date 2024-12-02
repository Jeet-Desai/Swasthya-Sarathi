import express from "express"
import cookieParser from "cookie-parser" 
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import authRoute from './Routes/auth.js'
import patRoute from './Routes/pat.js'
import docRoute from './Routes/doc.js'
import hosRoute from './Routes/hos.js'
import path from 'path';
import bodyParser from 'body-parser';
dotenv.config();
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const __dirname = path.resolve();   

const corseOption = {
    origin:true
}
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Enable credentials for cookies, etc.
  }));
  
// app.get('/',(req,res)=>{
//     res.send('Hello');
// })

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//DATABASE connection
mongoose.set('strictQuery',false);
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            // useNewUrlParser:true,
            // useUnifiedTopology:true,
        })

        console.log('DB Connection succesful!!!');
    } 
    catch (err) {
        console.log('DB Connection Failed!!!');
    }
}

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corseOption));
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/patients',patRoute);
app.use('/api/v1/doctors',docRoute);
app.use('/api/v1/hospitals',hosRoute);

app.use(express.static(path.join(__dirname,"/Frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"Frontend","dist","index.html"));
})


app.listen(port,()=>{
    connectDB();
    console.log("Server is running on port... "+ port);
})

