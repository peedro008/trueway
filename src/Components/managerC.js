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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.number().positive().integer().required(),
    address: yup.string().required(),
    CategoryId: yup.number().required(),

}).required();
  





const ManagerC=()=>{
 
    const [categories, setCategories]= useState([])
    const [open, setOpen] = useState(false);

    const { register, handleSubmit,control, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });

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
    const onSubmit = (data) => {
        data&&
        console.log(JSON.stringify(data))
        fetch(`http://localhost:4000/addCompany`, {
            
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
    const options = categories.map(e=>({value:e.id,label:e.name}))
    return( <div className="genericDiv">
        
        <div className="genericHeader">
           <p className="genericTitle">Add Company</p>
        </div>
        
        <div className="managerInputsContainer">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="managerInputsubContainer">
                <div className="inputDiv"> 
                    <p className="PAYtitle">Company Name</p>
                    <input {...register("name")}  placeholder="Company Name" className="PAYsub-title"></input>
                    <p className="FORMerror">{errors.name?.message}</p>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Email</p>
                    <input {...register("email",{
                        required: 'Email is required',
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Please enter a valid email',
                        }})}  placeholder="Email" className="PAYsub-title"></input>
                    <p className="FORMerror">{errors.email?.message}</p>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Phone</p>
                    <input  {...register("phone")}  placeholder="Phone" className="PAYsub-title"></input>
                    <p className="FORMerror">{errors.phone?.message.substring(0,25)}</p>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Address</p>
                    <input {...register("address")}  placeholder="Address" className="PAYsub-title"></input>
                    <p className="FORMerror">{errors.address?.message}</p>
                </div>
               

            </div>
            <div className="managerInputsubContainer">
            <div className="inputDiv" > 
                    <p className="PAYtitle">Category</p>
                    {/* <Select  control={control} options={categories.map(e=>({value:e.id,label:e.name}))} name={"CategoryId"} className="PAYselect"  placeholder="Select Company"/>
                    */}

                <Controller
                        control={control}
                        name="CategoryId"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Select value={options.find(c => c.value === value)} onChange={val => onChange(val.value)} control={control} options={categories.map(e=>({value:e.id,label:e.name}))} name={"CategoryId"} className="PAYselect"  placeholder="Select Company"/>
                        )}
                    />

                    <p className="FORMerror">{errors.CategoryId?.message}</p>
                </div>  
                </div>
                </form>
        </div>
    

  
        {/* <input type="submit"  className="PAYbutton"/> */}
        <div style={{position:"absolute", right:"50px", top:"100px", display:"flex"}}>
            <button onClick={handleSubmit(onSubmit)} className="PAYbutton" ><p className="PAYbuttonText">Add Manager</p></button>
        </div>
        <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">Company added successfully</p>
       
       
        <button  className="modalButton"> <NavLink style={{textDecoration: "none", color:"#000"}}  to={"/"}>Continue</NavLink></button>
      
        
        </div>
      </Modal>
      <img src={Isologo_background} style={{position:"absolute", right:0, bottom:0, width:"528px", opacity:"0.5"}}/>
      <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"absolute",zIndex:9, left:"5%",top:"2%", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
        </div>

    )
}
export default ManagerC