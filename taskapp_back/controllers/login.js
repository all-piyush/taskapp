const userschema=require('../models/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
            success:false,
            message:"Password or Email not entered"
        })
        }
        const user=await userschema.findOne({email});
        if(!user){
            return res.status(401).json({
            success:false,
            message:"No user found"
        })
        }
        const result=await bcrypt.compare(password,user.password);
        if(!result){
            return res.status(401).json({
                message:"Password didn't matched",
                success:false,
            })
        }
        const options={expires:new Date(Date.now()+24*60*60*1000),httpOnly:true,
        sameSite:process.env.NODE_ENV==='production'?"None":"Lax",secure:process.env.NODE_ENV==='production'};
        const secret=process.env.JWT_SECRET;
        const payload={email:user.email,id:user._id};
        const token=jwt.sign(payload,secret,{expiresIn:'7d'});
        if(!token ){
            return res.status(400).json({
                message:"Token not present",
                success:false,
            })
        }
        res.cookie('token',token,options);
        return res.status(200).json({
            message:"user logged in successfully",
            success:true,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
exports.signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        console.log(name,email,password);
        if(!name || !email || !password){
            return res.status(400).json({
            success:false,
            message:"Password or Email or Name not entered"
        })
        }
        const user=await userschema.findOne({email});
        if(user){
            return res.status(400).json({
            success:false,
            message:"user already present"
        })
        }
        const hashedpassword=await bcrypt.hash(password,10);
        const newuser=await userschema.create({name,email,password:hashedpassword});
        const options={expires:new Date(Date.now()+24*60*60*1000),httpOnly:true,
        sameSite:process.env.NODE_ENV==='production'?"None":"Lax",secure:process.env.NODE_ENV==='production'};
        const secret=process.env.JWT_SECRET;
        const payload={name:newuser.name,email:newuser.email,id:newuser._id};
        const token=jwt.sign(payload,secret,{expiresIn:'7d'});
        
        res.cookie('token',token,options);
        return res.status(200).json({
            user:newuser,
            message:"User Created Successfully",
            success:true,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

exports.logout=async(req,res)=>{
    try{
        const options={expires:new Date(Date.now()+24*60*60*1000),httpOnly:true,
        sameSite:process.env.NODE_ENV==='production'?"None":"Lax",secure:process.env.NODE_ENV==='production'};
        res.clearCookie("token",options);
        return res.status(200).json({
            success:true,
            message:"User Logged Out Successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}