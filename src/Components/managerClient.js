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
import { BsChevronLeft } from "react-icons/bs";
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    tel: yup.number().positive().integer().required(),
    new: yup.bool().required(),
    notes: yup.string().optional().default(""),
    dateOfBirth: yup.string().optional().default(""),
    address: yup.string().optional().default(""),
    CompanyId: yup.number().required(),

}).required();
  





const ManagerClient=()=>{
 
    const [company, setCompany] = useState([])
    const [open, setOpen] = useState(false);
    const [neww, setNeww] = useState(false);
    const [address, setAddress] = useState("")
    const { register, handleSubmit,control,setValue, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const onSubmit = (data) => {
        data&&
        
        console.log(JSON.stringify(data))
        fetch(`https://truewayagentbackend.com/addClient`, {
            
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
        setValue("address", `${address}`);
    },[address])
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getCompany`)
            .then(function(response){
                setCompany(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    const options = company.map(e=>({value:e.id,label:e.name}))
    return( <div className="genericDiv">
        
        <div className="genericHeader">
           <p className="genericTitle">Add Client</p>
        </div>
        
        <div className="managerInputsContainer">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="managerInputsubContainer">
                <div className="inputDiv"> 
                    <p className="PAYtitle">Client Name</p>
                    <input {...register("name")}  placeholder="Client Name" className="AQinput"></input>
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
                    <p className="FORMerror">{errors.new?.message}</p>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Phone</p>
                    <input  {...register("tel")}  placeholder="Phone" className="AQinput"></input>
                    <p className="FORMerror">{errors.phone?.message.substring(0,25)}</p>
                </div>
             
            <div className="AQinputContainer" >
                    <p className="AQinputName">New client</p>
                    <div className="AQyesNoContainer">
                        <div>
                        <input  className="AQcheckInput" type="checkbox" checked={neww} name="dealer" {...register('new')} onChange = {(event) => setNeww(!neww)}/>
                            {neww?<p className="AQyesNoText">Yes</p>:<p className="AQyesNoText">No</p>} 
                        </div>
                       
                    </div>
                </div>
            </div>
           
            <div className="managerInputsubContainer" >
          
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
                <div className="inputDiv"> 
                    <p className="PAYtitle">Date of Birth</p>
                    <input type={"date"} {...register("dateOfBirth")}  placeholder="Date of Birth" className="AQinput"></input>
                    <p className="FORMerror">{errors.dateOfBirth?.message}</p>
                </div>
                <div className="inputDiv" style={{marginRight:"52%"}}> 
            <p className="PAYtitle">Address</p>
            <div class="autocomplete-container" id="autocomplete-container">
  <GeoapifyContext apiKey="fae2fbe3125e4b1d870dd3ab7c96f6b3">
 <GeoapifyGeocoderAutocomplete
        placeSelect={(value)=>{setAddress(value.properties.formatted)}}
        suggestionsChange={(value)=>{console.log(value)}}
        
        
      />
     

    </GeoapifyContext></div>
        </div>
            </div>


            <div className="managerInputsubContainer">
            <div className="MOBinputDiv">
                         <p className="MOBinputText">Notes</p>
                         <textarea  {...register("notes")} className='MOBtexta' style={{width:"400px"}}/>
                    </div>
                </div>
                </form>
        </div>
    

  
        {/* <input type="submit"  className="PAYbutton"/> */}
        <div style={{position:"absolute", right:"50px", top:"76px", display:"flex"}}>
            <button onClick={handleSubmit(onSubmit)} className="PAYbutton" ><p className="PAYbuttonText">Add Client</p></button>
        </div>
        <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">Client added successfully</p>
       
       
        <button  className="modalButton"> <NavLink style={{textDecoration: "none", color:"#000"}}  to={"/Manager"}>Continue</NavLink></button>
      
        
        </div>
      </Modal>
      <img src={Isologo_background} style={{position:"absolute",zIndex:0, right:0, bottom:-8, width:"498px", opacity:"0.5"}}/>
      <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
        </div>

    )
}
export default ManagerClient