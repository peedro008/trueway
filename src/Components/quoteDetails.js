import axios from 'axios'
import {BiPencil} from "react-icons/bi"
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

function QuoteDetails(props) {
    const id = props.location.aboutProps.ID
    const [quote, setQuote] = useState([])
    const history = useHistory()
    useEffect(() => {
        axios.get(`http://localhost:8080/idquotes`,{ params: { id: id } })
        .then(function(response){
            setQuote(response.data)
        

            
        })
        .catch(error=>{
          console.log(error)  
        })
    }, [id])

    return (
        <div className='genericDiv' style={{overflowX:"hidden"}}>
            {!quote.length?<p>No quotes</p>:
               <div>
               <div className="genericHeader">
                <p className="genericTitle">Quote #{id}</p>
                <p className='subTitt'>LAST MODIFICATION &nbsp;{quote[0].QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()[0].date}</p>
                 </div>
           
           
            <div className='DETmainContainer'>

                <div className='DETcontainer'>
                    <div className='DETsBox'>
                        <p className="DETtitle">Client name</p>
                        <p className="DETtext">{quote[0].Client.name}</p>
                    </div>
                    <div className='DETsBox'>
                        <p className="DETtitle">Email</p>
                        <p className="DETtext">{quote[0].Client.email}</p>
                    </div>
                    <div className='DETsBox'>
                        <p className="DETtitle">Expedition date</p>
                        <p className="DETtext">{quote[0].date}</p>
                    </div>
                    <div className='DETsBox'>
                        <p className="DETtitle">Hour</p>
                        <p className="DETtext">{parseInt(quote[0].time.substring(11,13))-5}{quote[0].time.substring(16,19)}</p>
                    </div>
                    <div className='DETsBox'>
                        <p className="DETtitle">Phone</p>
                        <p className="DETtext">{quote[0].Client.tel}</p>
                    </div>
                </div>
                <div className='DETcontainer'>
                    <div className='DETsBox'>
                        <p className="DETtitle">Company</p>
                        <p className="DETtext">{quote[0].Company.name}</p>
                    </div>
                     <div className='DETsBox'>
                        <p className="DETtitle">Monthly payments</p>
                        <p className="DETtext">{quote[0].monthlyPayment}</p>
                    </div>
                    <div className='DETsBox'>
                        <p className="DETtitle">Down</p>
                        <p className="DETtext">{quote[0].down}</p>
                    </div>
                    <div className='DETsBox'>
                        <p className="DETtitle">Quoted by</p>
                        <p className="DETtext">{quote[0].User.name}</p>
                    </div>
                   {quote[0].QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()[0].Status=="Sold" &&
                    <div className='DETsBox'>
                        <p className="DETtitle">Sold by</p>
                        <p className="DETtext">{quote[0].QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()[0].User.name}</p>
                    </div>}
                 </div>
                    
                    <div style={{marginTop:"25px", }}>
                        <p  style={{ marginBottom:"25px"}}className="PAYtitle">Quote history</p>
                      

                        {quote[0].QuoteStatuses[0]&& 
                        (quote[0].QuoteStatuses.sort(function(a,b){return a.id-b.id}).reverse()).map(e=>{
                            return(<div className='DETcontainer'>
                               <div className='DETsBox'>
                                <p className="DETtitle" >Status</p>
                                <p className="DETtext"  style={{fontWeight:"700",fontSize:"17px", color:e.Status=="Cancelled"?"#FF4C61":e.Status=="Renew down"?"#4CB8FF":e.Status=="Sold"?"#28C76F":"#FFB020" }}>{e.Status}</p>
                            </div>
                            <div className='DETsBox'>
                                <p className="DETtitle">Modification date</p>
                                <p className="DETtext">{e.date}</p>
                            </div>
                            <div className='DETbBox' >
                                <p className="DETtitle">Notes</p>
                                <p className="DETtext">{e.note}</p>
                            </div>  
                            <div className='DETsBox'>
                                <p className="DETtitle">Producer</p>
                                <p className="DETtext">{e.User.name}</p>
                            </div> 
                            
                            </div>
                            
                            )
                        })
                           

                            }
<NavLink to={"/report"}>
<BsChevronLeft color="grey" style={{minWidth:"25px", minHeight:"25px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} />
                       </NavLink>
                    </div>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    {/* <div className='DETbBox'>
                        <p className="DETtitle">Notes</p>
                        <p className="DETtext">{quote[0].notes}</p>
                    </div> */}
            </div>
        </div>}
        <NavLink to={{
                    pathname:("/report/modifyquote"),
                    aboutProps:id
                }}>
                <button className="FITbutton">
                    <div style={{display:"flex", flexDirection:"row"}}>
                    <BiPencil size="20px" style={{display:"flex", color:"#2B4162", marginLeft:"8px", marginTop:"1px"}}/>
                    <p className="FITbuttonText">Modify quote</p>
                    </div>
                </button>
                </NavLink>
        </div>
    )
}

export default QuoteDetails
