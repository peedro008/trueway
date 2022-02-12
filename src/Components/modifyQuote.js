import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Icon from "../assets/Icon.png"

function ModifyQuote(props) {
    const id = props.location.aboutProps
    const [quote, setQuote] = useState([])
    const [renew, setRenew] = useState(false)
    const [cancel, setCancel] = useState(false)
    const [bound, setBound] = useState(false)
    const [notes, setNotes] = useState("")
    const [monthly, setMonthly] = useState("")
    const [down, setDown] = useState("")
    const [inputs, setInputs] = useState([])
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    useEffect(() => {
        axios.get(`http://localhost:4000/idquotes`,{ params: { id: id } })
        .then(function(response){
            setQuote(response.data)
            
            setInputs({...inputs, QuoteId: id})
            
        })
        .catch(error=>{
          console.log(error)  
        })
    }, [setQuote])
    
    const checkRenew = () => {
        setBound(false)
        setInputs({...inputs, Status:"Renew down"})
        setCancel(false)
        setRenew(!renew)
    }
    const checkBound = () => {
        setRenew(false)
        setInputs({...inputs, Status:"Sold"})
        setCancel(false)
        setBound(!bound)
    }
  
    const checkCancel = () => {
        setBound(false)
        setInputs({...inputs, Status:"Cancelled"})
        setRenew(false)
        setCancel(!cancel)
    }
    const submit = () =>{
        inputs&&
      
        
        console.log(inputs)
        fetch(`http://localhost:4000/modifyQuote`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(inputs)
            
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
        onOpenModal()
    }
  
  
    return (
        <div className='genericDiv'>
              <div className="genericHeader">
                <p className="genericTitle">Modify quote</p>
            </div>
            
            {!quote.length?<div></div>:
            <table class="table1">
      
        <tbody>
            <tr>
           <th scope="col" className="column1"><p   className="REPtype">Client name</p></th>
       
           <th scope="col" className="column1"><p className="REPtype">Client phone</p></th>
           <th scope="col" className="column1"><p className="REPtype">Company</p></th>
           <th scope="col" className="column1"><p className="REPtype">Monthly Payments</p></th>
           <th scope="col" className="column1"><p className="REPtype">Down Payments</p></th>
           <th scope="col" className="column1"><p className="REPtype">Date</p></th>
           <th scope="col" className="column1"><p className="REPtype">Time</p></th>
           <th scope="col" className="column1"><p className="REPtype">Quoted by</p></th>
           <th scope="col" className="column1"><p className="REPtype">Sold by</p></th>

           
        
            </tr>
        
            
                   
                   <tr>
                            <td className="ClientName" scope="row">{quote[0].Client.name}</td>
                            
                            <td className="row1" scope="row">{quote[0].Client.tel}</td>
                            <td className="row1" scope="row">{quote[0].Company.name}</td>
                            <td className="row1" scope="row">{quote[0].monthlyPayment}</td>
                            <td className="row1" scope="row">{quote[0].down}</td>
                            <td className="row1" scope="row">{quote[0].date}</td>
                            <td className="row1" scope="row">{parseInt(quote[0].time.substring(11,13))-5}{quote[0].time.substring(16,19)}</td>
                            <td className="row1" scope="row">{quote[0].Producer.name}</td>
                            <td className="row1" scope="row">{quote[0].Producer.name}</td>
                            
                           
                           
                           
                           
                          
                            
                            </tr>
              
               
               
            

        </tbody>
        </table>}

        <div className="MOBbox">
            <div className='MOBsBox'>
                 <p className='MOBtitle' style={{color:"#28C76F"}}>Renew down</p>
                 <input class="checkbox" style={{display:"flex", marginRight:"15px",marginTop:"15px", }} type="checkbox" key="Renew" name="Renew" checked={renew} onChange={checkRenew}/>
                {(renew||bound)&&<div> 
                   <div className="MOBmainInput">
                        <div className="MOBinputDiv"> 
                            <p className="MOBinputText">Down amount</p>
                            <input onChange={(e)=>{setInputs({...inputs, down:e.target.value})}} placeholder="down" className="MOBinput"></input>
                        </div>
                        <div className="MOBinputDiv"> 
                            <p className="MOBinputText">Monthly amount</p>
                            <input onChange={(e)=>{setInputs({...inputs, monthly:e.target.value})}} placeholder="monthly" className="MOBinput"></input>
                        </div>
                    </div></div>}
                    {(renew||bound||cancel)&&
                    <div className="MOBinputDiv">
                         <p className="MOBinputText">Notes</p>
                         <textarea onChange={(e)=>{setInputs({...inputs, note:e.target.value})}} className='MOBtexta'/>
                    </div>}
                </div>
            
            <div className='MOBsBox'>
                 <p className='MOBtitle' style={{color:"#28C76F"}}>Bound</p>
                 <input class="checkbox" style={{display:"flex", marginRight:"15px",marginTop:"15px", }} type="checkbox" key="Bound" name="Bound" checked={bound} onChange={checkBound}/>
               
            </div>
            <div className='MOBsBox'>
                 <p className='MOBtitle' style={{color:"#FF4C61"}}>Cancelation</p>
                 <input class="checkbox" style={{display:"flex", marginRight:"15px",marginTop:"15px", }} type="checkbox" key="Cancelation" name="Cancelation" checked={cancel} onChange={checkCancel}/>
                
              
            </div>
        
        </div>
        <button className="FITbutton" onClick={submit}>
                    <div style={{display:"flex", flexDirection:"row"}}>
                    <BiPencil size="20px" style={{display:"flex", color:"#2B4162", marginLeft:"8px", marginTop:"1px"}}/>
                    <p className="FITbuttonText">Submit</p>
                    </div>
                </button>
                <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">Quote modified successfully</p>
       
       
        <button  className="modalButton"> <NavLink style={{textDecoration: "none", color:"#000"}}  to={"/"}>Continue</NavLink></button>
      
        
        </div>
      </Modal>
        </div>
    )
}

export default ModifyQuote
