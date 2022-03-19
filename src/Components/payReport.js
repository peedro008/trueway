import axios from "axios";
import React, {  useEffect, useState } from "react";
import SearchField from "react-search-field";
import { BsChevronLeft } from "react-icons/bs";

const PayReport = () => {
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
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getPayments`)
            .then(function(response){
                setPayments(response.data)
                
            
                
            })
           
            .catch(error=>{
              console.log(error)  
            })
    
    },[setPayments])
    const DateFilter= () => {
        setDateF(payments.filter(e=>e.date.substring(0,4)>=YYYY1&&e.date.substring(0,4)<=YYYY2&&e.date.substring(5,7)<=MM2&&e.date.substring(5,7)>=MM1&&e.date.substring(8,10)<=DD2&&e.date.substring(8,10)>=DD1))
        setFilteredQuotes(!filteredQuotes)
    }
    
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
            onChange={setSearch}
            
        /></div>
         <div className="REPDate">
             <p className="REPdateText">From</p>
             <input className="REPmonth" style={{fontSize:"11px"}} placeholder="MM" onChange={(e)=>setMM1(e.target.value)}/>
             <input className="REPday" style={{fontSize:"11px"}}placeholder="DD" onChange={(e)=>setDD1(e.target.value)}/>
             <input className="REPyear" style={{fontSize:"11px"}}placeholder="YYYY" onChange={(e)=>setYYYY1(e.target.value)}/>
             <p className="REPdateText" style={{paddingLeft:"15px"}}>To</p>
             <input className="REPmonth" style={{fontSize:"11px"}}placeholder="MM" onChange={(e)=>setMM2(e.target.value)}/>
             <input className="REPday" style={{fontSize:"11px"}}placeholder="DD" onChange={(e)=>setDD2(e.target.value)}/>
             <input className="REPyear"style={{fontSize:"11px"}} placeholder="YYYY" onChange={(e)=>setYYYY2(e.target.value)}/>
             <button onClick={DateFilter} style={{cursor:"pointer"}} className="RepSearchButton">{filteredQuotes?"Reset":"Search"}</button>
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
            {!search?
               !filteredQuotes? 
            
                   
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
                    :
                    dateF.reverse().map((e)=>{
                          
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
                    : 
                    (payments.filter(e=>(e.Client.name.toLowerCase()).includes(search.toLowerCase())||(e.User.name.toLowerCase()).includes(search.toLowerCase()))).map((e)=>{
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
                         
                         
                         
                         
                         )})
                        }
                        
                        
                
        
        </tbody>
            </table>
            <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
        </div>
    )
}
export default PayReport