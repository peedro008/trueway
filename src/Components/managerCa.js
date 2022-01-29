import React from "react";
import "./CSS/css.css"
import {MdAdd} from "react-icons/md"

const ManagerCa=()=>{

    return( <div className="genericDiv">
        
        <div className="genericHeader">
           <p className="genericTitle">Add Category</p>
        </div>
        
        <div className="managerInputsContainer">
            <div className="managerInputsubContainer">
                <div className="inputDiv"> 
                    <p className="PAYtitle">Category Name</p>
                    <input placeholder="Category Name" className="PAYsub-title"></input>
                </div>
            </div>
        </div>
    



        <div style={{position:"absolute", right:"50px", top:"100px", display:"flex"}}>
            <button className="PAYbutton" ><p className="PAYbuttonText">Add Category</p></button>
        </div>

        </div>

    )
}
export default ManagerCa