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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";


const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.number().positive().integer().required(),
    LocationId: yup.number().required(),
    Password: yup.string().required().min(6),

}).required();
  
const ManagerP=()=>{
    const [locations, setLocations] = useState([])
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const { register, handleSubmit,control, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });
    const [inputs, setinputs]= useState({})
    const onSubmit = (data) => {
        data&&
        setinputs({...inputs, UserRole:"Producer"})
        
        fetch(`http://localhost:8080/addProducer`, {
            
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
    useEffect(()=>{
        axios.get(`http://localhost:8080/getLocations`)
            .then(function(response){
                setLocations(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    const options = locations.map(e=>({value:e.id,label:e.name}))
       
    return( 
        <div className="genericDiv">
       
            <div className="genericHeader">
                <p className="genericTitle">Add Producer</p>
            </div>
        
        
        
        <div className="managerInputsContainer">
            <div className="managerInputsubContainer" style={{ width: "50vw" }}>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Name</p>
                    <input {...register("name")} placeholder="Name" onChange={(e)=>{setinputs({...inputs, name:e.target.value})}} className="AQinput"></input>
                    <p className="FORMerror">{errors.name?.message}</p>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Email</p>
                    <input {...register("email",{
                        required: 'Email is required',
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Please enter a valid email',
                        }})} placeholder="Email"  className="AQinput"></input>
                    <p className="FORMerror">{errors.email?.message}</p>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Phone</p>
                    <input {...register("phone")} placeholder="Phone" onChange={(e)=>{setinputs({...inputs, phone:e.target.value})}}  className="AQinput"></input>
                    <p className="FORMerror">{errors.phone?.message.substring(0,25)}</p>
                </div>
              
                

            </div>
            <div className="managerInputsubContainer" style={{width:"31.2vw"}}>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Password</p>
                    <input type="password" {...register("Password")} placeholder="Password"   className="AQinput"></input>
                    <p className="FORMerror">{errors.Password?.message}</p>
                </div>  
                <div className="inputDiv" > 
                    <p className="PAYtitle">Location</p>
                    <Controller
                        control={control}
                        name="LocationId"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Select value={options.find(c => c.value === value)} onChange={val => onChange(val.value)} control={control} options={locations.map(e=>({value:e.id,label:e.name}))} name={"LocationId"} className="PAYselect"  placeholder="Select Location"/>
                        )}
                    />
                    <p className="FORMerror">{errors.LocationId?.message}</p>
                </div>  
                </div>
       
    
             </div>


             <div style={{position:"absolute", right:"50px", top:"76px", display:"flex"}}>
                 <button className="PAYbutton"  onClick={handleSubmit(onSubmit)}  ><p className="PAYbuttonText">Add Producer</p></button>
            </div>

            <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">Producer added successfully</p>
       
       
        <button  className="modalButton"> <NavLink style={{textDecoration: "none", color:"#000"}}  to={"/users/producers"}>Continue</NavLink></button>
      
        
        </div>
      </Modal>
      <img src={Isologo_background} style={{position:"absolute", right:0, bottom:0, width:"428px", opacity:"0.5"}}/>
      <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"fixed",zIndex:9, left:"5.5%",top:"2.5%", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
       </div>
    )
}
export default ManagerP