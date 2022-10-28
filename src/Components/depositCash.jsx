
import React from "react";
import {BiPencil} from "react-icons/bi"
import { NavLink } from "react-router-dom";
import { Modal } from 'react-responsive-modal';
import Icon from "../assets/Icon.png"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";


const DepositCashComponent = ({
    open,
box,
setBox,
submit,
dbPayments,
total,
id,
note,
setNote,
onCloseModal
}) => {
    
    return(
        <div className="genericDiv" style={{maxWidth:"95vw"}}>
            <div className="genericHeader">
                <p className="genericTitle">Deposit cash</p>
            </div>


            <div className="DEPcont">
            <div className="DEPsubCont" >
             
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
                           
                        dbPayments.map((e)=>{
                            
                            return (
                                    <tr>
                                        <td className="row1" scope="row">{e.Client.name}</td>
                                        <td className="row1" scope="row">{e.User.name}</td>           
                                        <td className="row1" scope="row">{e.Location.name}</td>  
                                        <td className="row1" scope="row">{e.type}</td>  
                                        <td className="row1" scope="row">{e.date}</td>
                                        
                                        <td className="row1" scope="row">{parseFloat(e.amount)+(e.creditCardFee.length?parseFloat(e.creditCardFee):0)+parseFloat(e.PIPvalue)+parseFloat(e.MVRvalue)+parseFloat(e.NSDvalue)}</td>     
                                    
                                    </tr>
                                
                                
                                
                                
                                )
                                
                                
                                })
                                :
                                <div></div>
                            }
                    
                    </tbody>
                </table>
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                <div className="cash">
            
                <div className="bilsContainer" >
                    <div className="inputCont" style={{ width:"50%"}}>   
                    <p  className="PAYtitle" style={{marginBottom:"20px"}}>Cash</p>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"200px"}}>
                    <p className="DEPbils">Bills $1</p><input type="number"  class="DEPinput" defaultValue={0} value={box.pay1} onChange={(event)=>{setBox({...box, pay1:event.target.value})}} />
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"200px"}}>
                    <p className="DEPbils">Bills $5   </p><input  type="number" class="DEPinput" defaultValue={0} value={box.pay5} onChange={(event)=>{setBox({...box, pay5:event.target.value})}} />
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"200px"}}>
                    <p className="DEPbils">Bills $10 </p><input type="number" class="DEPinput" defaultValue={0} value={box.pay10} onChange={(event)=>{setBox({...box, pay10:event.target.value})}} />
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"200px"}}>
                    <p className="DEPbils">Bills $20 </p><input type="number" class="DEPinput" defaultValue={0} value={box.pay20} onChange={(event)=>{setBox({...box, pay20:event.target.value})}} />
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"200px"}}>
                    <p className="DEPbils">Bills $50 </p><input type="number" class="DEPinput" defaultValue={0} value={box.pay50} onChange={(event)=>{setBox({...box, pay50:event.target.value})}} />
                    </div>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"200px"}}>
                    <p className="DEPbils">Bills $100</p><input type="number" class="DEPinput" defaultValue={0} value={box.pay100} onChange={(event)=>{setBox({...box, pay100:event.target.value})}} />
                    </div>

                    </div>
                    
                    <div className="inputCont"  style={{width:"100%", height:"100%", paddingLeft:"30px", alignItems:"flex-start", flexDirection:"column", display:"flex"}}>
                    <p  className="PAYtitle"  style={{marginBottom:"20px"}}>Cash</p>
                    <div className="DEPboxy">
                    <p  className="PAYsub-title" style={{}}>{total&&box?(+((Number(box.pay1))+(Number(box.pay5)*5)+(Number(box.pay10)*10)+(Number(box.pay20)*20)+(Number(box.pay50)*50)+(Number(box.pay100)*100))):0}</p>
                   
                    </div>
                    <div className="DEPtotal">
                        <p className="DEPtotalT">TOTAL DEPOSIT $ {total.toFixed(2)}</p>
                    </div>
                   
                   
                    </div>
                    
                            
                </div>
                
            </div>
            
                 <div className="DEPnote">
            <p className="PAYtitle">Notes</p>
            <textarea className="DEPnoteInput" onChange={e=>setBox({...box, note:e.target.value})}></textarea>
        </div>
               
        </div>
<button className="FITbutton" onClick={submit} disabled={id.length?false:true}>
                    <div style={{display:"flex", flexDirection:"row"}}>
                    <BiPencil size="20px" style={{display:"flex", color:id.length?"#2B4162":"#e5e5e5", marginLeft:"8px", marginTop:"1px"}}/>
                    <p className="FITbuttonText" >Submit</p>
                    </div>
                </button>

       

        </div>                    

        <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">Deposit added successfully</p>
       
       
        <button  className="modalButton"> <NavLink style={{textDecoration: "none", color:"#000"}}  to={"/payments"}>Continue</NavLink></button>
      
        
        </div>
      </Modal> 
      <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
        </div>
    )
}

export default DepositCashComponent