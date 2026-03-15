const express=require('express');
const router=express.Router();

const{createtask,gettasks,gettaskbyid,updatetask,deletetask}=require('../controllers/task');
const{login,signup,logout}=require('../controllers/login');
const{verify,checkauth}=require('../controllers/middleware');
router.post('/login',login);
router.post('/signup',signup);
router.post('/logout',logout);
router.post('/check-login',verify,checkauth);
router.post('/createTask',verify,createtask);
router.get('/getallTasks',verify,gettasks);
router.get('/getTaskbyid/:id',verify,gettaskbyid);
router.put('/updateTask/:id',verify,updatetask);
router.delete('/deleteTask/:id',verify,deletetask);

module.exports=router;