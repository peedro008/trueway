import React, { useEffect, useState } from "react";
import axios from "axios"
import {MdAdd} from "react-icons/md"

import { NavLink } from "react-router-dom";
import "./CSS/css.css"
const Producer = ()=>{
const [producers, setProducers]= useState([])
const [quotes, setQuotes]= useState([])

    useEffect(()=>{
        axios.get(`http://localhost:4000/getProducer`)
            .then(function(response){
                setProducers(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])
    useEffect(()=>{
        axios.get(`http://localhost:4000/quotes`)
            .then(function(response){
                setQuotes(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])

  




    return(
        
        <div className="genericDiv">
       
        
       <div className="genericHeader">
                <p className="genericTitle">Producer</p>
            </div>
         
    
    <div style={{paddingLeft:"60px", paddingTop:"20px", paddingBottom:"20px"}}>
    <p className="PRsubtitle">Producer list</p>
    </div>
    
    
    <div>
        {/* <NavLink to="/managerP">
            <button style={{width:40, height:40, alignContent:"center", display:"flex"}}>+</button>
        </NavLink> */}
    </div>
    
    <div  style={{paddingLeft: "60px"}}>
    <table className="table">
        <thead>
            <tr>
            <th scope="col"><p className="tableTitle">Name</p> </th>
            <th scope="col"><p className="tableTitle">E-mail</p></th>
            <th scope="col"><p className="tableTitle">Phone</p></th>
            <th scope="col"><p className="tableTitle">Sold quotes</p></th>
            <th scope="col"><p className="tableTitle">Unsold quotes</p></th>
            </tr>
        </thead>
        <tbody>
            {
               producers.map((e)=>{
                   return (<tr>
                            
                                <td scope="row">{<NavLink style={{ textDecoration: 'none' }} to={{
                                pathname:("/producer/details"),
                                aboutProps:e
                                }}>{e.name}</NavLink>}</td>
                           
                            <td scope="row">{e.email}</td>
                            <td scope="row">{e.phone}</td>
                            <td scope="row">{(quotes.filter(f=>f.ProducerId==e.id)).filter(g=>g.status=="Bound").length}</td>
                            <td scope="row">{(quotes.filter(f=>f.ProducerId==e.id)).filter(g=>g.status!=="Bound").length}</td>
                            
                        </tr>)
               })
               
               
            }

        </tbody>
        </table>
</div>
        <div style={{position:"absolute", right:"50px", top:"100px", display:"flex"}}>
                 <button className="PAYbutton" ><MdAdd  color="white" size={"20px"} className="PAYbuttonIcon"/><p className="PAYbuttonText">New Producer</p></button>
            </div>

    </div>
    )
}

export default Producer