import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "./CSS/css.css"
import { addPay } from '../redux/actions';
import { BiDownload, BiMessageSquareAdd } from "react-icons/bi";
import Select from 'react-select'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Icon from "../assets/Icon.png"
import { NavLink } from "react-router-dom";
import MyDocument from "./PDF/prueba";
import ReactPDF, { PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import { useForm, Controller,setVa } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const schema = yup.object({
    name:yup.string().optional().min(6),
    email:yup.string().email().optional().min(6),
    phone:yup.number().optional(),
    ClientId: yup.number().optional(),
    amount: yup.number().positive().integer().required(),
    type: yup.string().required(),
    method: yup.string().required(),
    creditCardFee: yup.number().optional().default(0),
    LocationId: yup.number().positive().integer().required(),
    UserId: yup.number().required()
    
    

}).required();

function Payment(){
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const [method, setMethod] = useState("");
    const [ERR, setERR] = useState({ ClientId: false})
    const [payment, setPayment]= useState({creditCardFee:0})
    const [locations, setLocations] = useState([])
    const userId = useSelector(state=> state.UserId)
    const userName = useSelector(state=> state.userName)
    const [clients, setClients] = useState([])
    const [newClient, setNewClient] = useState(false)
    const [form, setForm] = useState({res: "res"})
    

    

    const { register, handleSubmit,control, formState:{ errors }, setValue,  } = useForm({
        resolver: yupResolver(schema)
      });
      setValue("UserId", `${userId}`)
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
    useEffect(()=>{
        axios.get(`http://localhost:4000/clients`)
            .then(function(response){
                setClients(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    useEffect(()=>{
        axios.get(`http://localhost:4000/getLocations`)
            .then(function(response){
                setLocations(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    useEffect(()=>{
        setPayment({...payment, UserId:userId})
    }, [userId])
    
    const handleNewClient = () =>{
        !newClient?
        setNewClient(true)
        :
        reload()
    }
    const optionM = [{value:"credit/debit", label:"credit/debit"},
    {value:"EFT", label:"EFT"},
    {value:"Cash", label:"Cash"}]
    const optionT = [{value:"Monthly Payment", label:"Monthly Payment"},
    {value:"Down Payment", label:"Down Payment"},
    {value:"Endorsement", label:"Endorsement"},
    {value:"Renew Down", label:"Renew Down"}]
    
    
    const onSubmit =(data)=>{
        console.log(optionsC.filter(e=>e.value==control._formValues.ClientId).label)
        console.log(data)
      
            
            if(newClient==false){
                
               data.ClientId!==undefined?
                  
                
                
               
                fetch(`http://localhost:4000/addPayment`, {
                    
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        },
                    body: JSON.stringify(data),
                    
                })
                .then(response => response.json())
                .then(data => dispatch(addPay(data),onOpenModal() ))
               
                
                  

                :
                setERR({...ERR, ClientId:true})

                }
                else{
                 
                        
                  
                        fetch(`http://localhost:4000/addClientPayment`, {
                        
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            },
                        body: JSON.stringify(data),
                        
                    })
                   onOpenModal() 
                 
        
                    
                }
                
        }
       
              
               
                
          
       
   
    
    const optionsC = clients.map(e=>({value:e.id,label:e.name}))
    const optionsL = locations.map(e=>({value:e.id,label:e.name}))
  

     return(
         
    <div className="genericDiv">
       <div className="genericHeader">
           <p className="genericTitle">Add payment</p>
        </div>
      
        <div className="PAYMainBox">
           
               
          
            
            <div className="PAYBox">
            
                
                <div className="PAYInputCont" style={{marginTop:"25px"}}>
                    <div style={{display:"flex", flexDirection:"row"}}>
                    
                    <p className="PAYtitle">Client Name</p>
                    <BiMessageSquareAdd onClick={()=>handleNewClient()} size="20" color="#28C76F" style={{ marginLeft:"70px"}}/>
                    </div>
                    {!newClient?
                   <>
                    <Controller
                        control={control}
                        name="ClientId"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Select value={optionsC.find(c => c.value === value)}  onChange={val =>{ onChange(val.value) ; setForm({...form, client: val.label})}} control={control} options={clients.map(e=>({value:e.id,label:e.name}))} name={"ClientId"} className="PAYselect"  placeholder="Select Client"/>
                        )}
                        />
                        {ERR.ClientId&&<p className="FORMerror">"Client is a required field"</p>}
                    </>
                    :
                    <>
                    <input className="PAYsub-title"  {...register("name")}/>
                    <p className="FORMerror">{errors.name?.message}</p>
                     </>
                   }
                
                </div>
                {newClient&&
                 <div  className="PAYBox" style={{paddingTop:"25px"}}>
              

                 <div className="PAYInputCont">
                 <p  className="PAYtitle">Email</p>
                 <input {...register("email",{
                        required: 'Email is required',
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Please enter a valid email',
                        }})}  placeholder="Email" className="PAYsub-title"></input>
                    <p className="FORMerror">{errors.email?.message}</p>
                 </div>
                 <div className="PAYInputCont">
                    <p  className="PAYtitle">Phone</p>
                    <input  {...register("phone")}  placeholder="Phone" className="PAYsub-title"></input>
                    <p className="FORMerror">{errors.phone?.message.substring(0,25)}</p>
                    
                </div> 
                  </div>
                 }
             
                
              
                 
               

                
            </div>

            <div className="PAYBox"> 
            <div className="PAYInputCont">
                <p className="PAYtitle">Location</p>
                <Controller
                        control={control}
                        name="LocationId"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Select value={optionsL.find(c => c.value === value)} onChange={val => onChange(val.value)} control={control} options={locations.map(e=>({value:e.id,label:e.name}))} name={"LocationId"} className="PAYselect"  placeholder="Select Location"/>
                        )}
                    />

                    <p className="FORMerror">{errors.LocationId?.message}</p>
           
                    <p className="FORMerror">{errors.UserId?.message}</p>
                </div>

                <div className="PAYInputCont">
                    <p  className="PAYtitle">Amount</p>
                    <input className="PAYsub-title" value={payment.amount} {...register("amount")}/>
                    <p className="FORMerror">{errors.amount?.message}</p>
                </div> 




                <div className="PAYInputCont">
                <p  className="PAYtitle">Payment type</p>
                <Controller
                        control={control}
                        name="type"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Select value={optionT.find(c => c.value === value)} onChange={val => onChange(val.value)} control={control} options={optionT.map(e=>({value:e.value,label:e.label}))} name={"type"} className="PAYselect"  placeholder="Select method"/>
                        )}
                    />
            <p className="FORMerror">{errors.type?.message}</p>
            </div>
            <div className="PAYInputCont" >
                <p className="PAYtitle">Payment Method</p>
                <Controller
                        control={control}
                        name="method"
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Select value={optionM.find(c => c.value === value)} onChange={val => {onChange(val.value) ;setMethod(val.value)}} control={control} options={optionM.map(e=>({value:e.value,label:e.label}))} name={"method"} className="PAYselect"  placeholder="Select method"/>
                        )}
                    />

                <p className="FORMerror">{errors.method?.message}</p>
                {method=="credit/debit"&&
                <>
                <div style={{position:"absolute",marginTop:"20px"}}>
                 <p className="PAYtitle">Credit card fee</p>
                 <input className="PAYsub-title"   {...register("creditCardFee")}/>
                </div>
                  <p className="FORMerror">{errors.creditCardFee?.message}</p>
                  </>
                }

                </div>



            </div>

        
           
            <Modal open={open} onClose={reload} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">Payment added successfully</p>
       
        <PDFDownloadLink document={<MyDocument data={{client:form.client, total:(control._formValues.creditCardFee?(control._formValues.amount+control._formValues.creditCardFee):control._formValues.amount), producer: userName}} />} fileName="TEST">
        <button  className="modalButton" onClick={reload}> Continue</button>
        </PDFDownloadLink>
      
        <BsChevronRight color="grey" style={{minWidth:"40px", minHeight:"40px", position:"absolute", right:"2%",top:"50%", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
        </div>
      </Modal>
        
           
            
            
      <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"absolute",zIndex:9, left:"5%",top:"2%", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
            
          
        
        
        
        </div>
       








        
      <div style={{position:"absolute", right:"50px", top:"100px", display:"flex"}}>
                <button  onClick={handleSubmit(onSubmit)} className="PAYbutton" ><p className="PAYbuttonText">Add payment</p></button>
            </div>     
              






                
               
                
    </div>)
}

export default Payment

