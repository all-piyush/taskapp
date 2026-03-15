const todo=require('../models/taskschema');
exports.createtask=async(req,res)=>{
    try{
        const{title,description}=req.body;
        const userid=req.user.id;

        const newtodo= await todo.create({title,description,userid:userid});
        res.status(200).json({
            success:true,
            message:"created a todo",
            data:newtodo
        })
    }
    catch(err){
        console.log("error"+err);
        res.status(500).json({
            success:false,
            message:"unable to connect"
        })
    }
}

exports.gettasks=async(req,res)=>{
    try{
        const userid=req.user.id;
        const response=await todo.find({userid:userid});
        if(response){
            res.status(200).json({
                message:"fetched all todos succesfully",
                data:response,
                success:true
            })
        }
        else{
            res.status(404).json({
                message:"unable to find todos",
                success:false
            })
        }
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}
exports.gettaskbyid=async(req,res)=>{
    try{
        const id=req.params.id;
        const response=await todo.findById({_id:id});
        if(response){
            res.status(200).json({
                message:"fetched todo succesfully",
                data:response,
                success:true
            })
        }
        else{
            res.status(404).json({
                message:"unable to find todo",
                success:false
            })
        }
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}
exports.updatetask=async(req,res)=>{
    try{
        const{id}=req.params;
        const{title,description}=req.body;
        const response=await todo.findByIdAndUpdate(id,{title,description,updatedat:Date.now()},{new:true});
        if(response){
            res.status(200).json({
                message:"Updated todo succesfully",
                data:response,
                success:true
            })
        }
        else{
            res.status(404).json({
                message:"unable to find todo",
                success:false
            })
        }
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}
exports.deletetask=async(req,res)=>{
    try{
        const{id}=req.params;
        const response=await todo.findByIdAndDelete({_id:id});
        if(response){
            res.status(200).json({
                message:"Deleted todo succesfully",
                data:response,
                success:true
            })
        }
        else{
            res.status(404).json({
                message:"unable to find todo",
                success:false
            })
        }
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}