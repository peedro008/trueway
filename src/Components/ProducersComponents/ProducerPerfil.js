import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../CSS/css.css"
import { useSelector } from "react-redux";
import { BiPencil,BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineArrowDown,AiOutlineArrowUp } from "react-icons/ai";
import ProducerSales from "../../chart/ProducerSales";
import useGoogleCharts from '../../chart/useGoogleCharts';
import ProducerPie from "../../chart/ProducerPie";

function ProducerPerfil() {
    const userId = useSelector(state=> state.UserId) 
    const name = useSelector(state=> state.userName) 
    const [quotes, setQuotes] = useState([])
    const google = useGoogleCharts();
    const [mquotes, setMquotes] = useState([])
    const [mstat, setMstat] = useState([])
    const [yquotes, setYquotes] = useState([])
    const [ystat, setYstat] = useState([])
    const [ypip, setYpip] = useState(0)
    const [mpip, setMpip] = useState(0)
    const [dots1, setDots1] = useState(false)
    const [dots2, setDots2] = useState(false)
    const [dots3, setDots3] = useState(false)
    const [dots1V, setDots1V] = useState(0)
    const [dots2V, setDots2V] = useState(0)
    const [dots3V, setDots3V] = useState(0)
    useEffect (()=>{
        axios.get(`https://truewayagentbackend.com/producerQuotes?UserId=${userId}`)
        .then(function(response){
            setQuotes(response.data)
           
            
            
        })
        .catch(error=>{
          console.log(error)  
        })
    },[userId])
   
    useEffect(() => {
        const date =  new Date()
        const DATE = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
        let yq = quotes
        let mq = quotes
        setYquotes(yq.filter(e=>e.date.substring(0,4)==DATE.substring(0,4)))
        setMquotes(mq.filter(e=>e.date.substring(0,7)==DATE.substring(0,7)))
        
  
    }, [quotes])
    useEffect(()=>{
        let pes = []
        let pas = []
        let yp = 0
        let mp = 0
        let m = mquotes
        let y  = yquotes
        m.map(e=>
            pes.push(e.QuoteStatuses[0])
        )
        setMstat(pes)
        y.map(e=>
            pas.push(e.QuoteStatuses[0])
        )
        setYstat(pas)
        
        m.map(e=>{
            if (e.QuoteStatuses[0]!=="Quoted"&&e.QuoteStatuses[0]!=="Cancelled"){
                if(e.PIPvalue!==0) {
                mp=mp+1}
            }
        } )
        y.map(e=>{
            if (e.QuoteStatuses[0]!=="Quoted"&&e.QuoteStatuses[0]!=="Cancelled"){
                if(e.PIPvalue!==0) {
                yp=yp+1}
            }
        } )
        setYpip(yp)
        setMpip(mp)
    },[yquotes, mquotes])
  
    return(
        <div className="genericDiv">
            
                
        <div className="genericHeader">
            <p className="genericTitle">{name}</p>
        </div>
        <div className="PRODcont1"> 
            <div className="PRODrect">
                <div className="PRODrectH">
                    <p className="PRODrectT">Sold Quotes</p>
                    <BiDotsHorizontalRounded size={30} color={"#979797"} onClick={()=>setDots1(!dots1)}/>
                </div>
                <div className="PRODrectB">
                   <div style={{display:"flex", flexDirection:"row"}}>
                    {dots1V==1?
                    <p className="PRODrectQ">{mstat.filter(e=>e.Status!=="Quoted"&&e.Status!=="Cancelled").length?mstat.filter(e=>e.Status!=="Quoted"&&e.Status!=="Cancelled").length:0}</p>
                    :
                    <p className="PRODrectQ">{ystat.filter(e=>e.Status!=="Quoted"&&e.Status!=="Cancelled").length?ystat.filter(e=>e.Status!=="Quoted"&&e.Status!=="Cancelled").length:0}</p>
                    }
                    <p className="PRODrectQ">Sold</p>
                    </div>
                    <div className="PRODrectP">
                      
                        <AiOutlineArrowDown/>
                        
                    </div>
                </div>
            </div>
            {dots1&& <div className="PRODdotsCont1"><p className="PRODdotT" onClick={()=>{setDots1V(0);setDots1(!dots1)}}>Per year</p><p className="PRODdotT"onClick={()=>{setDots1V(1);setDots1(!dots1)}}>Per month</p></div>}
            <div className="PRODrect">
                <div className="PRODrectH">
                    <p className="PRODrectT">Unsold Quotes</p>
                    <BiDotsHorizontalRounded size={30} color={"#979797"} onClick={()=>setDots2(!dots2)}/>
                </div>
                <div className="PRODrectB">
                <div style={{display:"flex", flexDirection:"row"}}>
                    {dots2V==1?
                    <p className="PRODrectQ">{mstat.filter(e=>e.Status=="Quoted"||e.Status=="Cancelled").length?mstat.filter(e=>e.Status=="Quoted"||e.Status=="Cancelled").length:0}</p>
                    :
                    <p className="PRODrectQ">{ystat.filter(e=>e.Status=="Quoted"||e.Status=="Cancelled").length?ystat.filter(e=>e.Status=="Quoted"||e.Status=="Cancelled").length:0}</p>
                    }
                    <p className="PRODrectQ">Quotes</p>
                    </div>
                    
                    
                    <div className="PRODrectP">
                      
                        <AiOutlineArrowUp/>
                    </div>
                </div>
            </div>
            {dots2&& <div className="PRODdotsCont2"><p className="PRODdotT" onClick={()=>{setDots2V(0);setDots2(!dots2)}}>Per year</p><p className="PRODdotT"onClick={()=>{setDots2V(1);setDots2(!dots2)}}>Per month</p></div>}
            <div className="PRODrect">
                <div className="PRODrectH">
                    <p className="PRODrectT">NSD Sales</p>
                    <BiDotsHorizontalRounded size={30} color={"#979797"} onClick={()=>setDots3(!dots3)}/>
                </div>
                <div className="PRODrectB">
                <div style={{display:"flex", flexDirection:"row"}}>
                    {dots3V==1?
                    <p className="PRODrectQ">{mpip}</p>
                    :
                    <p className="PRODrectQ">{ypip}</p>
                    }
                    <p className="PRODrectQ">Sold</p>
                    </div>
                    <div className="PRODrectP">
                        
                        <AiOutlineArrowUp/>
                    </div>
                </div>
            </div>
            {dots3&& <div className="PRODdotsCont3"><p className="PRODdotT" onClick={()=>{setDots3V(0);setDots3(!dots3)}}>Per year</p><p className="PRODdotT"onClick={()=>{setDots3V(1);setDots3(!dots3)}}>Per month</p></div>}

            



  
        </div>
        <div style={{display:"flex", flexDirection:"row"}}>
        {google&&  <> <ProducerSales aboutProps={userId}
            google={google}/>
            <ProducerPie aboutProps={userId}
            google={google}/></>}
        </div>
          
            
    </div>
    )
}

export default ProducerPerfil
