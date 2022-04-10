
import axios from "axios";

import React, { useEffect, useState } from 'react';
import {  BiMessageSquareAdd } from "react-icons/bi";
import { useSelector } from "react-redux";
import Select from 'react-select'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Icon from "../assets/Icon.png"
import { NavLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    LocationId:yup.number().required(),
    CategoryId:yup.number().required(),
    ClientId:yup.number().optional(),
    CompanyId:yup.number().required(),
    UserId:yup.number().required(),
    DealerId:yup.number().optional().default(0),
    down:yup.string().required(),
    monthlyPayment:yup.string().optional(),
    NSDvalue:yup.string().optional().default("0"),
    Bound:yup.bool().required(),
    PIPvalue:yup.string().optional().default("0"),
    TotalPremium:yup.string().optional().default("0"),
    MVRvalue:yup.string().optional().default("0"),
    name:yup.string().optional().min(1),
    email:yup.string().optional().email().min(1),
    tel:yup.string().optional().min(6),
    new: yup.bool().optional(),
    
    }).required();

const AddQuote = ()=>{
    const [neww, setNeww] = useState(false);
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const userId = useSelector(state=> state.UserId)
    const [newClient, setNewClient] = useState(false)
    const [clients, setClients] = useState([])
    const [inputs, setInputs] = useState({Bound:false});
    const [producers, setProducers]= useState([])
    const [companies, setCompanies]= useState([])
    const [categories, setCategories]= useState([])
    const [locations, setLocations] = useState([])
    const [ERR, setERR] = useState({ ClientId: false})
    const [dealers, setDealers] = useState([])
    const { register, handleSubmit,control, formState:{ errors }, setValue } = useForm({
        resolver: yupResolver(schema)
      });
     
   

    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getDealer`)
            .then(function(response){
                setDealers(response.data)
                setInputs({...inputs, ProducerId:1})
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/clients`)
            .then(function(response){
                setClients(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getLocations`)
            .then(function(response){
                setLocations(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getProducer`)
            .then(function(response){
                setProducers(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getCategories`)
            .then(function(response){
                setCategories(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getCompany`)
            .then(function(response){
                setCompanies(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])
    const customStyles = {
        control: base => ({
          ...base,
          height: 30,
          minHeight: 30,
     
        }),
        placeholder: defaultStyles => {
            return {
              ...defaultStyles,
              marginTop:"-5px",
              
            };
          },
          indicatorSeparator: base => ({
              ...base,
              height:"0px",
              
          }),
          dropdownIndicator: base => ({
            ...base,
            marginTop:"-4px",
            
            
        })

      };
      
    const reload =()=>{
        window.location.reload()
       
    }
    
    const reset =(event)=>{
        const value= event.target.value
        setInputs({
            ...inputs,
            [event.target.name]:!value
          })
    }

    const onSubmit = (data) => {
        
        !data.PIPvalue&&setValue("PIPvalue", "0")
        !data.NSDvalue&&setValue("NSDvalue", "0")
        !data.MVRvalue&&setValue("MVRvalue", "0")
        !data.Bound&&setValue("Bound", false)
        !data.totalPremium&&setValue("totalPremium", "0")
        !data.monthlyPayments&&setValue("monthlyPayment", "0")
        setValue("Bound", `${inputs.Bound}`)
        console.log(data)
        fetch(`https://truewayagentbackend.com/addQuote`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(data),
            
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
         
        
    };
    
const handleNewClient = () =>{
    !newClient?
    setNewClient(true)
    :
    reload()
    
}
const optionsCa = categories.map(e=>({value:e.id,label:e.name}))
const optionsCo = companies.map(e=>({value:e.id,label:e.name}))
const optionsL = locations.map(e=>({value:e.id,label:e.name}))
const optionsD = dealers.map(e=>({value:e.id,label:e.name}))
const optionsC = clients.map(e=>({value:e.id,label:e.name}))
setValue("UserId", `${userId}`)
return(


     <div className="genericDiv">
   
        
  
              <div className="genericHeader">
                <p className="genericTitle">Add quote</p>
            </div>
            
        <div className="AQcontainer" >
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="AQrowContainer2" style={{width:"68vw"}}>
           
                
            <div className="AQinputContainer" >
                <div style={{display:"flex", flexDirection:"row"}}>
                
                <p className="AQinputName">Client Name</p>
                <BiMessageSquareAdd onClick={()=>handleNewClient()} size="20" color="#28C76F" style={{ marginLeft:"60px"}}/>
                </div>
                {!newClient?
                 <>
                 <Controller
                     control={control}
                     name="ClientId"
                     render={({ field: { onChange, onBlur, value, ref } }) => (
                         <Select value={optionsC.find(c => c.value === value)} onChange={val => onChange(val.value)} control={control} options={clients.map(e=>({value:e.id,label:e.name}))} name={"ClientId"} className="PAYselect"  placeholder="Select Client"/>
                     )}
                     
                     />

                     {ERR.ClientId&&<p className="FORMerror">"Client is a required field"</p>}
                     <p className="FORMerror">{errors.UserId?.message}</p>
                     <p className="FORMerror">{errors.UserId?.message}</p>
                 </>
                :
                <>
                <input className="AQinput" placeholder="Client name" value={inputs.clientName}  {...register("name")}/>
                <p className="FORMerror">{errors.name?.message}</p>
                </>
                }
            
            </div>
            {newClient&&
             
          

             <div className="AQinputContainer">
             <p  className="AQinputName">Email</p>
             <input placeholder="Client email" className="AQinput" value={inputs.clientEmail}  {...register("email")}/>
             <p className="FORMerror">{errors.email?.message}</p>
             </div>
                }
             {newClient&&
             <div className="AQinputContainer">
                <p  className="AQinputName">Phone</p>
                <input placeholder="Client phone" className="AQinput" value={inputs.Tel}  {...register("tel")}/>
                <p className="FORMerror">{errors.tel?.message}</p>
                
            </div> 
             
             }

        {newClient&& <div className="AQinputContainer" >
                    <p className="AQinputName">New client</p>
                    <div className="AQyesNoContainer">
                        <div>
                        <input  className="AQcheckInput" type="checkbox" checked={neww} name="new" {...register('new')} onChange = {(event) => setNeww(!neww)}/>
                            {neww?<p className="AQyesNoText">Yes</p>:<p className="AQyesNoText">No</p>} 
                        </div>
                       
                    </div>
                </div>
        }       
          
             
           

      
                
            
            </div>

            <div className="AQrowContainer">
            <div className="AQinputContainer">
                    <p className="AQinputName">Category</p>
                    <Controller
                        control={control}
                        name="CategoryId"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Select value={optionsCa.find(c => c.value === value)} onChange={val => onChange(val.value)} control={control} options={categories.map(e=>({value:e.id,label:e.name}))} name={"CategoryId"} className="PAYselect"  placeholder="Select Category"/>
                        )}
                    />

                    <p className="FORMerror">{errors.CategoryId?.message}</p>
                    
                </div>
                <div className="AQinputContainer">
                    <p className="AQinputName">Company</p>
                    <Controller
                        control={control}
                        name="CompanyId"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Select value={optionsCo.find(c => c.value === value)} onChange={val => onChange(val.value)} control={control} options={companies.map(e=>({value:e.id,label:e.name}))} name={"CompanyId"} className="PAYselect"  placeholder="Select Company"/>
                        )}
                    />
                 <p className="FORMerror">{errors.CompanyId?.message}</p>
                </div>
                <div className="AQinputContainer">
                    <p className="AQinputName">Office</p>
                    
                    <Controller
                        control={control}
                        name="LocationId"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Select value={optionsL.find(c => c.value === value)} onChange={val => onChange(val.value)} control={control} options={locations.map(e=>({value:e.id,label:e.name}))} name={"LocationId"} className="PAYselect"  placeholder="Select Location"/>
                        )}
                    />
                    <p className="FORMerror">{errors.LocationId?.message}</p>
                </div>
                <div className="AQinputContainer" >
                    <p className="AQinputName">Dealer</p>
                    <div className="AQyesNoContainer">
                        <div>
                            <input  className="AQcheckInput" type="checkbox" checked={inputs.dealer} name="dealer"  onChange = {(event) => setInputs({...inputs,dealer:!inputs.dealer})}/>
                            {inputs.dealer?<p className="AQyesNoText">Yes</p>:<p className="AQyesNoText">No</p>} 
                        </div>
                        {inputs.dealer&&
                         <>
                         <Controller
                             control={control}
                             name="DealerId"
                             render={({ field: { onChange, onBlur, value, ref } }) => (
                                 <Select value={optionsD.find(c => c.value === value)} onChange={val => onChange(val.value)} control={control} options={dealers.map(e=>({value:e.id,label:e.name}))} name={"DealerId"} className="PAYselect"  placeholder="Select Dealer"/>
                             )}
                             />
                             {ERR.DealerId&&<p className="FORMerror">"Client is a required field"</p>}
                         </>
                        }
                    </div>
                </div>
               
            
            </div>
            <div className="AQrowContainer1">
                <div className="AQinputContainer">
                    <p className="AQinputName">Down payment</p>
                    <input className="AQinput" placeholder="Down payment" key="down" name="down"  value={inputs.down} {...register("down")}/>
                    <p className="FORMerror">{errors.down?.message.substring(0,24)}</p>
                </div>
                <div className="AQinputContainer" style={{display:"flex", flexDirection:"column", backgroundColor:"start"}}>
                    <p className="AQinputName">Monthly payment</p>
                    <input className="AQinput" placeholder="Monthly payment" key="monthlyPayment" name="monthlyPayment"   {...register("monthlyPayment")}/>
                    <p className="FORMerror">{errors.monthlyPayment?.message.substring(0,24)}</p>
                </div>
                <div className="AQinputContainer" style={{display:"flex", flexDirection:"column", backgroundColor:"start"}}>
                    <p className="AQinputName">Total premium</p>
                    <input className="AQinput" placeholder="Total premium" key="totalPremium" name="totalPremium"   {...register("TotalPremium")}/>
                    <p className="FORMerror">{errors.TotalPremium?.message.substring(0,24)}</p>
                </div>
                <div className="AQinputContainer" style={{display:"flex", flexDirection:"column", backgroundColor:"start"}}>
                <div> <p className="AQinputName">Bound</p>
                            <input  className="AQcheckInput" type="checkbox"   checked={inputs.Bound} name="Bound" {...register('Bound')} onChange = {(event) => setInputs({...inputs, Bound:!inputs.Bound })}/>
                            {inputs.Bound?<p className="AQyesNoText">Yes</p>:<p className="AQyesNoText">No</p>} 
                        </div>
                </div>
            </div>

            
            <div className="AQwhiteContainer10">
                <div className="AQinputContainer" >
                    <p className="AQinputName">NRSD</p>
                    <div className="AQyesNoContainer">
                                <div>
                                <input  className="AQcheckInput" type="checkbox" checked={inputs.NSD}  value={inputs.NSD} key="NSD" name="NSD" onChange = {(event) => setInputs({...inputs,NSD:!inputs.NSD})}/>
                                {inputs.NSD?<p className="AQyesNoText">Yes</p>:<p className="AQyesNoText">No</p>}
                                </div>
                                {inputs.NSD&&
                                <>
                                <input className="AQinput2" placeholder="How much?" key="NSDvalue" name="NSDvalue"  value={inputs.NSDvalue} {...register("NSDvalue")}/>  
                                <p className="FORMerror">{errors.NSDvalue?.message}</p>  </>}
                            
                             </div>
                </div>
               
                <div className="AQinputContainer" >
                    <p className="AQinputName">MVR</p>
                    <div className="AQyesNoContainer">
                                <div>
                                <input  className="AQcheckInput" type="checkbox" checked={inputs.MVR} key="MVR" name="MVR" onChange = {(event) => setInputs({...inputs,MVR:!inputs.MVR})}/>
                                {inputs.MVR?<p className="AQyesNoText">Yes</p>:<p className="AQyesNoText">No</p>}
                                </div>
                                {inputs.MVR&&<>
                                    <input className="AQinput2" placeholder="How much" key="MVRvalue" name="MVRvalue"  value={inputs.MVRvalue} {...register("MVRvalue")}/>
                                    <p className="FORMerror">{errors.NSDvalue?.message}</p> </>}
                             
                             </div>
                </div>
               
                <div className="AQinputContainer1">
                    <p className="AQinputName">PIP</p>
                    <div className="AQyesNoContainer">
                        <div>
                            <input   className="AQcheckInput"  type="checkbox" checked={inputs.PIP} value={inputs.PIP} key="PIP" name="PIP" onChange = {(event) =>setInputs({...inputs,PIP:!inputs.PIP})}/>
                            {inputs.PIP?<p className="AQyesNoText">Yes</p>:<p className="AQyesNoText">No</p>}
                        </div>
                        {inputs.PIP&&
                        <>
                        <input className="AQinput2" placeholder="PIP value" key="dealerSalePerson" name="dealerSalePerson"  {...register("PIPvalue")}/>
                        <p className="FORMerror">{errors.NSDvalue?.message}</p> 
                        </>
                         
                        }
                    </div>
                </div>
           
      
      </div>        
              
      
           
            <div className="AQinputContainer" style={{marginTop:"20px"}}>
                    <p className="AQinputName">Notes</p>
                    <textarea  className="AQtextarea" placeholder="Notes" key="notes" name="notes"  value={inputs.notes} {...register("notes")}/>   
                    <p className="FORMerror">{errors.notes?.message}</p>
                </div>
                </form>
            </div>

         
              
              
       
              
            <div style={{position:"absolute", right:"50px", top:"76px", display:"flex"}}>
                <button onClick={handleSubmit(onSubmit)} className="PAYbutton" ><p className="PAYbuttonText">Add Quote</p></button>
            </div>     
              
            <Modal open={open} onClose={reload} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">Quote added successfully</p>
       
       
        <button  className="modalButton" onClick={reload}>Continue</button>
      
        
        </div>
      </Modal>
      
    </div>
           
    )
                    }

export default AddQuote



