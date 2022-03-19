import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchField from "react-search-field";
import {BiPencil} from "react-icons/bi"
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from 'react-responsive-modal';
import Icon from "../assets/Icon.png"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";


const DepositCash = () => {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [box, setBox] = useState({pay1:"",pay5:"",pay10:"",pay20:"",pay50:"",pay100:""})
    const [dbPayments, setDbPayments] = useState([])
    const [total, setTotal] = useState(0)
    const [id, setId] = useState([])

    
    const UserId= useSelector(state=>state.UserId)
    console.log(UserId)
    useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getCashPayment?UserId=${UserId}`)
        .then(function(response){
            setDbPayments(response.data)
            
        })
        .catch(error=>{
          console.log(error)  
        })
    
    },[])
    useEffect(()=>{
        let amount = 0  
        dbPayments.map(e=>amount+=e.amount)
        setTotal(amount)
        let ids = []
        dbPayments.map(e=>ids.push(e.id))
        setId(ids)
    },[dbPayments])

    const submit = () =>{
        onOpenModal()
        fetch(`https://truewayagentbackend.com/deposit`, {
                    
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({id:id}),
            
        })
     
    }
  
    return(
        <div className="genericDiv" style={{maxWidth:"95vw"}}>
            <div className="genericHeader">
                <p className="genericTitle">Deposit cash</p>
            </div>


            <div className="DEPcont">
            <div className="DEPsubCont">
             
            <table class="table3" >
                    <tbody>
                        <tr>
                            <th scope="col" className="column1"><p   className="REPtype">Client name</p></th>
                            <th scope="col" className="column1"><p   className="REPtype">User name</p></th>
                            <th scope="col" className="column1"><p   className="REPtype">Location</p></th>
                            <th scope="col" className="column1"><p   className="REPtype">Type</p></th>
                            <th scope="col" className="column1"><p   className="REPtype">Date</p></th>
                            <th scope="col" className="column1"><p   className="REPtype">Total</p></th>
                        </tr>
                        { dbPayments.length?
                           
                        dbPayments.reverse().map((e)=>{
                            
                            return (
                                    <tr>
                                        <td className="row1" scope="row">{e.Client.name}</td>
                                        <td className="row1" scope="row">{e.User.name}</td>           
                                        <td className="row1" scope="row">{e.Location.name}</td>  
                                        <td className="row1" scope="row">{e.type}</td>  
                                        <td className="row1" scope="row">{e.date}</td>
                                        
                                        <td className="row1" scope="row">{e.amount}</td>     
                                    
                                    </tr>
                                
                                
                                
                                
                                )
                                
                                
                                })
                                :
                                <div></div>
                            }
                    
                    </tbody>
                </table>
                </div>
        <div className="cash">
            
                <div className="bilsContainer" >
                    <div className="inputCont" style={{ width:"50%"}}>   
                    <p  className="PAYtitle" style={{marginBottom:"20px"}}>Cash</p>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"200px"}}>
                    <p className="DEPbils">Bills $1</p><input type="number"  class="DEPinput" value={box.pay1} onChange={(event)=>{setBox({...box, pay1:event.target.value})}} />
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"200px"}}>
                    <p className="DEPbils">Bills $5   </p><input  type="number" class="DEPinput" value={box.pay5} onChange={(event)=>{setBox({...box, pay5:event.target.value})}} />
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"200px"}}>
                    <p className="DEPbils">Bills $10 </p><input type="number" class="DEPinput" value={box.pay10} onChange={(event)=>{setBox({...box, pay10:event.target.value})}} />
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"200px"}}>
                    <p className="DEPbils">Bills $20 </p><input type="number" class="DEPinput" value={box.pay20} onChange={(event)=>{setBox({...box, pay20:event.target.value})}} />
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"200px"}}>
                    <p className="DEPbils">Bills $50 </p><input type="number" class="DEPinput" value={box.pay50} onChange={(event)=>{setBox({...box, pay50:event.target.value})}} />
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"200px"}}>
                    <p className="DEPbils">Bills $100</p><input type="number" class="DEPinput" value={box.pay100} onChange={(event)=>{setBox({...box, pay100:event.target.value})}} />
                    </div>

                    </div>
                    
                    <div className="inputCont"  style={{width:"100%", height:"100%", paddingLeft:"30px", alignItems:"flex-start", flexDirection:"column", display:"flex"}}>
                    <p  className="PAYtitle"  style={{marginBottom:"20px"}}>Difference</p>
                    <div className="DEPboxy">
                    <p  className="PAYsub-title" style={{}}>{total&&box?(+((Number(box.pay1))+(Number(box.pay5)*5)+(Number(box.pay10)*10)+(Number(box.pay20)*20)+(Number(box.pay50)*50)+(Number(box.pay100)*100)-total)):0}</p>
                   
                    </div>
                    <div className="DEPtotal">
                        <p className="DEPtotalT">TOTAL DEPOSIT $ {total}</p>
                    </div>
                   
                   
                    </div>
                    

                </div>
                
            </div>
            
                <button className="FITbutton" onClick={submit}>
                    <div style={{display:"flex", flexDirection:"row"}}>
                    <BiPencil size="20px" style={{display:"flex", color:"#2B4162", marginLeft:"8px", marginTop:"1px"}}/>
                    <p className="FITbuttonText">Submit</p>
                    </div>
                </button>
               
        </div>
        <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">Payment added successfully</p>
       
       
        <button  className="modalButton"> <NavLink style={{textDecoration: "none", color:"#000"}}  to={"/payments"}>Continue</NavLink></button>
      
        
        </div>
      </Modal> 
      <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
        </div>
    )
}

export default DepositCash