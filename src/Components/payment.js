import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./CSS/css.css"

import { BiDownload, BiMessageSquareAdd } from "react-icons/bi";
import Select from 'react-select'

 function Payment(){
    const [payment, setPayment]= useState({})
    const [locations, setLocations] = useState([])
    const userId = useSelector(state=> state.UserId)
    const [box, setBox] = useState({pay1:0,pay5:0,pay10:0,pay20:0,pay50:0,pay100:0})
    const [clients, setClients] = useState([])
    const [newClient, setNewClient] = useState(false)
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
        setNewClient(!newClient)
    }
 
    const refresh =()=>{
       !newClient?
        setPayment({
            location:"",
            method:"",
            type:"",
            amount:"",
            clientId:null,
        }):
        setPayment({
            location:"",
            method:"",
            type:"",
            amount:"",
            Tel: "",
            clientEmail:"",
            clientName:""
        })

        setBox({
            pay1:0,pay5:0,pay10:0,pay20:0,pay50:0,pay100:0
        })

    }
    const submitPayment =()=>{
        if(newClient==false){
        if(payment.amount&&payment.clientId&&payment.clientId!==undefined&&payment.method&&payment.type){
                
          
            fetch(`http://localhost:4000/addPayment`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(payment),
            
        })
        refresh()  
        }
        else{
            alert("you must complete all the fields")
        }
        }
        else{
            if(payment.clientName&&payment.clientEmail&&payment.Tel&&payment.amount&&payment.method&&payment.type){
                
          
                fetch(`http://localhost:4000/addClientPayment`, {
                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify(payment),
                
            })
            refresh()  
            }
            else{
                alert("you must complete all the fields")
            }


        }
        
        
    }

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
                    <Select  styles={customStyles} placeholder="Name" className="PAYselect"  options={clients.map(e=>({value:e.id,label:e.name}))} onChange={(e)=>{setPayment({...payment, clientId:e.value})}}/>
                    :
                    <input className="PAYsub-title" value={payment.clientName} onChange={(event)=>{setPayment({...payment, clientName:event.target.value})}}/>
                    }
                
                </div>
                {newClient&&
                 <div  className="PAYBox" style={{paddingTop:"25px"}}>
              

                 <div className="PAYInputCont">
                 <p  className="PAYtitle">Email</p>
                 <input className="PAYsub-title" value={payment.clientEmail} onChange={(event)=>{setPayment({...payment, clientEmail:event.target.value})}}/>
                 </div>
                 <div className="PAYInputCont">
                    <p  className="PAYtitle">Phone</p>
                    <input className="PAYsub-title" value={payment.Tel} onChange={(event)=>{setPayment({...payment, Tel:event.target.value})}}/>
                    
                </div> 
                  </div>
                 }
             
                
              
                 
               

                
            </div>

            <div className="PAYBox"> 
            <div className="PAYInputCont">
                <p className="PAYtitle">Location</p>
                <Select styles={customStyles} options={locations.map(e=>({value:e.id,label:e.name}))} className="PAYselect"  placeholder="Select Location" onChange={(e)=>setPayment({...payment,LocationId:e.value})}/>
           
          
                </div>

                <div className="PAYInputCont">
                    <p  className="PAYtitle">Amounth</p>
                    <input className="PAYsub-title" value={payment.amount} onChange={(event)=>{setPayment({...payment, amount:event.target.value})}}/>
                    
                </div> 




                <div className="PAYInputCont">
                <p  className="PAYtitle">Payment Status</p>
                <Select styles={customStyles} options={[{value:"Monthly Payment", label:"Monthly Payment"},
                                 {value:"Down Payment", label:"Down Payment"},
                                 {value:"Endorsement", label:"Endorsement"},
                                 {value:"Renew Down", label:"Renew Down"}]} 
            className="PAYselect"  onChange={(e)=>setPayment({...payment,type:e.value})}>
                  
            </Select>
            </div>
            <div className="PAYInputCont" >
                <p className="PAYtitle">Payment Method</p>
                <Select styles={customStyles}   options={[{value:"credit/debit", label:"credit/debit"},
                                 {value:"EFT", label:"EFT"},
                                 {value:"Cash", label:"Cash"}]}
                className="PAYselect"  onChange={(e)=>setPayment({...payment,method:e.value})}>
                    
                                                
                </Select>
                {payment.method=="credit/debit"&&
                <div style={{marginTop:"40px"}}>
                 <p className="PAYtitle">Credit card fee</p>
                 <input className="PAYsub-title" value={payment.creditCardFee} onChange={(event)=>{setPayment({...payment, creditCardFee:event.target.value})}}/>
                </div>
                }
                </div>



            </div>

        
           
        
        
           
            
            
            
            
          
        
        
        
        </div>
        {/* <div className="cash">
        {payment.method=="Cash"&&
            <div style={{display:"flex",flexDirection:"row", backgroundColor:"white", width:"600px", height:"310px", borderRadius:"6px", marginTop:"8px", padding:"15px"}}>
                <div className="inputCont">  
                <p  className="PAYtitle" style={{marginBottom:"20px"}}>Monto a pagar</p>
                <div style={{display:"flex", flexDirection:"row"}}>
                <p className="bils">Bills $1</p><input type="number"  className="sub-title3" value={box.pay} onChange={(event)=>{setBox({...box, pay1:event.target.value})}} />
                </div>
                <div style={{display:"flex", flexDirection:"row"}}>
                <p className="bils">Bills $5   </p><input  type="number" className="sub-title3" value={box.pay} onChange={(event)=>{setBox({...box, pay5:event.target.value})}} />
                </div>
                <div style={{display:"flex", flexDirection:"row"}}>
                <p className="bils">Bills $10 </p><input type="number" className="sub-title3" value={box.pay} onChange={(event)=>{setBox({...box, pay10:event.target.value})}} />
                </div>
                <div style={{display:"flex", flexDirection:"row"}}>
                <p className="bils">Bills $20 </p><input type="number" className="sub-title3" value={box.pay} onChange={(event)=>{setBox({...box, pay20:event.target.value})}} />
                </div>
                <div style={{display:"flex", flexDirection:"row"}}>
                <p className="bils">Bills $50 </p><input type="number" className="sub-title3" value={box.pay} onChange={(event)=>{setBox({...box, pay50:event.target.value})}} />
                </div>
                <div style={{display:"flex", flexDirection:"row"}}>
                <p className="bils">Bills $100</p><input type="number" className="sub-title3" value={box.pay} onChange={(event)=>{setBox({...box, pay100:event.target.value})}} />
                </div>

                </div>
                <div style={{marginLeft:"50px"}}>
                <div className="inputCont">
                <p  className="PAYtitle"  style={{marginBottom:"20px"}}>Change</p>
                <p  className="PAYsub-title" style={{marginTop:"4px"}}>{payment.amount&&box?((Number(box.pay1))+(Number(box.pay5)*5)+(Number(box.pay10)*10)+(Number(box.pay20)*20)+(Number(box.pay50)*50)+(Number(box.pay100)*100)-payment.amount):0}</p>
                </div> 
                <div className="inputCont">
                <p  className="PAYtitle">Depositado en el banco</p>
                
                </div> 
                </div>

            </div>
            }
        </div> */}
      








        
      <div style={{position:"absolute", right:"50px", top:"100px", display:"flex"}}>
                <button  onClick={()=>submitPayment()} className="PAYbutton" ><p className="PAYbuttonText">Add Quote</p></button>
            </div>     
              






                
               
                
    </div>)
}

export default Payment

