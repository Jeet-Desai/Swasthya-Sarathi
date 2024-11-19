import jwt, { decode } from 'jsonwebtoken'
import Doctor from '../Models/DoctorModel.js'
import Patient from '../Models/PatientModel.js'


export const authenticate = async (req,res,next) =>{
    const authToken = req.headers.authorization;

    if(!authToken || !authToken.startsWith('Bearer'))
    {
        return res.status(401).json({success:false,message:"auth denied"});
    }


    try{
        console.log(authToken);
        const token = authToken.split(" ")[1];
        const decoded_token = jwt.verify(token,process.env.JWT_SEC);

        req.userId = decoded_token.id;
        req.role = decoded_token.role;

        next();

    }catch(err){
        if(err.name === 'TokenExpiredError')
            return res.status(401).json({success:false,message:"token expired"});
        else
        return res.status(401).json({success:false,message:"incorrect Token"});
    }
}

export const restrict = roles => async(req,res,next) =>{
    const userId = req.userId;
    let user;

    const patient = await Patient.findById(userId);
    const doctor = await Doctor.findById(userId);

    if(patient)
        user = patient
    else if(doctor)
        user = doctor

    if(!roles.include(user.role))
    {
        return res.status(401).json("Not authorized for that stuff")
    }
    next();
}