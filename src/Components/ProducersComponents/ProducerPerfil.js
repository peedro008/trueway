import React from 'react'
import "../CSS/css.css"
import ProducerDetailBox1 from "../../assets/ProducerDetailBox1.png"
import ProducerDetailBox2 from "../../assets/ProducerDetailBox2.png"
import ProducerDetailBox3 from "../../assets/ProducerDetailBox3.png"
import producerDetailsG11 from "../../assets/producerDetailsG11.png"
import producerDetailsG12 from "../../assets/producerDetailsG12.png"
import producerDetailsG2 from "../../assets/producerDetailsG2.png"
import { BiPencil } from "react-icons/bi";
import { NavLink } from 'react-router-dom'
function ProducerPerfil() {
  
    return(
        <div className="genericDiv">
            
                
            <div className="genericHeader">
                <p className="genericTitle">{}</p>
            </div>


            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"75%", padding:"40px"   }}>
            <img src={ProducerDetailBox1} style={{width:"315px", height:"143px", paddingRight:"20px"}}/>
            <img src={ProducerDetailBox2} style={{width:"315px", height:"143px", paddingRight:"20px"}}/>
            <img src={ProducerDetailBox3} style={{width:"315px", height:"143px", paddingRight:"20px"}}/>
          
        </div>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"75%", paddingLeft:"40px"   }}>
        <div class="asdasd">
             <img src={producerDetailsG12} style={{width:"84%", paddingLeft:"8px", paddingTop:"19px",}}/> 
        </div>
       <img src={producerDetailsG2} style={{width:"245px", height:"210px"}}/>
       

        </div>
               
        </div>
    )
}

export default ProducerPerfil