import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from 'react-select'
import { BsChevronLeft } from "react-icons/bs";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-responsive-modal";
import Icon from "../assets/Icon.png"
const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
    Password: yup.string().required(),
    UserId: yup.number().required(),
    ProducerId: yup.number().required(),
    LocationId: yup.number().required(),

}).required();

const ProducerEdit = (props) => {
    const [locations, setLocations] = useState([])
    
    const [inputs, setInputs]= useState({})
    let Producer = props.location.props
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const { register, handleSubmit,control, formState:{ errors }, setValue } = useForm({
        resolver: yupResolver(schema)
      });
      setValue("UserId", `${Producer.UserId}`)
      setValue("email", `${Producer.email}`)
      setValue("name", `${Producer.name}`)
      setValue("phone", `${Producer.phone}`)
      setValue("LocationId", `${Producer.LocationId}`)
      setValue("address", `${Producer.address}`)
      setValue("ProducerId", `${Producer.id}`)
      

    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getLocations`)
            .then(function(response){
                setLocations(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])

    

    const onSubmit = (data) => {
 
       
        fetch(`https://truewayagentbackend.com/modifyProducer`, {
            
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
         
        
  
    
    }
    const optionsC = locations.map(e=>({value:e.id,label:e.name}))
    const customStyles = {
        control: base => ({
          ...base,
          height: 30,
          minHeight: 30,
          background: "#F5F5F5",
          
        
          
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
      
    return(
    <div className="genericDiv1">
        <div className="genericHeader">
            <p className="genericTitle">Edit producer</p>
        </div>
        
        <div className="ProdEditContainer">
            <div className="ProdEditSubContainer1">
               
                <p style={{width:"100%", textAlign:"left"}} className="ProdEditT">Profile</p>
                <div style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"space-between"}}>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">Full name</p>
                    <input className="ProdEditInput" placeholder={inputs.name}   {...register("name")}/>
                    <p className="FORMerror">{errors.name?.message}</p>
                </div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">Phone number</p>
                    <input className="ProdEditInput" placeholder={inputs.phone}  {...register("phone")}/>
                    <p className="FORMerror">{errors.phone?.message}</p>
                </div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle" >Address</p>
                    <input className="ProdEditInput"  placeholder={inputs.address} {...register("address")}/>
                    <p className="FORMerror">{errors.address?.message}</p>
                </div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">Location</p>
                    <Controller
                     control={control}
                     name="LocationId"
                     render={({ field: { onChange, onBlur, value, ref } }) => (
                         <Select styles={customStyles} value={optionsC.find(c => c.value === value)} onChange={val => onChange(val.value)} control={control} options={locations.map(e=>({value:e.id,label:e.name}))} name={"LocationId"} className="PAYselect"  placeholder="Select Location"/>
                     )}
                     
                     />
                   
                </div>
                </div>


            </div>
            
            
            <div className="ProdEditSubContainer">
                <div style={{width:"78%", textAlign:"left", marginLeft:"5px"}}><p className="ProdEditT">Account</p></div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">E-mail</p>
                    <input className="ProdEditInput"  placeholder={inputs.email}  {...register("email")}/>
                    <p className="FORMerror">{errors.email?.message}</p>
               </div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">Password</p>
                    <input placeholder="*******" className="ProdEditInput" {...register("Password")}/>
                    <p className="FORMerror">{errors.Password?.message.substring(0,28)}</p>
                </div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">Repeat password</p>
                    <input placeholder="*******" onChange={(e)=>setInputs(e.target.value)} className="ProdEditInput"/>
                </div>
               <button className="ProdEditSave" onClick={handleSubmit(onSubmit)}>Save</button>

               <Modal open={open} onClose={()=>window.history.go(-2)} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">Producer modified successfully</p>
       
       
        <button  className="modalButton" onClick={()=>window.history.go(-2)}>Continue</button>
      
        
        </div>
      </Modal>








            </div>

        </div>



        <BsChevronLeft color="grey" style={{minWidth:"25px", minHeight:"25px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-2)}/>


    </div>   )
}

export default ProducerEdit

//onChange={event => setInputs({...inputs,down:event.target.value})}