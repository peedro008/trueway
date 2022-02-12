import React, { useEffect, useState } from "react";
import "./CSS/css.css"
import {MdAdd} from "react-icons/md"
import axios from "axios";
import Select from 'react-select'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Icon from "../assets/Icon.png"
import Isologo_background from  "../assets/Isologo_background.png"
import { NavLink } from "react-router-dom";
const ManagerC=()=>{
    const [inputs, setinputs]= useState({})
    const [categories, setCategories]= useState([])
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    useEffect(()=>{
        axios.get(`http://localhost:4000/getCategories`)
            .then(function(response){
                setCategories(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    const onSubmitHandler = () => {
        inputs&&
        fetch(`http://localhost:4000/addCompany`, {
            
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
    return( <div className="genericDiv">
        
        <div className="genericHeader">
           <p className="genericTitle">Add Company</p>
        </div>
        
        <div className="managerInputsContainer">
            <div className="managerInputsubContainer">
                <div className="inputDiv"> 
                    <p className="PAYtitle">Company Name</p>
                    <input onChange={(e)=>{setinputs({...inputs, name:e.target.value})}} placeholder="Company Name" className="PAYsub-title"></input>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Email</p>
                    <input onChange={(e)=>{setinputs({...inputs, email:e.target.value})}} placeholder="Email" className="PAYsub-title"></input>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Phone</p>
                    <input onChange={(e)=>{setinputs({...inputs, phone:e.target.value})}} placeholder="Phone" className="PAYsub-title"></input>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Address</p>
                    <input onChange={(e)=>{setinputs({...inputs, address:e.target.value})}} placeholder="Address" className="PAYsub-title"></input>
                </div>
                

            </div>
            <div className="managerInputsubContainer">
            <div className="inputDiv" > 
                    <p className="PAYtitle">Category</p>
                    <Select onChange={(e)=>{setinputs({...inputs, CategoryId:e.value})}}  options={categories.map(e=>({value:e.id,label:e.name}))} className="PAYselect"  placeholder="Select Company"/>
                </div>  
                </div>
        </div>
    



        <div style={{position:"absolute", right:"50px", top:"100px", display:"flex"}}>
            <button onClick={onSubmitHandler} className="PAYbutton" ><p className="PAYbuttonText">Add Manager</p></button>
        </div>
        <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">Company added successfully</p>
       
       
        <button  className="modalButton"> <NavLink style={{textDecoration: "none", color:"#000"}}  to={"/"}>Continue</NavLink></button>
      
        
        </div>
      </Modal>
      <img src={Isologo_background} style={{position:"absolute", right:0, bottom:0, width:"528px", opacity:"0.5"}}/>
        </div>

    )
}
export default ManagerC