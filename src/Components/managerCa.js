import React, { useState } from "react";
import "./CSS/css.css"
import {MdAdd} from "react-icons/md"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Icon from "../assets/Icon.png"
import { NavLink } from "react-router-dom";
import Isologo_background from  "../assets/Isologo_background.png"
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";


const schema = yup.object({
    name: yup.string().required(),
    

}).required();
  

const ManagerCa=()=>{
    const [inputs, setinputs]= useState({})
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });


    const onSubmit = (data) => {
        data&&
        fetch(`http://localhost:4000/addCategories`, {
            
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
    onOpenModal()
    })
        .catch(err => {
            console.log(err);
        });
    }
    return( <div className="genericDiv">
        
        <div className="genericHeader">
           <p className="genericTitle">Add Category</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="managerInputsContainer">
            <div className="managerInputsubContainer">
                <div className="inputDiv"> 
                    <p   className="PAYtitle">Category Name</p>
                    <input {...register("name")} placeholder="Category Name" onChange={(e)=>{setinputs({...inputs, name:e.target.value})}} className="PAYsub-title"></input>
                    <p className="FORMerror">{errors.name?.message}</p>
                </div>
            </div>
        </div>
    
        </form>


        <div style={{position:"absolute", right:"50px", top:"100px", display:"flex"}}>
            <button onClick={handleSubmit(onSubmit)} className="PAYbutton" ><p className="PAYbuttonText">Add Category</p></button>
        </div>
        <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">Category added successfully</p>
       
       
        <button  className="modalButton"> <NavLink style={{textDecoration: "none", color:"#000"}}  to={"/"}>Continue</NavLink></button>
      
        
        </div>
      </Modal>

      <img src={Isologo_background} style={{position:"absolute", right:0, bottom:0, width:"528px", opacity:"0.5"}}/>
      <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"absolute",zIndex:9, left:"5%",top:"2%", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
        </div>

    )
}
export default ManagerCa