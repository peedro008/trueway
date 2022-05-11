import React from "react";
import Isologo_background from  "../assets/Isologo_background.png"
import "./CSS/css.css"
import {MdAdd} from "react-icons/md"
import { NavLink } from "react-router-dom";

const Manager=()=>{
    
    return( <div  className="genericDiv">
        
        <div className="genericHeader">
           <p className="genericTitle">User and Location management</p>
        </div>
        <div className="managerContainer">
            
            <NavLink to={"./manager/managerC"}  style={{ textDecoration: 'none', color:"#000" }}>
                <button className="PAYbutton" style={{    marginRight: "20px"}}><MdAdd  color="white" size={"20px"} className="PAYbuttonIcon"/> <p className="PAYbuttonText"> Add Company</p></button>
            </NavLink>
      
            <NavLink to={"./manager/managerP"}  style={{ textDecoration: 'none', color:"#000" }}>
                <button className="PAYbutton" style={{    marginRight: "20px"}}><MdAdd color="white" size={"20px"}  className="PAYbuttonIcon"/> <p className="PAYbuttonText"> Add Producer</p></button>
            </NavLink>
            <NavLink to={"./manager/managerM"}  style={{ textDecoration: 'none', color:"#000" }}>
                <button className="PAYbutton" style={{    marginRight: "20px"}}><MdAdd color="white" size={"20px"}   className="PAYbuttonIcon"/><p className="PAYbuttonText"> Add Manager</p></button>
            </NavLink>
            </div>
        
        <div className="managerContainer1">
            <NavLink to={"./manager/managerL"}  style={{ textDecoration: 'none', color:"#000" }}>
                <button className="PAYbutton" style={{    marginRight: "20px"}}><MdAdd color="white" size={"20px"}   className="PAYbuttonIcon"/> <p className="PAYbuttonText">Add Location</p></button>
            </NavLink>

            <NavLink to={"./manager/managerD"}  style={{ textDecoration: 'none', color:"#000" }}>
                <button className="PAYbutton" style={{    marginRight: "20px"}}><MdAdd color="white" size={"20px"}   className="PAYbuttonIcon"/> <p className="PAYbuttonText">Add Dealer sale person</p></button>
            </NavLink>
            <NavLink to={"./manager/managerCa"}  style={{ textDecoration: 'none', color:"#000" }}>
                <button className="PAYbutton" style={{    marginRight: "20px"}}><MdAdd color="white" size={"20px"}   className="PAYbuttonIcon"/> <p className="PAYbuttonText">Add Category</p></button>
            </NavLink>
           
        </div>
        <div className="managerContainer1">
             <NavLink to={"./manager/managerClient"}  style={{ textDecoration: 'none', color:"#000" }}>
                <button className="PAYbutton" style={{    marginRight: "20px"}}><MdAdd  color="white" size={"20px"} className="PAYbuttonIcon"/> <p className="PAYbuttonText"> Add Client</p></button>
            </NavLink>
        </div>


        <img src={Isologo_background} style={{position:"absolute", right:0, bottom:0, width:"428px", opacity:"0.5"}}/>



        </div>
    
    )
}
export default Manager