import axios from 'axios'
import {BiPencil} from "react-icons/bi"
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function QuoteDetails(props) {
    const id = props.location.aboutProps.ID
    const [quote, setQuote] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:4000/idquotes`,{ params: { id: id } })
        .then(function(response){
            setQuote(response.data)
            

            
        })
        .catch(error=>{
          console.log(error)  
        })
    }, [id])

    return (
        <div className='genericDiv'>
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
                        <p className="DETtext">{quote[0].Producer.name}</p>
                    </div>
                    <div className='DETsBox'>
                        <p className="DETtitle">Sold by</p>
                        <p className="DETtext">{quote[0].Producer.name}</p>
                    </div>
                 </div>
                    <div className='DETbBox'>
                        <p className="DETtitle">Notes</p>
                        <p className="DETtext">{quote[0].notes}</p>
                    </div>
            </div>
        </div>}
        <NavLink to={{
                    pathname:("/modifyquote"),
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
