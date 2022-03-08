import React, { useEffect, useState } from "react";
import axios from "axios"
import {MdAdd} from "react-icons/md"

import { NavLink } from "react-router-dom";
import "./CSS/css.css"
const Producer = ()=>{
const [producers, setProducers]= useState([])
const [quotes, setQuotes]= useState([])
const [sold, setSold]= useState(0)
const [unSold, setUnSold]= useState(0)  
 
    useEffect(()=>{
        axios.get(`http://trueway-env.eba-j5wkwmpy.us-east-1.elasticbeanstalk.com/getProducer`)
            .then(function(response){
                setProducers(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])
    useEffect(()=>{
        axios.get(`http://trueway-env.eba-j5wkwmpy.us-east-1.elasticbeanstalk.com/quotes`)
            .then(function(response){
                setQuotes(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])





    return(
        
        <div className="genericDiv1">
       
        
       <div className="genericHeader">
                <p className="genericTitle">Producer</p>
            </div>
         
    
    <div style={{paddingLeft:"60px", paddingTop:"20px", paddingBottom:"8px"}}>
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
                   return (<tr >
                            
                                <td scope="row">{<NavLink style={{ textDecoration: 'none', color:"#000", color:"black" }} to={{
                                pathname:("/producers/details"),
                                aboutProps:e
                                }}>{e.name}</NavLink>}</td>
                           
                            <td scope="row">{e.email}</td>
                            <td scope="row">{e.phone}</td>
                            <td scope="row">{(quotes.filter(f=>f.UserId==e.UserId)).filter(g=>g.QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()[0].Status!=="Cancelled"&&g.QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()[0].Status!=="Quoted").length}</td>
                            <td scope="row">{(quotes.filter(f=>f.UserId==e.UserId)).filter(g=>g.QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()[0].Status=="Cancelled"||g.QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()[0].Status=="Quoted").length}</td>
                            
                        </tr>)
               })
               
               
            }

        </tbody>
        </table>
</div>
        <div style={{position:"absolute", right:"50px", top:"100px", display:"flex"}}>
            <NavLink to="/manager/managerP"  style={{ textDecoration: 'none', color:"#000" }}>
                 <button className="PAYbutton" ><MdAdd  color="white" size={"20px"} className="PAYbuttonIcon"/><p className="PAYbuttonText">New Producer</p></button>
            </NavLink>
            </div>

    </div>
    )
}

export default Producer