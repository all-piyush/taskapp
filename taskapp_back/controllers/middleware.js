const jwt=require('jsonwebtoken');

exports.verify=async(req,res,next)=>{
    try{
        
        const token=req.cookies.token || req.cookie.token;
        if(!token){
            return res.status(400).json({
                message:"User not logged in",
                success:false,
            })
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
exports.checkauth=async(req,res)=>{
    return res.status(200).json({
        message:"User Already Logged In",
        success:true, 
    })
}