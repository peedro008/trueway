import React, { useEffect, useState } from "react";
import "./CSS/css.css"
import {MdAdd} from "react-icons/md"
import axios from "axios";
import Select from 'react-select'

const ManagerM=()=>{
    const [locations, setLocations] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:4000/getLocations`)
            .then(function(response){
                setLocations(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    
    return( <div className="genericDiv">
       
    <div className="genericHeader">
        <p className="genericTitle">Add Manager</p>
    </div>



<div className="managerInputsContainer">
    <div className="managerInputsubContainer">
        <div className="inputDiv"> 
            <p className="PAYtitle">User</p>
            <input placeholder="User" className="PAYsub-title"></input>
        </div>
        <div className="inputDiv"> 
            <p className="PAYtitle">Email</p>
            <input placeholder="Email" className="PAYsub-title"></input>
        </div>
        <div className="inputDiv"> 
            <p className="PAYtitle">Phone</p>
            <input placeholder="Phone" className="PAYsub-title"></input>
        </div>
        <div className="inputDiv"> 
            <p className="PAYtitle">Address</p>
            <input placeholder="Address" className="PAYsub-title"></input>
        </div>
        

    </div>
    <div className="managerInputsubContainer" style={{width:"33.7vw"}}>
        <div className="inputDiv"> 
            <p className="PAYtitle">Password</p>
            <input placeholder="Password" className="PAYsub-title"></input>
        </div>  
        <div className="inputDiv" > 
            <p className="PAYtitle">Location</p>
            <Select options={locations.map(e=>({value:e.id,label:e.name}))} className="PAYselect"  placeholder="Select Location"/>
        </div>  
        </div>


     </div>


     <div style={{position:"absolute", right:"50px", top:"100px", display:"flex"}}>
         <button className="PAYbutton" ><p className="PAYbuttonText">Add Manager</p></button>
    </div>


</div>
    )
}
export default ManagerM