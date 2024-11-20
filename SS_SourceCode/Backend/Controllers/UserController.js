import Patient from '../Models/PatientModel.js';
import Appointment from '../Models/AppointmentModel.js';
import Doctor from '../Models/DoctorModel.js';
import Hospital from '../Models/HospitalModel.js';
    
export const Update_patient_data = async (req,res)=>{
    const id = req.params.id;
    try{
        const updated_pat = await Patient.findOneAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json({success:true,message:"details updated ",data:updated_pat});

    }catch(err) {
        res.status(500).json({success:false,message:"error occured while updating details"});

    }
}

export const Delete_patient_data = async (req,res)=>{
    const id = req.params.id;
    try{
        const deleted_pat = await Patient.findOneAndDelete(id);
        res.status(200).json({success:true,message:"deleted pat succes  ",data:deleted_pat});

    }catch(err) {
        res.status(500).json({success:false,message:"error occured while deleting pat"});

    }
}


export const find_one_patient = async (req,res)=>{
    const id = req.params.id;
    try{
        const pat = await Patient.findById(id).select('-password');
        res.status(200).json({success:true,message:"search success",data:pat});

    }catch(err) {
        res.status(500).json({success:false,message:"error occured while searcing  "});

    }
}

export const get_all_pats = async (req,res)=>{

    try{
        const pats = await Patient.find().select('-password');
        res.status(200).json({success:true,message:"details updated ",data:pats});

    }catch(err) {
        res.status(500).json({success:false,message:"error occured while updating details"});

    }


}

export const getUserProfile = async(req,res)=>{
    const userId = req.userId
    try{
        const user = await UserActivation.findById(userId)
        if(!user){
            return res.status(404).json({success: false, message:'User not found'}
            )
        }
        const {password, ... rest} = user._doc

        res. status(200).json({success:true, message:'Profile info is getting', data:{... rest}})
    } catch (err){
        res.status(500).json({success:false,message:"error occured while fetching details"});
    }
};

export const getMyAppointments = async(req,res) => {
    try {
        
    } catch (err) {
        
    }
}
export const requestAppointment = async (req, res) => {
    const { doctorId, hospitalId, date, time, description, patientId } = req.body;
    
    try {
      // 1. Create a new appointment
      const newAppointment = new Appointment({
        patient: patientId, // the patient making the request
        doctor: doctorId,
        hospital: hospitalId,
        date,
        time,   
        description,
        status: 'pending', // Initial status is 'pending'
      });
  
      // Save the appointment
      const appointment = await newAppointment.save();
  
      // 2. Update the Doctor's appointment array
      await Doctor.findByIdAndUpdate(
        doctorId,
        { $push: { appointments: appointment._id } },
        { new: true }
      );
  
      // 3. Update the Hospital's appointment array
      await Hospital.findByIdAndUpdate(
        hospitalId,
        { $push: { appointments: appointment._id } },
        { new: true }
      );
  
      res.status(200).json({
        success: true,
        message: "Appointment requested successfully",
        appointment,
      });
    } catch (error) {
      console.error("Error in requesting appointment:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong while requesting the appointment.",
      });
    }
  };