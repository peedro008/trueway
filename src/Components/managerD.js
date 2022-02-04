import React, { useEffect, useState } from "react";
import "./CSS/css.css"
import {MdAdd} from "react-icons/md"
import axios from "axios";
import Select from 'react-select'
const ManagerD=()=>{
    const [company, setCompany] = useState([])
    const [inputs, setinputs]= useState({})
    const onSubmitHandler = () => {
        inputs&&
        fetch(`http://localhost:4000/addDealer`, {
            
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
    useEffect(()=>{
        axios.get(`http://localhost:4000/getCompany`)
            .then(function(response){
                setCompany(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    return( 
        <div  className="genericDiv">

            <div className="genericHeader">
            <p className="genericTitle">Add Dealer sale person</p>
            </div>
        
        
        <div className="managerInputsContainer" style={{width:"max-content"}}>
            <div className="managerInputsubContainer">
                <div className="inputDiv"> 
                    <p className="PAYtitle">Name</p>
                    <input onChange={(e)=>{setinputs({...inputs, name:e.target.value})}}  placeholder="Name" className="PAYsub-title"></input>
                </div>
               <div className="inputDiv" > 
                    <p className="PAYtitle">Company</p>
                    <Select onChange={(e)=>{setinputs({...inputs, CompanyId:e.value})}}  options={company.map(e=>({value:e.id,label:e.name}))} className="PAYselect"  placeholder="Select Company"/>
                </div>  
                

            </div>
         
        </div>
    



        <button onClick={onSubmitHandler} className="button4" >Add Dealer</button>

        </div>
    
    )
}
export default ManagerD