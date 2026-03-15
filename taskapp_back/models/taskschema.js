const mongoose=require('mongoose');
const User=require('../models/user');
const todoschema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:50,
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        enum:["Active","Completed"],
        default:"Active",
        required:true,
    },
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
},{timestamps:true})
module.exports=mongoose.model("Todo",todoschema);