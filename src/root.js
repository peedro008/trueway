import React from 'react';
import {  useSelector } from 'react-redux';
import Auth from './Components/auth';
import { BrowserRouter as Router, Route } from "react-router-dom"

import AdminRouter from './Components/adminRouter';

import ProducerRouter from './Components/producersRouter';



function Root ({ store }) {

const state= useSelector(state=>state.userRole)

if(state===null){
  return (
      
    

    
      <Auth/>
       
     
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

