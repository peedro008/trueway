import React from 'react';
import { useState } from 'react';
import logo from "../assets/logoLogin.png"
import {  useDispatch } from 'react-redux';
import "./CSS/css.css"
import { userRole } from '../redux/actions';
import { userName } from '../redux/actions';
import { user } from '../redux/actions';
import { userId } from '../redux/actions';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import ERRORR from "../assets/ERRORR.png"
import { NavLink } from "react-router-dom";


const Auth = ()=>{
    console.log(window.screen.width)
    const dispatch = useDispatch()
    const [UserName, setUserName] = useState('');

    const [Password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [locations, setLocations] = useState([])
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
  

    const onSubmitHandler = () => {
     
        const payload = {
            UserName,
            Password,
        };
        fetch(`http://localhost:4000/login`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(payload),
            
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                    onOpenModal()
                } else {
                   
                    setIsError(false);
                    setMessage(jsonRes.message);
                    dispatch(userRole(jsonRes.UserRole));
                    dispatch(user(payload.UserName));
                    dispatch(userName(jsonRes.Name));
                    dispatch(userId(jsonRes.userId));
                   
                    
                }
            } catch (err) {
                console.log(err);
                onOpenModal()
            };
        
        })
        .catch(err => {
            console.log(err);
            onOpenModal()
        });

       
    };
   


    return (
    <div className="main">
        <div className="containerLogo">
                
                    <img style={{paddingBottom:"80px" ,height:"90px",width:"auto", alignSelf:"center",  marginLeft:"23%" }}src={logo}/>
                
        </div>
        <div className="loginContainer">
           <div className="box">
            <div>
            <p className="par">Sign In</p>
            <p className="par2">Sign in to your account</p>
            <div  style={{ paddingBottom:"25px", alignItems:"center", backgroundColor:"#FFFFFF", width:"300px", display:"flex", height:"180px", flexDirection:"column", justifyContent:"space-between", borderRadius:"8px"}}>
           <div>
            <p className="par3">Email address</p>
            <input className='loginInput' style={{ width:"270px", height:"25px", borderWidth:"0px", borderRadius:"8px", backgroundColor:"#E5E5E5", paddingX:"5px"}}   placeholder="  Email" onChange={event => setUserName(event.target.value)}/>
            </div>
            <div>
            <p className="par3">Password</p>
            <input className='loginInput'  style={{ width:"270px", height:"25px", borderWidth:"0px", borderRadius:"8px", backgroundColor:"#E5E5E5", paddingX:"5px"}}  type="password" placeholder="  Password" onChange={event => setPassword(event.target.value)}/>
            
            
            </div>
             <div  className="buttonC">
            <button  className="button" onClick={()=>onSubmitHandler()}><p className="buttonT">Sign In</p>  </button>
            
            
           </div>
            </div>
          
            
            </div>
        </div>
        </div>

        <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
    <div className="modal" style={{minWidth:"250px"}}>
        <img src={ERRORR} style={{width:"55px", alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
        
        <p className="modalText">{message}</p>
       
       
        <button  className="modalButton" onClick={onCloseModal}>Continue</button>
      
        
        </div>
      </Modal>
    </div>
    )
}

export default Auth