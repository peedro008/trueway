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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const schema = yup.object({
    name: yup.string().required(),

    CompanyId: yup.number().required(),

}).required();




const ManagerD=()=>{
    const [company, setCompany] = useState([])

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const { register, handleSubmit,control, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });


    const onSubmit = (data) => {
        data&&
        fetch(`http://trueway-env.eba-j5wkwmpy.us-east-1.elasticbeanstalk.com/addDealer`, {
            
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
        axios.get(`http://trueway-env.eba-j5wkwmpy.us-east-1.elasticbeanstalk.com/getCompany`)
            .then(function(response){
                setCompany(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    const options = company.map(e=>({value:e.id,label:e.name}))
    return( 
        <div  className="genericDiv">

            <div className="genericHeader">
            <p className="genericTitle">Add Dealer sale person</p>
            </div>
        
            <form onSubmit={handleSubmit(onSubmit)}>
        <div className="managerInputsContainer" style={{width:"max-content"}}>
            <div className="managerInputsubContainer">
                <div className="inputDiv"> 
                    <p className="PAYtitle">Name</p>
                    <input {...register("name")}  placeholder="Name" className="AQinput"></input>
                    <p className="FORMerror">{errors.name?.message}</p>
                </div>
               <div className="inputDiv" > 
                    <p className="PAYtitle">Company</p>
                    <Controller
                        control={control}
                        name="CompanyId"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Select value={options.find(c => c.value === value)} onChange={val => onChange(val.value)} control={control} options={company.map(e=>({value:e.id,label:e.name}))} name={"CompanyId"} className="PAYselect"  placeholder="Select Company"/>
                        )}
                    />
                 <p className="FORMerror">{errors.CompanyId?.message}</p>
                </div>  
                

            </div>
         
        </div>
    </form>



        <button onClick={handleSubmit(onSubmit)} className="button4" >Add Dealer</button>
        <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">¡Dealer added successfully</p>
       
       
        <button  className="modalButton"> <NavLink style={{textDecoration: "none", color:"#000"}}  to={"/"}>Continue</NavLink></button>
      
        
        </div>
      </Modal>
      <img src={Isologo_background} style={{position:"absolute", right:0, bottom:0, width:"528px", opacity:"0.5"}}/>
      <BsChevronLeft color="grey" style={{minWidth:"25px", minHeight:"25px", position:"absolute",zIndex:9, left:"5.5%",top:"2.6%", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
        </div>
    
    )
}
export default ManagerD