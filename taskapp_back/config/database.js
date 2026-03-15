const mongoose=require('mongoose');
require("dotenv").config();
const dbconnect=()=>{
        mongoose.connect(process.env.DATABASE_URL).
        then(()=>{console.log("Database connected")}).
        catch((error)=>{
            console.log(error);
        });
}
module.exports=dbconnect; 