import React, { useEffect, useState } from "react";
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
import MyDocument from "./PDF/prueba";
import ReactPDF, { PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import Chart from "react-google-charts";
import mask from "../assets/mask.png"
import useGoogleCharts from '../chart/useGoogleCharts';
import PizzaChart from "../chart/ProducersChart"
import PozzaChart from "../chart/ColumnChar";
import axios from "axios";
import Isologo_background from  "../assets/Isologo_background.png"
import { NavLink } from "react-router-dom";



const AdminDash = ()=>{
   const [next, setNext] = useState(false)
   const [asd, setAsd] = useState(false)
   const google = useGoogleCharts();
   const [producers, setProducers]= useState([])
   const [quotes, setQuotes]= useState([])
   const [modify, setModify]= useState([])
    const [dataList, setDataList] = useState([])
    const [status, setStatus] = useState([])
    const [sold, setSold] = useState([])
    const [unSold, setUnSold] = useState([])
    const [payments, setPayments]=useState([])

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
        axios.get(`https://truewayagentbackend.com/getStatus`)
            .then(function(response){
                let paz = response.data
                paz.sort(function(a,b){return a.id-b.id}).reverse()
                setStatus(paz)
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
        axios.get(`https://truewayagentbackend.com/getpayments`)
            .then(function(response){
                setPayments(response.data)
            
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

       useEffect(() => {
           let pes = []
           let quo = quotes
           
           
           let q = modify
         producers.map(e=>
            pes.push([e.name,(q.filter(f=>(f.User.name==e.name&&f.Status!=="Quoted"&&f.Status!=="Cancelled"))).length, quo.filter(i=>i.User.name==e.name).length,e])
         )
         pes.sort(function(a,b){return (a[1]/a[2])-(b[1]/b[2])}).reverse()
         setDataList(pes)
       }, [modify])
       useEffect(() => {
        let pes = 0
        let pas = 0
        let q = quotes
        quotes.map(e=>{
            if(e.QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()[0].Status!=="Quoted"&&e.QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()[0].Status!=="Cancelled"){
                pes=pes+1
            }
        else{
                pas=pas+1
            } 
        } 
      )
      setSold(pes)
      setUnSold(pas)
    }, [quotes])
       

   

    const handleNext = (e) =>{
        setNext(!next)
            e.preventDefault();
        }
  

    return(
            <div className="genericDiv">
                 <div className="genericHeader">
                  <p className="genericTitle">Dashboard</p>
                  
            </div>
            {!next?
            <div className="DashContainer">
                <div className="DashSubCont" >
               <div style={{marginLeft:"-100px"}}>
                {google&&   <PizzaChart 
                
                google={google}/>}
            </div>
            <div className="DashPList1">
                <div className="DashPListHeader">
                    <p className="DashPListTitle">Sellers average sale</p>
                    <p className="DashPListSTitle">Descending</p>
                </div>
                <div className="DashPListDivider"/>
                {dataList.map(e=>{
                    return (
                        <div className="DashPListRow1" style={{marginBottom:"7px"}}>
                            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                            <div className="DashPListCircle">
                            <NavLink style={{ textDecoration: 'none', color:"#000", color:"black" }} to={{
                                pathname:("/producers/details"),
                                aboutProps:e[3]
                                }}><img src={mask}/></NavLink> 
                            </div>
                            
                            <p className="DashPListItemText"><NavLink style={{ textDecoration: 'none', color:"#000", color:"black" }} to={{
                                pathname:("/producers/details"),
                                aboutProps:e[3]
                                }}>{e[0]}</NavLink></p>
                            </div>
                            <div className="DashNumberDiv">
                                 <p className="DashNumber">{(e[1]/e[2])?(e[1]/e[2]):0}</p> 
                            </div>
                        </div>
                    )
                })}
            </div>  

       </div>
       <div className="dashContCard">
                        <div className="dashCard">
                        <div className="dashCircle" style={{backgroundColor:" rgba(255, 184, 0, 0.07)"}}>
                                <img src={error}/>
                             
                            </div>
                            <div className="dashText" >
                                    <p className="dashCardTitle">{unSold}</p>
                                    <p className="dashCardText">Unsold quotes</p>
                            </div>
                        </div>
                        <div className="dashCard" style={{marginLeft:"50px"}}>
                          <div className="dashCircle" style={{backgroundColor:" rgba(76, 184, 255, 0.07)"}}>
                                <img src={wbill}/>
                             
                            </div>
                            <div className="dashText">
                                    <p className="dashCardTitle">{sold}</p>
                                    <p className="dashCardText">Total quotes sold per month</p>
                            </div>
                        </div>
                        <div className="dashCard"  style={{marginLeft:"50px"}}>
                            <div className="dashCircle" style={{backgroundColor:" rgba(76, 184, 255, 0.07)"}}>
                                <img src={wbill}/>
                             
                            </div>
                            <div className="dashText">
                                    <p className="dashCardTitle">{sold}</p>
                                    <p className="dashCardText">Total quotes sold per year</p>
                            </div>
                        </div>
                        <div className="dashCard" style={{marginLeft:"50px"}}>
                            <div className="dashCircle" style={{backgroundColor:" rgba(8, 76, 97, 0.07)"}}>
                                <img src={bbill}/>
                             
                            </div>
                            <div className="dashText">
                                    <p className="dashCardTitle">{payments.length}</p>
                                    <p className="dashCardText">Total payments per month</p>
                            </div>
                        </div>
                    </div>
                

            </div>
            :
            <div className="DashContainer">
                <div className="DashSubCont" style={{justifyContent:"space-between", paddingRight:"40px"}}>
                
                {google&& 
                <PozzaChart
                google={google}
                />}
                <div className="DashStatusCont">
                    <div className="DashStatusHeader">
                        <p className="DashPListTitle">Notification of modified policies</p>
                    </div>
                    <div className="DashStatusColumns">
                        <p className="dashListColumnT">QUOTE ID</p>
                        <p className="dashListColumnT">CUSTOMER</p>
                        <p className="dashListColumnT">DATE</p>
                        <p className="dashListColumnT">STATUS</p>
                    </div>
                    <div className="DastStatusBody">
                    {
                        status.length?
                        status.map(e=>{
                            return(
                                <div className="DashStatusRow">
                                    <p className="DashStatusItem"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/report/quote",aboutProps:{ID:e.Quote.id}}}>{e.id}</NavLink></p>
                                    <p className="DashStatusItem"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/report/quote",aboutProps:{ID:e.Quote.id}}}>{e.User.name}</NavLink></p>
                                    <p className="DashStatusItem"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/report/quote",aboutProps:{ID:e.Quote.id}}}>{e.date}</NavLink></p>
                                    <div style={{width:"25%"}}>
                                    <div className="DashStatusColor" style={{backgroundColor:e.Status=="Cancelled"?"#D14343":e.Status=="Sold"?"#14B8A6":e.Status=="Renew down"?"#FFB020": "#14B8A6"}}>
                                    <p className="DashStatusItemC"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/report/quote",aboutProps:{ID:e.Quote.id}}}>{e.Status}</NavLink></p></div></div>
                                </div>
                            )
                        })
                    : <div></div>
                    }</div>
                </div>
                </div>
            </div>}
            {!next?
            <BsChevronRight color="grey" style={{minWidth:"40px", minHeight:"40px", position:"absolute", right:"1%",top:"50%", alignSelf:"flex-start"}} onClick={handleNext}/>
            :
            <BsChevronLeft color="grey" style={{minWidth:"40px", minHeight:"40px", position:"absolute", right:"1%",top:"50%", alignSelf:"flex-start"}} onClick={handleNext}/>}
            
            </div>
    
   )
}

export default AdminDash








  {/* {google&&                <PozzaChart
         google={google}
      
        />}
         */}
           {/* {!next?
            <div className="DashContainer">
                <div className="DashSubContainer">
     
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
                            <div className="dashText" >
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
{google&&                <PozzaChart
         google={google}
      
        />}
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
                <BsChevronRight color="grey" style={{minWidth:"40px", minHeight:"40px", position:"absolute", right:"2%",top:"50%", alignSelf:"flex-start"}} onClick={()=>setNext(!next)}/>

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
                <BsChevronLeft color="grey" style={{minWidth:"40px", minHeight:"40px", position:"absolute", right:"2%", top:"50%" ,alignSelf:"flex-start"}} onClick={()=>setNext(!next)}/>
            </div>
            
            
            
            
            
        
        
        }
            */}

