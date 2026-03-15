import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Edittask = (props) => {
  const {id}=useParams();
  const {alltasks,setalltasks}=props;
  console.log(id);
    const selectedtask=alltasks.find((task)=>task._id===id);
    console.log(selectedtask)
    const apiurl=process.env.REACT_APP_API_KEY;
    const navigate=useNavigate();
    const [title,settittle]=useState(selectedtask.title);
    const[content,setcontent]=useState(selectedtask.description);
    function changetitle(e){
        settittle(e.target.value); 
    }
    function changecontent(e){
        setcontent(e.target.value);
    }
    const submitnote=async(e)=>{
        e.preventDefault();
        try{
            
            const response=await fetch(`${apiurl}/updateTask/${id}`,{
                method:"PUT",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({title:title,description:content,id:id}),
                credentials:'include'
            })
            navigate('/');
        }catch(error){console.log(error)};
        
    }
  return (
    <form id='fullpage' onSubmit={submitnote}>
        <div id='addnote'>
            <div id="addnote-header">Edit Note</div>
            <label className='label'>Title <br/>
           <input type='text' placeholder='Enter the Title' id='title' value={title} onChange={changetitle}></input>
           </label>
           <label className='label'>Description <br/>
           <textarea cols="50" placeholder='Enter The Description' id='content' value={content}onChange={changecontent}></textarea>
           </label>
           <button className='addtask save' type='submit'>Save</button>
        </div>
    </form>
  )
}

export default Edittask
