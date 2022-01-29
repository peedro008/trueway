import React from "react";
import "./CSS/css.css"
import {MdAdd} from "react-icons/md"
import {CgImport} from "react-icons/cg"
import { NavLink } from "react-router-dom";
 const Payments = ()=>{
    return(

        <div className="genericDiv">
             
            <div className="genericHeader">
                <p className="genericTitle">Payments</p>
            </div>
            
           
           
           
           
           
            <div className="PAYbuttonCont">
                
                <NavLink  style={{ textDecoration: 'none' }} to="/payment">
                    <button  className="PAYbutton">
                    <MdAdd size="1.25em" className="PAYbuttonIcon" color="#FFFFFF"/> 
                    <p className="PAYbuttonText">Add payment</p>
                    </button>
                </NavLink>
                <NavLink  style={{ textDecoration: 'none' }} to="/deposit">
                    <button  className="PAYbutton">
                    
                    <MdAdd size="1.25em" className="PAYbuttonIcon" color="#FFFFFF"/> 
                    <p className="PAYbuttonText">Deposit cash</p>
                    </button>
                </NavLink>
                <NavLink to="/payment" style={{ textDecoration: 'none' }}>
                    <button className="PAYbutton">
                        <CgImport size="1.2em" className="PAYbuttonIcon" color="#FFFFFF"/> 
                        <p className="PAYbuttonText">Generate daily report</p>
                    </button>
                </NavLink>
            </div>
        
        
        
        
        
        
        </div>
    )
}

export default Payments