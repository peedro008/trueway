
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import Modal from 'react-responsive-modal';
import { NavLink } from 'react-router-dom';
import Icon from "../assets/Icon.png"
import Select from 'react-select'
function ClientEdit(props) {
  let Client = props.location.aboutProps
  const [inputs, setInputs]= useState({name:Client.name,email:Client.email, Tel:Client.Tel , ClientId: Client.id, new:Client.new, notes:Client.notes,address:Client.address,dateOfBirth:Client.dateOfBirth,CompanyId:Client.CompanyId})
  const [company, setCompany] = useState([])
  const [open, setOpen] = useState(false);
  const [neww, setNeww] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
 useEffect(()=>{
        axios.get(`https://truewayagentbackend.com/getCompany`)
            .then(function(response){
                setCompany(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[]) 
    
  const handleClick = () => {
    
    fetch(`https://truewayagentbackend.com/modifyClient`, {
            
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
onOpenModal()
})
  .catch(err => {
      console.log(err);
  });
  }

  const options = company.map(e=>({value:e.id,label:e.name}))
  console.log(options)
  return (
    
    <div className='genericDiv'>
              <div className="genericHeader">
                <p className="genericTitle">Edit client</p>
            </div>
            <div className="managerInputsContainer">
    <div className="managerInputsubContainer">
        <div className="inputDiv"> 
            <p className="PAYtitle">Name</p>
            <input placeholder={Client.name} value={inputs.name}  onChange={(e)=>{setInputs({...inputs, name:e.target.value})}}  className="PAYsub-title"></input>
        </div>
        <div className="inputDiv"> 
            <p className="PAYtitle">Email</p>
            <input placeholder={Client.email} value={inputs.email} onChange={(e)=>setInputs({...inputs, email:e.target.value})} className="PAYsub-title"></input>
        </div>
        <div className="inputDiv"> 
            <p className="PAYtitle">Phone</p>
            <input placeholder={Client.tel} value={inputs.Tel} onChange={(e)=>setInputs({...inputs, Tel:e.target.value})} className="PAYsub-title"></input>
        </div>
        
        <div className="AQinputContainer" style={{marginLeft:"10px"}}>
                    <p className="AQinputName">New client</p>
                    <div className="AQyesNoContainer">
                        <div>
                        <input  className="AQcheckInput" type="checkbox" checked={inputs.new} name="new" onChange={(e)=>setInputs({...inputs, new:!inputs.new})}/>
                            {neww?<p className="AQyesNoText">Yes</p>:<p className="AQyesNoText">No</p>} 
                        </div>
                       
                    </div>
                    </div>
        

    </div>
    <div className="managerInputsubContainer" style={{width:"36%"}}>
    <div className="inputDiv"> 
            <p className="PAYtitle">Address</p>
            <input placeholder={Client.address} value={inputs.address} onChange={(e)=>setInputs({...inputs, address:e.target.value})} className="PAYsub-title"></input>
        </div>
        <div className="inputDiv"> 
            <p className="PAYtitle">Company	</p>
        <Select defaultValue={options.find(c => c.value === inputs.CompanyId)} value={options.find(c => c.value === inputs.CompanyId)} onChange={e => setInputs({...inputs, CompanyId:e.value})} options={options} name={"CompanyId"} className="PAYselect"  placeholder="Select Company"/>
        </div>
        <div className="inputDiv"> 
            <p className="PAYtitle">Date of Birth</p>
            <input type={"date"} placeholder={Client.tel} value={inputs.dateOfBirth} onChange={(e)=>setInputs({...inputs, dateOfBirth:e.target.value})} className="PAYsub-title"></input>
        </div>
   
    </div>
    <div className="managerInputsubContainer">
            <div className="MOBinputDiv">
                         <p className="MOBinputText">Notes</p>
                         <textarea value={inputs.notes} onChange={(e)=>{setInputs({...inputs, notes:e.target.value})}} className='MOBtexta1' style={{width:"32vw"}}/>
                    </div>
   
    </div>
    </div>      
    <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-2)}/>      
    <div style={{position:"absolute", right:"50px", top:"76px", display:"flex"}}>
            <button onClick={handleClick} className="PAYbutton" ><p className="PAYbuttonText">Submit</p></button>
        </div>
        <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
    <div className="modal">
        <img src={Icon} style={{width:"35px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">Quote modified successfully</p>
       
       
        <button  className="modalButton"> <NavLink style={{textDecoration: "none", color:"#000"}}  to={"/report/Clients"}>Continue</NavLink></button>
      
        
        </div>
      </Modal>
      </div>
  )
}

export default ClientEdit