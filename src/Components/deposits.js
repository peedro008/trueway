import axios from "axios";
import React, {  useEffect, useState } from "react";
import SearchField from "react-search-field";
import { BsChevronLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import MyDocument from "./PDF/daily";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { PDFDownloadLink } from "@react-pdf/renderer";
import moment from "moment";
import close from "../assets/close.svg"
import Select from 'react-select'
import { Divider } from "@mui/material";
const Deposits = () => {
    const [paymentsFil, setPaymentsFil] = useState([])
    const [openFilter, setOpenFilter] = useState(false)
    const [payments, setPayments] = useState([]) 
    const [search, setSearch] = useState("")
    const [dateF, setDateF] = useState([])
    const [filteredQuotes, setFilteredQuotes] = useState(false)
    const [YYYY1, setYYYY1] = useState(0)
    const [YYYY2, setYYYY2] = useState(0)
    const [MM1, setMM1] = useState(0)
    const [MM2, setMM2] = useState(0)
    const [DD1, setDD1] = useState(0)
    const [DD2, setDD2] = useState(0)
    const [locations, setLocations] = useState([])
  
    const [filterValues, setFilterValues ] = useState({
        dateFrom:null,
         LocationId:null,
    })
    const [filterCheck, setFilterCheck ] = useState({
        date:false,
        LocationId:false,
        
    })
    useEffect(()=>{
        axios.get(`http://localhost:8080/getLocations`)
            .then(function(response){
                setLocations(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    useEffect(()=>{
        axios.get(`http://localhost:8080/getdeposit`)
            .then(function(response){
                setPayments(response.data)
                
            
                
            })
           
            .catch(error=>{
              console.log(error)  
            })
    
    },[setPayments])
  
    const filterSubmit = (e) => {
        let temp = payments
        console.log(temp)
        if(e.dateFrom&&e.dateTo){
            temp=temp.filter(h=>moment(`${h.date}`).isBetween(`${e.dateFrom}`,`${e.dateTo}`, undefined, '[]'))
        }
       
        if(e.LocationId){
            temp=temp.filter(h=>h.LocationId==e.LocationId)
        }
       
        setPaymentsFil(temp)
       
        
        
    }
    useEffect(()=>{ 
        filterSubmit(filterValues)
    },[filterValues,payments])
    const closeCloud = (e)=>{
        setFilterValues(e)
         }
    return(
        <div className="genericDiv1">
             
             <div className="genericHeader">
                <p className="genericTitle">Deposits</p>
            </div>
            <div className="REPcontrol">
            <div className="REPDate">
         {
                 filterValues.dateFrom&&filterValues.dateTo&&
                 <div className="cloudFilter">
                     <p className="cloudFilterText">From:&nbsp;<strong>{filterValues.dateFrom}</strong></p>
                     <p className="cloudFilterText"style={{marginLeft:"5px"}}>To:&nbsp;<strong>{filterValues.dateTo}</strong></p>
                     
                     <img src={close} style={{marginLeft:"5px"}} onClick={()=>{closeCloud({...filterValues,dateFrom:null, dateTo:null})}}/>
                     </div>
             }
             {
                 filterValues.LocationId&&
                 <div className="cloudFilter">
                     <p className="cloudFilterText">Location:{locations.find(c => c.id ==  filterValues.LocationId).name}
                     </p>
                     <img src={close} style={{marginLeft:"5px"}} onClick={()=>{closeCloud({...filterValues,LocationId:null})}}/>
                     </div>
             }


             </div>
             <div className="FilterButtoN" onClick={()=>setOpenFilter(!openFilter)}/>

                </div>
           <table class="table2">
      
        <tbody>
            <tr>
                
                <th scope="col" className="column1"><p   className="REPtype">Location</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Total</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Date</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Payments amount</p></th>
                <th scope="col" className="column1"><p   className="REPtype">User</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Notes</p></th>
                {/* <th scope="col" className="column1"><p   className="REPtype">PDF</p></th> */}
             
            </tr>
            {
               
               paymentsFil&&
                   
            paymentsFil.sort(function(a,b){return b.id-a.id}).map((e)=>{
                   
                   return (
                        <tr>
                           
                            <td className="ClientName" scope="row">{e.Location.name}</td>  
                            <td className="ClientName" scope="row">${e.total}</td>  
                            <td className="ClientName" scope="row">{e.date}</td>
                            <td className="ClientName" scope="row">{e.Payments.length} Payments</td> 
                            <td className="ClientName" scope="row">{e.User.name}</td>
                            <td className="ClientName" scope="row">{e.note}</td>
                 
                        </tr>
                     
                     
                     
                     
                     )
                     
                    
                    })
                }
                        
                        
                
        
        </tbody>
            </table>
            <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
            {openFilter&&  
        <div className="FilterCom">
            <div className="FilterComTitleD">
                <p className="FilterComTitle" >Search</p> 
                <AiOutlineCloseCircle size="20px" style={{color:"#787d84", cursor:"pointer"}} onClick={()=>setOpenFilter(false)}/>
            </div>
            <Divider style={{backgroundColor:"#EBEFF2", height:"1px", borderWidth:"0px",  width:"300px" }}/>
            <div className="FilterComRow">
                <input type={"checkbox"} checked={filterCheck.date} onChange={(e)=>setFilterCheck({
                    date:!filterCheck.date,
                    LocationId:false,
                   })}/>
                <p className="FilterComText">Date</p>
            </div>
            {
                filterCheck.date&&
                <>
                <p className="REPtype"style={{marginLeft:"15px",color:"black", fontWeight:700}}>From</p>
                <div className="FilterComRow"><input type="date"  onChange={(e)=>setFilterValues({...filterValues, dateFrom:e.target.value})}  className="PAYselect" style={{border:"1px solid #D6E4EC", padding:"5px"}}/></div>
                <p className="REPtype" style={{marginLeft:"15px",color:"black", fontWeight:700}}>to</p>
                <div className="FilterComRow"><input type="date"  onChange={(e)=>setFilterValues({...filterValues, dateTo:e.target.value})}  className="PAYselect" style={{border:"1px solid #D6E4EC", padding:"5px"}}/></div>
                </>
            }
                        
          
            <div className="FilterComRow">
                <input type={"checkbox"}checked={filterCheck.LocationId} onChange={(e)=>setFilterCheck({ 
                    
                    LocationId:!filterCheck.LocationId,
                    date:false,
                    })}/>
                <p className="FilterComText">Location</p>
            </div>
            {
                filterCheck.LocationId&&
                <div className="FilterComRow"><Select options={locations.map(e=>({value:e.id,label:e.name}))} onChange={(e)=>setFilterValues({...filterValues, LocationId:e.value})}  className="PAYselect"/></div>
            }
            
        
            
            <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <button onClick={()=>filterSubmit(filterValues)} className="FilterComButton">Apply Filters</button></div>
        </div>}
        </div>
    )
}
export default Deposits

{/* <PDFDownloadLink style={{textDecoration:"none", color:"black"}} document={<MyDocument data={{payments:e.Payments, producers:producers, date: e.date}}/>} fileName="Receipt"> 
<VscFilePdf className='pdfIcon' size={"20px"} /></PDFDownloadLink></td>        */}