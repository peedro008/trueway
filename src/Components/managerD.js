import React, { useEffect, useState } from "react";
import "./CSS/css.css"
import Isologo_background from  "../assets/Isologo_background.png"
import {MdAdd} from "react-icons/md"
import axios from "axios";
import Select from 'react-select'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Icon from "../assets/Icon.png"
import { NavLink } from "react-router-dom";
const ManagerD=()=>{
    const [company, setCompany] = useState([])
    const [inputs, setinputs]= useState({})
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const onSubmitHandler = () => {
        inputs&&
        fetch(`http://localhost:4000/addDealer`, {
            
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
        axios.get(`http://localhost:4000/getCompany`)
            .then(function(response){
                setCompany(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    return( 
        <div  className="genericDiv">

            <div className="genericHeader">
            <p className="genericTitle">Add Dealer sale person</p>
            </div>
        
        
        <div className="managerInputsContainer" style={{width:"max-content"}}>
            <div className="managerInputsubContainer">
                <div className="inputDiv"> 
                    <p className="PAYtitle">Name</p>
                    <input onChange={(e)=>{setinputs({...inputs, name:e.target.value})}}  placeholder="Name" className="PAYsub-title"></input>
                </div>
               <div className="inputDiv" > 
                    <p className="PAYtitle">Company</p>
                    <Select onChange={(e)=>{setinputs({...inputs, CompanyId:e.value})}}  options={company.map(e=>({value:e.id,label:e.name}))} className="PAYselect"  placeholder="Select Company"/>
                </div>  
                

            </div>
         
        </div>
    



        <button onClick={onSubmitHandler} className="button4" >Add Dealer</button>
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
export default ManagerD