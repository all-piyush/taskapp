import { useState,useEffect } from "react";
import './App.css'
import { Link, Route, Router, Routes, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import Addtask from "./Components/Addtask";
import Edittask from "./Components/Edittask";
import Login from "./Components/Login";


function App() {
  const api=process.env.REACT_APP_API_KEY;
  const[currentpage,setcurrentpage]=useState(1);
  const[userloggedin,setuserloggedin]=useState(false);
  const[alltasks,setalltasks]=useState([]);
  const checklogin=async()=>{
    try{
      const response=await fetch(`${api}/check-login`,{
        method:"POST",
        headers:{"Content-type":"application/json"},
        credentials:'include',
      })
      if(response.status===200){
        setuserloggedin(true);
      }
    }catch(error){
      console.log(error);
    }
  }
  const logout=async()=>{
    try{
      const response=await fetch(`${api}/logout`,{
        method:"POST",
        headers:{"Content-type":"application/json"},
        credentials:'include',
      })
      const result=await response.json();
      if(result.success){
        setuserloggedin(false);
        setalltasks([]);
        console.log("logged out successfully");
        navigate('/');
      }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    checklogin();
  },[userloggedin]);
  const navigate=useNavigate();
  return (
      <div id='dashboard'>
      <div id="heading">
        <div id='header'>Task App</div>
        <div>
          {userloggedin?(<button onClick={logout}>Logout</button>):(<button onClick={()=>navigate('login')}>Login</button>)}
        </div>
      </div>

      <Routes>
        <Route path='/' element={<Home alltasks={alltasks} setalltasks={setalltasks} userloggedin={setuserloggedin} currentpage={currentpage} setcurrentpage={setcurrentpage}></Home>}></Route>
        <Route path="/login" element={<Login userloggedin={userloggedin} setuserloggedin={setuserloggedin}></Login>}></Route>
        <Route path="/addtask" element={<Addtask></Addtask>}> </Route>
        <Route path='/edittask/:id' element={<Edittask alltasks={alltasks} setalltasks={setalltasks}></Edittask>}></Route>
      </Routes>
    </div>

  );

}


export default App; 