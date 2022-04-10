import { PDFDownloadLink } from '@react-pdf/renderer';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux'
import SearchField from "react-search-field";
import { addLocation } from '../redux/actions';
import MyDocument from './PDF/daily';

function DailyDetails(props) {
   
    let papa =props.location.props.Payments
    const [payments, setPayments] = useState(papa)
    const [cash, setCash] = useState(0)
    const [credit, setCredit] = useState(0)
    const [EFT, setEFT] = useState(0)
    const [producers, setProducers] = useState([])
    const [search, setSearch] = useState("")
    const [date, setDate ] = useState("")
    const UserId = useSelector(state=> state.UserId)
    const LocationId= useSelector(state=>state.LocationId)
    const [total, setTotal] =useState(0)
    const [ay, setAy]=useState(0)
    const dispatch = useDispatch()
   
    useEffect(()=>{
        let CA=0
        let CR=0
        let EF=0
        let paz = payments
        paz.map(e=>{
            e.method=="Cash"?
            CA+=parseFloat(e.amount):
            e.method=="EFT"?
            EF+=parseFloat(e.amount):
            CR+=parseFloat(e.amount)
        })
        setCash(CA)
        setCredit(CR)
        setEFT(EF)
    },[payments])
    let pes = []
    let DATE = ""
    useEffect(()=>{
           payments.map(e=>{
            if(!pes.filter(f=>f.name==e.User.name).length){
                pes.push({name: e.User.name, location: e.Location.name})
            }
        
           })
     
       setProducers(pes)
       payments.map(e=>{
        if(!DATE){
            DATE = e.date
        }
    setDate(DATE)
       })
    },[payments])
        useEffect(()=>{
            let TOTAL = 0
            payments.map((h)=>{
            TOTAL=TOTAL+(parseFloat(h.amount)+parseFloat(h.creditCardFee))})
            setTotal(TOTAL)
          
        },[payments])

        useEffect(()=>{
            let CA=0
            let CR=0
            let EF=0
            let paz = payments
            paz.map(e=>{
                e.method=="Cash"?
                CA+=parseFloat(e.amount):
                e.method=="EFT"?
                EF+=parseFloat(e.amount):
                CR+=parseFloat(e.amount)
            })
            setCash(CA)
            setCredit(CR)
            setEFT(EF)
        },[payments])
        
        useEffect(()=>{
            let pes = []
            let DATE = ""
               payments.map(e=>{
                if(!pes.filter(f=>f.name==e.User.name).length){
                    pes.push({name: e.User.name, location: e.Location.name})
                }
            
               })
         
           setProducers(pes)
           payments.map(e=>{
            if(!DATE){
                DATE = e.date
            }
        setDate(DATE)
           })
        },[payments])
            useEffect(()=>{
                let TOTAL = 0
                payments.map((h)=>{
                TOTAL=TOTAL+(parseFloat(h.amount)+parseFloat(h.creditCardFee))})
                setTotal(TOTAL)
              
            },[payments])
    

        
    
  return (
    <div className='genericDiv1'>
        <div className="genericHeader">
                <p className="genericTitle">Daily report</p>
        </div>
        <div className="REPcontrol">
       
                </div>
           <table className="table2">
      
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
                <th scope="col" className="column1"><p className="REPtype">PIP</p></th>
                <th scope="col" className="column1"><p className="REPtype">NSD</p></th>
                <th scope="col" className="column1"><p className="REPtype">MVR</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Total</p></th>
            </tr>
            {
                !search?
               payments.reverse().map((e)=>{
                   
                   return (
                        <tr>
                             <td className="ClientName" scope="row">{e.Client.name}</td>
                            <td className="ClientName" scope="row">{e.User.name}</td>           
                            <td className="ClientName" scope="row">{e.Location.name}</td>  
                            <td className="ClientName" scope="row">{e.type}</td>  
                            <td className="ClientName" scope="row">{e.date}</td>
                            <td className="ClientName" scope="row">${e.amount}</td>  
                            <td className="ClientName" scope="row">{e.method}</td> 
                            <td className="ClientName" scope="row">${e.creditCardFee}</td>
                            <td className="ClientName" scope="row">${e.PIPvalue}</td>     
                            <td className="ClientName" scope="row">${e.NSDvalue}</td> 
                            <td className="ClientName" scope="row">${e.MVRvalue}</td>              
                            <td className="ClientName" scope="row">${parseFloat(e.amount)+parseFloat(e.PIPvalue)+parseFloat(e.NSDvalue)+parseFloat(e.MVRvalue)+parseFloat(e.creditCardFee)}</td>      
                        
                        </tr>
                     
                     
                     
                     
                     )
                     
                    
                    })

                :
                (payments.filter(e=>(e.Client.name.toLowerCase()).includes(search.toLowerCase()))).map((e)=>{
                    return (
                        <tr>
                            <td className="ClientName" scope="row">{e.Client.name}</td>
                            <td className="ClientName" scope="row">{e.User.name}</td>           
                            <td className="ClientName" scope="row">{e.Location.name}</td>  
                            <td className="ClientName" scope="row">{e.type}</td>  
                            <td className="ClientName" scope="row">{e.date}</td>
                            <td className="ClientName" scope="row">${e.amount}</td>  
                            <td className="ClientName" scope="row">{e.method}</td> 
                            <td className="ClientName" scope="row">${e.creditCardFee}</td>
                            <td className="ClientName" scope="row">${e.PIPvalue}</td>     
                            <td className="ClientName" scope="row">${e.NSDvalue}</td> 
                            <td className="ClientName" scope="row">${e.MVRvalue}</td>              
                            <td className="ClientName" scope="row">${parseFloat(e.amount)+parseFloat(e.PIPvalue)+parseFloat(e.NSDvalue)+parseFloat(e.MVRvalue)+parseFloat(e.creditCardFee)}</td>     
                        
                        </tr>
                     
                     
                     
                     
                     )
                     
                })
                }
        
        </tbody>
            </table>

        <div className='DAItotalCont'>
                <div className='DAItotal'>
                    <p className='DEPtotalT'>
                        TOTAL CASH $ {cash}
                    </p>
                </div>
                <div className='DAItotal'>
                    <p className='DEPtotalT'>
                        TOTAL EFT $ {EFT}
                    </p>
                </div><div className='DAItotal'>
                    <p className='DEPtotalT'>
                        TOTAL CREDIT CARD $ {credit}
                    </p>
                </div>
        </div>

        <PDFDownloadLink style={{textDecoration:"none", color:"black"}} document={<MyDocument data={{payments:payments, producers:producers, date: date}} />}fileName="DailyCloseout">
       
        <div style={{position:"absolute", right:"50px", top:"76px", display:"flex"}}>
                <button  className="PAYbutton" ><p className="PAYbuttonText">Generate PDF</p></button>
            </div>    
        </PDFDownloadLink>
        <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
    </div>
  )
}

export default DailyDetails