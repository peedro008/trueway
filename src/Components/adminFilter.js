import React, {useEffect, useState} from "react";

import { NavLink } from "react-router-dom";
import "./CSS/css.css"
import {BiPencil} from "react-icons/bi"

const AdminFilter =()=>{

  const[columns, setColumns]= useState({})  
  
  useEffect(()=>{
      setColumns({
        clientName:true,
        clientEmail:true,
        clientTel:true,
        CompanyId:true,
        ProducerId:true,
        down:true,
        monthlyPayment:true,
        dealer:true,
   
        NSD:true,
  
        PIP:true,

        MVR:true,
        location:true,
        bound:true,
        notes:true,
        renewDown:true,
        creditCardFee:true,
        category:true
  })
  },[])
  
    return(
        <div className="genericDiv">
             
             <div className="genericHeader">
                  <p className="genericTitle">Reportes</p>
            </div>
             
               
                <div className="FITcontainer">
                
                        <p className="FITfilter">Filtrar por:</p>
                    
                    <div style={{flexDirection:"row", display:"flex", paddingLeft:"40px", marginTop:"10px"}}>
                        <div style={{ display:"flex", flexDirection:"column", marginRight:"50px"}}>
                            <div className="FITind">
                                <input class="checkbox" style={{display:"flex", marginRight:"15px", marginBottom:"3px"}} type="checkbox" checked={columns.clientName} key="clientId" name="clientId" onChange = {() => setColumns({...columns,clientName:!columns.clientName})}/>
                                <div><p   className="FITtype">Client name</p></div>
                            
                            </div>
                            <div  className="FITind">
                                <input class="checkbox" style={{display:"flex", marginRight:"15px", }} type="checkbox" checked={columns.clientEmail} key="clientEmail" name="clientEmail" onChange = {() => setColumns({...columns,clientEmail:!columns.clientEmail})}/>
                               
                               
                                <p className="FITtype">Client E-mail</p>
                            
                            </div>
                            <div  className="FITind">
                                <input class="checkbox" style={{display:"flex", marginRight:"15px", marginBottom:"3px"}} type="checkbox" checked={columns.clientTel} key="clientTel" name="clientTel" onChange = {() => setColumns({...columns,clientTel:!columns.clientTel})}/>
                                <p className="FITtype">Client phone</p>
                            
                            </div>
                            <div className="FITind">
                                <input class="checkbox"  style={{display:"flex", marginRight:"15px", marginBottom:"3px"}} type="checkbox" checked={columns.CompanyId} key="CompanyId" name="CompanyId" onChange = {() => setColumns({...columns,CompanyId:!columns.CompanyId})}/>
                                <p className="FITtype">Company</p>
                            
                            </div>
                            <div className="FITind">
                                <input class="checkbox" class="checkbox" style={{display:"flex", marginRight:"15px", marginBottom:"3px"}} type="checkbox" checked={columns.ProducerId} key="ProducerId" name="ProducerId" onChange = {() => setColumns({...columns,ProducerId:!columns.ProducerId})}/>
                                <p className="FITtype">Producer</p>
                            </div>
                            <div className="FITind">
                                <input class="checkbox" style={{display:"flex", marginRight:"15px", marginBottom:"3px"}}  type="checkbox" checked={columns.monthlyPayment} key="monthlyPayment" name="monthlyPayment" onChange = {() => setColumns({...columns,monthlyPayment:!columns.monthlyPayment})}/>
                                <p className="FITtype">Monthly Payments</p>
                            </div>
                      
                       </div>  
                            
                    <div   style={{ display:"flex", flexDirection:"column", marginRight:"50px"}}>
                        <div style={{ display:"flex", flexDirection:"column", marginRight:"50px"}}>   
                            <div className="FITind">
                                <input class="checkbox" style={{display:"flex", marginRight:"15px", marginBottom:"3px"}}  type="checkbox" checked={columns.down} key="down" name="down" onChange = {() => setColumns({...columns,down:!columns.down})}/>
                                <p className="FITtype">Down Payments</p>
                            
                            </div>
                            
                            <div className="FITind">
                                <input class="checkbox" style={{display:"flex", marginRight:"15px", marginBottom:"3px"}}  type="checkbox" checked={columns.dealer} key="dealer" name="dealer" onChange = {() => setColumns({...columns,dealer:!columns.dealer})}/>
                                <p className="FITtype">Dealer</p>
                            
                            </div>
                            <div className="FITind">
                                <input class="checkbox" style={{display:"flex", marginRight:"15px", marginBottom:"3px"}} type="checkbox" checked={columns.NSD} key="NSD" name="NSD" onChange = {() => setColumns({...columns,NSD:!columns.NSD})}/>
                                <p className="FITtype">NRSD</p>
                            
                            </div>
                            <div className="FITind">
                                <input class="checkbox"  style={{display:"flex", marginRight:"15px", marginBottom:"3px"}} type="checkbox" checked={columns.PIP} key="PIP" name="PIP" onChange = {() => setColumns({...columns,PIP:!columns.PIP})}/>
                                <p className="FITtype">PIP</p>
                            
                            </div> 
                                <div className="FITind">
                                    <input class="checkbox" style={{display:"flex", marginRight:"15px", marginBottom:"3px"}} type="checkbox" checked={columns.MVR} key="MVR" name="MVR" onChange = {() => setColumns({...columns,MVR:!columns.MVR})}/>
                                    <p className="FITtype">MVR</p>
                                    
                                </div>                           
                            <div className="FITind">
                                <input class="checkbox" style={{display:"flex", marginRight:"15px", marginBottom:"3px"}} type="checkbox" checked={columns.location} key="location" name="location" onChange = {() => setColumns({...columns,location:!columns.location})}/>
                                <p className="FITtype">Location</p>
                            </div>

                        </div> 
                    </div> 



                        
                    <div style={{ display:"flex", flexDirection:"column", marginRight:"50px"}}>
                            
                            <div className="FITind">
                                <input class="checkbox" style={{display:"flex", marginRight:"15px", marginBottom:"3px"}}  type="checkbox" checked={columns.bound} key="bound" name="bound" onChange = {() => setColumns({...columns,bound:!columns.bound})}/>
                                <p className="FITtype">Status</p>
                                
                            </div>
                            {/* <div className="FITind">
                                <input class="checkbox" style={{display:"flex", marginRight:"15px", marginBottom:"3px"}} type="checkbox" checked={columns.notes} key="notes" name="notes" onChange = {() => setColumns({...columns,notes:!columns.notes})}/>
                                <p className="FITtype">Notes</p>
                           
                            </div> */}
                            
                            {/* <div className="FITind">
                                <input class="checkbox" className="checkbox" style={{display:"flex", marginRight:"15px", marginBottom:"3px"}} type="checkbox" checked={columns.renewDown} key="renewDown" name="renewDown" onChange = {() => setColumns({...columns,renewDown:!columns.renewDown})}/>
                                <p className="FITtype">Renew down</p>
                            
                            </div>     
                            <div className="FITind">
                                <input class="checkbox" style={{display:"flex", marginRight:"15px", marginBottom:"3px"}} type="checkbox" checked={columns.creditCardFee} key="creditCardFee" name="creditCardFee" onChange = {() => setColumns({...columns,creditCardFee:!columns.creditCardFee})}/>
                                <p className="FITtype">Credit card fee</p>
                            
                            </div> */}
                            <div className="FITind">
                                <input class="checkbox" style={{display:"flex", marginRight:"15px", marginBottom:"3px"}}  type="checkbox" checked={columns.category} key="category" name="category" onChange = {() => setColumns({...columns,category:!columns.category})}/>
                                <p className="FITtype">Category</p>
                            
                            </div>
                       
                       
                    </div>
                    
                </div>
             </div>
                
                <NavLink to={{
                    pathname:("/filter/report"),
                    aboutProps:columns
                }}>
                <button className="FITbutton">
                    <div style={{display:"flex", flexDirection:"row"}}>
                    <BiPencil size="20px" style={{display:"flex", color:"#2B4162", marginLeft:"8px", marginTop:"1px"}}/>
                    <p className="FITbuttonText">Ver Reporte</p>
                    </div>
                </button>
                </NavLink>
        </div>
    )}
    export default AdminFilter
