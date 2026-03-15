const express=require("express");
const app=express();
const cors = require('cors');
const cookieparser=require('cookie-parser')
require("dotenv").config();
const PORT=process.env.PORT || 5000;
app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin:["http://localhost:3000","https://taskapp-1-iqtn.onrender.com"],
    credentials:true
}));
const todoroutes=require("./routes/taskroutes")
app.use("/api/v1",todoroutes);
app.listen(PORT,()=>{
    console.log(`server created successfully at ${PORT}`);
})
const dbconnect=require("./config/database");
dbconnect();
app.get('/',(req,res)=>{
    res.send("My first backend app")
})
