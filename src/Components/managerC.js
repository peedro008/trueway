import React from "react";
import "./CSS/css.css"
import {MdAdd} from "react-icons/md"

const ManagerC=()=>{

    return( <div className="genericDiv">
        
        <div className="genericHeader">
           <p className="genericTitle">Add Company</p>
        </div>
        
        <div className="managerInputsContainer">
            <div className="managerInputsubContainer">
                <div className="inputDiv"> 
                    <p className="PAYtitle">Company Name</p>
                    <input placeholder="Company Name" className="PAYsub-title"></input>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Email</p>
                    <input placeholder="Email" className="PAYsub-title"></input>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Phone</p>
                    <input placeholder="Phone" className="PAYsub-title"></input>
                </div>
                <div className="inputDiv"> 
                    <p className="PAYtitle">Address</p>
                    <input placeholder="Address" className="PAYsub-title"></input>
                </div>
                

            </div>
            <div className="managerInputsubContainer">
                <div className="inputDiv"> 
                    <p className="PAYtitle">Category</p>
                    <input placeholder="Category" className="PAYsub-title"></input>
                </div>  
                </div>
        </div>
    



        <div style={{position:"absolute", right:"50px", top:"100px", display:"flex"}}>
            <button className="PAYbutton" ><p className="PAYbuttonText">Add Manager</p></button>
        </div>

        </div>

    )
}
export default ManagerC