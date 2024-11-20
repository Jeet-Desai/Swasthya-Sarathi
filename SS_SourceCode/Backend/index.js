import express from "express"
import cookieParser from "cookie-parser" 
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import authRoute from './Routes/auth.js'
import patRoute from './Routes/pat.js'
import docRoute from './Routes/doc.js'


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corseOption = {
    origin:true
}
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Enable credentials for cookies, etc.
  }));
  
app.get('/',(req,res)=>{
    res.send('Hello');
})

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


app.listen(port,()=>{
    connectDB();
    console.log("Server is running on port... "+ port);
})
