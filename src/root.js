import React, { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import Auth from './Controllers/auth';
import { BrowserRouter as Router, Route } from "react-router-dom"

import AdminRouter from './Routers/adminRouter';

import ProducerRouter from './Routers/producersRouter';

import { FetchAll}  from './Logic/Fetch';
import LoginRouter from './Routers/LoginRouter';
import { logout } from './Redux/actions';

function Root ({ store }) {
  const dispatch = useDispatch()
  const SessionDate= useSelector(state=>state.SessionDate)
  const date = new Date();
  const DATE = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + date.getDate();
  useEffect(() => {
    if(DATE!==SessionDate) dispatch(logout())
  }, [])
  
  const userRole= useSelector(state=>state.userRole)


if(!userRole){
  return (
      
    

    
      <LoginRouter/>
       
     
   )
  
  }

 if (userRole==="Admin"||userRole=="Manager"){
  return (

    
    <AdminRouter/>
     
     
  
  )

}

if (userRole==="Producer"){
  return (

    <ProducerRouter/>
  )

}


}












  
export default   Root

