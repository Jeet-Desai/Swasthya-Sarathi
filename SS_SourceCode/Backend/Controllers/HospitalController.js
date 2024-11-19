import Doctor from '../Models/HospitalModel.js';

export const Update_doctor_data = async (req,res)=>{
    const id = req.params.id;
    try{
        const updated_doc = await Doctor.findOneAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json({success:true,message:"details updated ",data:updated_doc});

    }catch(err) {
        res.status(500).json({success:false,message:"error occured while updating details"});

    }
}

export const Delete_doc_data = async (req,res)=>{
    const id = req.params.id;
    try{
        const deleted_doc = await Doctor.findOneAndDelete(id);
        res.status(200).json({success:true,message:"deleted patient success",data:deleted_doc});

    }catch(err) {
        res.status(500).json({success:false,message:"error occured while deleting pat"});

    }
}

export const find_one_doc = async (req,res)=>{
    const id = req.params.id;
    try{
        const doc = await Doctor.findById(id).select('-password');
        res.status(200).json({success:true,message:"search success",data:doc});

    }catch(err) {
        res.status(500).json({success:false,message:"error occured while searcing  "});

    }
}

export const get_all_docs = async (req,res)=>{

    try{

        let docs;
        const {query} = req.query;
        if(query){
            docs = await Doctor.find({isApproved:"approved",$or:[{FullName:{$regex: query, $options: "i"}},
                {specialization:{$regex: query, $options: "i"}}
            ]
            }).select("-password")
        }
        else
        {
            docs = await Doctor.find().select('-password');

        }
        res.status(200).json({success:true,message:"details updated ",data:docs});

    }
    catch(err) {
        res.status(500).json({success:false,message:"error occured while updating details"});

    }
}
