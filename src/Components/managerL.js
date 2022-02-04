import React, { useState } from "react";
import "./CSS/css.css"
import {MdAdd} from "react-icons/md"

const ManagerL=()=>{
    const [inputs, setinputs]= useState({})
    const onSubmitHandler = () => {
        inputs&&
      
        
        fetch(`http://localhost:4000/addLocation`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(inputs)
            
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
        
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    return( 
        <div  className="genericDiv">

            <div className="genericHeader">
            <p className="genericTitle">Add Location</p>
            </div>
        
        
        <div className="managerInputsContainer">
            <div className="managerInputsubContainer">
                <div className="inputDiv"> 
                    <p className="PAYtitle">Name</p>
                    <input placeholder="Name" onChange={(e)=>{setinputs({...inputs, name:e.target.value})}} className="PAYsub-title"></input>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Email</p>
                    <input placeholder="Email" onChange={(e)=>{setinputs({...inputs, email:e.target.value})}} className="PAYsub-title"></input>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Phone</p>
                    <input placeholder="Phone" onChange={(e)=>{setinputs({...inputs, TEL:e.target.value})}} className="PAYsub-title"></input>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Address</p>
                    <input placeholder="Address" onChange={(e)=>{setinputs({...inputs, address:e.target.value})}} className="PAYsub-title"></input>
                </div>
                

            </div>
         
        </div>
    


        <div style={{position:"absolute", right:"50px", top:"100px", display:"flex"}}>
            <button onClick={onSubmitHandler} className="PAYbutton" ><p className="PAYbuttonText">Add Location</p></button>
        </div>

        </div>
    
    )
}
export default ManagerL