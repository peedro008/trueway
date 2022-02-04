import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./CSS/css.css"
import ProducerDetailBox1 from "../assets/ProducerDetailBox1.png"
import ProducerDetailBox2 from "../assets/ProducerDetailBox2.png"
import ProducerDetailBox3 from "../assets/ProducerDetailBox3.png"
import producerDetailsG11 from "../assets/producerDetailsG11.png"
import producerDetailsG12 from "../assets/producerDetailsG12.png"
import producerDetailsG2 from "../assets/producerDetailsG2.png"
import { BiPencil } from "react-icons/bi";
const ProducerDetails = (props) => {
    let Producer = props.location.aboutProps
    const [quotes, setQuotes] = useState([])
    const [gquotes, setGquotes] = useState([])
    useEffect (()=>{
        axios.get(`http://localhost:4000/producerQuotes?producer=${Producer.name}`)
        .then(function(response){
            setQuotes(response.data)
            
        })
        .catch(error=>{
          console.log(error)  
        })
    },[Producer])
    useEffect(()=>{
        axios.get(`http://localhost:4000/quotes`)
            .then(function(response){
                setGquotes(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])
    

    return(
        <div className="genericDiv">
            
                
            <div className="genericHeader">
                <p className="genericTitle">{Producer.name}</p>
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
                <NavLink to={{
                            pathname:("/producers/edit"),
                            props: Producer
                        }}>
                <button className="FITbutton">
                    <div style={{display:"flex", flexDirection:"row"}}>
                    <BiPencil size="20px" style={{display:"flex", color:"#2B4162", marginLeft:"8px", marginTop:"1px"}}/>
                    <p className="FITbuttonText">Edit</p>
                    </div>
                </button>
                </NavLink>
        </div>
    )
}
export default ProducerDetails