import React from 'react';
import {  useSelector } from 'react-redux';
import Auth from './Controllers/auth';
import { BrowserRouter as Router, Route } from "react-router-dom"

import AdminRouter from './Routers/adminRouter';

import ProducerRouter from './Routers/producersRouter';

import { FetchAll}  from './Logic/Fetch';
import LoginRouter from './Routers/LoginRouter';

function Root ({ store }) {
FetchAll()
const state= useSelector(state=>state.userRole)

if(!state){
  return (
      
    

    
      <LoginRouter/>
       
     
   )
  
  }

 if (state==="Admin"||state=="Manager"){
  return (

    
    <AdminRouter/>
     
     
  
  )

}

if (state==="Producer"){
  return (

    <ProducerRouter/>
  )

}


}












  
export default   Root

