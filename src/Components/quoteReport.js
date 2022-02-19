import axios from "axios";
import React, { useEffect, useState } from "react";
import "./CSS/css.css"
import SearchField from 'react-search-field';
import { NavLink } from "react-router-dom";
const QuoteReport=(props)=>{
    
    const [quotes, setQuotes]=useState([]) 
    const [pes, setPes]=useState([]) 
    const [dateF, setDateF] = useState([])
    const [filteredQuotes, setFilteredQuotes] = useState(false)
    const [YYYY1, setYYYY1] = useState(0)
    const [YYYY2, setYYYY2] = useState(0)
    const [MM1, setMM1] = useState(0)
    const [MM2, setMM2] = useState(0)
    const [DD1, setDD1] = useState(0)
    const [DD2, setDD2] = useState(0)
    const [search, setSearch] = useState("")
    let columns = props.location.aboutProps
    useEffect(()=>{
        axios.get(`http://localhost:4000/quotes`)
            .then(function(response){
                setQuotes(response.data)
                
            
                
            })
           
            .catch(error=>{
              console.log(error)  
            })
    
    },[setQuotes])

    const DateFilter= () => {
        setDateF(quotes.filter(e=>e.date.substring(0,4)>=YYYY1&&e.date.substring(0,4)<=YYYY2&&e.date.substring(5,7)<=MM2&&e.date.substring(5,7)>=MM1&&e.date.substring(8,10)<=DD2&&e.date.substring(8,10)>=DD1))
        setFilteredQuotes(!filteredQuotes)
    }
    
    
    return(
        <div className="genericDiv1">
             
             <div className="genericHeader">
                <p className="genericTitle">Quote reports</p>
                
            </div>
         <div className="REPcontrol">
         <div className="REPDate">
             <p className="REPdateText">From</p>
             <input className="REPmonth" placeholder="MM" onChange={(e)=>setMM1(e.target.value)}/>
             <input className="REPday" placeholder="DD" onChange={(e)=>setDD1(e.target.value)}/>
             <input className="REPyear" placeholder="YYYY" onChange={(e)=>setYYYY1(e.target.value)}/>
             <p className="REPdateText" style={{paddingLeft:"15px"}}>To</p>
             <input className="REPmonth" placeholder="MM" onChange={(e)=>setMM2(e.target.value)}/>
             <input className="REPday" placeholder="DD" onChange={(e)=>setDD2(e.target.value)}/>
             <input className="REPyear" placeholder="YYYY" onChange={(e)=>setYYYY2(e.target.value)}/>
         
             
          
             <button onClick={DateFilter} className="RepSearchButton" >{filteredQuotes?"Reset":"Search"}</button>
        </div>
         <div className="REPsearch">
         <SearchField 
            classNames="pepe"
            placeholder='Search item'
            onChange={setSearch}
        /></div>

                </div>
           <table class="table1">
      
        <tbody>
            <tr>
          
            {columns.clientName&&<th scope="col" className="column1"><p   className="REPtype">Client name</p></th>}
            {columns.clientEmail&&<th scope="col" className="column1"><p className="REPtype">Client E-mail</p></th>}
            {columns.clienTel&&<th scope="col" className="column1"><p className="REPtype">Client phone</p></th>}
            {columns.category&&<th scope="col" className="column1"><p className="REPtype">Category</p></th>}
            {columns.CompanyId&&<th scope="col" className="column1"><p className="REPtype">Company</p></th>}
            {columns.ProducerId&&<th scope="col" className="column1"><p className="REPtype">Producer</p></th>}
            
            {columns.bound&&<th scope="col" className="column1"><p className="REPtype">Status</p></th>}
            {<th scope="col" className="column1"><p className="REPtype">Date</p></th>}
            {<th scope="col" className="column1"><p className="REPtype">Time</p></th>}
            {columns.down&&<th scope="col" className="column1"><p className="REPtype">Down Payments</p></th>}
            {columns.monthlyPayment&&<th scope="col" className="column1"><p className="REPtype">Monthly Payments</p></th>}
            {columns.dealer&&<th scope="col" className="column1"><p className="REPtype">Dealer Name</p></th>}
            {columns.NSD&&<th scope="col" className="column1"><p className="REPtype">NRSD</p></th>}
            {columns.PIP&&<th scope="col" className="column1"><p className="REPtype">PIP</p></th>}
            {columns.MVR&&<th scope="col" className="column1"><p className="REPtype">MVR</p></th>}
            {columns.location&&<th scope="col" className="column1"><p className="REPtype">Location</p></th>}
          
           
           
           
            </tr>
            
        
            {!search?
               !filteredQuotes? 
               quotes.reverse().map((e)=>{
                   
                   return (
                        <tr>
                            
                            {columns.clientName&&<td className="ClientName" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Client.name}</NavLink></td>}
                            {columns.clientEmail&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Client.email}</NavLink></td>}
                            {columns.clienTel&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Client.tel}</NavLink></td>}
                            {columns.category&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Category.name}</NavLink></td>}
                            {columns.CompanyId&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Company.name}</NavLink></td>}
                            {columns.ProducerId&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.User.name}</NavLink></td>}
                            {columns.bound&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.QuoteStatuses[e.QuoteStatuses.length-1].Status}</NavLink></td>}
                            <td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.date}</NavLink></td>
                            <td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{parseInt(e.time.substring(11,13))-5}{e.time.substring(16,19)}</NavLink></td>
                            {columns.down&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.down}</NavLink></td>}
                            {columns.monthlyPayment&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.monthlyPayment}</NavLink></td>}
                            {columns.dealer&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.dealer?e.Dealer.name:"false"}</NavLink></td>}
                            {columns.NSD&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.NSDvalue}</NavLink></td>}
                            {columns.PIP&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.PIPvalue}</NavLink></td>}
                            {columns.MVR&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.MVRvalue}</NavLink></td>}
                            {columns.location&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Location.name}</NavLink></td>}
                           </tr>)
               })
               
             :
             dateF.reverse().map((e)=>{
                   
                return (
                     <tr>
                         
                         {columns.clientName&&<td className="ClientName" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Client.name}</NavLink></td>}
                         {columns.clientEmail&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Client.email}</NavLink></td>}
                         {columns.clienTel&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Client.tel}</NavLink></td>}
                         {columns.category&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Category.name}</NavLink></td>}
                         {columns.CompanyId&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Company.name}</NavLink></td>}
                         {columns.ProducerId&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.User.name}</NavLink></td>}
                         {columns.bound&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.QuoteStatuses[e.QuoteStatuses.length-1].Status}</NavLink></td>}
                         <td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.date}</NavLink></td>
                         <td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{parseInt(e.time.substring(11,13))-5}{e.time.substring(16,19)}</NavLink></td>
                         {columns.down&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.down}</NavLink></td>}
                         {columns.monthlyPayment&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.monthlyPayment}</NavLink></td>}
                         {columns.dealer&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.dealer?e.Dealer.name:"false"}</NavLink></td>}
                         {columns.NSD&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.NSDvalue}</NavLink></td>}
                         {columns.PIP&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.PIPvalue}</NavLink></td>}
                         {columns.MVR&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.MVRvalue}</NavLink></td>}
                         {columns.location&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Location.name}</NavLink></td>}
                        </tr>)
            })
            :
            (quotes.filter(e=>(e.Client.name.toLowerCase()).includes(search.toLowerCase()))).map((e)=>{
                return ( <tr>
                            
                    {columns.clientName&&<td className="ClientName" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Client.name}</NavLink></td>}
                    {columns.clientEmail&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Client.email}</NavLink></td>}
                    {columns.clienTel&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Client.tel}</NavLink></td>}
                    {columns.category&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Category.name}</NavLink></td>}
                    {columns.CompanyId&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Company.name}</NavLink></td>}
                    {columns.ProducerId&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Producer.name}</NavLink></td>}
                    {columns.bound&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.QuoteStatuses[e.QuoteStatuses.length-1].Status}</NavLink></td>}
                    <td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.date}</NavLink></td>
                    <td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{parseInt(e.time.substring(11,13))-5}{e.time.substring(16,19)}</NavLink></td>
                    {columns.down&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.down}</NavLink></td>}
                    {columns.monthlyPayment&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.monthlyPayment}</NavLink></td>}
                    {columns.dealer&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.dealer?e.Dealer.name:"false"}</NavLink></td>}
                    {columns.NSD&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.NSDvalue}</NavLink></td>}
                    {columns.PIP&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.PIPvalue}</NavLink></td>}
                    {columns.MVR&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.MVRvalue}</NavLink></td>}
                    {columns.location&&<td className="row1" scope="row"><NavLink style={{textDecoration: 'none', color:"#000"}} to={{pathname:"/quote",aboutProps:{ID:e.id}}}>{e.Location.name}</NavLink></td>}
                   </tr>)
       })
       






            }

        </tbody>
        </table>
       



           










        
        
    </div>
    )

}
export default QuoteReport


