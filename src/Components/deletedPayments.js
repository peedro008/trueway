import axios from "axios";
import React, {  useEffect, useState } from "react";
import SearchField from "react-search-field";
import { BsChevronLeft } from "react-icons/bs";
import { VscFilePdf } from "react-icons/vsc";
import Select from 'react-select'
import { Divider } from "@mui/material";
import moment from "moment"
import close from "../assets/close.svg"
import { useSelector } from 'react-redux';
import Modal from 'react-responsive-modal';
import pdf from "../assets/pdf.svg"
import {FiRefreshCcw} from "react-icons/fi"
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./PDF/prueba";

const DeletedPayments = () => {
    const userRole = useSelector(state=> state.userRole)
    const [producers, setProducers]= useState([])
    const [payments, setPayments] = useState([]) 
    const [paymentsFil, setPaymentsFil] = useState([])
    const [clients, setClients] = useState([])
    const [locations, setLocations] = useState([])
    const [dateF, setDateF] = useState([])
    const [filteredQuotes, setFilteredQuotes] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)
    const [filtered, setFiltered]= useState(false)
    const [deleteConf, setDeleteConf] = useState("")
    const [deletedOne, setDeletedOne] = useState(null)
    const [filterValues, setFilterValues ] = useState({
        dateFrom:null,
        dateTo:null,
        dateClientId:null,
        ClientTel:null,
        ProducerId:null,
        LocationId:null,
        Method:null,
        Type:null,

    })
    const [filterCheck, setFilterCheck ] = useState({
        date:false,
        ClientId:false,
        ClientTel:false,
        ProducerId:false,
        LocationId:false,
        Method:false,
        Type:false,
    })
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const handleDelete = (e)=>{
        setDeletedOne(e)
        onOpenModal()
    }
    const handleDeleteModal = (e)=>{
        deleteClient({PaymentId:deletedOne})
        window.location.reload()

    }
    const deleteClient = (data) => {
        data&&
        console.log(data)
        fetch(`https://truewayagentbackend.com/undeletePayment`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(data)
            
        })
        .then(async res => { 
            
            try {
            const jsonRes = await res.json();
            
            if (res.status !== 200) {
                console.log("error")
            } else {
               
               console.log(jsonRes)
              
              
                
            }
        } catch (err) {
            console.log(err);
        };
    
    })
      
        .catch(err => {
            console.log(err);
        });
        };

    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getDeletedPayment`)
            .then(function(response){
                setPayments(response.data)
                
            
                
            })
           
            .catch(error=>{
              console.log(error)  
            })
    
    },[setPayments])
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getLocations`)
            .then(function(response){
                setLocations(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/clients`)
            .then(function(response){
                setClients(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getProducer`)
            .then(function(response){
                setProducers(response.data)
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])

    
     const filterSubmit = (e) => {
        let temp = payments
        if(e.dateFrom&&e.dateTo){
            temp=temp.filter(h=>moment(`${h.date}`).isBetween(`${e.dateFrom}`,`${e.dateTo}`, undefined, '[]'))
        }
        if(e.ClientId){
            temp=temp.filter(h=>h.ClientId==e.ClientId)
        }
        if(e.ClientTel){
            temp=temp.filter(h=>h.ClientId==e.ClientTel)
        }
        if(e.LocationId){
            temp=temp.filter(h=>h.LocationId==e.LocationId)
        }
        if(e.ProducerId){
            temp=temp.filter(h=>h.UserId==e.ProducerId)
        }
        if(e.Type){
            temp=temp.filter(h=>h.type==e.Type)
        }
        if(e.Method){
            temp=temp.filter(h=>h.method==e.Method)
        }
        setPaymentsFil(temp)
       
        setFiltered(true)
        
    }
    useEffect(()=>{ 
        filterSubmit(filterValues)
    },[filterValues,payments])
    const closeCloud = (e)=>{
        setFilterValues(e)
         }

    return(
        <div className="genericDiv1">
             
             <div className="genericHeader">
                <p className="genericTitle">Deleted Payment reports</p>
            </div>
            <div className="REPcontrol">
            
         <div className="REPDate">
         {
                 filterValues.dateFrom&&filterValues.dateTo&&
                 <div className="cloudFilter">
                     <p className="cloudFilterText">From:&nbsp;<strong>{filterValues.dateFrom}</strong></p>
                     <p className="cloudFilterText"style={{marginLeft:"5px"}}>To:&nbsp;<strong>{filterValues.dateTo}</strong></p>
                     
                     <img src={close} style={{marginLeft:"5px"}} onClick={()=>{closeCloud({...filterValues,dateFrom:null, dateTo:null})}}/>
                     </div>
             }
             {
                 filterValues.ClientId&&
                 <div className="cloudFilter">
                     <p className="cloudFilterText">Client name:{clients.find(c => c.id ==  filterValues.ClientId).name}
                     
                     </p>
                     <img src={close} style={{marginLeft:"5px"}} onClick={()=>{closeCloud({...filterValues,ClientId:null})}}/>
                     </div>
             }
             {
                 filterValues.ClientTel&&
                 <div className="cloudFilter">
                     <p className="cloudFilterText">Client phone:{clients.find(c => c.id ==  filterValues.ClientTel).tel}
                     </p>
                     <img src={close} style={{marginLeft:"5px"}} onClick={()=>{closeCloud({...filterValues,ClientTel:null})}}/>
                     </div>
             }
             {
                 filterValues.ProducerId&&
                 <div className="cloudFilter">
                     <p className="cloudFilterText">Producer name:{producers.find(c => c.id ==  filterValues.ProducerId).name}
                    </p>
                    <img src={close} style={{marginLeft:"5px"}} onClick={()=>{closeCloud({...filterValues,ProducerId:null})}}/>
                    </div>
             }
              {
                 filterValues.LocationId&&
                 <div className="cloudFilter">
                     <p className="cloudFilterText">Location:{locations.find(c => c.id ==  filterValues.LocationId).name}
                     </p>
                     <img src={close} style={{marginLeft:"5px"}} onClick={()=>{closeCloud({...filterValues,LocationId:null})}}/>
                     </div>
             }
              {
                 filterValues.Type&&
                 <div className="cloudFilter">
                     <p className="cloudFilterText">Type:{filterValues.Type}
                     </p> 
                     <img src={close} style={{marginLeft:"5px"}} onClick={()=>{closeCloud({...filterValues,CompanyId:null})}}/>
                     </div>
             }
               {
                 filterValues.Method&&
                 <div className="cloudFilter">
                     <p className="cloudFilterText">Method:{filterValues.Method}
                     </p> 
                     <img src={close} style={{marginLeft:"5px"}} onClick={()=>{closeCloud({...filterValues,CompanyId:null})}}/>
                     </div>
             }
             
         </div>
         <div className="FilterButtoN" onClick={()=>setOpenFilter(!openFilter)}/>

                </div>
           <table class="table2">
      
        <tbody>
            <tr>
                <th scope="col" className="column1"><p   className="REPtype">Client name</p></th>
                <th scope="col" className="column1"><p   className="REPtype">User name</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Location</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Type</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Date</p></th>
                {<th scope="col" className="column1"><p className="REPtype">Time</p></th>}
                <th scope="col" className="column1"><p   className="REPtype">Amount</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Method</p></th>
                <th scope="col" className="column1"><p className="REPtype">Fee</p></th>
                <th scope="col" className="column1"><p className="REPtype">PIP</p></th>
                <th scope="col" className="column1"><p className="REPtype">NSD</p></th>
                <th scope="col" className="column1"><p className="REPtype">MVR</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Total</p></th>
                {userRole!=="Producer"&&<th scope="col" className="column1"><p   className="REPtype">Reset</p></th>
                }
               
            </tr>
            {
               paymentsFil.sort(function(a,b){return b.id-a.id}).map((e)=>{
                   
                   return (
                        <tr>
                            <td className="ClientName" scope="row">{e.Client.name}</td>
                            <td className="ClientName" scope="row">{e.User.name}</td>           
                            <td className="ClientName" scope="row">{e.Location.name}</td>  
                            <td className="ClientName" scope="row">{e.type}</td>  
                            <td className="ClientName" scope="row">{e.date}</td>
                            <td className="ClientName" scope="row">{e.time.substring(11,16)}</td>
                            <td className="ClientName" scope="row">${e.amount}</td>  
                            <td className="ClientName" scope="row">{e.method}</td> 
                            <td className="ClientName" scope="row">${e.creditCardFee}</td>      
                            <td className="ClientName" scope="row">${e.PIPvalue}</td>     
                            <td className="ClientName" scope="row">${e.NSDvalue}</td> 
                            <td className="ClientName" scope="row">${e.MVRvalue}</td>    
                            <td className="ClientName" scope="row">${parseFloat(e.amount)+parseFloat(e.PIPvalue)+parseFloat(e.NSDvalue)+parseFloat(e.MVRvalue)+parseFloat(e.creditCardFee)}</td>     
                            {userRole!=="Producer"&&
                                     <td className="ClientName" scope="row"  >
                                          <div style={{height:"auto",display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center" }}>
                                            <FiRefreshCcw className='deleteIcon' size={"20px"} onClick={()=>{handleDelete(e.id)}}/>
                                            </div>
                                        </td>
                                }
                                 
                        </tr>
                    )
                     })
                    }
                   
             
                        
                        
                
        
        </tbody>
            </table>
            <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
            {openFilter&&  
        <div className="FilterCom">
            <div className="FilterComTitleD">
                <p className="FilterComTitle">Search</p>
            </div>
            <Divider style={{backgroundColor:"#EBEFF2", height:"1px", borderWidth:"0px",  width:"300px" }}/>
            <div className="FilterComRow">
                <input type={"checkbox"} checked={filterCheck.date} onChange={(e)=>setFilterCheck({
                    date:!filterCheck.date,
                    ClientId:false,
                    ClientTel:false,
                    SoldBy:false,
                    ProducerId:false,
                    LocationId:false,
                    CompanyId:false,
                    DealerId:false,
                    CategoryId:false,
                    Status:false})}/>
                <p className="FilterComText">Date</p>
            </div>
            {
                filterCheck.date&&
                <>
                <p className="REPtype"style={{marginLeft:"15px",color:"black", fontWeight:700}}>From</p>
                <div className="FilterComRow"><input type="date"  onChange={(e)=>setFilterValues({...filterValues, dateFrom:e.target.value})}  className="PAYselect" style={{border:"1px solid #D6E4EC", padding:"5px"}}/></div>
                <p className="REPtype" style={{marginLeft:"15px",color:"black", fontWeight:700}}>to</p>
                <div className="FilterComRow"><input type="date"  onChange={(e)=>setFilterValues({...filterValues, dateTo:e.target.value})}  className="PAYselect" style={{border:"1px solid #D6E4EC", padding:"5px"}}/></div>
                </>
            }
            <div className="FilterComRow">
                <input type={"checkbox"} checked={filterCheck.ClientId} onChange={(e)=>setFilterCheck({
                    ClientId:!filterCheck.ClientId,
                    ClientTel:false,
                    ProducerId:false,
                    LocationId:false,
                    Method:false,
                    Type:false})}/>
                <p className="FilterComText">Client Name</p>
            </div>
            {
                filterCheck.ClientId&&
                <div className="FilterComRow"><Select options={clients.map(e=>({value:e.id,label:e.name}))} onChange={(e)=>setFilterValues({...filterValues, ClientId:e.value})}  className="PAYselect"/></div>
            }
             <div className="FilterComRow">
                <input type={"checkbox"} checked={filterCheck.ClientTel} onChange={(e)=>setFilterCheck({
                    ClientId:false,
                    ClientTel:!filterCheck.ClientTel,
                    SoldBy:false,
                    ProducerId:false,
                    LocationId:false,
                    Method:false,
                    Type:false})}/>
                <p className="FilterComText">Client phone</p>
            </div>
            {
                filterCheck.ClientTel&&
                <div className="FilterComRow"><Select options={clients.map(e=>({value:e.id,label:e.tel}))} onChange={(e)=>setFilterValues({...filterValues, ClientTel:e.value})}  className="PAYselect"/></div>
            }
            <div className="FilterComRow">
                <input type={"checkbox"}checked={filterCheck.ProducerId} onChange={(e)=>setFilterCheck({ 
                    ClientId:false,
                    ClientTel:false,
                    SoldBy:false,
                    ProducerId:!filterCheck.ProducerId,
                    LocationId:false,
                    Method:false,
                    Type:false})}/>
                <p className="FilterComText">Producer Name</p>
            </div>
            {
                filterCheck.ProducerId&&
                <div className="FilterComRow"><Select options={producers.map(e=>({value:e.UserId,label:e.name}))} onChange={(e)=>setFilterValues({...filterValues, ProducerId:e.value})}  className="PAYselect"/></div>
            }
            <div className="FilterComRow">
                <input type={"checkbox"}checked={filterCheck.LocationId} onChange={(e)=>setFilterCheck({ 
                    ClientId:false,
                    ClientTel:false,
                    SoldBy:false,
                    ProducerId:false,
                    LocationId:!filterCheck.LocationId,
                    Method:false,
                    Type:false})}/>
                <p className="FilterComText">Location</p>
            </div>
            {
                filterCheck.LocationId&&
                <div className="FilterComRow"><Select options={locations.map(e=>({value:e.id,label:e.name}))} onChange={(e)=>setFilterValues({...filterValues, LocationId:e.value})}  className="PAYselect"/></div>
            }
            
            <div className="FilterComRow">
                <input type={"checkbox"}checked={filterCheck.Type} onChange={(e)=>setFilterCheck({ 
                    ClientId:false,
                    ClientTel:false,
                    SoldBy:false,
                    ProducerId:false,
                    LocationId:false,
                    Method:false,
                    Type:!filterCheck.Type})}/>
                <p className="FilterComText">Type</p>
            </div>
            {
                filterCheck.Type&&
                <div className="FilterComRow"><Select options={[{value:"Monthly Payment", label:"Monthly Payment"},{value:"Down Payment", label:"Down Payment"},{value:"Endorsement", label:"Endorsement"},{value:"Renew Down", label:"Renew Down"}]} onChange={(e)=>setFilterValues({...filterValues, Type:e.value})}  className="PAYselect"/></div>
            }
            <div className="FilterComRow">
                <input type={"checkbox"}checked={filterCheck.Method} onChange={(e)=>setFilterCheck({ 
                    ClientId:false,
                    ClientTel:false,
                    SoldBy:false,
                    ProducerId:false,
                    LocationId:false,
                    Method:!filterCheck.Method,
                    Type:false})}/>
                <p className="FilterComText">Method</p>
            </div>
            {
                filterCheck.Method&&
                <div className="FilterComRow"><Select options={[{value:"credit/debit", label:"Credit/Debit"},{value:"EFT", label:"EFT"},{value:"Cash", label:"Cash"}]} onChange={(e)=>setFilterValues({...filterValues, Method:e.value})}  className="PAYselect"/></div>
            }
            
            <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <button onClick={()=>filterSubmit(filterValues)} className="FilterComButton">Apply Filters</button></div>
        </div>}
        
        <Modal open={open} onClose={onCloseModal} center classNames={"modal"} >
                    <div className="modal" style={{minWidth:"250px", alignItems:"center"}}>
                    
                    <FiRefreshCcw color="#14B8A6" size={"50px"} style={{alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
                    <p className="modalText">Type "reset" to confirm </p>
                    <input className='AQinput' onChange={(e)=>setDeleteConf(e.target.value)} style={{marginTop:"12px"}}/>
                
                    <button disabled={deleteConf=="reset"?false:true} className="modalButton" onClick={handleDeleteModal}>Continue</button>
                
                    
                    </div>
            </Modal>
        </div>
    )
}
export default DeletedPayments