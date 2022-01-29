import React, { useEffect, useState } from "react";
import "./CSS/css.css"
import {MdAdd} from "react-icons/md"
import axios from "axios";
import Select from 'react-select'
const ManagerD=()=>{
    const [company, setCompany] = useState([])
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
                    <input placeholder="Name" className="PAYsub-title"></input>
                </div>
               <div className="inputDiv" > 
                    <p className="PAYtitle">Company</p>
                    <Select options={company.map(e=>({value:e.id,label:e.name}))} className="PAYselect"  placeholder="Select Company"/>
                </div>  
                

            </div>
         
        </div>
    



        <button className="button4" >Add Dealer</button>

        </div>
    
    )
}
export default ManagerD