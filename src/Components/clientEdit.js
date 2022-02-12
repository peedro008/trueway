import React from 'react'

function ClientEdit(props) {
  let Client = props.location.aboutProps
  return (
    
    <div className='genericDiv'>
              <div className="genericHeader">
                <p className="genericTitle">Edit client</p>
            </div>
            <div className="managerInputsContainer">
    <div className="managerInputsubContainer">
        <div className="inputDiv"> 
            <p className="PAYtitle">Name</p>
            <input placeholder={Client.name}  className="PAYsub-title"></input>
        </div>
        <div className="inputDiv"> 
            <p className="PAYtitle">Email</p>
            <input placeholder={Client.email}  className="PAYsub-title"></input>
        </div>
        <div className="inputDiv"> 
            <p className="PAYtitle">Phone</p>
            <input placeholder={Client.tel} className="PAYsub-title"></input>
        </div>
   
        

    </div>
    </div>      
            
      </div>
  )
}

export default ClientEdit