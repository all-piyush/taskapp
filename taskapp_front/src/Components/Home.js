import React, { useEffect, useMemo, useState } from 'react'
import './Home.css';
import{useNavigate} from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
const dayjs=require('dayjs')
const Home = (props) => {
  const apiurl=process.env.REACT_APP_API_KEY;
  const{alltasks,setalltasks,userloggedin,currentpage,setcurrentpage}=props;
  const[search,setsearch]=useState("");
  const[filter,setfilter]=useState('all');
  const getalltasks=async()=>{
    try{
      console.log("YES",apiurl);
      const response=await fetch(`${apiurl}/getallTasks`,{
        method:"GET",
        headers:{"Content-type":"application/json"},
        credentials:'include'
      })
      const result=await response.json();
      setalltasks(result.data); 
    }catch(error){
      console.log(error);
    }
  }
  const deletetask=async(id)=>{
    try{
      const response=await fetch(`${apiurl}/deleteTask/${id}`,{
        method:"DELETE",
        headers:{"Content-type":"application/json"},
          credentials:'include'
      })
      if(response.ok){
        setalltasks((prev)=>prev.filter((task)=>task._id!==id));
      }
    }catch(error){
      console.log(error);
    }
  }
  function searchhandle(e){
    if(!userloggedin){navigate('/login');}
    setsearch(e.target.value);
  }
  const searchedtasks = !search? alltasks: alltasks.filter((task) =>task.title.toLowerCase().includes(search.toLowerCase()) 
  ||task.description.toLowerCase().includes(search.toLowerCase()));
  const filteredcurrtask=filter==='all'?searchedtasks:searchedtasks.filter((task)=>task.status===filter);
  const totalPages = Math.ceil(filteredcurrtask.length / 5);
  const lasttask = currentpage * 5;
  const firstTask = lasttask - 5;
  const currentTasks = filteredcurrtask.slice(firstTask, lasttask);
  
  const navigate=useNavigate();
  useEffect(()=>{
    getalltasks();
  },[])
  useEffect(()=>{
  setcurrentpage(1);
},[search,filter]);
  return (
    <div id="home">
      <div id="dashboard-title">Dashboard</div><br/>
      <div id="three-options">
      <div id='searcharea' ><CiSearch id='search-icon'/><input type='text' placeholder='Search Task...' id='searchbar' value={search}onChange={searchhandle}/></div>
      
      <button className='addtask' onClick={()=>{if(!userloggedin){navigate('/login')} else{navigate('/addtask')}}}><FaPlus className='plus' /> Add Task</button>
      <select value={filter} onChange={(e)=>{setfilter(e.target.value)}} className='select-filter'>
        <option value="all">All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select>
      </div>
      {!alltasks || alltasks.length===0 ?(<div id='empty-text'>
        
        <div id='text'>
          <div id='image'></div>
          <b>No Tasks Yet </b>
          <div>Add Your First Task</div>
          <button className='addtask' onClick={() => navigate(userloggedin ? "/addtask" : "/login")}><FaPlus className='plus'/>  Add Task</button>
        </div>
      </div>): 
      (<div id="alltasks">
        <table className='task-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
        {currentTasks.map((task)=>{
        return <tr>
          <td><b>{task.title}</b></td>
          <td>{task.description}</td>
          <td>{dayjs(task.createddat).format('DD-MM-YYYY')}</td>
          <td className={task.status==="Completed"?"task-completed":"task-active"}>{task.status}</td>
          <td><CiEdit className="update"onClick={()=>{navigate(`/edittask/${task._id}`)}}></CiEdit><MdDelete className="delete" onClick={()=>deletetask(task._id)}></MdDelete></td>
        </tr>
      })}</table></div>) 
      }
      <div className="pagination">

  <button
    disabled={currentpage === 1}
    onClick={() => setcurrentpage((prev) => prev - 1)}
    className={`pagination-btn ${currentpage === 1 ? "disabled" : "active"}`}
  >
    Previous
  </button>

  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      className={`pagination-btn ${currentpage === i+1 ? "active" : "disabled"}`}
      onClick={() => setcurrentpage(i + 1)}
    >
      {i + 1}
    </button>
  ))}

  <button
    disabled={currentpage === totalPages}
    onClick={() => setcurrentpage((prev) => prev + 1)}
    className={`pagination-btn ${currentpage === totalPages ? "disabled" : "active"}`}
  >
    Next
  </button>

</div>
    </div>
  )
}

export default Home
