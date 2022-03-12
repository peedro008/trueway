import axios from "axios";
import React, {  useEffect, useState } from "react";
import SearchField from "react-search-field";
import { BsChevronLeft } from "react-icons/bs";

const PayReport = () => {
    const [payments, setPayments] = useState([]) 
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getPayments`)
            .then(function(response){
                setPayments(response.data)
                
            
                
            })
           
            .catch(error=>{
              console.log(error)  
            })
    
    },[setPayments])
    
    return(
        <div className="genericDiv1">
             
             <div className="genericHeader">
                <p className="genericTitle">Payment reports</p>
            </div>
            <div className="REPcontrol">
            <div className="REPsearch">
         <SearchField 
            classNames="pepe"
            placeholder='Search item'
            
        /></div>
         <div className="REPDate">
             <p className="REPdateText">From</p>
             <input className="REPmonth" placeholder="MM"/>
             <input className="REPday" placeholder="DD"/>
             <input className="REPyear" placeholder="YYYY"/>
             <p className="REPdateText" style={{paddingLeft:"15px"}}>To</p>
             <input className="REPmonth" placeholder="MM"/>
             <input className="REPday" placeholder="DD"/>
             <input className="REPyear" placeholder="YYYY"/>
             <button className="RepSearchButton">Search</button>
         </div>
 

                </div>
           <table class="table2">
      
        <tbody>
            <tr>
                <th scope="col" className="column1"><p   className="REPtype">Client name</p></th>
                <th scope="col" className="column1"><p   className="REPtype">User name</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Location</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Type</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Date</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Amount</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Method</p></th>
                <th scope="col" className="column1"><p className="REPtype">Fee</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Total</p></th>
            </tr>
            {
               payments.reverse().map((e)=>{
                   
                   return (
                        <tr>
                            <td className="ClientName" scope="row">{e.Client.name}</td>
                            <td className="ClientName" scope="row">{e.User.name}</td>           
                            <td className="ClientName" scope="row">{e.Location.name}</td>  
                            <td className="ClientName" scope="row">{e.type}</td>  
                            <td className="ClientName" scope="row">{e.date}</td>
                            <td className="ClientName" scope="row">{e.amount}</td>  
                            <td className="ClientName" scope="row">{e.method}</td> 
                            <td className="ClientName" scope="row">{e.creditCardFee}</td>           
                            <td className="ClientName" scope="row">{e.amount+e.creditCardFee}</td>     
                        
                        </tr>
                     
                     
                     
                     
                     )
                     
                    
                    })
                }
        
        </tbody>
            </table>
            <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"absolute",zIndex:9, left:"80px",top:"18px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
        </div>
    )
}
export default PayReport