import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./CSS/css.css"
import { BsChevronLeft } from "react-icons/bs";
import { BiPencil,BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineArrowDown,AiOutlineArrowUp } from "react-icons/ai";
import ProducerSales from "../chart/ProducerSales";
import useGoogleCharts from '../chart/useGoogleCharts';
import ProducerPie from "../chart/ProducerPie";
const ManagerDetails = (props) => {
    let Producer = props.location.aboutProps
    const [quotes, setQuotes] = useState([])
    const google = useGoogleCharts();
    const [mquotes, setMquotes] = useState([])
    const [modify, setModify]= useState([])
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
        axios.get(`https://truewayagentbackend.com/producerQuotes?UserId=${Producer.UserId}`)
        .then(function(response){
            setQuotes(response.data)
           
            
            console.log(Producer)
        })
        .catch(error=>{
          console.log(error)  
        })
    },[Producer])
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getStatus`)
            .then(function(response){
                let paz = response.data

                setModify(paz.filter(e=>e.UserId==Producer.UserId))
            
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])
   
    useEffect(() => {
        const date =  new Date()
        const DATE = date.getFullYear() + '-0' + (date.getMonth() + 1) + '-' + date.getDate();
        let yq = modify
        let mq = modify
        setYquotes(yq.filter(e=>e.date.substring(0,4)==DATE.substring(0,4)))
        setMquotes(mq.filter(e=>e.date.substring(0,7)==DATE.substring(0,7)))
        
  
    }, [quotes, Producer])
    useEffect(()=>{
        let pes = []
        let pas = []
        let yp = 0
        let mp = 0
        let m = mquotes
        let y  = yquotes
        if(m.length){
        m.map(e=>
            pes.push(e)
        )
        setMstat(pes)}
        else {setMstat([])}
        if(y.length){
        y.map(e=>
            pas.push(e)
        )
        setYstat(pas)
        }
        else{ setYstat([])}
        m.map(e=>{
            if (e.Status!=="Quoted"&&e.Status!=="Cancelled"){
                if(e.PIPvalue!==0) {
                mp=mp+1}
            }
        } )
        y.map(e=>{
            if (e.Status!=="Quoted"&&e.Status!=="Cancelled"){
                if(e.PIPvalue!==0) {
                yp=yp+1}
            }
        } )
        setYpip(yp)
        setMpip(mp)
    },[mquotes])

    
    


    return(
        <div className="genericDiv">
            
                
            <div className="genericHeader">
                <p className="genericTitle">{Producer.name}</p>
            </div>
            <div className="PRODcont1"> 
                <div className="PRODrect">
                    <div className="PRODrectH">
                        <p className="PRODrectT">Sold Quotes</p>
                        <BiDotsHorizontalRounded style={{cursor: "pointer"}} size={30} color={"#979797"} onClick={()=>setDots1(!dots1)}/>
                    </div>
                    <div className="PRODrectB">
                       <div style={{display:"flex", flexDirection:"row"}}>
                        {dots1V==1?
                        <p className="PRODrectQ">{mstat.filter(e=>e.Status!=="Quoted"&&e.Status!=="Cancelled").length?mstat.filter(e=>e.Status!=="Quoted"&&e.Status!=="Cancelled").length:0}&nbsp; </p>
                        :
                        <p className="PRODrectQ">{ystat.filter(e=>e.Status!=="Quoted"&&e.Status!=="Cancelled").length?ystat.filter(e=>e.Status!=="Quoted"&&e.Status!=="Cancelled").length:0}&nbsp;</p>
                        }
                        <p className="PRODrectQ">Sold</p>
                        </div>
                        <div className="PRODrectP">
                         
                            
                        </div>
                    </div>
                </div>
                {dots1&& <div className="PRODdotsCont1"><p className="PRODdotT" onClick={()=>{setDots1V(0);setDots1(!dots1)}}>Per year</p><p className="PRODdotT"onClick={()=>{setDots1V(1);setDots1(!dots1)}}>Per month</p></div>}
                <div className="PRODrect">
                    <div className="PRODrectH">
                        <p className="PRODrectT">Unsold Quotes</p>
                        <BiDotsHorizontalRounded style={{cursor: "pointer"}} size={30} color={"#979797"} onClick={()=>setDots2(!dots2)}/>
                    </div>
                    <div className="PRODrectB">
                    <div style={{display:"flex", flexDirection:"row"}}>
                        {dots2V==1?
                        <p className="PRODrectQ">{mstat.filter(e=>e.Status=="Quoted"||e.Status=="Cancelled").length?mstat.filter(e=>e.Status=="Quoted"||e.Status=="Cancelled").length:0}&nbsp;</p>
                        :
                        <p className="PRODrectQ">{ystat.filter(e=>e.Status=="Quoted"||e.Status=="Cancelled").length?ystat.filter(e=>e.Status=="Quoted"||e.Status=="Cancelled").length:0}&nbsp;</p>
                        }
                        <p className="PRODrectQ">Quotes</p>
                        </div>
                        
                        
                        <div className="PRODrectP">
                          
                       
                        </div>
                    </div>
                </div>
                {dots2&& <div className="PRODdotsCont2"><p className="PRODdotT" onClick={()=>{setDots2V(0);setDots2(!dots2)}}>Per year</p><p className="PRODdotT"onClick={()=>{setDots2V(1);setDots2(!dots2)}}>Per month</p></div>}
                <div className="PRODrect">
                    <div className="PRODrectH">
                        <p className="PRODrectT">NSD Sales</p>
                        <BiDotsHorizontalRounded style={{cursor: "pointer"}} size={30} color={"#979797"} onClick={()=>setDots3(!dots3)}/>
                    </div>
                    <div className="PRODrectB">
                    <div style={{display:"flex", flexDirection:"row"}}>
                        {dots3V==1?
                        <p className="PRODrectQ">{mpip}</p>
                        :
                        <p className="PRODrectQ">{ypip}</p>
                        }
                        <p className="PRODrectQ">&nbsp;Sold</p>
                        </div>
                        <div className="PRODrectP">
                            
                           
                        </div>
                    </div>
                </div>
                {dots3&& <div className="PRODdotsCont3"><p className="PRODdotT" onClick={()=>{setDots3V(0);setDots3(!dots3)}}>Per year</p><p className="PRODdotT"onClick={()=>{setDots3V(1);setDots3(!dots3)}}>Per month</p></div>}

                



      
            </div>
            <div style={{display:"flex", flexDirection:"row"}}>
            {google&&  <> <ProducerSales aboutProps={Producer.UserId}
                google={google}/>
                <ProducerPie aboutProps={Producer.UserId}
                google={google}/></>}
            </div>
              
                <NavLink to={{
                            pathname:("/users/manager/edit"),
                            props: Producer
                        }}>
                <button className="FITbutton">
                    <div style={{display:"flex", flexDirection:"row"}}>
                    <BiPencil size="20px" style={{display:"flex", color:"#2B4162", marginLeft:"8px", marginTop:"1px"}}/>
                    <p className="FITbuttonText">Edit</p>
                    </div>
                </button>
                </NavLink>
                <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
        </div>
    )
}
export default ManagerDetails