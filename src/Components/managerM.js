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
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
const ManagerM=()=>{
    const [locations, setLocations] = useState([])
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    useEffect(()=>{
        axios.get(`http://trueway-env.eba-j5wkwmpy.us-east-1.elasticbeanstalk.com/getLocations`)
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
            <input placeholder="User" className="AQinput"></input>
        </div>
        <div className="inputDiv"> 
            <p className="PAYtitle">Email</p>
            <input placeholder="Email" className="AQinput"></input>
        </div>
        <div className="inputDiv"> 
            <p className="PAYtitle">Phone</p>
            <input placeholder="Phone" className="AQinput"></input>
        </div>
        <div className="inputDiv"> 
            <p className="PAYtitle">Address</p>
            <input placeholder="Address" className="AQinput"></input>
        </div>
        

    </div>
    <div className="managerInputsubContainer" style={{width:"33.7vw"}}>
        <div className="inputDiv"> 
            <p className="PAYtitle">Password</p>
            <input placeholder="Password" className="AQinput"></input>
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
      <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"absolute",zIndex:9, left:"5.5%",top:"2.6%", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
</div>
    )
}
export default ManagerM