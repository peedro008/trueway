import React, { useEffect, useState } from "react";
import axios from "axios"
import {MdAdd} from "react-icons/md"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import "./CSS/css.css"
const Producer = ()=>{
const [producers, setProducers]= useState([])
const [quotes, setQuotes]= useState([])
const [sold, setSold]= useState(0)
const [unSold, setUnSold]= useState(0)  
const [modify, setModify]= useState([])
 
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getProducer`)
            .then(function(response){
                setProducers(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/quotes`)
            .then(function(response){
                setQuotes(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getStatus`)
            .then(function(response){
                setModify(response.data)
            
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
                                pathname:("/users/producers/details"),
                                aboutProps:e
                                }}>{e.name}</NavLink>}</td>
                           
                            <td scope="row">{e.email}</td>
                            <td scope="row">{e.phone}</td>
                            <td scope="row">{(modify.filter(f=>f.UserId==e.UserId&&f.Status=="Sold")).length}</td>
                            <td scope="row">{(quotes.filter(f=>f.UserId==e.UserId)).filter(g=>g.QuoteStatuses.sort(function(a,b){return b.id-a.id})[0].Status=="Quoted").length}</td>
                            
                        </tr>)
               })
               
               
            }

        </tbody>
        </table>
</div>
        <div style={{position:"absolute", right:"50px", top:"76px", display:"flex"}}>
            <NavLink to="/manager/managerP"  style={{ textDecoration: 'none', color:"#000" }}>
                 <button className="PAYbutton" ><MdAdd  color="white" size={"20px"} className="PAYbuttonIcon"/><p className="PAYbuttonText">New Producer</p></button>
            </NavLink>
            </div>
            <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
    </div>
    )
}

export default Producer