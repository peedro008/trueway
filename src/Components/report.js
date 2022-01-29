import axios from "axios";
import React, { useEffect, useState } from "react";
import "./CSS/css.css"
import SearchField from 'react-search-field';
import { NavLink } from "react-router-dom";
const Report=(props)=>{
    
    const [quotes, setQuotes]=useState([]) 
    const [pes, setPes]=useState([]) 
    let columns = props.location.aboutProps
    useEffect(()=>{
        axios.get(`http://localhost:4000/quotes`)
            .then(function(response){
                setQuotes(response.data)
                setPes([`${new Date()}`])

                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[setQuotes])
    
    return(
        <div className="genericDiv1">
             
             <div className="genericHeader">
                <p className="genericTitle">Quote reports</p>
            </div>
         <div className="REPcontrol">
         <div className="REPDate">
             <p className="REPdateText">From</p>
             <input className="REPmonth" placeholder="MM"/>
             <input className="REPday" placeholder="DD"/>
             <input className="REPyear" placeholder="YYYY"/>
             <p className="REPdateText" style={{paddingLeft:"15px"}}>To</p>
             <input className="REPmonth" placeholder="MM"/>
             <input className="REPday" placeholder="DD"/>
             <input className="REPyear" placeholder="YYYY"/>
             <button>search</button>
         </div>
         <div className="REPsearch">
         <SearchField 
            classNames="pepe"
            placeholder='Search item'
            
        /></div>

                </div>
           <table class="table1">
      
        <tbody>
            <tr>
            <th scope="col" className="column1"><p   className="REPtype">ID</p></th>
            {columns.clientName&&<th scope="col" className="column1"><p   className="REPtype">Client name</p></th>}
            {columns.clientEmail&&<th scope="col" className="column1"><p className="REPtype">Client E-mail</p></th>}
            {columns.clienTel&&<th scope="col" className="column1"><p className="REPtype">Client phone</p></th>}
            {columns.CompanyId&&<th scope="col" className="column1"><p className="REPtype">Company</p></th>}
            {columns.ProducerId&&<th scope="col" className="column1"><p className="REPtype">Producer</p></th>}
            {<th scope="col" className="column1"><p className="REPtype">Date</p></th>}
            {<th scope="col" className="column1"><p className="REPtype">Time</p></th>}
            {columns.down&&<th scope="col" className="column1"><p className="REPtype">Down Payments</p></th>}
            {columns.monthlyPayment&&<th scope="col" className="column1"><p className="REPtype">Monthly Payments</p></th>}
            {columns.dealer&&<th scope="col" className="column1"><p className="REPtype">Dealer</p></th>}
            {columns.dealer&&<th scope="col" className="column1"><p className="REPtype">Dealer Name</p></th>}
            {/* {columns.NSD&&<th scope="col" className="column1"><p className="REPtype">NRSD</p></th>} */}
            {columns.NSD&&<th scope="col" className="column1"><p className="REPtype">NRSD</p></th>}
            {/* {columns.PIP&&<th scope="col" className="column1"><p className="REPtype">PIP </p></th>} */}
            {columns.PIP&&<th scope="col" className="column1"><p className="REPtype">PIP</p></th>}
            {/* {columns.MVR&&<th scope="col" className="column1"><p className="REPtype">MVR</p></th>} */}
            {columns.MVR&&<th scope="col" className="column1"><p className="REPtype">MVR</p></th>}
            {columns.location&&<th scope="col" className="column1"><p className="REPtype">Location</p></th>}
            {columns.bound&&<th scope="col" className="column1"><p className="REPtype">Bound</p></th>}
            {/* {columns.notes&&<th scope="col" className="column1"><p className="REPtype">Notes</p></th>} */}
            {columns.category&&<th scope="col" className="column1"><p className="REPtype">Category</p></th>}
            {columns.creditCardFee&&<th scope="col" className="column1"><p className="REPtype">Credit card fee</p></th>}
            {columns.renewDown&&<th scope="col" className="column1"><p className="REPtype">Renew down</p></th>}
            </tr>
        
            {
               quotes.map((e)=>{
                   
                   return (<tr>
                            <NavLink style={{textDecoration: 'none'}} to={{pathname:"/quote",aboutProps:{ID:e.id},}}><td className="ID" scope="row">{e.id}</td></NavLink>
                            {columns.clientName&&<td className="ClientName" scope="row">{e.Client.name}</td>}
                            {columns.clientEmail&&<td className="row1" scope="row">{e.Client.email}</td>}
                            {columns.clienTel&&<td className="row1" scope="row">{e.Client.tel}</td>}
                            {columns.CompanyId&&<td className="row1" scope="row">{e.Company.name}</td>}
                            {columns.ProducerId&&<td className="row1" scope="row">{e.Producer.name}</td>}
                            <td className="row1" scope="row">{e.date}</td>
                            <td className="row1" scope="row">{parseInt(e.time.substring(11,13))-5}{e.time.substring(16,19)}</td>
                            {columns.down&&<td className="row1" scope="row">{e.down}</td>}
                            {columns.monthlyPayment&&<td className="row1" scope="row">{e.monthlyPayment}</td>}
                            {columns.dealer&&<td className="row1" scope="row"><p className="row1">{e.dealer==!true?"False":"True"}</p></td>}
                            {columns.dealer&&<td className="row1" scope="row">{e.dealerSalePerson}</td>}
                            {/* {columns.NSD&&<td className="row1" scope="row"><p className="row1">{e.NSD==!true?"False":"True"}</p></td>} */}
                            {columns.NSD&&<td className="row1" scope="row">{e.NSDvalue}</td>}
                            {/* {columns.PIP&&<td className="row1" scope="row"><p className="row1">{e.PIP==!true?"False":"True"}</p></td>} */}
                            {columns.PIP&&<td className="row1" scope="row">{e.PIPvalue}</td>}
                            {/* {columns.MVR&&<td className="row1" scope="row"><p className="row1">{e.MVR==!true?"False":"True"}</p></td>} */}
                            {columns.MVR&&<td className="row1" scope="row">{e.MVRvalue}</td>}
                            {columns.location&&<td className="row1" scope="row">{e.location}</td>}
                            {columns.bound&&<td className="row1" scope="row">{e.bound}</td>}
                            {/* {columns.notes&&<td className="row1" scope="row">{e.notes}</td>} */}
                            {columns.category&&<td className="row1" scope="row">{e.category}</td>}
                            {columns.creditCardFee&&<td className="row1" scope="row">{e.creditCardFee}</td>}
                            {columns.renewDown&&<td className="row1" scope="row">{e.renewDown}</td>}
                            
                            </tr>)
               })
               
               
            }

        </tbody>
        </table>
       



           










        
        
    </div>
    )

}
export default Report