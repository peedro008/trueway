import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from 'react-select'


const ProducerEdit = (props) => {
    const [locations, setLocations] = useState([])
    let Producer = props.location.props
    useEffect(()=>{
        axios.get(`http://localhost:4000/getLocations`)
            .then(function(response){
                setLocations(response.data)
                
            })
            .catch(error=>{
              console.log(error)  
            })
    
    },[])

  

    const customStyles = {
        control: base => ({
          ...base,
          height: 30,
          minHeight: 30,
          background: "#F5F5F5",
          
        
          
        }),
        placeholder: defaultStyles => {
            return {
              ...defaultStyles,
              marginTop:"-5px",
              
            };
          },
          indicatorSeparator: base => ({
              ...base,
              height:"0px",
              
          }),
          dropdownIndicator: base => ({
            ...base,
            marginTop:"-4px",
            
            
        })

      };
      
    return(
    <div className="genericDiv">
        <div className="genericHeader">
            <p className="genericTitle">Edit producer</p>
        </div>
        
        <div className="ProdEditContainer">
            <div className="ProdEditSubContainer">
                <p style={{width:"78%", textAlign:"left", marginLeft:"5px"}} className="ProdEditT">Profile</p>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">Full name</p>
                    <input className="ProdEditInput" placeholder={Producer.name}/>
                </div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">Phone number</p>
                    <input className="ProdEditInput" placeholder={Producer.phone}/>
                </div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle" >Address</p>
                    <input className="ProdEditInput"  placeholder={Producer.address}/>
                </div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">Location</p>
                    <Select  styles={customStyles}    placeholder="Name" className="ProdEditInputS"  options={locations.map(e=>({value:e.id,label:e.name}))}/>
                </div>


            </div>
            
            
            <div className="ProdEditSubContainer">
                <div style={{width:"78%", textAlign:"left", marginLeft:"5px"}}><p className="ProdEditT">Account</p></div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">E-mail</p>
                    <input className="ProdEditInput"  placeholder={Producer.email}/>
                </div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">Password</p>
                    <input className="ProdEditInput"/>
                </div>
                <div className="ProdEditInputCont">
                    <p className="ProdEditTitle">Repeat password</p>
                    <input className="ProdEditInput"/>
                </div>
               <button className="ProdEditSave">Save</button>










            </div>

        </div>






    </div>   )
}

export default ProducerEdit

//onChange={event => setInputs({...inputs,down:event.target.value})}