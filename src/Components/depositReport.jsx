import axios from "axios";
import React, {  useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { AiOutlineCloseCircle, AiOutlineFilter } from "react-icons/ai";
import close from "../assets/close.svg"
import Select from 'react-select'

const DepositReportComponent = ({
    deposits,
depositsFil,
closeCloud,
filterSubmit,
setDepositsFil,
locations,
filteredQuotes,
setFilteredQuotes,
openFilter,
setOpenFilter,
filterValues,
setFilterValues,
filterCheck,
setFilterCheck,
}) => {

    return(
        <div className="genericDiv1">
             
             <div className="genericHeader">
                <p className="genericTitle">Deposit Report</p>
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
            

               
                <div
        style={{
          cursor:'pointer',
          position: "fixed",
          right: "50px",
          top: "85px",
          display: "flex",
        }}
      >
        <AiOutlineFilter
          color="#2b4162"
          size={"40px"}
          onClick={() => setOpenFilter(!openFilter)}
        />
      </div>
      </div>
           <table class="table2" style={{width: '90vw'}}>
      
        <tbody>
            <tr>
                
                <th scope="col" className="column1"><p   className="REPtype2">Location</p></th>
                <th scope="col" className="column1"><p   className="REPtype2">Total Deposit</p></th>
                <th scope="col" className="column1"><p   className="REPtype2">Total Sold</p></th>
                <th scope="col" className="column1"><p   className="REPtype2">Difference $</p></th>
                <th scope="col" className="column1"><p   className="REPtype2">Date</p></th>
                <th scope="col" className="column1"><p   className="REPtype2">Payments amount</p></th>
                <th scope="col" className="column1"><p   className="REPtype2">User</p></th>
                <th scope="col" className="column1"><p   className="REPtype2">Notes</p></th>
                {/* <th scope="col" className="column1"><p   className="REPtype">PDF</p></th> */}
             
            </tr>
            {
               
               depositsFil&&
                   
            depositsFil.sort(function(a,b){return b.id-a.id}).map((e)=>{
                   let sumTotalSold = 0
                   e.Payments.map(f => sumTotalSold = sumTotalSold + Number(f.amount))
                   let colorDif = 'ClientNameGreen'
                   if(e.total - sumTotalSold > -0.01) {colorDif = 'ClientNameGreen'} else {colorDif = 'ClientNameRed'}
                   return (
                        <tr>
                           
                            <td className="ClientName" scope="row">{e.Location.name}</td>  
                            <td className="ClientName" scope="row">$ {e.total}</td>  
                            <td className="ClientName" scope="row">$ {sumTotalSold}</td>  
                            <td className={colorDif} scope="row">$ {e.total - sumTotalSold }</td>  
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
            <BsChevronLeft color="grey"     cursor='pointer' style={{minWidth:"30px", minHeight:"30px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
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
                    
                    LocationId:!filterCheck.LocationId,
                    date:false,
                    })}/>
                <p className="FilterComText">Location</p>
            </div>
            {
                filterCheck.LocationId&&
                <div className="FilterComRow"><Select options={locations.map(e=>({value:e.id,label:e.name}))} onChange={(e)=>setFilterValues({...filterValues, LocationId:e.value})}  className="PAYselect"/></div>
            }
            
        
            
             
        </div>}
        </div>
    )
}
export default DepositReportComponent
