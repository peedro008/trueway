import React, { useEffect, useState } from "react";
import "./CSS/css.css"
import {MdAdd} from "react-icons/md"
import axios from "axios";
import Select from 'react-select'
import 'react-responsive-modal/styles.css';
import Isologo_background from  "../assets/Isologo_background.png"
import { Modal } from 'react-responsive-modal';
import Icon from "../assets/Icon.png"
import { NavLink } from "react-router-dom";

const ManagerP=()=>{
    const [locations, setLocations] = useState([])
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
   
    const [inputs, setinputs]= useState({})
    const onSubmitHandler = () => {
        inputs&&
        setinputs({...inputs, UserRole:"Producer"})
        
        fetch(`http://localhost:4000/addProducer`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(inputs)
            
        })
        .then(async res => { 
            
            try {
            const jsonRes = await res.json();
            
            if (res.status !== 200) {
                console.log("error")
            } else {
               
               console.log(jsonRes)
              
              
                
            }
        } catch (err) {
            console.log(err);
        };
    onOpenModal()
    })
        .catch(err => {
            console.log(err);
        });
    }
    useEffect(()=>{
        axios.get(`http://localhost:4000/getLocations`)
            .then(function(response){
                setLocations(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    
       
    return( 
        <div className="genericDiv">
       
            <div className="genericHeader">
                <p className="genericTitle">Add Producer</p>
            </div>
        
        
        
        <div className="managerInputsContainer">
            <div className="managerInputsubContainer">
                <div className="inputDiv"> 
                    <p className="PAYtitle">Name</p>
                    <input placeholder="Name" onChange={(e)=>{setinputs({...inputs, name:e.target.value})}} className="PAYsub-title"></input>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Email</p>
                    <input placeholder="Email" onChange={(e)=>{setinputs({...inputs, email:e.target.value})}}  className="PAYsub-title"></input>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Phone</p>
                    <input placeholder="Phone" onChange={(e)=>{setinputs({...inputs, phone:e.target.value})}}  className="PAYsub-title"></input>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Address</p>
                    <input placeholder="Address" onChange={(e)=>{setinputs({...inputs, address:e.target.value})}}  className="PAYsub-title"></input>
                </div>
                

            </div>
            <div className="managerInputsubContainer" style={{width:"33.7vw"}}>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Password</p>
                    <input type="password" placeholder="Password" onChange={(e)=>{setinputs({...inputs, Password:e.target.value})}}  className="PAYsub-title"></input>
                </div>  
                <div className="inputDiv" > 
                    <p className="PAYtitle">Location</p>
                    <Select options={locations.map(e=>({value:e.id,label:e.name}))} onChange={(e)=>{setinputs({...inputs, LocationId:e.value})}}  className="PAYselect"  placeholder="Select Location"/>
                </div>  
                </div>
       
    
             </div>


             <div style={{position:"absolute", right:"50px", top:"100px", display:"flex"}}>
                 <button className="PAYbutton" onClick={onSubmitHandler} ><p className="PAYbuttonText">Add Producer</p></button>
            </div>

            <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">Producer added successfully</p>
       
       
        <button  className="modalButton"> <NavLink style={{textDecoration: "none", color:"#000"}}  to={"/"}>Continue</NavLink></button>
      
        
        </div>
      </Modal>
      <img src={Isologo_background} style={{position:"absolute", right:0, bottom:0, width:"528px", opacity:"0.5"}}/>
       </div>
    )
}
export default ManagerP