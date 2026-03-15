import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Addtask.css'
const Addtask = () => {
  const apiurl=process.env.REACT_APP_API_KEY;
    const navigate=useNavigate();
    const[loading,setloading]=useState(false);
    const [title,settittle]=useState([]);
    const[content,setcontent]=useState([]);
    function changetitle(e){
        settittle(e.target.value);
    }
    function changecontent(e){
        setcontent(e.target.value);
    }
    const submitnote=async(e)=>{
        e.preventDefault();
        setloading(true);
        try{
            const response=await fetch(`${apiurl}/createTask`,{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({title:title,description:content}),
                credentials:'include'
            })
            if(response.ok){navigate('/');}
        }catch(error){console.log(error)};
        setloading(false);
        
    }
  return (
    <form id='fullpage' onSubmit={submitnote}>
        <div id='addnote'>
            <div id="addnote-header">Add Note</div>
            <label className='label'>Title <br/>
           <input type='text' placeholder='Enter The Title' id='title' value={title} onChange={changetitle}></input>
           </label>
           <label className='label'>Content <br/>
           <textarea cols="50" placeholder='Enter The description' id='content' value={content}onChange={changecontent}></textarea>
           </label>
           <button className='addtask save' type='submit' disabled={loading}>{loading?"saving... ":"save"}</button>
        </div>
    </form>
  )
}

export default Addtask
