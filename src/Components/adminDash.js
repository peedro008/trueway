import React, { useState } from "react";
import dashGraph from "../assets/dashGraph.png"
import dashGraph1 from "../assets/dashGraph1.png"
import dashList1 from "../assets/dashList1.png"
import dashList2 from "../assets/dashList2.png"
import head from "../assets/head.png"
import atom from "../assets/atom.png"
import error from "../assets/error.png"
import wbill from "../assets/wbill.png"
import bbill from "../assets/bbill.png"
import arrowup from "../assets/arrowup.png"
import {BsChevronRight, BsChevronLeft} from "react-icons/bs"

const AdminDash = ()=>{
   const [next, setNext] = useState(false)
    return(
            <div className="genericDiv">
                 <div className="genericHeader">
                  <p className="genericTitle">Dashboard</p>
            </div>
            
           {!next?
            <div className="DashContainer">
                <div className="DashSubContainer">
                    <img src={dashGraph} style={{height:"240px"}}/>
                    <div className="dashContCard">
                        <div className="dashCard">
                            <div className="dashCircle" style={{backgroundColor:" rgba(113, 59, 219, 0.05)"}}>
                                <img src={head}/>
                             
                            </div>
                            <div className="dashText">
                                    <p className="dashCardTitle">32</p>
                                    <p className="dashCardText">Sellers</p>
                            </div>

                        </div>
                        <div className="dashCard" style={{marginLeft:"20px"}}>
                        <div className="dashCircle" style={{backgroundColor:" rgba(51, 214, 159, 0.07)"}}>
                                <img src={atom}/>
                             
                            </div>
                            <div className="dashText">
                                    <p className="dashCardTitle">6.8</p>
                                    <p className="dashCardText">Average sales per day</p>
                            </div>
                        </div>
                    </div>
                    <div className="dashContCard">
                        <div className="dashCard">
                        <div className="dashCircle" style={{backgroundColor:" rgba(255, 184, 0, 0.07)"}}>
                                <img src={error}/>
                             
                            </div>
                            <div className="dashText">
                                    <p className="dashCardTitle">26</p>
                                    <p className="dashCardText">Usold quotes</p>
                            </div>
                        </div>
                        <div className="dashCard" style={{marginLeft:"20px"}}>
                          <div className="dashCircle" style={{backgroundColor:" rgba(76, 184, 255, 0.07)"}}>
                                <img src={wbill}/>
                             
                            </div>
                            <div className="dashText">
                                    <p className="dashCardTitle">167</p>
                                    <p className="dashCardText">Total quotes sold per month</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="DashSubContainer" style={{paddingLeft:"40px"}}>
                <div style={{backgroundColor:"white", height:"100%", borderRadius:"8px 8px 0px 0px ", height:"35px",  justifyContent:"center", display:"flex", flexDirection:"column"}}>
                    <p className="dashTitle">Lastest quotes</p>
                </div>
                <img src={dashList1} style={{height:"320px", backgroundColor:"white", borderRadius:"0px 0px 8px 8px "}} />
                <div className="dashContCard">
                        <div className="dashCard">
                            <div className="dashCircle" style={{backgroundColor:" rgba(76, 184, 255, 0.07)"}}>
                                <img src={wbill}/>
                             
                            </div>
                            <div className="dashText">
                                    <p className="dashCardTitle">460</p>
                                    <p className="dashCardText">Total quotes sold per year</p>
                            </div>
                        </div>
                        <div className="dashCard" style={{marginLeft:"20px"}}>
                            <div className="dashCircle" style={{backgroundColor:" rgba(8, 76, 97, 0.07)"}}>
                                <img src={bbill}/>
                             
                            </div>
                            <div className="dashText">
                                    <p className="dashCardTitle">330</p>
                                    <p className="dashCardText">Total payments per month</p>
                            </div>
                        </div>
                    </div>
                </div>
                <BsChevronRight color="grey" style={{minWidth:"40px", minHeight:"40px", position:"absolute", right:"30px", alignSelf:"flex-start"}} onClick={()=>setNext(!next)}/>

            </div>
            :
            <div className="DashContainer" >
               <div>
                <img src={dashList2} style={{ height:"300px", backgroundColor:"white", borderRadius:"8px "}} />
                <div className="dashContCard" style={{marginTop:"50px"}}>
                    <div className="dashCard">
                            <div className="dashCircle" style={{backgroundColor:"rgba(76, 184, 255, 0.07)"}}>
                                <img src={arrowup}/>
                             
                            </div>
                            <div className="dashText">
                                    <p className="dashCardTitle">10</p>
                                    <p className="dashCardText">Renewal per month</p>
                            </div>
                    </div>
                    <div className="dashCard" style={{marginLeft:"55px"}}>
                         <div className="dashCircle" style={{backgroundColor:" rgba(76, 184, 255, 0.07)"}}>
                                <img src={wbill}/>
                             
                            </div>
                            <div className="dashText">
                                    <p className="dashCardTitle">460</p>
                                    <p className="dashCardText">Total quotes sold per year</p>
                            </div>
                    </div>
                        
                </div>
                   
               
               
               </div>
            
            
            <div>
                <div style={{ borderRadius:"8px ",backgroundColor:"white",marginLeft:"70px", display:"flex", height:"310px", width:"200px", alignItems:"center", paddingTop:"10px", flexDirection:"column"}}>
                    <div style={{textAlign:"left", width:"100%"}}>
                    <p  className="dashTitleGraph">Sales per Month</p>
                   </div>
                    <img src={dashGraph1} style={{height:"240px"}}/>
                </div>
                <div className="dashContCard" style={{marginTop:"35px"}}>
                        <div className="dashCard">
                            <div className="dashCircle" style={{backgroundColor:" rgba(76, 184, 255, 0.07)"}}>
                                <img src={wbill}/>
                             
                            </div>
                            <div className="dashText">
                                    <p className="dashCardTitle">460</p>
                                    <p className="dashCardText">Total quotes sold per year</p>
                            </div>
                        </div>
                       
                        
                    </div>
              </div>  
                <BsChevronLeft color="grey" style={{minWidth:"40px", minHeight:"40px", position:"absolute", right:"30px" ,alignSelf:"flex-start"}} onClick={()=>setNext(!next)}/>
            </div>
            
            
            
            
            
        
        
        }
           



            </div>
   )
}

export default AdminDash