import React, { useEffect, useState } from "react";
import "./CSS/css.css"
import {MdAdd} from "react-icons/md"
import axios from "axios";
import Isologo_background from  "../assets/Isologo_background.png"
import Select from 'react-select'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Icon from "../assets/Icon.png"
import { NavLink } from "react-router-dom";
const ManagerM=()=>{
    const [locations, setLocations] = useState([])
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

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
         <button className="PAYbutton" onClick={onOpenModal} ><p className="PAYbuttonText">Add Manager</p></button>
    </div>
<Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">¡Quote added successfully</p>
       
       
        <button  className="modalButton"> <NavLink style={{textDecoration: "none", color:"#000"}}  to={"/"}>Continue</NavLink></button>
      
        
        </div>
      </Modal>
      <img src={Isologo_background} style={{position:"absolute", right:0, bottom:0, width:"528px", opacity:"0.5"}}/>

</div>
    )
}
export default ManagerM