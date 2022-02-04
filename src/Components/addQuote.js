import axios from "axios";

import React, { useEffect, useState } from 'react';
import {  BiMessageSquareAdd } from "react-icons/bi";
import Select from 'react-select'

const AddQuote = ()=>{

    const [newClient, setNewClient] = useState(false)
    const [clients, setClients] = useState([])
    const [inputs, setInputs] = useState({});
    const [producers, setProducers]= useState([])
    const [companies, setCompanies]= useState([])
    const [categories, setCategories]= useState([])
    const [locations, setLocations] = useState([])
    const [dealers, setDealers] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:4000/getDealer`)
            .then(function(response){
                setDealers(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
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
        axios.get(`http://localhost:4000/getProducer`)
            .then(function(response){
                setProducers(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])
    useEffect(()=>{
        axios.get(`http://localhost:4000/getCategories`)
            .then(function(response){
                setCategories(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])
    useEffect(()=>{
        axios.get(`http://localhost:4000/getCompany`)
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
        setInputs({
            clientName:"",
            clientEmail:"",
            clientTel:"",
            CompanyId:"",
            ProducerId:"",
            down:"",
            monthlyPayment:"",
            dealer:false,
            dealerSalePerson:"",
            NSD:false,
            NSDvalue:"",
            PIP:false,
            PIPvalue:"",
            MVR:false,
            MVRvalue:"",
            LocationId:"",
            status:"",
            notes:"",
            CategoryId:""
            

        })
       
    }
    
    const reset =(event)=>{
        const value= event.target.value
        setInputs({
            ...inputs,
            [event.target.name]:!value
          })
    }

    const onSubmitHandler = () => {
     
        const payload = {
           inputs
         
        };
        fetch(`http://localhost:4000/addQuote`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(inputs),
            
        })
        .then(async res => { 
            console.log(inputs )
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
         reload()
         myFormRef.reset()
    };
    let myFormRef
const handleNewClient = () =>{
    setNewClient(!newClient)
}

    return(


     <div className="genericDiv">
   
        
  
              <div className="genericHeader">
                <p className="genericTitle">Add quote</p>
            </div>
            
        <div className="AQcontainer">
            <div className="AQrowContainer"style={{marginRight:"309px"}}>
           
                
            <div className="AQinputContainer">
                <div style={{display:"flex", flexDirection:"row"}}>
                
                <p className="AQinputName">Client Name</p>
                <BiMessageSquareAdd onClick={()=>handleNewClient()} size="20" color="#28C76F" style={{ marginLeft:"60px"}}/>
                </div>
                {!newClient?
                <Select  styles={customStyles}  placeholder="Name" className="AQinput"  options={clients.map(e=>({value:e.id,label:e.name}))} onChange={(e)=>{setInputs({...inputs, clientId:e.value})}}/>
                :
                <input className="AQinput" placeholder="Client name" value={inputs.clientName} onChange={(event)=>{setInputs({...inputs, clientName:event.target.value})}}/>
                }
            
            </div>
            {newClient&&
             
          

             <div className="AQinputContainer">
             <p  className="AQinputName">Email</p>
             <input placeholder="Client email" className="AQinput" value={inputs.clientEmail} onChange={(event)=>{setInputs({...inputs, clientEmail:event.target.value})}}/>
             </div>
                }
             {newClient&&
             <div className="AQinputContainer">
                <p  className="AQinputName">Phone</p>
                <input placeholder="Client phone" className="AQinput" value={inputs.Tel} onChange={(event)=>{setInputs({...inputs, Tel:event.target.value})}}/>
                
            </div> 
             
             }
         
            
          
             
           

      
                
            
            </div>

            <div className="AQrowContainer">
            <div className="AQinputContainer">
                    <p className="AQinputName">Category</p>
                    <Select  styles={customStyles}  placeholder="Name" className="AQinput"  options={categories.map(e=>({value:e.id,label:e.name}))} onChange={(e)=>{setInputs({...inputs, clientId:e.value})}}/>
                    
                </div>
                <div className="AQinputContainer">
                    <p className="AQinputName">Company</p>
                    <Select  styles={customStyles}  placeholder="Name" className="AQinput"  options={companies.map(e=>({value:e.id,label:e.name}))} onChange={(e)=>{setInputs({...inputs, clientId:e.value})}}/>
                </div>
                <div className="AQinputContainer">
                    <p className="AQinputName">Office</p>
                    
                    <Select  styles={customStyles}  placeholder="Name" className="AQinput"  options={locations.map(e=>({value:e.id,label:e.name}))} onChange={(e)=>{setInputs({...inputs, clientId:e.value})}}/>
                </div>
                <div className="AQinputContainer" >
                    <p className="AQinputName">Dealer</p>
                    <div className="AQyesNoContainer">
                        <div>
                            <input  className="AQcheckInput" type="checkbox" checked={inputs.dealer} name="dealer"  onChange = {(event) => setInputs({...inputs,dealer:!inputs.dealer})}/>
                            {inputs.dealer?<p className="AQyesNoText">Yes</p>:<p className="AQyesNoText">No</p>} 
                        </div>
                        {inputs.dealer&&
                         <Select  styles={customStyles}  placeholder="Name" className="AQinput"  options={dealers.map(e=>({value:e.id,label:e.name}))} onChange={(e)=>{setInputs({...inputs, DealerId:e.value})}}/>
                        }
                    </div>
                </div>
               
            
            </div>
            <div className="AQrowContainer">
                <div className="AQinputContainer">
                    <p className="AQinputName">Down payment</p>
                    <input className="AQinput" placeholder="Down payment" key="down" name="down"  value={inputs.down} onChange={event => setInputs({...inputs,down:event.target.value})}/>
                </div>
                <div className="AQinputContainer" style={{marginRight:"618px"}}>
                    <p className="AQinputName">Monthly payment</p>
                    <input className="AQinput" placeholder="Monthly payment" key="monthlyPayment" name="monthlyPayment"  value={inputs.monthlyPayment} onChange={event => setInputs({...inputs,monthlyPayment:event.target.value})}/>
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
                                {inputs.NSD&&<input className="AQinput2" placeholder="How much?" key="NSDvalue" name="NSDvalue"  value={inputs.NSDvalue} onChange={event => setInputs({...inputs,NSDvalue:event.target.value})}/>   }
                             
                             </div>
                </div>
               
                <div className="AQinputContainer" >
                    <p className="AQinputName">MVR</p>
                    <div className="AQyesNoContainer">
                                <div>
                                <input  className="AQcheckInput" type="checkbox" checked={inputs.MVR} key="MVR" name="MVR" onChange = {(event) => setInputs({...inputs,MVR:!inputs.MVR})}/>
                                {inputs.MVR?<p className="AQyesNoText">Yes</p>:<p className="AQyesNoText">No</p>}
                                </div>
                                {inputs.MVR&&<input className="AQinput2" placeholder="How much" key="MVRvalue" name="MVRvalue"  value={inputs.MVRvalue} onChange={event => setInputs({...inputs,MVRvalue:event.target.value})}/>}
                             
                             </div>
                </div>
               
                <div className="AQinputContainer1">
                    <p className="AQinputName">PIP</p>
                    <div className="AQyesNoContainer">
                        <div>
                            <input   type="checkbox" checked={inputs.PIP} value={inputs.PIP} key="PIP" name="PIP" onChange = {(event) =>setInputs({...inputs,PIP:!inputs.PIP})}/>
                            {inputs.PIP?<p className="AQyesNoText">Yes</p>:<p className="AQyesNoText">No</p>}
                        </div>
                        {inputs.PIP&&
                         <input className="AQinput3" placeholder="Dealer Sale Person" key="dealerSalePerson" name="dealerSalePerson"  value={inputs.PIP==true?10:0} placeholder={inputs.PIP==true?10:0}/>
                        }
                    </div>
                </div>
           
      
      </div>        
              
      
           
            <div className="AQinputContainer" style={{marginTop:"20px"}}>
                    <p className="AQinputName">Notes</p>
                    <textarea  className="AQtextarea" placeholder="Notes" key="notes" name="notes"  value={inputs.notes} onChange={event => setInputs({...inputs,notes:event.target.value})}/>   
                </div>
            </div>

         
              
              
       
              
            <div style={{position:"absolute", right:"50px", top:"100px", display:"flex"}}>
                <button className="PAYbutton" ><p className="PAYbuttonText">Add Quote</p></button>
            </div>     
              
            
            
    </div>
           
    )
                    }

export default AddQuote



