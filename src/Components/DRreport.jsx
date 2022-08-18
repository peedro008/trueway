import axios from "axios";
import React, {  useEffect, useState } from "react";
import SearchField from "react-search-field";
import { BsChevronLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import MyDocument from "../PDF/daily";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { PDFDownloadLink } from "@react-pdf/renderer";

import close from "../assets/close.svg"
import Select from 'react-select'
import {FiRefreshCcw} from "react-icons/fi"
import Modal from "react-responsive-modal";
const DRreportComponent = ({deleteConf,
    deletedOne,
    paymentsDelete,
    paymentsFil,
    openFilter,
    locations,
    open,
    filterValues,
    filterCheck,
    setDeleteConf,
    setDeletedOne,
    setPaymentsDelete,
    setPaymentsFil,
    setOpenFilter,
    setLocations,
    setOpen,
    setFilterValues,
    setFilterCheck,
    onCloseModal,
    payments,
    handleDelete,
    handleDeleteModal,
    resetDaily,
    filterSubmit,
    closeCloud}) => {
   
    return(
        <div className="genericDiv1">
             
             <div className="genericHeader">
                <p className="genericTitle">Daily reports</p>
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
                <th scope="col" className="column1"><p   className="REPtype">Reset</p></th>
             
            </tr>
            {
               
               paymentsFil&&
                   
            paymentsFil.sort(function(a,b){return b.id-a.id}).map((e)=>{
                   
                   return (
                        <tr>
                           
                            <td className="ClientName" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/report/DailyReport/details",props:e}}>{e.Location.name}</NavLink></td>  
                            <td className="ClientName" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/report/DailyReport/details",props:e}}>${e.total}</NavLink></td>  
                            <td className="ClientName" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/report/DailyReport/details",props:e}}>{e.date}</NavLink></td>
                            <td className="ClientName" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/report/DailyReport/details",props:e}}>{e.Payments.length} Payments</NavLink></td> 
                            <td className="ClientName" scope="row"  >
                                          <div style={{height:"auto",display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center" }}>
                                            <FiRefreshCcw className='deleteIcon' size={"20px"} onClick={()=>{handleDelete([e.id, e.Payments])}}/>
                                            </div>
                                        </td>
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
            <divider style={{backgroundColor:"#EBEFF2", height:"1px", borderWidth:"0px",  width:"300px" }}/>
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
                     date:false,
                     LocationId:!filterCheck.LocationId,})}/>
                <p className="FilterComText">Location</p>
            </div>
            {
                filterCheck.LocationId&&
                <div className="FilterComRow"><Select options={locations.map(e=>({value:e.id,label:e.name}))} onChange={(e)=>setFilterValues({...filterValues, LocationId:e.value})}  className="PAYselect"/></div>
            }
            
        
            
             
        </div>}
        <Modal open={open} onClose={onCloseModal} center classNames={"modal"} >
                    <div className="modal" style={{minWidth:"250px", alignItems:"center"}}>
                    
                    <FiRefreshCcw color="#14B8A6" size={"50px"} style={{alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
                    <p className="modalText">Type "reset" to confirm </p>
                    <input className='AQinput' onChange={(e)=>setDeleteConf(e.target.value)} style={{marginTop:"12px"}}/>
                
                    <button disabled={deleteConf=="reset"?false:true} className="modalButton" onClick={handleDeleteModal}>Continue</button>
                
                    
                    </div>
            </Modal>
        </div>
    )
}
export default DRreportComponent

{/* <PDFDownloadLink style={{textDecoration:"none", color:"black"}} document={<MyDocument data={{payments:e.Payments, producers:producers, date: e.date}}/>} fileName="Receipt"> 
<VscFilePdf className='pdfIcon' size={"20px"} /></PDFDownloadLink></td>        */}