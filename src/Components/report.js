import React from "react";
import { AiOutlineFile } from "react-icons/ai";
import { CgImport } from "react-icons/cg";

import { NavLink } from "react-router-dom";


const Report = () =>{

    return(
        <div  className="genericDiv">
        
        <div className="genericHeader">
           <p className="genericTitle">Reports</p>
        </div>
        <div className="managerContainer">
            
            <NavLink to={"/filter"}  style={{ textDecoration: 'none' }}>
                <button className="PAYbutton" style={{    marginRight: "20px"}}><AiOutlineFile  color="white" size={"20px"} className="PAYbuttonIcon"/> <p className="PAYbuttonText"> Quotes</p></button>
            </NavLink>
            <NavLink to={"/payreport"}  style={{ textDecoration: 'none' }}>
                <button className="PAYbutton" style={{    marginRight: "20px"}}><CgImport color="white" size={"20px"}  className="PAYbuttonIcon"/> <p className="PAYbuttonText"> Payments</p></button>
            </NavLink>
         
            </div>
        
    



        </div>
        
    )
    }
    export default Report