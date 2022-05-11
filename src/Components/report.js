import React from "react";
import { AiOutlineFile } from "react-icons/ai";
import { CgImport } from "react-icons/cg";
import Isologo_background from  "../assets/Isologo_background.png"
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {AiOutlineDelete} from "react-icons/ai"

const Report = () =>{
    const state= useSelector(state=>state.userRole)
    return(
        <div  className="genericDiv">
        
        <div className="genericHeader">
           <p className="genericTitle">Reports</p>
        </div>
        <div className="managerContainer">
            
            <NavLink to={"/report/filter"}  style={{ textDecoration: 'none', color:"#000" }}>
                <button className="PAYbutton" style={{  width:"150px",  marginRight: "20px"}}><AiOutlineFile  color="white" size={"20px"} className="PAYbuttonIcon"/> <p className="PAYbuttonText"> Quotes</p></button>
            </NavLink>
            <NavLink to={"/report/payReport"}  style={{ textDecoration: 'none', color:"#000" }}>
                <button className="PAYbutton" style={{    width:"150px", marginRight: "20px"}}><CgImport color="white" size={"20px"}  className="PAYbuttonIcon"/> <p className="PAYbuttonText"> Payments</p></button>
            </NavLink>
            <NavLink to={"/report/clients"}  style={{ textDecoration: 'none', color:"#000" }}>
                <button className="PAYbutton" style={{   width:"150px",  marginRight: "20px"}}><CgImport color="white" size={"20px"}  className="PAYbuttonIcon"/> <p className="PAYbuttonText"> Clients</p></button>
            </NavLink>
            {
                state=="Manager"||state=="Admin"?
                <NavLink to={"/report/dailyReport"}  style={{ textDecoration: 'none', color:"#000" }}>
                <button className="PAYbutton" style={{   width:"150px",  marginRight: "20px"}}><CgImport color="white" size={"20px"}  className="PAYbuttonIcon"/> <p className="PAYbuttonText"> Daily Report</p></button>
                </NavLink>
                :
                <></>
            }
            
            </div>
            <div className="managerContainer">
            {
                state=="Manager"||state=="Admin"?
                <NavLink to={"/report/deletedReport"}  style={{ textDecoration: 'none', color:"#000" }}>
                <button className="PAYbutton" style={{   width:"150px",  marginRight: "20px"}}><AiOutlineDelete color="white" size={"20px"}  className="PAYbuttonIcon"/> <p className="PAYbuttonText">Deleted</p></button>
                </NavLink>
                :
                <></>
            }
             </div>
    

            <img src={Isologo_background} style={{position:"absolute", right:0, bottom:0, width:"428px", opacity:"0.5"}}/>

        </div>
        
    )
    }
    export default Report