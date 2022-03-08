import React from "react";
import "./CSS/css.css"
import {MdAdd} from "react-icons/md"
import {CgImport} from "react-icons/cg"
import { NavLink } from "react-router-dom"
import Isologo_background from  "../assets/Isologo_background.png"
 const Payments = ()=>{
    return(

        <div className="genericDiv">
             
            <div className="genericHeader">
                <p className="genericTitle">Payments</p>
            </div>
            
           
           
           
           
           
            <div className="PAYbuttonCont">
                
                <NavLink  style={{ textDecoration: 'none', color:"#000" }} to="/payments/pay">
                    <button  className="PAYbutton">
                    <MdAdd size="1.25em" className="PAYbuttonIcon" color="#FFFFFF"/> 
                    <p className="PAYbuttonText">Add payment</p>
                    </button>
                </NavLink>
                <NavLink  style={{ textDecoration: 'none', color:"#000" }} to="/payments/deposit">
                    <button  className="PAYbutton">
                    
                    <MdAdd size="1.25em" className="PAYbuttonIcon" color="#FFFFFF"/> 
                    <p className="PAYbuttonText">Deposit cash</p>
                    </button>
                </NavLink>
                <NavLink to="/payments/dailyReport" style={{ textDecoration: 'none', color:"#000" }}>
                    <button className="PAYbutton">
                        <CgImport size="1.2em" className="PAYbuttonIcon" color="#FFFFFF"/> 
                        <p className="PAYbuttonText">Generate daily report</p>
                    </button>
                </NavLink>
            </div>
        
        
        
        
            <img src={Isologo_background} style={{position:"absolute", right:0, bottom:0, width:"528px", opacity:"0.5"}}/>
        
        </div>
    )
}

export default Payments