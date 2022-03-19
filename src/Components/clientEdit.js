import React, { useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import Modal from 'react-responsive-modal';
import { NavLink } from 'react-router-dom';
import Icon from "../assets/Icon.png"

function ClientEdit(props) {
  let Client = props.location.aboutProps
  const [inputs, setInputs]= useState({name:Client.name,email:Client.email, Tel:Client.Tel , ClientId: Client.id})
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
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
            <input placeholder={Client.tel} value={inputs.tel} onChange={(e)=>setInputs({...inputs, tel:e.target.value})} className="PAYsub-title"></input>
        </div>
   
        

    </div>
    </div>      
    <BsChevronLeft color="grey" style={{minWidth:"25px", minHeight:"25px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-2)}/>      
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