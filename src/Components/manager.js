import React from "react";

import "./CSS/css.css"
import {MdAdd} from "react-icons/md"
import { NavLink } from "react-router-dom";

const Manager=()=>{
    
    return( <div  className="genericDiv">
        
        <div className="genericHeader">
           <p className="genericTitle">User and Location management</p>
        </div>
        <div className="managerContainer">
            
            <NavLink to={"./managerC"}  style={{ textDecoration: 'none' }}>
                <button className="PAYbutton" style={{    marginRight: "20px"}}><MdAdd  color="white" size={"20px"} className="PAYbuttonIcon"/> <p className="PAYbuttonText"> Add Company</p></button>
            </NavLink>
            <NavLink to={"./managerP"}  style={{ textDecoration: 'none' }}>
                <button className="PAYbutton" style={{    marginRight: "20px"}}><MdAdd color="white" size={"20px"}  className="PAYbuttonIcon"/> <p className="PAYbuttonText"> Add Producer</p></button>
            </NavLink>
            <NavLink to={"./managerM"}  style={{ textDecoration: 'none' }}>
                <button className="PAYbutton" style={{    marginRight: "20px"}}><MdAdd color="white" size={"20px"}   className="PAYbuttonIcon"/><p className="PAYbuttonText"> Add Manager</p></button>
            </NavLink>
            </div>
        
        <div className="managerContainer">
            <NavLink to={"./managerL"}  style={{ textDecoration: 'none' }}>
                <button className="PAYbutton" style={{    marginRight: "20px"}}><MdAdd color="white" size={"20px"}   className="PAYbuttonIcon"/> <p className="PAYbuttonText">Add Location</p></button>
            </NavLink>

            <NavLink to={"./managerD"}  style={{ textDecoration: 'none' }}>
                <button className="PAYbutton" style={{    marginRight: "20px"}}><MdAdd color="white" size={"20px"}   className="PAYbuttonIcon"/> <p className="PAYbuttonText">Add Dealer sale person</p></button>
            </NavLink>
            <NavLink to={"./managerCa"}  style={{ textDecoration: 'none' }}>
                <button className="PAYbutton" style={{    marginRight: "20px"}}><MdAdd color="white" size={"20px"}   className="PAYbuttonIcon"/> <p className="PAYbuttonText">Add Category</p></button>
            </NavLink>
        </div>





        </div>
    
    )
}
export default Manager