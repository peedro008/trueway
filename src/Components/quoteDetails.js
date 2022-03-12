import axios from 'axios'
import {BiPencil} from "react-icons/bi"
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

function QuoteDetails(props) {
    const id = props.location.aboutProps.ID
    const [quote, setQuote] = useState([])
    useEffect(() => {
        axios.get(`https://truewayagentbackend.com/idquotes`,{ params: { id: id } })
        .then(function(response){
            setQuote(response.data)
            

            
        })
        .catch(error=>{
          console.log(error)  
        })
    }, [id])

    return (
        <div className='genericDiv1'>
            {!quote.length?<p>No quotes</p>:
               <div>
               <div className="genericHeader">
                <p className="genericTitle">Quote #{id}</p>
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
                    <div className='DETsBox'>
                        <p className="DETtitle">Sold by</p>
                        <p className="DETtext">{quote[0].User.name}</p>
                    </div>
                 </div>
                    
                    <div style={{marginTop:"25px", }}>
                        <p  style={{ marginBottom:"25px"}}className="PAYtitle">Quote history</p>
                      

                        {quote[0].QuoteStatuses[0]&& 
                        (quote[0].QuoteStatuses.reverse()).map(e=>{
                            return(<div className='DETcontainer'>
                               <div className='DETsBox'>
                                <p className="DETtitle" >Status</p>
                                <p className="DETtext"  style={{fontWeight:"700", color:e.Status=="Cancelled"?"red":e.Status=="Renew down"?"blue":e.Status=="Sold"?"green":"black" }}>{e.Status}</p>
                            </div>
                            <div className='DETsBox'>
                                <p className="DETtitle">Modification date</p>
                                <p className="DETtext">{e.date}</p>
                            </div>
                            <div className='DETbBox'>
                                <p className="DETtitle">Notes</p>
                                <p className="DETtext">{e.note}</p>
                            </div>  </div>
                            )
                        })
                           

                            }

<BsChevronLeft color="grey" style={{minWidth:"25px", minHeight:"25px", position:"absolute",zIndex:9, left:"80px",top:"18px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-2)}/>
                       
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
