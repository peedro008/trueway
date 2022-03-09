import React, { useState } from "react";
import "./CSS/css.css"
import {MdAdd} from "react-icons/md"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Icon from "../assets/Icon.png"
import Isologo_background from  "../assets/Isologo_background.png"
import { NavLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.number().positive().integer().required(),
    address: yup.string().required(),
    

}).required();
  



const ManagerL=()=>{

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });
    const onSubmit = (data) => {
        data&&
      
        
        fetch(`http://trueway-env.eba-j5wkwmpy.us-east-1.elasticbeanstalk.com/addLocation`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(data)
            
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
      
        })
        .catch(err => {
            console.log(err);
        });
        onOpenModal()
    }
    
    return( 
        <div  className="genericDiv">

            <div className="genericHeader">
            <p className="genericTitle">Add Location</p>
            </div>
        
        
        <div className="managerInputsContainer">
            <div className="managerInputsubContainer">
                <div className="inputDiv"> 
                    <p className="PAYtitle">Name</p>
                    <input {...register("name")} placeholder="Name"  className="AQinput"></input>
                    <p className="FORMerror">{errors.name?.message}</p>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Email</p>
                    <input {...register("email",{
                        required: 'Email is required',
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Please enter a valid email',
                        }})}  placeholder="Email" className="AQinput"></input>
                    <p className="FORMerror">{errors.email?.message}</p>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Phone</p>
                    <input placeholder="Phone"{...register("phone")}  className="AQinput"></input>
                    <p className="FORMerror">{errors.phone?.message.substring(0,25)}</p>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Address</p>
                    <input placeholder="Address"  {...register("address")} className="AQinput"></input>
                    <p className="FORMerror">{errors.address?.message}</p>
                </div>
                

            </div>
         
        </div>
    


        <div style={{position:"absolute", right:"50px", top:"100px", display:"flex"}}>
            <button onClick={handleSubmit(onSubmit)} className="PAYbutton" ><p className="PAYbuttonText">Add Location</p></button>
        </div>
        <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">Location added successfully</p>
       
       
        <button  className="modalButton"> <NavLink style={{textDecoration: "none", color:"#000"}}  to={"/"}>Continue</NavLink></button>
      
        
        </div>
      </Modal>
      <img src={Isologo_background} style={{position:"absolute", right:0, bottom:0, width:"528px", opacity:"0.5"}}/>
      <BsChevronLeft color="grey" style={{minWidth:"25px", minHeight:"25px", position:"absolute",zIndex:9, left:"80px",top:"18px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
        </div>
    
    )
}
export default ManagerL