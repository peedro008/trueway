import React from "react";
import { AiOutlineFile } from "react-icons/ai";
import { CgImport } from "react-icons/cg";
import Isologo_background from  "../assets/Isologo_background.png"
import { NavLink } from "react-router-dom";


const Report = () =>{

    return(
        <div  className="genericDiv">
        
        <div className="genericHeader">
           <p className="genericTitle">Reports</p>
        </div>
        <div className="managerContainer">
            
            <NavLink to={"/report/filter"}  style={{ textDecoration: 'none', color:"#000" }}>
                <button className="PAYbutton" style={{  width:"135px",  marginRight: "20px"}}><AiOutlineFile  color="white" size={"20px"} className="PAYbuttonIcon"/> <p className="PAYbuttonText"> Quotes</p></button>
            </NavLink>
            <NavLink to={"/report/payReport"}  style={{ textDecoration: 'none', color:"#000" }}>
                <button className="PAYbutton" style={{    width:"135px", marginRight: "20px"}}><CgImport color="white" size={"20px"}  className="PAYbuttonIcon"/> <p className="PAYbuttonText"> Payments</p></button>
            </NavLink>
            <NavLink to={"/report/clients"}  style={{ textDecoration: 'none', color:"#000" }}>
                <button className="PAYbutton" style={{   width:"135px",  marginRight: "20px"}}><CgImport color="white" size={"20px"}  className="PAYbuttonIcon"/> <p className="PAYbuttonText"> Clients</p></button>
            </NavLink>
         
            </div>
        
    

            <img src={Isologo_background} style={{position:"absolute", right:0, bottom:0, width:"528px", opacity:"0.5"}}/>

        </div>
        
    )
    }
    export default Report