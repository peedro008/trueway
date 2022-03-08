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
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ProducerDash = ()=>{
    const userId = useSelector(state=> state.UserId) 
    const [next, setNext] = useState(false)
    const [asd, setAsd] = useState([])
    const google = useGoogleCharts();
    const [producers, setProducers]= useState([])
   
    const [pquotes, setPquotes]= useState([])

    const [quotes2, setQuotes2]= useState([])
    const [uQuotes, setUQuotes]= useState(0)
    const [sQuotes, setSQuotes]= useState(0)
     const [dataList, setDataList] = useState([])
     const [status, setStatus] = useState([])
     const [payments, setPayments] = useState([]) 
     useEffect (()=>{
        axios.get(`http://trueway-env.eba-j5wkwmpy.us-east-1.elasticbeanstalk.com/producerQuotes?UserId=${userId}`)
        .then(function(response){
            setPquotes(response.data)
           
            
            
        })
        .catch(error=>{
          console.log(error)  
        })
    },[userId])
     useEffect(()=>{
         axios.get(`http://trueway-env.eba-j5wkwmpy.us-east-1.elasticbeanstalk.com/getPayments`)
             .then(function(response){
                 setPayments(response.data)
                 
             
                 
             })
            
             .catch(error=>{
               console.log(error)  
             })
     
     },[])
 
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
                   
                    setQuotes2(response.data)
                    
                })
                .catch(error=>{
                  console.log(error)  
                })
        
        },[])
        useEffect(()=>{
            let pes = quotes2
            let pas = pes.filter(e=>e.QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()[0].Status=="Quoted"||
            e.QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()[0].Status=="Cancelled")
            setStatus(pas)
        },[quotes2])
        useEffect(()=>{
     
         let pes = []
         pquotes.map(e=>{
             let a = e.QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()[0].Status
             pes.push(a)
         })
         setAsd(pes)
         
     
         
     },[pquotes])
 
 
        useEffect(() => {
         let pes = 0
         let pas = 0
       asd.map(e=>{
          if(e=="Quoted"||e=="Cancelled"){ pes=pes+1}
          else{ pas=pas+1}
         })
         setSQuotes(pas)
         setUQuotes(pes)
         
     }, [asd])
 
        useEffect(() => {
            let pes = []
          producers.map(e=>{
            let qa = quotes2.filter(f=>f.User.name==e.name)
            let stat = qa.map(e=> e.QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()[0].Status)
            
             pes.push([e.name,stat])}
          )
          setDataList(pes)
          console.log("BBBBBBBBBBBBBBBBBBBBBBBB", status)
        }, [quotes2, producers])
    
    
 
   
 
     return(
             <div className="genericDiv">
                  <div className="genericHeader">
                   <p className="genericTitle">Dashboard</p>
                   
             </div>
            
             <div className="DashContainer">
                 <div className="DashSubCont1">
                 <div className="DashStatusCont1">
                     <div className="DashStatusHeader">
                         <p className="DashPListTitle">Usold Quotes</p>
                     </div>
                     <div className="DashStatusColumns">
                         <p className="dashListColumnT1">Client Name</p>
                         <p className="dashListColumnT1">Company</p>
                         <p className="dashListColumnT1">Monthly Payments</p>
                         <p className="dashListColumnT1">Down</p>
                         <p className="dashListColumnT1">Date</p>
                         <p className="dashListColumnT1">Quoted by</p>
                       
                       
                     </div>
                     <div className="DastStatusBody">
                     {
                         status.length?
                         status.map(e=>{
                             return(
                                 <div className="DashStatusRow">
                                     <p className="DashStatusItem1" ><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Client.name.substring(0,15)}</NavLink></p>
                                     <p className="DashStatusItem1"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Company.name}</NavLink></p>
                                     <p className="DashStatusItem1"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.monthlyPayment}</NavLink></p>
                                     <p className="DashStatusItem1"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.down}</NavLink></p>
                                     <p className="DashStatusItem1"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.date}</NavLink></p>
                                     <p className="DashStatusItem1"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.User.name}</NavLink></p>
                                  
                                 </div>
                             )
                         })
                     : <div></div>
                     }</div>
                 </div>
             <div className="DashPList1">
                 <div className="DashPListHeader">
                     <p className="DashPListTitle">Sellers average sale</p>
                     <p className="DashPListSTitle">Descending</p>
                 </div>
                 <div className="DashPListDivider"/>
                 {dataList.map(e=>{
                     return (
                         <div className="DashPListRow1">
                             <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                             <div className="DashPListCircle">
                                <img src={mask}/> 
                             </div>
                             <p className="DashPListItemText">{e[0]}</p>
                             </div>
                             <div className="DashNumberDiv">
                                 <p className="DashNumber">{(e[1].filter(e=>e!=="Quoted"&&e!=="Cancelled")).length?((e[1].filter(e=>e!=="Quoted"&&e!=="Cancelled")).length/(e[1].length)):0}</p>
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
                                     <p className="dashCardTitle">{uQuotes&&uQuotes}</p>
                                     <p className="dashCardText">Usold quotes</p>
                             </div>
                         </div>
                         <div className="dashCard" style={{marginLeft:"50px"}}>
                           <div className="dashCircle" style={{backgroundColor:" rgba(76, 184, 255, 0.07)"}}>
                                 <img src={wbill}/>
                              
                             </div>
                             <div className="dashText">
                                     <p className="dashCardTitle">{sQuotes}</p>
                                     <p className="dashCardText">Total quotes sold per month</p>
                             </div>
                         </div>
                         <div className="dashCard"  style={{marginLeft:"50px"}}>
                             <div className="dashCircle" style={{backgroundColor:" rgba(76, 184, 255, 0.07)"}}>
                                 <img src={wbill}/>
                              
                             </div>
                             <div className="dashText">
                                     <p className="dashCardTitle">{sQuotes}</p>
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
            
            
             
             </div>
     
    )
}

export default ProducerDash