import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./CSS/css.css"

const ProducerDetails = (props) => {
    let Producer = props.location.aboutProps
    const [quotes, setQuotes] = useState([])
    const [gquotes, setGquotes] = useState([])
    useEffect (()=>{
        axios.get(`http://localhost:4000/producerQuotes?producer=${Producer.name}`)
        .then(function(response){
            setQuotes(response.data)
            
        })
        .catch(error=>{
          console.log(error)  
        })
    },[Producer])
    useEffect(()=>{
        axios.get(`http://localhost:4000/quotes`)
            .then(function(response){
                setGquotes(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])
    

    return(
        <div className="genericDiv">
            
                
            <div className="genericHeader">
                <p className="genericTitle">{Producer.name}</p>
            </div>


            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"75%", padding:"40px"   }}>
            
            <div className="producerInfoBox">
                <p className="producerInfoTitle">Sold Quotes</p>
                <div style={{flexDirection:"row", display:"flex", justifyContent:"space-between", maxWidth:"80%"}}>
                <p className="producerInfoText">{quotes.filter(g=>g.bound=="Sold").length} Sold</p>
                <p className="producerInfoText">{(quotes.filter(g=>g.bound=="Sold").length)/(quotes.filter(g=>g.bound!=="Need to Call").length) - (gquotes.filter(g=>g.bound=="Sold").length)/(gquotes.filter(g=>g.bound!=="Need to Call").length)} %</p>
                </div>
            </div>
            
            <div className="producerInfoBox">
                <p className="producerInfoTitle">Sold Quotes</p>
                <div style={{flexDirection:"row", display:"flex", justifyContent:"space-between", maxWidth:"80%"}}>
                <p className="producerInfoText">{quotes.filter(g=>g.bound=="Sold").length} Sold</p>
                <p className="producerInfoText">{(quotes.filter(g=>g.bound=="Sold").length)/(quotes.filter(g=>g.bound!=="Need to Call").length) - (gquotes.filter(g=>g.bound=="Sold").length)/(gquotes.filter(g=>g.bound!=="Need to Call").length)} %</p>
                </div>
            </div>
            
            <div className="producerInfoBox">
                <p className="producerInfoTitle">Sold Quotes</p>
                <div style={{flexDirection:"row", display:"flex", justifyContent:"space-between", maxWidth:"80%"}}>
                <p className="producerInfoText">{quotes.filter(g=>g.bound=="Sold").length} Sold</p>
                <p className="producerInfoText">{(quotes.filter(g=>g.bound=="Sold").length)/(quotes.filter(g=>g.bound!=="Need to Call").length) - (gquotes.filter(g=>g.bound=="Sold").length)/(gquotes.filter(g=>g.bound!=="Need to Call").length)} %</p>
                </div>
            </div>
        </div>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"75%", paddingLeft:"40px"   }}>

        <div className="producerGraphicBox">
                <p className="producerInfoTitle">Sold Quotes</p>
                <div style={{flexDirection:"row", display:"flex", justifyContent:"space-between", maxWidth:"80%"}}>
                <p className="producerInfoText">{quotes.filter(g=>g.bound=="Sold").length} Sold</p>
                <p className="producerInfoText">{(quotes.filter(g=>g.bound=="Sold").length)/(quotes.filter(g=>g.bound!=="Need to Call").length) - (gquotes.filter(g=>g.bound=="Sold").length)/(gquotes.filter(g=>g.bound!=="Need to Call").length)} %</p>
                </div>
            </div>

            <div className="producerGraphicBox1">
                <p className="producerInfoTitle">Sold Quotes</p>
                <div style={{flexDirection:"row", display:"flex", justifyContent:"space-between", maxWidth:"80%"}}>
                <p className="producerInfoText">{quotes.filter(g=>g.bound=="Sold").length} Sold</p>
                <p className="producerInfoText">{(quotes.filter(g=>g.bound=="Sold").length)/(quotes.filter(g=>g.bound!=="Need to Call").length) - (gquotes.filter(g=>g.bound=="Sold").length)/(gquotes.filter(g=>g.bound!=="Need to Call").length)} %</p>
                </div>
            </div>


        </div>

        </div>
    )
}
export default ProducerDetails