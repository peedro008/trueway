import React, { useEffect, useState } from "react";
import axios from "axios"
import {MdAdd} from "react-icons/md"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import "./CSS/css.css"
const Managers = ()=>{
const [managers, setManagers]= useState([])
const [quotes, setQuotes]= useState([])
const [sold, setSold]= useState(0)
const [unSold, setUnSold]= useState(0)  
const [modify, setModify]= useState([])
 
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getManager`)
            .then(function(response){
                setManagers(response.data)
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
                <p className="genericTitle">Manager</p>
            </div>
         
    
    <div style={{paddingLeft:"60px", paddingTop:"20px", paddingBottom:"8px"}}>
    <p className="PRsubtitle">Manager list</p>
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
               managers.map((e)=>{
                   return (<tr >
                            
                                <td scope="row">{<NavLink style={{ textDecoration: 'none', color:"#000", color:"black" }} to={{
                                pathname:("/users/manager/details"),
                                aboutProps:e
                                }}>{e.name}</NavLink>}</td>
                           
                            <td scope="row">{e.email}</td>
                            <td scope="row">{e.phone}</td>
                            <td scope="row">{(modify.filter(f=>f.UserId==e.UserId&&f.Status!=="Quoted"&&f.Status!=="Cancelled")).length}</td>
                            <td scope="row">{(quotes.filter(f=>f.UserId==e.UserId)).filter(g=>g.QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()[0].Status=="Cancelled"||g.QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()[0].Status=="Quoted").length}</td>
                            
                        </tr>)
               })
               
               
            }

        </tbody>
        </table>
</div>
        <div style={{position:"absolute", right:"50px", top:"76px", display:"flex"}}>
            <NavLink to="/manager/managerM"  style={{ textDecoration: 'none', color:"#000" }}>
                 <button className="PAYbutton" ><MdAdd  color="white" size={"20px"} className="PAYbuttonIcon"/><p className="PAYbuttonText">New Manager</p></button>
            </NavLink>
            </div>
            <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
    </div>
    )
}

export default Managers