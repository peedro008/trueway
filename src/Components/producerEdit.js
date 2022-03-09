import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from 'react-select'
import { BsChevronLeft } from "react-icons/bs";

const ProducerEdit = (props) => {
    const [locations, setLocations] = useState([])
    
    const [inputs, setInputs]= useState({})
    let Producer = props.location.props
    useEffect(()=>{

        setInputs({name:Producer.name, email:Producer.email, phone: Producer.phone, LocationId:Producer.LocationId, address:Producer.address, UserId:Producer.User.id, Password:null})
       
    },[Producer])
    useEffect(()=>{
        axios.get(`http://trueway-env.eba-j5wkwmpy.us-east-1.elasticbeanstalk.com/getLocations`)
            .then(function(response){
                setLocations(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])

    

    const submit = () => {
        fetch(`http://trueway-env.eba-j5wkwmpy.us-east-1.elasticbeanstalk.com/modifyProducer`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(inputs)
            
        })
    }

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
                    <input className="ProdEditInput" placeholder={inputs.name} value={inputs.name}  onChange={event => setInputs({...inputs,name:event.target.value})}/>
                </div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">Phone number</p>
                    <input className="ProdEditInput" placeholder={inputs.phone} value={inputs.phone} onChange={event => setInputs({...inputs,phone:event.target.value})}/>
                </div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle" >Address</p>
                    <input className="ProdEditInput"  placeholder={inputs.address} value={inputs.address}onChange={event => setInputs({...inputs,address:event.target.value})}/>
                </div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">Location</p>
                    <Select  styles={customStyles}  value={inputs.LocationId}  className="ProdEditInputS"  options={locations.map(e=>({value:e.id,label:e.name}))} onChange={event => setInputs({...inputs,LocationId:event.value})}/>
                </div>
                </div>


            </div>
            
            
            <div className="ProdEditSubContainer">
                <div style={{width:"78%", textAlign:"left", marginLeft:"5px"}}><p className="ProdEditT">Account</p></div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">E-mail</p>
                    <input className="ProdEditInput" value={inputs.email} placeholder={inputs.email}onChange={event => setInputs({...inputs,email:event.target.value})}/>
                </div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">Password</p>
                    <input placeholder="*******" className="ProdEditInput" onChange={event => setInputs({...inputs,Password:event.target.value})}/>
                </div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">Repeat password</p>
                    <input placeholder="*******" className="ProdEditInput"/>
                </div>
               <button className="ProdEditSave" onClick={submit}>Save</button>










            </div>

        </div>



        <BsChevronLeft color="grey" style={{minWidth:"25px", minHeight:"25px", position:"absolute",zIndex:9, left:"80px",top:"18px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-2)}/>


    </div>   )
}

export default ProducerEdit

//onChange={event => setInputs({...inputs,down:event.target.value})}